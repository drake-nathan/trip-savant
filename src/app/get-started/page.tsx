"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

const GetStarted = () => {
  const tasks = useQuery(api.tasks.get);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-foreground text-2xl font-bold">Trip Savant</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </main>
    </div>
  );
};

export default GetStarted;
