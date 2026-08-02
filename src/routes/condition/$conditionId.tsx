import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CONDITIONS } from "@/data/conditions";

export const Route = createFileRoute("/condition/$conditionId")({
  loader: ({ params }) => {
    const condition = CONDITIONS.find((c) => c.id === params.conditionId);
    if (!condition) throw notFound();
    return { condition };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Condition not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { condition } = loaderData;
    const title = `${condition.name} — Nutrition Guide | People's Choice`;
    const description = condition.goal.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1040px] px-6 py-20">
      <h1 className="text-2xl">Condition not found</h1>
      <Link to="/" className="mt-4 inline-block text-sm text-leaf underline">
        ← All conditions
      </Link>
    </div>
  ),
  component: ConditionDetail,
});

function ConditionDetail() {
  const { condition: c } = Route.useLoaderData();
  const meals: [string, string][] = [
    ["Breakfast", c.sample.breakfast],
    ["Lunch", c.sample.lunch],
    ["Dinner", c.sample.dinner],
    ["Snack", c.sample.snack],
  ];

  return (
    <section className="mx-auto max-w-[1040px] px-6 pb-20 pt-10">
      <Link
        to="/"
        className="mb-[22px] inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft hover:text-leaf"
      >
        ← All conditions
      </Link>

      <div className="mb-1.5 flex items-center gap-4">
        <div
          className="plate size-14 shrink-0 rounded-full shadow-[inset_0_0_0_4px_var(--paper),0_0_0_1px_var(--line)]"
          style={{ "--split": c.split } as React.CSSProperties}
        />
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-clay">
            {c.cat}
          </div>
          <h1 className="m-0 text-[clamp(1.6rem,5vw,2rem)]">{c.name}</h1>
        </div>
      </div>

      <div className="my-6 rounded-md border-l-[3px] border-leaf bg-sand-deep px-[18px] py-4 text-[15px] leading-relaxed">
        <strong>Nutrition goal —</strong> {c.goal}
      </div>

      {c.gallery?.length ? (
        <div className="mb-7 overflow-hidden rounded-[10px] border border-line">
          <h3 className="m-0 bg-sand-deep px-5 py-3 text-sm uppercase tracking-[0.06em]">
            Image gallery
          </h3>
          <div className="grid grid-cols-1 gap-3 bg-paper p-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.gallery.slice(0, 6).map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${c.name} nutrition image ${index + 1}`}
                className="h-48 w-full rounded-lg border border-line object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-[10px] border border-line bg-paper p-5">
          <h3 className="mb-3.5 mt-0 text-sm uppercase tracking-[0.06em] text-leaf">
            ✓ Foods to eat
          </h3>
          <ul className="m-0 list-disc pl-[18px] text-[14.5px] leading-[1.7]">
            {c.eat.map((x: string) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[10px] border border-line bg-paper p-5">
          <h3 className="mb-3.5 mt-0 text-sm uppercase tracking-[0.06em] text-danger">
            ✕ Foods to limit
          </h3>
          <ul className="m-0 list-disc pl-[18px] text-[14.5px] leading-[1.7]">
            {c.limit.map((x: string) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-7 overflow-hidden rounded-[10px] border border-line">
        <h3 className="m-0 bg-sand-deep px-5 py-3 text-sm uppercase tracking-[0.06em]">
          Sample day
        </h3>
        {meals.map(([label, text]) => (
          <div
            key={label}
            className="grid grid-cols-[100px_1fr] gap-3.5 border-t border-line bg-paper px-5 py-3.5 text-[14.5px]"
          >
            <div className="font-mono text-xs text-ink-soft">{label}</div>
            <div>{text}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-[10px] border border-safety-border bg-safety px-5 py-[18px] text-sm leading-relaxed">
        <strong className="text-danger">Safety note:</strong> {c.safety}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/plan"
          className="inline-flex items-center gap-2 rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim"
        >
          Build my personal plan
        </Link>
        <Link
          to="/consultation"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-[22px] py-3 text-[14.5px] font-semibold hover:border-ink"
        >
          Book a consultation
        </Link>
      </div>
    </section>
  );
}
