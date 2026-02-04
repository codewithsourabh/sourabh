import { useAuth } from "@/_core/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Zap, Globe, Database, Workflow, ExternalLink, Github, Linkedin, Mail, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import ContactFormModal from "@/components/ContactFormModal";
import { generatePersonSchema, generateBreadcrumbSchema, injectStructuredData } from "@/lib/structuredData";

/**
 * Design System: Technical Elegance
 * Color: Deep slate blue (#1a2332) + Teal accent (#06b6d4)
 * Typography: Playfair Display (headings) + Inter (body) + JetBrains Mono (code)
 * Layout: Asymmetric with diagonal dividers and smooth animations
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const certificateImages = [
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/oxZtxTfHcqxzymkA.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/pMnbnjXQrLDNusKo.webp",
      alt: "ClickUp Capacity Planning Certificate",
      title: "ClickUp Capacity Planning Certified",
      date: "February 19, 2025",
      description: "Expertise in ClickUp capacity planning and resource management",
      verificationLink: "https://verify.skilljar.com/c/v674p9wvr93c",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/TPzjmtleZRxdSQEq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/hEzwOUflzfSWYjDK.webp",
      alt: "ClickUp Brain AI Expert Certificate",
      title: "ClickUp Brain AI Expert",
      date: "February 6, 2025",
      description: "Expert certification in ClickUp Brain AI and advanced automation",
      verificationLink: "https://verify.skilljar.com/c/ijkcf6byb7tw",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/fdADpeKbeCdEMekL.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/nxAmKQPjfITCpSKE.webp",
      alt: "ClickUp Expert Certificate",
      title: "ClickUp Expert Certified",
      date: "February 6, 2025",
      description: "Advanced expertise in ClickUp platform and features",
      verificationLink: "https://verify.skilljar.com/c/gabz69gkgksa",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/FYLWVMHbjjOsNsqq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/uiUIPfXJUpPSCgOS.webp",
      alt: "ClickUp Chat Knowledge Certificate",
      title: "ClickUp Chat Knowledge Certified",
      date: "February 5, 2025",
      description: "Expert knowledge in ClickUp Chat and AI-powered features",
      verificationLink: "https://verify.skilljar.com/c/vcdiyj78osi9",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/WJmfffGeVLIjKvDt.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/daXIzETXIpqVcekf.webp",
      alt: "ClickUp Admin Certificate",
      title: "ClickUp Admin Certified",
      date: "January 24, 2025",
      description: "Advanced ClickUp administration and workspace management",
      verificationLink: "https://verify.skilljar.com/c/f59m3kaust3k",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/awKtlfzkQQPDTqQj.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/MPAqRrzUsNuymdGp.webp",
      alt: "ClickUp for Guests Certificate",
      title: "ClickUp for Guests Certified",
      date: "January 20, 2025",
      description: "Expertise in managing ClickUp guest access and collaboration",
      verificationLink: "https://verify.skilljar.com/c/znneuu9necbe",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/IRfUraPwLXrcGefU.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/vbivHcZacYVnLEhe.webp",
      alt: "ClickUp Intermediate Certificate",
      title: "ClickUp Intermediate Certified",
      date: "January 15, 2025",
      description: "Intermediate-level proficiency in ClickUp workflows and automation",
      verificationLink: "https://verify.skilljar.com/c/b6zvturyawrs",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/dYUmwEgbdeNpShoI.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/aqHJqwkAPWYDHMsa.webp",
      alt: "ClickUp Novice Certificate",
      title: "ClickUp Novice Certified",
      date: "January 10, 2025",
      description: "Foundation-level knowledge of ClickUp basics and core features",
      verificationLink: "https://verify.skilljar.com/c/pizpvf24j34b",
    },
  ];

  const handleNextCertificate = () => {
    setCurrentCertificateIndex((prev) => (prev + 1) % certificateImages.length);
  };

  const handlePrevCertificate = () => {
    setCurrentCertificateIndex((prev) => (prev - 1 + certificateImages.length) % certificateImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCertificateIndex((prev) => (prev + 1) % certificateImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [certificateImages.length]);

  useEffect(() => {
    injectStructuredData(generatePersonSchema);
    injectStructuredData(generateBreadcrumbSchema);
  }, []);

  const navLinks = [
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];

  const skills = [
    { category: "CMS & CRM", items: ["WordPress", "HubSpot", "Zoho", "WooCommerce", "CMS Customization", "CRM Customization"] },
    { category: "Automation", items: ["Zapier", "ClickUp", "Workflow Automation", "Node.js Custom Actions", "Lead Capture Automation"] },
    { category: "Integrations", items: ["API Integration", "Salesforce", "Third-Party Services", "Data Synchronization", "Booking Systems"] },
    { category: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Performance Optimization"] },
    { category: "Analytics & SEO", items: ["Google Analytics", "Core Web Vitals", "Schema Markup", "XML Sitemaps", "Keyword Research", "Content Audits"] },
    { category: "E-Commerce & Digital", items: ["WooCommerce", "Amazon/Flipkart/Meesho Integration", "Inventory Management", "Digital Marketing", "Product Optimization"] },
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "Rajasthan Technical University",
      location: "Kota, Jaipur, India",
      period: "June 2018 – May 2022",
    },
  ];

  const experience = [
    {
      title: "HubSpot Engineer / Integration Engineer",
      company: "Current Role",
      period: "Aug 2025 – Present",
      highlights: [
        "Led end-to-end HubSpot-Salesforce integration for US financial loan processing platform with secure SSN linkage and compliance requirements",
        "Designed secure data synchronization between HubSpot Account records and financial identifiers ensuring accurate customer identification",
        "Integrated Salesforce APIs to fetch CIBIL/credit score data and trigger automated eligibility assessments",
        "Implemented rule-based automation workflows reducing manual data entry by 70% and improving processing speed",
      ],
    },
    {
      title: "WordPress Developer & CMS Specialist",
      company: "Freelance / Agency Work",
      period: "Jan 2023 – July 2025",
      highlights: [
        "Developed 15+ custom WordPress websites with advanced plugin development and theme customization",
        "Implemented WooCommerce integrations with Shopify, Amazon, and Flipkart for omnichannel e-commerce management",
        "Created automated lead capture systems using Zapier, reducing manual follow-up time by 60%",
        "Optimized website performance achieving 90+ Lighthouse scores and improving Core Web Vitals",
      ],
    },
    {
      title: "CRM & Automation Consultant",
      company: "Multiple Clients",
      period: "June 2022 – Dec 2022",
      highlights: [
        "Consulted on HubSpot implementation for SaaS companies, designing custom workflows and reporting dashboards",
        "Built Zapier automation sequences connecting 20+ business tools, eliminating manual data entry",
        "Trained teams on CRM best practices and workflow optimization resulting in 40% efficiency gains",
      ],
    },
  ];

  const projects = [
    {
      title: "HubSpot-Salesforce Integration Platform",
      description: "Enterprise integration solution connecting HubSpot and Salesforce with real-time data sync",
      tags: ["HubSpot", "Salesforce", "API Integration", "Data Sync"],
      link: "#",
    },
    {
      title: "E-Commerce Automation System",
      description: "Multi-channel e-commerce platform integrating WordPress, WooCommerce, Amazon, and Flipkart",
      tags: ["WordPress", "WooCommerce", "E-Commerce", "Automation"],
      link: "#",
    },
    {
      title: "Lead Capture & CRM Workflow",
      description: "Automated lead capture system using Zapier connecting web forms to HubSpot CRM",
      tags: ["Zapier", "HubSpot", "Lead Management", "Automation"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Sourabh</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm font-medium">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-sm font-semibold">Software Engineer • 5+ Years</span>
              </div>

              <div>
                <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                  Sourabh Saini
                  <br />
                  CRM & Automation <span className="text-cyan-600 dark:text-cyan-400">Expert</span>
                </h1>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Specializing in HubSpot, WordPress, and workflow automation. I build scalable digital solutions that streamline data flows, reduce manual effort, and drive business outcomes through intelligent integrations.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-base rounded-lg">
                  View My Work <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button variant="outline" className="px-8 py-6 text-base rounded-lg border-slate-300 dark:border-slate-600">
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Right - Hero Background Image */}
            <div className="relative h-96 md:h-full hidden md:block">
              <picture>
                <source srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/108200144/pNxGWNJPfnJvUmfL.avif" type="image/avif" />
                <source srcSet="https://files.manuscdn.com/user_upload_by_module/session_file/108200144/K4TKpLvMhcfKTmFe.webp" type="image/webp" />
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/108200144/K4TKpLvMhcfKTmFe.webp" alt="Hero Background" className="w-full h-full object-cover rounded-lg" loading="lazy" width={600} height={400} />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Professional Certifications</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">8 Industry-Recognized Certifications</p>
          </div>

          {/* Certificate Carousel */}
          <div className="relative max-w-2xl mx-auto">
            {/* Certificate Container */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 min-h-96 flex flex-col justify-between">
              {/* Certificate Image */}
              <div className="flex justify-center mb-6">
                <picture>
                  <source srcSet={certificateImages[currentCertificateIndex].srcAvif} type="image/avif" />
                  <source srcSet={certificateImages[currentCertificateIndex].srcWebp} type="image/webp" />
                  <img src={certificateImages[currentCertificateIndex].srcWebp} alt={certificateImages[currentCertificateIndex].alt} className="max-w-full max-h-96 md:max-h-[500px] object-contain" loading="lazy" width={400} height={300} />
                </picture>
              </div>

              {/* Certificate Details */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{certificateImages[currentCertificateIndex].title}</h3>
                  <svg aria-label="Verified" className="w-5 h-5" fill="rgb(0, 149, 246)" viewBox="0 0 40 40">
                    <title>Verified</title>
                    <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd" />
                  </svg>
                </div>
                <p className="text-slate-600 dark:text-slate-400">{certificateImages[currentCertificateIndex].date}</p>
                <p className="text-slate-600 dark:text-slate-400">{certificateImages[currentCertificateIndex].description}</p>
                <a href={certificateImages[currentCertificateIndex].verificationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold mt-4">
                  View Certificate <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button onClick={handlePrevCertificate} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-slate-900 dark:text-white" />
              </button>

              <div className="flex gap-2">
                {certificateImages.map((_, index) => (
                  <button key={index} onClick={() => setCurrentCertificateIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentCertificateIndex ? "bg-cyan-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                ))}
              </div>

              <button onClick={handleNextCertificate} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ChevronRight size={24} className="text-slate-900 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Skills & Expertise</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">Comprehensive technical and domain expertise</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Professional Experience</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">5+ years of expertise in CRM, automation, and web development</p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="p-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold mt-1">→</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">Showcase of successful implementations and solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer" onMouseEnter={() => setHoveredProject(index)} onMouseLeave={() => setHoveredProject(null)}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold">
                  Learn More <ArrowRight size={16} />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Have a project in mind? I'd love to hear about it. Let's work together to bring your ideas to life.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:sourabh@example.com" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 Sourabh Saini. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
