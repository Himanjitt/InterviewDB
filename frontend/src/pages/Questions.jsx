import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import FilterBar from "../components/FilterBar";
import config from "../config";

export default function Questions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    company: "",
    search: "",
    sort: "date",
    tag: "",
  });

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${config.API_BASE_URL}/api/questions?`;
      if (filters.company) url += `company=${filters.company}&`;
      if (filters.search) url += `search=${filters.search}&`;
      if (filters.sort)
        url += `sort=${filters.sort === "votes" ? "votes" : ""}&`;
      if (filters.tag) url += `tag=${filters.tag}&`;

      const res = await axios.get(url);
      setQuestions(res.data);

      // Extract unique companies for filter dropdown
      const uniqueCompanies = [
        ...new Set(res.data.map((q) => q.company)),
      ].sort();
      setCompanies(uniqueCompanies);
    } catch (err) {
      setError("Failed to load questions. Please try again.");
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filters]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-md border border-neutral animate-pulse"
        >
          <div className="card-body space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="flex gap-2">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-300 rounded w-8"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
              <div className="h-6 bg-gray-300 rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        companies={companies}
      />

      {error && (
        <div className="alert alert-error mb-6">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636"
              ></path>
            </svg>
            <label>{error}</label>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-ghost" onClick={fetchQuestions}>
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <LoadingSkeleton />
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No questions found
            </h3>
            <p className="text-gray-500 mb-4">
              {Object.values(filters).some((f) => f)
                ? "Try adjusting your filters to see more results."
                : "Be the first to share an interview question!"}
            </p>
            {Object.values(filters).some((f) => f) && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  setFilters({ company: "", search: "", sort: "date", tag: "" })
                }
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="text-sm text-gray-600 mb-4">
              Showing {questions.length} question
              {questions.length !== 1 ? "s" : ""}
              {Object.values(filters).some((f) => f) && (
                <button
                  className="ml-2 text-blue-600 hover:underline"
                  onClick={() =>
                    setFilters({
                      company: "",
                      search: "",
                      sort: "date",
                      tag: "",
                    })
                  }
                >
                  Clear filters
                </button>
              )}
            </div>
            {questions.map((q) => (
              <QuestionCard
                key={q._id}
                question={q}
                onVote={fetchQuestions}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
