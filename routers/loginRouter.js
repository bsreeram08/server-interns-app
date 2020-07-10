const express = require("express");
const router = express.Router();
const loginPage = require("../controllers/loginController");
router.post("/usersLogin", loginPage.performUsersLogin);
router.post("/adminsLogin", loginPage.performAdminsLogin);
module.exports = router;
