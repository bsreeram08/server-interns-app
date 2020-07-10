const express = require("express");
const app = express();
const loginRouter = require("./routers/loginRouter.js");
const assignmentRouter = require("./routers/assignmentRouter.js");
const videosRouter = require("./routers/videosRouter");
const problemsRouter = require("./routers/practiceProbRouter");
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use("/assignment", assignmentRouter);
app.use("/videos", videosRouter);
app.use("/problems", problemsRouter);
app.get("/", (req, res) => {
  res.status(200).send({
    status: "SUCESS",
    message: "ONLINE"
  });
});
app.listen(port, (req, res) => {
  console.log("Listening to Port : " + port);
});
