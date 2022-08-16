import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import moment from "moment";
import updateEmail from "../middleware/updateEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function registerForContributer(req, res, next) {
  let { email, password, firstname, lastname } = req.body;
  firstname = firstname.toLowerCase();
  lastname = lastname.toLowerCase();
  if (!email && !password && !firstname && !lastname) {
    return res.send({
      error: "All details must be required",
    });
  }
  let saltRounds = await bcrypt.genSalt(12);
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  const lowEmail = email.toLowerCase();

  try {
    sql.connect(config, async (err) => {
      if (err) {
        return res.send(err.message);
      }
      const request = new sql.Request();
      request.input("email", sql.VarChar, lowEmail);
      request.query(
        "select * from users_dtls where user_email = @email",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            return res.send({
              error:
                "This email address is already in use, Please use another email address",
            });
          } else {
            sql.connect(config, async (err) => {
              if (err) res.send(err.message);
              var timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
              const type = "contributer";
              const request = new sql.Request();
              request.query(
                "insert into users_dtls (user_email,user_pwd,user_logindate,user_logintime,user_firstname,user_lastname,user_creation,user_type) VALUES('" +
                  email +
                  "','" +
                  hashedPassword +
                  "','" +
                  timestamp +
                  "','" +
                  timestamp +
                  "','" +
                  firstname +
                  "','" +
                  lastname +
                  "','" +
                  timestamp +
                  "','" +
                  type +
                  "' )",
                (err, success) => {
                  if (err) {
                    return res.send({ error: err.message });
                  }
                  if (success) {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = updateEmail(
                      email,
                      "Registration for contributor",
                      "Successfully submitted the application for a contributor.We will review all your application and get back to you with update,Thanks."
                    );
                    sgMail
                      .send(msg)
                      .then(() => {
                        return res.send({
                          success:
                            "Successfully submitted the contributor we will get back to you once, We review your application.",
                        });
                      })
                      .catch((error) => {
                        return res.send({
                          error: error.message,
                        });
                      });
                  }
                }
              );
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(err.message);
  }
}

export async function loginContributer(req, res) {
  let email = req.body.email;
  const lowEmail = email.toLowerCase();
  const password = req.body.password;
  let type = "contributer";

  if (!email || !password || !type) {
    res
      .status(500)
      .send("Please enter a username, password and user type to login");
  }
  sql.connect(config, async (err) => {
    if (err) {
      res.send(err.message);
    }
    const request = new sql.Request();
    request.input("email", sql.VarChar, lowEmail);
    request.input("type", sql.VarChar, type);
    request.query(
      `select * from users_dtls where user_email = @email AND user_type = @type`,
      (err, result) => {
        if (result.recordset.length > 0) {
          bcrypt.compare(
            password,
            result.recordset[0].user_pwd,
            (err, response) => {
              if (!response) {
                return res.json({
                  notFound:
                    "You have entered incorrect password,Please try again or re-enter your password",
                });
              }
              if (response) {
                const accessToken = jwt.sign(
                  {
                    id: result.recordset[0].user_dtls_id,
                    email: result.recordset[0].user_email,
                    type: result.recordset[0].user_type,
                    isSuperAdmin: result.recordset[0].user_is_superadmin,
                  },
                  process.env.JWT_LOGIN_SECRET_KEY
                );
                const refreshToken = jwt.sign(
                  {
                    id: result.recordset[0].user_dtls_id,
                    email: result.recordset[0].user_email,
                    type: result.recordset[0].user_type,
                    isSuperAdmin: result.recordset[0].user_is_superadmin,
                  },
                  process.env.JWT_REFRESH_TOKEN
                );
                return res.json({
                  success: {
                    id: result.recordset[0].user_dtls_id,
                    email: result.recordset[0].user_email,
                    firstname: result.recordset[0].user_firstname,
                    lastname: result.recordset[0].user_lastname,
                    type: result.recordset[0].user_type,
                    role: result.recordset[0].user_is_superadmin,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                  },
                });
              } else {
                return res.json({
                  wrong: "Sorry you entered incorrect password",
                });
              }
            }
          );
        } else {
          return res.json({
            notFound: "There is no account with that email address, user type!",
          });
        }
      }
    );
  });
}

export async function requestForContributerCourses(req, res) {
  const {
    email,
    fullname,
    value,
    courseCategory,
    qualification,
    experience,
    masterCourseNameId,
    contentDer,
  } = req.body;

  try {
    sql.connect(config, (err) => {
      const request = new sql.Request();
      request.input("masterCourseNameId", sql.VarChar, masterCourseNameId);
      request.query(
        "select * from course_master WHERE course_master_name_id= @masterCourseNameId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            const masterCourseId = result.recordset[0].course_master_name_id;
            sql.connect(config, (err) => {
              const request = new sql.Request();
              request.input("masterCourseId", sql.Int, masterCourseId);
              request.input("email", sql.VarChar, email);
              request.query(
                "select * from contributer_details_approve WHERE contributer_email = @email AND contributer_course_name_id = @masterCourseId ",
                (err, result) => {
                  if (err) return res.send(err.message);
                  if (result.recordset.length > 0) {
                    let courseId =
                      result.recordset[0].contributer_course_name_id;
                    if (masterCourseId === courseId) {
                      res.send({
                        error:
                          "You have all ready applied for this course wait for the verification to complete",
                      });
                    }
                  } else {
                    sql.connect(config, async (err) => {
                      if (err) res.send(err.message);
                      var timestamp = moment(Date.now()).format(
                        "YYYY-MM-DD HH:mm:ss"
                      );
                      const request = new sql.Request();
                      request.query(
                        "insert into contributer_details_approve (contributer_email,contributer_fullname,contributer_mobile,contributer_qualifications,contributer_exp_yrs,contributer_creation_date,contributer_course_name_id,contributer_course_category,contributer_content_status) VALUES('" +
                          email +
                          "','" +
                          fullname +
                          "','" +
                          value +
                          "','" +
                          qualification +
                          "','" +
                          experience +
                          "','" +
                          timestamp +
                          "','" +
                          masterCourseNameId +
                          "','" +
                          courseCategory +
                          "','" +
                          contentDer +
                          "'  )",
                        (err, success) => {
                          if (err) {
                            return res.send({ error: err.message });
                          }
                          if (success) {
                            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                            const msg = updateEmail(
                              email,
                              "Registration for contributor",
                              "Successfully submitted the application for a contributor.We will review all your application and get back to you with update,Thanks."
                            );
                            sgMail
                              .send(msg)
                              .then(() => {
                                return res.send({
                                  success:
                                    "Successfully submitted the contributor we will get back to you once, We review your application.",
                                });
                              })
                              .catch((error) => {
                                return res.send({
                                  error: error.message,
                                });
                              });
                          }
                        }
                      );
                    });
                  }
                }
              );
            });
          } else {
            res.send("No course found in the master table");
          }
        }
      );
    });
  } catch (error) {
    res.send(error.message);
  }
}

export async function getAllContributerForChanges(req, res) {
  try {
    sql.connect(config, (err) => {
      if (err) return res.send({ error: error.message });
      const request = new sql.Request();
      request.query(
        "select * from contributer_details_approve",
        (err, result) => {
          if (err) return res.send({ error: err.message });
          if (result.recordset.length > 0) {
            return res.send(result.recordset);
          } else {
            return;
          }
        }
      );
    });
  } catch (error) {}
}

// approving the contributer
export async function updateContributerApprove(req, res, next) {
  const paramsId = req.params.id;
  try {
    sql.connect(config, (err) => {
      const request = new sql.Request();
      request.input("id", sql.Int, paramsId);
      request.query(
        "SELECT * FROM contributer_details_approve WHERE contributer_details_id = @id",
        (err, result) => {
          if (err) res.send(err.message);
          if (result.recordset.length > 0) {
            const contributerDisapproved =
              result.recordset[0].contributer_approve_status;
            const email = result.recordset[0].contributer_email;
            if (contributerDisapproved === "no") {
              const contributerApprove = "yes";
              const request = new sql.Request();
              request.input(
                "contributerApprove",
                sql.VarChar,
                contributerApprove
              );
              request.input("id", sql.Int, paramsId);
              const sqlUpdate =
                "UPDATE contributer_details_approve SET contributer_approve_status= @contributerApprove WHERE contributer_details_id = @id ";
              request.query(sqlUpdate, (err, result) => {
                if (err) return res.send(err.message);
                if (result) {
                  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                    from: "no-reply@practilearn.com",
                    to: email,
                    subject: "Mentor approve email",
                    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Practiwiz Training Programme</h2>
                          <p>Congratulations! You're now approved as the contributer .
                          </p>
                          Do not reply this email address
                          </div>`,
                  };
                  sgMail
                    .send(msg)
                    .then(() => {
                      res.send({
                        success:
                          "Successfully approved as mentor in the Practiwiz",
                      });
                    })
                    .catch((error) => {
                      res.send({ error: error });
                    });
                } else {
                  res.send({
                    error: "There was an error updating",
                  });
                }
              });
            }
          } else {
            res.send({ error: "No user found" });
          }
        }
      );
    });
  } catch (error) {
    if (error) res.send(error.message);
  }
}
