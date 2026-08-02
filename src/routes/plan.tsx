import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CONDITIONS, type Condition } from "@/data/conditions";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Build My Plan | People's Choice Nutrition Care" },
      {
        name: "description",
        content:
          "Answer a few questions and get a free starting meal plan and shopping list built around local Zambian foods.",
      },
      { property: "og:title", content: "Build a starting nutrition plan" },
      {
        property: "og:description",
        content:
          "A free, food-based starting point for managing your condition with locally available foods.",
      },
    ],
  }),
  component: PlanPage,
});

type Plan = {
  blocked: boolean;
  title: string;
  label: string;
  meals: [string, string][];
  note: string;
  shopping: string[];
};

type StorePlan = {
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

const STORAGE_KEY = "nutriguide-admin-plans";

function readPlansFromStorage(): StorePlan[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StorePlan[]) : [];
  } catch {
    return [];
  }
}

function PlanPage() {
  const [conditionId, setConditionId] = useState("");
  const [goal, setGoal] = useState("Manage my condition");
  const [budget, setBudget] = useState("Modest");
  const [mealsPerDay, setMealsPerDay] = useState("3");
  const [avoid, setAvoid] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<StorePlan[]>([]);

  useEffect(() => {
    setPlans(readPlansFromStorage());

    const syncPlans = () => setPlans(readPlansFromStorage());
    window.addEventListener("storage", syncPlans);

    return () => window.removeEventListener("storage", syncPlans);
  }, []);

  const selectedCondition = CONDITIONS.find((item) => item.id === conditionId);

  const relatedPlans = useMemo(() => {
    const queryTerms = [
      selectedCondition?.name,
      selectedCondition?.cat,
      goal,
      budget,
      conditionId,
      "diet plan",
    ]
      .filter(Boolean)
      .map((term) => term?.toLowerCase())
      .flatMap((term) => term?.split(/[^a-z0-9]+/).filter(Boolean) ?? []);

    if (queryTerms.length === 0) {
      return plans.slice(0, 3);
    }

    return plans
      .filter((storePlan) => {
        const haystack = [
          storePlan.title,
          storePlan.category,
          storePlan.description,
          storePlan.specifications,
        ]
          .join(" ")
          .toLowerCase();

        return queryTerms.some((term) => haystack.includes(term));
      })
      .slice(0, 3);
  }, [budget, conditionId, goal, plans, selectedCondition]);

  function generate() {
    const c = CONDITIONS.find((x) => x.id === conditionId);

    if (c?.id === "ckd") {
      setPlan({
        blocked: true,
        label: "PREVIEW BLOCKED",
        title: "This one needs a real professional",
        meals: [],
        note: "Please book a professional consultation so your plan can be built around your actual test results.",
        shopping: [],
      });
      return;
    }

    const base: Condition = c ?? CONDITIONS[0];
    const avoidTerm = avoid.trim().toLowerCase().split(" ").filter(Boolean).pop() ?? "";
    const adjust = (text: string) =>
      avoidTerm && text.toLowerCase().includes(avoidTerm)
        ? `${text.split(",")[0]} (adjusted — avoid noted item)`
        : text;

    const all: [string, string][] = [
      ["Breakfast", adjust(base.sample.breakfast)],
      ["Lunch", adjust(base.sample.lunch)],
      ["Dinner", adjust(base.sample.dinner)],
      ["Snack", adjust(base.sample.snack)],
    ];
    const count = Number(mealsPerDay);
    const meals = count >= 4 ? all : count === 2 ? [all[1], all[2]] : all.slice(0, 3);

    setPlan({
      blocked: false,
      label: `${(c ? c.name : "General").toUpperCase()} · ${goal.toUpperCase()} · ${budget.toUpperCase()} BUDGET`,
      title: "Your starting plan",
      meals,
      note: `This is a general starting point, not a medical prescription. ${
        c
          ? c.safety
          : "For anything condition-specific, a short consultation will make this far more precise to your body, budget and medication."
      }`,
      shopping: base.eat
        .slice(0, 6)
        .map((x) => x.split(",")[0].split("(")[0].trim()),
    });
  }

  const fieldClass =
    "rounded-[7px] border border-line bg-paper px-3 py-2.5 text-[14.5px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf";
  const labelClass =
    "text-xs font-semibold uppercase tracking-[0.05em] text-ink-soft";

  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-14">
      <div className="mb-8 rounded-[24px] border border-line bg-[linear-gradient(135deg,#f8f5eb,#edf4ea)] p-7 shadow-[0_18px_40px_rgba(18,56,31,0.06)]">
        <span className="mb-2.5 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
          Free preview + paid plans
        </span>
        <h2 className="mb-2.5 mt-0 text-[30px]">Build a starting plan that leads to the right fit</h2>
        <p className="max-w-[700px] text-[15px] leading-relaxed text-ink-soft">
          Try the free guide below to get a quick, practical starting point. If your
          search matches one of our admin-uploaded plan guides, you’ll also see the
          related paid diet plans ready for mobile money or bank payment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-line bg-paper p-7 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="pf-condition">
            Condition
          </label>
          <select
            id="pf-condition"
            className={fieldClass}
            value={conditionId}
            onChange={(e) => setConditionId(e.target.value)}
          >
            <option value="">General healthy eating</option>
            {CONDITIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="pf-goal">
            Goal
          </label>
          <select
            id="pf-goal"
            className={fieldClass}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option>Manage my condition</option>
            <option>Lose weight</option>
            <option>Maintain / gain weight</option>
            <option>General healthy eating</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="pf-budget">
            Budget level
          </label>
          <select
            id="pf-budget"
            className={fieldClass}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Modest</option>
            <option>Moderate</option>
            <option>Flexible</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="pf-meals">
            Meals per day
          </label>
          <select
            id="pf-meals"
            className={fieldClass}
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(e.target.value)}
          >
            <option>3</option>
            <option>4</option>
            <option>2</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className={labelClass} htmlFor="pf-avoid">
            Any foods to avoid (allergies, dislikes)
          </label>
          <input
            id="pf-avoid"
            className={fieldClass}
            value={avoid}
            onChange={(e) => setAvoid(e.target.value)}
            placeholder="e.g. no fish, no groundnuts"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim"
          >
            Generate my plan
          </button>
        </div>
      </div>

      {plan && (
        <div className="mt-7 overflow-hidden rounded-xl border border-line bg-paper">
          <div className="bg-leaf px-[26px] py-5 text-primary-foreground">
            <span className="font-mono text-xs opacity-75">{plan.label}</span>
            <h3 className="mb-0 mt-1 text-xl">{plan.title}</h3>
          </div>
          <div className="px-[26px] py-6">
            {plan.blocked ? (
              <p className="mt-0 text-[15px] leading-relaxed">
                Kidney-friendly eating depends on your stage of kidney disease
                and recent lab results — a generic plan here could do more harm
                than good.
              </p>
            ) : (
              plan.meals.map(([label, text]) => (
                <div
                  key={label}
                  className="grid grid-cols-[100px_1fr] gap-4 border-b border-line py-3 text-[14.5px] last:border-b-0"
                >
                  <div className="font-mono text-xs uppercase text-ink-soft">
                    {label}
                  </div>
                  <div>{text}</div>
                </div>
              ))
            )}

            <div className="mt-[18px] rounded-lg bg-sand-deep px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
              {plan.note}
            </div>

            {plan.blocked ? (
              <div className="mt-4">
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim"
                >
                  Book a consultation
                </Link>
              </div>
            ) : (
              <div className="mt-[22px]">
                <h4 className="mb-2.5 text-[13px] uppercase tracking-[0.06em] text-ink-soft">
                  Shopping list to get started
                </h4>
                <div className="flex flex-wrap gap-2">
                  {plan.shopping.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-line bg-sand px-3 py-1.5 text-[13px]"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-[22px] border border-line bg-paper p-6 shadow-[0_10px_35px_rgba(20,45,32,0.05)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
              Related paid guides
            </span>
            <h3 className="m-0 text-[24px]">Plans that fit this search</h3>
          </div>
          <div className="rounded-full bg-sand-deep px-4 py-2 text-sm font-semibold text-ink">
            {relatedPlans.length > 0 ? `${relatedPlans.length} matching guide${relatedPlans.length === 1 ? "" : "s"}` : "No paid plans yet"}
          </div>
        </div>

        {relatedPlans.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {relatedPlans.map((storePlan) => (
              <article
                key={storePlan.id}
                className="rounded-[18px] border border-line bg-[linear-gradient(180deg,#fff,#f7f7f1)] p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-clay">
                      {storePlan.category}
                    </div>
                    <h4 className="mt-1 text-[22px]">{storePlan.title}</h4>
                  </div>
                  <div className="rounded-full bg-leaf px-3 py-1 text-sm font-semibold text-primary-foreground">
                    K{storePlan.price}
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-ink-soft">
                  {storePlan.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2 text-[12px]">
                  <span className="rounded-full bg-sand-deep px-3 py-1">Sold: {storePlan.soldCount}</span>
                  <span className="rounded-full bg-sand-deep px-3 py-1">MoMo / Bank</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {storePlan.pdfDataUrl ? (
                    <a
                      href={storePlan.pdfDataUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Preview PDF
                    </a>
                  ) : null}
                  <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                    Pay by MoMo
                  </button>
                  <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                    Pay by bank
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[16px] border border-dashed border-line bg-sand px-4 py-5 text-sm text-ink-soft">
            No paid guides are uploaded yet for this search. Use the admin page to add a
            condition-specific PDF plan and it will appear here automatically.
          </div>
        )}
      </div>
    </section>
  );
}
