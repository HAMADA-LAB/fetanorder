"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, ChevronDown, MapPin, Phone, ShieldCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

const initialForm = { restaurantName: "", type: "", city: "", address: "", ownerName: "", phone: "+251 ", email: "", password: "", heard: "", notes: "", terms: false }

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (key: keyof typeof initialForm, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }))
  const stepOneValid = form.restaurantName.trim() && form.type && form.city && form.address.trim()

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.terms) return
    setLoading(true)
    setError(null)

    try {
      // 1. Create Supabase Auth User with password
      const tempPassword = form.password || Math.random().toString(36).slice(-8) + "Aa1!"
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: tempPassword,
        options: {
          data: {
            full_name: form.ownerName,
            restaurant_name: form.restaurantName,
          }
        }
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // 2. Insert restaurant registration record linked to user or email
      const { error: dbError } = await supabase.from("restaurant_registrations").insert([
        {
          restaurant_name: form.restaurantName,
          restaurant_type: form.type,
          city: form.city,
          address: form.address,
          owner_name: form.ownerName,
          phone: form.phone,
          email: form.email,
          heard_about: form.heard,
          notes: form.notes,
          user_id: authData.user?.id || null,
          status: "pending"
        }
      ])

      if (dbError) {
        console.warn("Database insertion note:", dbError.message)
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during registration.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (submitted) return (
    <main className="register-shell register-success">
      <Link className="register-brand" href="/"><span>ፈ</span><b><em>Fetan</em> Order</b></Link>
      <section className="success-panel">
        <div className="success-check"><Check size={27}/></div>
        <span className="register-kicker">Application received</span>
        <h1>Thanks, {form.ownerName || "we've got it"}.</h1>
        <p>We&apos;ve created your account and submitted your restaurant details. We&apos;ll verify and contact you within 24 hours.</p>
        <div className="success-summary">
          <b>{form.restaurantName || "Your restaurant"}</b>
          <span>{form.city || "Ethiopia"} · Trial request &amp; Supabase Auth created</span>
        </div>
        <Link className="register-secondary" href="/dashboard">Go to workspace dashboard</Link>
      </section>
    </main>
  )

  return (
    <main className="register-shell">
      <header className="register-header">
        <Link className="register-brand" href="/"><span>ፈ</span><b><em>Fetan</em> Order</b></Link>
        <Link className="login-link" href="/login">Already have an account? <strong>Login</strong></Link>
      </header>
      <div className="register-layout">
        <aside className="register-intro">
          <div className="register-kicker">Start with Fetan</div>
          <h1>Register Your Restaurant</h1>
          <p>Bring your front of house, kitchen, and payments into one calmer rhythm.</p>
          <div className="intro-note">
            <ShieldCheck size={17}/>
            <span>Built for Ethiopian restaurants, with ETB pricing and local payment support. Powered by Supabase Auth.</span>
          </div>
        </aside>
        <div className="register-legal-links">
          <span>By continuing, you agree to</span>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <section className="register-card">
          <div className="progress">
            <div className={`progress-step ${step >= 1 ? "current" : ""}`}><span>1</span><b>Restaurant Details</b></div>
            <div className="progress-line"><i style={{ width: step === 2 ? "100%" : "0%" }}/></div>
            <div className={`progress-step ${step === 2 ? "current" : ""}`}><span>2</span><b>Your Details</b></div>
          </div>

          {error && <div className="error-banner" style={{ marginBottom: "15px" }}>{error}</div>}

          <form onSubmit={step === 1 ? (event) => { event.preventDefault(); if (stepOneValid) setStep(2) } : submit}>
            {step === 1 ? (
              <div className="form-step">
                <div className="step-heading">
                  <span>Step 1 of 2</span>
                  <h2>Tell us about your place.</h2>
                  <p>The basics help us prepare your account.</p>
                </div>

                <button
                  type="button"
                  className="google-signin-btn"
                  onClick={handleGoogleRegister}
                  disabled={loading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(242,245,240,0.2)",
                    background: "#171d17",
                    color: "#f2f5f0",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: "15px"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Continue with Google
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 15px", color: "#9aa49a", fontSize: "12px" }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(242,245,240,0.1)" }} />
                  OR REGISTER WITH DETAILS
                  <div style={{ flex: 1, height: "1px", background: "rgba(242,245,240,0.1)" }} />
                </div>

                <label>Restaurant name<input required value={form.restaurantName} onChange={(e) => update("restaurantName", e.target.value)} placeholder="e.g. Selam Kitchen" /></label>
                <div className="form-row">
                  <label>Restaurant type<select required value={form.type} onChange={(e) => update("type", e.target.value)}><option value="">Choose type</option><option>Café</option><option>Restaurant</option><option>Hotel restaurant</option><option>Bar and lounge</option></select></label>
                  <label>City<div className="input-icon"><MapPin size={15}/><input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Addis Ababa" /></div></label>
                </div>
                <label>Street address<input required value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Bole, Africa Avenue" /></label>
                <button className="register-primary" type="submit">Continue to your details <ArrowRight size={16}/></button>
              </div>
            ) : (
              <div className="form-step">
                <div className="step-heading">
                  <span>Step 2 of 2</span>
                  <h2>Now, your details.</h2>
                  <p>We&apos;ll use these to verify and create your Supabase account.</p>
                </div>
                <label>Owner or manager name<input required value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} placeholder="Your full name" /></label>
                <label>Phone number<div className="phone-input"><span>🇪🇹 +251</span><input required value={form.phone.replace("+251 ", "")} onChange={(e) => update("phone", `+251 ${e.target.value}`)} placeholder="9X XXX XXXX" inputMode="tel" /></div></label>
                <label>Email address<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@restaurant.com" /></label>
                <label>Password for workspace<input required type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 6 characters" minLength={6} /></label>
                <label>How did you hear about us?<select required value={form.heard} onChange={(e) => update("heard", e.target.value)}><option value="">Choose one</option><option>Word of mouth</option><option>Social media</option><option>Google search</option><option>Fetan team</option></select></label>
                <label>Anything else? <span className="optional">Optional</span><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Tell us anything useful before we call." /></label>
                <label className="terms"><input type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} /><span>I agree to the <Link href="/terms">terms of service</Link> and understand this creates a Supabase Auth account and free trial request.</span></label>
                <div className="form-actions">
                  <button className="back-button" type="button" onClick={() => setStep(1)}><ArrowLeft size={15}/> Back</button>
                  <button className="register-primary" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit registration"} <Check size={16}/></button>
                </div>
              </div>
            )}
          </form>
        </section>
      </div>
      <footer className="register-footer">
        <span><span className="footer-live"/> Secure registration</span>
        <span>Fetan Order · Made for restaurants in Ethiopia</span>
      </footer>
    </main>
  )
}
