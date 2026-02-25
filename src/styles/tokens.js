
export const colors = {
  background:   "#09090b",   // zinc-950 — page bg
  surface:      "#18181b",   // zinc-900 — card bg
  surfaceHover: "#27272a",   // zinc-800
  elevated:     "#3f3f46",   // zinc-700 — inputs, active states

  border:       "#27272a",   // zinc-800
  borderFocus:  "#71717a",   // zinc-500

  textPrimary:  "#fafafa",   // zinc-50
  textMuted:    "#71717a",   // zinc-500
  textSubtle:   "#52525b",   // zinc-600

  accent:       "#ffffff",
  accentText:   "#09090b",

  danger:       "#f87171",   // red-400
  dangerBg:     "#450a0a",   // red-950
  dangerBorder: "#7f1d1d",   // red-900
  success:      "#4ade80",   // green-400
};

// ── Reusable style objects ────────────────────────────────────

export const btnBase = {
  border: "none",
  borderRadius: 6,
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "background 0.15s, opacity 0.15s",
  fontFamily: "inherit",
  lineHeight: 1,
};

export const btnPrimary = {
  ...btnBase,
  background: colors.accent,
  color: colors.accentText,
};

export const btnGhost = {
  ...btnBase,
  background: "transparent",
  border: `1px solid ${colors.border}`,
  color: colors.textPrimary,
};

export const btnGhostSmall = {
  ...btnGhost,
  padding: "6px 12px",
  fontSize: 12,
};

export const inputStyle = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 6,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  color: colors.textPrimary,
  fontSize: 13,
  fontWeight: 400,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 500,
  color: colors.textMuted,
  marginBottom: 4,
  letterSpacing: "0.03em",
  textTransform: "uppercase",
};