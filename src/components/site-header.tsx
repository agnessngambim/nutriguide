import { Link, useLocation } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Conditions" },
  { to: "/plan", label: "Build My Plan" },
  { to: "/consultation", label: "Consultation" },
] as const;

export function SiteHeader() {
  const location = useLocation();
  const showAdminLink = location.pathname === "/admin";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="plate size-[34px] shrink-0 rounded-full" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold">People's Choice</div>
            <div className="text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              Nutrition Care
            </div>
          </div>
        </Link>
        <nav className="flex gap-4 text-sm font-medium sm:gap-[22px]">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-ink-soft transition-colors hover:text-ink data-[status=active]:text-leaf"
            >
              {item.label}
            </Link>
          ))}
          {showAdminLink ? (
            <Link to="/admin" className="text-ink-soft transition-colors hover:text-ink data-[status=active]:text-leaf">
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-7 text-center text-[13px] text-ink-soft">
      People's Choice Nutrition Care · Prototype · General guidance only — not a
      substitute for medical advice
    </footer>
  );
}

export function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-[18px] mt-12 flex items-baseline gap-3">
      <span className="font-mono text-[13px] text-clay">{num}</span>
      <h2 className="m-0 text-xl">{title}</h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
