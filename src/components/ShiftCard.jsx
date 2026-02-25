import { formatTime } from "../utils/shiftUtils";
import { colors } from "../styles/tokens";

/** Deterministic accent color based on start hour — adds visual variety */
function getAccentColor(startTime) {
  const accents = [
    { bar: "#6366f1", bg: "rgba(99,102,241,0.08)", text: "#818cf8" }, // indigo
    { bar: "#ec4899", bg: "rgba(236,72,153,0.08)", text: "#f472b6" }, // pink
    { bar: "#14b8a6", bg: "rgba(20,184,166,0.08)", text: "#2dd4bf" }, // teal
    { bar: "#f59e0b", bg: "rgba(245,158,11,0.08)", text: "#fbbf24" }, // amber
    { bar: "#8b5cf6", bg: "rgba(139,92,246,0.08)", text: "#a78bfa" }, // violet
    { bar: "#10b981", bg: "rgba(16,185,129,0.08)", text: "#34d399" }, // emerald
  ];
  const [h] = startTime.split(":").map(Number);
  return accents[h % accents.length];
}

/** "3h 30m" duration label */
function getDuration(startTime, endTime) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const totalMins = eh * 60 + em - (sh * 60 + sm);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function ShiftCard({ shift }) {
  const accent = getAccentColor(shift.startTime);
  const duration = getDuration(shift.startTime, shift.endTime);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 10,
        marginBottom: 6,
        borderRadius: 10,
        background: accent.bg,
        border: `1px solid ${accent.bar}22`,
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = `0 4px 16px ${accent.bar}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 3,
          background: accent.bar,
          flexShrink: 0,
          alignSelf: "stretch",
        }}
      />

      {/* Content */}
      <div style={{ padding: "8px 10px 8px 0", flex: 1 }}>
        {/* Time row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
              letterSpacing: "-0.01em",
            }}
          >
            {formatTime(shift.startTime)}
          </span>
          <span style={{ fontSize: 10, color: colors.textSubtle }}>→</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
              letterSpacing: "-0.01em",
            }}
          >
            {formatTime(shift.endTime)}
          </span>
        </div>

        {/* Duration pill */}
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 600,
            color: accent.text,
            background: `${accent.bar}18`,
            borderRadius: 999,
            padding: "1px 7px",
            letterSpacing: "0.03em",
          }}
        >
          {duration}
        </span>
      </div>
    </div>
  );
}
