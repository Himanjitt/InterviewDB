import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import SubmitForm from "../components/SubmitForm";
import FilterBar from "../components/FilterBar";
import config from "../config";

export default function Home({ user }) {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    company: "",
    search: "",
    sort: "date",
    tag: "",
  });

  const fetchQuestions = async () => {
    let url = `${config.API_BASE_URL}/api/questions?`;
    if (filters.company) url += `company=${filters.company}&`;
    if (filters.search) url += `search=${filters.search}&`;
    if (filters.sort) url += `sort=${filters.sort === "votes" ? "votes" : ""}&`;
    if (filters.tag) url += `tag=${filters.tag}&`;
    const res = await axios.get(url);
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [filters]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <SubmitForm onSubmit={fetchQuestions} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="mt-4 grid gap-4">
        {questions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q}
            onVote={fetchQuestions}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
