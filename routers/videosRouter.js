const express = require('express');
const router = express.Router();
const videosControllers = require("../controllers/videosController");
router.get("/getVideos", videosControllers.getVideos);
router.post("/addVideos", videosControllers.addVideos);
module.exports = router;