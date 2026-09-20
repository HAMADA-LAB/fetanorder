"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, ChefHat, CircleHelp, Clock3, Wifi, WifiOff } from "lucide-react"
import { useDemoSimulation } from "../../lib/use-demo-simulation"

type Order = { id: string; table: string; age: string; seconds: number; items: { name: string; quantity: number; note?: string }[]; total: string; status: "confirmed" | "pending"; waiter?: boolean }

const initialOrders: Order[] = [
  { id: "#1048", table: "Table 07", age: "Just now", seconds: 228, items: [{ name: "Doro Wot", quantity: 1, note: "Extra injera" }, { name: "Ethiopian Coffee", quantity: 1 }], total: "ETB 640", status: "pending" },
  { id: "#1047", table: "Table 03", age: "2 min ago", seconds: 0, items: [{ name: "Vegetarian Bayaynetu", quantity: 2 }, { name: "Mango Juice", quantity: 1 }], total: "ETB 980", status: "confirmed" },
  { id: "#1046", table: "Table 12", age: "5 min ago", seconds: 0, items: [{ name: "Kitfo", quantity: 1 }, { name: "Sambusa", quantity: 2 }], total: "ETB 920", status: "confirmed", waiter: true },
]

function formatCountdown(seconds: number) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` }

export default function KitchenScreen() {
  const [orders, setOrders] = useState(initialOrders)
  const { orders: simulatedOrders, notice } = useDemoSimulation()
  const [connected, setConnected] = useState(true)
  useEffect(() => { setOrders((current) => { const known = new Set(current.map((order) => order.id)); const additions = simulatedOrders.filter((order) => !known.has(order.id) && order.status === "pending").map((order) => ({ id: order.id, table: order.table, age: "Just now", seconds: 240, items: [{ name: "Doro Wot", quantity: 1 }, { name: "Ethiopian Coffee", quantity: 1 }], total: `ETB ${order.total.toLocaleString()}`, status: "pending" as const })); return [...additions, ...current].slice(0, 12) }) }, [simulatedOrders])
  const [clock, setClock] = useState(new Date())

  useEffect(() => { const timer = window.setInterval(() => setClock(new Date()), 1000); return () => window.clearInterval(timer) }, [])
  useEffect(() => { const timer = window.setInterval(() => setOrders((current) => current.map((order) => order.status === "pending" ? (order.seconds <= 1 ? { ...order, status: "confirmed", seconds: 0 } : { ...order, seconds: order.seconds - 1 }) : order)), 1000); return () => window.clearInterval(timer) }, [])

  const pending = useMemo(() => orders.filter((order) => order.status === "pending").length, [orders])
  const confirmedOrders = orders.filter((order) => order.status === "confirmed")
  const pendingOrders = orders.filter((order) => order.status === "pending")

  function confirmOrder(id: string) { setOrders((current) => current.map((order) => order.id === id ? { ...order, status: "confirmed", seconds: 0 } : order)) }

  return <main className="kitchen-shell">
    <header className="kitchen-header"><div className="kitchen-brand"><span className="kitchen-mark"><ChefHat size={19} /></span><span><strong><em>Fetan</em> Kitchen</strong><small>Order flow</small></span></div><div className="kitchen-head-actions"><div className={`connection ${connected ? "online" : "offline"}`}><span className="connection-dot" />{connected ? "Connected" : "Offline"}</div><button className="icon-button" aria-label="Help"><CircleHelp size={19} /></button><div className="kitchen-clock"><b>{clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b><small>Tuesday, 18 June 2026</small></div></div></header>
    <section className="kitchen-toolbar"><div><span className="kitchen-kicker">LIVE SERVICE · DINNER</span><h1>Kitchen orders</h1><p>Confirmed orders appear oldest first. Pending orders stay muted until the guest confirmation window closes.</p></div><div className="service-summary"><div><strong>{confirmedOrders.length}</strong><span>Confirmed</span></div><div className="summary-divider"/><div><strong className={pending ? "gold-text" : ""}>{pending}</strong><span>Awaiting guest</span></div></div></section>
    {pendingOrders.length > 0 && <section className="order-section"><div className="section-label"><span>Awaiting confirmation</span><small>Muted · not interactive</small></div><div className="kitchen-grid">{pendingOrders.map((order) => <OrderCard key={order.id} order={order} onConfirm={confirmOrder} />)}</div></section>}
    <section className="order-section confirmed-section"><div className="section-label"><span>Confirmed · prepare next</span><small><Clock3 size={13} /> Oldest first</small></div><div className="kitchen-grid">{confirmedOrders.map((order) => <OrderCard key={order.id} order={order} />)}</div></section>
    {notice && <div className="simulation-toast"><span className="simulation-dot"/> {notice} <small>Demo activity</small></div>}<footer className="kitchen-footer"><span><Wifi size={14} /> Kitchen display is syncing automatically</span><small className="simulation-label"><i/> Demo is simulating live activity</small><button onClick={() => setConnected(!connected)}>{connected ? "Simulate offline" : "Reconnect"} {connected ? <WifiOff size={14}/> : <Wifi size={14}/>}</button></footer>
  </main>
}

function OrderCard({ order, onConfirm }: { order: Order; onConfirm?: (id: string) => void }) {
  const isPending = order.status === "pending"
  return <article className={`kitchen-order-card ${isPending ? "pending-order" : "confirmed-order"}`} aria-disabled={isPending}>
    <div className="order-card-top"><div><span className="order-number">{order.id}</span><h2>{order.table}</h2></div><div className="order-meta"><span>{order.age}</span><strong>{order.total}</strong></div></div>
    {isPending && <div className="pending-banner"><Clock3 size={14} /><span>Guest confirmation window</span><strong>{formatCountdown(order.seconds)}</strong></div>}
    <div className="order-items">{order.items.map((item) => <div className="kitchen-item" key={item.name}><span><b>{item.quantity}×</b> {item.name}{item.note && <small>{item.note}</small>}</span><Check size={15} /></div>)}</div>
    {order.waiter && <span className="waiter-tag">WAITER ADDITION</span>}
    {isPending ? <button className="confirm-disabled" disabled><Clock3 size={15} /> Waiting for confirmation</button> : <button className="start-button"><ChefHat size={15} /> Start preparing</button>}
    {isPending && onConfirm && <button className="demo-confirm" onClick={() => onConfirm(order.id)}>Demo: confirm guest order</button>}
  </article>
}

// @ts-expect-error React's inferred order tuple is intentionally compact in this screen.
void initialOrders
