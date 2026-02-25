import { useState, useCallback } from "react";

const DEFAULT_DURATION = 3500; // ms

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "error", duration = DEFAULT_DURATION) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  // Convenience wrappers
  const toastError = useCallback((msg) => addToast(msg, "error"), [addToast]);
  const toastSuccess = useCallback(
    (msg) => addToast(msg, "success"),
    [addToast],
  );

  return { toasts, toastError, toastSuccess, dismiss };
}
