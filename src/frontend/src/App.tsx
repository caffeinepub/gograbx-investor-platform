import { Moon, Sun } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

type Page =
  | "login"
  | "dashboard"
  | "bike"
  | "payouts"
  | "certificate"
  | "invest"
  | "family"
  | "notifications"
  | "maintenance"
  | "expansion";

type Bike = {
  id: string;
  x: number;
  y: number;
  status: string;
  battery: number;
  speed: number;
  investor: string;
  ownership: string;
  earnings: string;
  km: string;
  legal: string;
  city: string;
  roi: string;
};

type Payout = {
  date: string;
  bike: string;
  gross: string;
  investorShare: string;
  status: string;
};

type NotificationItem = {
  title: string;
  detail: string;
  type: string;
};

type InvestorBike = {
  id: string;
  investor: string;
  ownership: string;
  amount: string;
  today: string;
  month: string;
  legal: string;
  status: string;
};

type FamilyMember = {
  name: string;
  share: string;
  amount: string;
  role: string;
};

function StatCard({
  label,
  value,
  note,
}: { label: string; value: string; note?: string }) {
  return (
    <div className="group rounded-3xl border border-border bg-card/80 p-5 shadow-teal backdrop-blur transition-all duration-300 hover:shadow-teal-lg hover:border-primary/40">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-semibold text-foreground">
        {value}
      </div>
      {note ? (
        <div className="mt-1 text-xs text-emerald-400">{note}</div>
      ) : null}
      <div
        className="mt-3 h-0.5 w-full rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.72 0.18 195), oklch(0.78 0.22 195 / 0))",
        }}
      />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div>
      {eyebrow ? (
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

export default function GoGrabXFleetTracking() {
  const [page, setPage] = useState<Page>("login");
  const [selectedBikeId, setSelectedBikeId] = useState<string>("GGRX-024");
  const [isDark, setIsDark] = useState(true);

  const bikes: Bike[] = [
    {
      id: "GGRX-024",
      x: 12,
      y: 28,
      status: "Delivering",
      battery: 78,
      speed: 32,
      investor: "Ravi Kumar Family",
      ownership: "20%",
      earnings: "₹1,720",
      km: "96 km",
      legal: "AP39 EV 5421",
      city: "Tanuku",
      roi: "+12.4%",
    },
    {
      id: "GGRX-031",
      x: 34,
      y: 52,
      status: "Pickup",
      battery: 64,
      speed: 21,
      investor: "Mahesh Group",
      ownership: "15%",
      earnings: "₹1,260",
      km: "82 km",
      legal: "AP39 EV 6732",
      city: "Tanuku",
      roi: "+9.1%",
    },
    {
      id: "GGRX-044",
      x: 58,
      y: 22,
      status: "Charging",
      battery: 41,
      speed: 0,
      investor: "Lakshmi Investors",
      ownership: "25%",
      earnings: "₹940",
      km: "55 km",
      legal: "AP39 EV 1184",
      city: "Tanuku",
      roi: "+7.8%",
    },
    {
      id: "GGRX-057",
      x: 74,
      y: 60,
      status: "Delivering",
      battery: 86,
      speed: 29,
      investor: "Kiran Ventures",
      ownership: "10%",
      earnings: "₹1,880",
      km: "104 km",
      legal: "AP39 EV 9017",
      city: "Tanuku",
      roi: "+14.2%",
    },
    {
      id: "GGRX-072",
      x: 86,
      y: 36,
      status: "Idle",
      battery: 92,
      speed: 8,
      investor: "GoGrabX Reserve",
      ownership: "30%",
      earnings: "₹610",
      km: "34 km",
      legal: "AP39 EV 4475",
      city: "Tanuku",
      roi: "+4.6%",
    },
  ];

  const payouts: Payout[] = [
    {
      date: "Today",
      bike: "GGRX-024",
      gross: "₹1,720",
      investorShare: "₹206",
      status: "Settled",
    },
    {
      date: "Yesterday",
      bike: "GGRX-024",
      gross: "₹1,650",
      investorShare: "₹198",
      status: "Settled",
    },
    {
      date: "2 Days Ago",
      bike: "GGRX-057",
      gross: "₹1,880",
      investorShare: "₹119",
      status: "Settled",
    },
    {
      date: "3 Days Ago",
      bike: "GGRX-044",
      gross: "₹940",
      investorShare: "₹42",
      status: "Settled",
    },
  ];

  const notifications: NotificationItem[] = [
    {
      title: "Battery swap due soon",
      detail: "GGRX-044 battery fell below 45% and is near Railway Road.",
      type: "Maintenance",
    },
    {
      title: "Payout settled",
      detail: "₹206 has been settled to Ravi Kumar Family for GGRX-024.",
      type: "Finance",
    },
    {
      title: "Bike verified on ground",
      detail: "GGRX-024 was physically verified today in Tanuku market zone.",
      type: "Verification",
    },
    {
      title: "New city opening",
      detail:
        "Bhimavaram deployment page is now open for investor reservations.",
      type: "Expansion",
    },
  ];

  const statCards = [
    { label: "Active EV Bikes", value: "128" },
    { label: "Live Deliveries", value: "412" },
    { label: "Distance Today", value: "3,842 km" },
    { label: "Revenue Today", value: "₹1.86L" },
  ];

  const portfolioCards = [
    { label: "Portfolio Value", value: "₹4.8L", note: "+12.4% this month" },
    { label: "Bikes Owned", value: "05", note: "Across Tanuku network" },
    { label: "Investor Payout", value: "₹38,420", note: "Next-day settlement" },
    { label: "Verified Assets", value: "100%", note: "Live GPS + legal IDs" },
  ];

  const investorBikes: InvestorBike[] = [
    {
      id: "GGRX-024",
      investor: "Ravi Kumar Family",
      ownership: "20%",
      amount: "₹20,000",
      today: "₹206",
      month: "₹5,840",
      legal: "AP39 EV 5421",
      status: "Live on route",
    },
    {
      id: "GGRX-057",
      investor: "Ravi Kumar Family",
      ownership: "10%",
      amount: "₹10,000",
      today: "₹119",
      month: "₹3,120",
      legal: "AP39 EV 9017",
      status: "Delivering",
    },
    {
      id: "GGRX-044",
      investor: "Ravi Kumar Family",
      ownership: "5%",
      amount: "₹5,000",
      today: "₹42",
      month: "₹1,280",
      legal: "AP39 EV 1184",
      status: "Charging",
    },
  ];

  const familyMembers: FamilyMember[] = [
    {
      name: "Ravi Kumar",
      share: "8%",
      amount: "₹8,000",
      role: "Primary Holder",
    },
    { name: "Lakshmi Ravi", share: "4%", amount: "₹4,000", role: "Co-owner" },
    { name: "Karthik Ravi", share: "3%", amount: "₹3,000", role: "Co-owner" },
    { name: "Sowmya Ravi", share: "3%", amount: "₹3,000", role: "Co-owner" },
    {
      name: "Family Reserve",
      share: "2%",
      amount: "₹2,000",
      role: "Group Pool",
    },
  ];

  const selectedBike = useMemo(
    () => bikes.find((bike) => bike.id === selectedBikeId) ?? bikes[0],
    [selectedBikeId],
  );

  const linePoints = [38, 46, 42, 58, 63, 61, 76, 72, 84, 92];
  const linePath = linePoints
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${index * 32 + 6},${110 - value}`,
    )
    .join(" ");

  const openBike = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setPage("bike");
  };

  const SideNav = () => {
    const items: Array<[string, Page]> = [
      ["Dashboard", "dashboard"],
      ["Bike Detail", "bike"],
      ["Payouts", "payouts"],
      ["Certificate", "certificate"],
      ["Buy Bike", "invest"],
      ["Family Ownership", "family"],
      ["Notifications", "notifications"],
      ["Maintenance", "maintenance"],
      ["City Expansion", "expansion"],
    ];

    return (
      <div
        className="rounded-[2rem] border border-border p-4 shadow-2xl backdrop-blur"
        style={{
          background: isDark
            ? "linear-gradient(160deg, oklch(0.12 0.018 240 / 0.95) 0%, oklch(0.1 0.012 260 / 0.98) 100%)"
            : "linear-gradient(160deg, oklch(0.99 0.006 240 / 0.97) 0%, oklch(0.97 0.008 220 / 0.99) 100%)",
          boxShadow: isDark
            ? "0 0 0 1px oklch(0.72 0.18 195 / 0.12), 0 24px 60px oklch(0.04 0.01 260 / 0.8)"
            : "0 0 0 1px oklch(0.48 0.18 195 / 0.15), 0 24px 60px oklch(0.48 0.18 195 / 0.06)",
        }}
      >
        <div className="mb-5 px-3">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">
            GoGrabX
          </div>
          <div className="mt-1.5 font-display text-lg font-bold text-foreground">
            Investor OS
          </div>
          <div
            className="mt-2 h-px w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.18 195 / 0.5), transparent)",
            }}
          />
        </div>
        <div className="space-y-1.5">
          {items.map(([label, target], i) => (
            <button
              type="button"
              key={label}
              data-ocid={`sidenav.link.${i + 1}`}
              onClick={() => setPage(target)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                page === target
                  ? "text-primary-foreground shadow-teal"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                background:
                  page === target
                    ? "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.65 0.2 195))"
                    : "transparent",
                boxShadow:
                  page === target
                    ? "0 0 20px oklch(0.72 0.18 195 / 0.25)"
                    : undefined,
              }}
              onMouseEnter={(e) => {
                if (page !== target) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    isDark
                      ? "oklch(0.15 0.015 260 / 0.8)"
                      : "oklch(0.92 0.012 240 / 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (page !== target) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const AppShell = ({ children }: { children: ReactNode }) => (
    <div
      className={`relative min-h-screen overflow-x-hidden text-foreground${isDark ? "" : " light"}`}
      style={{
        background: isDark ? "oklch(0.08 0.01 260)" : "oklch(0.97 0.006 240)",
      }}
    >
      {/* Layered radial gradient background */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 80% 0%, oklch(0.72 0.18 195 / 0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 5% 90%, oklch(0.65 0.18 55 / 0.1) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.55 0.14 295 / 0.06) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Animated floating orbs */}
      <div
        className="orb-1 pointer-events-none fixed rounded-full blur-[120px]"
        aria-hidden="true"
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          right: "-100px",
          background: "oklch(0.72 0.18 195 / 0.12)",
        }}
      />
      <div
        className="orb-2 pointer-events-none fixed rounded-full blur-[100px]"
        aria-hidden="true"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-150px",
          left: "-80px",
          background: "oklch(0.65 0.18 55 / 0.1)",
        }}
      />
      <div
        className="orb-3 pointer-events-none fixed rounded-full blur-[140px]"
        aria-hidden="true"
        style={{
          width: "400px",
          height: "400px",
          top: "40%",
          left: "40%",
          background: "oklch(0.55 0.14 295 / 0.08)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.72 0.18 195 / 0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground backdrop-blur"
              style={{
                background: isDark
                  ? "oklch(0.13 0.015 260 / 0.8)"
                  : "oklch(0.95 0.01 240 / 0.9)",
              }}
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              Live Fleet Intelligence + Investor Portfolio
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              GoGrabX
              <span
                className="block text-2xl font-medium md:text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.65 0.18 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Investor Platform
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              A founder-demo investor operating system for EV bike ownership,
              payouts, co-ownership, maintenance, and expansion.
            </p>
          </div>

          <div
            className="rounded-3xl border border-border px-5 py-4 shadow-teal backdrop-blur"
            style={{
              background: isDark
                ? "linear-gradient(135deg, oklch(0.12 0.018 220 / 0.9), oklch(0.1 0.01 260 / 0.95))"
                : "linear-gradient(135deg, oklch(0.97 0.01 220 / 0.95), oklch(0.99 0.006 240 / 0.98))",
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              Investor Login
            </div>
            <div className="mt-1.5 font-display text-2xl font-bold text-emerald-400">
              Ravi Kumar Family
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Tanuku • West Godavari • Synced every 5 sec
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            data-ocid="theme.toggle"
            onClick={() => setIsDark((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border backdrop-blur transition-all duration-200 hover:border-primary/40 hover:shadow-teal"
            style={{
              background: isDark
                ? "oklch(0.13 0.015 260 / 0.8)"
                : "oklch(0.95 0.01 240 / 0.9)",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun size={18} className="text-secondary" />
            ) : (
              <Moon size={18} className="text-primary" />
            )}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <SideNav />
          <div>{children}</div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="text-primary/70 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden p-6 text-foreground${isDark ? "" : " light"}`}
      style={{
        background: isDark ? "oklch(0.08 0.01 260)" : "oklch(0.97 0.006 240)",
      }}
    >
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 75% 10%, oklch(0.72 0.18 195 / 0.15) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 10% 85%, oklch(0.65 0.18 55 / 0.12) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 40% at 45% 50%, oklch(0.55 0.14 295 / 0.08) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Animated orbs */}
      <div
        className="orb-1 pointer-events-none absolute rounded-full blur-[100px]"
        style={{
          width: "500px",
          height: "500px",
          top: "-100px",
          right: "0px",
          background: "oklch(0.72 0.18 195 / 0.15)",
        }}
      />
      <div
        className="orb-2 pointer-events-none absolute rounded-full blur-[80px]"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-80px",
          left: "0px",
          background: "oklch(0.65 0.18 55 / 0.12)",
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.72 0.18 195 / 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Login card */}
      <div
        className="relative w-full max-w-md rounded-[2rem] border border-border p-10 shadow-teal-lg backdrop-blur"
        style={{
          background: isDark
            ? "linear-gradient(145deg, oklch(0.12 0.02 240 / 0.95) 0%, oklch(0.1 0.012 265 / 0.98) 100%)"
            : "linear-gradient(145deg, oklch(0.99 0.005 240 / 0.97) 0%, oklch(0.97 0.008 220 / 0.99) 100%)",
        }}
      >
        {/* Logo glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
          style={{
            width: "180px",
            height: "80px",
            background: "oklch(0.72 0.18 195 / 0.3)",
          }}
        />

        <div className="relative">
          <div className="mb-1 text-sm font-bold uppercase tracking-[0.3em] text-primary/80">
            GoGrabX
          </div>
          <div
            className="mb-1 font-display text-xs uppercase tracking-[0.15em]"
            style={{ color: "oklch(0.65 0.18 55)" }}
          >
            Investor Portal
          </div>
          <h1 className="mb-3 font-display text-4xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Track your EV bike assets, earnings, GPS movement, and ownership
            certificates in one premium portal.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="login-investor-id"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Investor ID
              </label>
              <input
                id="login-investor-id"
                data-ocid="login.input"
                className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. GGXI-2024-RK"
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <input
                id="login-password"
                data-ocid="login.password.input"
                className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>

          <button
            type="button"
            data-ocid="login.primary_button"
            onClick={() => setPage("dashboard")}
            className="mt-6 w-full rounded-xl py-3.5 font-display text-base font-bold text-primary-foreground shadow-teal transition-all duration-200 hover:shadow-teal-lg hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.65 0.2 185))",
            }}
          >
            Login to Portfolio
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo credentials pre-loaded for founder pitch
          </p>
        </div>
      </div>
    </div>
  );

  const cardStyle = {
    background: isDark
      ? "linear-gradient(135deg, oklch(0.12 0.018 240 / 0.9) 0%, oklch(0.1 0.012 260 / 0.95) 100%)"
      : "linear-gradient(135deg, oklch(0.99 0.005 240 / 0.95) 0%, oklch(0.97 0.008 220 / 0.98) 100%)",
  };

  const renderCertificate = () => (
    <AppShell>
      <div
        className="rounded-[2rem] border border-border p-10 shadow-teal backdrop-blur"
        style={cardStyle}
      >
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">
          GoGrabX Technologies Private Limited
        </div>
        <h2 className="mb-6 mt-3 font-display text-3xl font-bold">
          Bike Ownership Certificate
        </h2>
        <p className="mb-6 text-muted-foreground">
          This certificate confirms Ravi Kumar Family owns a fractional share in
          the GoGrabX EV bike listed below.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Bike ID", selectedBike.id],
            ["Ownership", "20%"],
            ["Legal No", selectedBike.legal],
            ["Investor", "Ravi Kumar Family"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-xl border border-border p-4 text-sm"
              style={{
                background: isDark
                  ? "oklch(0.09 0.01 260 / 0.8)"
                  : "oklch(0.94 0.008 240 / 0.9)",
              }}
            >
              <span className="text-muted-foreground">{k}: </span>
              <span className="font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  const renderPayouts = () => (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Next-Day Settlement"
            title="Investor Payout History"
          />
          <div
            className="rounded-2xl border border-border px-4 py-3 text-sm text-emerald-400 backdrop-blur"
            style={{
              background: isDark
                ? "oklch(0.12 0.015 170 / 0.5)"
                : "oklch(0.95 0.012 170 / 0.6)",
            }}
          >
            Last payout synced 5 min ago
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[1.5rem] border border-border shadow-teal backdrop-blur"
          style={cardStyle}
        >
          <table className="w-full text-left" data-ocid="payouts.table">
            <thead>
              <tr
                style={{
                  background: isDark
                    ? "oklch(0.09 0.012 260 / 0.9)"
                    : "oklch(0.92 0.012 240 / 0.9)",
                  color: "oklch(0.72 0.18 195)",
                }}
              >
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Bike
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Gross Revenue
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Investor Share
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((row, i) => (
                <tr
                  key={`${row.date}-${row.bike}`}
                  data-ocid={`payouts.row.${i + 1}`}
                  className="border-t border-border transition-colors hover:bg-primary/5"
                >
                  <td className="p-4 text-sm text-muted-foreground">
                    {row.date}
                  </td>
                  <td className="p-4 text-sm font-semibold text-foreground">
                    {row.bike}
                  </td>
                  <td className="p-4 text-sm text-foreground">{row.gross}</td>
                  <td className="p-4 text-sm font-semibold text-emerald-400">
                    {row.investorShare}
                  </td>
                  <td className="p-4">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "oklch(0.7 0.18 160 / 0.15)",
                        color: "oklch(0.7 0.18 160)",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );

  const renderBike = () => (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionTitle
            eyebrow="Asset Detail"
            title={`${selectedBike.id} • ${selectedBike.legal}`}
          />
          <div
            className="rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground backdrop-blur"
            style={{
              background: isDark
                ? "oklch(0.12 0.015 250 / 0.6)"
                : "oklch(0.94 0.01 240 / 0.7)",
            }}
          >
            {selectedBike.city} •{" "}
            <span className="text-primary">{selectedBike.status}</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Distance Today" value={selectedBike.km} />
          <StatCard label="Revenue Today" value={selectedBike.earnings} />
          <StatCard label="Battery" value={`${selectedBike.battery}%`} />
          <StatCard label="Speed" value={`${selectedBike.speed} km/h`} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
          <div
            className="rounded-[2rem] border border-border p-6 shadow-teal backdrop-blur"
            style={cardStyle}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">ROI Trend</h3>
              <div
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "oklch(0.7 0.18 160 / 0.15)",
                  color: "oklch(0.7 0.18 160)",
                }}
              >
                {selectedBike.roi}
              </div>
            </div>
            <div
              className="mt-5 rounded-3xl border border-border p-4"
              style={{ background: "oklch(0.07 0.008 260 / 0.9)" }}
            >
              <svg viewBox="0 0 320 120" className="w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 195)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.22 195)" />
                  </linearGradient>
                </defs>
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {linePoints.map((value, index) => (
                  <circle
                    key={`circle-${index}-${value}`}
                    cx={index * 32 + 6}
                    cy={110 - value}
                    r="4"
                    fill="oklch(0.65 0.18 55)"
                  />
                ))}
              </svg>
              <div className="mt-4 grid grid-cols-5 gap-2 text-xs text-muted-foreground">
                <div>Week 1</div>
                <div>Week 2</div>
                <div>Week 3</div>
                <div>Week 4</div>
                <div>Month End</div>
              </div>
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-border p-6 shadow-teal backdrop-blur"
            style={cardStyle}
          >
            <h3 className="font-display text-xl font-bold">
              Asset Verification
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["Bike ID", selectedBike.id],
                ["Legal No", selectedBike.legal],
                ["Investor Group", selectedBike.investor],
                ["Current City", selectedBike.city],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-border p-4"
                  style={{
                    background: isDark
                      ? "oklch(0.09 0.01 260 / 0.7)"
                      : "oklch(0.94 0.008 240 / 0.8)",
                  }}
                >
                  <span className="text-muted-foreground">{k}: </span>
                  <span className="font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  const renderInvest = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Fund the Next Bike"
          title="Buy an EV Bike Share"
          subtitle="Choose a slot, see expected utilization, and fund the next deployment in Tanuku or upcoming cities."
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <div
            className="rounded-[2rem] border border-border p-6 shadow-teal backdrop-blur"
            style={cardStyle}
          >
            <h3 className="font-display text-xl font-bold">
              Bike Funding Structure
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["Target Amount", "₹1,00,000"],
                ["Minimum Slot", "₹20,000"],
                ["Settlement", "Next Day"],
                ["Deployment City", "Tanuku"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-border p-5 text-sm"
                  style={{
                    background: isDark
                      ? "oklch(0.09 0.01 260 / 0.8)"
                      : "oklch(0.94 0.008 240 / 0.9)",
                  }}
                >
                  <div className="text-muted-foreground">{k}</div>
                  <div className="mt-1 font-display text-lg font-bold text-foreground">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 h-3 overflow-hidden rounded-full"
              style={{
                background: isDark
                  ? "oklch(0.15 0.01 260)"
                  : "oklch(0.88 0.02 240)",
              }}
            >
              <div
                className="h-full w-[60%] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.18 195), oklch(0.65 0.18 55))",
                }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              ₹60,000 already reserved •{" "}
              <span className="text-primary">3/5 slots filled</span>
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-border p-6 shadow-teal backdrop-blur"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 195 / 0.08) 0%, oklch(0.65 0.18 55 / 0.06) 100%)",
            }}
          >
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">
              Investor CTA
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
              Reserve Your Bike Share
            </h3>
            <div className="mt-5 space-y-4">
              <input
                data-ocid="invest.name.input"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                placeholder="Investor name"
              />
              <input
                data-ocid="invest.amount.input"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                placeholder="Investment amount"
              />
              <select
                data-ocid="invest.city.select"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/60"
              >
                <option>Choose bike city</option>
                <option>Tanuku</option>
                <option>Bhimavaram</option>
                <option>Rajahmundry</option>
              </select>
              <button
                type="button"
                data-ocid="invest.primary_button"
                className="w-full rounded-xl py-3.5 font-display font-bold text-primary-foreground shadow-teal transition-all duration-200 hover:shadow-teal-lg hover:scale-[1.01]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 195), oklch(0.65 0.2 185))",
                }}
              >
                Reserve Bike Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  const renderFamily = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Co-ownership"
          title="Family Ownership Page"
          subtitle="This bike is split across multiple family members with clear share records and contribution mapping."
        />

        <div
          className="overflow-hidden rounded-[1.5rem] border border-border shadow-teal backdrop-blur"
          style={cardStyle}
        >
          <div
            className="grid grid-cols-4 gap-3 border-b border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "oklch(0.72 0.18 195)" }}
          >
            <div>Name</div>
            <div>Share</div>
            <div>Amount</div>
            <div>Role</div>
          </div>
          {familyMembers.map((member, i) => (
            <div
              key={member.name}
              data-ocid={`family.row.${i + 1}`}
              className="grid grid-cols-4 gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 transition-colors hover:bg-primary/5"
            >
              <div className="font-semibold text-foreground">{member.name}</div>
              <div className="text-primary">{member.share}</div>
              <div className="text-foreground">{member.amount}</div>
              <div className="text-muted-foreground">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  const renderNotifications = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle eyebrow="Alerts Center" title="Notifications" />
        <div className="space-y-4">
          {notifications.map((note, i) => (
            <div
              key={note.title}
              data-ocid={`notifications.item.${i + 1}`}
              className="rounded-[1.5rem] border border-border p-5 shadow-teal backdrop-blur transition-all hover:border-primary/40"
              style={cardStyle}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-bold text-foreground">
                  {note.title}
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "oklch(0.72 0.18 195 / 0.12)",
                    color: "oklch(0.72 0.18 195)",
                  }}
                >
                  {note.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {note.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  const renderMaintenance = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle eyebrow="Operations" title="Maintenance Alerts" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Battery Swap Due",
              sub: "GGRX-044 • 41% battery",
              color: "oklch(0.65 0.18 55)",
              ocid: "maintenance.item.1",
            },
            {
              title: "Brake Check",
              sub: "GGRX-031 scheduled tomorrow",
              color: "oklch(0.72 0.18 195)",
              ocid: "maintenance.item.2",
            },
            {
              title: "Tyre Review",
              sub: "GGRX-057 after 120 km route",
              color: "oklch(0.55 0.14 295)",
              ocid: "maintenance.item.3",
            },
          ].map((item) => (
            <div
              key={item.ocid}
              data-ocid={item.ocid}
              className="rounded-[1.5rem] border border-border p-5 backdrop-blur shadow-teal"
              style={{
                ...cardStyle,
                borderTopColor: item.color,
                borderTopWidth: "2px",
              }}
            >
              <div className="font-display text-lg font-bold text-foreground">
                {item.title}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {item.sub}
              </div>
              <div
                className="mt-3 h-1 w-12 rounded-full"
                style={{ background: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  const renderExpansion = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Growth Engine"
          title="City Expansion Screen"
          subtitle="Track where GoGrabX can deploy the next investor-funded EV fleet."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              city: "Tanuku",
              detail: "128 bikes live",
              status: "Operational",
              statusColor: "oklch(0.7 0.18 160)",
              bgColor: "oklch(0.7 0.18 160 / 0.08)",
              ocid: "expansion.item.1",
            },
            {
              city: "Bhimavaram",
              detail: "42 slots requested",
              status: "Opening Soon",
              statusColor: "oklch(0.65 0.18 55)",
              bgColor: "oklch(0.65 0.18 55 / 0.08)",
              ocid: "expansion.item.2",
            },
            {
              city: "Rajahmundry",
              detail: "Demand study active",
              status: "Pipeline",
              statusColor: "oklch(0.72 0.18 195)",
              bgColor: "oklch(0.72 0.18 195 / 0.08)",
              ocid: "expansion.item.3",
            },
          ].map((item) => (
            <div
              key={item.ocid}
              data-ocid={item.ocid}
              className="rounded-[1.5rem] border border-border p-6 backdrop-blur shadow-teal transition-all hover:border-primary/40"
              style={{ ...cardStyle, background: item.bgColor }}
            >
              <div className="font-display text-2xl font-bold text-foreground">
                {item.city}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.detail}
              </div>
              <div
                className="mt-4 text-sm font-bold"
                style={{ color: item.statusColor }}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  const renderDashboard = () => (
    <AppShell>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {statCards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_.9fr]">
          {/* Live City Map */}
          <div
            className="rounded-[2rem] border border-border p-4 shadow-teal backdrop-blur"
            style={cardStyle}
          >
            <div className="flex items-center justify-between px-2 py-2">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Live City Map
                </h2>
                <p className="text-sm text-muted-foreground">
                  Animated route movement across delivery hotspots
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {["Food", "Grocery", "Parcel"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-muted-foreground"
                    style={{
                      background: isDark
                        ? "oklch(0.14 0.015 260 / 0.7)"
                        : "oklch(0.93 0.01 240 / 0.8)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="relative mt-3 h-[560px] overflow-hidden rounded-[1.6rem] border border-border"
              data-ocid="dashboard.map_marker"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.07 0.008 260) 0%, oklch(0.09 0.012 250) 100%)",
              }}
            >
              {/* Teal grid lines */}
              <div
                className="map-grid absolute inset-0"
                style={{
                  backgroundImage: [
                    "linear-gradient(oklch(0.72 0.18 195 / 0.08) 1px, transparent 1px)",
                    "linear-gradient(90deg, oklch(0.72 0.18 195 / 0.08) 1px, transparent 1px)",
                  ].join(", "),
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Diagonal accent lines */}
              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="oklch(0.72 0.18 195 / 0.3)"
                  strokeWidth="0.2"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="oklch(0.72 0.18 195 / 0.15)"
                  strokeWidth="0.2"
                />
              </svg>

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M10,70 C18,52 26,40 34,42 S50,62 60,48 78,20 90,26"
                  fill="none"
                  stroke="oklch(0.72 0.18 195 / 0.65)"
                  strokeWidth="0.6"
                  className="route"
                />
                <path
                  d="M8,30 C20,24 30,24 40,30 S66,48 82,44 88,38 94,34"
                  fill="none"
                  stroke="oklch(0.65 0.18 55 / 0.65)"
                  strokeWidth="0.6"
                  className="route"
                />
                <path
                  d="M18,84 C28,78 38,68 48,70 S64,84 72,72 82,54 88,58"
                  fill="none"
                  stroke="oklch(0.7 0.18 160 / 0.65)"
                  strokeWidth="0.6"
                  className="route"
                />
                <path
                  d="M16,12 C28,22 32,40 42,44 S66,34 78,48 86,72 92,80"
                  fill="none"
                  stroke="oklch(0.7 0.16 295 / 0.55)"
                  strokeWidth="0.6"
                  className="route"
                />
              </svg>

              {/* Location labels */}
              {[
                {
                  label: "Market Hub",
                  pos: "left-[8%] top-[24%]",
                  color: "oklch(0.72 0.18 195)",
                },
                {
                  label: "Railway Road",
                  pos: "left-[32%] top-[49%]",
                  color: "oklch(0.65 0.18 55)",
                },
                {
                  label: "College Junction",
                  pos: "right-[11%] top-[23%]",
                  color: "oklch(0.7 0.18 160)",
                },
                {
                  label: "Vendor Cluster",
                  pos: "right-[18%] bottom-[18%]",
                  color: "oklch(0.7 0.16 295)",
                },
              ].map(({ label, pos, color }) => (
                <div
                  key={label}
                  className={`absolute ${pos} rounded-full border px-3 py-1 text-xs backdrop-blur`}
                  style={{
                    borderColor: `${color}40`,
                    background: `${color}18`,
                    color,
                  }}
                >
                  {label}
                </div>
              ))}

              {bikes.map((bike, index) => (
                <button
                  type="button"
                  key={bike.id}
                  data-ocid={`dashboard.map_marker.${index + 1}`}
                  onClick={() => openBike(bike.id)}
                  className={`absolute text-left ${
                    [
                      "bike-float-1",
                      "bike-float-2",
                      "bike-float-3",
                      "bike-float-4",
                      "bike-float-5",
                    ][index]
                  }`}
                  style={{ left: `${bike.x}%`, top: `${bike.y}%` }}
                >
                  <div className="relative">
                    <div
                      className="absolute -inset-3 rounded-full blur-xl pulse-dot"
                      style={{ background: "oklch(0.72 0.18 195 / 0.2)" }}
                    />
                    <div
                      className="asset-ring relative flex h-12 w-12 items-center justify-center rounded-2xl border shadow-teal"
                      style={{
                        borderColor: "oklch(0.72 0.18 195 / 0.5)",
                        background: isDark
                          ? "oklch(0.08 0.01 260 / 0.95)"
                          : "oklch(0.97 0.006 240 / 0.98)",
                      }}
                    >
                      <span className="text-lg">🛵</span>
                    </div>
                    <div
                      className="absolute left-14 top-1/2 w-56 -translate-y-1/2 rounded-2xl border px-3 py-3 text-xs shadow-teal-lg backdrop-blur"
                      style={{
                        borderColor: "oklch(0.72 0.18 195 / 0.3)",
                        background: "oklch(0.1 0.015 240 / 0.95)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          {bike.id}
                        </span>
                        <span className="text-emerald-400">
                          {bike.battery}%
                        </span>
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {bike.status} • {bike.speed} km/h
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                        <div>
                          Investor:{" "}
                          <span className="text-foreground">
                            {bike.investor}
                          </span>
                        </div>
                        <div>
                          Owns:{" "}
                          <span className="text-foreground">
                            {bike.ownership}
                          </span>
                        </div>
                        <div>
                          Today:{" "}
                          <span className="text-foreground">
                            {bike.earnings}
                          </span>
                        </div>
                        <div>
                          Distance:{" "}
                          <span className="text-foreground">{bike.km}</span>
                        </div>
                      </div>
                      <div
                        className="mt-2 text-[11px]"
                        style={{ color: "oklch(0.65 0.18 55)" }}
                      >
                        Legal No: {bike.legal}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Fleet Health */}
            <div
              className="rounded-[2rem] border border-border p-5 shadow-teal backdrop-blur"
              style={cardStyle}
            >
              <h3 className="font-display text-xl font-bold text-foreground">
                Fleet Health
              </h3>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Battery Efficiency", value: "91%" },
                  { label: "On-Time Deliveries", value: "96%" },
                  { label: "Utilization Rate", value: "84%" },
                  { label: "Investor Transparency", value: "100%" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-semibold text-foreground">
                        {item.value}
                      </span>
                    </div>
                    <div
                      className="h-2.5 overflow-hidden rounded-full"
                      style={{
                        background: isDark
                          ? "oklch(0.15 0.01 260)"
                          : "oklch(0.88 0.02 240)",
                      }}
                    >
                      <div
                        className="shimmer h-full rounded-full"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div
              className="rounded-[2rem] border border-border p-5 shadow-teal backdrop-blur"
              style={cardStyle}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Notifications
                </h3>
                <button
                  type="button"
                  data-ocid="dashboard.notifications.link"
                  onClick={() => setPage("notifications")}
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Open all
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {notifications.slice(0, 3).map((note, i) => (
                  <div
                    key={note.title}
                    data-ocid={`dashboard.notifications.item.${i + 1}`}
                    className="rounded-2xl border border-border p-4 transition-colors hover:border-primary/30"
                    style={{
                      background: isDark
                        ? "oklch(0.09 0.01 260 / 0.8)"
                        : "oklch(0.94 0.008 240 / 0.9)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-foreground">
                        {note.title}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {note.type}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {note.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio section */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <div
            className="rounded-[2rem] border border-border p-5 shadow-teal backdrop-blur"
            style={cardStyle}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Investor Portfolio
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A premium ownership view for every funded EV bike
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "oklch(0.65 0.18 55 / 0.12)",
                  color: "oklch(0.65 0.18 55)",
                }}
              >
                2026 Design
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {portfolioCards.map((card) => (
                <StatCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  note={card.note}
                />
              ))}
            </div>

            <div
              className="mt-6 overflow-hidden rounded-[1.5rem] border border-border"
              style={{
                background: isDark
                  ? "oklch(0.09 0.01 260 / 0.7)"
                  : "oklch(0.94 0.008 240 / 0.8)",
              }}
            >
              <div
                className="grid grid-cols-7 gap-3 border-b border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "oklch(0.72 0.18 195)" }}
              >
                <div>Bike ID</div>
                <div>Investor</div>
                <div>Ownership</div>
                <div>Invested</div>
                <div>Today</div>
                <div>Month</div>
                <div>Status</div>
              </div>
              {investorBikes.map((bike, i) => (
                <button
                  type="button"
                  key={bike.id}
                  data-ocid={`portfolio.row.${i + 1}`}
                  onClick={() => openBike(bike.id)}
                  className="grid w-full grid-cols-7 gap-3 border-b border-border px-4 py-4 text-left text-sm last:border-b-0 transition-colors hover:bg-primary/5"
                >
                  <div>
                    <div className="font-semibold text-foreground">
                      {bike.id}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.18 55)" }}
                    >
                      {bike.legal}
                    </div>
                  </div>
                  <div className="text-muted-foreground">{bike.investor}</div>
                  <div className="text-foreground">{bike.ownership}</div>
                  <div className="text-muted-foreground">{bike.amount}</div>
                  <div className="text-emerald-400">{bike.today}</div>
                  <div className="text-foreground">{bike.month}</div>
                  <div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: "oklch(0.7 0.18 160 / 0.15)",
                        color: "oklch(0.7 0.18 160)",
                      }}
                    >
                      {bike.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div
              className="rounded-[2rem] border border-border p-5 shadow-teal backdrop-blur"
              style={cardStyle}
            >
              <h3 className="font-display text-xl font-bold text-foreground">
                Quick Actions
              </h3>
              <div className="mt-4 grid gap-2">
                {[
                  ["Open Certificate", "certificate"],
                  ["View Payout History", "payouts"],
                  ["Open Family Ownership", "family"],
                  ["Buy Next Bike", "invest"],
                  ["View Expansion Plan", "expansion"],
                  ["Maintenance Alerts", "maintenance"],
                ].map(([label, target], i) => (
                  <button
                    type="button"
                    key={label}
                    data-ocid={`quickactions.button.${i + 1}`}
                    onClick={() => setPage(target as Page)}
                    className="rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
                    style={{
                      background: isDark
                        ? "oklch(0.09 0.01 260 / 0.6)"
                        : "oklch(0.94 0.008 240 / 0.7)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              className="rounded-[2rem] border border-border p-5 shadow-teal backdrop-blur"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 195 / 0.1) 0%, oklch(0.65 0.18 55 / 0.08) 100%)",
              }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                Investor-Grade Feature
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                Track, verify, and scale
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From co-ownership and payouts to maintenance and city expansion,
                this interface shows how GoGrabX can become a real EV investment
                product.
              </p>
            </div>
          </div>
        </div>

        {/* Test checklist */}
        <div
          className="rounded-[2rem] border border-border p-4 text-sm backdrop-blur"
          style={{
            background: isDark
              ? "oklch(0.1 0.01 260 / 0.7)"
              : "oklch(0.95 0.008 240 / 0.8)",
          }}
        >
          <div className="font-display font-bold text-foreground">
            Manual test checklist
          </div>
          <div className="mt-2 grid gap-2 text-muted-foreground md:grid-cols-2">
            <div>1. Login button opens dashboard.</div>
            <div>
              2. Sidebar switches between all pages without syntax errors.
            </div>
            <div>3. Clicking any bike on map opens bike detail page.</div>
            <div>
              4. Clicking any bike row in portfolio opens bike detail page.
            </div>
            <div>5. Notifications page renders all alerts.</div>
            <div>
              6. Invest, family, maintenance, and expansion pages render
              correctly.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  if (page === "login") return renderLogin();
  if (page === "certificate") return renderCertificate();
  if (page === "payouts") return renderPayouts();
  if (page === "bike") return renderBike();
  if (page === "invest") return renderInvest();
  if (page === "family") return renderFamily();
  if (page === "notifications") return renderNotifications();
  if (page === "maintenance") return renderMaintenance();
  if (page === "expansion") return renderExpansion();
  return renderDashboard();
}
