const express = require("express");
const { install, completeSetup} = require("../controllers/wix.controller");

const router = express.Router();

router.get("/install", install);
router.post("/complete", completeSetup);

module.exports = router;
