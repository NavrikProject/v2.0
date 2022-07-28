import sql from "mssql";
import config from "../config/dbconfig.js";
import sgMail from "@sendgrid/mail";
import { sendFeedbackEmail } from "../middleware/sendRemainder.js";

export async function insertFeedBackController(req, res) {
  let {
    bookingId,
    userEmail,
    mentorEmail,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
  } = req.body;
  try {
    sql.connect(config, (err) => {
      if (err) return res.send(err.message);
      const request = new sql.Request();
      request.input("userEmail", sql.VarChar, userEmail);
      request.input("bookingId", sql.Int, bookingId);
      request.query(
        "select * from booking_appointments_dtls where user_email = @userEmail AND booking_appt_id = @bookingId",
        (err, result) => {
          if (err) return res.send(err.message);
          if (result.recordset.length > 0) {
            const sessionStatus = "completed";
            const request = new sql.Request();
            request.input("userEmail", sql.VarChar, userEmail);
            request.input("sessionStatus", sql.VarChar, sessionStatus);
            request.input("bookingId", sql.Int, bookingId);
            const sqlUpdate =
              "UPDATE booking_appointments_dtls SET trainee_session_status = @sessionStatus WHERE booking_appt_id= @bookingId AND user_email = @userEmail";
            request.query(sqlUpdate, (err, result) => {
              if (err) return res.send(err.message);
              if (result) {
                sql.connect(config, (err) => {
                  if (err) return res.send(err.message);
                  const request = new sql.Request();
                  request.input("bookingId", sql.Int, bookingId);
                  request.query(
                    "select * from trainee_feedback_dtls where trainee_feedback_booking_id = @bookingId",
                    (err, result) => {
                      if (err) return res.send(err.message);
                      if (result.recordset.length > 0) {
                        return res.send({
                          error: "You have all ready submitted the feedback",
                        });
                      } else {
                        sql.connect(config, async (err) => {
                          if (err) res.send(err.message);
                          const request = new sql.Request();
                          request.query(
                            "insert into trainee_feedback_dtls (trainee_feedback_booking_id,trainee_feedback_user_email,trainee_feedback_mentor_email,trainee_feedback_useful,trainee_feedback_structure,trainee_feedback_relevant,trainee_feedback_clear,trainee_feedback_teaching,trainee_feedback_material,trainee_feedback_ad_time,trainee_feedback_learn_wp,trainee_feedback_aspects,trainee_feedback_improve_mentor,trainee_feedback_overall_exp,trainee_feedback_cr_date) VALUES('" +
                              bookingId +
                              "','" +
                              userEmail +
                              "','" +
                              mentorEmail +
                              "','" +
                              question1 +
                              "','" +
                              question2 +
                              "','" +
                              question3 +
                              "','" +
                              question4 +
                              "','" +
                              question5 +
                              "','" +
                              question6 +
                              "','" +
                              question7 +
                              "','" +
                              question8 +
                              "','" +
                              question9 +
                              "','" +
                              question10 +
                              "','" +
                              question11 +
                              "','" +
                              new Date().toISOString().substring(0, 10) +
                              "' )",
                            (err, success) => {
                              if (err) {
                                return res.send({ error: err.message });
                              }
                              if (success) {
                                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                                const msg = sendFeedbackEmail(
                                  userEmail,
                                  "Feedback submission",
                                  "submitted the feedback"
                                );
                                sgMail
                                  .send(msg)
                                  .then(() => {
                                    return res.send({
                                      success:
                                        "Thanks for your valuable feedback",
                                    });
                                  })
                                  .catch((error) => {
                                    return res.send({
                                      error:
                                        "There was an error while submitting the feedback",
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
              }
            });
          } else {
            return;
          }
        }
      );
    });
  } catch (error) {}
}
