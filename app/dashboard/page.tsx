"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";

interface Template {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  video_url: string | null;
}

interface Plan {
  id: number;
  name: string;
  user_id: number;
}

export default function Dashboard() {
  const { user, token, logout, isAuthenticated, updateCredits } =
    useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [pendingPlans, setPendingPlans] = useState<Plan[]>([]);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    category: "",
    description: "",
    video_url: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    // Redirect non-admin users from admin section
    if (user?.role === "user") {
      // Normal user dashboard data can be fetched here if needed
      setIsLoading(false);
      return;
    }

    if (user?.role === "admin") {
      const fetchData = async () => {
        try {
          const [templateRes, plansRes] = await Promise.all([
            fetch(
              "https://repmetrics-backend.onrender.com/api/exercise-templates",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            fetch("https://repmetrics-backend.onrender.com/api/pending-plans", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const [templateData, plansData] = await Promise.all([
            templateRes.json(),
            plansRes.json(),
          ]);

          if (templateRes.ok) setTemplates(templateData);
          if (plansRes.ok) setPendingPlans(plansData);
          if (!templateRes.ok || !plansRes.ok)
            toast.error("Failed to fetch data");
        } catch {
          toast.error("Server error");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, token, router, user]);

  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://repmetrics-backend.onrender.com/api/exercise-template",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(templateForm),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTemplates([...templates, data]);
        updateCredits(user!.credits - 20);
        toast.success("Template created!");
        setTemplateForm({
          name: "",
          category: "",
          description: "",
          video_url: "",
        });
      } else {
        toast.error(data.error || "Failed to create template");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handlePlanApproval = async (planId: number, approve: boolean) => {
    try {
      const res = await fetch(
        "https://repmetrics-backend.onrender.com/api/approve-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan_id: planId, approve }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPendingPlans(pendingPlans.filter((p) => p.id !== planId));
        toast.success(`Plan ${approve ? "approved" : "rejected"}`);
      } else {
        toast.error(data.error || "Failed to process plan");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="container py-32">
      <h2 className="text-3xl font-bold text-center mb-8">
        Welcome to Your Dashboard, {user?.name}
      </h2>
      <p className="text-center text-xl mb-8">
        Your current credits: {user?.credits}
      </p>

      {user?.role === "admin" && (
        <>
          <h3 className="text-xl font-semibold mb-4">
            Create Exercise Template
          </h3>
          <form onSubmit={handleTemplateSubmit} className="space-y-4 mb-8">
            <Input
              placeholder="Template Name"
              value={templateForm.name}
              onChange={(e) =>
                setTemplateForm({ ...templateForm, name: e.target.value })
              }
            />
            <Input
              placeholder="Category (e.g., Cardio)"
              value={templateForm.category}
              onChange={(e) =>
                setTemplateForm({ ...templateForm, category: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={templateForm.description}
              onChange={(e) =>
                setTemplateForm({
                  ...templateForm,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder="Video URL"
              value={templateForm.video_url}
              onChange={(e) =>
                setTemplateForm({ ...templateForm, video_url: e.target.value })
              }
            />
            <Button type="submit">Create Template</Button>
          </form>

          <h3 className="text-xl font-semibold mb-2">Pending Plans</h3>
          {pendingPlans.length === 0 ? (
            <p>No pending plans.</p>
          ) : (
            <ul className="space-y-4">
              {pendingPlans.map((plan) => (
                <li key={plan.id} className="border p-4 rounded">
                  <p>
                    <strong>Plan:</strong> {plan.name}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handlePlanApproval(plan.id, true)}>
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handlePlanApproval(plan.id, false)}
                    >
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="flex justify-center gap-4 mt-12">
        <Link href="/workout-plan/new">
          <Button>Create New Workout Plan</Button>
        </Link>
        <Link href="/progress">
          <Button variant="outline">View Progress</Button>
        </Link>
        <Link href="/workout-plans">
          <Button variant="outline">View Plans</Button>
        </Link>
        {user?.role === "admin" && (
          <Link href="/admin">
            <Button variant="outline">Admin Dashboard</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
