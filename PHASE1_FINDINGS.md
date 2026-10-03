# Phase 1: Code Review Findings

## Summary
Full codebase review identified issues across five dimensions: broken links, unhandled errors, accessibility issues, console warnings, and hardcoded styles.

---

## 1. BROKEN/DEAD LINKS

### app/page.tsx
- **Line 83**: Footer links use placeholder route pattern
  - `href={/placeholder/${x.toLowerCase().replace(/\s+/g, "-")}`
  - Points to non-existent `/placeholder/*` routes (Privacy → /privacy and Terms → /terms do exist, but other footer items link to dead routes)
  - Should: Either create routes or use real href values

### app/register/page.tsx
- **Line 9**: Link target `#login` (line 24)
  - Points to anchor that doesn't exist on the page
  - Should: Either remove link or implement login modal

### app/terms/page.tsx
- **Line 9**: Contact section has placeholder
  - `[support email/phone placeholder]` (line 9)
  - Should: Replace with actual contact info or link

### app/privacy/page.tsx
- **Line 9**: Contact section has placeholder
  - `[support email]` (line 9)
  - Should: Replace with actual contact info

### app/reports/page.tsx
- **Lines 111-127**: Navigation links point to non-existent routes
  - Line 107: `href="/menu"` (Menu points to customer menu, not admin)
  - Lines 115, 119, 123: `href="#"` — dead links (Orders, Tables, Settings)
  - Should: Implement these admin routes or remove navigation

---

## 2. UNHANDLED ERROR STATES

### app/register/page.tsx
- **Line 14-20**: Form submission has no error handling
  - `submit()` only validates terms checkbox, no network error handling
  - `console.info()` call for demo stand-in has no try/catch
  - Should: Add error state for submission failure, network errors

### app/payment/page.tsx
- **Line 15**: `window.setTimeout()` has no error handling for payment simulation
  - Demo payment state transition has no validation
  - Should: Add error state if payment processing fails

### app/menu/page.tsx
- **Line 54**: `placeOrder()` sets confirmed=true but no validation
  - No check for empty cart (though button is disabled)
  - No error handling for order placement
  - Should: Add error state for order submission

### app/waiter/page.tsx
- **Lines 35-49**: State updates have no error handling
  - `markDelivered()`, `requestBill()`, `addManualItem()` mutate state with no validation
  - Should: Add validation and error states

### app/kitchen/page.tsx
- **Line 31**: `confirmOrder()` has no validation or error handling
  - Should: Add error state for confirmation failure

### app/cashier/page.tsx
- **Line 28-31**: No error handling for payment completion
  - `setPaid(true)` sets state with no validation
  - Should: Add error state for payment processing

### app/dashboard/page.tsx
- **Line 29**: `useDemoSimulation()` hook has no error boundary
  - If simulation fails, whole dashboard breaks
  - Should: Add error boundary or fallback UI

---

## 3. ACCESSIBILITY ISSUES

### app/page.tsx
- **Line 77**: Mobile menu toggle missing aria-label
  - `<Menu />` and `<X />` icons render without aria-label on toggle button
  - Should: Add `aria-label="Toggle navigation menu"`

- **Line 77**: Language toggle button missing aria-label
  - Button only has `aria-label="Change language"` ✓ (this is correct)

- **Line 78**: Feature pills aria-label but no semantic meaning
  - `<div ... aria-label="Fetan Order highlights">` should use `<ul role="list">`
  - Should: Use semantic list structure

- **Line 80-81**: FAQ buttons missing proper ARIA
  - `aria-expanded` is set ✓ but heading hierarchy is unclear
  - `<h3>Questions, answered.</h3>` followed by `<div className="faq-item">`
  - Should: Use `<h2>` for consistency with other sections

### app/cashier/page.tsx
- **Line 46**: Button with dots aria-label but unclear purpose
  - `aria-label="More options"` on `<button className="dots">•••</button>`
  - Should: Implement actual menu or remove button

### app/kitchen/page.tsx
- **Line 44**: OrderCard has `aria-disabled` on article instead of button
  - `<article ... aria-disabled={isPending}>`
  - Should: Use proper `disabled` attribute on button, not article

### app/menu/page.tsx
- **Line 62**: Menu items missing proper form semantics
  - Buttons trigger modal but not accessible as form inputs
  - Should: Wrap in proper form structure with labels

- **Line 64**: Sheet backdrop click-to-close not keyboard accessible
  - `onClick={() => setSelected(null)}` on div backdrop
  - Should: Add ESC key handler and proper ARIA attributes

### app/waiter/page.tsx
- **Line 58**: Toast aria-role missing
  - Toast div has no `role="alert"` or `role="status"`
  - Should: Add `role="status"` and `aria-live="polite"`

### app/payment/page.tsx
- **Line 21**: Phone input label doesn't connect to input
  - `<label htmlFor="phone">` ✓ but input `id="phone"` is present ✓ (this is correct)
  - However: No `aria-describedby` for formatting hint

---

## 4. CONSOLE ERRORS/WARNINGS

### app/page.tsx
- **Line 88**: Unused variable
  - `const _unused = langClass` followed by `void _unused`
  - Should: Remove unused function entirely

- **Line 92**: TypeScript error suppression
  - `// @ts-expect-error lucide tuple inference is intentionally compact`
  - Should: Consider refactoring to avoid error

### app/kitchen/page.tsx
- **Line 55**: Unused variable
  - `void initialOrders` at end
  - Should: Remove unused data constant

### app/demo/page.tsx
- **Line 68**: Unused variable
  - `void roles` at end
  - Should: Remove unused data constant

### app/register/page.tsx
- **Line 18**: console.info with demo data
  - `console.info("[DEMO STAND-IN] restaurant_registrations submission", form)`
  - Should: Remove before production or guard with dev check

---

## 5. HARDCODED STYLE VALUES OUTSIDE THEME TOKENS

### app/reports/page.tsx
- **Line 225**: Hardcoded stroke color
  - `stroke="rgba(242,245,240,.14)"`
  - Should: Use `--line` token from globals.css (already defined: `--line:rgba(242,245,240,.14)`)

- **Line 226-227**: Hardcoded text color
  - `stroke="#9aa49a"` and `style={{ fontSize: "11px" }}`
  - Should: Use `--muted` token for color and define font-size token

- **Line 234**: Hardcoded background color
  - `background: "#171d17"`
  - Should: Use `--surface2` token (already defined: `--surface2:#171d17`)

- **Line 234**: Hardcoded border color
  - `border: "1px solid rgba(242,245,240,.14)"`
  - Should: Use `--line` token

- **Line 235**: Hardcoded label color
  - `labelStyle={{ color: "#f2f5f0" }}`
  - Should: Use `--text` token

- **Line 286**: Hardcoded font size and color
  - `style={{ fontSize: "11px", color: "#9aa49a", marginTop: "14px" }}`
  - Should: Use tokens for color (`--muted`) and define size token

- **Line 301-321**: Hardcoded colors in SVG
  - `stroke="var(--primary)"`, `stroke="var(--accent)"`, `stroke="#D4AF37"`
  - Should: The first two use tokens ✓ but `#D4AF37` should use `--gold` token (already defined)

- **Line 322**: Hardcoded SVG fill
  - `fill="var(--surface)"`  ✓ uses token (correct)

- **Line 338**: Hardcoded fallback color
  - `"#6fa476"` for Card payment method
  - Should: Define token or use existing palette

### app/cashier/page.tsx
- **Line 36**: Multiple hardcoded strings in JSX but all styled via CSS classes ✓
  - No inline hardcoded styles found in this file

### app/menu/page.tsx
- **Line 56**: All styling via Tailwind/CSS classes ✓
  - No hardcoded inline styles found

### lib/reports.tsx or similar
- Note: Recharts components inherit colors from CSS variables, so hardcoded hex values in Tooltip/styles should reference tokens

---

## 6. MISSING IMAGE ASSETS

### app/menu/page.tsx
- **Line 10-21**: Image URLs reference `/images/food/*.svg`
  - Example: `image_url: "/images/food/sambusa.svg"`
  - **Issue**: Directory `/public/images/food/` does not exist
  - Files referenced: sambusa.svg, azifa.svg, doro-wot.svg, bayaynetu.svg, kitfo.svg, coffee.svg, mango-juice.svg
  - Should: Either create images or use placeholder images

### app/page.tsx
- **Line 83**: Design credit image
  - `<img src="/ibdaa-logo-transparent.png" alt="IBDAA" />`
  - **Status**: File exists ✓

---

## 7. MISSING ALT TEXT / IMAGE DESCRIPTIONS

### app/page.tsx
- **Line 62**: Device illustration
  - `<div className="device-notch" aria-hidden="true"><span /></div>`
  - Should: Ensure parent has proper semantic meaning

- **Line 83**: Design credit image
  - `<img src="/ibdaa-logo-transparent.png" alt="IBDAA" />`
  - **Status**: Alt text present ✓

---

## Summary by Severity

**Critical (breaks functionality/access):**
- Missing `/public/images/food/` directory → menu images fail to load
- Dead routes in footer and navigation
- Unhandled errors in form submissions and state updates

**High (accessibility/usability):**
- Keyboard navigation issues (backdrop click-to-close, modal focus)
- Missing toast ARIA roles
- Poor form semantics in menu ordering

**Medium (code quality):**
- Hardcoded colors that should use token system
- Console logging and unused variables
- TypeScript error suppressions

**Low (polish):**
- Placeholder text in legal pages
- Demo stand-in console.info calls

---

## Files Needing Attention (Priority Order)

1. **app/menu/page.tsx** - Missing image directory blocks feature
2. **app/page.tsx** - Dead routes, accessibility issues, hardcoded styles
3. **app/reports/page.tsx** - Many hardcoded style values
4. **app/register/page.tsx** - Unhandled form errors, missing error states
5. **app/cashier/page.tsx**, **app/kitchen/page.tsx**, **app/waiter/page.tsx** - State management without error handling

