import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight, Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronUp,
  ClipboardList, Mic, Smartphone, Zap, Shield, BarChart3, Check,
  Send, MessageCircle, Sparkles,
  Camera, AlertTriangle, User, DollarSign, Cloud, PenLine, Calendar,
  Headphones, BookOpen, Users,
} from "lucide-react"

const COMPANY = "BuildCore"
const PRODUCT = "The Condenser"
const APP_URL = "https://condenser-app-production.up.railway.app/home"
const API_URL = "https://condenser-app-production.up.railway.app"

/* ── Reveal ── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}

/* ── Data ── */
const CAPABILITIES = [
  { icon: <ClipboardList size={24} />, title: "Punch List Engine", desc: "Every item tracked from intake to close-out. Items auto-sort to the right trade — no manual filing." },
  { icon: <Mic size={24} />, title: "Voice Capture", desc: "Walk the house, speak your items. Your words become organized, trade-sorted punch items instantly." },
  { icon: <Send size={24} />, title: "One-Tap Export", desc: "Send formatted lists via iMessage, SMS, or email directly to each trade. No other construction app does this." },
  { icon: <Camera size={24} />, title: "Homeowner Updates", desc: "Snap progress photos and send branded updates to homeowners. Keep them in the loop without the phone tag." },
  { icon: <AlertTriangle size={24} />, title: "Safety Reporting", desc: "Photograph a violation, set the backcharge, describe the issue, and send it to the office — all in one tap." },
  { icon: <Shield size={24} />, title: "Offline-First", desc: "Full functionality without cell signal. Everything syncs automatically when you're back in range." },
  { icon: <BarChart3 size={24} />, title: "Priority & Aging", desc: "72-hour flags and HOT labels keep critical items visible. Nothing falls through the cracks." },
  { icon: <User size={24} />, title: "CM Profiles", desc: "Your headshot, your projects, your track record. A professional identity built for the field." },
]

const INTEGRATIONS = [
  { icon: <Mail size={24} />, name: "Outlook & Gmail", desc: "Sync your inbox and calendar", coming: true },
  { icon: <DollarSign size={24} />, name: "QuickBooks", desc: "Accounting & invoicing", coming: true },
  { icon: <MessageCircle size={24} />, name: "iMessage & SMS", desc: "Native text to trades", coming: true },
  { icon: <Cloud size={24} />, name: "Cloud Storage", desc: "Google Drive & Dropbox", coming: true },
  { icon: <PenLine size={24} />, name: "DocuSign", desc: "Digital sign-offs & approvals", coming: true },
  { icon: <Calendar size={24} />, name: "Calendar Sync", desc: "Apple & Google Calendar", coming: true },
]

const SUPPORT_ITEMS = [
  { icon: <Headphones size={32} />, title: "Expert Support", desc: "Real construction people on the other end. Not chatbots. Reach us by email, chat, or phone — we've walked the lots too." },
  { icon: <BookOpen size={32} />, title: "Training & Onboarding", desc: "Get your crew up and running fast with guided setup, video walkthroughs, and on-demand courses built for field teams." },
  { icon: <Users size={32} />, title: "CM Community", desc: "Connect with construction managers across the country. Share templates, trade contacts, and hard-won lessons." },
]

const PRICING = [
  { name: "Starter", priceMonthly: "Free", priceAnnual: "Free", period: "", desc: "For CMs getting started", features: ["5 active projects", "Voice capture", "Trade auto-classification", "Offline mode", "Email support"], cta: "Get Started", featured: false },
  { name: "Pro", priceMonthly: "$39", priceAnnual: "$32", period: "/mo", desc: "For serious field operators", features: ["Unlimited projects", "Priority & aging flags", "Smart templates", "PDF intake", "Safety reporting", "Homeowner updates", "Team sharing", "Priority support"], cta: "Start Free Trial", featured: true },
  { name: "Team", priceMonthly: "$29", priceAnnual: "$24", period: "/seat/mo", desc: "For crews and builders", features: ["Everything in Pro", "Multi-user access", "Shared project views", "Admin controls", "Team analytics", "Role-based permissions", "Bulk onboarding", "Priority support"], cta: "Start Free Trial", featured: false },
  { name: "Enterprise", priceMonthly: "Custom", priceAnnual: "Custom", period: "", desc: "For builders at scale", features: ["Everything in Team", "Custom integrations", "Admin dashboard", "Dedicated onboarding", "SLA guarantee", "Phone support"], cta: "Contact Sales", featured: false },
]

/* Testimonials removed — replaced with Founding User CTA (Phase 3 credibility fix) */

const STATS = [
  { value: "0", label: "Clipboards Needed" },
  { value: "100%", label: "Offline Capable" },
  { value: "<3min", label: "List to Send" },
  { value: "1-Tap", label: "Export to Trades" },
]

const FAQS = [
  { q: "Does it work without cell signal?", a: "Yes. BuildCore is built offline-first. Everything syncs automatically when you're back in range. Your data is never lost." },
  { q: "How does one-tap export work?", a: "Once your list is ready, hit send. Items are auto-grouped by trade and formatted into a clean message. Choose iMessage, SMS, or email — each trade gets exactly their items. One tap, done." },
  { q: "How does safety reporting work?", a: "Snap a photo of the violation, set the backcharge amount, add a description, and hit send. It goes straight to the office via text and email. The whole process takes about 15 seconds." },
  { q: "Can I send homeowner updates?", a: "Yes. Take progress photos, add a note, and send a branded update to the homeowner. They stay informed without you playing phone tag all week." },
  { q: "What integrations are available?", a: "We connect with Outlook, Gmail, QuickBooks, Google Drive, Dropbox, DocuSign, and Apple/Google Calendar. iMessage and SMS export are built in natively." },
  { q: "Is my data secure?", a: "Your data stays on your device first. When synced, it's encrypted in transit and at rest. We never sell or share your data." },
]

/* ── Interactive phone data ── */
const PHONE_GROUPS = [
  { trade: "PAINTING", tradeSendTo: "Mike's Painting", items: [
    { id: "p1", text: "Touch up nicks on stair risers", hot: true },
    { id: "p2", text: "Repaint garage door trim" },
  ]},
  { trade: "PLUMBING", tradeSendTo: "Ray's Plumbing", items: [
    { id: "pl1", text: "Master bath faucet drip" },
    { id: "pl2", text: "Kitchen sink disposal rattle" },
  ]},
  { trade: "HVAC", tradeSendTo: "Comfort Air Co", items: [
    { id: "h1", text: "Register cover loose in hallway", aging: true },
    { id: "h2", text: "Thermostat wiring check" },
  ]},
  { trade: "TRIM", tradeSendTo: "Ace Trim & Finish", items: [
    { id: "t1", text: "Gap in baseboard at master closet" },
  ]},
]
const TOTAL_PHONE_ITEMS = PHONE_GROUPS.reduce((sum, g) => sum + g.items.length, 0)
const COMPLETE_THRESHOLD = 3

/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-light-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="text-base font-semibold text-text-on-light pr-4">{q}</span>
        {open ? <ChevronUp size={20} className="text-copper shrink-0" /> : <ChevronDown size={20} className="text-text-on-light-muted shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-sm leading-relaxed text-text-on-light-2">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════ APP ══════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* Phone state */
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [showExport, setShowExport] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [demoEmail, setDemoEmail] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [pageConfetti, setPageConfetti] = useState(false)
  const [showSentConfirm, setShowSentConfirm] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [selectedChannel, setSelectedChannel] = useState("")
  const [annual, setAnnual] = useState(false)

  const progressPercent = Math.min((checkedItems.size / COMPLETE_THRESHOLD) * 100, 100)
  const isComplete = checkedItems.size >= COMPLETE_THRESHOLD

  function fireConfetti() {
    setShowConfetti(true); setPageConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
    setTimeout(() => setPageConfetti(false), 4000)
  }
  function handlePhoneItemClick(id: string) {
    if (showExport || showGate) return
    if (showHint) setShowHint(false)
    const next = new Set(checkedItems)
    next.has(id) ? next.delete(id) : next.add(id)
    setCheckedItems(next)
    if (next.size >= COMPLETE_THRESHOLD && !showExport) setTimeout(() => setShowExport(true), 600)
  }
  function handleSendClick(channel: string) {
    setSelectedChannel(channel)
    if (emailSubmitted) {
      setShowExport(false); fireConfetti()
      setTimeout(() => setShowSentConfirm(true), 300)
      setTimeout(() => setShowSentConfirm(false), 3500)
    } else setShowGate(true)
  }
  function handleDemoEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!demoEmail.trim()) return
    setEmailSubmitted(true); setShowGate(false); setShowExport(false); fireConfetti()
    setTimeout(() => setShowSentConfirm(true), 300)
    setTimeout(() => setShowSentConfirm(false), 4000)
    try { fetch(`${API_URL}/api/waitlist`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: demoEmail, source: "phone_demo" }) }); } catch {}
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-light text-text-on-light">

      {/* ===== NAV ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-light-border shadow-sm" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper font-mono text-base font-black text-white">B</div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-text-on-light" : "text-white"}`}>{COMPANY}</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {[{ l: "Features", h: "#features" }, { l: "Pricing", h: "#pricing" }, { l: "Roadmap", h: "#roadmap" }, { l: "About", h: "#about" }, { l: "FAQ", h: "#faq" }, { l: "Contact", h: "#contact" }].map(n => (
              <a key={n.h} href={n.h} className={`text-sm font-medium transition ${scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-white/70 hover:text-white"}`}>{n.l}</a>
            ))}
            <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-copper px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">
              Clock In <ArrowRight size={14} />
            </a>
          </div>
          <button className={`flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${scrolled ? "text-neutral-500" : "text-white/70"}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-b border-light-border bg-white px-6 pb-6 lg:hidden">
            {[{ l: "Features", h: "#features" }, { l: "Pricing", h: "#pricing" }, { l: "Roadmap", h: "#roadmap" }, { l: "About", h: "#about" }, { l: "FAQ", h: "#faq" }, { l: "Contact", h: "#contact" }].map(n => (
              <a key={n.h} href={n.h} onClick={() => setMenuOpen(false)} className="block border-b border-light-border py-3 text-base font-medium text-neutral-700">{n.l}</a>
            ))}
            <a href={APP_URL} className="mt-4 block text-base font-semibold text-copper">Clock In →</a>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* 1. HERO (dark copper)                      */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-copper">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.3)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          <div className="flex-1 py-16 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              <Sparkles size={14} className="text-white" /> Powered by {PRODUCT}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-display text-6xl font-900 uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl">
              Built for<br />the field,<br /><span className="text-dark">not the<br />office</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 max-w-lg text-lg leading-relaxed text-white/80">
              The residential construction platform that handles punch lists, trade communication, safety reporting, and homeowner updates — all from the field.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-10 flex flex-wrap gap-4">
              <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-dark px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-900 hover:shadow-xl">Clock In <ArrowRight size={16} /></a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/10">See Features</a>
            </motion.div>
          </div>

          {/* ── Interactive Phone ── */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-1 justify-center pb-16 lg:pb-0">
            <div className="w-[280px] rounded-[36px] border-2 border-white/20 bg-dark p-3 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <div className="mx-auto h-6 w-24 rounded-b-2xl bg-dark" />
              <div className="relative min-h-[440px] overflow-hidden rounded-[24px] bg-dark-card">
                <div className="z-20 bg-dark-card px-5 pt-5 pb-3">
                  <div className="relative mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full" style={{ background: isComplete ? "linear-gradient(90deg,#22C55E,#16A34A)" : "linear-gradient(90deg,#C45A2C,#D4703C)" }} initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ type: "spring", stiffness: 200, damping: 20 }} />
                    {isComplete && <motion.div className="absolute inset-0 rounded-full" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 1.2, repeat: 2 }} style={{ boxShadow: "0 0 12px #22C55E, 0 0 24px #22C55E" }} />}
                  </div>
                  <div className="flex items-center justify-between">
                    <div><div className="text-sm font-bold tracking-tight text-white">742 Oakmont Drive</div><div className="mt-0.5 font-mono text-[9px] text-text-muted">Cedar Falls</div></div>
                    <div className="text-right">
                      <motion.div className={`font-display text-lg font-900 ${isComplete ? "text-emerald-400" : "text-copper"}`} key={Math.round(progressPercent)} initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>{Math.round(progressPercent)}%</motion.div>
                      <div className="font-mono text-[8px] text-text-muted">{checkedItems.size}/{TOTAL_PHONE_ITEMS} items</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <AnimatePresence>{showHint && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-3 text-center"><span className="inline-block animate-pulse rounded-full bg-copper/20 px-3 py-1 font-mono text-[9px] text-copper">&#9758; Tap items to check them off</span></motion.div>}</AnimatePresence>
                  {PHONE_GROUPS.map(group => {
                    const gc = group.items.filter(i => checkedItems.has(i.id)).length
                    return (<div key={group.trade}>
                      <div className="mt-3 mb-2 flex items-center justify-between border-b-2 border-white/10 pb-1.5"><span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-text-muted">{group.trade}</span><span className={`font-mono text-[8px] ${gc === group.items.length ? "text-emerald-500" : "text-text-muted"}`}>{gc}/{group.items.length}</span></div>
                      {group.items.map(item => {
                        const ch = checkedItems.has(item.id), lk = showExport || showGate
                        return (<motion.div key={item.id} onClick={() => handlePhoneItemClick(item.id)} className={`flex items-center gap-2 border-b border-white/5 py-2 select-none transition-colors ${lk ? "pointer-events-none opacity-30" : "cursor-pointer hover:bg-white/5"}`} whileTap={!lk ? { scale: 0.96 } : {}}>
                          <motion.div className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border-[1.5px] transition-all duration-200 ${ch ? "border-emerald-500 bg-emerald-500" : "border-neutral-600"}`} animate={ch ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                            {ch && <svg width="8" height="8" viewBox="0 0 12 12"><motion.path d="M2 6l3 3 5-5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25 }} /></svg>}
                          </motion.div>
                          <span className={`flex-1 text-[11px] font-medium transition-all duration-200 ${ch ? "text-neutral-500 line-through" : "text-neutral-300"}`}>{item.text}</span>
                          {"hot" in item && item.hot && !ch && <span className="rounded-sm bg-red-500/20 px-1 font-mono text-[7px] font-bold text-red-400">HOT</span>}
                          {"aging" in item && item.aging && !ch && <span className="font-mono text-[8px] text-amber-500">&#x23F3;</span>}
                        </motion.div>)
                      })}
                    </div>)
                  })}
                </div>
                {/* Export overlay */}
                <AnimatePresence>{showExport && !showSentConfirm && (
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 28 }} className="absolute inset-x-0 bottom-0 z-30 rounded-t-2xl border-t-2 border-emerald-500/40 bg-dark p-5" style={{ boxShadow: "0 -20px 60px rgba(0,0,0,0.8)" }}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-3 flex justify-center"><span className="inline-flex items-center gap-1 rounded-full border border-copper/40 bg-copper/10 px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-copper"><Sparkles size={8} /> Industry First</span></motion.div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-1 text-center"><p className="font-display text-base font-bold uppercase tracking-wide text-emerald-400">List Complete</p><p className="mt-0.5 text-[10px] text-text-secondary">Ready to send — pick a channel</p></motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-3 space-y-1">
                      {PHONE_GROUPS.filter(g => g.items.some(i => checkedItems.has(i.id))).map(g => { const c = g.items.filter(i => checkedItems.has(i.id)).length; return (<div key={g.trade} className="flex items-center justify-between rounded-md bg-white/5 px-2.5 py-1.5"><span className="font-mono text-[9px] font-bold uppercase text-text-muted">{g.trade}</span><span className="font-mono text-[8px] text-text-muted">{c} → {g.tradeSendTo}</span></div>) })}
                    </motion.div>
                    <div className="space-y-1.5">
                      {[{ id: "imessage", label: "iMessage", icon: <MessageCircle size={13} />, cls: "bg-[#0B93F6] hover:bg-[#0A84DE]" }, { id: "sms", label: "Text / SMS", icon: <Smartphone size={13} />, cls: "bg-emerald-600 hover:bg-emerald-500" }, { id: "email", label: "Email", icon: <Mail size={13} />, cls: "bg-copper hover:bg-copper-light" }].map((ch, i) => (
                        <motion.button key={ch.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }} onClick={() => handleSendClick(ch.id)} className={`flex w-full items-center justify-center gap-2 rounded-lg ${ch.cls} px-3 py-2 font-display text-[11px] font-bold uppercase tracking-wide text-white transition-all`}>{ch.icon} Send via {ch.label}</motion.button>
                      ))}
                    </div>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-2.5 text-center font-mono text-[7px] uppercase tracking-wider text-text-muted">One tap. Formatted. Sent. No other app does this.</motion.p>
                  </motion.div>
                )}</AnimatePresence>
                {/* Email gate */}
                <AnimatePresence>{showGate && !emailSubmitted && (
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-copper/30 bg-dark p-5" style={{ boxShadow: "0 -20px 60px rgba(0,0,0,0.8)" }}>
                    <div className="text-center">
                      <motion.div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-copper/20" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Send size={16} className="text-copper" /></motion.div>
                      <p className="font-display text-sm font-bold uppercase tracking-wide text-white">Ready to send via {selectedChannel === "imessage" ? "iMessage" : selectedChannel === "sms" ? "SMS" : "Email"}</p>
                      <p className="mt-1 text-[10px] text-text-secondary">Enter your email to unlock one-tap export.</p>
                      <form onSubmit={handleDemoEmailSubmit} className="mt-3">
                        <input type="email" value={demoEmail} onChange={e => setDemoEmail(e.target.value)} placeholder="your@email.com" className="w-full rounded-lg border border-white/10 bg-dark-card px-3 py-2.5 text-[11px] text-white placeholder-neutral-600 outline-none transition focus:border-copper" autoFocus />
                        <button type="submit" className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-copper px-3 py-2.5 font-display text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-copper-light"><Zap size={12} /> Unlock & Send</button>
                      </form>
                      <p className="mt-2 font-mono text-[8px] text-text-muted">Free early access &middot; No credit card</p>
                    </div>
                  </motion.div>
                )}</AnimatePresence>
                {/* Sent confirm */}
                <AnimatePresence>{showSentConfirm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-dark-card/90">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }} className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20"><Check size={32} className="text-emerald-400" /></motion.div>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-display text-lg font-bold uppercase tracking-wide text-emerald-400">Sent!</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-1 text-[11px] text-text-secondary">{PHONE_GROUPS.filter(g => g.items.some(i => checkedItems.has(i.id))).length} trades notified instantly</motion.p>
                  </motion.div>
                )}</AnimatePresence>
                {/* Phone confetti */}
                <AnimatePresence>{showConfetti && (
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-[60] overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => { const a = (i / 30) * Math.PI * 2, d = 40 + (i % 4) * 25; return (<motion.div key={i} className="absolute" style={{ left: "50%", top: "40%", width: i % 3 === 0 ? 8 : 5, height: i % 3 === 0 ? 8 : 5, borderRadius: i % 2 === 0 ? "50%" : "2px", backgroundColor: ["#C45A2C", "#22C55E", "#F59E0B", "#0B93F6", "#EC4899", "#A855F7"][i % 6] }} initial={{ x: 0, y: 0, scale: 0, opacity: 1 }} animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: [0, 1.8, 0.5], opacity: [1, 1, 0], rotate: [0, 200 + i * 40] }} transition={{ duration: 1.2, ease: "easeOut" }} />) })}
                  </motion.div>
                )}</AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 2. CAPABILITIES (light)                    */}
      {/* ═══════════════════════════════════════════ */}
      <section id="features" className="bg-light py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">What {PRODUCT} Can Do</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Built for how you actually work</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-on-light-2 leading-relaxed">Every feature designed by CMs who've walked the lots. Intelligence is woven into every workflow — your items auto-sort, your voice becomes data, your lists send themselves.</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map(f => (
              <Reveal key={f.title}>
                <div className="flex h-full flex-col rounded-xl border border-light-border bg-light-card p-6 shadow-sm transition hover:shadow-md hover:border-copper/30">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-copper/10 text-copper">{f.icon}</div>
                  <h3 className="mb-2 text-base font-bold text-text-on-light">{f.title}</h3>
                  <p className="text-sm text-text-on-light-2 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 3. VIDEO / CINEMATIC (dark)                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-warm" style={{ minHeight: "70vh" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" alt="" className="h-full w-full object-cover" style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }} /></div>
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-transparent" />
        <div className="relative z-10 flex min-h-[70vh] items-center">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <Reveal>
              <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">See It In Action</p>
              <h2 className="max-w-3xl font-display text-5xl font-900 uppercase leading-[0.9] tracking-tight text-white lg:text-7xl">From walkthrough<br />to sent in under<br />3 minutes</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">Walk the house. Check items off. Hit send. Every trade gets a clean, formatted punch list — via iMessage, text, or email.</p>
              <div className="mt-8"><a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-copper px-8 py-4 text-base font-semibold text-white transition hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">Try It Now <ArrowRight size={16} /></a></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 4. INTEGRATIONS (light-warm)               */}
      {/* ═══════════════════════════════════════════ */}
      <section id="integrations" className="bg-light-warm py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Seamless Integrations</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Connects to the tools you already use</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-on-light-2 leading-relaxed">{COMPANY} plugs into your existing workflow. No ripping and replacing — just a better way to get things done.</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map(itg => (
              <Reveal key={itg.name}>
                <div className="relative flex items-center gap-5 rounded-xl border border-light-border bg-light-card p-6 shadow-sm transition hover:shadow-md hover:border-copper/30">
                  {itg.coming && <span className="absolute top-3 right-3 rounded-full bg-copper/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-copper">Coming Soon</span>}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper">{itg.icon}</div>
                  <div>
                    <h3 className="text-base font-bold text-text-on-light">{itg.name}</h3>
                    <p className="mt-0.5 text-sm text-text-on-light-2">{itg.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 5. SUPPORT & TRAINING (light)              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-light py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">We've Got Your Back</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Support from people<br />who've been in the field</h2>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {SUPPORT_ITEMS.map(s => (
              <Reveal key={s.title}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-light-border bg-light-card p-8 text-center shadow-sm transition hover:shadow-md">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10 text-copper">{s.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-text-on-light">{s.title}</h3>
                  <p className="text-sm text-text-on-light-2 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-light-warm py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Pricing</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Simple plans. No surprises.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-on-light-2">7-day free trial on all paid plans · No credit card required</p>
          </Reveal>
          {/* Annual / Monthly toggle */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition ${!annual ? "text-text-on-light" : "text-text-on-light-muted"}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-copper" : "bg-neutral-300"}`} aria-label="Toggle annual pricing">
              <motion.div className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow" animate={{ x: annual ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
            </button>
            <span className={`text-sm font-semibold transition ${annual ? "text-text-on-light" : "text-text-on-light-muted"}`}>Annual</span>
            {annual && <span className="rounded-full bg-copper/10 px-2.5 py-0.5 text-xs font-bold text-copper">Save up to 20%</span>}
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {PRICING.map(plan => {
              const price = annual ? plan.priceAnnual : plan.priceMonthly
              return (
              <Reveal key={plan.name}>
                <div className={`relative flex h-full flex-col rounded-2xl border p-7 transition ${plan.featured ? "border-copper bg-copper/5 shadow-[0_0_40px_rgba(196,90,44,0.1)]" : "border-light-border bg-light-card shadow-sm hover:shadow-md"}`}>
                  {plan.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copper px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">Most Popular</div>}
                  <h3 className="font-display text-2xl font-bold uppercase text-text-on-light">{plan.name}</h3>
                  <p className="mt-1 text-sm text-text-on-light-muted">{plan.desc}</p>
                  <div className="mt-5 mb-5">
                    <motion.span key={price} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-900 text-text-on-light">{price}</motion.span>
                    {plan.period && <span className="text-sm text-text-on-light-muted">{plan.period}</span>}
                  </div>
                  <ul className="mb-7 flex-1 space-y-2.5">
                    {plan.features.map(feat => (<li key={feat} className="flex items-center gap-2.5 text-sm text-text-on-light-2"><Check size={15} className="shrink-0 text-copper" /> {feat}</li>))}
                  </ul>
                  <a href={APP_URL} className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${plan.featured ? "bg-copper text-white hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]" : "border border-light-border text-text-on-light hover:border-copper hover:bg-copper/5"}`}>{plan.cta} <ArrowRight size={14} /></a>
                </div>
              </Reveal>
            )})
            }
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 7. TRUSTED BY + STATS (copper)             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-copper py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(s => (
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

      {/* ═══════════════════════════════════════════ */}
      {/* 8. ABOUT (light)                           */}
      {/* ═══════════════════════════════════════════ */}
      <section id="about" className="bg-light py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=500&fit=crop" alt="Residential interior" className="h-72 w-full rounded-2xl object-cover" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=500&fit=crop" alt="New home exterior" className="mt-8 h-72 w-full rounded-2xl object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Our Story</p>
            <h2 className="mb-6 font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight text-text-on-light lg:text-6xl">Built by folks<br />who live it</h2>
            <p className="mb-6 text-lg text-text-on-light-2 leading-relaxed">Not another desktop dashboard built by people who've never walked a lot. {COMPANY} was designed by construction managers with one hand free and zero cell signal.</p>
            <p className="mb-8 text-text-on-light-2 leading-relaxed">We've been in the field. We know what it's like to juggle a dozen active lots, trades who ghost you, and punch lists that never match reality. We built {COMPANY} to fix that — one platform, no fluff, just works.</p>
            <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-copper px-8 py-4 text-base font-semibold text-white transition hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">Try It Free <ArrowRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 9. FOUNDING USER CTA (light-warm)          */}
      {/* ═══════════════════════════════════════════ */}
      <section id="founding" className="bg-light-warm py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="rounded-2xl border-2 border-copper/20 bg-light-card p-10 shadow-sm lg:p-14">
              <motion.div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Sparkles size={28} className="text-copper" />
              </motion.div>
              <p className="mb-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Limited Founding User Program</p>
              <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Get in before launch</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-on-light-2 leading-relaxed">We're opening early access to a small group of CMs who want to shape the product. Founding users get priority support, direct input on the roadmap, and locked-in pricing for life.</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center gap-3 text-sm text-text-on-light-2"><Check size={16} className="shrink-0 text-copper" /> Lifetime locked pricing</div>
                <div className="flex items-center justify-center gap-3 text-sm text-text-on-light-2"><Check size={16} className="shrink-0 text-copper" /> Direct roadmap input</div>
                <div className="flex items-center justify-center gap-3 text-sm text-text-on-light-2"><Check size={16} className="shrink-0 text-copper" /> Priority support forever</div>
                <div className="flex items-center justify-center gap-3 text-sm text-text-on-light-2"><Check size={16} className="shrink-0 text-copper" /> 7-day free trial — no credit card</div>
              </div>
              {/* Beehiiv-ready email capture — replace form action with Beehiiv subscribe URL when available */}
              <div className="mt-8">
                {emailSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><Check size={24} className="text-emerald-600" /></div>
                    <p className="font-display text-lg font-bold uppercase text-text-on-light">You're on the list!</p>
                    <p className="mt-1 text-sm text-text-on-light-2">We'll reach out soon with your early access invite.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const email = fd.get("email") as string; if (!email) return; setEmailSubmitted(true); setDemoEmail(email); try { await fetch(`${API_URL}/api/waitlist`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "founding_user_cta" }) }); } catch {} }} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                    <input type="email" name="email" required placeholder="your@email.com" className="flex-1 rounded-lg border border-light-border bg-light px-4 py-3.5 text-sm text-text-on-light placeholder-neutral-400 outline-none transition focus:border-copper" />
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-copper px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">
                      Claim Your Spot <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
              <p className="mt-4 font-mono text-xs text-text-on-light-muted">Limited spots · No credit card required</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 10. ROADMAP (light)                        */}
      {/* ═══════════════════════════════════════════ */}
      <section id="roadmap" className="bg-light py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Product Roadmap</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Where we're headed</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-on-light-2 leading-relaxed">Transparency matters. Here's what's live, what's next, and what's on the horizon.</p>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { phase: "Now", label: "Live", color: "bg-emerald-500", items: ["Punch list engine", "Voice capture", "Trade auto-classification", "One-tap export (iMessage, SMS, Email)", "Offline-first sync", "Priority & aging flags", "Safety reporting", "Homeowner updates"] },
              { phase: "Next", label: "Q3 2026", color: "bg-copper", items: ["Multi-user team access", "Admin dashboard & analytics", "Outlook & Gmail integration", "QuickBooks sync", "DocuSign sign-offs", "Calendar integration", "PDF intake improvements"] },
              { phase: "Later", label: "Q4 2026+", color: "bg-text-on-light-muted", items: ["Cloud storage (Google Drive, Dropbox)", "Custom workflow templates", "Builder-to-homeowner portal", "Advanced AI classification", "Community marketplace", "API access"] },
            ].map(col => (
              <Reveal key={col.phase}>
                <div className="flex h-full flex-col rounded-2xl border border-light-border bg-light-card p-7 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${col.color}`} />
                    <span className="font-display text-xl font-bold uppercase text-text-on-light">{col.phase}</span>
                    <span className="rounded-full bg-copper/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-copper">{col.label}</span>
                  </div>
                  <ul className="flex-1 space-y-2.5">
                    {col.items.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-text-on-light-2">
                        <Check size={14} className={`shrink-0 ${col.phase === "Now" ? "text-emerald-500" : "text-text-on-light-muted"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 11. FAQ (light-warm)                       */}
      {/* ═══════════════════════════════════════════ */}
      <section id="faq" className="bg-light-warm py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Support</p>
            <h2 className="font-display text-4xl font-800 uppercase tracking-tight text-text-on-light lg:text-5xl">Got questions?</h2>
          </Reveal>
          <Reveal><div>{FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}</div></Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 11. CTA (copper)                           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-copper py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.2)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-900 uppercase tracking-tight text-white lg:text-6xl">Ready to ditch the clipboard?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 leading-relaxed">Join the CMs building a better way to close out. Your crew deserves better tools.</p>
            <div className="mt-10"><a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-dark px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-900 hover:shadow-xl">Clock In <ArrowRight size={16} /></a></div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 12. CONTACT (light-warm)                   */}
      {/* ═══════════════════════════════════════════ */}
      <section id="contact" className="bg-light-warm py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-copper">Get In Touch</p>
            <h2 className="mb-6 font-display text-5xl font-800 uppercase leading-[0.95] tracking-tight text-text-on-light lg:text-6xl">Let's talk.</h2>
            <p className="mb-10 text-lg text-text-on-light-2 leading-relaxed">Questions? Want a demo? Drop us a line and we'll get back to you within 24 hours.</p>
            <div className="space-y-6">
              {[{ icon: <Phone size={20} />, label: "Phone", value: "(361) 389-6902" }, { icon: <Mail size={20} />, label: "Email", value: "hello@buildcore.dev" }, { icon: <MapPin size={20} />, label: "Location", value: "Austin, TX" }].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper">{c.icon}</div>
                  <div><div className="text-xs font-medium uppercase tracking-wider text-text-on-light-muted">{c.label}</div><div className="text-sm font-semibold text-text-on-light">{c.value}</div></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <form onSubmit={e => e.preventDefault()} className="space-y-5 rounded-2xl border border-light-border bg-light-card p-8 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-on-light-muted">Name</label><input type="text" className="w-full rounded-lg border border-light-border bg-light px-4 py-3 text-sm text-text-on-light placeholder-neutral-400 outline-none transition focus:border-copper" placeholder="Your name" /></div>
                <div><label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-on-light-muted">Email</label><input type="email" className="w-full rounded-lg border border-light-border bg-light px-4 py-3 text-sm text-text-on-light placeholder-neutral-400 outline-none transition focus:border-copper" placeholder="you@company.com" /></div>
              </div>
              <div><label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-on-light-muted">Subject</label><input type="text" className="w-full rounded-lg border border-light-border bg-light px-4 py-3 text-sm text-text-on-light placeholder-neutral-400 outline-none transition focus:border-copper" placeholder="How can we help?" /></div>
              <div><label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-on-light-muted">Message</label><textarea rows={4} className="w-full resize-none rounded-lg border border-light-border bg-light px-4 py-3 text-sm text-text-on-light placeholder-neutral-400 outline-none transition focus:border-copper" placeholder="Tell us about your needs..." /></div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-copper px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-copper-light hover:shadow-[0_0_24px_rgba(196,90,44,0.4)]">Send Message <ArrowRight size={14} /></button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER (dark)                              */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="bg-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-copper font-mono text-base font-black text-white">B</div>
                <span className="text-xl font-bold tracking-tight">{COMPANY}</span>
              </div>
              <p className="max-w-sm text-sm text-text-muted leading-relaxed">The residential construction platform built for the field. Home of {PRODUCT}.</p>
            </div>
            <div>
              <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-text-muted">Platform</h4>
              <ul className="space-y-2.5">
                {[{ l: "Features", h: "#features" }, { l: "Pricing", h: "#pricing" }, { l: "Roadmap", h: "#roadmap" }, { l: "About", h: "#about" }, { l: "FAQ", h: "#faq" }, { l: "Contact", h: "#contact" }].map(n => (
                  <li key={n.l}><a href={n.h} className="text-sm text-text-secondary transition hover:text-white">{n.l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-text-muted">Legal</h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (<li key={l}><a href="#" className="text-sm text-text-secondary transition hover:text-white">{l}</a></li>))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-text-muted">
            <span className="font-mono">&copy; 2026</span> {COMPANY} &middot; Home of {PRODUCT}
          </div>
        </div>
      </footer>

      {/* ── Page confetti ── */}
      <AnimatePresence>
        {pageConfetti && (
          <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => {
              const xStart = (i / 80) * 100 + ((i * 7) % 13) - 6
              const size = i % 4 === 0 ? 12 : i % 3 === 0 ? 8 : 6
              const colors = ["#C45A2C", "#22C55E", "#F59E0B", "#0B93F6", "#EC4899", "#A855F7", "#FFFFFF"]
              return (<motion.div key={i} className="absolute" style={{ left: `${xStart}%`, top: -20, width: size, height: i % 5 === 0 ? size : size * 0.6, borderRadius: i % 3 === 0 ? "50%" : "2px", backgroundColor: colors[i % colors.length] }}
                initial={{ y: -20, opacity: 1, rotate: 0, scale: 0 }}
                animate={{ y: 1200, opacity: [0, 1, 1, 0.8, 0], rotate: 360 + i * 60, scale: [0, 1.2, 1, 0.8], x: [0, Math.sin(i * 0.8) * 80, Math.sin(i * 1.2) * -60, Math.sin(i * 0.5) * 40] }}
                transition={{ duration: 2.8 + (i % 6) * 0.25, delay: (i % 12) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              />)
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
