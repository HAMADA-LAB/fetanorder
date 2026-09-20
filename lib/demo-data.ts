export const demoTables = [
  { id: 1, status: "empty" }, { id: 2, status: "cooking", guests: 3 }, { id: 3, status: "ready", guests: 2 },
  { id: 4, status: "ordering", guests: 4 }, { id: 5, status: "empty" }, { id: 6, status: "pending", countdown: "02:41", guests: 2 },
  { id: 7, status: "cooking", guests: 5 }, { id: 8, status: "delivering", guests: 2 }, { id: 9, status: "bill", guests: 3 },
  { id: 10, status: "empty" }, { id: 11, status: "finishing", countdown: "04:18", guests: 2 }, { id: 12, status: "paying", guests: 4 },
  { id: 13, status: "empty" }, { id: 14, status: "cooking", guests: 2 }, { id: 15, status: "ready", guests: 3 },
  { id: 16, status: "ordering", guests: 2 }, { id: 17, status: "empty" }, { id: 18, status: "bill", guests: 5 },
] as const

export const demoOrders = [
  { id: "#1048", table: "Table 07", items: "Doro wot, sambusa", total: "ETB 840", status: "Cooking", tone: "orange", time: "2 min ago" },
  { id: "#1047", table: "Table 03", items: "Kitfo, coffee", total: "ETB 1,280", status: "Ready", tone: "green", time: "5 min ago" },
  { id: "#1046", table: "Table 11", items: "Bayaynetu, juice", total: "ETB 640", status: "Finishing", tone: "gold", time: "8 min ago" },
  { id: "#1045", table: "Table 02", items: "Tibs, injera", total: "ETB 1,050", status: "Delivering", tone: "blue", time: "11 min ago" },
  { id: "#1044", table: "Table 18", items: "Shiro, sambusa", total: "ETB 520", status: "Bill requested", tone: "gold", time: "14 min ago" },
  { id: "#1043", table: "Table 12", items: "Doro wot, salad", total: "ETB 920", status: "Paying", tone: "purple", time: "18 min ago" },
  { id: "#1042", table: "Table 04", items: "Fish goulash, tea", total: "ETB 760", status: "Confirmed", tone: "teal", time: "21 min ago" },
  { id: "#1041", table: "Table 09", items: "Vegetarian combo", total: "ETB 680", status: "Completed", tone: "gray", time: "26 min ago" },
] as const

export const demoTotals = { revenue: "14,250", orders: "37", prep: "11", occupancy: "68" }

export type DemoTable = (typeof demoTables)[number]
export type DemoOrder = (typeof demoOrders)[number]
