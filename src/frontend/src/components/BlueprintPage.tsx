import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function RevealSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Badge ────────────────────────────────────────────────────────────
function SectionBadge({ number }: { number: number }) {
  return (
    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10 text-lg font-bold text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.18)] ring-1 ring-teal-400/20">
      {number}
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
}: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-400/80">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

// ─── Glassy Card ─────────────────────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Bullet Point ─────────────────────────────────────────────────────────────
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-slate-300">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400" />
      <span>{children}</span>
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlueprintPage({
  onEnterPortal,
}: {
  onEnterPortal?: () => void;
}) {
  const [activeSection, setActiveSection] = useState("hero");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = [
        "hero",
        "s1",
        "s2",
        "s3",
        "s4",
        "s5",
        "s6",
        "s7",
        "s8",
        "s9",
        "s10",
        "s11",
        "s12",
      ];
      const reversed = [...sections].reverse();
      for (const id of reversed) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "s1", label: "Problem" },
    { id: "s2", label: "Strategy" },
    { id: "s3", label: "Pillars" },
    { id: "s5", label: "EV Fleet" },
    { id: "s6", label: "Revenue" },
    { id: "s9", label: "Hubs" },
    { id: "s12", label: "Vision" },
  ];

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(45,212,191,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.06),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Sticky Navbar */}
      <header
        data-ocid="nav.panel"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md shadow-lg"
            : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-400/30 bg-teal-400/20">
              <span className="text-sm font-bold text-teal-300">G</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              GoGrabX
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid="nav.link"
                onClick={() => scrollTo(link.id)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                  activeSection === link.id
                    ? "bg-teal-400/15 text-teal-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            {onEnterPortal && (
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={onEnterPortal}
                className="ml-3 rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Investor Portal →
              </button>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            data-ocid="nav.toggle"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <div
                className={`h-0.5 w-5 bg-white transition-all ${navOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <div
                className={`h-0.5 w-5 bg-white transition-all ${navOpen ? "opacity-0" : ""}`}
              />
              <div
                className={`h-0.5 w-5 bg-white transition-all ${navOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-slate-800 bg-slate-950/95 px-6 pb-4 md:hidden"
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.id)}
                  className="block w-full py-3 text-left text-sm text-slate-300 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              {onEnterPortal && (
                <button
                  type="button"
                  data-ocid="nav.primary_button"
                  onClick={onEnterPortal}
                  className="mt-2 w-full rounded-lg bg-teal-400 py-3 font-semibold text-slate-950"
                >
                  Investor Portal →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="hero"
        data-ocid="hero.section"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          {/* Pulse badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            Startup Execution Blueprint · EV Logistics
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            GoGrabX
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              Execution Blueprint
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            The definitive execution playbook for EV-powered hyperlocal
            logistics in Tier-2 and Tier-3 India. From ground zero to logistics
            infrastructure.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("s1")}
              className="rounded-xl bg-teal-400 px-7 py-3.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.3)] transition hover:bg-teal-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.5)]"
            >
              Read the Blueprint
            </button>
            {onEnterPortal && (
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={onEnterPortal}
                className="rounded-xl border border-teal-400/40 bg-teal-400/10 px-7 py-3.5 font-semibold text-teal-300 transition hover:bg-teal-400/20"
              >
                Investor Portal →
              </button>
            )}
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("s12")}
              className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              Jump to Vision
            </button>
          </div>

          {/* Stats row */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
            {[
              { value: "Tier-2/3", label: "Cities Focus" },
              { value: "4 Phases", label: "EV Fleet Growth" },
              { value: "12 Pillars", label: "Blueprint Sections" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 backdrop-blur"
              >
                <div className="font-display text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-slate-600 pt-1.5">
            <div className="h-2 w-0.5 rounded-full bg-slate-400" />
          </div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-6xl space-y-24 px-6 pb-32">
        {/* Section 1: Solve a Real Problem */}
        <RevealSection id="s1">
          <div className="flex gap-5" data-ocid="s1.section">
            <div className="pt-1">
              <SectionBadge number={1} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Foundation"
                title="Solve a Real Problem First"
              />
              <GlassCard>
                <ul className="space-y-4">
                  <Bullet>
                    Focus on{" "}
                    <strong className="text-white">
                      genuine logistics pain
                    </strong>{" "}
                    — not tech novelty. Tier-2/3 vendors suffer from unreliable,
                    expensive last-mile delivery today.
                  </Bullet>
                  <Bullet>
                    Identify the{" "}
                    <strong className="text-white">
                      highest-friction segments
                    </strong>
                    : food vendors, grocery shops, small parcel senders who lack
                    formal logistics access.
                  </Bullet>
                  <Bullet>
                    Validate real demand before fleet expansion — at least{" "}
                    <strong className="text-white">
                      50 paying vendor relationships
                    </strong>{" "}
                    in one city before scaling to the next.
                  </Bullet>
                </ul>
              </GlassCard>
            </div>
          </div>
        </RevealSection>

        {/* Section 2: One City Domination */}
        <RevealSection id="s2">
          <div className="flex gap-5" data-ocid="s2.section">
            <div className="pt-1">
              <SectionBadge number={2} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Go-to-Market"
                title="One City Domination Strategy"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: "🏙️",
                    title: "Launch One City",
                    body: "Start with Tanuku. Achieve deep penetration — not shallow multi-city presence. Own a zip code before owning a region.",
                  },
                  {
                    icon: "🛵",
                    title: "50–100 Riders",
                    body: "Build a reliable, trained rider fleet in the launch city. Rider quality defines brand reputation in early days.",
                  },
                  {
                    icon: "🏪",
                    title: "200+ Vendors",
                    body: "Onboard 200 active vendor partners before declaring success. Vendor stickiness = recurring revenue.",
                  },
                ].map((card) => (
                  <GlassCard key={card.title} className="flex flex-col gap-3">
                    <div className="text-3xl">{card.icon}</div>
                    <h3 className="font-display font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {card.body}
                    </p>
                  </GlassCard>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 px-5 py-4 text-sm text-amber-300">
                ⚡ Expand only after the first city runs{" "}
                <strong>smooth and profitable</strong> — not after funding, not
                after hype.
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 3: Four Pillars */}
        <RevealSection id="s3">
          <div className="flex gap-5" data-ocid="s3.section">
            <div className="pt-1">
              <SectionBadge number={3} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Core Architecture"
                title="The Four Pillars of GoGrabX"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: "⚙️",
                    title: "Technology",
                    bullets: [
                      "Smart dispatch algorithm",
                      "Real-time GPS tracking",
                      "Vendor dashboard & app",
                      "Rider management system",
                    ],
                  },
                  {
                    icon: "🛵",
                    title: "Riders Network",
                    bullets: [
                      "Trained, verified riders",
                      "EV-first fleet policy",
                      "Incentive & bonus structure",
                      "Daily settlement system",
                    ],
                  },
                  {
                    icon: "🏪",
                    title: "Vendor Network",
                    bullets: [
                      "Sticky vendor relationships",
                      "API integrations for large chains",
                      "White-label delivery option",
                      "Vendor analytics dashboard",
                    ],
                  },
                  {
                    icon: "📦",
                    title: "Customer Demand",
                    bullets: [
                      "Reliable ETA promises",
                      "Sub-30 min delivery window",
                      "Order tracking in real time",
                      "Transparent pricing",
                    ],
                  },
                ].map((pillar) => (
                  <GlassCard key={pillar.title} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-teal-400/30 bg-teal-400/10 text-xl">
                        {pillar.icon}
                      </div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {pillar.bullets.map((b) => (
                        <Bullet key={b}>{b}</Bullet>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 4: Logistics Engine */}
        <RevealSection id="s4">
          <div className="flex gap-5" data-ocid="s4.section">
            <div className="pt-1">
              <SectionBadge number={4} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Operations"
                title="Build a Strong Logistics Engine"
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    icon: "🧠",
                    title: "Smart Dispatch",
                    body: "Auto-assign orders to nearest available rider using weighted proximity and load balancing.",
                  },
                  {
                    icon: "🗺️",
                    title: "Route Optimization",
                    body: "Multi-stop routing algorithms that reduce dead kilometers and fuel/battery usage.",
                  },
                  {
                    icon: "📦",
                    title: "Order Batching",
                    body: "Cluster nearby deliveries into single rider runs — increasing revenue per km dramatically.",
                  },
                  {
                    icon: "📊",
                    title: "Demand Prediction",
                    body: "ML-powered demand forecasting by area, hour, and category to preposition riders.",
                  },
                ].map((item) => (
                  <GlassCard
                    key={item.title}
                    className="flex flex-col gap-3 text-center"
                  >
                    <div className="text-4xl">{item.icon}</div>
                    <h3 className="font-display font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 5: EV Fleet Timeline */}
        <RevealSection id="s5">
          <div className="flex gap-5" data-ocid="s5.section">
            <div className="pt-1">
              <SectionBadge number={5} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Fleet Growth"
                title="EV Fleet Strategy"
              />
              <div className="relative">
                {/* Connecting line (desktop) */}
                <div
                  className="absolute left-6 right-6 top-6 hidden h-0.5 bg-gradient-to-r from-teal-400/60 via-cyan-400/40 to-amber-400/60 md:block"
                  aria-hidden="true"
                />
                <div className="grid gap-6 md:grid-cols-4">
                  {[
                    {
                      phase: 1,
                      title: "Own Bikes",
                      body: "GoGrabX acquires and deploys company-owned EV bikes. Full control over fleet quality and investor returns.",
                      icon: "🛵",
                    },
                    {
                      phase: 2,
                      title: "Lease EV",
                      body: "Lease EVs to verified rider-owners. Asset-light model with revenue-sharing to scale faster.",
                      icon: "📋",
                    },
                    {
                      phase: 3,
                      title: "Micro Fleet Hubs",
                      body: "Neighbourhood hubs with 10–20 bikes + charging stations. Faster dispatch, lower dead-KM.",
                      icon: "🏢",
                    },
                    {
                      phase: 4,
                      title: "Cargo EV",
                      body: "Introduce cargo EVs for bulk B2B logistics — FMCG restocking, grocery chains, micro warehousing.",
                      icon: "🚚",
                    },
                  ].map((phase, i) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative flex flex-col gap-3"
                    >
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-teal-400/40 bg-slate-950 text-xl shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                        {phase.icon}
                      </div>
                      <GlassCard className="flex-1">
                        <div className="mb-1 text-xs font-bold uppercase tracking-widest text-teal-400">
                          Phase {phase.phase}
                        </div>
                        <h3 className="font-display font-bold text-white">
                          {phase.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {phase.body}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 6: Revenue Streams */}
        <RevealSection id="s6">
          <div className="flex gap-5" data-ocid="s6.section">
            <div className="pt-1">
              <SectionBadge number={6} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Business Model"
                title="Multiple Revenue Streams"
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    icon: "🚀",
                    title: "Delivery Fees",
                    desc: "Per-delivery charges from consumers and vendors — the core daily revenue engine.",
                  },
                  {
                    icon: "🤝",
                    title: "Vendor Commissions",
                    desc: "% commission on order GMV from partnered restaurants and stores.",
                  },
                  {
                    icon: "🏭",
                    title: "Logistics Contracts",
                    desc: "Monthly SLA contracts with FMCG brands and retail chains for predictable revenue.",
                  },
                  {
                    icon: "⚡",
                    title: "EV Fleet Leasing",
                    desc: "Lease income from investor-owned EVs and the investor payout model.",
                  },
                  {
                    icon: "📢",
                    title: "Vendor Advertising",
                    desc: "Hyper-local sponsored placements on the GoGrabX consumer app and notifications.",
                  },
                ].map((stream) => (
                  <motion.div
                    key={stream.title}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="flex h-full flex-col gap-3 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/30 bg-teal-400/10 text-2xl">
                        {stream.icon}
                      </div>
                      <h3 className="font-display text-sm font-bold text-white">
                        {stream.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-400">
                        {stream.desc}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 7: Vendor Ecosystem */}
        <RevealSection id="s7">
          <div className="flex gap-5" data-ocid="s7.section">
            <div className="pt-1">
              <SectionBadge number={7} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Partners"
                title="Strong Vendor Ecosystem"
              />
              <GlassCard>
                <ul className="space-y-5">
                  <Bullet>
                    <strong className="text-white">Vendor-first tools</strong> —
                    Give vendors a powerful dashboard: live order tracking,
                    inventory integration, payout history, and performance
                    analytics so they never want to leave.
                  </Bullet>
                  <Bullet>
                    <strong className="text-white">
                      Create switching costs
                    </strong>{" "}
                    — Integrate deeply into vendor POS and inventory systems.
                    The more embedded GoGrabX becomes, the stickier the
                    relationship.
                  </Bullet>
                  <Bullet>
                    <strong className="text-white">
                      Dependency is the moat
                    </strong>{" "}
                    — A vendor that relies on GoGrabX for 60%+ of deliveries
                    will not risk switching for a 5% cost saving. Build for
                    dependency, not convenience.
                  </Bullet>
                </ul>
              </GlassCard>
            </div>
          </div>
        </RevealSection>

        {/* Section 8: Logistics Before Food */}
        <RevealSection id="s8">
          <div className="flex gap-5" data-ocid="s8.section">
            <div className="pt-1">
              <SectionBadge number={8} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Priority"
                title="Logistics Before Food Delivery"
              />
              <div className="flex flex-col items-stretch gap-3 md:flex-row">
                <GlassCard className="flex-1 border-teal-400/30">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-teal-400/40 bg-teal-400/10 text-lg font-bold text-teal-300">
                      1
                    </div>
                    <h3 className="font-display font-bold text-white">
                      Build the Logistics Layer
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">
                    First, establish a reliable, fast, city-wide delivery
                    infrastructure. Parcels, grocery, FMCG — anything that
                    moves. Prove operational excellence at scale.
                  </p>
                </GlassCard>

                <div className="flex items-center justify-center">
                  <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                    Then →
                  </div>
                </div>

                <GlassCard className="flex-1 border-amber-400/30">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-lg font-bold text-amber-300">
                      2
                    </div>
                    <h3 className="font-display font-bold text-white">
                      Layer Food Delivery on Top
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">
                    Once the logistics engine is proven, food delivery becomes a
                    natural product extension. Logistics ops, rider fleet, and
                    vendor trust are already in place.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 9: Micro Logistics Hubs */}
        <RevealSection id="s9">
          <div className="flex gap-5" data-ocid="s9.section">
            <div className="pt-1">
              <SectionBadge number={9} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Infrastructure"
                title="Micro Logistics Hubs"
              />
              <div className="grid gap-6 lg:grid-cols-2">
                <GlassCard>
                  <h3 className="mb-4 font-display text-xl font-bold text-white">
                    What is a Micro Hub?
                  </h3>
                  <ul className="space-y-4">
                    <Bullet>
                      Neighbourhood-level{" "}
                      <strong className="text-white">physical presence</strong>{" "}
                      — a small space housing 10–20 bikes and a charging bay.
                    </Bullet>
                    <Bullet>
                      <strong className="text-white">Faster dispatch</strong> —
                      riders start from the hub, not from home. 40% reduction in
                      response time.
                    </Bullet>
                    <Bullet>
                      Built-in{" "}
                      <strong className="text-white">
                        EV charging infrastructure
                      </strong>{" "}
                      — zero downtime for battery-range anxiety.
                    </Bullet>
                  </ul>
                </GlassCard>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "10–20", label: "Riders per Hub", icon: "🛵" },
                    { stat: "40%", label: "Faster Dispatch", icon: "⚡" },
                    { stat: "2–3 km", label: "Delivery Radius", icon: "📍" },
                    { stat: "24/7", label: "EV Charging", icon: "🔋" },
                  ].map((stat) => (
                    <GlassCard
                      key={stat.label}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <div className="text-3xl">{stat.icon}</div>
                      <div className="mt-2 font-display text-2xl font-bold text-white">
                        {stat.stat}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {stat.label}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 10: Brand Trust */}
        <RevealSection id="s10">
          <div className="flex gap-5" data-ocid="s10.section">
            <div className="pt-1">
              <SectionBadge number={10} />
            </div>
            <div className="flex-1">
              <SectionHeading eyebrow="Brand" title="Build Brand Trust" />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: "⏱️",
                    title: "Reliable Delivery",
                    body: "Consistent ETAs. No ghost riders. No last-minute cancellations. Every order fulfilled builds compounding brand equity.",
                  },
                  {
                    icon: "👔",
                    title: "Professional Riders",
                    body: "Uniformed, trained, verified riders. A GoGrabX rider should feel like a FedEx delivery — not an unbranded stranger.",
                  },
                  {
                    icon: "📞",
                    title: "Responsive Support",
                    body: "Sub-2-minute support response. Instant refunds for failed deliveries. Make every complaint a loyalty-building moment.",
                  },
                ].map((pillar) => (
                  <GlassCard key={pillar.title}>
                    <div className="mb-4 text-4xl">{pillar.icon}</div>
                    <h3 className="mb-2 font-display text-lg font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {pillar.body}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Section 11: Startup Mistakes */}
        <RevealSection id="s11">
          <div className="flex gap-5" data-ocid="s11.section">
            <div className="pt-1">
              <SectionBadge number={11} />
            </div>
            <div className="flex-1">
              <SectionHeading
                eyebrow="Risk Management"
                title="Avoid Major Startup Mistakes"
              />
              <div className="space-y-3">
                {[
                  {
                    warning: "Don't expand too fast",
                    detail:
                      "Multi-city presence before single-city dominance is the #1 startup killer in logistics. Resist the vanity metric of city count.",
                  },
                  {
                    warning: "Avoid rider churn",
                    detail:
                      "High rider turnover destroys service quality. Pay fairly, settle daily, and treat riders like partners — not contractors.",
                  },
                  {
                    warning: "Build algorithms early",
                    detail:
                      "Manual dispatch doesn't scale. Build smart routing and dispatch from Day 1 or your unit economics collapse at 100+ orders/day.",
                  },
                  {
                    warning: "Don't overspend on marketing",
                    detail:
                      "Early growth = vendor word-of-mouth + operational excellence. Paid acquisition before product-market fit burns runway fast.",
                  },
                  {
                    warning: "Maintain vendor relations",
                    detail:
                      "Never deprioritize a vendor for a shinier opportunity. Vendor trust is hard to rebuild once broken and competitors will swoop in.",
                  },
                ].map((mistake, i) => (
                  <motion.div
                    key={mistake.warning}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                  >
                    <span className="text-xl">⚠️</span>
                    <div>
                      <div className="font-display font-semibold text-red-300">
                        {mistake.warning}
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-slate-400">
                        {mistake.detail}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      {/* Section 12: Long-term Vision */}
      <RevealSection id="s12">
        <section
          data-ocid="s12.section"
          className="relative z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-28"
        >
          {/* Glow overlays */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-400/8 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3">
              <SectionBadge number={12} />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Long-Term Vision
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Become the
              <span className="block bg-gradient-to-r from-teal-300 to-amber-300 bg-clip-text text-transparent">
                Logistics Infrastructure
              </span>
              for Tier-2 &amp; Tier-3 India.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Evolve into a{" "}
              <strong className="text-white">Logistics Operating System</strong>{" "}
              and <strong className="text-white">EV Delivery Network</strong> —
              the invisible layer that powers every merchant, every delivery,
              and every economy in emerging India.
            </p>

            {/* Vision milestones */}
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  horizon: "Year 1–2",
                  milestone:
                    "Dominate 3–5 Tier-2 cities. 500+ active EV bikes. Profitability in launch city.",
                  icon: "🏙️",
                },
                {
                  horizon: "Year 3–4",
                  milestone:
                    "Expand to 20+ cities. Cargo EV launch. Logistics SLA contracts with national brands.",
                  icon: "🌏",
                },
                {
                  horizon: "Year 5+",
                  milestone:
                    "Logistics OS for Tier-2/3 India. EV fleet as investor product. IPO-ready infrastructure.",
                  icon: "🚀",
                },
              ].map((v) => (
                <div
                  key={v.horizon}
                  className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-6 text-left backdrop-blur"
                >
                  <div className="text-3xl">{v.icon}</div>
                  <div className="mt-3 font-display text-sm font-bold uppercase tracking-widest text-amber-400">
                    {v.horizon}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {v.milestone}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                data-ocid="vision.primary_button"
                onClick={() => scrollTo("s1")}
                className="rounded-xl bg-teal-400 px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_0_40px_rgba(45,212,191,0.4)] transition hover:bg-teal-300"
              >
                Start Reading the Blueprint
              </button>
              {onEnterPortal && (
                <button
                  type="button"
                  data-ocid="vision.secondary_button"
                  onClick={onEnterPortal}
                  className="rounded-xl border border-teal-400/40 bg-teal-400/10 px-8 py-4 text-lg font-semibold text-teal-300 transition hover:bg-teal-400/20"
                >
                  Enter Investor Portal
                </button>
              )}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <div className="font-display text-lg font-bold text-white">
              GoGrabX
            </div>
            <div className="mt-1 text-sm text-slate-500">
              EV-Powered Hyperlocal Logistics · Tier-2 &amp; Tier-3 India
            </div>
          </div>
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()}. 
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition hover:text-slate-300"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
