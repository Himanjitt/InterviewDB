const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post("/", questionController.createQuestion);
router.get("/", questionController.getQuestions);
router.post("/:id/upvote", questionController.upvoteQuestion);
router.post("/:id/downvote", questionController.downvoteQuestion);
router.get("/company/:company", questionController.getCompanyQuestions);

module.exports = router;
