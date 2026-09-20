"use client"

import { motion } from "framer-motion"
import Lenis from "lenis"
import { useEffect, useRef, useState } from "react"
import { demoOrders, demoTables, demoTotals } from "../lib/demo-data"
import { ArrowRight, BarChart3, Check, ChefHat, ChevronDown, CircleDollarSign, Globe2, Menu, QrCode, ScanLine, Sparkles, Users, X, Zap } from "lucide-react"

const COPYRIGHT_NOTICE = "© 2026 Fetan Order. All rights reserved."

const copy = {
  en: {
    nav: ["Features", "How it works", "Pricing"], badge: "No extra hardware needed",
    titleA: "Digitize your restaurant.", titleB: "Serve faster.", sub: "Fetan Order brings QR ordering, kitchen coordination, and payments into one calm, simple system built for Ethiopian restaurants.", primary: "Start Free Trial", secondary: "See How it Works", pilot: "Now onboarding pilot restaurants",
    featuresTitle: "Everything your team needs, in sync.", featuresSub: "Less running around. More time serving guests.",
    features: [
      ["QR Ordering", "Guests scan, browse your menu, and order from their own table.", QrCode],
      ["Bilingual by Default", "Serve guests in Amharic or English with one tap.", Globe2],
      ["Real-Time Kitchen Sync", "Orders move from table to kitchen without a single shout.", Zap],
      ["Built for Ethiopia", "ETB pricing with Chapa and Telebirr support ready to go.", CircleDollarSign],
      ["Full Reports Suite", "Revenue trends, peak-hour heatmaps, top-selling items with revenue share, and payment method breakdowns — not just basic order counts.", BarChart3],
      ["Built for Every Role", "Dedicated views for Owner, Kitchen, Waiter, and Cashier, so every person sees exactly what they need.", Users],
    ],
    how: "How it works", howSub: "From the first scan to a settled table, every step stays visible.",
    steps: [["Scan the QR Code", "No app download. The menu opens instantly in the browser.", QrCode], ["Browse & Customize", "Explore a bilingual menu, add notes, and adjust quantity in the bottom sheet.", Menu], ["Confirm Your Order", "Review your items and keep a 4-minute cancellation window after placing.", Check], ["Kitchen Prepares It", "Watch the order move from Confirmed to Cooking to Ready.", ChefHat], ["Served & Paid", "Your waiter delivers while the cashier settles by cash, Chapa, or Telebirr.", CircleDollarSign]],
    pricing: "Simple pricing that scales with you.", pricingSub: "No per-order fees. No surprise charges. Just one clear monthly price.", per: "/ month", popular: "Most Popular", tiers: [["Small", "For cafés and small restaurants", "3,000"], ["Medium", "For growing restaurants", "4,000"], ["Large", "For busy, established restaurants", "5,000"], ["Enterprise", "For groups and multi-location teams", "7,000"]], choose: "Choose plan",
    cta: "Ready to digitize your restaurant?", ctaSub: "Join the restaurants building a faster, better guest experience.", ctaButton: "Start your free trial", footer: "A calmer way to run your restaurant.", links: ["Product", "Company", "Legal"], linkItems: [["Features", "Pricing", "Updates"], ["About us", "Contact", "Careers"], ["Privacy", "Terms", "Support"]], toggle: "አማ"
  },
  am: {
    nav: ["ባህሪያት", "እንዴት ይሰራል", "ዋጋ"], badge: "ተጨማሪ መሳሪያ አያስፈልግም",
    titleA: "ምግብ ቤትዎን በዲጂታል ያድርጉ።", titleB: "በፍጥነት ያገልግሉ።", sub: "ፈጣን Order የQR ትዕዛዝን፣ የወጥ ቤት ስራን እና ክፍያን በአንድ ቀላል ስርዓት ያገናኛል።", primary: "ነፃ ሙከራ ይጀምሩ", secondary: "እንዴት እንደሚሰራ ይመልከቱ", pilot: "የሙከራ ምግብ ቤቶችን እየተቀበልን ነው",
    featuresTitle: "ቡድንዎ የሚፈልገው ሁሉ በአንድ ቦታ።", featuresSub: "ያነሰ መሮጥ። ብዙ ጊዜ ለእንግዶች።", features: [["የQR ትዕዛዝ", "እንግዶች ሜኑዎን በስልካቸው ይመለከታሉ።", QrCode], ["አማርኛ እና English", "በአንድ ጠቅታ እንግዶችዎን ያስተናግዱ።", Globe2], ["የወጥ ቤት ግንኙነት", "ትዕዛዞች ያለ ጩኸት ከጠረጴዛ ወደ ወጥ ቤት ይሄዳሉ።", Zap], ["ለኢትዮጵያ የተሰራ", "የETB ዋጋ እና Chapa እና Telebirr ድጋፍ።", CircleDollarSign], ["የሙሉ ሪፖርት ስብስብ", "የገቢ አዝማሚያዎች፣ የተጨናነቁ ሰዓታት፣ ከፍተኛ ሽያጭ ያላቸው ምግቦች እና የክፍያ ዘዴ ማጠቃለያ።", BarChart3], ["ለእያንዳንዱ ሚና የተሰራ", "ለባለቤት፣ ለወጥ ቤት፣ ለአስተናጋጅ እና ለካሺየር የተለያዩ እይታዎች።", Users]], how: "እንዴት ይሰራል", howSub: "ከመመዝገብ እስከ መጀመሪያ ትዕዛዝዎ ሶስት ቀላል ደረጃዎች።", steps: [["ምግብ ቤትዎን ይመዝግቡ", "መለያ ይፍጠሩ እና ስለ ምግብ ቤትዎ ትንሽ ይንገሩን።", Users], ["ሜኑዎን ያዘጋጁ", "ምግቦችዎን፣ ዋጋዎችዎን እና ፎቶዎችን ይጨምሩ።", ChefHat], ["ትዕዛዝ ይቀበሉ", "የQR ኮዶችን በጠረጴዛዎች ላይ ያስቀምጡ።", ScanLine]], pricing: "ከእርስዎ ጋር የሚያድግ ቀላል ዋጋ።", pricingSub: "በትዕዛዝ ላይ ተጨማሪ ክፍያ የለም።", per: "/ ወር", popular: "በጣም ተወዳጅ", tiers: [["Small", "ለትንንሽ ምግብ ቤቶች", "3,000"], ["Medium", "ለሚያድጉ ምግብ ቤቶች", "4,000"], ["Large", "ለትልልቅ ምግብ ቤቶች", "5,000"], ["Enterprise", "ለብዙ ቅርንጫፎች", "7,000"]], choose: "ይምረጡ", cta: "ምግብ ቤትዎን ዲጂታል ለማድረግ ዝግጁ ነዎት?", ctaSub: "የተሻለ የእንግዳ ተሞክሮ ከሚገነቡ ምግብ ቤቶች ጋር ይቀላቀሉ።", ctaButton: "ነፃ ሙከራ ይጀምሩ", footer: "ምግብ ቤትዎን ለማስተዳደር የተሻለ መንገድ።", links: ["ምርት", "ኩባንያ", "ህጋዊ"], linkItems: [["ባህሪያት", "ዋጋ", "ዜና"], ["ስለ እኛ", "ያግኙን", "ስራዎች"], ["ግላዊነት", "ውሎች", "ድጋፍ"]], toggle: "EN"
  }
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  return null
}

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const revealTransition = { duration: 0.5, ease: "easeOut" as const }

function Brand() { return <a href="#top" className="brand" aria-label="Fetan Order home"><span className="brand-mark"><span /><QrCode size={14} /></span><span><strong><em>Fetan</em> Order</strong><small>ፈጣን Order</small></span></a> }
function Device() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const statusLabel: Record<string, string> = { empty: "Empty", ordering: "Ordering", pending: "Pending", cooking: "Cooking", ready: "Ready", delivering: "Delivering", bill: "Bill requested", finishing: "Finishing", paying: "Paying" }
  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = sectionRef.current?.getBoundingClientRect()
    if (!bounds) return
    setTilt({ x: 3.5 + ((event.clientY - bounds.top) / bounds.height - 0.5) * -5, y: 2.5 + ((event.clientX - bounds.left) / bounds.width - 0.5) * 6 })
  }
  return <div ref={sectionRef} className="device-wrap" onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 3.5, y: 2.5 })}>
    <div className="device-orb orb-green" /><div className="device-orb orb-gold" />
    <div className="device" style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(2.5deg)` }}>
      <div className="device-notch" aria-hidden="true"><span /></div>
      <div className="device-screen">
      <div className="device-top"><span>9:41</span><span>•••</span></div>
      <div className="app-head"><span className="mini-mark">ፈ</span><div><b>Good evening</b><small>Welcome back, Selam</small></div><span className="avatar">S</span></div>
      <div className="device-tabs"><b>Today&apos;s orders</b><span>{demoTotals.orders} orders</span></div>
      {demoOrders.slice(0, 2).map((order) => <div className="order-card" key={order.id}><div><span className="order-icon"><ChefHat size={16}/></span><b>{order.table}</b><small>{order.items}</small></div><strong>{order.total}</strong><button className={order.tone === "green" ? "ready" : ""}>{order.status}</button></div>)}
      <div className="device-floor"><b>{demoTables.filter((table) => table.status !== "empty").length} active tables</b><span>Revenue ETB {demoTotals.revenue}</span></div><div className="device-foot"><span>Orders</span><span>Tables</span><span>More</span></div>
      </div>
    </div>
    <div className="notification"><span className="notification-icon"><Sparkles size={14}/></span><span><b>Live owner view</b><small>18 tables · {demoTotals.orders} orders</small></span><ArrowRight size={15}/></div>
  </div>
}

export default function Home() { const [lang, setLang] = useState<"en"|"am">("en"); const [open, setOpen] = useState(false); const [annual, setAnnual] = useState(true); const [faqOpen, setFaqOpen] = useState<number | null>(0); const t=copy[lang]; const featureRows = ["QR ordering and digital menus", "Kitchen display and live order sync", "WhatsApp support", "Advanced analytics", "Multi-location controls"]; const includedByTier = [[true, true, false, false, false], [true, true, true, false, false], [true, true, true, true, false], [true, true, true, true, true]]; const faq = [["Can I switch plans later?", "Yes. You can move between plans at any time, and your next invoice will reflect the new tier."], ["What happens after my free trial ends?", "We will contact you before the trial ends. You choose a plan before any subscription begins."], ["Do you charge in ETB or USD?", "Plans are billed in ETB, with transparent monthly pricing for Ethiopian restaurants."], ["Is there a setup fee?", "No. There is no setup fee and no per-order commission on any plan."]]; return <><SmoothScroll /><main id="top" className={lang === "am" ? "am" : ""}>
  <header><div className="container nav"><Brand/><nav className={open ? "open" : ""}>{t.nav.map((item,i)=><a key={item} href={["#features","#how","#pricing"][i]} onClick={()=>setOpen(false)}>{item}</a>)}<a href="/register" className="nav-cta">{t.primary} <ArrowRight size={15}/></a></nav><div className="actions"><button className="lang" onClick={()=>setLang(lang === "en" ? "am" : "en")} aria-label="Change language">{t.toggle}</button><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></div></header>
  <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> {t.badge}</div><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p>{t.sub}</p><div className="feature-pills" aria-label="Fetan Order highlights"><span><Check size={12}/> QR Ordering</span><span><Check size={12}/> Bilingual EN/AM</span><span><Check size={12}/> Real-Time Sync</span><span><Check size={12}/> ETB Pricing</span></div><div className="hero-actions"><a className="button primary" href="/demo">Try Demo <ArrowRight size={17}/></a><a className="button ghost" href="#how"><span className="play">▶</span>{t.secondary}</a></div><span className="pilot"><Check size={14}/> {t.pilot}</span></div><Device/></section>
  <motion.section id="features" className="section container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={revealTransition}><div className="section-heading"><span className="kicker">01 / FEATURES</span><h2>{t.featuresTitle}</h2><p>{t.featuresSub}</p></div><motion.div className="feature-grid" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>{t.features.map(([title,desc,Icon])=><motion.article variants={reveal} transition={revealTransition} className="feature-card" key={title as string}><div className="icon-box"><Icon size={20}/></div><h3>{title as string}</h3><p>{desc as string}</p><ArrowRight className="feature-arrow" size={17}/></motion.article>)}</motion.div><div className="why-fetan-panel"><div className="why-fetan-heading"><span className="kicker">WHY FETAN ORDER</span><h3>The operating system your restaurant can grow into.</h3></div><ul>{["Live ordering and payments today, not a \"coming soon\" feature", "Separate, purpose-built views per role instead of one shared screen for everyone", "Full analytics — peak hours, top items, and payment mix — included from the start", "Native ETB pricing and Ethiopian payment rails with Chapa and Telebirr built in"].map((item) => <li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></div></motion.section>
  <motion.section id="how" className="section how-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={revealTransition}><div className="container"><div className="section-heading"><span className="kicker">02 / PROCESS</span><h2>{t.how}</h2><p>{t.howSub}</p></div><div className="steps">{t.steps.map(([title,desc,Icon],i)=><motion.article className={`step ${i % 2 ? "step-reverse" : ""}`} variants={reveal} transition={{ ...revealTransition, delay: i * .04 }} key={title as string}><div className="step-number">0{i+1}</div><div className="step-icon"><Icon size={24}/></div><div className="step-copy"><h3>{title as string}</h3><p>{desc as string}</p>{i === 2 && <span className="step-visual cancellation-badge">4 min cancellation window</span>}{i === 3 && <span className="step-visual status-sequence"><b>Confirmed</b><i>→</i><b>Cooking</b><i>→</i><b>Ready</b></span>}{i === 4 && <span className="step-visual payment-badges"><b>Cash</b><b>Chapa</b><b>Telebirr</b></span>}{i === 0 && <span className="step-visual qr-preview"><QrCode size={15}/> Opens in browser</span>}</div></motion.article>)}</div></div></motion.section>
  <motion.section className="section container built-for" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={revealTransition}><div className="section-heading"><span className="kicker">BUILT FOR</span><h2>Fits the way you work.</h2><p>Purposeful tools for the pace and personality of your restaurant.</p></div><div className="built-for-grid">{[["Fine Dining","Give every table a polished, attentive ordering experience."],["Cafes","Keep queues moving with a simple menu guests already understand."],["Food Trucks","Take orders quickly, even when your team is small and the line is long."],["Multi-Location Chains","See every location clearly while each team stays in control."]].map(([title,desc])=><article className="built-for-card" key={title}><h3>{title}</h3><p>{desc}</p><a href="#contact">Learn More <ArrowRight size={14}/></a></article>)}</div></motion.section><section id="pricing" className="section container pricing"><div className="section-heading pricing-heading"><span className="kicker">03 / PRICING</span><h2>{t.pricing}</h2><p>{t.pricingSub}</p></div><div className="billing-toggle" role="group" aria-label="Billing period"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual <span>Save 15%</span></button></div><motion.div className="pricing-grid" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>{t.tiers.map(([name,desc,price],i)=>{ const monthly = Number(String(price).replace(",", "")); const shown = annual ? Math.round(monthly * .85).toLocaleString() : String(price); return <motion.article variants={reveal} transition={revealTransition} className={`price-card ${i===1?"popular":""}`} key={name as string}>{i===1&&<span className="popular-label">{t.popular}</span>}<h3>{name as string}</h3><p>{desc as string}</p><div className="price"><span>ETB</span>{shown}<small>{t.per} {annual ? "· billed annually" : ""}</small></div><ul className="feature-list">{featureRows.map((feature,j)=><li key={feature} className={includedByTier[i][j] ? "included" : "excluded"}>{includedByTier[i][j] ? <Check size={14}/> : <span className="feature-dash">—</span>}<span>{feature}{(feature === "WhatsApp support" || feature === "Advanced analytics") && <span className="info-tip" tabIndex={0} title={feature === "WhatsApp support" ? "Get help from our support team through WhatsApp." : "See sales, prep, and menu performance in one place."}>i</span>}</span></li>)}</ul><a href="/register" className="plan-button">{t.choose}<ArrowRight size={15}/></a></motion.article>})}</motion.div><div className="faq"><h3>Questions, answered.</h3>{faq.map(([question,answer],i)=><div className="faq-item" key={question}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{question}</span><ChevronDown size={17} className={faqOpen === i ? "rotated" : ""}/></button>{faqOpen === i && <p>{answer}</p>}</div>)}</div></section>
  <section id="contact" className="cta container"><div><span className="kicker">LET&apos;S GET STARTED</span><h2>{t.cta}</h2><p>{t.ctaSub}</p></div><a href="/register" className="button gold">{t.ctaButton}<ArrowRight size={17}/></a></section>
  <footer><div className="container footer-grid"><div><Brand/><p>{t.footer}</p></div>{t.links.map((link,i)=><div className="footer-links" key={link}><b>{link}</b>{t.linkItems[i].map(x=><a href={x === "Privacy" || x === "ግላዊነት" ? "/privacy" : x === "Terms" || x === "ውሎች" ? "/terms" : `/placeholder/${x.toLowerCase().replace(/\s+/g, "-")}`} key={x}>{x}</a>)}</div>)}</div><div className="container copyright"><span>{COPYRIGHT_NOTICE}</span><span>Made for restaurants in Ethiopia</span><span className="design-credit"><img src="/ibdaa-logo-transparent.png" alt="IBDAA" /> <span>Design by IBDAA · All rights reserved</span></span></div></footer>
 </main></> }

function langClass() { return "" }

const _unused = langClass

/* styles are in globals.css */

// @ts-expect-error lucide tuple inference is intentionally compact for translated content
void _unused

// Keep this file focused on structure and interaction.

