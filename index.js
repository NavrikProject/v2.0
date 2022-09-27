import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import sql from "mssql/msnodesqlv8.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import authRouter from "./routes/authRoute.js";
import courseRoute from "./routes/courseRoute.js";
import courseRegdRoute from "./routes/courseRegdRoute.js";
import usersRoute from "./routes/usersRoute.js";
import trainerRoute from "./routes/trainerRoute.js";
import trainerProfileRoute from "./routes/trainerProfileRoute.js";
import traineeProfileRoute from "./routes/traineeProfileRoute.js";
import trainerEarningsRoute from "./routes/trainerEarningRoute.js";
import corporateCourseRoute from "./routes/corpCourseRoute.js";
import mentorRoute from "./routes/mentorRoute.js";
import TraineeBookingProfileRoute from "./routes/traineeBookingProfileRoute.js";
import mentorBookingRoute from "./routes/MentorBookingRoute.js";
import FeedbackRoute from "./routes/feedbackRoute.js";
import ContributersRoute from "./routes/contributersRoute.js";
import googleRoute from "./routes/googleRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import rescheduleRoute from "./routes/rescheduleRoute.js";
//import config from "./config/dbconfig.js";
import fs from "fs";
import masterRoute from "./routes/masterRoute.js";
import BlobServiceClient from "@azure/storage-blob";
import config from "./config/dbconfig.js";
import Vonage from "@vonage/server-sdk";

const __dirname = path.resolve();

const KEY_PATH = fs.readFileSync(`${__dirname}/middleware/private.key`, "utf8");
const vonage = new Vonage({
  apiKey: "5c1f377e",
  apiSecret: "c0QXia5GPkpyAyYF",
  applicationId: "715adc2f-3411-4896-8024-c0c7c6f83b2c",
  privateKey: KEY_PATH,
});

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "/mnt/testing")));

app.use(
  fileUpload({
    createParentPath: true,
  })
);
const port = process.env.PORT || 3000;

app.get("/api/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/hello-world", async (req, res) => {
  const category = req.query.name;
  const date = new Date().toLocaleDateString();
  const time = new Date().getTime();

  sql.connect(config, async (err, connection) => {
    console.log(connection);
    if (err) return res.send(err.message);
    const request = new sql.Request();
    request.query("select * from users_dtls", async (err, response) => {
      if (err) return res.send(err.message);
      console.log(response);
      res.send(response.recordset);
    });
  });
});

app.use("/api/auth", authRouter);
app.use("/api/courses/new", courseRegdRoute);
app.use("/api/courses", courseRoute);
app.use("/api/trainee", traineeProfileRoute);
app.use("/api/earnings", trainerEarningsRoute);
app.use("/api/trainer/profile", trainerProfileRoute);
app.use("/api/trainer", trainerRoute);
app.use("/api/users", usersRoute);
app.use("/api/corporate", corporateCourseRoute);
app.use("/api/mentor", mentorRoute);
app.use("/api/mentor/profile", TraineeBookingProfileRoute);
app.use("/api/mentor/bookings", mentorBookingRoute);
app.use("/api/feedback", FeedbackRoute);
app.use("/api/contributers", ContributersRoute);
app.use("/api/google", googleRoute);
app.use("/api", masterRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/reschedule", rescheduleRoute);
// BlobServiceClient.fromConnectionString(
//   process.env.AZURE_STORAGE_CONNECTION_STRING
// );
// console.log(blobServiceClient);
// async function getBlobServiceClient() {
//   if (!blobServiceClient) {
//     blobServiceClient = await BlobServiceClient.fromConnectionString(
//       "BlobEndpoint=https://navrikimages.blob.core.windows.net/;QueueEndpoint=https://navrikimages.queue.core.windows.net/;FileEndpoint=https://navrikimages.file.core.windows.net/;TableEndpoint=https://navrikimages.table.core.windows.net/;SharedAccessSignature=sv=2021-06-08&ss=bfqt&srt=c&sp=rwdlacupyx&se=2022-09-15T19:03:20Z&st=2022-09-15T11:03:20Z&spr=https&sig=oun1iznX7Ql2BDj6vsEZhlYUz5QQr3yfbYU714FgXdI%3D"
//     );
//   }
//   return blobServiceClient;
// }
// getBlobServiceClient();
app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});
