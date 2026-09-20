"use client"

import { useState } from "react"
import { Check, ChevronDown, CreditCard, Download, Receipt, Search } from "lucide-react"

const paymentMethods = [
  { id: "cash", label: "Cash", detail: "Pay at counter", icon: "cash" },
  { id: "chapa", label: "Chapa", detail: "Digital wallet", icon: "chapa" },
  { id: "telebirr", label: "Telebirr", detail: "Mobile money", icon: "telebirr" },
  { id: "card", label: "Card", detail: "Visa or Mastercard", icon: "card" },
]

const bill = {
  table: "Table 07",
  order: "#1048",
  guest: "2 guests",
  time: "Today, 7:42 PM",
  items: [
    { name: "Doro Wot", note: "Extra injera", quantity: 1, unit: 420 },
    { name: "Ethiopian Coffee", note: "", quantity: 1, unit: 220 },
  ],
  service: 64,
}

const money = (value: number) => `ETB ${value.toLocaleString()}`

export default function CashierScreen() {
  const [selectedPayment, setSelectedPayment] = useState("cash")
  const [paid, setPaid] = useState(false)
  const subtotal = bill.items.reduce((sum, item) => sum + item.quantity * item.unit, 0)
  const total = subtotal + bill.service

  return (
    <main className="cashier-shell">
      <header className="cashier-header">
        <div className="cashier-brand"><span className="cashier-mark"><Receipt size={18} /></span><span><strong><em>Fetan</em> Cashier</strong><small>Front of house</small></span></div>
        <div className="cashier-header-actions"><div className="cashier-status"><span /> Register online</div><button className="cashier-icon-button" aria-label="Search"><Search size={18} /></button><div className="cashier-user"><span className="cashier-avatar">S</span><span><b>Selam</b><small>Cashier</small></span><ChevronDown size={15} /></div></div>
      </header>

      <div className="cashier-layout">
        <section className="cashier-main">
          <div className="cashier-page-heading"><div><span className="cashier-kicker">LIVE SERVICE · DINNER</span><h1>Cashier</h1><p>Review the table bill and collect payment when the guest is ready.</p></div><button className="outline-action"><Download size={15} /> Export report</button></div>
          <div className="table-strip"><div><span className="table-strip-label">OPEN BILL</span><h2>{bill.table}</h2><span>{bill.order} · {bill.guest} · {bill.time}</span></div><span className="open-pill">Awaiting payment</span></div>

          <div className="bill-card">
            <div className="bill-card-heading"><div><h2>Order details</h2><p>Auto-generated from confirmed orders</p></div><button className="dots" aria-label="More options">•••</button></div>
            <div className="bill-table"><div className="bill-table-head"><span>ITEM</span><span>QTY</span><span>UNIT PRICE</span><span>LINE TOTAL</span></div>{bill.items.map((item) => <div className="bill-row" key={item.name}><span><b>{item.name}</b>{item.note && <small>{item.note}</small>}</span><span>{item.quantity}</span><span>{money(item.unit)}</span><strong>{money(item.quantity * item.unit)}</strong></div>)}</div>
            <div className="bill-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Service charge <small>10%</small></span><b>{money(bill.service)}</b></div><div className="grand-total"><span>Grand total</span><strong>{money(total)}</strong></div></div>
          </div>
        </section>

        <aside className="payment-panel"><div className="payment-panel-top"><span className="cashier-kicker">COLLECT PAYMENT</span><h2>How would they like to pay?</h2><p>Choose one method to complete {bill.table}&apos;s bill.</p></div><div className="payment-methods">{paymentMethods.map((method) => <button key={method.id} className={`payment-method ${selectedPayment === method.id ? "selected" : ""}`} onClick={() => { setSelectedPayment(method.id); setPaid(false) }}><span className={`payment-logo payment-${method.icon}`}>{method.icon === "card" ? <CreditCard size={20} /> : method.icon === "chapa" ? <span className="brand-word chapa-word">Chapa</span> : method.icon === "telebirr" ? <span className="brand-word telebirr-word">telebirr</span> : <span className="cash-symbol">ETB</span>}</span><span><b>{method.label}</b><small>{method.detail}</small></span>{selectedPayment === method.id && <span className="selected-check"><Check size={13} /></span>}</button>)}</div><div className="payment-total"><span>Amount due</span><strong>{money(total)}</strong></div><button className={`complete-payment ${paid ? "completed" : ""}`} onClick={() => setPaid(true)}>{paid ? <><Check size={17} /> Payment recorded</> : <>Complete payment <span>→</span></>}</button><p className="secure-note"><span /> Payment details stay private and secure</p></aside>
      </div>

      <footer className="cashier-footer"><span><span className="footer-dot" /> All systems operational</span><span>Fetan Order · Cashier v1.0</span></footer>
    </main>
  )
}

