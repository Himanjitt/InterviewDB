import React, { useState, useEffect } from "react";

export default function FilterBar({ filters, setFilters, companies = [] }) {
  const [tagInput, setTagInput] = useState("");
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setFilters((f) => ({ ...f, search: searchInput }));
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchInput, setFilters]);

  // Sync search input with filters
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setFilters((f) => ({ ...f, tag: tagInput }));
          }
        }}
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
