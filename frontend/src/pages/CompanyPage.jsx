import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import config from "../config";

export default function CompanyPage({ user }) {
  const { company } = useParams();
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(() => {
    axios
      .get(`${config.API_BASE_URL}/api/questions?company=${company}`)
      .then((res) => setQuestions(res.data));
  }, [company]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{company} Interview Questions</h2>
      <div className="grid gap-6">
        {questions.map((q) => (
          <QuestionCard key={q._id} question={q} onVote={fetchQuestions} user={user} />
        ))}
      </div>
    </div>
  );
}
