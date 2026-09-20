"use client"

import { useEffect } from "react"

export function BrandLoader({ active = true }: { active?: boolean }) {
  useEffect(() => {
    if (!active) return
    const timeout = window.setTimeout(() => undefined, 520)
    return () => window.clearTimeout(timeout)
  }, [active])

  if (!active) return null
  return <div className="brand-loader" role="status" aria-label="Loading"><span className="brand-loader-mark" aria-hidden="true"><i /><b /><em /><strong /></span><span className="sr-only">Loading</span></div>
}

export function useBrandTransition() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button") : null
      if (!target || target.getAttribute("aria-disabled") === "true") return
      document.documentElement.classList.add("brand-transitioning")
      window.setTimeout(() => document.documentElement.classList.remove("brand-transitioning"), 520)
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])
}

export function BrandTransitionRoot() {
  useBrandTransition()
  return <div className="brand-transition-overlay" aria-hidden="true"><span className="brand-loader-mark"><i /><b /><em /><strong /></span></div>
}
