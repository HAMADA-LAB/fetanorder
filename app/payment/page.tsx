"use client"

import { useState } from "react"
import { Check, LoaderCircle, Smartphone } from "lucide-react"

// DEMO ONLY — replace with real payment integration before launch.
export default function PaymentPage() {
  const [method, setMethod] = useState<"chapa" | "telebirr">("chapa")
  const [phone, setPhone] = useState("")
  const [state, setState] = useState<"form" | "loading" | "success">("form")

  function pay() {
    if (!phone.trim()) return
    setState("loading")
    window.setTimeout(() => setState("success"), 1400)
  }

  if (state === "loading") return <main className="demo-payment-shell"><section className={`demo-payment-card ${method}`}><div className="demo-loader"><LoaderCircle size={28} /><p>Connecting to {method === "chapa" ? "Chapa" : "Telebirr"}…</p><small>Demo payment in progress</small></div></section></main>
  if (state === "success") return <main className="demo-payment-shell"><section className={`demo-payment-card ${method} payment-success`}><div className="success-check"><Check size={28} /></div><span className="demo-kicker">PAYMENT COMPLETE</span><h1>Payment received</h1><p>Your demo payment of <strong>ETB 1,280.00</strong> was successful.</p><small>No money was moved. This is a prototype checkout.</small><button onClick={() => { setState("form"); setPhone("") }}>Make another demo payment</button></section></main>

  return <main className="demo-payment-shell"><section className={`demo-payment-card ${method}`}><header className="demo-payment-header"><div className="payment-brand"><span className="payment-logo">{method === "chapa" ? "C" : "T"}</span><div><strong>{method === "chapa" ? "Chapa" : "telebirr"}</strong><small>Secure checkout</small></div></div><span className="demo-badge">DEMO</span></header><div className="payment-amount"><small>AMOUNT TO PAY</small><strong>ETB 1,280.00</strong><span>Table 07 · Lalibela Kitchen</span></div><div className="payment-methods"><button className={method === "chapa" ? "selected" : ""} onClick={() => setMethod("chapa")}><span className="method-mark chapa-mark">C</span><span><b>Pay with Chapa</b><small>Cards, banks & mobile money</small></span></button><button className={method === "telebirr" ? "selected" : ""} onClick={() => setMethod("telebirr")}><span className="method-mark telebirr-mark">T</span><span><b>Pay with telebirr</b><small>Mobile wallet</small></span></button></div><label htmlFor="phone">Phone number</label><div className="phone-field"><Smartphone size={18} /><input id="phone" inputMode="tel" placeholder="09 00 00 00 00" value={phone} onChange={(event) => setPhone(event.target.value)} /></div><button className="demo-pay-button" onClick={pay}>Pay with {method === "chapa" ? "Chapa" : "telebirr"}</button><p className="demo-note">This is a simulated checkout for demonstration only.</p></section></main>
}
