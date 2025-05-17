const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
// const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const moodRoutes = require("./routes/moodRoutes");

// Global middleware

const allowedOrigins = [
  process.env.FRONTEND_LOCAL_HOST_1,
  process.env.FRONTEND_LOCAL_HOST_2,
  process.env.FRONTEND_LIVE_HOST,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check development environment

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// define routes
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", userRoutes);
app.use("/api/moods", moodRoutes);
// define routes

// custom error handler middleware start

// app.use(globalErrorHandler);
// custom error handler middleware end

module.exports = app;
