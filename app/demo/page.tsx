"use client"

import { useState } from "react"
import { ArrowLeft, ChefHat, ClipboardList, LockKeyhole, QrCode, Store, Users, X } from "lucide-react"

type Role = "owner" | "kitchen" | "waiter" | "client"
type ProtectedRole = Exclude<Role, "client">

const roles: Array<{ id: Role; label: string; description: string; src: string; icon: typeof Store }> = [
  { id: "owner", label: "Owner", description: "See the whole restaurant at a glance — sales, tables, and live orders.", src: "/dashboard", icon: Store },
  { id: "kitchen", label: "Kitchen", description: "Keep every ticket moving with a clear, live kitchen display.", src: "/kitchen", icon: ChefHat },
  { id: "waiter", label: "Waiter", description: "Manage tables, send orders, and keep service flowing.", src: "/waiter", icon: ClipboardList },
  { id: "client", label: "Client", description: "Scan into a table and browse a fast, bilingual QR menu.", src: "/menu", icon: QrCode },
]

export default function DemoPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [unlockedRole, setUnlockedRole] = useState<Role | null>(null)
  const [password, setPassword] = useState("")
  const [staffId, setStaffId] = useState("")
  const [error, setError] = useState("")
  const selected = roles.find((role) => role.id === selectedRole)
  const active = roles.find((role) => role.id === unlockedRole)

  function chooseRole(role: Role) {
    setError("")
    if (role === "client") {
      setUnlockedRole(role)
      return
    }
    setPassword("")
    setStaffId("")
    setSelectedRole(role)
  }

  function submitAccess(event: React.FormEvent) {
    event.preventDefault()
    const valid = selectedRole === "waiter" ? staffId.trim().length > 0 && password === "0000" : password === "0000"
    if (!valid) {
      setError(selectedRole === "waiter" ? "Enter any Staff ID and the demo password." : "That password is not correct.")
      return
    }
    setSelectedRole(null)
    setUnlockedRole(selectedRole as ProtectedRole)
  }

  function backToRoles() {
    setUnlockedRole(null)
    setSelectedRole(null)
    setError("")
  }

  if (active) {
    return <main className="demo-shell demo-view-shell demo-view-shell-minimal">
      <button className="demo-float-back" onClick={backToRoles}><ArrowLeft size={15} /> Switch role</button>
      <div className="demo-banner demo-banner-floating"><span className="demo-dot" /> You&apos;re viewing the {active.label.toLowerCase()} demo with sample data</div>
      <section className="demo-stage demo-stage-full" aria-label={`${active.label} demo screen`}><iframe src={active.src} title={`${active.label} demo`} /></section>
    </main>
  }

  return <main className="demo-shell demo-selection-shell">
    <header className="demo-header"><a className="demo-back" href="/"><ArrowLeft size={16} /> Back to Fetan Order</a><div className="demo-brand"><span>ፈ</span><strong><em>Fetan</em> Order</strong></div><span className="demo-header-spacer" /></header>
    <section className="role-selection"><div className="role-selection-intro"><span className="demo-kicker">INTERACTIVE DEMO</span><h1>Choose your role.</h1><p>Step into the view built for your day-to-day work. No account needed.</p></div><div className="role-cards">{roles.map((role) => { const Icon = role.icon; return <button className="role-card" key={role.id} onClick={() => chooseRole(role.id)}><span className="role-icon"><Icon size={23} /></span><span className="role-card-copy"><strong>{role.label}</strong><span>{role.description}</span></span><ArrowLeft className="role-arrow" size={17} /></button> })}</div><p className="role-note"><Users size={14} /> Sample data only — explore freely.</p></section>
    {selected && <div className="access-backdrop" role="presentation"><section className="access-modal" role="dialog" aria-modal="true" aria-labelledby="access-title"><button className="modal-close" onClick={() => setSelectedRole(null)} aria-label="Close"><X size={17} /></button><span className="modal-icon"><LockKeyhole size={20} /></span><span className="demo-kicker">{selected.label.toUpperCase()} DEMO</span><h2 id="access-title">Enter password</h2><p className="modal-copy">Use the demo credentials to open this role&apos;s dashboard.</p><form onSubmit={submitAccess}>{selectedRole === "waiter" && <label>Staff ID<input autoFocus value={staffId} onChange={(event) => setStaffId(event.target.value)} placeholder="e.g. waiter-07" /></label>}<label>Password<input autoFocus={selectedRole !== "waiter"} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••" /></label><p className="modal-helper">{selectedRole === "waiter" ? "Demo login: any Staff ID, password 0000." : "Demo password: 0000."}</p>{error && <p className="modal-error" role="alert">{error}</p>}<button className="access-submit" type="submit">Open {selected.label} view <ArrowLeft size={15} /></button></form></section></div>}
  </main>
}

void roles
