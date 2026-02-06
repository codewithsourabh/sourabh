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
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      }
      
      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
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
          className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 whitespace-nowrap"
          disabled={isSubscribing}
        >
          <Send className="w-4 h-4" />
          {isSubscribing ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
