import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

export default function SubmitForm({ onSubmit }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    question: "",
    year: "",
    category: "DSA",
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
    await axios.post("http://localhost:5000/api/questions", payload);
    setForm({
      company: "",
      role: "",
      question: "",
      year: "",
      category: "DSA",
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
      className="bg-white p-4 rounded shadow mb-4 grid gap-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="border-2 border-black p-2 rounded"
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="border-2 border-black p-2 rounded"
        />
      </div>
      <textarea
        name="question"
        value={form.question}
        onChange={handleChange}
        placeholder="Question"
        required
        className="border-2 border-black p-2 rounded"
      />
      <div className="grid grid-cols-3 gap-2">
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          required
          className="border-2 border-black p-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border-2 border-black p-2 rounded"
        >
          <option value="DSA">DSA</option>
          <option value="HR">HR</option>
          <option value="MCQ">MCQ</option>
        </select>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="border-2 border-black p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name (optional)"
          className="border-2 border-black p-2 rounded"
        />
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          placeholder="Branch (optional)"
          className="border-2 border-black p-2 rounded"
        />
        <input
          name="yearOfStudy"
          value={form.yearOfStudy}
          onChange={handleChange}
          placeholder="Year (optional)"
          className="border-2 border-black p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Question
      </button>
    </form>
  );
}
