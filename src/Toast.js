import { useEffect } from 'react';

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const bgColor = isSuccess ? 'bg-green-600' : isError ? 'bg-red-600' : 'bg-gray-700';

  return (
    <div
      className={`flex items-center gap-3 ${bgColor} text-white px-4 py-3 rounded shadow-lg min-w-[240px] max-w-sm`}
    >
      {isSuccess && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )}
      {isError && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      <span className="text-sm flex-1">{toast.message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white text-lg leading-none flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

export default ToastContainer;