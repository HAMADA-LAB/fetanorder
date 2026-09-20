"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Minus, Moon, Plus, Sun, X } from "lucide-react"

type Item = { name: string; am: string; description: string; price: number; image_url: string; available?: boolean }

const categories = [
  { name: "Starters", am: "መክፈቻ", items: [
    { name: "Sambusa", am: "ሳምቡሳ", description: "Crisp pastry with spiced lentils", price: 180, image_url: "/images/food/sambusa.svg" },
    { name: "Azifa", am: "አዚፋ", description: "Warm green lentil salad with lemon", price: 220, image_url: "/images/food/azifa.svg" },
  ]},
  { name: "Main dishes", am: "ዋና ምግቦች", items: [
    { name: "Doro Wot", am: "ዶሮ ወጥ", description: "Slow-cooked chicken, egg and berbere", price: 480, image_url: "/images/food/doro-wot.svg" },
    { name: "Vegetarian Bayaynetu", am: "የጾም በያይነት", description: "A colorful selection of seasonal sides", price: 420, image_url: "/images/food/bayaynetu.svg" },
    { name: "Kitfo", am: "ክትፎ", description: "Minced beef, mitmita and ayib", price: 560, image_url: "/images/food/kitfo.svg", available: false },
  ]},
  { name: "Drinks", am: "መጠጦች", items: [
    { name: "Ethiopian Coffee", am: "የኢትዮጵያ ቡና", description: "Traditional jebena coffee ceremony", price: 160, image_url: "/images/food/coffee.svg" },
    { name: "Mango Juice", am: "የማንጎ ጭማቂ", description: "Freshly pressed mango and lime", price: 140, image_url: "/images/food/mango-juice.svg", available: false },
  ]},
] satisfies { name: string; am: string; items: Item[] }[]

export default function CustomerMenu() {
  const [amharic, setAmharic] = useState(false)
  const [dark, setDark] = useState(true)
  const [selected, setSelected] = useState<Item | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState("")
  const [cart, setCart] = useState<{ item: Item; quantity: number }[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const [seconds, setSeconds] = useState(240)

  useEffect(() => {
    if (!confirmed || seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearInterval(timer)
  }, [confirmed, seconds])

  const total = useMemo(() => cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0), [cart])
  const timeLabel = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
  const text = (en: string, am: string) => amharic ? am : en

  function openItem(item: Item) { if (item.available !== false) { setSelected(item); setQuantity(1); setNote("") } }
  function addToOrder() {
    if (!selected) return
    setCart((lines) => {
      const existing = lines.find((line) => line.item.name === selected.name)
      if (existing) return lines.map((line) => line.item.name === selected.name ? { ...line, quantity: line.quantity + quantity } : line)
      return [...lines, { item: selected, quantity }]
    })
    setSelected(null)
  }
  function placeOrder() { if (cart.length) { setConfirmed(true); setSeconds(240) } }

  if (confirmed) return <main className={`customer-shell ${dark ? "menu-dark" : "menu-light"}`}>
    <section className="confirmation"><div className="confirm-mark">✓</div><p className="restaurant-label">LALIBELA KITCHEN · TABLE 07</p><h1>{text("Order received", "ትዕዛዝዎ ደርሷል")}</h1><p className="confirm-copy">{text("The kitchen has started preparing your order.", "ወጥ ቤቱ ትዕዛዝዎን ማዘጋጀት ጀምሯል።")}</p><div className="countdown"><span>{text("Cancel order within", "ትዕዛዙን ይሰርዙ በዚህ ጊዜ")}</span><strong>{timeLabel}</strong></div><button className="cancel-order" onClick={() => { setConfirmed(false); setCart([]) }}>{text("Cancel order", "ትዕዛዝ ሰርዝ")}</button><button className="back-menu" onClick={() => setConfirmed(false)}>{text("Back to menu", "ወደ ሜኑ ተመለስ")}</button></section>
  </main>

  return <main className={`customer-shell ${dark ? "menu-dark" : "menu-light"}`}>
    <header className="customer-header"><div><span className="restaurant-label">LALIBELA KITCHEN</span><h1>{text("Good evening", "መልካም ምሽት")}</h1><p>{text("Table 07 · Scan to order", "ጠረጴዛ 07 · ለማዘዝ ይቃኙ")}</p></div><div className="menu-controls"><button aria-label="Change language" onClick={() => setAmharic(!amharic)}>{amharic ? "EN" : "አማ"}</button><button aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button></div></header>
    <div className="menu-content">{categories.map((category) => <section className="menu-category" key={category.name}><div className="category-title"><h2>{text(category.name, category.am)}</h2><span>{category.items.length} {text("items", "ምግቦች")}</span></div><div className="menu-items">{category.items.map((item) => <button className={`menu-item ${item.available === false ? "unavailable" : ""}`} key={item.name} onClick={() => openItem(item)} disabled={item.available === false}><span><strong>{text(item.name, item.am)}</strong><small>{item.description}</small>{item.available === false && <em>{text("Currently unavailable", "አሁን የለም")}</em>}</span><b>ETB {item.price}</b></button>)}</div></section>)}</div>
    <div className="order-dock"><div><small>{cart.length ? `${cart.reduce((sum, line) => sum + line.quantity, 0)} ${text("items", "ምግቦች")}` : text("Your order is empty", "ትዕዛዝዎ ባዶ ነው")}</small><strong>ETB {total}</strong></div><button disabled={!cart.length} onClick={placeOrder}>{text("Review order", "ትዕዛዝ ይመልከቱ")} <ChevronDown size={17}/></button></div>
    {selected && <div className="sheet-backdrop" onClick={() => setSelected(null)}><section className="item-sheet" onClick={(event) => event.stopPropagation()}><button className="sheet-close" onClick={() => setSelected(null)} aria-label="Close"><X size={20}/></button><span className="sheet-kicker">{text("ADD TO ORDER", "ወደ ትዕዛዝ ጨምር")}</span><h2>{text(selected.name, selected.am)}</h2><p>{selected.description}</p><strong className="sheet-price">ETB {selected.price}</strong><label htmlFor="note">{text("Note for the kitchen", "ለወጥ ቤቱ ማስታወሻ")}</label><textarea id="note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={text("E.g. no onions", "ለምሳሌ ሽንኩርት አይጨምሩ")}/><div className="quantity-row"><span>{text("Quantity", "ብዛት")}</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={18}/></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={18}/></button></div></div><button className="add-button" onClick={addToOrder}>{text("Add to order", "ወደ ትዕዛዝ ጨምር")} · ETB {selected.price * quantity}</button></section></div>}
  </main>
}
