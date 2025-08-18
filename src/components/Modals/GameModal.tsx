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
  cancelText = "Mmm, dejámelo pensar",
  isVictory = false
}: GameModalProps & { isVictory?: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`${
        isVictory 
          ? 'bg-red-900/90 border-4 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]' 
          : 'bg-black/90 border border-yellow-500'
        } p-8 rounded-lg max-w-md w-full mx-4 transform transition-all`}>
        <p className={`${
          isVictory 
            ? 'text-yellow-400 text-3xl font-bold tracking-wider' 
            : 'text-white text-xl'
          } text-center mb-4`}>{message}</p>
        {showCancelButton && !isVictory && (
          <p className="text-yellow-500/80 text-sm text-center mb-8 italic">
            Si continúas, las películas incorrectas desaparecerán y las correctas se iluminarán con un marco dorado
          </p>
        )}
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className={`${
              isVictory 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              } font-bold py-3 px-6 rounded-full transition-colors`}
          >
            {confirmText}
          </button>
          {showCancelButton && !isVictory && (
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
