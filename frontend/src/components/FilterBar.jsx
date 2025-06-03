import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function FilterBar({ filters, setFilters }) {
  const [companies, setCompanies] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/api/questions`).then((res) => {
      const uniqueCompanies = [...new Set(res.data.map((q) => q.company))];
      setCompanies(uniqueCompanies);
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      <select
        value={filters.company}
        onChange={(e) => setFilters((f) => ({ ...f, company: e.target.value }))}
        className="select select-bordered select-sm"
      >
        <option value="">All Companies</option>
        {companies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        className="input input-bordered input-sm"
      />

      <select
        value={filters.sort}
        onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
        className="select select-bordered select-sm"
      >
        <option value="date">Newest</option>
        <option value="votes">Most Upvoted</option>
      </select>

      <input
        type="text"
        placeholder="Tag"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        className="input input-bordered input-sm"
      />

      <button
        onClick={() => setFilters((f) => ({ ...f, tag: tagInput }))}
        className="btn btn-sm btn-neutral"
      >
        Filter by Tag
      </button>
    </div>
  );
}