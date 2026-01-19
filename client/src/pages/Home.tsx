import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Zap, Globe, Database, Workflow, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

/**
 * Design System: Technical Elegance
 * Color: Deep slate blue (#1a2332) + Teal accent (#06b6d4)
 * Typography: Playfair Display (headings) + Inter (body) + JetBrains Mono (code)
 * Layout: Asymmetric with diagonal dividers and smooth animations
 */

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const skills = [
    { category: "CMS & CRM", items: ["WordPress", "HubSpot", "Zoho", "WooCommerce"] },
    { category: "Automation", items: ["Zapier", "ClickUp", "Workflow Automation", "Node.js Custom Actions"] },
    { category: "Integrations", items: ["API Integration", "Salesforce", "Third-Party Services", "Data Synchronization"] },
    { category: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React"] },
    { category: "Analytics & SEO", items: ["Google Analytics", "Core Web Vitals", "Schema Markup", "Keyword Research"] },
  ];

  const experience = [
    {
      title: "HubSpot Engineer / Integration Engineer",
      company: "Current Role",
      period: "Aug 2025 – Dec 2026",
      highlights: [
        "Led end-to-end HubSpot-Salesforce integration for US financial loan platform",
        "Designed secure data synchronization with compliance requirements",
        "Implemented custom Node.js workflow actions for advanced decision logic",
      ],
    },
    {
      title: "Software/HubSpot Engineer",
      company: "Previous Role",
      period: "Feb 2024 – Aug 2025",
      highlights: [
        "Developed and maintained company websites with enhanced UX",
        "Automated workflows using HubSpot and ClickUp",
        "Customized CRM/CMS platforms for business processes",
      ],
    },
    {
      title: "HubSpot Integration Engineer",
      company: "Earlier Role",
      period: "Mar 2023 – Feb 2024",
      highlights: [
        "Developed WooCommerce websites integrated with HubSpot",
        "Streamlined data flow through Zapier automation",
        "Created custom APIs for cross-platform functionality",
      ],
    },
  ];

  const projects = [
    {
      title: "Financial Loan Automation Platform",
      description: "End-to-end HubSpot-Salesforce integration for secure loan processing with real-time eligibility assessment",
      technologies: ["HubSpot", "Salesforce", "Node.js", "Data Sync", "Compliance"],
      impact: "Automated loan qualification with 99.9% accuracy",
    },
    {
      title: "Travel Industry CRM Integration",
      description: "Comprehensive integration connecting HubSpot with booking platforms and customer communication tools",
      technologies: ["HubSpot", "Booking Engines", "Webhooks", "Analytics", "GDPR"],
      impact: "Deduplication of 50,000+ CRM records with real-time dashboards",
    },
    {
      title: "Financial Services Lead Management",
      description: "Integration architecture for lead capture, qualification, and compliance automation",
      technologies: ["HubSpot", "Financial APIs", "Compliance Tools", "Reporting"],
      impact: "Automated quarterly reporting and advisor segmentation",
    },
    {
      title: "Healthcare Provider Network Management",
      description: "Integration workflows for provider credentials, licensing, and referral network synchronization",
      technologies: ["HubSpot", "EHR Systems", "HIPAA", "Webhooks", "Scheduling"],
      impact: "Automated license expiration alerts and network coverage analysis",
    },
  ];

  const certifications = [
    "8x ClickUp Certified – ClickUp University",
    "HubSpot Marketing & Automation – HubSpot Academy",
    "WordPress Certified – WordPress.org",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold text-cyan-600">Sourabh</div>
          <div className="flex gap-8 items-center">
            <a href="#skills" className="text-sm hover:text-cyan-600 transition">Skills</a>
            <a href="#experience" className="text-sm hover:text-cyan-600 transition">Experience</a>
            <a href="#projects" className="text-sm hover:text-cyan-600 transition">Projects</a>
            <a href="#contact" className="text-sm hover:text-cyan-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
        <div className="absolute inset-0 opacity-50">
          <img src="/images/hero-bg.jpg" alt="Hero background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-slate-900/90 dark:via-slate-900/70 dark:to-transparent" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Software Engineer • 5+ Years</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              CRM & Automation <span className="gradient-underline text-cyan-600">Expert</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Specializing in HubSpot, WordPress, and workflow automation. I build scalable digital solutions that streamline data flows, reduce manual effort, and drive business outcomes through intelligent integrations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                View My Work <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-slate-300 dark:border-slate-600">
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Core <span className="text-cyan-600">Expertise</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              A comprehensive skill set spanning CMS, CRM, automation, and modern web technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow card-hover">
                <div className="flex items-start gap-4 mb-4">
                  {idx === 0 && <Globe className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 1 && <Zap className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 2 && <Code2 className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 3 && <Database className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 4 && <Workflow className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Accent Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="/images/skills-accent.jpg" alt="Skills accent" className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="text-cyan-600">Journey</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              5+ years of experience building and integrating CRM and CMS platforms
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <Card key={idx} className="p-8 border-l-4 border-l-cyan-600 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-cyan-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-cyan-600">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              Complex integrations and automation solutions delivered across multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className="p-8 card-hover cursor-pointer group"
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-600 transition">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
                    {project.impact}
                    {hoveredProject === idx && <ArrowRight className="w-4 h-4" />}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Projects Accent Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="/images/projects-accent.jpg" alt="Projects accent" className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            <span className="text-cyan-600">Certifications</span> & Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow card-hover">
                <div className="text-4xl font-bold text-cyan-600 mb-3">✓</div>
                <p className="font-semibold text-slate-900 dark:text-white">{cert}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work <span className="text-cyan-400">Together</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              I'm open to discussing new projects, innovative ideas, and opportunities to be part of your vision.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>

            <p className="text-slate-400 text-sm">
              © 2026 Sourabh. Software Engineer specializing in CRM and Automation Solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
