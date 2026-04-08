import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Mic,
  Smartphone,
  Zap,
  Shield,
  BarChart3,
  Star,
  Check,
  FileText,
  WifiOff,
  MessageSquare,
} from "lucide-react"

const APP_URL = "https://the-condenser-production.up.railway.app/"

/* ── Animated section wrapper ── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Data ── */
const PROBLEMS = [
  {
    icon: <FileText size={22} />,
    title: "Drowning in paperwork",
    desc: "Walk 5 houses a day, then spend evenings typing lists from scribbled notes and memory. Half the items get lost.",
  },
  {
    icon: <WifiOff size={22} />,
    title: "No signal, no system",
    desc: "Jobsites have zero cell service. Cloud-only tools are useless when you need them most — mid-walkthrough.",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "Chasing trade partners",
    desc: "You copy-paste items into texts and emails, one trade at a time. Then you chase them for updates nobody tracks.",
  },
]

const FEATURES = [
  {
    title: "Punch List Engine",
    desc: "Intake from PDFs, photos, voice, or manual entry. Every item tracked from creation to close-out. Auto-classified by trade.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    title: "Voice Capture",
    desc: "Walk the house, speak your items. Voice is transcribed, split by trade, and dropped into your master list — hands-free.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
  },
  {
    title: "Smart Communication",
    desc: "Send grouped items to trade partners via email or text. Auto-formatted templates. One tap, done.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
  },
]

const STATS = [
  { value: "96%", label: "Paperwork Cut" },
  { value: "12K+", label: "Items Tracked" },
  { value: "100%", label: "Offline Ready" },
  { value: "<3min", label: "List to Send" },
]

const TESTIMONIALS = [
  {
    name: "Paige B.",
    role: "Construction Manager",
    company: "Pulte Homes",
    text: "Finally a tool that understands how I actually work in the field. No more juggling spreadsheets and sticky notes.",
  },
  {
    name: "Marcus T.",
    role: "Senior CM",
    company: "DR Horton",
    text: "The trade auto-classification alone saves me an hour a day. Items just route themselves to the right people.",
  },
  {
    name: "Sarah K.",
    role: "Project Manager",
    company: "Lennar",
    text: "Offline-first was the dealbreaker for me. Bad signal on the jobsite? Doesn't matter. Everything just works.",
  },
]

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "For CMs getting started",
    features: ["5 active projects", "Voice capture", "Trade auto-classification", "Offline mode", "Email support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "For serious field operators",
    features: ["Unlimited projects", "Priority & aging flags", "Smart templates", "PDF intake", "Team sharing", "Priority support"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For builders at scale",
    features: ["Everything in Pro", "Custom integrations", "Admin dashboard", "Dedicated onboarding", "SLA guarantee", "Phone support"],
    cta: "Contact Sales",
    featured: false,
  },
]

const FAQS = [
  {
    q: "Does it work without cell signal?",
    a: "Yes. The Condenser is built offline-first. Everything syncs when you're back in range. Your data is never lost.",
  },
  {
    q: "Can I import existing punch lists?",
    a: "Absolutely. Upload PDFs, paste text, or use voice capture. The system auto-classifies items by trade.",
  },
  {
    q: "How does trade auto-classification work?",
    a: "We use field-language aliases and keyword mapping trained on real construction punch lists. Items route to the right trade automatically.",
  },
  {
    q: "Is my data secure?",
    a: "Your data stays on your device first. When synced, it's encrypted in transit and at rest. We never sell your data.",
  },
  {
    q: "Can I share lists with trade partners?",
    a: "One tap sends grouped items by trade via email or text. Partners get clean, formatted lists — no app download required.",
  },
]

const FEATURES_DETAIL = [
  { icon: <ClipboardList size={24} />, title: "Punch List Management", desc: "Every item from intake to close-out" },
  { icon: <Mic size={24} />, title: "Voice Capture", desc: "Speak items while walking the house" },
  { icon: <Zap size={24} />, title: "Auto-Classification", desc: "Items route to the right trade" },
  { icon: <Smartphone size={24} />, title: "Mobile-First PWA", desc: "Works offline, installs natively" },
  { icon: <Shield size={24} />, title: "Offline-First", desc: "Never lose data in the field" },
  { icon: <BarChart3 size={24} />, title: "Priority & Aging", desc: "72-hour flags, HOT items tracked" },
]

/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-semibold text-white pr-4">{q}</span>
        {open ? <ChevronUp size={20} className="text-copper shrink-0" /> : <ChevronDown size={20} className="text-text-muted shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-text-secondary">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark text-white">

      {/* ===== NAV ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper font-mono text-base font-black text-white">C</div>
            <span className="text-xl font-bold tracking-tight">The Condenser</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            <a href="#features" className="text-sm font-medium text-neutral-400 transition hover:text-white">Features</a>
            <a href="#about" className="text-sm font-medium text-neutral-400 transition hover:text-white">About</a>
            <a href="#pricing" className="text-sm font-medium text-neutral-400 transition hover:text-white">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-neutral-400 transition hover:text-white">FAQ</a>
            <a href="#contact" className="text-sm font-medium text-neutral-400 transition hover:text-white">Contact</a>
            <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-copper px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">
              Early Access <ArrowRight size={14} />
            </a>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 bg-dark px-6 pb-6 lg:hidden">
            {[
              { label: "Features", href: "#features" },
              { label: "About", href: "#about" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block border-b border-white/5 py-3 text-base font-medium text-neutral-300">{l.label}</a>
            ))}
            <a href={APP_URL} className="mt-4 block text-base font-semibold text-copper-light">Early Access →</a>
          </motion.div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen overflow-hidden bg-copper">
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.3)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          <div className="flex-1 py-16 lg:py-0">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-6xl font-900 uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              Built for<br />the field,<br />
              <span className="text-dark">not the<br />office</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-white/80"
            >
              The single source of truth for residential construction punch lists. Intake, condense, organize, communicate — all from the field.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-dark px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-900 hover:shadow-xl">
                Early Access <ArrowRight size={16} />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                See Features
              </a>
            </motion.div>
          </div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-1 justify-center pb-16 lg:pb-0"
          >
            <div className="w-[280px] rounded-[36px] border-2 border-white/20 bg-dark p-3 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <div className="mx-auto h-6 w-24 rounded-b-2xl bg-dark" />
              <div className="min-h-[440px] overflow-hidden rounded-[24px] bg-dark-card p-5">
                <div className="mb-5 text-center">
                  <div className="text-base font-bold tracking-tight text-white">529 Madelines Garden</div>
                  <div className="mt-1 font-mono text-[10px] text-text-muted">Patterson Ranch &middot; 24 items</div>
                </div>
                {[
                  { trade: "PAINTING & TOUCH-UP", items: [
                    { text: "Touch up nicks on stair risers", status: "pending", hot: true },
                    { text: "Repaint garage door trim", status: "done" },
                  ]},
                  { trade: "PLUMBING", items: [
                    { text: "Master bath faucet drip", status: "wip" },
                    { text: "Kitchen sink disposal rattle", status: "pending" },
                  ]},
                  { trade: "HVAC", items: [
                    { text: "Register cover loose in hallway", status: "pending", aging: true },
                    { text: "Thermostat wiring check", status: "done" },
                  ]},
                  { trade: "TRIM / BASEBOARD", items: [
                    { text: "Gap in baseboard at master closet", status: "pending" },
                  ]},
                ].map(group => (
                  <div key={group.trade}>
                    <div className="mt-4 mb-2 border-b-2 border-white/10 pb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-text-muted">
                      {group.trade}
                    </div>
                    {group.items.map(item => (
                      <div key={item.text} className="flex items-center gap-2 border-b border-white/5 py-2">
                        <div className={`h-3.5 w-3.5 shrink-0 rounded-sm border-[1.5px] ${
                          item.status === "done" ? "border-emerald-500 bg-emerald-500" :
                          item.status === "wip" ? "border-amber-500 bg-amber-500" :
                          "border-neutral-600"
                        }`} />
                        <span className="flex-1 text-[11px] font-medium text-neutral-300">{item.text}</span>
                        {"hot" in item && item.hot && <span className="font-mono text-[8px] font-bold text-red-500">!!</span>}
                        {"aging" in item && item.aging && <span className="font-mono text-[8px] text-neutral-500">&#x23F3;</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="border-y border-white/5 bg-dark py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-8 text-center font-display text-xl font-bold uppercase tracking-wider text-text-muted">
            Trusted by crews across the country
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            {["PULTE HOMES", "DR HORTON", "LENNAR", "MERITAGE", "TOLL BROTHERS"].map(name => (
              <span key={name} className="font-display text-lg font-bold uppercase tracking-widest text-white">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM — narrative bridge ===== */}
      <section className="bg-dark-card py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">The Problem</p>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight lg:text-5xl">
              CMs deserve<br />better tools
            </h2>
            <p className="mt-5 max-w-xl text-base text-text-secondary leading-relaxed">
              You manage 5-20 active lots and spend more time on paperwork than building. These should sound familiar.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {PROBLEMS.map((p) => (
              <Reveal key={p.title}>
                <div className="h-full rounded-xl border border-white/5 bg-dark p-6 transition hover:border-copper/20">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-copper/10 text-copper">
                    {p.icon}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-wide">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR THE FIELD — 3 Feature Cards ===== */}
      <section id="features" className="bg-dark py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 max-w-2xl">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">What We Build</p>
            <h2 className="font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight lg:text-6xl">Built for the field</h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">Purpose-built tools for construction managers who manage 5-20 active lots and need speed over complexity.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div className="group overflow-hidden rounded-2xl border border-white/5 bg-dark-card transition hover:border-copper/30">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-bold uppercase">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-copper transition hover:text-copper-light">
                      Learn More <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NUMBERS THAT SPEAK ===== */}
      <section className="bg-copper py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-white lg:text-5xl">
              Numbers that speak for the field
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-5xl font-900 text-dark lg:text-6xl">{s.value}</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/70">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT — Built by folks who live it ===== */}
      <section id="about" className="bg-dark py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=500&fit=crop"
                alt="Construction worker"
                className="h-72 w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=500&fit=crop"
                alt="Jobsite"
                className="mt-8 h-72 w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Our Story</p>
            <h2 className="mb-6 font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight lg:text-6xl">
              Built by folks<br />who live it
            </h2>
            <p className="mb-6 text-lg text-text-secondary leading-relaxed">
              Not another desktop dashboard. The Condenser was designed by a construction manager walking lots in the Texas sun with one hand free and spotty cell signal.
            </p>
            <p className="mb-8 text-text-secondary leading-relaxed">
              We've been in the field. We know what it's like to juggle 15 active lots, three superintendents, and a stack of paper punch lists that never match reality. That's why we built this — to condense the chaos into one place that actually works.
            </p>
            <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-copper px-8 py-4 text-base font-semibold text-white transition hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">
              Try It Free <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURES DETAIL GRID ===== */}
      <section className="border-y border-white/5 bg-dark-card py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Built by field pros, for you</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight lg:text-5xl">Features that keep you moving</h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES_DETAIL.map(f => (
              <Reveal key={f.title}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10 text-copper">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-text-secondary">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="bg-dark py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Pricing</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight lg:text-5xl">No-nonsense pricing.<br />Built for crews.</h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING.map(plan => (
              <Reveal key={plan.name}>
                <div className={`relative flex h-full flex-col rounded-2xl border p-8 transition ${
                  plan.featured
                    ? "border-copper bg-copper/5 shadow-[0_0_40px_rgba(196,90,44,0.15)]"
                    : "border-white/10 bg-dark-card hover:border-white/20"
                }`}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copper px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold uppercase">{plan.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{plan.desc}</p>
                  <div className="mt-6 mb-6">
                    <span className="font-display text-5xl font-900">{plan.price}</span>
                    {plan.period && <span className="text-text-muted">{plan.period}</span>}
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-text-secondary">
                        <Check size={16} className="shrink-0 text-copper" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={APP_URL}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all ${
                      plan.featured
                        ? "bg-copper text-white hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]"
                        : "border border-white/10 text-white hover:border-copper hover:bg-copper/5"
                    }`}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="border-y border-white/5 bg-dark-card py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Testimonials</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight lg:text-5xl">Built for the field. Proven on site.</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <Reveal key={t.name}>
                <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-dark p-8">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={16} className="fill-copper text-copper" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 font-display text-sm font-bold text-copper">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-text-muted">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-dark py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Support</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight lg:text-5xl">Field FAQs, zero fluff</h2>
          </Reveal>
          <Reveal>
            <div>
              {FAQS.map(faq => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden bg-copper py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.2)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-900 uppercase tracking-tight text-white lg:text-6xl">Ready to ditch the clipboard?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 leading-relaxed">
              Join the CMs who've already ditched paper punch lists for good.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-dark px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-900 hover:shadow-xl">
                Get Early Access <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="bg-dark py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Get In Touch</p>
            <h2 className="mb-6 font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight lg:text-6xl">
              Built for the field, ready now.
            </h2>
            <p className="mb-10 text-lg text-text-secondary leading-relaxed">
              Questions? Want a demo? Drop us a line and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper"><Phone size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Phone</div>
                  <div className="text-sm font-semibold">(512) 555-0199</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper"><Mail size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Email</div>
                  <div className="text-sm font-semibold">hello@thecondenser.app</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper"><MapPin size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Location</div>
                  <div className="text-sm font-semibold">Georgetown, TX</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <form onSubmit={e => e.preventDefault()} className="space-y-5 rounded-2xl border border-white/5 bg-dark-card p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">Name</label>
                  <input type="text" className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-copper" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">Email</label>
                  <input type="email" className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-copper" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">Subject</label>
                <input type="text" className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-copper" placeholder="How can we help?" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">Message</label>
                <textarea rows={4} className="w-full resize-none rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-copper" placeholder="Tell us about your needs..." />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-copper px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">
                Send Message <ArrowRight size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 bg-dark">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper font-mono text-base font-black text-white">C</div>
                <span className="text-xl font-bold tracking-tight">The Condenser</span>
              </div>
              <p className="max-w-sm text-sm text-text-muted leading-relaxed">
                The single source of truth for residential construction punch lists. Built by a CM, for CMs.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-text-muted">Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Features", href: "#features" },
                  { label: "About", href: "#about" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Contact", href: "#contact" },
                ].map(l => (
                  <li key={l.label}><a href={l.href} className="text-sm text-text-secondary transition hover:text-white">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-text-muted">Legal</h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-text-secondary transition hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-text-muted">
            <span className="font-mono">&copy; 2026</span> The Condenser System — Built for the field, not the office.
          </div>
        </div>
      </footer>
    </div>
  )
}
