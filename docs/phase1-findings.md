# Phase 1: Code Review Findings

## Summary

Full codebase review identified issues across: broken links, unhandled errors, accessibility, console warnings, and hardcoded styles.

---

## 1. Broken / dead links

### `app/page.tsx`
- Footer links use a placeholder route pattern for non-Privacy/Terms items (`/placeholder/...`). Prefer real routes or remove until implemented.

### `app/register/page.tsx`
- Link target `#login` may not resolve; use a proper login route or modal.

### `app/terms/page.tsx` & `app/privacy/page.tsx`
- Contact sections still contain placeholders for email/phone.

### `app/reports/page.tsx`
- Some nav items (`Orders`, `Tables`, `Settings`) use `href="#"`. Implement routes or drop the links.

---

## 2. Unhandled error states

Several role pages (register, payment, menu, waiter, kitchen, cashier, dashboard) update state without try/catch or user-visible error UI. Prefer explicit error state + fallback messaging for network or validation failures.

---

## 3. Accessibility

- Ensure menu toggles and icon-only buttons have clear `aria-label`s.
- Prefer semantic lists for feature pills.
- Backdrop click-to-close should also support Escape and focus management.
- Toasts should use `role="status"` / `aria-live`.

---

## 4. Console / unused code

- Remove unused variables and demo-only `console.info` before production.
- Prefer fixing TypeScript inference over `@ts-expect-error` where practical.

---

## 5. Hardcoded styles vs theme tokens

Reports and charts still use some raw hex/rgba values. Prefer CSS variables already defined in `globals.css` (`--line`, `--muted`, `--surface2`, `--text`, `--gold`, etc.).

---

## 6. Assets

Menu items reference `/images/food/*.svg`. Ensure those files exist under `public/images/food/` (they are present in the current tree).

---

## Priority order (historical)

1. Menu images & order flow reliability
2. Landing page links & a11y
3. Reports theming consistency
4. Registration / payment error handling
5. Kitchen / waiter / cashier state validation
