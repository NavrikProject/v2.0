import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import moment from "moment";
import dotenv from "dotenv";
import Razorpay from "razorpay";

export async function getAllMentorBookingsInProfile(req, res, next) {
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
                id: mentor.booking_appt_id,
                mentorEmail: mentor.mentor_email,
                userEmail: mentor.user_email,
                amount: mentor.mentor_amount,
                bookingDate: mentor.booking_mentor_date,
                bookedOn: mentor.booking_date,
                time: mentor.booking_time,
                confirmed: mentor.mentor_booking_confirmed,
                changes: mentor.trainee_modification_changed_times,
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

export async function updateTheConfirmAppointment(req, res, next) {
  const paramsId = req.params.id;
  console.log(paramsId);
  try {
    sql.connect(config, (err) => {
      const request = new sql.Request();
      request.input("paramsId", sql.Int, paramsId);
      request.query(
        "SELECT * FROM booking_appointments_dtls WHERE booking_appt_id = @paramsId ",
        (err, result) => {
          if (err) res.send(err.message);
          if (result.recordset.length > 0) {
            const booking = result.recordset[0].mentor_booking_confirmed;
            var email = result.recordset[0].user_email;
            if (booking === "No") {
              const confirm = "Yes";
              const request = new sql.Request();
              request.input("confirm", sql.VarChar, confirm);
              request.input("paramsId", sql.Int, paramsId);
              const sqlUpdate =
                "UPDATE booking_appointments_dtls SET mentor_booking_confirmed =@confirm WHERE booking_appt_id = @paramsId";
              request.query(sqlUpdate, (err, result) => {
                if (err) return res.send(err.message);
                if (result) {
                  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                    from: "no-reply@practilearn.com",
                    to: email,
                    subject: "Mentor Booking confirm email",
                    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Practiwiz Training Programme</h2>
                          <p> You're mentor has approved the session.
                          </p>
                          Do not reply this email address
                          </div>`,
                  };
                  sgMail
                    .send(msg)
                    .then(() => {
                      res.send({
                        success: "Successfully approved the session ",
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
