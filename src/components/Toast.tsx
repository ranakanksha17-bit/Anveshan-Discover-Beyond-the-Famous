import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-forest-700 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-saffron-600 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-white',
    info: 'border-forest-200 bg-white',
    warning: 'border-saffron-200 bg-white'
  };

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl shadow-card border ${borderColors[toast.type]} flex items-start space-x-3 transition-all duration-300 animate-slide-up`}
      role="status"
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-charcoal-900">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Close notification"
        className="text-charcoal-400 hover:text-charcoal-800 transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
