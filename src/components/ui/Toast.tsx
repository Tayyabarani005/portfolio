import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      id="toast-notification"
      className="fixed bottom-24 sm:bottom-8 right-6 z-50 flex items-center gap-3 bg-[#1F1C17] text-[#F7F3E8] px-4 py-2.5 rounded-full text-sm font-body shadow-xl border border-[#1F1C17] transition-all duration-300"
    >
      <span className="w-2 h-2 rounded-full bg-[#F6DE8D]" />
      <span className="font-medium">{message}</span>
    </div>
  );
};
