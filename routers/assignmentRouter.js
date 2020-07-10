const express = require("express");
const router = express.Router();
const assignmentPage = require("../controllers/assignmentController");
router.post("/add", assignmentPage.addAssignment);
router.get("/view", assignmentPage.AllAssignments);
module.exports = router;
