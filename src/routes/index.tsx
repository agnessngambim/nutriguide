import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CAT_LABEL, CAT_ORDER, CONDITIONS } from "@/data/conditions";
import { SectionLabel } from "@/components/site-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import React from 'react';

export default function App() {
  return (
    <div>
      <header style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Eat Well. Manage Better. Live Well.</h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>Zambia’s trusted guide to practical nutrition and dietary management.</p>
      </header>

      {/* rest of your app */}
    </div>
  );
}
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "People's Choice Nutrition Care Eat Well. Manage Better. Live Well. | Dietary Plans." },
      {
        name: "description",
        content:
          
          "Zambia’s trusted guide to practical nutrition and dietary management.Buy practical nutrition plans for common health conditions in Zambia, with mobile money and bank transfer checkout options.",
      },
      { property: "og:title", content: "People's Choice Nutrition Care" },
      {
        property: "og:description",
        content:
          "Professional, food-first diet plans and consultations for health conditions in Zambia.",
      },
    ],
  }),
  component: Home,
});

const FILTERS = ["All", "NCD", "Communicable", "Other"] as const;
const STORAGE_KEY = "nutriguide-admin-plans";

type StoredPlan = {
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

const heroImages = Array.from({ length: 63 }, (_, index) => {
  const imageNumber = index + 1;
  const extension = imageNumber === 3 ? "png" : "jpeg";
  return `/muscle-building/image${imageNumber}.${extension}`;
});

const trustPoints = [
  "Practical Zambian meal guidance",
  "Condition-focused plan design",
  "Easy MoMo and bank payment paths",
  "Trusted by families seeking day-to-day structure",
];

const testimonials = [
  {
    quote:
      "The plan made me feel less overwhelmed. I finally knew what to eat and what to avoid.",
    name: "M. Chanda",
  },
  {
    quote:
      "The mix of free guidance and paid plan options gave me confidence to keep coming back.",
    name: "N. Banda",
  },
  {
    quote:
      "It looks like a real health business and the support path feels professional.",
    name: "K. Phiri",
  },
];

function readPlansFromStorage() {
  if (typeof window === "undefined") {
    return [] as StoredPlan[];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredPlan[]) : [];
  } catch {
    return [] as StoredPlan[];
  }
}

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [plans, setPlans] = useState<StoredPlan[]>([]);
  const [heroApi, setHeroApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    setPlans(readPlansFromStorage());

    const syncPlans = () => setPlans(readPlansFromStorage());
    window.addEventListener("storage", syncPlans);
    return () => window.removeEventListener("storage", syncPlans);
  }, []);

  useEffect(() => {
    if (!heroApi) {
      return;
    }

    const timer = window.setInterval(() => {
      heroApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(timer);
  }, [heroApi]);

  const q = search.trim().toLowerCase();
  const grouped = CAT_ORDER.map((cat) => ({
    cat,
    items: CONDITIONS.filter(
      (c) =>
        c.cat === cat &&
        (!q || c.name.toLowerCase().includes(q)) &&
        (filter === "All" || c.cat === filter),
    ),
  })).filter((g) => g.items.length > 0);

  const featuredPlans = useMemo(() => {
    return [...plans]
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 3);
  }, [plans]);

  return (
    <>
      <section className="border-b border-line px-6 pb-10 pt-10 md:pt-14">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="mb-3.5 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
              Zambia · Clinical-style guidance · Digital care marketplace
            </span>
            <h1 className="mb-4 max-w-[720px] text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] text-ink">
  The nutrition care guide
</h1>

<div className="space-y-3 mb-6">
  <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }} className="text-center">
    Eat Well. Manage Better. Live Well.
  </h1>
  <p style={{ fontSize: '1.125rem', color: '#6b7280', fontStyle: 'italic' }} className="text-center">
    Zambia’s trusted guide to practical nutrition and dietary management.
  </p>
</div>

<p className="mb-6 max-w-[620px] text-[17px] leading-relaxed text-ink-soft">
  A practical nutrition dietary management guide with diet plans, designed for specific condition/disease.
</p>
            <div className="mb-7 flex flex-wrap gap-3">
              <Link
                to="/plan"
                className="rounded-lg bg-leaf px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-leaf-dim"
              >
                Build my plan
              </Link>
              <Link
                to="/consultation"
                className="rounded-lg border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf"
              >
                Book a consultation
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Understand your condition",
                "Know what to eat",
                "Know what to limit",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[14px] border border-line bg-paper/80 p-4 text-sm font-medium text-ink-soft shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-[linear-gradient(135deg,#0f3f35,#145645)] p-3 text-paper shadow-[0_24px_60px_rgba(11,57,43,0.16)]">
            <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[22px] bg-paper/5 p-4 backdrop-blur-sm">
                <div className="mb-3 inline-flex rounded-full bg-paper/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/80">
                  Local business ready
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-paper/10 p-4">
                    <div className="text-[12px] uppercase tracking-[0.16em] text-paper/75">
                      Purchase options
                    </div>
                    <div className="mt-2 text-lg font-semibold">MTN MoMo · Airtel Money · Bank transfer</div>
                  </div>
                  <div className="rounded-2xl bg-paper/10 p-4">
                    <div className="text-[12px] uppercase tracking-[0.16em] text-paper/75">
                      Pricing shown in dollars
                    </div>
                    <div className="mt-2 text-lg font-semibold">$95 – $250 per plan</div>
                  </div>
                </div>
              </div>

              <Carousel
                setApi={setHeroApi}
                opts={{ loop: true }}
                className="relative overflow-hidden rounded-[22px] border border-white/10"
              >
                <CarouselContent>
                  {heroImages.map((image, index) => (
                    <CarouselItem key={image} className="basis-full">
                      <div
                        className="relative min-h-[420px] overflow-hidden rounded-[20px]"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.48)), url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute inset-x-0 bottom-0 p-4 text-xs uppercase tracking-[0.16em] text-paper/90">
                          Muscle slide {index + 1} · Zambian food visuals
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 border-white/40 bg-black/30 text-paper hover:bg-black/50" />
                <CarouselNext className="right-3 top-1/2 -translate-y-1/2 border-white/40 bg-black/30 text-paper hover:bg-black/50" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-line bg-paper py-4">
        <div className="marquee-shell">
          <div className="marquee-track">
            {[
              "Food-first nutrition",
              "Medication-aware meal support",
              "Smart diet plan delivery",
              "Mobile money and bank checkout",
              "Zambian market foods",
              "Professional consultation pathway",
            ].map((item) => (
              <div key={item} className="marquee-item">
                {item}
              </div>
            ))}
            {[
              "Food-first nutrition",
              "Medication-aware meal support",
              "Smart diet plan delivery",
              "Mobile money and bank checkout",
              "Zambian market foods",
              "Professional consultation pathway",
            ].map((item) => (
              <div key={`${item}-clone`} className="marquee-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-8 md:py-11">
        <div className="grid gap-3 md:grid-cols-4">
          {trustPoints.map((point) => (
            <div
              key={point}
              className="rounded-[18px] border border-line bg-paper/85 p-4 text-sm font-semibold text-ink-soft shadow-[0_10px_24px_rgba(24,42,35,0.04)]"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-6 md:pb-10">
        <div className="rounded-[24px] border border-line bg-[linear-gradient(180deg,#ffffff,#f5f4eb)] p-6 shadow-[0_12px_34px_rgba(17,60,33,0.05)]">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
                Best sellers
              </span>
              <h2 className="m-0 text-[24px]">Popular guides shoppers keep returning for</h2>
            </div>
            <Link to="/plan" className="text-sm font-semibold text-leaf underline-offset-4 hover:underline">
              See all plans
            </Link>
          </div>
          <div className="carousel-strip">
            {featuredPlans.length > 0 ? (
              featuredPlans.map((plan) => (
                <article key={plan.id} className="carousel-card">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-clay">{plan.category}</div>
                  <h3 className="mt-2 text-[22px] text-ink">{plan.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{plan.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
                    <span className="rounded-full bg-sand-deep px-3 py-1">K{plan.price}</span>
                    <span className="rounded-full bg-sand-deep px-3 py-1">{plan.soldCount} sold</span>
                  </div>
                </article>
              ))
            ) : (
              <article className="carousel-card">
                <div className="text-[11px] uppercase tracking-[0.14em] text-clay">No plans yet</div>
                <h3 className="mt-2 text-[22px] text-ink">Admin uploads will appear here</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Add a PDF through the admin page and it will be shown as a purchasable plan.
                </p>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-10 md:pb-14">
        <div className="rounded-[24px] border border-line bg-paper p-6 shadow-[0_12px_34px_rgba(17,60,33,0.05)]">
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
            How it works
          </span>
          <h2 className="m-0 text-[24px]">A simpler path from uncertainty to action</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              {
                title: "1. Search your condition",
                text: "Explore your health conditions such as cancer, diabetes, HIV,  gastritis, hypertension and many more: common nutrition corncens such as weight management, fitness, muscle building, and overall wellbeing ",
              },
              {
                title: "2. Explore your Personalist Nutrition",
                text: "Get a personalist preview based on ypur health needs, dietaly preferences, lifestyle, and wellness goals before proceeding with your full consultation.",
              },
              {
                title: "3. Compare paid guides",
                text: "When the search matches a downloadable guide, shoppers can review related paid nutrition plans and choose the best fit.",
              },
              {
                title: "4. Pay and receive support",
                text: "Choose mobile money or bank payment, then continue with the digital guide or book a professional consultation if needed.",
              },
            ].map((step) => (
              <div key={step.title} className="rounded-[18px] border border-line bg-sand p-4">
                <h3 className="mt-0 text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-10 md:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-line bg-paper p-6 shadow-[0_12px_34px_rgba(17,60,33,0.05)]">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
              Social proof
            </span>
            <h2 className="m-0 text-[24px]">Why people keep coming back</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[18px] border border-line bg-sand p-4">
                  <p className="text-sm leading-relaxed text-ink-soft">“{item.quote}”</p>
                  <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-clay">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-line bg-[linear-gradient(135deg,#0d3a2f,#175640)] p-6 text-paper shadow-[0_12px_34px_rgba(17,60,33,0.1)]">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper/80">
              Ready to pay
            </span>
            <h2 className="m-0 text-[24px] text-paper">Buy and download the right nutrition guide</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/85">
              Pick the guide you need, pay with MTN MoMo, Airtel Money or bank transfer,
              and receive the plan in an easy-to-follow digital format.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/plan" className="rounded-lg bg-paper px-4 py-3 text-sm font-semibold text-leaf">
                Start shopping
              </Link>
              <Link to="/consultation" className="rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-paper">
                Book support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-10 md:pb-14">
        <div className="rounded-[24px] border border-line bg-[linear-gradient(180deg,#ffffff,#f6f3e7)] p-6 shadow-[0_12px_34px_rgba(17,60,33,0.05)]">
          <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
            What you get
          </span>
          <h2 className="m-0 text-[24px]">A practical nutrition experience built for real-life decisions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-[18px] border border-line bg-paper p-4">
              <h3 className="mt-0 text-lg">Condition-specific direction</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Use the site to learn what foods typically support or limit for common nutrition concerns.
              </p>
            </div>
            <div className="rounded-[18px] border border-line bg-paper p-4">
              <h3 className="mt-0 text-lg">Digital plan access</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Paid diet guides are uploaded through the admin page and presented as downloadable, sellable resources.
              </p>
            </div>
            <div className="rounded-[18px] border border-line bg-paper p-4">
              <h3 className="mt-0 text-lg">Helpful next step</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                If the need is more advanced or clinically specific, the site points visitors toward a professional consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-10 md:py-14">
        <SectionLabel num="01" title="Diet plans available for purchase" />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPlans.length > 0 ? (
            featuredPlans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-[18px] border border-line bg-paper p-5 shadow-[0_10px_30px_rgba(21,39,37,0.05)]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-clay">
                      {plan.category}
                    </div>
                    <h3 className="mt-1 text-xl text-ink">{plan.title}</h3>
                  </div>
                  <div className="rounded-full bg-sand-deep px-3 py-1 text-sm font-semibold text-ink">
                    K{plan.price}
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-ink-soft">
                  {plan.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2 text-[12px]">
                  <span className="rounded-full bg-sand-deep px-3 py-1">Sold: {plan.soldCount}</span>
                  <span className="rounded-full bg-sand-deep px-3 py-1">Payment: MoMo / Bank</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.pdfDataUrl ? (
                    <a
                      href={plan.pdfDataUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      View PDF
                    </a>
                  ) : null}
                  <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                    Pay with MoMo
                  </button>
                  <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink">
                    Pay by bank
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[18px] border border-dashed border-line bg-paper p-6 text-sm text-ink-soft md:col-span-3">
              Upload plans from the admin dashboard to start selling them on the homepage.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-10">
        <div className="rounded-[22px] border border-line bg-paper p-6 shadow-[0_12px_34px_rgba(17,60,33,0.05)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-clay">
                Search conditions
              </span>
              <h2 className="m-0 text-[24px]">What health condition are you managing today?</h2>
            </div>
            <div className="flex max-w-[420px] flex-1 flex-wrap gap-2.5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a condition — e.g. diabetes, HIV, gout"
                className="min-w-[220px] flex-1 rounded-lg border border-line bg-sand px-4 py-3 text-[15px] outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2 pt-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3.5 py-[7px] text-[13px] font-medium transition-colors ${
                  filter === f
                    ? "border-leaf bg-leaf text-primary-foreground"
                    : "border-line bg-paper text-ink-soft hover:text-ink"
                }`}
              >
                {f === "All" ? "All conditions" : CAT_LABEL[f]}
              </button>
            ))}
          </div>

          {grouped.length === 0 ? (
            <div className="py-8 text-sm text-ink-soft">
              No condition matches "{search}". Try a different search, or clear
              filters.
            </div>
          ) : (
            grouped.map((g, i) => (
              <div key={g.cat}>
                <SectionLabel num={`0${i + 1}`} title={CAT_LABEL[g.cat]} />
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
                  {g.items.map((c) => (
                    <Link
                      key={c.id}
                      to="/condition/$conditionId"
                      params={{ conditionId: c.id }}
                      className="flex min-h-[132px] flex-col gap-2.5 rounded-[10px] border border-line bg-paper p-[18px] transition-all hover:-translate-y-0.5 hover:border-leaf-dim hover:shadow-[0_6px_18px_rgba(35,32,27,0.08)]"
                    >
                      <div
                        className="plate size-[30px] shrink-0 rounded-full"
                        style={{ "--split": c.split } as React.CSSProperties}
                      />
                      <div className="font-display text-base font-semibold leading-tight">
                        {c.name}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                        {c.cat}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
