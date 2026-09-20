import Link from "next/link"

const sections = [
  ["trial", "Free trial", "Fetan Order includes a 14-day free trial. No card is required to start. Before the trial ends, you can choose a plan or let the trial end without a subscription."],
  ["billing", "Subscription billing", "Subscriptions are billed in ETB according to the plan selected on the pricing page. Prices and billing frequency are shown before you confirm a subscription. We do not charge per order."],
  ["cancel", "Cancellation", "You may cancel your subscription at any time. Cancellation stops the next renewal; access remains available through the current paid period unless otherwise required by law."],
  ["acceptable-use", "Acceptable use", "You may not use Fetan Order for fraudulent orders, unlawful activity, abusive conduct, or menu content that violates another person's rights. You are responsible for keeping your restaurant content and staff access accurate and secure."],
  ["liability", "Limitation of liability", "To the maximum extent permitted by law, Fetan Order is not liable for indirect, incidental, special, or consequential losses arising from use of the service. Our total liability for a claim will not exceed fees paid for the service in the three months before the event giving rise to the claim."],
  ["contact", "Contact", "Questions about these terms? Contact [support email/phone placeholder]."]
]

export default function TermsPage() {
  return <main className="legal-shell"><header className="legal-header"><Link className="legal-brand" href="/"><span>ፈ</span><b><em>Fetan</em> Order</b></Link><Link className="legal-back" href="/register">Back to registration</Link></header><div className="legal-layout"><aside className="legal-toc"><span>On this page</span>{sections.map(([id,title]) => <a href={`#${id}`} key={id}>{title}</a>)}</aside><article className="legal-content"><div className="legal-kicker">Legal</div><h1>Terms of Service</h1><p className="legal-lede">The straightforward terms for using Fetan Order to run your restaurant.</p><p className="legal-draft">DRAFT — requires legal review before launch.</p>{sections.map(([id,title,body]) => <section id={id} key={id}><h2>{title}</h2><p>{body}</p></section>)}</article></div><footer className="legal-footer"><span>© 2026 Fetan Order</span><span><Link href="/privacy">Privacy Policy</Link><Link href="/">Home</Link></span></footer></main>
}

// DRAFT TERMS OF SERVICE — requires legal review before launch.
void 0
