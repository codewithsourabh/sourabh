import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    try {
      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      formData.append("sureforms_form_submit", "7a9423dfb7");
      formData.append("_wp_http_referer", "/form/newsletter-form/");
      formData.append("form-id", "2716");
      formData.append("srfm-sender-email-field", "");
      formData.append("srfm-honeypot-field", "");
      formData.append("srfm-email-feda2b5b-lbl-RW1haWwgQWRkcmVzcyo-email-address", email);

      const response = await fetch(
        "https://whitesmoke-cormorant-464905.hostingersite.com/wp-json/sureforms/v1/submit-form",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 mb-12 border border-cyan-500/30 dark:border-cyan-500/20 not-prose mt-12">
      <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Stay Updated</h3>
      <p className="text-slate-700 dark:text-slate-300 text-sm mb-6">Subscribe to get the latest insights on CRM, automation, and web development.</p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          disabled={isSubscribing}
        />
        <Button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 whitespace-nowrap h-11 px-6 py-6"
          disabled={isSubscribing}
        >
          <Send className="w-4 h-4" />
          {isSubscribing ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
