import { useScheduler } from "./hooks/useScheduler";
import { useToast }     from "./hooks/useToast";
import WeekNav   from "./components/WeekNav";
import DayColumn from "./components/DayColumn";
import Toast     from "./components/Toast";
import { toDateKey } from "./utils/dateUtils";
import { colors }    from "./styles/tokens";

export default function App() {
  const {
    weekDays,
    weekLabel,
    todayKey,
    isCurrentWeek,
    shifts,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
    addShift,
  } = useScheduler();

  const { toasts, toastError, dismiss } = useToast();

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.4;
          cursor: pointer;
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }

        /* Responsive grid: 7 cols → 4 → 2 → 1 */
        .scheduler-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        @media (max-width: 1024px) {
          .scheduler-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 640px) {
          .scheduler-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 380px) {
          .scheduler-grid { grid-template-columns: 1fr; }
        }

        /* Add-shift button hover */
        .add-shift-btn {
          width: 100%;
          background: transparent;
          border: 1px dashed #27272a;
          color: #71717a;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          padding: 8px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          font-family: inherit;
          margin-top: 8px;
          letter-spacing: 0.01em;
        }
        .add-shift-btn:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255,255,255,0.04);
        }

        /* Nav button hover */
        .nav-btn {
          background: transparent;
          border: 1px solid #27272a;
          color: #fafafa;
          font-size: 13px;
          font-weight: 500;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          font-family: inherit;
        }
        .nav-btn:hover {
          background: #27272a;
          border-color: #3f3f46;
        }

        /* Form input focus */
        .time-input:focus {
          border-color: #71717a !important;
          outline: none;
        }

        /* Submit button hover */
        .submit-btn:not(:disabled):hover {
          opacity: 0.88;
        }
        .cancel-btn:hover {
          background: #27272a !important;
          color: #fafafa !important;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: colors.background,
          fontFamily: "'Inter', 'Geist', 'Segoe UI', system-ui, -apple-system, sans-serif",
          padding: "28px 20px 60px",
          color: colors.textPrimary,
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>

          {/* ── Header ──────────────────────────────────────── */}
          <header style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  margin: 0,
                  letterSpacing: "-0.04em",
                }}
              >
                Weekly Scheduler
              </h1>
            </div>
            <p style={{ color: colors.textMuted, margin: 0, fontSize: 13 }}>
              Manage your weekly shifts
            </p>

            {/* Hairline divider */}
            <div style={{ height: 1, background: colors.border, marginTop: 20 }} />
          </header>

          {/* ── Week Navigation ──────────────────────────────── */}
          <WeekNav
            weekLabel={weekLabel}
            isCurrentWeek={isCurrentWeek}
            onPrev={goToPrevWeek}
            onNext={goToNextWeek}
            onGoToCurrent={goToCurrentWeek}
          />

          {/* ── 7-Day Grid ───────────────────────────────────── */}
          <main aria-label="Week schedule" className="scheduler-grid">
            {weekDays.map((date) => {
              const dateKey = toDateKey(date);
              return (
                <DayColumn
                  key={dateKey}
                  date={date}
                  shifts={shifts}
                  onAddShift={addShift}
                  isToday={dateKey === todayKey}
                  onToastError={toastError}
                />
              );
            })}
          </main>

        </div>
      </div>

      {/* ── Toast Portal ─────────────────────────────────────── */}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </>
  );
}