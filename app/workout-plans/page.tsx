"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface WorkoutPlan {
  id: number;
  name: string;
  goal: string | null;
  duration_days: number | null;
  exercises: { id: number; name: string; reps: number; sets: number }[];
  is_shared: boolean;
  pending_approval: boolean;
  created_at: string;
}

export default function WorkoutPlans() {
  const { user, token } = useUserStore();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          "https://repmetrics-backend.onrender.com/api/workout-plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPlans(data);
        } else {
          toast.error(data.error || "Failed to fetch plans");
        }
      } catch (err) {
        toast.error("Server error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, [token]);

  const submitForSharing = async (planId: number) => {
    try {
      const res = await fetch(
        `https://repmetrics-backend.onrender.com/api/workout-plan/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan_id: planId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPlans(
          plans.map((p) =>
            p.id === planId ? { ...p, pending_approval: true } : p
          )
        );
        toast.success("Plan submitted for approval");
      } else {
        toast.error(data.error || "Failed to submit plan");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Your Workout Plans</h2>
      {plans.length === 0 ? (
        <p>
          No plans created yet.{" "}
          <Link href="/workout-plan/new">Create one!</Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li key={plan.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p>
                <strong>Goal:</strong> {plan.goal || "None"}
              </p>
              <p>
                <strong>Duration:</strong> {plan.duration_days || "N/A"} days
              </p>
              <p>
                <strong>Exercises:</strong>
              </p>
              <ul className="list-disc pl-5">
                {plan.exercises.map((ex) => (
                  <li key={ex.id}>
                    {ex.name}: {ex.reps} reps, {ex.sets} sets
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2">
                <Link href={`/workout-plan/${plan.id}/log`}>
                  <Button>Log Session</Button>
                </Link>
                {!plan.is_shared && !plan.pending_approval && (
                  <Button onClick={() => submitForSharing(plan.id)}>
                    Submit for Sharing
                  </Button>
                )}
                {plan.pending_approval && <p>Pending Approval</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
