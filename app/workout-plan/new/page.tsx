"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NewWorkoutPlan() {
  const { user, token, updateCredits } = useUserStore();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    goal: "",
    duration_days: "",
    exercises: [{ id: 1, name: "", reps: "", sets: "" }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://repmetrics-backend.onrender.com/api/workout-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        updateCredits(user!.credits - 10);
        toast.success("Workout plan created!");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Failed to create plan");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const addExercise = () => {
    setForm({
      ...form,
      exercises: [
        ...form.exercises,
        { id: form.exercises.length + 1, name: "", reps: "", sets: "" },
      ],
    });
  };

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4">Create Workout Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Plan Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Goal (e.g., Strength)"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Duration (days)"
          value={form.duration_days}
          onChange={(e) => setForm({ ...form, duration_days: e.target.value })}
        />
        {form.exercises.map((ex, index) => (
          <div key={ex.id} className="flex gap-2">
            <Input
              placeholder="Exercise Name"
              value={ex.name}
              onChange={(e) => {
                const exercises = [...form.exercises];
                exercises[index].name = e.target.value;
                setForm({ ...form, exercises });
              }}
            />
            <Input
              type="number"
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => {
                const exercises = [...form.exercises];
                exercises[index].reps = e.target.value;
                setForm({ ...form, exercises });
              }}
            />
            <Input
              type="number"
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => {
                const exercises = [...form.exercises];
                exercises[index].sets = e.target.value;
                setForm({ ...form, exercises });
              }}
            />
          </div>
        ))}
        <Button type="button" onClick={addExercise}>
          Add Exercise
        </Button>
        <Button type="submit">Create Plan</Button>
      </form>
    </section>
  );
}
