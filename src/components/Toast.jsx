import { colors } from "../styles/tokens";

/** Single toast item */
function ToastItem({ toast, onDismiss }) {
  const isError = toast.type === "error";
  const isSuccess = toast.type === "success";

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 14px",
        borderRadius: 8,
        border: `1px solid ${isError ? colors.dangerBorder : "#166534"}`,
        background: isError ? colors.dangerBg : "#052e16",
        color: isError ? colors.danger : colors.success,
        fontSize: 13,
        fontWeight: 500,
        boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
        minWidth: 260,
        maxWidth: 360,
        animation: "toastIn 0.2s ease",
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>
        {isError ? "✕" : "✓"}
      </span>

      {/* Message */}
      <span style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</span>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "inherit",
          opacity: 0.6,
          fontSize: 13,
          padding: 0,
          flexShrink: 0,
          marginTop: 1,
          fontFamily: "inherit",
        }}
      >
        ✕
      </button>
    </div>
  );
}

/** Toast stack — renders in bottom-right corner */
export default function Toast({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
