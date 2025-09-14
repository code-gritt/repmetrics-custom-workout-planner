"use client";

import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Session {
  id: number;
  plan_name: string;
  session_date: string;
  completed_exercises: { exercise_id: number; reps_completed: number }[];
}

export default function Progress() {
  const { user, token } = useUserStore();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(
          "https://repmetrics-backend.onrender.com/api/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setSessions(data);
        } else {
          toast.error(data.error || "Failed to fetch progress");
        }
      } catch (err) {
        toast.error("Server error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      {sessions.length === 0 ? (
        <p>No sessions logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="border p-4 rounded">
              <p>
                <strong>Plan:</strong> {session.plan_name}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(session.session_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Exercises:</strong>
              </p>
              <ul>
                {session.completed_exercises.map((ex, idx) => (
                  <li key={idx}>
                    Exercise {ex.exercise_id}: {ex.reps_completed} reps
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
