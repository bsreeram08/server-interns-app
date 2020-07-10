const express = require("express");
const router = express.Router();
const practiceProblemsPage = require("../controllers/practiceProbController");
router.post("/addProblem", practiceProblemsPage.addProblem);
router.get("/getProblems", practiceProblemsPage.getProblems);
router.post("/addSolution", practiceProblemsPage.addSolution);
router.post("/getSolutions", practiceProblemsPage.getSolutions);
module.exports = router;
