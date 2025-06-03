const Question = require("../models/QuestionsModel");

// Submit a new question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all questions (with filters, search, sort)
exports.getQuestions = async (req, res) => {
  try {
    const { company, search, sort, tag } = req.query;
    let filter = {};
    if (company) filter.company = company;
    if (tag) filter.tags = tag;
    if (search) filter.question = { $regex: search, $options: "i" };

    let query = Question.find(filter);

    if (sort === "votes") query = query.sort({ votes: -1 });
    else query = query.sort({ createdAt: -1 });

    const questions = await query.exec();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upvote a question
exports.upvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Downvote a question
exports.downvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: -1 } },
      { new: true }
    );
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get questions by company
exports.getCompanyQuestions = async (req, res) => {
  try {
    const company = req.params.company;
    const questions = await Question.find({ company });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
