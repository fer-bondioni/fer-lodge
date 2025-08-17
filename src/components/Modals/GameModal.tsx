'use client';

interface GameModalProps {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export default function GameModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
  showCancelButton = false,
  confirmText = "Sí",
  cancelText = "Mmm, dejámelo pensar"
}: GameModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/90 border border-yellow-500 p-8 rounded-lg max-w-md w-full mx-4 transform transition-all">
        <p className="text-white text-xl text-center mb-8">{message}</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-colors"
          >
            {confirmText}
          </button>
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full transition-colors"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
