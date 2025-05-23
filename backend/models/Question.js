const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  question: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, enum: ["DSA", "HR", "MCQ"], required: true },
  tags: [String],
  votes: { type: Number, default: 0 },
  submitter: {
    name: String,
    year: String,
    branch: String,
    email: String,
    displayName: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", QuestionSchema);
