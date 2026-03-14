import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { InvestorProfile } from "./backend.d";
import BlueprintPage from "./components/BlueprintPage";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

// ─── Types ───────────────────────────────────────────────────────────────────

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
  | "expansion"
  | "adminLogin"
  | "adminDashboard";

type AdminTab = "investors" | "bikes" | "payouts" | "expansion";

type AdminInvestor = {
  name: string;
  ownership: string;
  monthlyEstimate: string;
};

type AdminPayout = {
  date: string;
  bike: string;
  gross: string;
  investorShare: string;
  status: string;
};

type ExpansionCity = {
  name: string;
  bikeCount: string;
  status: string;
};

type FleetBike = {
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

type NotificationItem = {
  title: string;
  detail: string;
  type: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(val: bigint): string {
  return `₹${Number(val).toLocaleString("en-IN")}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  note,
}: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-cyan-500/25 via-slate-800/40 to-slate-900/20 p-px shadow-xl">
      <div className="rounded-3xl bg-slate-900/90 p-5 backdrop-blur">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="mt-2 font-display text-3xl font-semibold tracking-tight">
          {value}
        </div>
        {note ? (
          <div className="mt-1 text-xs text-emerald-400">{note}</div>
        ) : null}
      </div>
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
        <div className="text-sm uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-slate-300">{subtitle}</p> : null}
    </div>
  );
}

// ─── Demo Profile Selector ───────────────────────────────────────────────────

function DemoSelector({
  names,
  onSelect,
  loading,
  onBackToWebsite,
}: {
  names: string[];
  onSelect: (name: string) => void;
  loading: string | null;
  onBackToWebsite?: () => void;
}) {
  const icons = ["🏗️", "📦", "⚡"];
  const subtitles = [
    "Tanuku · West Godavari · 3 bikes",
    "Bhimavaram · West Godavari · 2 bikes",
    "Tanuku · West Godavari · 1 bike",
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6 text-white">
      <button
        type="button"
        data-ocid="login.back_to_website.button"
        onClick={onBackToWebsite}
        className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-2 text-sm text-slate-400 backdrop-blur transition hover:bg-slate-700/70 hover:text-white"
      >
        ← Back to Website
      </button>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,215,160,0.18),transparent),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(37,99,235,0.22),transparent)]" />
      <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-[10%] top-[30%] h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_40px_rgba(20,215,160,0.4)]">
              <svg
                role="img"
                aria-label="GoGrabX"
                viewBox="0 0 40 40"
                fill="none"
                className="h-8 w-8"
              >
                <path
                  d="M6 21C6 13.82 11.82 8 19 8H28V14H19C15.13 14 12 17.13 12 21C12 24.87 15.13 28 19 28C21.55 28 23.79 26.75 25.14 24.86H18V19H32C32 27.01 25.51 33.5 17.5 33.5C11.36 33.5 6 28.14 6 21Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Choose Your Portfolio
          </h1>
          <p className="mt-2 text-slate-400">
            Select an investor profile to view your personalized dashboard
          </p>
        </div>

        <div
          data-ocid="demo.selector.panel"
          className="grid gap-5 md:grid-cols-3"
        >
          {names.map((name, i) => (
            <button
              key={name}
              type="button"
              data-ocid={`demo.profile.card.${i + 1}`}
              onClick={() => onSelect(name)}
              disabled={loading !== null}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-700/60 bg-slate-900/80 p-6 text-left shadow-2xl backdrop-blur transition hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(20,215,160,0.12)] disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 transition group-hover:from-cyan-500/8 group-hover:to-blue-600/8" />
              {loading === name ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 py-4">
                  <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border border-slate-700" />
                    <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-400">
                    Loading profile…
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-3xl">{icons[i] ?? "🚀"}</div>
                  <div className="font-display text-xl font-bold tracking-tight">
                    {name}
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    {subtitles[i] ?? "GoGrabX Investor"}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-cyan-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    View Portfolio →
                  </div>
                </>
              )}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          Authenticated via Internet Identity · GoGrabX Investor Platform
        </p>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function GoGrabXFleetTracking() {
  const { clear, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const [page, setPage] = useState<Page>("login");
  const [showBlueprint, setShowBlueprint] = useState(true);
  const [selectedBikeId, setSelectedBikeId] = useState<string>("GGRX-024");
  const [demoNames, setDemoNames] = useState<string[]>([]);
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [loadingDemo, setLoadingDemo] = useState<string | null>(null);
  const [appStep, setAppStep] = useState<"login" | "selector" | "app">("login");
  const [seedingDone, setSeedingDone] = useState(false);

  // ── Admin state ─────────────────────────────────────────────────────────
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>("investors");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminInvestors, setAdminInvestors] = useState<AdminInvestor[]>([
    { name: "Ravi Kumar Family", ownership: "20%", monthlyEstimate: "₹5,840" },
    { name: "Mahesh Group", ownership: "15%", monthlyEstimate: "₹4,200" },
    { name: "Lakshmi Investors", ownership: "25%", monthlyEstimate: "₹3,800" },
    { name: "Kiran Ventures", ownership: "10%", monthlyEstimate: "₹6,100" },
    { name: "GoGrabX Reserve", ownership: "30%", monthlyEstimate: "₹2,500" },
  ]);
  const [adminPayouts, setAdminPayouts] = useState<AdminPayout[]>([
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
      status: "Pending",
    },
  ]);
  const [expansionCities, setExpansionCities] = useState<ExpansionCity[]>([
    { name: "Tanuku", bikeCount: "128", status: "Operational" },
    { name: "Bhimavaram", bikeCount: "42", status: "Opening Soon" },
    { name: "Rajahmundry", bikeCount: "0", status: "Pipeline" },
  ]);
  const [editingInvestorIdx, setEditingInvestorIdx] = useState<number | null>(
    null,
  );
  const [editingBikeIdx, setEditingBikeIdx] = useState<number | null>(null);
  const [editingCityIdx, setEditingCityIdx] = useState<number | null>(null);
  const [editInvestorDraft, setEditInvestorDraft] = useState<AdminInvestor>({
    name: "",
    ownership: "",
    monthlyEstimate: "",
  });
  const [editCityDraft, setEditCityDraft] = useState<ExpansionCity>({
    name: "",
    bikeCount: "",
    status: "",
  });

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  // After authentication: seed data and load demo investor list
  useEffect(() => {
    if (!isAuthenticated || !actor || actorFetching || seedingDone) return;
    let cancelled = false;

    (async () => {
      try {
        await actor.seedDemoData();
      } catch (_) {
        // idempotent, ignore errors
      }
      if (cancelled) return;
      setSeedingDone(true);
      try {
        const names = await actor.getDemoInvestors();
        if (!cancelled) {
          setDemoNames(names);
          setAppStep("selector");
        }
      } catch (_) {
        if (!cancelled) setAppStep("selector");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, actor, actorFetching, seedingDone]);

  const handleSelectDemo = useCallback(
    async (name: string) => {
      if (!actor) return;
      setLoadingDemo(name);
      try {
        await actor.loginAsDemo(name);
        const prof = await actor.getMyProfile();
        if (prof) {
          setProfile(prof);
          setAppStep("app");
          setPage("dashboard");
        } else {
          setAppStep("selector");
        }
      } catch (_) {
        setAppStep("selector");
      } finally {
        setLoadingDemo(null);
      }
    },
    [actor],
  );

  const handleLogout = useCallback(() => {
    try {
      clear();
    } catch (_) {
      /* ignore */
    }
    setProfile(null);
    setSeedingDone(false);
    setDemoNames([]);
    setAppStep("login");
    setPage("login");
  }, [clear]);

  const handleDirectLogin = useCallback((name: string) => {
    const profileMap: Record<string, InvestorProfile> = {
      "Ravi Kumar Family": {
        investorName: "Ravi Kumar Family",
        city: "Tanuku",
        totalBikes: BigInt(5),
        portfolioValue: BigInt(480000),
        totalPayout: BigInt(38420),
        bikes: [],
        payouts: [],
        familyMembers: [],
      },
      "Mahesh Group": {
        investorName: "Mahesh Group",
        city: "Tanuku",
        totalBikes: BigInt(3),
        portfolioValue: BigInt(320000),
        totalPayout: BigInt(24600),
        bikes: [],
        payouts: [],
        familyMembers: [],
      },
      "Lakshmi Investors": {
        investorName: "Lakshmi Investors",
        city: "Tanuku",
        totalBikes: BigInt(4),
        portfolioValue: BigInt(380000),
        totalPayout: BigInt(19800),
        bikes: [],
        payouts: [],
        familyMembers: [],
      },
      "Kiran Ventures": {
        investorName: "Kiran Ventures",
        city: "Tanuku",
        totalBikes: BigInt(2),
        portfolioValue: BigInt(210000),
        totalPayout: BigInt(28400),
        bikes: [],
        payouts: [],
        familyMembers: [],
      },
      "GoGrabX Reserve": {
        investorName: "GoGrabX Reserve",
        city: "Tanuku",
        totalBikes: BigInt(6),
        portfolioValue: BigInt(620000),
        totalPayout: BigInt(12500),
        bikes: [],
        payouts: [],
        familyMembers: [],
      },
    };
    const prof = profileMap[name] ?? profileMap["Ravi Kumar Family"];
    setProfile(prof);
    setAppStep("app");
    setPage("dashboard");
  }, []);

  // ── Static fleet data (map display, lifted to state for admin edits) ──────
  const [fleetBikes, setFleetBikes] = useState<FleetBike[]>([
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
  ]);

  const [editBikeDraft, setEditBikeDraft] = useState<Partial<FleetBike>>({});

  const notifications: NotificationItem[] = [
    {
      title: "Battery swap due soon",
      detail: "GGRX-044 battery fell below 45% and is near Railway Road.",
      type: "Maintenance",
    },
    {
      title: "Payout settled",
      detail: `${profile ? fmt(profile.totalPayout) : "₹206"} has been settled to ${profile?.investorName ?? "your account"} for this period.`,
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

  const selectedFleetBike = useMemo(
    () => fleetBikes.find((b) => b.id === selectedBikeId) ?? fleetBikes[0],
    [selectedBikeId, fleetBikes],
  );

  const linePoints = [38, 46, 42, 58, 63, 61, 76, 72, 84, 92];
  const chartPoints = linePoints.map((v, i) => ({
    x: i * 32 + 6,
    y: 110 - v,
    id: `pt-${i}`,
  }));
  const linePath = chartPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x},${pt.y}`)
    .join(" ");

  const openBike = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setPage("bike");
  };

  // ── AppShell ─────────────────────────────────────────────────────────────
  const AppShell = ({ children }: { children: ReactNode }) => (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @keyframes pulseGlow { 0%,100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.2); opacity: .45; } }
        @keyframes floatMove { 0% { transform: translate(0,0); } 25% { transform: translate(30px,-18px); } 50% { transform: translate(12px,16px); } 75% { transform: translate(-22px,-12px); } 100% { transform: translate(0,0); } }
        @keyframes routeDash { to { stroke-dashoffset: -120; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes orbitPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(56,189,248,.25); } 50% { box-shadow: 0 0 0 12px rgba(56,189,248,0); } }
        .route { stroke-dasharray: 8 10; animation: routeDash 8s linear infinite; }
        .bike-float-1 { animation: floatMove 8s ease-in-out infinite; }
        .bike-float-2 { animation: floatMove 10s ease-in-out infinite reverse; }
        .bike-float-3 { animation: floatMove 9s ease-in-out infinite; }
        .bike-float-4 { animation: floatMove 11s ease-in-out infinite reverse; }
        .bike-float-5 { animation: floatMove 7s ease-in-out infinite; }
        .pulse-dot { animation: pulseGlow 2.2s ease-in-out infinite; }
        .asset-ring { animation: orbitPulse 2.4s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.12), rgba(255,255,255,0.02));
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,.15),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              Live Fleet Intelligence + Investor Portfolio
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              GoGrabX Investor Platform
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              A founder-demo style investor operating system for EV bike
              ownership, payouts, co-ownership, maintenance, and expansion.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-5 py-4 shadow-2xl backdrop-blur">
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Investor Account
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-emerald-400">
                {profile?.investorName ?? "—"}
              </div>
              <div className="mt-1 text-sm text-slate-400">
                {profile?.city ?? "—"} • Synced every 5 sec
              </div>
            </div>
            <button
              type="button"
              data-ocid="auth.logout.button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-700/50 bg-slate-900/60 px-4 py-2 text-xs text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
            >
              Logout →
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <SideNav />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );

  const SideNav = () => {
    const items: Array<[string, Page, string]> = [
      ["Dashboard", "dashboard", "nav.dashboard.link"],
      ["Bike Detail", "bike", "nav.bike.link"],
      ["Payouts", "payouts", "nav.payouts.link"],
      ["Certificate", "certificate", "nav.certificate.link"],
      ["Buy Bike", "invest", "nav.invest.link"],
      ["Family Ownership", "family", "nav.family.link"],
      ["Notifications", "notifications", "nav.notifications.link"],
      ["Maintenance", "maintenance", "nav.maintenance.link"],
      ["City Expansion", "expansion", "nav.expansion.link"],
    ];

    return (
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-4 shadow-2xl backdrop-blur">
        <div className="mb-4 px-3">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
            GoGrabX
          </div>
          <div className="mt-2 font-display text-lg font-semibold">
            Investor OS
          </div>
        </div>
        <div className="space-y-2">
          {items.map(([label, target, ocid]) => (
            <button
              type="button"
              key={label}
              data-ocid={ocid}
              onClick={() => setPage(target)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                page === target
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-slate-950/70 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 border-t border-slate-800 pt-4">
          <button
            type="button"
            data-ocid="nav.back_to_website.button"
            onClick={() => setShowBlueprint(true)}
            className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-800/60 hover:text-slate-300"
          >
            ← Main Website
          </button>
        </div>
      </div>
    );
  };

  // ── Render: Login ─────────────────────────────────────────────────────────
  const renderLogin = () => (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6 text-white">
      <button
        type="button"
        data-ocid="login.back_to_website.button"
        onClick={() => setShowBlueprint(true)}
        className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-2 text-sm text-slate-400 backdrop-blur transition hover:bg-slate-700/70 hover:text-white"
      >
        ← Back to Website
      </button>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,215,160,0.18),transparent),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(37,99,235,0.22),transparent),radial-gradient(ellipse_40%_40%_at_20%_70%,rgba(249,115,22,0.12),transparent)]" />
      <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-[10%] top-[30%] h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-[15%] left-[35%] h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_40px_rgba(20,215,160,0.4)]">
            <svg
              role="img"
              aria-label="GoGrabX logo"
              viewBox="0 0 40 40"
              fill="none"
              className="h-8 w-8"
            >
              <path
                d="M6 21C6 13.82 11.82 8 19 8H28V14H19C15.13 14 12 17.13 12 21C12 24.87 15.13 28 19 28C21.55 28 23.79 26.75 25.14 24.86H18V19H32C32 27.01 25.51 33.5 17.5 33.5C11.36 33.5 6 28.14 6 21Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-display text-xl font-bold tracking-tight">
              GoGrabX
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">
              Investor Portal
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-slate-700/20 to-slate-800/10 p-px shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          <div className="rounded-[calc(2rem-1px)] bg-slate-900/95 p-10 backdrop-blur-xl">
            <h1 className="mb-2 font-display text-4xl font-bold tracking-tight">
              Investor Login
            </h1>
            <p className="mb-8 text-slate-400">
              Connect with Internet Identity to access your personalized EV bike
              portfolio, earnings, and ownership certificates.
            </p>

            <p className="mb-6 text-sm text-slate-400">
              Select your investor profile to access your personalized EV bike
              portfolio, earnings, and ownership certificates.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  name: "Ravi Kumar Family",
                  icon: "🏠",
                  desc: "5 bikes · ₹4.8L portfolio",
                },
                {
                  name: "Mahesh Group",
                  icon: "🏢",
                  desc: "3 bikes · ₹3.2L portfolio",
                },
                {
                  name: "Lakshmi Investors",
                  icon: "💼",
                  desc: "4 bikes · ₹3.8L portfolio",
                },
                {
                  name: "Kiran Ventures",
                  icon: "🚀",
                  desc: "2 bikes · ₹2.1L portfolio",
                },
                {
                  name: "GoGrabX Reserve",
                  icon: "🌐",
                  desc: "6 bikes · ₹6.2L portfolio",
                },
              ].map(({ name, icon, desc }, idx) => (
                <button
                  key={name}
                  type="button"
                  data-ocid={`login.investor.item.${idx + 1}`}
                  onClick={() => handleDirectLogin(name)}
                  className="group flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-left transition hover:border-cyan-500/50 hover:bg-slate-800 active:scale-[0.99]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-700/60 text-xl group-hover:bg-cyan-500/20 transition">
                    {icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-white leading-tight">
                      {name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 flex-shrink-0 text-slate-600 group-hover:text-cyan-400 transition"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-xs text-slate-600">
              Investor access · Tanuku · West Godavari
            </p>

            <div className="mt-6 border-t border-slate-800 pt-5 text-center">
              <button
                type="button"
                data-ocid="login.admin_access.button"
                onClick={() => setPage("adminLogin")}
                className="text-xs text-slate-600 transition hover:text-slate-400"
              >
                Admin Access →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Render: Admin Login ───────────────────────────────────────────────────
  const renderAdminLogin = () => (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6 text-white">
      <button
        type="button"
        data-ocid="login.back_to_website.button"
        onClick={() => setShowBlueprint(true)}
        className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-2 text-sm text-slate-400 backdrop-blur transition hover:bg-slate-700/70 hover:text-white"
      >
        ← Back to Website
      </button>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(249,115,22,0.12),transparent),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(37,99,235,0.18),transparent)]" />
      <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-orange-500/8 blur-3xl" />
      <div className="absolute right-[10%] top-[30%] h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 shadow-[0_0_40px_rgba(249,115,22,0.35)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-display text-xl font-bold tracking-tight">
              Admin Panel
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-orange-400/80">
              GoGrabX Control
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-b from-orange-500/20 via-slate-700/20 to-slate-800/10 p-px shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
          <div className="rounded-[calc(2rem-1px)] bg-slate-900/95 p-8 backdrop-blur-xl">
            <h1 className="mb-2 font-display text-3xl font-bold tracking-tight">
              Admin Access
            </h1>
            <p className="mb-6 text-sm text-slate-400">
              Enter admin password to manage investor profiles and fleet data.
            </p>

            <input
              data-ocid="admin.login.input"
              type="password"
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                setAdminError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (adminPassword === "admin123") {
                    setAdminAuthenticated(true);
                    setAdminPassword("");
                    setPage("adminDashboard");
                  } else {
                    setAdminError("Incorrect password. Try again.");
                  }
                }
              }}
              className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-orange-500/50"
              placeholder="Admin password"
            />
            {adminError && (
              <p
                data-ocid="admin.login.error_state"
                className="mb-3 text-xs text-red-400"
              >
                {adminError}
              </p>
            )}
            <button
              type="button"
              data-ocid="admin.login.primary_button"
              onClick={() => {
                if (adminPassword === "admin123") {
                  setAdminAuthenticated(true);
                  setAdminPassword("");
                  setPage("adminDashboard");
                } else {
                  setAdminError("Incorrect password. Try again.");
                }
              }}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-semibold text-white shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition hover:brightness-110"
            >
              Enter Admin Panel
            </button>
            <button
              type="button"
              data-ocid="admin.login.cancel_button"
              onClick={() => {
                setPage("login");
                setAdminPassword("");
                setAdminError("");
              }}
              className="mt-3 w-full rounded-xl border border-slate-700/50 py-2 text-sm text-slate-500 transition hover:text-slate-300"
            >
              ← Back to Investor Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Render: Admin Dashboard ───────────────────────────────────────────────
  const renderAdminDashboard = () => {
    if (!adminAuthenticated) {
      setPage("adminLogin");
      return null;
    }

    const adminNavItems: Array<[string, AdminTab, string]> = [
      ["Investors", "investors", "admin.investors.tab"],
      ["Bikes", "bikes", "admin.bikes.tab"],
      ["Payouts", "payouts", "admin.payouts.tab"],
      ["Expansion", "expansion", "admin.expansion.tab"],
    ];

    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,.15),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          {/* Admin header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-700/40 bg-orange-900/20 px-3 py-1 text-xs text-orange-300">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Admin Panel · GoGrabX Control Center
              </div>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage investor profiles, fleet data, payouts, and city
                expansion.
              </p>
            </div>
            <button
              type="button"
              data-ocid="admin.logout.button"
              onClick={() => {
                setAdminAuthenticated(false);
                setPage("login");
              }}
              className="self-start rounded-xl border border-red-700/40 bg-red-900/20 px-5 py-2 text-sm text-red-300 transition hover:bg-red-900/40"
            >
              Logout Admin →
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            {/* Admin sidebar */}
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-4 shadow-2xl backdrop-blur">
              <div className="mb-4 px-3">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Control
                </div>
                <div className="mt-2 font-display text-lg font-semibold text-orange-300">
                  Admin OS
                </div>
              </div>
              <div className="space-y-2">
                {adminNavItems.map(([label, tab, ocid]) => (
                  <button
                    type="button"
                    key={tab}
                    data-ocid={ocid}
                    onClick={() => setAdminTab(tab)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                      adminTab === tab
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20"
                        : "bg-slate-950/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin content */}
            <div className="min-w-0">
              {adminTab === "investors" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <SectionTitle eyebrow="Admin" title="Investor Profiles" />
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-2xl">
                    <div className="grid grid-cols-5 gap-3 border-b border-slate-800 px-5 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                      <div className="col-span-2">Name</div>
                      <div>Ownership %</div>
                      <div>Monthly Est.</div>
                      <div>Action</div>
                    </div>
                    {adminInvestors.map((inv, i) => (
                      <div
                        key={inv.name}
                        data-ocid={`admin.investors.row.${i + 1}`}
                      >
                        {editingInvestorIdx === i ? (
                          <div className="grid grid-cols-5 gap-3 border-b border-slate-800 px-5 py-4 text-sm last:border-b-0">
                            <div className="col-span-2">
                              <input
                                data-ocid="admin.investors.input"
                                value={editInvestorDraft.name}
                                onChange={(e) =>
                                  setEditInvestorDraft((d) => ({
                                    ...d,
                                    name: e.target.value,
                                  }))
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <input
                                value={editInvestorDraft.ownership}
                                onChange={(e) =>
                                  setEditInvestorDraft((d) => ({
                                    ...d,
                                    ownership: e.target.value,
                                  }))
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <input
                                value={editInvestorDraft.monthlyEstimate}
                                onChange={(e) =>
                                  setEditInvestorDraft((d) => ({
                                    ...d,
                                    monthlyEstimate: e.target.value,
                                  }))
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-500/50"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                data-ocid="admin.investors.save_button"
                                onClick={() => {
                                  setAdminInvestors((prev) =>
                                    prev.map((item, idx) =>
                                      idx === i ? editInvestorDraft : item,
                                    ),
                                  );
                                  setEditingInvestorIdx(null);
                                }}
                                className="rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/30"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                data-ocid="admin.investors.cancel_button"
                                onClick={() => setEditingInvestorIdx(null)}
                                className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-5 gap-3 border-b border-slate-800 px-5 py-4 text-sm last:border-b-0 hover:bg-slate-900/60">
                            <div className="col-span-2 font-medium">
                              {inv.name}
                            </div>
                            <div className="text-slate-300">
                              {inv.ownership}
                            </div>
                            <div className="text-emerald-400">
                              {inv.monthlyEstimate}
                            </div>
                            <div>
                              <button
                                type="button"
                                data-ocid={`admin.investors.edit_button.${i + 1}`}
                                onClick={() => {
                                  setEditingInvestorIdx(i);
                                  setEditInvestorDraft(inv);
                                }}
                                className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-500/25"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === "bikes" && (
                <div className="space-y-5">
                  <SectionTitle eyebrow="Admin" title="Fleet Bikes" />
                  <div className="overflow-x-auto rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-2xl">
                    <table className="w-full min-w-[700px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-800/70 text-xs uppercase tracking-[0.15em] text-slate-500">
                          <th className="px-4 py-3">Bike ID</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Battery %</th>
                          <th className="px-4 py-3">Speed</th>
                          <th className="px-4 py-3">Investor</th>
                          <th className="px-4 py-3">Earnings</th>
                          <th className="px-4 py-3">KM</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fleetBikes.map((bike, i) => (
                          <tr
                            key={bike.id}
                            data-ocid={`admin.bikes.row.${i + 1}`}
                            className="border-b border-slate-800/60 last:border-b-0"
                          >
                            {editingBikeIdx === i ? (
                              <>
                                <td className="px-4 py-3 font-semibold text-cyan-400">
                                  {bike.id}
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    data-ocid="admin.bikes.input"
                                    value={editBikeDraft.status ?? bike.status}
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        status: e.target.value,
                                      }))
                                    }
                                    className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={
                                      editBikeDraft.battery ?? bike.battery
                                    }
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        battery: Number(e.target.value),
                                      }))
                                    }
                                    type="number"
                                    className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={editBikeDraft.speed ?? bike.speed}
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        speed: Number(e.target.value),
                                      }))
                                    }
                                    type="number"
                                    className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={
                                      editBikeDraft.investor ?? bike.investor
                                    }
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        investor: e.target.value,
                                      }))
                                    }
                                    className="w-36 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={
                                      editBikeDraft.earnings ?? bike.earnings
                                    }
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        earnings: e.target.value,
                                      }))
                                    }
                                    className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    value={editBikeDraft.km ?? bike.km}
                                    onChange={(e) =>
                                      setEditBikeDraft((d) => ({
                                        ...d,
                                        km: e.target.value,
                                      }))
                                    }
                                    className="w-20 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1.5">
                                    <button
                                      type="button"
                                      data-ocid="admin.bikes.save_button"
                                      onClick={() => {
                                        setFleetBikes((prev) =>
                                          prev.map((b, idx) =>
                                            idx === i
                                              ? { ...b, ...editBikeDraft }
                                              : b,
                                          ),
                                        );
                                        setEditingBikeIdx(null);
                                        setEditBikeDraft({});
                                      }}
                                      className="rounded-lg bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-500/30"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      data-ocid="admin.bikes.cancel_button"
                                      onClick={() => {
                                        setEditingBikeIdx(null);
                                        setEditBikeDraft({});
                                      }}
                                      className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 hover:bg-slate-700"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="px-4 py-3 font-semibold text-cyan-400">
                                  {bike.id}
                                </td>
                                <td className="px-4 py-3 text-slate-300">
                                  {bike.status}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={
                                      bike.battery < 50
                                        ? "text-orange-400"
                                        : "text-emerald-400"
                                    }
                                  >
                                    {bike.battery}%
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-slate-300">
                                  {bike.speed} km/h
                                </td>
                                <td className="px-4 py-3 text-slate-300">
                                  {bike.investor}
                                </td>
                                <td className="px-4 py-3 text-emerald-400">
                                  {bike.earnings}
                                </td>
                                <td className="px-4 py-3 text-slate-300">
                                  {bike.km}
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    type="button"
                                    data-ocid={`admin.bikes.edit_button.${i + 1}`}
                                    onClick={() => {
                                      setEditingBikeIdx(i);
                                      setEditBikeDraft(bike);
                                    }}
                                    className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-500/25"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {adminTab === "payouts" && (
                <div className="space-y-5">
                  <SectionTitle eyebrow="Admin" title="Payout Management" />
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-2xl">
                    <div className="grid grid-cols-5 gap-3 border-b border-slate-800 px-5 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                      <div>Date</div>
                      <div>Bike</div>
                      <div>Gross</div>
                      <div>Inv. Share</div>
                      <div>Status</div>
                    </div>
                    {adminPayouts.map((row, i) => (
                      <div
                        key={`${row.date}-${row.bike}`}
                        data-ocid={`admin.payouts.row.${i + 1}`}
                        className="grid grid-cols-5 gap-3 border-b border-slate-800 px-5 py-4 text-sm last:border-b-0 hover:bg-slate-900/60"
                      >
                        <div className="text-slate-300">{row.date}</div>
                        <div className="font-medium text-cyan-400">
                          {row.bike}
                        </div>
                        <div className="text-slate-300">{row.gross}</div>
                        <div className="text-emerald-400">
                          {row.investorShare}
                        </div>
                        <div>
                          <select
                            data-ocid={`admin.payouts.select.${i + 1}`}
                            value={row.status}
                            onChange={(e) =>
                              setAdminPayouts((prev) =>
                                prev.map((p, idx) =>
                                  idx === i
                                    ? { ...p, status: e.target.value }
                                    : p,
                                ),
                              )
                            }
                            className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs outline-none focus:border-orange-500/50"
                          >
                            <option value="Settled">Settled</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === "expansion" && (
                <div className="space-y-5">
                  <SectionTitle
                    eyebrow="Admin"
                    title="City Expansion Management"
                  />
                  <div className="grid gap-5 md:grid-cols-3">
                    {expansionCities.map((city, i) => (
                      <div
                        key={city.name}
                        data-ocid={`admin.expansion.card.${i + 1}`}
                        className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6 shadow-xl"
                      >
                        {editingCityIdx === i ? (
                          <div className="space-y-3">
                            <div className="font-display text-lg font-semibold">
                              {city.name}
                            </div>
                            <div>
                              <span className="mb-1 block text-xs text-slate-500">
                                Bike Count
                              </span>
                              <input
                                data-ocid="admin.expansion.input"
                                value={editCityDraft.bikeCount}
                                onChange={(e) =>
                                  setEditCityDraft((d) => ({
                                    ...d,
                                    bikeCount: e.target.value,
                                  }))
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <span className="mb-1 block text-xs text-slate-500">
                                Status
                              </span>
                              <select
                                data-ocid="admin.expansion.select"
                                value={editCityDraft.status}
                                onChange={(e) =>
                                  setEditCityDraft((d) => ({
                                    ...d,
                                    status: e.target.value,
                                  }))
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-orange-500/50"
                              >
                                <option value="Operational">Operational</option>
                                <option value="Opening Soon">
                                  Opening Soon
                                </option>
                                <option value="Pipeline">Pipeline</option>
                              </select>
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button
                                type="button"
                                data-ocid="admin.expansion.save_button"
                                onClick={() => {
                                  setExpansionCities((prev) =>
                                    prev.map((c, idx) =>
                                      idx === i
                                        ? { ...c, ...editCityDraft }
                                        : c,
                                    ),
                                  );
                                  setEditingCityIdx(null);
                                }}
                                className="flex-1 rounded-xl bg-emerald-500/20 py-2 text-sm text-emerald-400 hover:bg-emerald-500/30"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                data-ocid="admin.expansion.cancel_button"
                                onClick={() => setEditingCityIdx(null)}
                                className="flex-1 rounded-xl bg-slate-800 py-2 text-sm text-slate-400 hover:bg-slate-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-display text-xl font-semibold">
                              {city.name}
                            </div>
                            <div className="mt-2 text-slate-400">
                              {city.bikeCount} bikes
                            </div>
                            <div
                              className={`mt-3 text-sm font-medium ${city.status === "Operational" ? "text-emerald-400" : city.status === "Opening Soon" ? "text-orange-300" : "text-blue-300"}`}
                            >
                              {city.status}
                            </div>
                            <button
                              type="button"
                              data-ocid={`admin.expansion.edit_button.${i + 1}`}
                              onClick={() => {
                                setEditingCityIdx(i);
                                setEditCityDraft(city);
                              }}
                              className="mt-4 w-full rounded-xl border border-slate-700/60 bg-slate-800/50 py-2 text-sm text-slate-300 hover:bg-slate-700"
                            >
                              Edit City
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Render: Certificate ───────────────────────────────────────────────────
  const renderCertificate = () => {
    const firstBike = profile?.bikes[0];
    return (
      <AppShell>
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-10 shadow-2xl">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
            GoGrabX Technologies Private Limited
          </div>
          <h2 className="font-display mb-6 mt-3 text-3xl font-bold">
            Bike Ownership Certificate
          </h2>
          <p className="mb-6 text-slate-300">
            This certificate confirms{" "}
            <strong>{profile?.investorName ?? "Investor"}</strong> owns a
            fractional share in the GoGrabX EV bike listed below.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-800 p-4">
              Bike ID: {firstBike?.id ?? selectedFleetBike.id}
            </div>
            <div className="rounded-xl bg-slate-800 p-4">
              Ownership:{" "}
              {firstBike ? `${firstBike.ownershipPercentage.toString()}%` : "—"}
            </div>
            <div className="rounded-xl bg-slate-800 p-4">
              Legal No: {firstBike?.legalNo ?? selectedFleetBike.legal}
            </div>
            <div className="rounded-xl bg-slate-800 p-4">
              Investor: {profile?.investorName ?? "—"}
            </div>
          </div>
        </div>
      </AppShell>
    );
  };

  // ── Render: Payouts ───────────────────────────────────────────────────────
  const renderPayouts = () => {
    const payoutRows = profile?.payouts ?? [];
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle
              eyebrow="Next-Day Settlement"
              title="Investor Payout History"
            />
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-emerald-400">
              Last payout synced 5 min ago
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/70 text-slate-300">
                  <th className="p-4">Date</th>
                  <th className="p-4">Bike</th>
                  <th className="p-4">Gross Revenue</th>
                  <th className="p-4">Investor Share</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-slate-500"
                      data-ocid="payouts.empty_state"
                    >
                      No payout records yet.
                    </td>
                  </tr>
                ) : (
                  payoutRows.map((row, i) => (
                    <tr
                      key={`${row.date}-${row.bikeId}-${i}`}
                      data-ocid={`payouts.row.${i + 1}`}
                      className="border-t border-slate-800"
                    >
                      <td className="p-4">{row.date}</td>
                      <td className="p-4">{row.bikeId}</td>
                      <td className="p-4">{fmt(row.grossRevenue)}</td>
                      <td className="p-4 text-emerald-400">
                        {fmt(row.investorShare)}
                      </td>
                      <td className="p-4">{row.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AppShell>
    );
  };

  // ── Render: Bike Detail ───────────────────────────────────────────────────
  const renderBike = () => {
    const profileBike = profile?.bikes.find((b) => b.id === selectedBikeId);
    const fleetBike = selectedFleetBike;
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionTitle
              eyebrow="Asset Detail"
              title={`${fleetBike.id} • ${profileBike?.legalNo ?? fleetBike.legal}`}
            />
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
              {fleetBike.city} • {fleetBike.status}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Distance Today" value={fleetBike.km} />
            <StatCard
              label="Revenue Today"
              value={
                profileBike
                  ? fmt(profileBike.todayEarnings)
                  : fleetBike.earnings
              }
            />
            <StatCard label="Battery" value={`${fleetBike.battery}%`} />
            <StatCard label="Speed" value={`${fleetBike.speed} km/h`} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">
                  ROI Trend
                </h3>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
                  {fleetBike.roi}
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <svg
                  role="img"
                  aria-label="ROI trend chart"
                  viewBox="0 0 320 120"
                  className="w-full"
                >
                  <path
                    d={linePath}
                    fill="none"
                    stroke="rgba(59,130,246,0.9)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {chartPoints.map((pt) => (
                    <circle
                      key={pt.id}
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="rgba(249,115,22,1)"
                    />
                  ))}
                </svg>
                <div className="mt-4 grid grid-cols-5 gap-2 text-xs text-slate-500">
                  <div>Week 1</div>
                  <div>Week 2</div>
                  <div>Week 3</div>
                  <div>Week 4</div>
                  <div>Month End</div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h3 className="font-display text-xl font-semibold">
                Asset Verification
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl bg-slate-950 p-4">
                  Bike ID: {fleetBike.id}
                </div>
                <div className="rounded-2xl bg-slate-950 p-4">
                  Legal No: {profileBike?.legalNo ?? fleetBike.legal}
                </div>
                <div className="rounded-2xl bg-slate-950 p-4">
                  Investor: {profile?.investorName ?? "—"}
                </div>
                <div className="rounded-2xl bg-slate-950 p-4">
                  City: {fleetBike.city}
                </div>
                {profileBike && (
                  <div className="rounded-2xl bg-slate-950 p-4">
                    Invested: {fmt(profileBike.investedAmount)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  };

  // ── Render: Invest ────────────────────────────────────────────────────────
  const renderInvest = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Fund the Next Bike"
          title="Buy an EV Bike Share"
          subtitle="Choose a slot, see expected utilization, and fund the next deployment in Tanuku or upcoming cities."
        />

        <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="font-display text-xl font-semibold">
              Bike Funding Structure
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950 p-5">
                Target Amount: ₹1,00,000
              </div>
              <div className="rounded-2xl bg-slate-950 p-5">
                Minimum Slot: ₹20,000
              </div>
              <div className="rounded-2xl bg-slate-950 p-5">
                Settlement: Next Day
              </div>
              <div className="rounded-2xl bg-slate-950 p-5">
                Deployment City: Tanuku
              </div>
            </div>
            <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-blue-500 to-orange-500" />
            </div>
            <div className="mt-2 text-sm text-slate-400">
              ₹60,000 already reserved • 3/5 slots filled
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-blue-600/20 to-orange-500/20 p-6 shadow-2xl">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Investor CTA
            </div>
            <h3 className="font-display mt-2 text-2xl font-semibold">
              Reserve Your Bike Share
            </h3>
            <div className="mt-5 space-y-4">
              <input
                data-ocid="invest.input"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3"
                placeholder="Investor name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3"
                placeholder="Investment amount"
              />
              <select
                data-ocid="invest.select"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3"
              >
                <option>Choose bike city</option>
                <option>Tanuku</option>
                <option>Bhimavaram</option>
                <option>Rajahmundry</option>
              </select>
              <button
                type="button"
                data-ocid="invest.submit_button"
                className="w-full rounded-xl bg-white py-3 font-semibold text-slate-950"
              >
                Reserve Bike Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  // ── Render: Family ────────────────────────────────────────────────────────
  const renderFamily = () => {
    const members = profile?.familyMembers ?? [];
    return (
      <AppShell>
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Co-ownership"
            title="Family Ownership Page"
            subtitle="This bike is split across multiple family members with clear share records and contribution mapping."
          />

          <div className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="grid grid-cols-4 gap-3 border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
              <div>Name</div>
              <div>Share %</div>
              <div>Amount</div>
              <div>Role</div>
            </div>
            {members.length === 0 ? (
              <div
                className="p-8 text-center text-slate-500"
                data-ocid="family.empty_state"
              >
                No family members on record.
              </div>
            ) : (
              members.map((member, i) => (
                <div
                  key={member.name}
                  data-ocid={`family.row.${i + 1}`}
                  className="grid grid-cols-4 gap-3 border-b border-slate-900 px-4 py-4 text-sm last:border-b-0"
                >
                  <div>{member.name}</div>
                  <div>{member.share.toString()}%</div>
                  <div>{fmt(member.amount)}</div>
                  <div className="text-slate-400">{member.role}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </AppShell>
    );
  };

  // ── Render: Notifications ─────────────────────────────────────────────────
  const renderNotifications = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle eyebrow="Alerts Center" title="Notifications" />
        <div className="space-y-4">
          {notifications.map((note, i) => (
            <div
              key={note.title}
              data-ocid={`notifications.item.${i + 1}`}
              className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold">
                  {note.title}
                </div>
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">
                  {note.type}
                </span>
              </div>
              <p className="mt-2 text-slate-400">{note.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );

  // ── Render: Maintenance ───────────────────────────────────────────────────
  const renderMaintenance = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle eyebrow="Operations" title="Maintenance Alerts" />
        <div className="grid gap-6 md:grid-cols-3">
          <div
            data-ocid="maintenance.item.1"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5"
          >
            Battery Swap Due
            <br />
            <span className="text-slate-400">GGRX-044 • 41% battery</span>
          </div>
          <div
            data-ocid="maintenance.item.2"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5"
          >
            Brake Check
            <br />
            <span className="text-slate-400">GGRX-031 scheduled tomorrow</span>
          </div>
          <div
            data-ocid="maintenance.item.3"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5"
          >
            Tyre Review
            <br />
            <span className="text-slate-400">GGRX-057 after 120 km route</span>
          </div>
        </div>
      </div>
    </AppShell>
  );

  // ── Render: Expansion ─────────────────────────────────────────────────────
  const renderExpansion = () => (
    <AppShell>
      <div className="space-y-6">
        <SectionTitle
          eyebrow="Growth Engine"
          title="City Expansion Screen"
          subtitle="Track where GoGrabX can deploy the next investor-funded EV fleet."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <div
            data-ocid="expansion.item.1"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6"
          >
            <div className="font-display text-xl font-semibold">Tanuku</div>
            <div className="mt-2 text-slate-400">128 bikes live</div>
            <div className="mt-4 text-emerald-400">Operational</div>
          </div>
          <div
            data-ocid="expansion.item.2"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6"
          >
            <div className="font-display text-xl font-semibold">Bhimavaram</div>
            <div className="mt-2 text-slate-400">42 slots requested</div>
            <div className="mt-4 text-orange-300">Opening Soon</div>
          </div>
          <div
            data-ocid="expansion.item.3"
            className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-6"
          >
            <div className="font-display text-xl font-semibold">
              Rajahmundry
            </div>
            <div className="mt-2 text-slate-400">Demand study active</div>
            <div className="mt-4 text-blue-300">Pipeline</div>
          </div>
        </div>
      </div>
    </AppShell>
  );

  // ── Render: Dashboard ─────────────────────────────────────────────────────
  const renderDashboard = () => {
    const profileBikes = profile?.bikes ?? [];
    const portfolioCards = [
      {
        label: "Portfolio Value",
        value: profile ? fmt(profile.portfolioValue) : "₹4.8L",
        note: "+12.4% this month",
      },
      {
        label: "Bikes Owned",
        value: profile ? profile.totalBikes.toString() : "05",
        note: `Across ${profile?.city ?? "Tanuku"} network`,
      },
      {
        label: "Investor Payout",
        value: profile ? fmt(profile.totalPayout) : "₹38,420",
        note: "Next-day settlement",
      },
      { label: "Verified Assets", value: "100%", note: "Live GPS + legal IDs" },
    ];

    return (
      <AppShell>
        <div className="space-y-6">
          {/* Fleet stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Active EV Bikes", value: "128" },
              { label: "Live Deliveries", value: "412" },
              { label: "Distance Today", value: "3,842 km" },
              { label: "Revenue Today", value: "₹1.86L" },
            ].map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
              />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.6fr_.9fr]">
            {/* City map */}
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between px-2 py-2">
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    Live City Map
                  </h2>
                  <p className="text-sm text-slate-400">
                    Animated route movement across delivery hotspots
                  </p>
                </div>
                <div className="flex gap-2 text-xs text-slate-300">
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    Food
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    Grocery
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    Parcel
                  </span>
                </div>
              </div>

              <div className="relative mt-3 h-[560px] overflow-hidden rounded-[1.6rem] border border-slate-800 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)]">
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10,70 C18,52 26,40 34,42 S50,62 60,48 78,20 90,26"
                    fill="none"
                    stroke="rgba(59,130,246,.65)"
                    strokeWidth="0.6"
                    className="route"
                  />
                  <path
                    d="M8,30 C20,24 30,24 40,30 S66,48 82,44 88,38 94,34"
                    fill="none"
                    stroke="rgba(249,115,22,.65)"
                    strokeWidth="0.6"
                    className="route"
                  />
                  <path
                    d="M18,84 C28,78 38,68 48,70 S64,84 72,72 82,54 88,58"
                    fill="none"
                    stroke="rgba(16,185,129,.65)"
                    strokeWidth="0.6"
                    className="route"
                  />
                  <path
                    d="M16,12 C28,22 32,40 42,44 S66,34 78,48 86,72 92,80"
                    fill="none"
                    stroke="rgba(236,72,153,.55)"
                    strokeWidth="0.6"
                    className="route"
                  />
                </svg>

                <div className="absolute left-[8%] top-[24%] rounded-full border border-blue-400/40 bg-blue-500/20 px-3 py-1 text-xs text-blue-100 backdrop-blur">
                  Market Hub
                </div>
                <div className="absolute left-[32%] top-[49%] rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-xs text-orange-100 backdrop-blur">
                  Railway Road
                </div>
                <div className="absolute right-[11%] top-[23%] rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100 backdrop-blur">
                  College Junction
                </div>
                <div className="absolute right-[18%] bottom-[18%] rounded-full border border-fuchsia-400/40 bg-fuchsia-500/20 px-3 py-1 text-xs text-fuchsia-100 backdrop-blur">
                  Vendor Cluster
                </div>

                {fleetBikes.map((bike, index) => (
                  <button
                    type="button"
                    key={bike.id}
                    data-ocid="dashboard.map_marker"
                    onClick={() => openBike(bike.id)}
                    className={`absolute text-left ${["bike-float-1", "bike-float-2", "bike-float-3", "bike-float-4", "bike-float-5"][index]}`}
                    style={{ left: `${bike.x}%`, top: `${bike.y}%` }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-xl pulse-dot" />
                      <div className="asset-ring relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/40 bg-slate-950/90 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                        <span className="text-lg">🛵</span>
                      </div>
                      <div className="absolute left-14 top-1/2 w-56 -translate-y-1/2 rounded-2xl border border-slate-700 bg-slate-950/90 px-3 py-3 text-xs shadow-2xl backdrop-blur">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">
                            {bike.id}
                          </span>
                          <span className="text-emerald-400">
                            {bike.battery}%
                          </span>
                        </div>
                        <div className="mt-1 text-slate-400">
                          {bike.status} • {bike.speed} km/h
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                          <div>
                            Investor:{" "}
                            <span className="text-white">{bike.investor}</span>
                          </div>
                          <div>
                            Owns:{" "}
                            <span className="text-white">{bike.ownership}</span>
                          </div>
                          <div>
                            Today:{" "}
                            <span className="text-white">{bike.earnings}</span>
                          </div>
                          <div>
                            Distance:{" "}
                            <span className="text-white">{bike.km}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-[11px] text-orange-300">
                          Legal No: {bike.legal}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
                <h3 className="font-display text-xl font-semibold">
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
                        <span className="text-slate-300">{item.label}</span>
                        <span className="text-white">{item.value}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="shimmer h-full rounded-full"
                          style={{ width: item.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">
                    Notifications
                  </h3>
                  <button
                    type="button"
                    data-ocid="dashboard.notifications.button"
                    onClick={() => setPage("notifications")}
                    className="text-sm text-blue-300"
                  >
                    Open all
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {notifications.slice(0, 3).map((note, i) => (
                    <div
                      key={note.title}
                      data-ocid={`dashboard.notifications.item.${i + 1}`}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{note.title}</div>
                        <span className="text-xs text-slate-500">
                          {note.type}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-400">
                        {note.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold">
                    Investor Portfolio
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    A premium ownership view for every funded EV bike
                  </p>
                </div>
                <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-orange-300">
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

              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950/70">
                <div className="grid grid-cols-7 gap-3 border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <div>Bike ID</div>
                  <div>Investor</div>
                  <div>Ownership</div>
                  <div>Invested</div>
                  <div>Today</div>
                  <div>Month</div>
                  <div>Status</div>
                </div>
                {profileBikes.length === 0 ? (
                  <div
                    className="p-8 text-center text-slate-500"
                    data-ocid="portfolio.empty_state"
                  >
                    No bikes in portfolio yet.
                  </div>
                ) : (
                  profileBikes.map((bike, i) => (
                    <button
                      type="button"
                      key={bike.id}
                      data-ocid={`portfolio.item.${i + 1}`}
                      onClick={() => openBike(bike.id)}
                      className="grid w-full grid-cols-7 gap-3 border-b border-slate-900 px-4 py-4 text-left text-sm last:border-b-0 hover:bg-slate-900/50"
                    >
                      <div>
                        <div className="font-semibold">{bike.id}</div>
                        <div className="text-xs text-orange-300">
                          {bike.legalNo}
                        </div>
                      </div>
                      <div className="text-slate-300">
                        {profile?.investorName ?? "—"}
                      </div>
                      <div className="text-white">
                        {bike.ownershipPercentage.toString()}%
                      </div>
                      <div className="text-slate-300">
                        {fmt(bike.investedAmount)}
                      </div>
                      <div className="text-emerald-400">
                        {fmt(bike.todayEarnings)}
                      </div>
                      <div className="text-white">
                        {fmt(bike.monthEarnings)}
                      </div>
                      <div>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
                          {bike.status}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl backdrop-blur">
                <h3 className="font-display text-xl font-semibold">
                  Quick Actions
                </h3>
                <div className="mt-4 grid gap-3">
                  {(
                    [
                      ["Open Certificate", "certificate"],
                      ["View Payout History", "payouts"],
                      ["Open Family Ownership", "family"],
                      ["Buy Next Bike", "invest"],
                      ["View Expansion Plan", "expansion"],
                      ["Maintenance Alerts", "maintenance"],
                    ] as [string, Page][]
                  ).map(([label, target]) => (
                    <button
                      type="button"
                      key={label}
                      data-ocid={`dashboard.${target}.button`}
                      onClick={() => setPage(target)}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-left text-sm hover:bg-slate-800"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-blue-600/20 to-orange-500/20 p-5 shadow-2xl backdrop-blur">
                <div className="text-sm text-slate-200">
                  Investor-Grade Feature
                </div>
                <h3 className="font-display mt-2 text-2xl font-semibold">
                  Track, verify, and scale
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  From co-ownership and payouts to maintenance and city
                  expansion, this interface shows how GoGrabX can become a real
                  EV investment product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  };

  // ── Route ─────────────────────────────────────────────────────────────────

  if (showBlueprint)
    return <BlueprintPage onEnterPortal={() => setShowBlueprint(false)} />;

  if (page === "adminLogin") return renderAdminLogin();
  if (page === "adminDashboard") return renderAdminDashboard();

  if (appStep === "login") return renderLogin();

  if (appStep === "selector" || (appStep === "app" && !profile)) {
    return (
      <DemoSelector
        names={demoNames}
        onSelect={handleSelectDemo}
        loading={loadingDemo}
        onBackToWebsite={() => setShowBlueprint(true)}
      />
    );
  }

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
