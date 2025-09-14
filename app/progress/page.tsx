"use client";

import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      {sessions.length === 0 ? (
        <p>No sessions logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <motion.li
              key={session.id}
              className="border p-4 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
              <ul className="list-disc pl-5">
                {session.completed_exercises.map((ex, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Exercise {ex.exercise_id}: {ex.reps_completed} reps
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
