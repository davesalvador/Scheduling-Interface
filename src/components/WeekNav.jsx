import { colors } from "../styles/tokens";

export default function WeekNav({ weekLabel, isCurrentWeek, onPrev, onNext, onGoToCurrent }) {
  return (
    <nav
      aria-label="Week navigation"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <button onClick={onPrev} className="nav-btn" aria-label="Previous week">
        ← Prev
      </button>

      <div style={{ flex: 1, textAlign: "center", minWidth: 160 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          {weekLabel}
        </div>

        {isCurrentWeek ? (
          <div
            style={{
              display: "inline-block",
              marginTop: 4,
              fontSize: 10,
              fontWeight: 500,
              color: colors.textMuted,
              background: colors.surfaceHover,
              border: `1px solid ${colors.border}`,
              borderRadius: 999,
              padding: "2px 8px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Current week
          </div>
        ) : (
          <button
            onClick={onGoToCurrent}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.textMuted,
              fontSize: 11,
              textDecoration: "underline",
              textUnderlineOffset: 2,
              padding: "2px 0",
              display: "block",
              margin: "4px auto 0",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
            }}
          >
            Back to current week
          </button>
        )}
      </div>

      <button onClick={onNext} className="nav-btn" aria-label="Next week">
        Next →
      </button>
    </nav>
  );
}