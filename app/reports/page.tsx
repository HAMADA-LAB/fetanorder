"use client"

import { useState } from "react"
import { BarChart3, ChevronDown, CircleDollarSign, Download, TrendingDown, TrendingUp } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

const reportPeriods = ["Today", "This Week", "This Month", "Custom"] as const
type ReportPeriod = typeof reportPeriods[number]

const revenueData = [
  { date: "Sep 11", revenue: 11800 },
  { date: "Sep 12", revenue: 13200 },
  { date: "Sep 13", revenue: 12400 },
  { date: "Sep 14", revenue: 14800 },
  { date: "Sep 15", revenue: 13600 },
  { date: "Sep 16", revenue: 14250 },
]

const heatmapData = [
  { hour: "09", Mon: 3, Tue: 5, Wed: 4, Thu: 6, Fri: 8, Sat: 12, Sun: 7 },
  { hour: "10", Mon: 4, Tue: 6, Wed: 5, Thu: 7, Fri: 9, Sat: 14, Sun: 8 },
  { hour: "11", Mon: 7, Tue: 9, Wed: 8, Thu: 10, Fri: 12, Sat: 16, Sun: 11 },
  { hour: "12", Mon: 11, Tue: 13, Wed: 12, Thu: 14, Fri: 15, Sat: 18, Sun: 14 },
  { hour: "13", Mon: 9, Tue: 11, Wed: 10, Thu: 12, Fri: 13, Sat: 15, Sun: 12 },
  { hour: "14", Mon: 5, Tue: 7, Wed: 6, Thu: 8, Fri: 9, Sat: 11, Sun: 8 },
  { hour: "15", Mon: 2, Tue: 3, Wed: 2, Thu: 4, Fri: 5, Sat: 7, Sun: 4 },
  { hour: "18", Mon: 6, Tue: 8, Wed: 7, Thu: 9, Fri: 11, Sat: 14, Sun: 10 },
  { hour: "19", Mon: 12, Tue: 14, Wed: 13, Thu: 15, Fri: 17, Sat: 19, Sun: 15 },
  { hour: "20", Mon: 13, Tue: 15, Wed: 14, Thu: 16, Fri: 18, Sat: 20, Sun: 16 },
  { hour: "21", Mon: 10, Tue: 12, Wed: 11, Thu: 13, Fri: 15, Sat: 17, Sun: 13 },
]

const topItems = [
  { name: "Doro Wot", quantity: 148, revenue: 3552, percentage: 18.4 },
  { name: "Tibs", quantity: 132, revenue: 3432, percentage: 17.8 },
  { name: "Kitfo", quantity: 118, revenue: 3186, percentage: 16.5 },
  { name: "Shiro", quantity: 95, revenue: 2090, percentage: 10.8 },
  { name: "Misir Wot", quantity: 87, revenue: 1740, percentage: 9.0 },
  { name: "Gomen", quantity: 72, revenue: 1152, percentage: 6.0 },
  { name: "Sambusa", quantity: 61, revenue: 610, percentage: 3.2 },
]

const paymentBreakdown = [
  { name: "Cash", value: 8450, percentage: 59.3 },
  { name: "Chapa", value: 3622, percentage: 25.4 },
  { name: "Telebirr", value: 1782, percentage: 12.5 },
  { name: "Card", value: 396, percentage: 2.8 },
]

const kpiData = [
  { label: "Revenue", value: "14,250", suffix: "ETB", detail: "↑ 12.4% vs last week", positive: true },
  { label: "Orders", value: "37", suffix: "orders", detail: "8 still in service", positive: false },
  { label: "Avg. Order Value", value: "385", suffix: "ETB", detail: "↑ 8.2% vs last week", positive: true },
  { label: "Avg. Prep Time", value: "11", suffix: "min", detail: "↓ 2 min faster", positive: true },
  { label: "Table Turnover", value: "4.2", suffix: "turns", detail: "↑ 6.1% vs last week", positive: true },
]

export default function Reports() {
  const [period, setPeriod] = useState<ReportPeriod>("This Week")
  const [chartType, setChartType] = useState<"daily" | "weekly">("daily")
  const [exportOpen, setExportOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleExport = (format: "pdf" | "csv") => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setExportOpen(false)
    }, 800)
  }

  const getHeatmapColor = (value: number) => {
    if (value >= 15) return "rgb(59, 97, 66)"
    if (value >= 12) return "rgb(94, 252, 122)"
    if (value >= 9) return "rgb(212, 175, 55)"
    if (value >= 6) return "rgb(212, 175, 55, 0.6)"
    return "rgb(212, 175, 55, 0.3)"
  }

  return (
    <main className="owner-shell">
      <aside className="owner-sidebar">
        <a href="/" className="owner-brand">
          <span className="owner-brand-mark">
            <span>ፈ</span>
          </span>
          <span>
            <strong>
              <em>Fetan</em> Order
            </strong>
            <small>Owner workspace</small>
          </span>
        </a>
        <div className="workspace-switcher">
          <span className="workspace-avatar">LK</span>
          <span>
            <b>Lalibela Kitchen</b>
            <small>Admin workspace</small>
          </span>
          <ChevronDown size={14} />
        </div>
        <nav className="owner-nav" aria-label="Owner navigation">
          <a href="/dashboard">
            <BarChart3 size={17} />
            <span>Dashboard</span>
          </a>
          <a href="/menu">
            <BarChart3 size={17} />
            <span>Menu</span>
          </a>
          <a href="#" className="active">
            <BarChart3 size={17} />
            <span>Reports</span>
          </a>
          <a href="#">
            <BarChart3 size={17} />
            <span>Orders</span>
          </a>
          <a href="#">
            <BarChart3 size={17} />
            <span>Tables</span>
          </a>
          <a href="#">
            <BarChart3 size={17} />
            <span>Settings</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="support-card">
            <span className="support-icon">
              <CircleDollarSign size={16} />
            </span>
            <b>Today&apos;s close</b>
            <small>Review payments before 11:00 PM</small>
            <button>
              Open cashier <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </aside>

      <section className="owner-main">
        <header className="owner-topbar">
          <div>
            <span className="owner-kicker">Reports</span>
            <h1>Business Analytics</h1>
          </div>
        </header>

        <div className="owner-content">
          {/* Date range & export */}
          <div className="reports-header">
            <div className="period-selector">
              {reportPeriods.map((p) => (
                <button
                  key={p}
                  className={period === p ? "active" : ""}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="export-wrapper">
              <button
                className="export-button"
                onClick={() => setExportOpen(!exportOpen)}
              >
                <Download size={14} /> Export
              </button>
              {exportOpen && (
                <div className="export-menu">
                  <button onClick={() => handleExport("pdf")}>
                    {loading ? "Exporting PDF..." : "Export as PDF"}
                  </button>
                  <button onClick={() => handleExport("csv")}>
                    {loading ? "Exporting CSV..." : "Export as CSV"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* KPI Cards */}
          <section className="kpi-grid">
            {kpiData.map((kpi, i) => (
              <article key={i} className="kpi-card">
                <span>{kpi.label}</span>
                <div className="kpi-value">
                  <strong>{kpi.value}</strong>
                  <small>{kpi.suffix}</small>
                </div>
                <p className={kpi.positive ? "positive" : ""}>
                  {kpi.positive ? "↗ " : "↘ "}
                  {kpi.detail}
                </p>
              </article>
            ))}
          </section>

          {/* Revenue Chart */}
          <section className="panel report-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">TRENDS</span>
                <h2>Revenue over time</h2>
              </div>
              <div className="chart-controls">
                <button
                  className={chartType === "daily" ? "active" : ""}
                  onClick={() => setChartType("daily")}
                >
                  Daily
                </button>
                <button
                  className={chartType === "weekly" ? "active" : ""}
                  onClick={() => setChartType("weekly")}
                >
                  Weekly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(242,245,240,.14)" />
                <XAxis dataKey="date" stroke="#9aa49a" style={{ fontSize: "11px" }} />
                <YAxis stroke="#9aa49a" style={{ fontSize: "11px" }} />
                <Tooltip
                  contentStyle={{
                    background: "#171d17",
                    border: "1px solid rgba(242,245,240,.14)",
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "#f2f5f0" }}
                  formatter={(value) => `ETB ${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Heatmap & Payment breakdown side by side */}
          <div className="reports-grid">
            {/* Peak hours heatmap */}
            <section className="panel report-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-kicker">PATTERNS</span>
                  <h2>Peak hours</h2>
                </div>
              </div>
              <div className="heatmap">
                <div className="heatmap-header">
                  <div className="heatmap-label" />
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="heatmap-day">
                      {day}
                    </div>
                  ))}
                </div>
                {heatmapData.map((row) => (
                  <div key={row.hour} className="heatmap-row">
                    <div className="heatmap-hour">{row.hour}h</div>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                      const val = row[day as keyof typeof row] as number
                      return (
                        <div
                          key={day}
                          className="heatmap-cell"
                          style={{ backgroundColor: getHeatmapColor(val), color: "#f2f5f0" }}
                          title={`${val} orders`}
                        >
                          {val}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "11px", color: "#9aa49a", marginTop: "14px" }}>
                Darker cells = busier hours. Lunch rush (11–14h), dinner rush (18–21h)
              </p>
            </section>

            {/* Payment method breakdown */}
            <section className="panel report-panel">
              <div className="panel-heading">
                <span className="section-kicker">BREAKDOWN</span>
                <h2>Payment methods</h2>
              </div>
              <div className="payment-breakdown">
                <div className="donut-placeholder">
                  <svg viewBox="0 0 120 120" style={{ width: "100%", height: "160px" }}>
                    {/* Simplified donut chart */}
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="12" strokeDasharray="169,376" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="12"
                      strokeDasharray="95,376"
                      strokeDashoffset="-169"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="12"
                      strokeDasharray="47,376"
                      strokeDashoffset="-264"
                    />
                    <circle cx="60" cy="60" r="30" fill="var(--surface)" />
                  </svg>
                </div>
                <div className="payment-legend">
                  {paymentBreakdown.map((method) => (
                    <div key={method.name} className="legend-item">
                      <span
                        className="legend-dot"
                        style={{
                          backgroundColor:
                            method.name === "Cash"
                              ? "var(--primary)"
                              : method.name === "Chapa"
                                ? "var(--accent)"
                                : method.name === "Telebirr"
                                  ? "#D4AF37"
                                  : "#6fa476",
                        }}
                      />
                      <div>
                        <b>{method.name}</b>
                        <p>
                          ETB {method.value.toLocaleString()} ({method.percentage}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Top-selling items */}
          <section className="panel report-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">MENU</span>
                <h2>Top-selling items</h2>
              </div>
            </div>
            <div className="top-items-table">
              <div className="table-head">
                <div>Item</div>
                <div>Qty</div>
                <div>Revenue</div>
                <div>Share</div>
              </div>
              {topItems.map((item) => (
                <div key={item.name} className="table-row">
                  <div className="item-name">{item.name}</div>
                  <div className="qty">{item.quantity}</div>
                  <div className="revenue">ETB {item.revenue.toLocaleString()}</div>
                  <div className="share">
                    <div className="share-bar">
                      <div
                        className="share-fill"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span>{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Table turnover */}
          <section className="panel report-panel">
            <div className="panel-heading">
              <span className="section-kicker">CAPACITY</span>
              <h2>Table turnover</h2>
            </div>
            <div className="turnover-stats">
              <div className="turnover-stat">
                <span>Avg. table duration</span>
                <b>47 min</b>
                <p>Average time occupied per table today</p>
              </div>
              <div className="turnover-stat">
                <span>Turnovers today</span>
                <b>4.2x</b>
                <p>Average table rotations per day</p>
              </div>
              <div className="turnover-stat">
                <span>Peak occupancy</span>
                <b>89%</b>
                <p>Highest simultaneous table usage</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
