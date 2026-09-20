"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell, Check, ChevronLeft, CircleAlert, Clock3, GlassWater, Plus, ReceiptText, Send, UtensilsCrossed, X } from "lucide-react"

type OrderItem = { name: string; quantity: number }
type Table = { id: number; guests: number; status: "ready" | "dining" | "attention"; elapsed: string; items: OrderItem[]; total: number }

const initialTables: Table[] = [
  { id: 7, guests: 3, status: "ready", elapsed: "18 min", items: [{ name: "Doro Wat", quantity: 2 }, { name: "Tibs", quantity: 1 }, { name: "Coffee", quantity: 3 }], total: 1840 },
  { id: 3, guests: 2, status: "ready", elapsed: "9 min", items: [{ name: "Kitfo", quantity: 1 }, { name: "Coffee", quantity: 2 }], total: 1280 },
  { id: 11, guests: 4, status: "attention", elapsed: "24 min", items: [{ name: "Bayaynetu", quantity: 2 }, { name: "Juice", quantity: 2 }, { name: "Sambusa", quantity: 1 }], total: 1640 },
  { id: 2, guests: 2, status: "dining", elapsed: "31 min", items: [{ name: "Tibs", quantity: 1 }, { name: "Injera", quantity: 2 }], total: 1050 },
  { id: 14, guests: 5, status: "dining", elapsed: "42 min", items: [{ name: "Vegetarian Combo", quantity: 3 }, { name: "Tea", quantity: 2 }], total: 2180 },
]

export default function WaiterPage() {
  const [tables, setTables] = useState(initialTables)
  const [notifications, setNotifications] = useState([
    { id: 1, kind: "ready", title: "Table 07 — order ready for pickup", detail: "Doro wot and sambusa" },
    { id: 2, kind: "attention", title: "Table 11 needs assistance", detail: "Customer requested a waiter" },
  ])
  const [showHistory, setShowHistory] = useState(false)
  const [addItem, setAddItem] = useState<number | null>(null)
  const [billSent, setBillSent] = useState<number[]>([])
  const [toast, setToast] = useState<{ kind: string; title: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const sortedTables = useMemo(() => [...tables].sort((a, b) => Number(b.status === "ready") - Number(a.status === "ready")), [tables])
  const markDelivered = (id: number) => {
    setTables((current) => current.map((table) => table.id === id ? { ...table, status: "dining" } : table))
    setToast({ kind: "ready", title: `Table ${String(id).padStart(2, "0")} marked delivered` })
  }
  const requestBill = (id: number) => {
    setBillSent((current) => [...new Set([...current, id])])
    setToast({ kind: "attention", title: `Bill requested for Table ${String(id).padStart(2, "0")}` })
  }
  const addManualItem = (item: string) => {
    if (addItem === null) return
    setTables((current) => current.map((table) => table.id === addItem ? { ...table, items: [...table.items, { name: item, quantity: 1 }], total: table.total + (item === "Water refill" ? 30 : 120) } : table))
    setToast({ kind: "ready", title: `Manual addition added to Table ${String(addItem).padStart(2, "0")}` })
    setNotifications((current) => [{ id: Date.now(), kind: "ready", title: `Manual addition — Table ${String(addItem).padStart(2, "0")}`, detail: item }, ...current])
    setAddItem(null)
  }

  return <main className="waiter-shell">
    <header className="waiter-header"><a href="/demo" className="waiter-back"><ChevronLeft size={15} /> Back to role selection</a><div className="waiter-brand"><span>ፈ</span><b>Fetan <em>Order</em></b></div><button className="waiter-bell" onClick={() => setShowHistory((value) => !value)} aria-label="View notifications"><Bell size={18}/>{notifications.length > 0 && <i>{notifications.length}</i>}</button></header>
    <section className="waiter-content"><div className="waiter-intro"><div><span className="waiter-kicker">WAITER VIEW</span><h1>My Tables</h1><p>Everything you need to keep service moving.</p></div><div className="shift-card"><span className="shift-dot" /> <div><b>Selam Tesfaye</b><small>On shift · Lunch service</small></div><strong>{tables.length}<small> active tables</small></strong></div></div>
      <div className="waiter-summary"><span className="shift-total"><strong>ETB {tables.reduce((sum, table) => sum + table.total, 0).toLocaleString()}</strong><small>Shift total · active tables</small></span><span><strong>{tables.filter((table) => table.status === "ready").length}</strong> Ready for delivery</span><span><strong>{tables.filter((table) => table.status === "attention").length}</strong> Guest requests</span><span><strong>{tables.length}</strong> Assigned tables</span></div>
      <div className="waiter-section-heading"><h2>Assigned tables</h2><span><span className="status-dot ready-dot"/> Ready first</span></div>
      <div className="waiter-grid">{sortedTables.map((table) => <article className={`waiter-table-card ${table.status}`} key={table.id}><div className="table-card-top"><div><span className="table-number">Table {String(table.id).padStart(2, "0")}</span><small>{table.guests} guests</small></div><span className={`table-status ${table.status}`}>{table.status === "ready" ? "Ready" : table.status === "attention" ? "Assistance" : "Dining"}</span></div><div className="table-order-items">{table.items.map((item) => <span key={item.name}>{item.quantity}× {item.name}</span>)}</div><div className="table-total">ETB {table.total.toLocaleString()}<small>running total</small></div><div className="table-card-meta"><span><Clock3 size={13}/> {table.elapsed}</span>{table.status === "ready" && <span className="ready-copy"><Check size={13}/> Hot food ready</span>}</div><div className="table-actions">{table.status === "ready" && <button className="deliver-button" onClick={() => markDelivered(table.id)}><Check size={14}/> Mark Delivered</button>}<button onClick={() => setAddItem(table.id)}><Plus size={14}/> Add Item</button><button className={billSent.includes(table.id) ? "sent" : ""} onClick={() => requestBill(table.id)}><ReceiptText size={14}/> {billSent.includes(table.id) ? "Bill Sent" : "Request Bill"}</button></div></article>)}</div>
    </section>
    {toast && <div className={`waiter-toast ${toast.kind}`}><span>{toast.kind === "ready" ? <Check size={17}/> : <CircleAlert size={17}/>}</span><b>{toast.title}</b><button onClick={() => setToast(null)}><X size={14}/></button></div>}
    {showHistory && <aside className="notification-history"><div><b>Notifications</b><button onClick={() => setShowHistory(false)}><X size={15}/></button></div>{notifications.map((note) => <div className="history-item" key={note.id}><span className={note.kind}>{note.kind === "ready" ? <Check size={14}/> : <CircleAlert size={14}/>}</span><p><b>{note.title}</b><small>{note.detail}</small></p></div>)}</aside>}
    {addItem !== null && <div className="waiter-modal-backdrop" onClick={() => setAddItem(null)}><div className="waiter-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setAddItem(null)}><X size={16}/></button><span className="modal-icon"><Plus size={18}/></span><span className="waiter-kicker">MANUAL ADDITION · TABLE {String(addItem).padStart(2, "0")}</span><h2>Add to this order</h2><p>Record a quick addition for the kitchen and tag it to the existing order.</p><div className="manual-options"><button onClick={() => addManualItem("Water refill")}><GlassWater size={17}/> Water refill</button><button onClick={() => addManualItem("Extra item")}><UtensilsCrossed size={17}/> Extra item</button></div></div></div>}
  </main>
}
