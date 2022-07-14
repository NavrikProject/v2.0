import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import moment from "moment";
import dotenv from "dotenv";
import azureStorage from "azure-storage";
import intoStream from "into-stream";
import updateEmail from "../middleware/updateEmail.js";
import bcrypt from "bcrypt";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import rp from "request-promise";
const containerName = "navrikimage";

dotenv.config();

const blobService = azureStorage.createBlobService(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

// to join as a mentor
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
  if (
    !email &&
    experience &&
    skills &&
    specialty &&
    password &&
    firstname &&
    lastname &&
    mentorshipArea &&
    from &&
    to &&
    req.files.image
  ) {
    return res.send({
      error: "All details must be required",
    });
  }
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
                      let startDate = new Date().toISOString().substring(0, 10);
                      let endDate = addMonths(new Date(startDate), 3);
                      endDate = endDate.toISOString().substring(0, 10);
                      if (err) res.send(err.message);
                      const request = new sql.Request();
                      request.query(
                        "insert into mentor_dtls (mentor_email,mentor_firstname,mentor_lastname,mentor_available_start_date,mentor_available_end_date,mentor_availability,mentor_availability_slot_from,mentor_availability_slot_to,mentor_creation,mentor_experience, mentor_skills,mentor_mentorship_area,mentor_speciality, mentor_sessions_conducted,mentor_image) VALUES('" +
                          email +
                          "','" +
                          firstname +
                          "','" +
                          lastname +
                          "','" +
                          startDate +
                          "','" +
                          endDate +
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

// in web page show the approved candidates
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
  } catch (error) {
    return;
  }
}

// approving the mentor
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

//disapproving the mentor
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

//create razor pay order
export async function createMentorRazorPayOrder(req, res, next) {
  const { mentorId, date } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) {
        return res.send(err.message);
      }
      const request = new sql.Request();
      request.input("date", sql.Date, date);
      request.input("mentorId", sql.Int, mentorId);
      request.query(
        "select * from mentor_dtls where mentor_dtls_id = @mentorId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            const mentorPrice = result.recordset[0].mentor_price;

            const instance = new Razorpay({
              key_id: process.env.RAZORPAY_KEY_ID,
              key_secret: process.env.RAZORPAY_KEY_SECRET_STRING,
            });
            const options = {
              amount: mentorPrice * 100,
              currency: "INR",
            };
            instance.orders
              .create(options)
              .then((order) => {
                res.send(order);
              })
              .catch((error) => {
                console.log(error.message);
              });
          } else {
            return res.send({
              error: "There is an error while creating the order",
            });
          }
        }
      );
    });
    // sql.connect(config, (err) => {
    //   if (err) {
    //     return res.json(err.message);
    //   }
    //   const request = new sql.Request();
    //   request.input("mentor", sql.Int, mentorId);
    //   request.query(
    //     "select * from booking_appointments_dtls where mentor_dtls_id = @mentor",
    //     (err, result) => {
    //       if (err) return res.send(err.message);
    //       if (result.recordset.length > 0) {
    //         result.recordset.forEach((mentor) => {
    //           if (
    //             mentor.mentor_dtls_id === mentorId &&
    //             new Date(mentor.booking_mentor_date).toLocaleDateString() ===
    //               date
    //           ) {
    //             return res.json({
    //               error:
    //                 "This date is all ready booked ,Please choose the another date",
    //             });
    //           }
    //         });
    //       }
    //     }
    //   );
    // });
  } catch (error) {
    console.log(err.message);
  }
}

const payload = {
  iss: process.env.ZOOM_APP_API_KEY,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, process.env.ZOOM_APP_API_SECRET_KEY);
// create an appointment
export async function createMentorAppointment(req, res, next) {
  const {
    mentorId,
    mentorEmail,
    userEmail,
    from,
    to,
    amount,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    date,
  } = req.body;

  const timeSlot = from + " " + "to" + " " + to;

  try {
    var options = {
      method: "POST",
      uri: "https://api.zoom.us/v2/users/me/meetings",
      body: {
        topic: "Appointment booking",
        type: 1,
        start_time: new Date(date),
        contact_email: userEmail,
        registrants_email_notification: true,
        calendar_type: 2,
        recurrence: {
          end_date_time: new Date(date),
          end_times: 7,
          monthly_day: 1,
          monthly_week: 1,
          monthly_week_day: 1,
          repeat_interval: 1,
          type: 1,
          weekly_days: "1",
        },
        settings: {
          host_video: "true",
          participant_video: "true",
        },
      },
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
      },
      json: true, //Parse the JSON string in the response
    };

    rp(options)
      .then(function (response) {
        let startUrl = response.start_url;
        let joinUrl = response.join_url;
        sql.connect(config, async (err) => {
          if (err) res.send(err.message);
          const request = new sql.Request();
          let amountPaid = "Paid";
          request.query(
            "insert into booking_appointments_dtls (mentor_dtls_id,mentor_email,user_email,booking_mentor_date,booking_date,booking_starts_time,booking_time,mentor_amount,mentor_razorpay_payment_id,mentor_razorpay_order_id,mentor_razorpay_signature,mentor_start_url,mentor_join_url,mentor_amount_paid_status) VALUES('" +
              mentorId +
              "','" +
              mentorEmail +
              "','" +
              userEmail +
              "','" +
              date +
              "','" +
              new Date().toISOString().substring(0, 10) +
              "','" +
              from +
              "','" +
              timeSlot +
              "','" +
              amount / 100 +
              "','" +
              razorpayPaymentId +
              "','" +
              razorpayOrderId +
              "','" +
              razorpaySignature +
              "','" +
              startUrl +
              "','" +
              joinUrl +
              "','" +
              amountPaid +
              "' )",
            (err, success) => {
              if (err) {
                return res.send({ error: err.message });
              }
              if (success) {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = updateEmail(
                  userEmail,
                  "Appointment Booking Confirmation",
                  "Successfully appointment is booked and mentor will be available on the same day with respective time!, " +
                    " " +
                    joinUrl
                );
                sgMail
                  .send(msg)
                  .then(() => {
                    const msg = updateEmail(
                      mentorEmail,
                      "Appointment Booking Confirmation",
                      "Some one has booked the appointment and the joining url is " +
                        " " +
                        startUrl
                    );
                    sgMail
                      .send(msg)
                      .then(() => {
                        res.send({
                          success:
                            "Successfully appointment is booked and mentor will be available on the same day with respective time",
                        });
                      })
                      .catch((error) => {
                        res.send({
                          error:
                            "There was an error while booking the appointment",
                        });
                      });
                  })
                  .catch((error) => {
                    res.send({
                      error: "There was an error while booking the appointment",
                    });
                  });
              }
            }
          );
        });
      })
      .catch(function (err) {
        // API call failed...
        console.log("API call failed, reason ", err.message);
      });
  } catch (error) {
    console.log(err.message);
  }
  // if (!bookAppointment) {
  // } else {
  //   const { amount, razorpayPaymentId, bookingId, date } = req.body;
  //   try {
  //     sql.connect(config, (err) => {
  //       if (err) return res.send(err.message);
  //       const request = new sql.Request();
  //       request.input("bookingId", sql.Int, bookingId);
  //       request.query(
  //         "select * from booking_appointments_dtls where booking_appt_id = @bookingId",
  //         (err, result) => {
  //           if (err) return res.send(err.message);
  //           if (result.recordset.length > 0) {
  //             let email = result.recordset[0].user_email;
  //             const changes = 2;
  //             const request = new sql.Request();
  //             request.input("changes", sql.Int, changes);
  //             request.input("date", sql.Date, date);
  //             const newDate = new Date();
  //             request.input("newDate", sql.Date, newDate);
  //             request.input("amount", sql.Int, amount);
  //             request.input(
  //               "razorpayPaymentId",
  //               sql.VarChar,
  //               razorpayPaymentId
  //             );
  //             const sqlUpdate =
  //               "UPDATE booking_appointments_dtls SET booking_mentor_date = @date, booking_date = @newDate, trainee_modification_changed_times = @changes,refund_razorpay_payment_id = @razorpayPaymentId, refund_amount = @amount WHERE booking_appt_id= @bookingId ";
  //             request.query(sqlUpdate, (err, result) => {
  //               if (err) return res.send(err.message);
  //               if (result) {
  //                 sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //                 const msg = {
  //                   from: "no-reply@practilearn.com",
  //                   to: email,
  //                   subject: "Appointment date is changed",
  //                   html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
  //                         <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Practiwiz Training Programme</h2>
  //                         <p>Successfully appointment date is changed.
  //                         </p>
  //                         Do not reply this email address
  //                         </div>`,
  //                 };
  //                 sgMail
  //                   .send(msg)
  //                   .then(() => {
  //                     return res.send({
  //                       success: "Successfully appointment date is changed",
  //                     });
  //                   })
  //                   .catch((error) => {
  //                     return res.send({
  //                       error: "There was an error updating",
  //                     });
  //                   });
  //               } else {
  //                 res.send({
  //                   error: "There was an error updating",
  //                 });
  //               }
  //             });
  //           } else {
  //             return res.send({ error: "Couldn't find booking'" });
  //           }
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     return res.send({
  //       error: "There was an error updating",
  //     });
  //   }
  // }
}

export async function getAllMentorApprovedDetailsAndAvailability(req, res) {
  let mentorApproved = "Yes";
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("mentorApproved", sql.VarChar, mentorApproved);
      request.query(
        "select * from mentor_dtls WHERE mentor_approved = @mentorApproved AND mentor_availability",
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

// to get only appointment dates in booking table
export async function getBookingDates(req, res) {
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.query(
        "select * from booking_appointments_dtls",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            let mentorArray = [];
            result.recordset.forEach((mentor) => {
              let data = {
                mentorId: mentor.mentor_dtls_id,
                bookedDate: new Date(
                  mentor.booking_mentor_date
                ).toLocaleDateString(),
              };
              mentorArray.push(data);
            });
            return res.send(mentorArray);
          } else {
            return;
          }
        }
      );
    });
  } catch (error) {
    res.send(error.message);
  }
}

// function to create add the Three months to joining date
function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

function addDays(date, days) {
  var d = date.getDay();
  date.setDay(date.getDay() + days);
  if (date.getDay() != d) {
    date.setDay(0);
  }
  return date;
}
//console.log(addMonths(new Date(), 3));
// console.log("The input date is :---- " + new Date("2022-01-01T12:46:02.166Z"));
// console.log(
//   "Final date after Three months is :---- " +
//     addMonths(new Date("2022-01-01T12:46:02.166Z"), 3)
// );

function findTheDateRangeAndWeekdays(startDate, endDate) {
  let count = 0;
  let newDates = [];
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      newDates.push(curDate.toLocaleDateString());
      count++;
      //console.log(new Date(curDate).toLocaleDateString());
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return newDates;
}
