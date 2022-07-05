import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import moment from "moment";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import updateEmail from "../middleware/updateEmail.js";

dotenv.config();
// in trainee profile
export async function getAllMentorBookings(req, res, next) {
  const { userEmail } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("userEmail", sql.VarChar, userEmail);
      request.query(
        "select * from booking_appointments_dtls where user_email = @userEmail",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            let mentorArray = [];
            result.recordset.forEach((mentor) => {
              let data = {
                bookingId: mentor.booking_appt_id,
                mentorEmail: mentor.mentor_email,
                userEmail: mentor.user_email,
                amount: mentor.mentor_amount,
                bookingDate: mentor.booking_mentor_date,
                bookedOn: mentor.booking_date,
                time: mentor.booking_time,
                confirmed: mentor.mentor_booking_confirmed,
                changes: mentor.trainee_modification_changed_times,
                paymentStatus: mentor.mentor_amount_paid_status,
                mentorId: mentor.mentor_dtls_id,
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

export async function getMentorAvailability(req, res, next) {
  const { mentorEmail } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("mentorEmail", sql.VarChar, mentorEmail);
      request.query(
        "select * from mentor_dtls where mentor_email = @mentorEmail",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            let mentorArray = [];
            result.recordset.forEach((mentor) => {
              let data = {
                availability: mentor.mentor_availability,
                endDate: mentor.mentor_available_end_date,
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

// get mentor booking dates in trainee profile
export async function getBookingDatesOfOnlyMentor(req, res) {
  const { mentorEmail } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("mentorEmail", sql.VarChar, mentorEmail);
      request.query(
        "select * from booking_appointments_dtls where mentor_email = @mentorEmail",
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

// update booking date for one time
export async function modifyBookingDate(req, res) {
  let bookingId = req.params.id;
  let date = req.body.date;
  date = new Date(new Date(date).setDate(new Date(date).getDate() + 1));
  // console.log(new Date(new Date(date).setDate(new Date(date).getDate() + 1)));
  // try {
  //   sql.connect(config, async (err) => {
  //     if (err) res.send(err.message);
  //     const request = new sql.Request();
  //     request.input("date", sql.Date, date);
  //     request.input("bookingId", sql.Int, bookingId);
  //     const sqlUpdate =
  //       "UPDATE temp_date_table SET temp_date = @date WHERE temp_id= @bookingId ";
  //     request.query(sqlUpdate, (err, success) => {
  //       if (err) {
  //         return res.send({ error: err.message });
  //       } else {
  //         console.log(success);
  //       }
  //     });
  //   });
  // } catch (error) {
  //   console.log(err.message);
  // }
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("bookingId", sql.Int, bookingId);
      request.query(
        "select * from booking_appointments_dtls where booking_appt_id = @bookingId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            const bookingId = result.recordset[0].booking_appt_id;
            let email = result.recordset[0].user_email;
            const changes = 1;
            const request = new sql.Request();
            request.input("changes", sql.Int, changes);
            request.input("bookingId", sql.Int, bookingId);
            request.input("date", sql.Date, date);
            const newDate = new Date();
            request.input("newDate", sql.Date, newDate);
            const sqlUpdate =
              "UPDATE booking_appointments_dtls SET booking_mentor_date = @date, booking_date = @newDate, trainee_modification_changed_times = @changes WHERE booking_appt_id= @bookingId ";
            request.query(sqlUpdate, (err, result) => {
              if (err) return res.send(err.message);
              if (result) {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                  from: "no-reply@practilearn.com",
                  to: email,
                  subject: "Appointment date is changed",
                  html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Practiwiz Training Programme</h2>
                          <p>Successfully appointment date is changed.
                          </p>
                          Do not reply this email address
                          </div>`,
                };
                sgMail
                  .send(msg)
                  .then(() => {
                    return res.send({
                      success: "Successfully appointment date is changed",
                    });
                  })
                  .catch((error) => {
                    return res.send({ error: error.message });
                  });
              } else {
                res.send({
                  error: error.message,
                });
              }
            });
          } else {
            return res.send({ error: "Couldn't find booking'" });
          }
        }
      );
    });
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
}

//create and modify order razorpay order
export async function modifyCreateOrder(req, res) {
  const { bookingId, date } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) {
        return res.send(err.message);
      }
      const request = new sql.Request();
      request.input("date", sql.Date, date);
      request.input("bookingId", sql.Int, bookingId);
      request.query(
        "select * from booking_appointments_dtls where booking_appt_id = @bookingId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            const mentorPrice = result.recordset[0].mentor_amount;
            const instance = new Razorpay({
              key_id: process.env.RAZORPAY_KEY_ID,
              key_secret: process.env.RAZORPAY_KEY_SECRET_STRING,
            });
            const options = {
              amount: (mentorPrice * 100) / 20,
              currency: "INR",
            };
            instance.orders
              .create(options)
              .then((order) => {
                res.send(order);
              })
              .catch((error) => {
                return res.send({ error: error.message });
              });
          } else {
            return res.send({
              error: "There is an error while creating the order",
            });
          }
        }
      );
    });
  } catch (error) {
    return res.send({
      error: "There was an error updating",
    });
  }
}

//create and update the booking time for second time and make payment
export async function modifyAppointmentAndMakePayment(req, res, next) {
  const { bookingId, razorpayPaymentId } = req.body;
  let date = req.body.date;
  var amount = req.body.amount;
  amount = amount / 100;
  date = new Date(new Date(date).setDate(new Date(date).getDate() + 1));
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("bookingId", sql.Int, bookingId);
      request.query(
        "select * from booking_appointments_dtls where booking_appt_id = @bookingId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            let email = result.recordset[0].user_email;
            const changes = 2;
            const request = new sql.Request();
            request.input("bookingId", sql.Int, bookingId);
            request.input("changes", sql.Int, changes);
            request.input("date", sql.Date, date);
            const newDate = new Date();
            request.input("newDate", sql.Date, newDate);
            const sqlUpdate =
              "UPDATE booking_appointments_dtls SET booking_mentor_date = @date, booking_date = @newDate, trainee_modification_changed_times = @changes WHERE booking_appt_id= @bookingId";
            request.query(sqlUpdate, (err, result) => {
              if (err) return res.send(err.message);
              if (result) {
                sql.connect(config, (err) => {
                  if (err) {
                    return res.send(err.message);
                  }
                  const request = new sql.Request();
                  request.input("bookingId", sql.Int, bookingId);
                  request.query(
                    "select * from modify_and_refund_payment_dtls where booking_appt_id = @bookingId",
                    (err, result) => {
                      if (err) return res.send(err.message);
                      if (result.recordset.length > 0) {
                        sql.connect(config, (err) => {
                          if (err) return res.send(err.message);
                          const request = new sql.Request();
                          request.input("bookingId", sql.Int, bookingId);
                          request.input("amount", sql.Int, amount);
                          request.input(
                            "razorpayPaymentId",
                            sql.VarChar,
                            razorpayPaymentId
                          );
                        });
                        let newModifyDate = new Date()
                          .toISOString()
                          .substring(0, 10);
                        request.input("newModifyDate", sql.Date, newModifyDate);
                        const sqlUpdate =
                          "UPDATE modify_and_refund_payment_dtls SET modify_date = @newModifyDate,  modify_payment_amount = @amount, modify_razorpay_payment_id= @razorpayPaymentId WHERE booking_appt_id= @bookingId";
                        request.query(sqlUpdate, (err, result) => {
                          if (err) return res.send(err.message);
                          if (result) {
                            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                            const msg = {
                              from: "no-reply@practilearn.com",
                              to: email,
                              subject: "Appointment date is changed",
                              html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Practiwiz Training Programme</h2>
                            <p>Successfully appointment date is changed.
                            </p>
                            Do not reply this email address
                            </div>`,
                            };
                            sgMail
                              .send(msg)
                              .then(() => {
                                return res.send({
                                  success:
                                    "Successfully appointment date is changed",
                                });
                              })
                              .catch((error) => {
                                return res.send({ error: error.message });
                              });
                          } else {
                            res.send({
                              error: error.message,
                            });
                          }
                        });
                      } else {
                        sql.connect(config, async (err) => {
                          if (err) res.send(err.message);
                          const request = new sql.Request();
                          request.input("bookingId", sql.Int, bookingId);
                          request.input("amount", sql.Int, amount);
                          request.input(
                            "razorpayPaymentId",
                            sql.VarChar,
                            razorpayPaymentId
                          );
                          request.query(
                            "insert into modify_and_refund_payment_dtls (booking_appt_id,user_email,modify_date,modify_payment_amount,modify_razorpay_payment_id) VALUES('" +
                              bookingId +
                              "','" +
                              email +
                              "','" +
                              new Date().toISOString().substring(0, 10) +
                              "','" +
                              amount +
                              "','" +
                              razorpayPaymentId +
                              "' )",
                            (err, success) => {
                              if (err) {
                                return res.send({ error: err.message });
                              }
                              if (success) {
                                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                                const msg = updateEmail(
                                  email,
                                  "booking date is changed email",
                                  "Successfully initiated changed the booking date process"
                                );
                                sgMail
                                  .send(msg)
                                  .then(() => {
                                    res.send({
                                      success:
                                        "Successfully changed the booking date",
                                    });
                                  })
                                  .catch((error) => {
                                    res.send({
                                      error:
                                        "There was an error while updating the appointment",
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
                res.send({
                  error: "There was an error updating",
                });
              }
            });
          } else {
            return res.send({ error: "Couldn't find booking'" });
          }
        }
      );
    });
  } catch (error) {}
}

// issue for refund
export async function issueRefundForBooking(req, res, next) {
  const { bookingId } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) {
        return res.send(err.message);
      }
      const request = new sql.Request();
      request.input("bookingId", sql.Int, bookingId);
      request.query(
        "select * from booking_appointments_dtls where booking_appt_id = @bookingId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            let amount = result.recordset[0].mentor_amount;
            let email = result.recordset[0].user_email;
            const paymentId = result.recordset[0].mentor_razorpay_payment_id;
            var refundAmount = amount - amount / 10;
            const instance = new Razorpay({
              key_id: process.env.RAZORPAY_KEY_ID,
              key_secret: process.env.RAZORPAY_KEY_SECRET_STRING,
            });
            instance.payments
              .refund(paymentId, {
                amount: refundAmount * 100,
                speed: "optimum",
              })
              .then((data) => {
                let refundId = data.id;
                let status = data.status;
                var newRefundAmount = data.amount;
                newRefundAmount = newRefundAmount / 100;
                sql.connect(config, (err) => {
                  if (err) {
                    return res.send(err.message);
                  }
                  const request = new sql.Request();
                  request.input("bookingId", sql.Int, bookingId);
                  request.query(
                    "select * from modify_and_refund_payment_dtls WHERE booking_appt_id = @bookingId",
                    (err, result) => {
                      if (err) return res.send(err.message);
                      if (result.recordset.length > 0) {
                        sql.connect(config, (err) => {
                          if (err) return res.send(err.message);
                          const request = new sql.Request();
                          request.input("bookingId", sql.Int, bookingId);
                          request.input(
                            "newRefundAmount",
                            sql.Int,
                            newRefundAmount
                          );
                          request.input("refundId", sql.VarChar, refundId);
                          let newModifyDate = new Date()
                            .toISOString()
                            .substring(0, 10);
                          request.input(
                            "newModifyDate",
                            sql.Date,
                            newModifyDate
                          );
                          const sqlUpdate =
                            "UPDATE modify_and_refund_payment_dtls SET refund_date = @newModifyDate,refund_payment_amount = @newRefundAmount, refund_razorpay_payment_id= @refundId WHERE booking_appt_id= @bookingId";
                          request.query(sqlUpdate, (err, result) => {
                            if (err) return res.send(err.message);
                            if (result) {
                              sql.connect(config, (err) => {
                                if (err) return res.send(err.message);
                                let amountPaidStatus = "Refunded";
                                request.input(
                                  "amountPaidStatus",
                                  sql.VarChar,
                                  amountPaidStatus
                                );
                                const sqlUpdate =
                                  "UPDATE booking_appointments_dtls SET mentor_amount_paid_status = @amountPaidStatus WHERE booking_appt_id= @bookingId ";
                                request.query(sqlUpdate, (err, result) => {
                                  if (err) return res.send(err.message);
                                  if (result) {
                                    sgMail.setApiKey(
                                      process.env.SENDGRID_API_KEY
                                    );
                                    const msg = updateEmail(
                                      email,
                                      "Refund email",
                                      "Successfully initiated the refund process"
                                    );
                                    sgMail
                                      .send(msg)
                                      .then(() => {
                                        res.send({
                                          success:
                                            "Successfully refund is initiated",
                                        });
                                      })
                                      .catch((error) => {
                                        res.send({
                                          error:
                                            "There was an error while booking the appointment",
                                        });
                                      });
                                  } else {
                                    return res.send({
                                      error: err.message,
                                    });
                                  }
                                });
                              });
                            } else {
                              res.send({
                                error: error.message,
                              });
                            }
                          });
                        });
                      } else {
                        sql.connect(config, async (err) => {
                          if (err) res.send(err.message);
                          const request = new sql.Request();
                          request.input("bookingId", sql.Int, bookingId);
                          request.query(
                            "insert into modify_and_refund_payment_dtls (booking_appt_id,user_email,refund_date,refund_payment_amount,refund_razorpay_payment_id) VALUES('" +
                              bookingId +
                              "','" +
                              email +
                              "','" +
                              new Date().toISOString().substring(0, 10) +
                              "','" +
                              refundAmount +
                              "','" +
                              refundId +
                              "' )",
                            (err, success) => {
                              if (err) {
                                return res.send({ error: err.message });
                              }
                              if (success) {
                                sql.connect(config, (err) => {
                                  if (err) return res.send(err.message);
                                  let amountPaidStatus = "Refunded";
                                  request.input(
                                    "amountPaidStatus",
                                    sql.VarChar,
                                    amountPaidStatus
                                  );
                                  const sqlUpdate =
                                    "UPDATE booking_appointments_dtls SET mentor_amount_paid_status = @amountPaidStatus WHERE booking_appt_id= @bookingId ";
                                  request.query(sqlUpdate, (err, result) => {
                                    if (err) return res.send(err.message);
                                    if (result) {
                                      sgMail.setApiKey(
                                        process.env.SENDGRID_API_KEY
                                      );
                                      const msg = updateEmail(
                                        email,
                                        "Refund email",
                                        "Successfully initiated the refund process"
                                      );
                                      sgMail
                                        .send(msg)
                                        .then(() => {
                                          res.send({
                                            success:
                                              "Successfully refund is initiated",
                                          });
                                        })
                                        .catch((error) => {
                                          res.send({
                                            error:
                                              "There was an error while booking the appointment",
                                          });
                                        });
                                    } else {
                                      return res.send({
                                        error: err.message,
                                      });
                                    }
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
              })
              .catch((error) => {
                return res.send({
                  error: error.message,
                });
              });
          } else {
            return res.send({
              error: "There is an error while creating the order",
            });
          }
        }
      );
    });
  } catch (error) {
    return res.send({
      error: "There was an error updating",
    });
  }
}
