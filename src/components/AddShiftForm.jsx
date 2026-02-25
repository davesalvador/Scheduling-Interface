import { useState } from "react";
import { validateShift } from "../utils/shiftUtils";
import { colors, btnBase, inputStyle, labelStyle } from "../styles/tokens";

export default function AddShiftForm({ dateKey, existingShifts, onAdd, onCancel, onToastError }) {
  const [startTime, setStartTime] = useState("");
  const [endTime,   setEndTime]   = useState("");

  const validationError = validateShift(startTime, endTime, existingShifts);
  const isValid         = startTime && endTime && !validationError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationError) {
      onToastError(validationError);
      return;
    }
    onAdd(dateKey, startTime, endTime);
    setStartTime("");
    setEndTime("");
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: 8,
        padding: "10px",
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <label htmlFor={`start-${dateKey}`} style={labelStyle}>Start</label>
        <input
          id={`start-${dateKey}`}
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={inputStyle}
          className="time-input"
          required
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label htmlFor={`end-${dateKey}`} style={labelStyle}>End</label>
        <input
          id={`end-${dateKey}`}
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={inputStyle}
          className="time-input"
          required
        />
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="submit"
          disabled={!isValid}
          aria-disabled={!isValid}
          className="submit-btn"
          style={{
            ...btnBase,
            flex: 1,
            background: isValid ? colors.accent    : colors.elevated,
            color:      isValid ? colors.accentText : colors.textMuted,
            cursor:     isValid ? "pointer"         : "not-allowed",
            opacity:    isValid ? 1                 : 0.5,
          }}
        >
          Add shift
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="cancel-btn"
          style={{
            ...btnBase,
            background: "transparent",
            border: `1px solid ${colors.border}`,
            color: colors.textMuted,
            transition: "background 0.15s, color 0.15s",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}