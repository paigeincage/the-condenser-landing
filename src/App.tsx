import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { BackgroundPaths } from "@/components/ui/background-paths"
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  HardHat,
  Flame,
  Mic,
  FolderOpen,
  Smartphone,
  Share2,
  Footprints,
  BookUser,
  ClipboardList,
  Star,
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
const SERVICES = [
  { icon: <ClipboardList size={28} />, title: "Punch List Management", desc: "Intake from PDFs, photos, voice, or manual entry. Every item tracked from creation to completion." },
  { icon: <HardHat size={28} />, title: "Trade Auto-Classification", desc: "Field language aliases and keyword mapping auto-route every item to the right trade category." },
  { icon: <Flame size={28} />, title: "Priority & Aging", desc: "Mark items HOT for immediate attention. 72-hour aging flags ensure nothing hides in the backlog." },
  { icon: <Mic size={28} />, title: "Voice Capture", desc: "Speak your punch items while walking the house. Voice is transcribed, split, and classified." },
  { icon: <Mail size={28} />, title: "Smart Communication", desc: "Send items grouped by trade partner via email or text with customizable templates." },
  { icon: <Smartphone size={28} />, title: "Mobile-First PWA", desc: "Designed for one-handed iPhone use in the field. Works offline. Installs like a native app." },
]

const WORKFLOW = [
  { num: "01", title: "Intake", desc: "Upload documents, snap photos, capture voice, or type manually." },
  { num: "02", title: "Condense", desc: "AI extracts items, classifies trades, and auto-assigns partners." },
  { num: "03", title: "Organize", desc: "Master list grouped by trade with filters, priority, and aging." },
  { num: "04", title: "Communicate", desc: "Send by trade partner via email, text, or clipboard." },
  { num: "05", title: "Follow-Up", desc: "Re-walk the house, update statuses, add new items." },
]

const STATS = [
  { value: "16", label: "Trade Categories" },
  { value: "12", label: "Purpose-Built Screens" },
  { value: "5", label: "Phase Workflow" },
  { value: "100%", label: "Offline Capable" },
]

const TESTIMONIALS = [
  { name: "Paige B.", role: "Construction Manager, Pulte Homes", text: "Finally a tool that understands how I actually work in the field. No more juggling spreadsheets and sticky notes.", stars: 5 },
  { name: "Marcus T.", role: "Senior CM, DR Horton", text: "The trade auto-classification alone saves me an hour a day. Items just route themselves to the right people.", stars: 5 },
  { name: "Sarah K.", role: "Project Manager, Lennar", text: "Offline-first was the dealbreaker for me. Bad signal on the jobsite? Doesn't matter. Everything just works.", stars: 5 },
]

const FEATURES_GRID = [
  { icon: <FolderOpen size={20} />, title: "File Management", desc: "Five folder categories per project." },
  { icon: <BookUser size={20} />, title: "Trade Directory", desc: "Searchable contacts with CSV import." },
  { icon: <Footprints size={20} />, title: "Follow-Up Walks", desc: "Re-walk mode with date metadata." },
  { icon: <Share2 size={20} />, title: "Share & Export", desc: "Copy, email, text, print, or share." },
]

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
    <div className="dark min-h-screen bg-neutral-950 text-white">

      {/* ===== NAV ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mar font-mono text-base font-black text-white">C</div>
            <span className="text-xl font-bold tracking-tight">The Condenser</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            <a href="#services" className="text-sm font-medium text-neutral-400 transition hover:text-white">Services</a>
            <a href="#process" className="text-sm font-medium text-neutral-400 transition hover:text-white">Process</a>
            <a href="#about" className="text-sm font-medium text-neutral-400 transition hover:text-white">About</a>
            <a href="#testimonials" className="text-sm font-medium text-neutral-400 transition hover:text-white">Reviews</a>
            <a href="#contact" className="text-sm font-medium text-neutral-400 transition hover:text-white">Contact</a>
            <a href={APP_URL} className="inline-flex items-center gap-2 rounded-lg bg-mar px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-mar-light hover:shadow-[0_0_24px_rgba(122,31,46,0.4)]">
              Launch App <ArrowRight size={14} />
            </a>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-400 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 bg-neutral-950 px-6 pb-6 lg:hidden">
            {[{ label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "About", href: "#about" }, { label: "Reviews", href: "#testimonials" }, { label: "Contact", href: "#contact" }].map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block border-b border-white/5 py-3 text-base font-medium text-neutral-300">{l.label}</a>
            ))}
            <a href={APP_URL} className="mt-4 block text-base font-semibold text-mar-light">Launch App →</a>
          </motion.div>
        )}
      </nav>

      {/* ===== HERO — BackgroundPaths ===== */}
      <BackgroundPaths
        title="The Condenser"
        subtitle="The single source of truth for residential construction punch lists. Intake, condense, organize, communicate, follow up — all from the field."
        ctaText="Launch The Condenser"
        ctaHref={APP_URL}
      />

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-white/5 bg-neutral-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label}>
              <div className={`flex flex-col items-center py-10 ${i < 3 ? "border-r border-white/5" : ""}`}>
                <div className="font-mono text-4xl font-bold text-white">{s.value}</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-wider text-neutral-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="bg-neutral-950 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 max-w-2xl">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mar-light">What We Offer</p>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">Built for how CMs actually work.</h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">Purpose-built tools for residential construction managers who manage 5-20 active lots and need speed over complexity.</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Reveal key={s.title}>
                <div className="group flex flex-col bg-neutral-950 p-8 transition-colors hover:bg-neutral-900/50 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-mar-light transition group-hover:bg-mar/10">
                    {s.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="border-y border-white/5 bg-neutral-900/30 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mar-light">Our Process</p>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">Five phases. Zero guesswork.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400 leading-relaxed">Every punch list follows the same disciplined path — from raw intake to confirmed resolution.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-5">
            {WORKFLOW.map((step) => (
              <Reveal key={step.num}>
                <div className="group relative rounded-2xl border border-white/5 bg-neutral-950 p-6 transition hover:border-mar/30 hover:bg-neutral-900/50">
                  <div className="mb-4 font-mono text-3xl font-bold text-white/10 transition group-hover:text-mar/30">{step.num}</div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / WHY ===== */}
      <section id="about" className="bg-neutral-950 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mar-light">Why The Condenser</p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">Built where houses get built.</h2>
            <p className="mb-8 text-lg text-neutral-400 leading-relaxed">
              Not another desktop dashboard. The Condenser was designed for the construction manager walking lots in the Texas sun with one hand free and spotty cell signal.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES_GRID.map(f => (
                <div key={f.title} className="rounded-xl border border-white/5 bg-neutral-900/40 p-4 transition hover:border-mar/20">
                  <div className="mb-3 text-mar-light">{f.icon}</div>
                  <h4 className="mb-1 text-sm font-semibold">{f.title}</h4>
                  <p className="text-xs text-neutral-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            {/* Phone mockup */}
            <div className="mx-auto w-[300px] rounded-[36px] border-2 border-white/10 bg-neutral-950 p-3 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(122,31,46,0.2)]">
              <div className="mx-auto h-6 w-24 rounded-b-2xl bg-neutral-950" />
              <div className="min-h-[460px] overflow-hidden rounded-[24px] bg-neutral-900 p-5">
                <div className="mb-5 text-center">
                  <div className="text-base font-bold tracking-tight">529 Madelines Garden</div>
                  <div className="mt-1 font-mono text-[10px] text-neutral-500">Patterson Ranch &middot; 24 items</div>
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
                    <div className="mt-4 mb-2 border-b-2 border-white/10 pb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-500">
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
          </Reveal>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="border-y border-white/5 bg-neutral-900/30 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mar-light">Testimonials</p>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">Trusted by CMs in the field.</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <Reveal key={t.name}>
                <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-neutral-950 p-8">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star key={idx} size={16} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-300">"{t.text}"</p>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-neutral-500">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-mar py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Ready to condense your workflow?</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-white/70 leading-relaxed">
              Stop juggling spreadsheets, sticky notes, and group texts. The Condenser puts everything in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={APP_URL} className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-neutral-950 transition hover:bg-neutral-100 hover:shadow-xl">
                Launch The Condenser <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:border-white/60 hover:bg-white/5">
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="bg-neutral-950 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-mar-light">Contact Us</p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">Let's talk.</h2>
            <p className="mb-10 text-lg text-neutral-400 leading-relaxed">
              Have questions about The Condenser? Want a demo? Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-mar-light"><Phone size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">Phone</div>
                  <div className="text-sm font-semibold">(512) 555-0199</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-mar-light"><Mail size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">Email</div>
                  <div className="text-sm font-semibold">hello@thecondenser.app</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-mar-light"><MapPin size={20} /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">Location</div>
                  <div className="text-sm font-semibold">Georgetown, TX</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <form onSubmit={e => e.preventDefault()} className="space-y-5 rounded-2xl border border-white/5 bg-neutral-900/40 p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500">Name</label>
                  <input type="text" className="w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-mar" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500">Email</label>
                  <input type="email" className="w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-mar" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500">Subject</label>
                <input type="text" className="w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-mar" placeholder="How can we help?" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500">Message</label>
                <textarea rows={4} className="w-full resize-none rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition focus:border-mar" placeholder="Tell us about your needs..." />
              </div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-mar px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-mar-light hover:shadow-[0_0_24px_rgba(122,31,46,0.4)]">
                Send Message <ArrowRight size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mar font-mono text-base font-black text-white">C</div>
                <span className="text-xl font-bold tracking-tight">The Condenser</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-500 leading-relaxed">
                The single source of truth for residential construction punch lists. Built by a CM, for CMs.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Navigation</h4>
              <ul className="space-y-2.5">
                {["Services", "Process", "About", "Reviews", "Contact"].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="text-sm text-neutral-400 transition hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Legal</h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <li key={l}><a href="#" className="text-sm text-neutral-400 transition hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-neutral-600">
            <span className="font-mono">&copy; 2026</span> The Condenser System — Built for Paige Beltran &amp; every CM who walks houses.
          </div>
        </div>
      </footer>
    </div>
  )
}
