import { useState, useMemo } from "react";
import ShiftCard    from "./ShiftCard";
import AddShiftForm from "./AddShiftForm";
import { toDateKey, getDayMeta }     from "../utils/dateUtils";
import { sortShiftsChronologically } from "../utils/shiftUtils";
import { colors }                    from "../styles/tokens";

export default function DayColumn({ date, shifts, onAddShift, isToday, onToastError }) {
  const [formOpen, setFormOpen] = useState(false);

  const dateKey                        = toDateKey(date);
  const { dayName, dayNum, monthName } = getDayMeta(date);

  const sortedShifts = useMemo(
    () => sortShiftsChronologically(shifts[dateKey] ?? []),
    [shifts, dateKey]
  );

  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${isToday ? colors.accent : colors.border}`,
        borderRadius: 8,
        padding: "12px 10px 10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 12, userSelect: "none" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: isToday ? colors.accent : colors.textMuted,
            marginBottom: 4,
          }}
        >
          {dayName}
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isToday ? colors.accent : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: isToday ? colors.accentText : colors.textPrimary,
            }}
          >
            {dayNum}
          </span>
        </div>
        <div style={{ fontSize: 10, color: colors.textSubtle, marginTop: 3 }}>
          {monthName}
        </div>
      </div>

      <div style={{ height: 1, background: colors.border, marginBottom: 10 }} />

      <div style={{ flex: 1 }}>
        {sortedShifts.length === 0 && !formOpen && (
          <p
            style={{
              fontSize: 11,
              color: colors.textSubtle,
              textAlign: "center",
              marginTop: 10,
              userSelect: "none",
            }}
          >
            No shifts
          </p>
        )}
        {sortedShifts.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))}
      </div>

      {formOpen ? (
        <AddShiftForm
          dateKey={dateKey}
          existingShifts={sortedShifts}
          onAdd={onAddShift}
          onCancel={() => setFormOpen(false)}
          onToastError={onToastError}
        />
      ) : (
        <button
          onClick={() => setFormOpen(true)}
          aria-label={`Add shift on ${dayName} ${dayNum}`}
          className="add-shift-btn"
        >
          + Add shift
        </button>
      )}
    </div>
  );
}