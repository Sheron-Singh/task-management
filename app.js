const express = require("express");
const app = express();
const morgan = require("morgan");

const UserRoutes = require("./routes/user.route.js");
const TaskRoutes = require("./routes/task.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/tasks", TaskRoutes);

module.exports = app;