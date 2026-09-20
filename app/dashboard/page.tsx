"use client"

import { useMemo, useState } from "react"
import { useDemoSimulation } from "../../lib/use-demo-simulation"
import { BarChart3, Bell, ChevronDown, CircleDollarSign, ClipboardList, LayoutDashboard, Menu as MenuIcon, MoreHorizontal, Settings, SlidersHorizontal, Store, Users, UtensilsCrossed } from "lucide-react"
import { demoOrders, demoTables, demoTotals } from "../../lib/demo-data"

const statuses = {
  empty: { label: "Empty", className: "empty" },
  ordering: { label: "Ordering", className: "ordering" },
  pending: { label: "Pending", className: "pending" },
  confirmed: { label: "Confirmed", className: "confirmed" },
  cooking: { label: "Cooking", className: "cooking" },
  ready: { label: "Ready", className: "ready" },
  delivering: { label: "Delivering", className: "delivering" },
  bill: { label: "Bill requested", className: "bill" },
  finishing: { label: "Finishing soon", className: "finishing" },
  paying: { label: "Paying", className: "paying" },
} as const

type StatusKey = keyof typeof statuses

const navItems = [
  ["Dashboard", LayoutDashboard, "/dashboard"], ["Menu", UtensilsCrossed, "/menu"], ["Orders", ClipboardList, "/dashboard#orders"], ["Tables", Store, "/dashboard#tables"], ["Reports", BarChart3, "/reports"], ["Settings", Settings, "/dashboard#settings"],
] as const

export default function Dashboard() {
  const [activeStatus, setActiveStatus] = useState<StatusKey | "all">("all")
  const { tables, orders, revenue, completed, activeTables, notice } = useDemoSimulation()
  const filteredTables = useMemo(() => activeStatus === "all" ? tables : tables.filter((table) => table.status === activeStatus), [activeStatus, tables])

  return <main className="owner-shell">
    <aside className="owner-sidebar">
      <a href="/" className="owner-brand"><span className="owner-brand-mark"><span>ፈ</span></span><span><strong><em>Fetan</em> Order</strong><small>Owner workspace</small></span></a>
      <div className="workspace-switcher"><span className="workspace-avatar">LK</span><span><b>Lalibela Kitchen</b><small>Admin workspace</small></span><ChevronDown size={14}/></div>
      <nav className="owner-nav" aria-label="Owner navigation">{navItems.map(([label, Icon, href]) => <a className={label === "Dashboard" ? "active" : ""} href={href} key={label}><Icon size={17}/><span>{label}</span>{label === "Orders" && <i>3</i>}</a>)}</nav>
      <div className="sidebar-bottom"><div className="support-card"><span className="support-icon"><CircleDollarSign size={16}/></span><b>Today&apos;s close</b><small>Review payments before 11:00 PM</small><button>Open cashier <ChevronDown size={13}/></button></div><div className="owner-profile"><span className="profile-avatar">S</span><span><b>Selam Tadesse</b><small>Owner</small></span><MoreHorizontal size={16}/></div></div>
    </aside>
    <section className="owner-main">
      <header className="owner-topbar"><div><span className="owner-kicker">Tuesday, September 16, 2026</span><h1>Good evening, Selam</h1></div><div className="owner-top-actions"><span className="live-status"><i/> All systems operational</span><span className="simulation-label"><i/> Demo is simulating live activity</span><button className="top-icon" aria-label="Notifications"><Bell size={18}/><i>3</i></button><button className="owner-avatar">S</button></div></header>
      <div className="owner-content">
        <section className="stat-grid"><Stat label="Today&apos;s revenue" value={revenue.toLocaleString()} suffix="ETB" detail="Live simulated total" positive/><Stat label="Orders today" value={String(completed)} suffix="orders" detail="Updates as orders complete"/><Stat label="Avg. prep time" value="11" suffix="min" detail="2 min faster than usual" positive/><Stat label="Table occupancy" value={String(Math.round((activeTables / tables.length) * 100))} suffix="%" detail={`${activeTables} of ${tables.length} tables active`}/></section>{notice && <div className="simulation-toast"><span className="simulation-dot"/> {notice} <small>Demo activity</small></div>}
        <div className="dashboard-grid">
          <section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">LIVE FLOOR</span><h2>Table overview</h2></div><button className="filter-button"><SlidersHorizontal size={14}/> Filter</button></div><div className="legend">{Object.entries(statuses).map(([key, value]) => <button key={key} onClick={() => setActiveStatus(activeStatus === key ? "all" : key as StatusKey)} className={activeStatus === key ? "selected" : ""}><i className={`status-dot ${value.className}`}/>{value.label}</button>)}</div><div className="table-grid">{filteredTables.map((table) => <button className={`table-tile ${statuses[table.status].className}`} key={table.id}><span className="table-number">{String(table.id).padStart(2, "0")}</span><b>Table {table.id}</b>{table.guests && <small>{table.guests} guests</small>}{table.countdown && <em>{table.countdown}</em>}<span className="table-status">{statuses[table.status].label}</span></button>)}</div></section>
          <section className="panel order-panel"><div className="panel-heading"><div><span className="section-kicker">LIVE ORDER FEED</span><h2>Recent orders</h2></div><a href="#orders">View all <ChevronDown size={14}/></a></div><div className="order-list">{orders.map((order) => <article className="feed-order" key={order.id}><span className={`feed-icon ${order.tone}`}><UtensilsCrossed size={14}/></span><div className="feed-copy"><div><b>{order.table}</b><small>{order.id} · {order.time}</small></div><p>{order.items}</p></div><div className="feed-total"><b>ETB {order.total.toLocaleString()}</b><span className={`order-status ${order.tone}`}>{order.status}</span></div></article>)}</div></section>
        </div>
      </div>
    </section>
  </main>
}

function Stat({ label, value, suffix, detail, positive }: { label: string; value: string; suffix: string; detail: string; positive?: boolean }) { return <article className="stat-card"><span>{label}</span><div><strong>{value}</strong><small>{suffix}</small></div><p className={positive ? "positive" : ""}>{positive ? "↗ " : ""}{detail}</p></article> }

void MenuIcon
void Users
