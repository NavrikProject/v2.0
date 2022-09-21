import dotenv from "dotenv";
import sql from "mssql/msnodesqlv8.js";

dotenv.config();
// Create connection to database
// user: process.env.SQL_AZURE_USERNAME,
//   password: process.env.SQL_AZURE_PWD,
//   database: process.env.SQL_AZURE_DATABASE,
//   server: process.env.SQL_AZURE_SERVER,
// const config = {
//   authentication: {
//     options: {
//       userName: process.env.SQL_AZURE_USERNAME, // update me
//       password: process.env.SQL_AZURE_PWD, // update me
//     },
//     type: "default",
//   },
//   server: process.env.SQL_AZURE_SERVER, // update me
//   options: {
//     database: process.env.SQL_AZURE_DATABASE, //update me
//     encrypt: true,
//     TrustServerCertificate: false,
//   },
// };

const config = {
  // user: process.env.SQL_AZURE_USERNAME,
  // password: process.env.SQL_AZURE_PWD,
  // database: process.env.SQL_AZURE_DATABASE,
  // server: process.env.SQL_AZURE_SERVER,
  database: "practiwiz",
  server: "MAHESH\\SQLEXPRESS",
  driver: "msnodesqlv8",
  user: "sa",
  password: "12345",
  port: 1443,
  options: {
    trustServerCertificate: true,
  },
};

export default config;
