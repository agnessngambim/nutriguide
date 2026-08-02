import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-header";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Consultation & Pricing | People's Choice Nutrition Care" },
      {
        name: "description",
        content:
          "From free condition guides to a $120 premium digital guide and 1-on-1 professional nutrition consultations from $350.",
      },
      { property: "og:title", content: "Consultation & Pricing" },
      {
        property: "og:description",
        content:
          "Free guidance, a premium downloadable guide, or a personalised 1-on-1 nutrition consultation.",
      },
    ],
  }),
  component: ConsultationPage,
});

const btnPrimary =
  "inline-flex items-center gap-2 self-start rounded-lg bg-leaf px-[22px] py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-leaf-dim";
const btnOutline =
  "inline-flex items-center gap-2 self-start rounded-lg border border-line bg-paper px-[22px] py-3 text-[14.5px] font-semibold hover:border-ink";

function ConsultationPage() {
  return (
    <section className="mx-auto max-w-[1040px] px-6 pb-20">
      <SectionLabel num="03" title="From free guidance to a professional plan" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col rounded-xl border border-line bg-paper p-[26px]">
          <div className="mb-1.5 font-display text-lg font-semibold">Free</div>
          <div className="mb-4 font-mono text-[22px] text-clay">$0</div>
          <ul className="mb-[22px] flex-1 list-disc pl-[18px] text-sm leading-[1.8] text-ink-soft">
            <li>Browse all condition guides</li>
            <li>General eat / limit lists</li>
            <li>Sample day per condition</li>
          </ul>
          <Link to="/" className={btnOutline}>
            Browse conditions
          </Link>
        </div>

        <div className="relative flex flex-col rounded-xl border border-leaf bg-paper p-[26px] shadow-[0_8px_24px_rgba(47,82,51,0.12)]">
          <span className="absolute -top-[11px] left-[26px] rounded-full bg-maize px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[0.04em] text-accent-foreground">
            Most booked
          </span>
          <div className="mb-1.5 font-display text-lg font-semibold">
            Premium Digital Guide
          </div>
          <div className="mb-4 font-mono text-[22px] text-clay">$120</div>
          <ul className="mb-[22px] flex-1 list-disc pl-[18px] text-sm leading-[1.8] text-ink-soft">
            <li>Full downloadable guide, all conditions</li>
            <li>7–14 day meal plans</li>
            <li>Auto-generated shopping lists</li>
            <li>Editable, printable format</li>
          </ul>
          <a href="mailto:hello@peopleschoicenutrition.zm?subject=Premium%20Digital%20Guide" className={btnPrimary}>
            Get the guide
          </a>
        </div>

        <div className="flex flex-col rounded-xl border border-line bg-paper p-[26px]">
          <div className="mb-1.5 font-display text-lg font-semibold">
            Professional Consultation
          </div>
          <div className="mb-4 font-mono text-[22px] text-clay">from $350</div>
          <ul className="mb-[22px] flex-1 list-disc pl-[18px] text-sm leading-[1.8] text-ink-soft">
            <li>1-on-1 session with a nutrition professional</li>
            <li>Plan personalised to your labs, budget and meds</li>
            <li>Follow-up check-in</li>
            <li>Priority for complex conditions (CKD, insulin-treated diabetes, etc.)</li>
          </ul>
          <a href="mailto:hello@peopleschoicenutrition.zm?subject=Consultation%20Booking" className={btnPrimary}>
            Book a session
          </a>
        </div>
      </div>
    </section>
  );
}
