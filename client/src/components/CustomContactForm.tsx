import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
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
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const isFormValid = () => {
    // Check if all fields have values and are valid
    const hasAllValues = formData.fullName && formData.email && formData.phoneNumber && formData.message;
    const allValid = 
      validateFullName(formData.fullName) &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneNumber) &&
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
    if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        fullName: true,
        email: true,
        phoneNumber: true,
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
        message: "",
      });
      setErrors({});
      setTouched({});

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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-24 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

                {/* Message */}
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
