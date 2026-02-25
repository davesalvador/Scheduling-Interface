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
          <header style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: colors.textPrimary,
                margin: "0 0 4px",
                letterSpacing: "-0.04em",
              }}
            >
              Weekly Scheduler
            </h1>
            <p style={{ color: colors.textMuted, margin: 0, fontSize: 13 }}>
              Manage your weekly shifts
            </p>
            <div style={{ height: 1, background: colors.border, marginTop: 20 }} />
          </header>

          <WeekNav
            weekLabel={weekLabel}
            isCurrentWeek={isCurrentWeek}
            onPrev={goToPrevWeek}
            onNext={goToNextWeek}
            onGoToCurrent={goToCurrentWeek}
          />

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

      <Toast toasts={toasts} onDismiss={dismiss} />
    </>
  );
}