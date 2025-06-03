import React from 'react';

export default function Home({ user }) {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to NIT Silchar Interview Bank</h1>
      <p className="text-lg text-neutral-content">
        Explore real interview questions shared by your seniors. Use the navigation bar to view questions or contribute your own!
      </p>
    </div>
  );
}
