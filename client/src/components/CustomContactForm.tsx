import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  reasonToContact?: string;
  message?: string;
}

const COUNTRY_CODES = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+45", country: "Denmark" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+82", country: "South Korea" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+64", country: "New Zealand" },
  { code: "+27", country: "South Africa" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+54", country: "Argentina" },
  { code: "+56", country: "Chile" },
];

const REASON_TO_CONTACT = [
  "Job",
  "Project",
  "General",
];

const STORAGE_KEY = "contact_form_draft";
const AUTO_SAVE_DELAY = 1000; // 1 second

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
  // Phone number should be 7-15 digits
  const phoneRegex = /^\d{7,15}$/;
  return phoneRegex.test(phone);
};

const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};

const validateMessage = (msg: string): boolean => {
  return msg.trim().length >= 10;
};

export default function CustomContactForm({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    reasonToContact: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Real-time validation on blur
  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
    validateField(fieldName);
  };

  const validateField = (fieldName: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "fullName":
        if (!validateFullName(formData.fullName)) {
          newErrors.fullName = "Full name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "email":
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "phoneNumber":
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
          newErrors.phoneNumber = "Phone number must be 7-15 digits";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case "reasonToContact":
        if (!formData.reasonToContact) {
          newErrors.reasonToContact = "Please select a reason to contact";
        } else {
          delete newErrors.reasonToContact;
        }
        break;
      case "message":
        if (!validateMessage(formData.message)) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasUnsavedChanges(true);

    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    const newTimeout = setTimeout(() => {
      saveFormToDraft({
        fullName: formData.fullName,
        email: formData.email,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        reasonToContact: formData.reasonToContact,
        message: formData.message,
        [name]: value,
      });
    }, AUTO_SAVE_DELAY);

    setSaveTimeout(newTimeout);

    // Validate on change if field has been touched
    if (touched[name]) {
      const newErrors = { ...errors };

      switch (name) {
        case "fullName":
          if (!validateFullName(value)) {
            newErrors.fullName = "Full name must be at least 2 characters";
          } else {
            delete newErrors.fullName;
          }
          break;
        case "email":
          if (!value) {
            newErrors.email = "Email is required";
          } else if (!validateEmail(value)) {
            newErrors.email = "Please enter a valid email address";
          } else {
            delete newErrors.email;
          }
          break;
        case "phoneNumber":
          if (!value) {
            newErrors.phoneNumber = "Phone number is required";
          } else if (!validatePhoneNumber(value)) {
            newErrors.phoneNumber = "Phone number must be 7-15 digits";
          } else {
            delete newErrors.phoneNumber;
          }
          break;
        case "reasonToContact":
          if (!value) {
            newErrors.reasonToContact = "Please select a reason to contact";
          } else {
            delete newErrors.reasonToContact;
          }
          break;
        case "message":
          if (!validateMessage(value)) {
            newErrors.message = "Message must be at least 10 characters";
          } else {
            delete newErrors.message;
          }
          break;
      }

      setErrors(newErrors);
    }
  };

  const saveFormToDraft = (data: typeof formData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save form draft:", error);
    }
  };

  const loadFormFromDraft = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      }
    } catch (error) {
      console.error("Failed to load form draft:", error);
    }
  };

  const clearFormDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to clear form draft:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadFormFromDraft();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [saveTimeout]);

  const isFormValid = () => {
    // Check if all fields have values and are valid
    const hasAllValues = formData.fullName && formData.email && formData.phoneNumber && formData.reasonToContact && formData.message;
    const allValid = 
      validateFullName(formData.fullName) &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneNumber) &&
      formData.reasonToContact &&
      validateMessage(formData.message);
    const noErrors = Object.keys(errors).length === 0;
    
    return hasAllValues && allValid && noErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors: FormErrors = {};

    if (!validateFullName(formData.fullName)) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 7-15 digits";
    }
    if (!formData.reasonToContact) {
      newErrors.reasonToContact = "Please select a reason to contact";
    }
    if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        fullName: true,
        email: true,
        phoneNumber: true,
        reasonToContact: true,
        message: true,
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare data for HubSpot API
      const hubspotData = {
        fields: [
          {
            name: "full_name",
            value: formData.fullName,
          },
          {
            name: "email",
            value: formData.email,
          },
          {
            name: "phone",
            value: `${formData.countryCode}${formData.phoneNumber}`,
          },
          {
            name: "reason_to_contact",
            value: formData.reasonToContact,
          },
          {
            name: "message",
            value: formData.message,
          },
        ],
      };

      // Send to HubSpot API
      const response = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/48777585/fcdd20ca-b5dc-43a7-a2f5-1d459608767c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hubspotData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Success
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        countryCode: "+1",
        phoneNumber: "",
        reasonToContact: "",
        message: "",
      });
      setErrors({});
      setTouched({});
      clearFormDraft();

      // Auto-close after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        onClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 pt-12">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Get in Touch
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>

              {lastSaved && (
                <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
                  <Save className="w-3 h-3" />
                  <span>Auto-saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Full Name and Email */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("fullName")}
                      required
                      className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        touched.fullName && errors.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : touched.fullName && !errors.fullName
                            ? "border-green-500 focus:ring-green-500"
                            : "border-slate-300 dark:border-slate-600 focus:ring-cyan-500"
                      }`}
                      placeholder="John Doe"
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                    {touched.fullName && !errors.fullName && formData.fullName && (
                      <p className="text-green-500 text-xs mt-1">✓ Valid</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      required
                      className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        touched.email && errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : touched.email && !errors.email
                            ? "border-green-500 focus:ring-green-500"
                            : "border-slate-300 dark:border-slate-600 focus:ring-cyan-500"
                      }`}
                      placeholder="john@example.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                    {touched.email && !errors.email && formData.email && (
                      <p className="text-green-500 text-xs mt-1">✓ Valid email</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number and Reason To Contact */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Phone Number with Country Code */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-20 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <div className="flex-1">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur("phoneNumber")}
                          required
                          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                            touched.phoneNumber && errors.phoneNumber
                              ? "border-red-500 focus:ring-red-500"
                              : touched.phoneNumber && !errors.phoneNumber
                                ? "border-green-500 focus:ring-green-500"
                                : "border-slate-300 dark:border-slate-600 focus:ring-cyan-500"
                          }`}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                    {touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber && (
                      <p className="text-green-500 text-xs mt-1">✓ Valid phone number</p>
                    )}
                  </div>

                  {/* Reason To Contact */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Reason To Contact *
                    </label>
                    <select
                      name="reasonToContact"
                      value={formData.reasonToContact}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("reasonToContact")}
                      required
                      className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                        touched.reasonToContact && errors.reasonToContact
                          ? "border-red-500 focus:ring-red-500"
                          : touched.reasonToContact && !errors.reasonToContact
                            ? "border-green-500 focus:ring-green-500"
                            : "border-slate-300 dark:border-slate-600 focus:ring-cyan-500"
                      }`}
                    >
                      <option value="" disabled>
                        Select a reason...
                      </option>
                      {REASON_TO_CONTACT.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                    {touched.reasonToContact && errors.reasonToContact && (
                      <p className="text-red-500 text-xs mt-1">{errors.reasonToContact}</p>
                    )}
                    {touched.reasonToContact && !errors.reasonToContact && formData.reasonToContact && (
                      <p className="text-green-500 text-xs mt-1">✓ Selected</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Message (Full Width) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("message")}
                    required
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all resize-none ${
                      touched.message && errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : touched.message && !errors.message
                          ? "border-green-500 focus:ring-green-500"
                          : "border-slate-300 dark:border-slate-600 focus:ring-cyan-500"
                    }`}
                    placeholder="Your message here..."
                  />
                  <div className="flex justify-between items-start mt-1">
                    <div>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-xs">{errors.message}</p>
                      )}
                      {touched.message && !errors.message && formData.message && (
                        <p className="text-green-500 text-xs">✓ Valid message</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {formData.message.length}/10 min
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
