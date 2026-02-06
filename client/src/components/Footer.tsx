import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, ArrowUp } from "lucide-react";

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
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

          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Sourabh. Software Engineer specializing in CRM and Automation Solutions.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2 text-sm font-medium"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
