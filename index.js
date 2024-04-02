const express = require("express");
const dotenv = require("dotenv");
const Cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./mySQL-DB");
const gmatRoutes = require("./routes/gmat-routes");
const userRoutes = require("./routes/users-route");
const gmatUserActivityRoutes = require("./routes/gmat-user-actvity-route");
const otpAuth = require("./routes/otp-auth");
const examRoutes = require("./routes/exam-routes");
const profilerRoutes = require("./routes/profiler-routes");
const tokenRoutes = require("./routes/verify-token");
const trackDataRoutes = require("./routes/track-data-route");
const checkoutRoutes = require("./Payment/checkout");
//App config
const app = express();
const port = process.env.PORT || 8003;

//middleware
dotenv.config();
app.use(Cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err.message);
  });

app.use("/api/gmat", gmatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/gmat/user-activity", gmatUserActivityRoutes);
app.use("/api/otp", otpAuth);
app.use("/api/exams", examRoutes);
app.use("/api/profiler", profilerRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/track-data", trackDataRoutes);
app.use(checkoutRoutes);
app.listen(port, () => console.log(`server is up on ${port}`));
