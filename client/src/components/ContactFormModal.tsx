import { X } from "lucide-react";
import { useEffect } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Load HubSpot form script when modal opens
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/48777585.js";
      script.defer = true;
      document.body.appendChild(script);

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6 pt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>

          {/* HubSpot Form Container */}
          <div className="hs-form-frame" data-region="na1" data-form-id="fcdd20ca-b5dc-43a7-a2f5-1d459608767c" data-portal-id="48777585"></div>
        </div>
      </div>
    </div>
  );
}
