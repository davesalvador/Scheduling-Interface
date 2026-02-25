import { useState, useCallback, useEffect, useRef } from "react";

const DEFAULT_DURATION = 3500;

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const addToast = useCallback(
    (message, type = "error", duration = DEFAULT_DURATION) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  const toastError   = useCallback((msg) => addToast(msg, "error"),   [addToast]);
  const toastSuccess = useCallback((msg) => addToast(msg, "success"), [addToast]);

  return { toasts, toastError, toastSuccess, dismiss };
}