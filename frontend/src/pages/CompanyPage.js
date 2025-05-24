import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import config from "../config";

export default function CompanyPage({ user }) {
  const { company } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/api/questions?company=${company}`)
      .then((res) => setQuestions(res.data));
  }, [company]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{company} Interview Questions</h2>
      <div className="grid gap-4">
        {questions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q}
            onVote={() => {
              axios
                .get(`${config.API_BASE_URL}/api/questions?company=${company}`)
                .then((res) => setQuestions(res.data));
            }}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
