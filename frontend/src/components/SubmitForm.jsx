import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import config from "../config";

export default function SubmitForm({ onSubmit = () => {} }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    question: "",
    year: "",
    category: "",
    tags: "",
    name: "",
    branch: "",
    yearOfStudy: "",
  });

   const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const payload = {
      company: form.company,
      role: form.role,
      question: form.question,
      year: form.year,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      submitter: {
        name: form.name,
        branch: form.branch,
        year: form.yearOfStudy,
        email: user?.email,
        displayName: user?.displayName,
      },
    };
    await axios.post(`${config.API_BASE_URL}/api/questions`, payload);
    setForm({
      company: "",
      role: "",
      question: "",
      year: "",
      category: "",
      tags: "",
      name: "",
      branch: "",
      yearOfStudy: "",
    });
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-md p-6 rounded-lg space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="input input-bordered w-full"
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="input input-bordered w-full"
        />
      </div>
      <textarea
        name="question"
        value={form.question}
        onChange={handleChange}
        placeholder="Question"
        required
        className="textarea textarea-bordered w-full"
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          required
          className="input input-bordered w-full"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Category">Select Category</option>
          <option value="DSA">DSA</option>
          <option value="HR">HR</option>
          <option value="SystemDesign">System Design</option>
          <option value="MCQ">MCQ</option>
        </select>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="input input-bordered w-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name (optional)"
          className="input input-bordered w-full"
        />
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          placeholder="Branch (optional)"
          className="input input-bordered w-full"
        />
        <input
          name="yearOfStudy"
          value={form.yearOfStudy}
          onChange={handleChange}
          placeholder="Year (optional)"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Submit Question
      </button>
    </form>
  );
}
