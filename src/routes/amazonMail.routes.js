const express = require("express");
const amazonMail = require("../controllers/amazonMail.controller");

const router = express.Router();

router.post("/saveEmail", amazonMail.saveEmail);

module.exports = router;