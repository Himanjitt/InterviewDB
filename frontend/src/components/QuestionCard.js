import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function QuestionCard({ question, onVote, user }) {
  const handleVote = async (type) => {
    if (!user) {
      window.alert("Please login to vote.");
      return;
    }
    await axios.post(
      `http://localhost:5000/api/questions/${question._id}/${type}`
    );
    onVote();
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col gap-2 border-2 border-black">
      <div className="flex justify-between items-center">
        <Link
          to={`/company/${question.company}`}
          className="font-bold text-blue-600"
        >
          {question.company}
        </Link>
        <span className="text-sm text-gray-500">
          {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div>
        <span className="font-semibold">{question.role}</span> |{" "}
        <span>{question.category}</span>
      </div>
      <div className="text-lg">{question.question}</div>
      <div className="flex gap-2 flex-wrap">
        {question.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleVote("upvote")}
          className="bg-green-200 px-2 rounded"
        >
          ▲
        </button>
        <span>{question.votes}</span>
        <button
          onClick={() => handleVote("downvote")}
          className="bg-red-200 px-2 rounded"
        >
          ▼
        </button>
      </div>
      {question.submitter && (
        <div className="text-xs text-gray-600 mt-2">
          Submitted by{" "}
          {question.submitter.name ||
            question.submitter.displayName ||
            "Anonymous"}
          {question.submitter.branch && `, ${question.submitter.branch}`}
          {question.submitter.year && `, ${question.submitter.year}`}
        </div>
      )}
    </div>
  );
}
