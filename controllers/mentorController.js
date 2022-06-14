import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import moment from "moment";
import dotenv from "dotenv";
import azureStorage from "azure-storage";
import intoStream from "into-stream";
import updateEmail from "../middleware/updateEmail.js";
import bcrypt from "bcrypt";

const containerName = "navrikimage";

dotenv.config();

const blobService = azureStorage.createBlobService(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

export async function registerMentor(req, res) {
  const {
    email,
    experience,
    skills,
    specialty,
    password,
    firstname,
    lastname,
    mentorshipArea,
    from,
    to,
    availability,
  } = req.body;
  console.log(req.body);
  let saltRounds = await bcrypt.genSalt(12);
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  const blobName = new Date().getTime() + "-" + req.files.image.name;
  const lowEmail = email.toLowerCase();

  let fileName = `https://navrik.blob.core.windows.net/navrikimage/${blobName}`;
  const stream = intoStream(req.files.image.data);
  const streamLength = req.files.image.data.length;

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
              const type = "mentor";
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
                    sql.connect(config, async (err) => {
                      if (err) res.send(err.message);
                      const request = new sql.Request();
                      request.query(
                        "insert into mentor_dtls (mentor_email,mentor_firstname,mentor_lastname,mentor_logintime,mentor_availability,mentor_availability_slot_from,mentor_availability_slot_to,mentor_creation,mentor_experience, mentor_skills,mentor_mentorship_area,mentor_speciality, mentor_sessions_conducted,mentor_image) VALUES('" +
                          email +
                          "','" +
                          firstname +
                          "','" +
                          lastname +
                          "','" +
                          timestamp +
                          "','" +
                          availability +
                          "','" +
                          from +
                          "','" +
                          to +
                          "','" +
                          timestamp +
                          "','" +
                          experience +
                          "','" +
                          skills +
                          "','" +
                          mentorshipArea +
                          "','" +
                          specialty +
                          "','" +
                          1 +
                          "','" +
                          fileName +
                          "' )",
                        (err, success) => {
                          if (err) {
                            return res.send({ error: err.message });
                          }
                          if (success) {
                            blobService.createBlockBlobFromStream(
                              containerName,
                              blobName,
                              stream,
                              streamLength,
                              (err) => {
                                if (err) {
                                  res.send({ error: err.message });
                                }
                                if (!err) {
                                  sgMail.setApiKey(
                                    process.env.SENDGRID_API_KEY
                                  );
                                  const msg = updateEmail(
                                    email,
                                    "Mentor form successfully",
                                    "Successfully submitted the application for a mentor.We will review all your application and get back to you with update,Thanks."
                                  );
                                  sgMail
                                    .send(msg)
                                    .then(() => {
                                      return res.send({
                                        success:
                                          "Successfully submitted the mentor we will get back to you once, We review your application.",
                                      });
                                    })
                                    .catch((error) => {
                                      return res.send({
                                        error:
                                          "There was an error while submitting the details please try again later",
                                      });
                                    });
                                }
                              }
                            );
                          }
                        }
                      );
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

// in dashboard
export async function getAllMentorDetails(req, res) {
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.query("select * from mentor_dtls", (err, result) => {
        if (err) return res.send(err.message);
        if (result.recordset.length > 0) {
          return res.send({ mentors: result.recordset });
        } else {
          return;
        }
      });
    });
  } catch (error) {}
}

//get mentor search by the search
export async function getMentorBySearch(req, res) {
  let searchItem = req.query.name;
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("searchItem", sql.VarChar, searchItem);

      const searchQuery =
        "SELECT * FROM mentor_dtls WHERE mentor_skills = @searchItem OR mentor_mentorship_area = @searchItem";
      request.query(searchQuery, (err, result) => {
        if (err) return res.send(err.message);
        if (result.recordset.length > 0) {
          return res.send(result.recordset);
        } else {
          res.send("Not found");
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
}

export async function getAllMentorApprovedDetails(req, res) {
  let mentorApproved = "Yes";
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("mentorApproved", sql.VarChar, mentorApproved);
      request.query(
        "select * from mentor_dtls WHERE mentor_approved = @mentorApproved",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            return res.send({ mentors: result.recordset });
          } else {
            return;
          }
        }
      );
    });
  } catch (error) {}
}
// approve
export async function updateMentorApprove(req, res, next) {
  const paramsId = req.params.id;
  try {
    sql.connect(config, (err) => {
      const request = new sql.Request();
      request.input("id", sql.Int, paramsId);
      request.query(
        "SELECT * FROM mentor_dtls WHERE mentor_dtls_id = @id",
        (err, result) => {
          if (err) res.send(err.message);
          if (result.recordset.length > 0) {
            const mentorDisapproved = result.recordset[0].mentor_approved;
            const email = result.recordset[0].mentor_email;
            if (mentorDisapproved === "No") {
              const mentorApprove = "Yes";
              const request = new sql.Request();
              request.input("mentorApprove", sql.VarChar, mentorApprove);
              request.input("id", sql.Int, paramsId);

              const sqlUpdate =
                "UPDATE mentor_dtls SET mentor_approved = @mentorApprove WHERE mentor_dtls_id= @id ";
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
                          <p>Congratulations! You're now approved as the mentor.
                          </p>
                          Do not reply this email address
                          </div>`,
                  };
                  sgMail
                    .send(msg)
                    .then(() => {
                      res.send({
                        success:
                          "Successfully approved as mentor in the Practilearn",
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

//disapproved
export async function updateMentorDisapprove(req, res, next) {
  const paramsId = req.params.id;
  try {
    sql.connect(config, (err) => {
      const request = new sql.Request();
      request.input("id", sql.Int, paramsId);
      request.query(
        "SELECT * FROM mentor_dtls WHERE  mentor_dtls_id = @id",
        (err, result) => {
          if (err) res.send(err.message);
          if (result.recordset.length > 0) {
            const mentorApproved = result.recordset[0].mentor_approved;
            const email = result.recordset[0].mentor_email;
            if (mentorApproved === "Yes") {
              const mentorDisapproved = "No";
              const request = new sql.Request();
              request.input(
                "mentorDisapproved",
                sql.VarChar,
                mentorDisapproved
              );
              request.input("id", sql.Int, paramsId);
              const sqlUpdate =
                "UPDATE mentor_dtls SET mentor_approved = @mentorDisapproved WHERE mentor_dtls_id= @id ";
              request.query(sqlUpdate, (err, result) => {
                if (err) return res.send(err.message);
                if (result) {
                  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                    from: "no-reply@practilearn.com",
                    to: email,
                    subject: "Mentor disapprove emails",
                    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Elevation Training Programme</h2>
                          <p>Congratulations! You're no longer than mentor our platform
                          </p>
                          Do not reply this email address
                          </div>`,
                  };
                  sgMail
                    .send(msg)
                    .then(() => {
                      res.send({
                        success:
                          "Successfully disapproved as admin in the Elevashun",
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  res.send({
                    error: "There was an error updating",
                  });
                }
              });
            }
          } else {
            res.send("No user found");
          }
        }
      );
    });
  } catch (error) {
    if (error) res.send(error.message);
  }
}

export async function createMentorAppointment(req, res, next) {
  const { date, mentor, timeSlot, email } = req.body;
  try {
    sql.connect(config, async (err) => {
      if (err) {
        return res.send(err.message);
      }
      const request = new sql.Request();
      request.input("date", sql.Date, date);
      request.query(
        "select * from booking_appointments_dtls where booking_date = @date",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            return res.send({
              error: "This date is booked all ready please choose another one!",
            });
          } else {
            sql.connect(config, async (err) => {
              if (err) res.send(err.message);
              const request = new sql.Request();
              request.query(
                "insert into booking_appointments_dtls (mentor_dtls_id,booking_mentor_date,booking_date,booking_time) VALUES('" +
                  mentor +
                  "','" +
                  date +
                  "','" +
                  date +
                  "','" +
                  timeSlot +
                  "' )",
                (err, success) => {
                  if (err) {
                    return res.send({ error: err.message });
                  }
                  if (success) {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = updateEmail(
                      email,
                      "Appointment Booking Confirmation",
                      "Successfully appointment is booked and mentor will be available on the same day with respective time!"
                    );
                    sgMail
                      .send(msg)
                      .then(() => {
                        return res.send({
                          success:
                            "Successfully appointment is Booked with the mentor",
                        });
                      })
                      .catch((error) => {
                        return res.send({
                          error:
                            "There was an error while submitting the details please try again later",
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