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
// ─── EV Bike Hero Animation ───────────────────────────────────────────────────
function EVBikeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const update = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const travelDist = containerWidth + 300;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 220 }}
    >
      {/* Asphalt road */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 44,
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          borderTop: "2px solid #334155",
        }}
      />

      {/* Moving center dashes */}
      <motion.div
        className="absolute flex"
        style={{ bottom: 18, left: 0, width: "200%" }}
        animate={{ x: [0, -120] }}
        transition={{
          duration: 1.4,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {[
          "da",
          "db",
          "dc",
          "dd",
          "de",
          "df",
          "dg",
          "dh",
          "di",
          "dj",
          "dk",
          "dl",
          "dm",
          "dn",
          "do",
          "dp",
          "dq",
          "dr",
          "ds",
          "dt",
          "du",
          "dv",
          "dw",
          "dx",
          "dy",
          "dz",
          "d0",
          "d1",
          "d2",
          "d3",
          "d4",
          "d5",
          "d6",
          "d7",
          "d8",
          "d9",
          "dA",
          "dB",
          "dC",
          "dD",
        ].map((k) => (
          <div
            key={k}
            style={{
              width: 40,
              height: 4,
              marginRight: 32,
              borderRadius: 2,
              flexShrink: 0,
              background: "rgba(148,163,184,0.35)",
            }}
          />
        ))}
      </motion.div>

      {/* Road edge reflective strips */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 3, background: "rgba(56,189,248,0.2)" }}
      />

      {/* BIKE ASSEMBLY — moves left to right */}
      <motion.div
        className="absolute"
        style={{ bottom: 44, left: 0 }}
        initial={{ x: -300 }}
        animate={{ x: travelDist }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {/* Speed lines behind bike */}
        <div
          style={{
            position: "absolute",
            right: "100%",
            top: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            paddingRight: 8,
          }}
        >
          {[
            ["s80", 80],
            ["s120", 120],
            ["s60", 60],
            ["s100", 100],
            ["s50", 50],
          ].map(([k, w], i) => (
            <motion.div
              key={k as string}
              style={{
                height: 2,
                width: w,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, transparent, rgba(45,212,191,0.6))",
                transformOrigin: "right",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.7, 1, 0.7] }}
              transition={{
                duration: 0.4 + i * 0.07,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        {/* Electric spark particles */}
        {["sp0", "sp1", "sp2", "sp3"].map((k, i) => (
          <motion.div
            key={k}
            style={{
              position: "absolute",
              right: "98%",
              top: "60%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#2dd4bf" : "#38bdf8",
              boxShadow: "0 0 6px #2dd4bf",
            }}
            animate={{
              x: [0, -(20 + i * 12)],
              y: [0, (i % 2 === 0 ? -1 : 1) * (8 + i * 4)],
              opacity: [1, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.12,
              ease: "easeOut",
            }}
          />
        ))}

        {/* THE MOTORCYCLE SVG */}
        <svg
          width="280"
          height="170"
          viewBox="0 0 280 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="GoGrabX professional EV motorcycle"
        >
          <defs>
            <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rearGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="tankGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0c1a30" />
            </linearGradient>
            <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── REAR WHEEL ── */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{ originX: "52px", originY: "130px" }}
          >
            {/* Outer tire */}
            <circle
              cx="52"
              cy="130"
              r="30"
              fill="#0f172a"
              stroke="#1e293b"
              strokeWidth="7"
            />
            {/* Rim ring */}
            <circle
              cx="52"
              cy="130"
              r="23"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Spokes — 10 spokes */}
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
              const a = (deg * Math.PI) / 180;
              return (
                <line
                  key={`rs${deg}`}
                  x1={52 + 6 * Math.cos(a)}
                  y1={130 + 6 * Math.sin(a)}
                  x2={52 + 22 * Math.cos(a)}
                  y2={130 + 22 * Math.sin(a)}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Hub */}
            <circle
              cx="52"
              cy="130"
              r="6"
              fill="#334155"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            <circle cx="52" cy="130" r="2.5" fill="#38bdf8" />
          </motion.g>
          {/* Tire tread outer ring */}
          <circle
            cx="52"
            cy="130"
            r="30"
            fill="none"
            stroke="#0f172a"
            strokeWidth="5.5"
          />
          <circle
            cx="52"
            cy="130"
            r="30"
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ── FRONT WHEEL ── */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.5,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{ originX: "222px", originY: "130px" }}
          >
            {/* Outer tire */}
            <circle
              cx="222"
              cy="130"
              r="30"
              fill="#0f172a"
              stroke="#1e293b"
              strokeWidth="7"
            />
            {/* Rim ring */}
            <circle
              cx="222"
              cy="130"
              r="23"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Spokes — 10 spokes */}
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
              const a = (deg * Math.PI) / 180;
              return (
                <line
                  key={`fs${deg}`}
                  x1={222 + 6 * Math.cos(a)}
                  y1={130 + 6 * Math.sin(a)}
                  x2={222 + 22 * Math.cos(a)}
                  y2={130 + 22 * Math.sin(a)}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Hub */}
            <circle
              cx="222"
              cy="130"
              r="6"
              fill="#334155"
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            <circle cx="222" cy="130" r="2.5" fill="#38bdf8" />
          </motion.g>
          {/* Tire tread outer ring */}
          <circle
            cx="222"
            cy="130"
            r="30"
            fill="none"
            stroke="#0f172a"
            strokeWidth="5.5"
          />
          <circle
            cx="222"
            cy="130"
            r="30"
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ── SWINGARM ── */}
          <line
            x1="52"
            y1="130"
            x2="108"
            y2="108"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="52"
            y1="130"
            x2="108"
            y2="112"
            stroke="#38bdf8"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* ── MAIN FRAME ── */}
          {/* Top frame tube: head tube to seat */}
          <path
            d="M108 108 L130 72 L172 68"
            stroke="#1e3a5f"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Down tube */}
          <path
            d="M172 68 L195 100 L210 130"
            stroke="#1e3a5f"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Sub-frame to rear */}
          <path
            d="M108 108 L130 100 L172 68"
            stroke="#253e5c"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Frame accent highlight */}
          <path
            d="M108 108 L130 72 L172 68"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* ── BATTERY / MOTOR BLOCK ── */}
          <rect
            x="118"
            y="100"
            width="60"
            height="28"
            rx="4"
            fill="url(#bodyGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <rect x="122" y="104" width="52" height="20" rx="3" fill="#0c1a2e" />
          {/* Battery cell lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={130 + i * 12}
              y1="105"
              x2={130 + i * 12}
              y2="123"
              stroke="#38bdf8"
              strokeWidth="0.8"
              opacity="0.5"
            />
          ))}
          {/* Battery label */}
          <text
            x="148"
            y="117"
            textAnchor="middle"
            fill="#2dd4bf"
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
          >
            EV
          </text>
          {/* Battery charge indicator */}
          <rect
            x="125"
            y="107"
            width="26"
            height="6"
            rx="1"
            fill="#0f3460"
            stroke="#38bdf8"
            strokeWidth="0.5"
          />
          <motion.rect
            x="126"
            y="108"
            width="22"
            height="4"
            rx="0.5"
            fill="#2dd4bf"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* ── BODY FAIRING ── */}
          {/* Main fairing body */}
          <path
            d="M108 108 C115 82 125 72 148 70 L172 68 C185 68 195 88 200 108 L172 112 L130 112 Z"
            fill="url(#tankGrad)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          {/* Fairing lower skirt */}
          <path
            d="M108 108 L130 112 L172 112 L200 108 L195 118 L118 118 Z"
            fill="#0c1a2e"
            stroke="#334155"
            strokeWidth="1"
          />
          {/* Fairing highlight stripe */}
          <path
            d="M118 80 C128 74 148 71 165 70"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M120 85 C132 79 148 76 165 74"
            stroke="#2dd4bf"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* ── FRONT FORK ── */}
          {/* Left fork tube */}
          <line
            x1="198"
            y1="88"
            x2="222"
            y2="130"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Right fork tube (slightly offset) */}
          <line
            x1="204"
            y1="88"
            x2="228"
            y2="130"
            stroke="#253e5c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Fork accent */}
          <line
            x1="199"
            y1="90"
            x2="223"
            y2="130"
            stroke="#38bdf8"
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Fork brace */}
          <line
            x1="202"
            y1="105"
            x2="208"
            y2="113"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ── SEAT ── */}
          <path
            d="M128 70 C135 62 155 60 168 62 L172 68 L130 72 Z"
            fill="#2d3748"
            stroke="#4a5568"
            strokeWidth="1.5"
          />
          {/* Seat cushion highlight */}
          <path
            d="M133 67 C140 63 155 62 164 64"
            stroke="#718096"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* ── RIDER ── */}
          {/* Rear leg / foot peg */}
          <line
            x1="120"
            y1="112"
            x2="110"
            y2="125"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="108"
            y1="124"
            x2="118"
            y2="126"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Front leg */}
          <line
            x1="165"
            y1="108"
            x2="170"
            y2="122"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="168"
            y1="121"
            x2="178"
            y2="120"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Rider body / torso (leaning forward) */}
          <path
            d="M130 70 C128 58 132 46 140 40 L148 38 C155 38 162 42 164 50 L168 62 L148 68 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* Jacket highlight */}
          <path
            d="M132 62 C132 52 136 44 142 40"
            stroke="#38bdf8"
            strokeWidth="0.8"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* Rider arm — right arm on handlebar */}
          <path
            d="M164 50 C172 48 180 50 190 54"
            stroke="#2d3748"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M164 50 C172 48 180 50 190 54"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* Left arm */}
          <path
            d="M148 46 C156 44 170 46 182 52"
            stroke="#2d3748"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rider helmet */}
          <ellipse
            cx="144"
            cy="33"
            rx="14"
            ry="13"
            fill="url(#helmetGrad)"
            stroke="#2d3748"
            strokeWidth="2"
          />
          {/* Helmet visor */}
          <path
            d="M131 30 C133 24 138 20 144 20 C150 20 155 24 157 30"
            fill="#0ea5e9"
            opacity="0.7"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          {/* Helmet highlight */}
          <path
            d="M134 25 C136 21 140 19 144 19"
            stroke="#7dd3fc"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Chin guard */}
          <path
            d="M131 33 C131 38 136 42 144 43 C152 42 157 38 157 33"
            fill="#1e293b"
            stroke="#2d3748"
            strokeWidth="1"
          />

          {/* ── HANDLEBARS ── */}
          {/* Handlebar stem */}
          <line
            x1="200"
            y1="80"
            x2="200"
            y2="68"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Clip-on bars */}
          <line
            x1="188"
            y1="56"
            x2="213"
            y2="56"
            stroke="#64748b"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Bar ends with grips */}
          <rect
            x="185"
            y="53"
            width="6"
            height="6"
            rx="2"
            fill="#334155"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          <rect
            x="210"
            y="53"
            width="6"
            height="6"
            rx="2"
            fill="#334155"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          {/* Mirror */}
          <line
            x1="214"
            y1="56"
            x2="222"
            y2="48"
            stroke="#475569"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <ellipse
            cx="222"
            cy="46"
            rx="4"
            ry="3"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="1"
          />

          {/* ── HEADLIGHT ── */}
          {/* Headlight housing */}
          <path
            d="M230 60 C240 56 252 58 255 65 C252 72 240 74 230 70 Z"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* LED strip */}
          <motion.path
            d="M233 62 C240 59 250 61 252 65"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
          />
          {/* DRL */}
          <motion.path
            d="M232 68 C238 66 248 67 252 65"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 0.9,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.2,
            }}
          />
          {/* Headlight beam */}
          <motion.path
            d="M255 63 L280 55 L280 75 L255 67 Z"
            fill="url(#headlightGlow)"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* ── TAIL LIGHT ── */}
          <motion.path
            d="M52 118 C45 115 42 120 45 126"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* ── EXHAUST / TAIL ── */}
          <path
            d="M52 130 C44 124 38 122 32 124"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="30"
            cy="124"
            rx="4"
            ry="3"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1"
          />

          {/* ── FRONT FENDER ── */}
          <path
            d="M198 104 C208 92 220 94 226 100"
            stroke="#334155"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M199 106 C208 94 218 96 224 102"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />

          {/* ── REAR FENDER ── */}
          <path
            d="M54 100 C60 92 72 90 80 96"
            stroke="#334155"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── FOOTPEGS ── */}
          <line
            x1="104"
            y1="120"
            x2="122"
            y2="120"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="168"
            y1="118"
            x2="185"
            y2="118"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* ── GOGRABX LABEL on fairing ── */}
          <motion.text
            x="148"
            y="94"
            textAnchor="middle"
            fill="#2dd4bf"
            fontSize="7"
            fontFamily="'Bricolage Grotesque', sans-serif"
            fontWeight="800"
            letterSpacing="1"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            GoGrabX
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}

export default function BlueprintPage({
  onEnterPortal,
}: {
  onEnterPortal?: () => void;
}) {
  const [activeSection, setActiveSection] = useState("hero");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

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
        "contact",
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
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1200);
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

          {/* EV Bike Animation */}
          <div className="mb-8 -mx-6 w-[calc(100%+3rem)]">
            <EVBikeHero />
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

        {/* Fundraising Progress */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-2xl w-full"
        >
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-slate-900/90 via-amber-950/20 to-slate-900/90 p-6 backdrop-blur shadow-[0_0_40px_rgba(251,191,36,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-amber-300 uppercase tracking-widest">
                🚀 Live Fundraising Round
              </span>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">
                Seed Stage
              </span>
            </div>
            <div className="flex items-end justify-between mt-4 mb-3">
              <div>
                <div className="text-3xl font-extrabold text-white font-display">
                  ₹10 Lakhs{" "}
                  <span className="text-lg font-medium text-teal-300">
                    raised
                  </span>
                </div>
                <div className="text-sm text-slate-400 mt-0.5">
                  of ₹50 Lakhs goal
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-400">20%</div>
                <div className="text-xs text-slate-500">funded</div>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-teal-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <span>₹0</span>
              <span>Target: ₹50 Lakhs</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                Early investor slots available
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                EV Fleet · Tier-2/3 India
              </div>
            </div>
            <div className="mt-5">
              <motion.button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="fundraising.primary_button"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(251,191,36,0)",
                    "0 0 18px rgba(251,191,36,0.8)",
                    "0 0 0px rgba(251,191,36,0)",
                  ],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-teal-400 py-3 text-sm font-bold text-slate-900 tracking-widest uppercase relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-900 animate-ping" />
                  Invest Now
                </span>
              </motion.button>
            </div>
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

      {/* Contact / Inquiry Form */}
      <RevealSection id="contact">
        <section className="relative z-10 px-6 py-24">
          <div data-ocid="contact.section" className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Investor Relations" title="Get in Touch" />
            <p className="mb-10 -mt-2 text-slate-400">
              Interested in co-owning EV fleet assets or exploring investment
              opportunities? We'd love to connect.
            </p>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  data-ocid="contact.success_state"
                >
                  <GlassCard className="flex flex-col items-center gap-5 py-14 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_30px_rgba(52,211,153,0.25)]">
                      <svg
                        className="h-8 w-8 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        Thank you for reaching out!
                      </h3>
                      <p className="mt-2 text-slate-400">
                        We'll be in touch within 24 hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          interest: "",
                          message: "",
                        });
                      }}
                      className="mt-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
                    >
                      Send another message
                    </button>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="p-8">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Row 1: Name + Email */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="contact-name"
                            className="text-sm font-medium text-slate-300"
                          >
                            Full Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            placeholder="Ravi Kumar"
                            data-ocid="contact.input"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-400/60 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="contact-email"
                            className="text-sm font-medium text-slate-300"
                          >
                            Email Address
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="ravi@example.com"
                            data-ocid="contact.input"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-400/60 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Row 2: Company + Interest */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="contact-company"
                            className="text-sm font-medium text-slate-300"
                          >
                            Company / Fund Name
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            placeholder="Mahesh Ventures"
                            data-ocid="contact.input"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-400/60 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="contact-interest"
                            className="text-sm font-medium text-slate-300"
                          >
                            Investment Interest
                          </label>
                          <select
                            id="contact-interest"
                            required
                            data-ocid="contact.select"
                            value={formData.interest}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                interest: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-white focus:border-teal-400/60 focus:outline-none"
                          >
                            <option value="" disabled className="bg-slate-900">
                              Select an option
                            </option>
                            <option value="ev-fleet" className="bg-slate-900">
                              EV Fleet Co-ownership
                            </option>
                            <option value="series-a" className="bg-slate-900">
                              Series A Investment
                            </option>
                            <option
                              value="partnership"
                              className="bg-slate-900"
                            >
                              Strategic Partnership
                            </option>
                            <option value="general" className="bg-slate-900">
                              General Inquiry
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="contact-message"
                          className="text-sm font-medium text-slate-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          required
                          placeholder="Tell us about your investment goals or questions..."
                          data-ocid="contact.textarea"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-400/60 focus:outline-none"
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={formLoading}
                          data-ocid="contact.submit_button"
                          className="rounded-xl bg-teal-400 px-8 py-3.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.3)] transition hover:bg-teal-300 disabled:opacity-60"
                        >
                          {formLoading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Sending…
                            </span>
                          ) : (
                            "Send Inquiry →"
                          )}
                        </button>
                      </div>
                    </form>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
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
