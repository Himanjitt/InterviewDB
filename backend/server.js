require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Configure CORS for production - hardcoded URLs
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://interview-db.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "InterviewDB API is running!", status: "OK" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/questions", require("./routes/QuestionsRoutes"));

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  const userId = req.body.userId;
  console.log(
    `Received message for Gemini chat from user ${userId}:`,
    userMessage
  );

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "You are an AI interview preparation assistant for the InterviewDB platform. Your goal is to help students prepare for job interviews. Be friendly, concise, and helpful.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Okay, I'm ready to help! How can I assist you with your interview preparation today?",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botReply = response.text();

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error calling Google Gemini API:", error);
    if (error.response) {
      console.error("Gemini API Error Details:", error.response.data);
    }
    res.status(500).json({
      reply:
        "Sorry, I'm having trouble connecting to the AI. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
