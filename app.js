const express = require("express");
const app = express();
const loginRouter = require("./routers/loginRouter.js");
const assignmentRouter = require("./routers/assignmentRouter.js");
const videosRouter = require("./routers/videosRouter");
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use("/assignment", assignmentRouter);
app.use("/videos", videosRouter);
app.get("/", (req, res) => {
  res.status(200).send({
    status: "SUCESS",
    message: "ONLINE"
  });
});
app.listen(port, (req, res) => {
  console.log("Listening to Port : " + port);
});
