import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type DietPlan = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  specifications: string;
  pdfName: string;
  pdfDataUrl?: string;
  soldCount: number;
  createdAt: string;
};

type AdminForm = {
  title: string;
  price: string;
  category: string;
  description: string;
  specifications: string;
  pdfFile: File | null;
};

const STORAGE_KEY = "nutriguide-admin-plans";
const AUTH_STORAGE_KEY = "nutriguide-admin-auth";
const ADMIN_PASSWORD = "admin123";

const defaultPlans: DietPlan[] = [
  {
    id: "diabetes-guide",
    title: "Diabetes Meal Guide",
    price: 120,
    category: "Diabetes",
    description: "A practical 7-day plan for managing blood sugar with affordable Zambian foods.",
    specifications: "PDF guide, 7-day meal plan, grocery notes, protein and carb tips.",
    pdfName: "diabetes-guide.pdf",
    soldCount: 3,
    createdAt: "2026-07-30",
  },
  {
    id: "weight-loss-plan",
    title: "Weight Loss Starter Plan",
    price: 95,
    category: "Weight Loss",
    description: "A calorie-conscious plan built around local foods and easy meal prep.",
    specifications: "PDF guide, 10-day meal ideas, shopping list, food swaps.",
    pdfName: "weight-loss-plan.pdf",
    soldCount: 2,
    createdAt: "2026-07-30",
  },
];

function readPlansFromStorage(): DietPlan[] {
  if (typeof window === "undefined") {
    return defaultPlans;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPlans;
    }

    const parsed = JSON.parse(raw) as DietPlan[];
    return parsed.length > 0 ? parsed : defaultPlans;
  } catch {
    return defaultPlans;
  }
}

function savePlansToStorage(plans: DietPlan[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to read the selected PDF file."));
    reader.readAsDataURL(file);
  });
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | People's Choice Nutrition Care" },
      {
        name: "description",
        content: "Secure admin area for managing diet plans and reviewing sales activity.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [plans, setPlans] = useState<DietPlan[]>(() => readPlansFromStorage());
  const [form, setForm] = useState<AdminForm>({
    title: "",
    price: "",
    category: "Weight Loss",
    description: "",
    specifications: "",
    pdfFile: null,
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const authValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (authValue === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    savePlansToStorage(plans);
  }, [plans]);

  const stats = useMemo(() => {
    const totalSales = plans.reduce((sum, plan) => sum + plan.soldCount, 0);
    const revenue = plans.reduce((sum, plan) => sum + plan.price * plan.soldCount, 0);
    const bestSeller = [...plans].sort((a, b) => b.soldCount - a.soldCount)[0];

    return {
      totalPlans: plans.length,
      totalSales,
      revenue,
      bestSeller,
    };
  }, [plans]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
      return;
    }

    setPasswordError("The password you entered is not correct.");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!form.title.trim() || !form.description.trim() || !form.specifications.trim()) {
      setFormError("Please add a title, description and specifications.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setFormError("Please enter a valid price in dollars.");
      return;
    }

    if (!form.pdfFile) {
      setFormError("Please upload the diet plan PDF before saving.");
      return;
    }

    try {
      const pdfDataUrl = await fileToDataUrl(form.pdfFile);
      const newPlan: DietPlan = {
        id: `${form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        title: form.title.trim(),
        price: Number(form.price),
        category: form.category,
        description: form.description.trim(),
        specifications: form.specifications.trim(),
        pdfName: form.pdfFile.name,
        pdfDataUrl,
        soldCount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setPlans((current) => [newPlan, ...current]);
      setForm({
        title: "",
        price: "",
        category: "Weight Loss",
        description: "",
        specifications: "",
        pdfFile: null,
      });
      setFormSuccess(`Saved ${newPlan.title} and made it available for sale.`);
    } catch {
      setFormError("The PDF file could not be read. Please try again.");
    }
  }

  function handleRecordSale(planId: string) {
    setPlans((current) =>
      current.map((plan) => (plan.id === planId ? { ...plan, soldCount: plan.soldCount + 1 } : plan)),
    );
  }

  function logout() {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-[760px] items-center justify-center px-6 py-16">
        <div className="w-full rounded-2xl border border-line bg-paper p-8 shadow-[0_12px_40px_rgba(35,32,27,0.08)]">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
            Protected admin access
          </span>
          <h2 className="mb-2 text-[28px]">Admin portal</h2>
          <p className="mb-6 text-[15px] leading-relaxed text-ink-soft">
            Use the admin password to manage diet plans, pricing and sales activity.
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              className="rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
              placeholder="Enter the admin password"
            />
            {passwordError ? <p className="text-sm text-red-700">{passwordError}</p> : null}
            <button
              type="submit"
              className="inline-flex w-fit items-center rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim"
            >
              Enter admin dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
            Admin dashboard
          </span>
          <h2 className="text-[30px]">Manage plans for sale</h2>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft hover:border-ink"
        >
          Log out
        </button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-line bg-paper p-5">
          <div className="text-[12px] uppercase tracking-[0.08em] text-ink-soft">Total plans</div>
          <div className="mt-2 text-[24px] font-semibold">{stats.totalPlans}</div>
        </div>
        <div className="rounded-xl border border-line bg-paper p-5">
          <div className="text-[12px] uppercase tracking-[0.08em] text-ink-soft">Purchases</div>
          <div className="mt-2 text-[24px] font-semibold">{stats.totalSales}</div>
        </div>
        <div className="rounded-xl border border-line bg-paper p-5">
          <div className="text-[12px] uppercase tracking-[0.08em] text-ink-soft">Revenue</div>
          <div className="mt-2 text-[24px] font-semibold">K{stats.revenue}</div>
        </div>
        <div className="rounded-xl border border-line bg-paper p-5">
          <div className="text-[12px] uppercase tracking-[0.08em] text-ink-soft">Best seller</div>
          <div className="mt-2 text-[16px] font-semibold">
            {stats.bestSeller ? stats.bestSeller.title : "No sales yet"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <h3 className="mb-4 text-[20px]">Add a new diet plan</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-title">
                  Plan title
                </label>
                <input
                  id="plan-title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
                  placeholder="e.g. Heart Healthy Guide"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-price">
                  Price (K)
                </label>
                <input
                  id="plan-price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  className="rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
                  placeholder="120"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-category">
                Category
              </label>
              <select
                id="plan-category"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
              >
                <option>Weight Loss</option>
                <option>Diabetes</option>
                <option>Hypertension</option>
                <option>Pregnancy</option>
                <option>General</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-description">
                Diet details
              </label>
              <textarea
                id="plan-description"
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                className="min-h-[96px] rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
                placeholder="Describe what is included and who it is for"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-specs">
                Specifications
              </label>
              <textarea
                id="plan-specs"
                value={form.specifications}
                onChange={(event) => setForm((current) => ({ ...current, specifications: event.target.value }))}
                className="min-h-[96px] rounded-[7px] border border-line bg-white px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
                placeholder="Add meal length, nutrition focus or format details"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft" htmlFor="plan-pdf">
                PDF diet plan
              </label>
              <input
                id="plan-pdf"
                type="file"
                accept="application/pdf"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    pdfFile: event.target.files?.[0] ?? null,
                  }))
                }
                className="rounded-[7px] border border-dashed border-line bg-white px-3 py-3 text-[14px]"
              />
            </div>

            {formError ? <p className="text-sm text-red-700">{formError}</p> : null}
            {formSuccess ? <p className="text-sm text-leaf">{formSuccess}</p> : null}

            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim"
            >
              Save diet plan
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-line bg-paper p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[20px]">Current plans</h3>
            <span className="text-sm text-ink-soft">Track sales and update pricing</span>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-xl border border-line bg-white p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{plan.title}</div>
                    <div className="text-sm text-ink-soft">{plan.category}</div>
                  </div>
                  <div className="rounded-full bg-sand px-3 py-1 text-sm font-medium">K{plan.price}</div>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-ink-soft">{plan.description}</p>
                <p className="mb-3 text-sm text-ink-soft">{plan.specifications}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-sand-deep px-3 py-1">Sold: {plan.soldCount}</span>
                  <span className="rounded-full bg-sand-deep px-3 py-1">Revenue: K{plan.price * plan.soldCount}</span>
                  {plan.pdfDataUrl ? (
                    <a href={plan.pdfDataUrl} target="_blank" rel="noreferrer" className="text-leaf underline">
                      View PDF
                    </a>
                  ) : (
                    <span className="text-ink-soft">PDF: {plan.pdfName}</span>
                  )}
                </div>
                <button
                  onClick={() => handleRecordSale(plan.id)}
                  className="mt-3 rounded-lg border border-line px-3 py-2 text-sm font-medium hover:border-ink"
                >
                  Record a sale
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
