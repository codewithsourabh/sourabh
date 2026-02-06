import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
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
      // Store email in localStorage for now (can be connected to backend later)
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
    <section className="bg-slate-900 dark:bg-slate-950 text-white py-16 md:py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work <span className="text-cyan-400">Together</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            I'm open to discussing new projects, innovative ideas, and opportunities to be part of your vision.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button onClick={onContactClick} className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
            <a href="https://www.linkedin.com/in/sourabhxsaini/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </a>
            <a href="https://github.com/codewithsourabh" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-slate-800/50 rounded-lg p-8 mb-12 border border-slate-700">
            <h3 className="text-xl font-semibold mb-3 text-white">Stay Updated</h3>
            <p className="text-slate-300 text-sm mb-6">Subscribe to get the latest insights on CRM, automation, and web development.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
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

          <p className="text-slate-400 text-sm">
            © 2026 Sourabh. Software Engineer specializing in CRM and Automation Solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
