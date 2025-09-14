"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface WorkoutPlan {
  id: number;
  name: string;
  exercises: { id: number; name: string; reps: number; sets: number }[];
}

export default function LogSession() {
  const { user, token, updateCredits } = useUserStore();
  const router = useRouter();
  const { id } = useParams();
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [completedExercises, setCompletedExercises] = useState<
    { exercise_id: number; reps_completed: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `https://repmetrics-backend.onrender.com/api/workout-plans`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const selectedPlan = data.find(
            (p: WorkoutPlan) => p.id === Number(id)
          );
          if (selectedPlan) {
            setPlan(selectedPlan);
            setCompletedExercises(
              selectedPlan.exercises.map((ex: any) => ({
                exercise_id: ex.id,
                reps_completed: 0,
              }))
            );
          }
        } else {
          toast.error(data.error || "Failed to fetch plan");
        }
      } catch (err) {
        toast.error("Server error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://repmetrics-backend.onrender.com/api/session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            workout_plan_id: id,
            completed_exercises: completedExercises,
            session_date: new Date().toISOString(),
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        updateCredits(user!.credits - 5);
        toast.success("Session logged!");
        router.push("/progress");
      } else {
        toast.error(data.error || "Failed to log session");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (isLoading || !plan) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Log Session for {plan.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {plan.exercises.map((ex, index) => (
          <div key={ex.id} className="flex gap-2 items-center">
            <span>{ex.name}</span>
            <Input
              type="number"
              placeholder="Reps completed"
              value={completedExercises[index]?.reps_completed || 0}
              onChange={(e) => {
                const updated = [...completedExercises];
                updated[index] = {
                  exercise_id: ex.id,
                  reps_completed: Number(e.target.value),
                };
                setCompletedExercises(updated);
              }}
            />
          </div>
        ))}
        <Button type="submit">Log Session</Button>
      </form>
    </section>
  );
}
