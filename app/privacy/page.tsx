import Link from "next/link"

const sections = [
  ["collect", "What we collect", "We collect restaurant and owner details at registration, including name, phone, email, and address. Customer QR ordering does not require an account or personal login. We also receive order details such as items, tables, and timestamps, plus the selected payment method. We do not store card numbers or Chapa or Telebirr credentials."],
  ["why", "Why we collect it", "We use this information to operate the ordering system, verify restaurant registrations, and send order notifications to the right team."],
  ["sharing", "Who we share it with", "We share relevant payment details with payment processors such as Chapa and Telebirr only when needed to complete a transaction. We do not sell data to third parties."],
  ["storage", "Data storage", "Data is hosted on Supabase infrastructure and retained for as long as the restaurant account is active, subject to applicable legal requirements."],
  ["rights", "Your rights", "Under Ethiopia's Personal Data Protection Proclamation (No. 1321/2024), you can request access to, correction of, or deletion of your personal data by contacting [support email]."],
  ["contact", "Contact", "Questions about privacy? Contact [support email/phone placeholder]."]
]

export default function PrivacyPage() {
  return <main className="legal-shell"><header className="legal-header"><Link className="legal-brand" href="/"><span>ፈ</span><b><em>Fetan</em> Order</b></Link><Link className="legal-back" href="/register">Back to registration</Link></header><div className="legal-layout"><aside className="legal-toc"><span>On this page</span>{sections.map(([id,title]) => <a href={`#${id}`} key={id}>{title}</a>)}</aside><article className="legal-content"><div className="legal-kicker">Legal</div><h1>Privacy Policy</h1><p className="legal-lede">How Fetan Order handles information across restaurant registration, QR ordering, and payments.</p><p className="legal-draft">DRAFT — requires legal review before launch.</p>{sections.map(([id,title,body]) => <section id={id} key={id}><h2>{title}</h2><p>{body}</p></section>)}</article></div><footer className="legal-footer"><span>© 2026 Fetan Order</span><span><Link href="/terms">Terms of Service</Link><Link href="/">Home</Link></span></footer></main>
}

// DRAFT PRIVACY POLICY — requires legal review before launch.
void 0
