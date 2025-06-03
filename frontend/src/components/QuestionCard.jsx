import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";

export default function QuestionCard({ question, onVote, user, showDetails = false }) {
  const handleVote = async (type) => {
    if (!user) {
      window.alert("Please login to vote.");
      return;
    }
    await axios.post(
      `${config.API_BASE_URL}/api/questions/${question._id}/${type}`
    );
    onVote();
  };

  return (
    <div className="card bg-base-100 shadow-md border border-neutral">
      <div className="card-body space-y-2">
        <div className="flex justify-between items-center">
          <Link to={`/company/${question.company}`} className="text-primary font-bold text-lg hover:underline">
            {question.company}
          </Link>
          <span className="text-sm text-neutral-500">
            {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="text-sm text-neutral-content">
          <span className="font-semibold">{question.role}</span> |{" "}
          <span>{question.category}</span>
        </div>

        {/* Question Title as Link */}
        <h3 className="text-base font-semibold">
          <h1 to={`/question/${question._id}`} className="text-white">
            {question.question}
          </h1>
        </h3>

        {showDetails && question.description && (
          <div className="text-sm whitespace-pre-wrap text-neutral-content">
            {question.description}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {question.tags?.map((tag) => (
            <div key={tag} className="badge badge-outline badge-primary text-xs">
              #{tag}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => handleVote("upvote")} className="btn btn-xs btn-success text-white">▲</button>
          <span>{question.votes}</span>
          <button onClick={() => handleVote("downvote")} className="btn btn-xs btn-error text-white">▼</button>
        </div>

        {question.submitter && (
          <div className="text-xs text-neutral-500 mt-2">
            Submitted by{" "}
            {question.submitter.name ||
              question.submitter.displayName ||
              "Anonymous"}
            {question.submitter.branch && `, ${question.submitter.branch}`}
            {question.submitter.year && `, ${question.submitter.year}`}
          </div>
        )}
      </div>
    </div>
  );
}
