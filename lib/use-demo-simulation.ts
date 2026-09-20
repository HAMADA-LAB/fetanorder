"use client"

import { useEffect, useMemo, useState } from "react"

export type SimStatus = "empty" | "pending" | "confirmed" | "cooking" | "ready" | "delivering" | "paying"
export type SimTable = { id: number; status: SimStatus; guests?: number; orderId?: string; total?: number }
export type SimOrder = { id: string; table: string; items: string; total: number; status: SimStatus; time: string; tone: string }

const seedTables: SimTable[] = [
  { id: 1, status: "empty" }, { id: 2, status: "cooking", guests: 3, total: 1050 }, { id: 3, status: "ready", guests: 2, total: 1280 }, { id: 4, status: "empty" },
  { id: 5, status: "empty" }, { id: 6, status: "pending", guests: 2, total: 640 }, { id: 7, status: "cooking", guests: 5, total: 1840 }, { id: 8, status: "delivering", guests: 2, total: 1050 },
  { id: 9, status: "empty" }, { id: 10, status: "empty" }, { id: 11, status: "ready", guests: 3, total: 1640 }, { id: 12, status: "paying", guests: 4, total: 920 },
  { id: 13, status: "empty" }, { id: 14, status: "cooking", guests: 2, total: 760 }, { id: 15, status: "empty" }, { id: 16, status: "empty" }, { id: 17, status: "empty" }, { id: 18, status: "empty" },
]

const seedOrders: SimOrder[] = [
  { id: "#1048", table: "Table 07", items: "Doro wot, sambusa", total: 840, status: "cooking", time: "2 min ago", tone: "orange" },
  { id: "#1047", table: "Table 03", items: "Kitfo, coffee", total: 1280, status: "ready", time: "5 min ago", tone: "green" },
  { id: "#1046", table: "Table 11", items: "Bayaynetu, juice", total: 640, status: "ready", time: "8 min ago", tone: "gold" },
  { id: "#1045", table: "Table 02", items: "Tibs, injera", total: 1050, status: "delivering", time: "11 min ago", tone: "blue" },
]

const labels: Record<SimStatus, string> = { empty: "Empty", pending: "Pending", confirmed: "Confirmed", cooking: "Cooking", ready: "Ready", delivering: "Delivering", paying: "Paying" }
const tones: Record<SimStatus, string> = { empty: "gray", pending: "gray", confirmed: "teal", cooking: "orange", ready: "green", delivering: "blue", paying: "purple" }

export function useDemoSimulation() {
  const [tables, setTables] = useState(seedTables)
  const [orders, setOrders] = useState(seedOrders)
  const [revenue, setRevenue] = useState(14250)
  const [completed, setCompleted] = useState(37)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const arrivals = window.setInterval(() => {
      setTables((current) => {
        const empty = current.filter((table) => table.status === "empty")
        if (!empty.length) return current
        const table = empty[Math.floor(Math.random() * empty.length)]
        const id = `#${1050 + Math.floor(Math.random() * 90)}`
        const total = [520, 640, 840, 1050, 1280][Math.floor(Math.random() * 5)]
        setOrders((existing) => [{ id, table: `Table ${String(table.id).padStart(2, "0")}`, items: "Doro wot, coffee", total, status: "pending", time: "Just now", tone: "gray" }, ...existing].slice(0, 10))
        setNotice(`New order at Table ${String(table.id).padStart(2, "0")}`)
        return current.map((item) => item.id === table.id ? { ...item, status: "pending", guests: 2, total, orderId: id } : item)
      })
    }, 18000 + Math.random() * 12000)
    return () => window.clearInterval(arrivals)
  }, [])

  useEffect(() => {
    const progress = window.setInterval(() => {
      setTables((current) => current.map((table) => {
        if (table.status === "empty") return table
        const next: Record<SimStatus, SimStatus> = { pending: "confirmed", confirmed: "cooking", cooking: "ready", ready: "delivering", delivering: "paying", paying: "empty", empty: "empty" }
        if (Math.random() > .28 || table.status === "empty") return table
        const status = next[table.status]
        if (status === "empty") { setCompleted((value) => value + 1); setRevenue((value) => value + (table.total || 0)) }
        return { ...table, status, ...(status === "empty" ? { guests: undefined, total: undefined, orderId: undefined } : {}) }
      }))
      setOrders((current) => current.map((order) => {
        if (order.status === "paying") return { ...order, status: "empty" }
        const next: Record<SimStatus, SimStatus> = { pending: "confirmed", confirmed: "cooking", cooking: "ready", ready: "delivering", delivering: "paying", paying: "empty", empty: "empty" }
        return Math.random() > .28 ? order : { ...order, status: next[order.status], tone: tones[next[order.status]] }
      }).filter((order) => order.status !== "empty"))
    }, 5000)
    return () => window.clearInterval(progress)
  }, [])

  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(null), 4500); return () => window.clearTimeout(timer) }, [notice])
  const activeTables = useMemo(() => tables.filter((table) => table.status !== "empty").length, [tables])
  return { tables, orders, revenue, completed, activeTables, notice, labels }
}
