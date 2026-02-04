import { useAuth } from "@/_core/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Zap, Globe, Database, Workflow, ExternalLink, Github, Linkedin, Mail, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import CustomContactForm from "@/components/CustomContactForm";
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

  // Certificates sorted by date (newest first - descending order)
  const certificateImages = [
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/oxZtxTfHcqxzymkA.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/pMnbnjXQrLDNusKo.webp",
      alt: "ClickUp Capacity Planning Certificate",
      title: "ClickUp Capacity Planning Certified",
      date: "February 19, 2025",
      description: "Expertise in ClickUp capacity planning and resource management",
      verificationLink: "https://verify.skilljar.com/c/capacity-planning",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/fdADpeKbeCdEMekL.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/nxAmKQPjfITCpSKE.webp",
      alt: "ClickUp Expert Certificate",
      title: "ClickUp Expert Certified",
      date: "February 6, 2025",
      description: "Advanced expertise in ClickUp platform and features",
      verificationLink: "https://verify.skilljar.com/c/ijkcf6byb7tw",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/TPzjmtleZRxdSQEq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/hEzwOUflzfSWYjDK.webp",
      alt: "ClickUp Brain AI Expert Certificate",
      title: "ClickUp Brain AI Expert",
      date: "February 6, 2025",
      description: "Expert certification in ClickUp Brain AI and advanced automation",
      verificationLink: "https://verify.skilljar.com/c/brain-ai-expert",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/FYLWVMHbjjOsNsqq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/uiUIPfXJUpPSCgOS.webp",
      alt: "ClickUp Chat Knowledge Certificate",
      title: "ClickUp Chat Knowledge Certified",
      date: "February 5, 2025",
      description: "Expert knowledge in ClickUp Chat and AI-powered features",
      verificationLink: "https://verify.skilljar.com/c/chat-knowledge",
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
      verificationLink: "https://verify.skilljar.com/c/for-guests",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/IRfUraPwLXrcGefU.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/vbivHcZacYVnLEhe.webp",
      alt: "ClickUp Intermediate Certificate",
      title: "ClickUp Intermediate Certified",
      date: "January 15, 2025",
      description: "Intermediate-level proficiency in ClickUp workflows and automation",
      verificationLink: "https://verify.skilljar.com/c/intermediate",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/dYUmwEgbdeNpShoI.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/aqHJqwkAPWYDHMsa.webp",
      alt: "ClickUp Novice Certificate",
      title: "ClickUp Novice Certified",
      date: "January 10, 2025",
      description: "Foundation-level knowledge of ClickUp basics and core features",
      verificationLink: "https://verify.skilljar.com/c/novice",
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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).classList.add("loaded");
  };

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
        "Implemented rule-based automation for lead scoring and routing based on credit profiles and loan eligibility",
        "Reduced manual data entry by 85% through custom workflow automation and API integrations",
      ],
    },
    {
      title: "WordPress & HubSpot Specialist",
      company: "Freelance / Consulting",
      period: "Jan 2023 – July 2025",
      highlights: [
        "Developed and maintained 15+ WordPress websites with custom plugins and integrations",
        "Implemented HubSpot CRM for 20+ businesses, resulting in 40% increase in lead conversion",
        "Created automated workflows connecting WordPress forms to HubSpot for seamless lead capture",
        "Optimized website performance, improving Core Web Vitals scores by average 35%",
        "Managed WooCommerce stores with inventory sync and order automation",
      ],
    },
    {
      title: "Digital Solutions Developer",
      company: "Previous Experience",
      period: "June 2022 – Dec 2022",
      highlights: [
        "Built custom automation solutions using Zapier and Make (formerly Integromat)",
        "Integrated third-party APIs and services for business process automation",
        "Provided technical support and training to clients on CRM and automation tools",
        "Developed documentation and standard operating procedures for automation workflows",
      ],
    },
  ];

  const projects = [
    {
      title: "HubSpot-Salesforce Integration Platform",
      description: "Enterprise-grade integration connecting HubSpot and Salesforce for financial services",
      technologies: ["HubSpot API", "Salesforce API", "Node.js", "Data Sync"],
      link: "#",
    },
    {
      title: "WordPress E-Commerce Automation",
      description: "WooCommerce store with automated inventory and order management",
      technologies: ["WordPress", "WooCommerce", "Zapier", "Custom PHP"],
      link: "#",
    },
    {
      title: "Lead Capture & CRM Workflow",
      description: "Automated lead capture system with intelligent routing and scoring",
      technologies: ["HubSpot", "Zapier", "Google Sheets", "API Integration"],
      link: "#",
    },
  ];

  useEffect(() => {
    injectStructuredData(generatePersonSchema);
    injectStructuredData(generateBreadcrumbSchema);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="text-2xl font-bold text-cyan-600">
            Sourabh
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
        <div className="absolute inset-0 opacity-50">
          <picture>
            <source srcSet="https://cdn.sourabhsaini.com/assets/img/hero-bg.avif" type="image/avif" />
            <source srcSet="https://cdn.sourabhsaini.com/assets/img/hero-bg.webp" type="image/webp" />
            <img src="https://cdn.sourabhsaini.com/assets/img/hero-bg.webp" alt="Hero background" className="w-full h-full object-cover" />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-slate-900/90 dark:via-slate-900/70 dark:to-transparent" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Software Engineer • 5+ Years</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Sourabh Saini
              <br />
              <span>CRM & Automation <span className="gradient-underline text-cyan-600">Expert</span></span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Specializing in HubSpot, WordPress, and workflow automation. I build scalable digital solutions that streamline data flows, reduce manual effort, and drive business outcomes through intelligent integrations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#projects">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                  View My Work <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://drive.google.com/file/d/1OgR27VRHDhIFFNSH-1Jn4rQtsMvZbOex/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-slate-300 dark:border-slate-600">
                  Download Resume
                </Button>
              </a>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
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
              Proven track record of delivering enterprise-grade solutions and driving business growth
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <Card key={idx} className="p-8 border-l-4 border-l-cyan-600">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                    <p className="text-cyan-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-cyan-600 font-bold flex-shrink-0">•</span>
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
              Showcase of successful projects demonstrating technical expertise and business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded text-xs font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold group/link">
                    View Project <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Education <span className="text-cyan-600">&</span> Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Formal Education</h3>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <Card key={idx} className="p-6 border-l-4 border-l-cyan-600">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{edu.degree}</h4>
                    <p className="text-cyan-600 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{edu.location}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{edu.period}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certificate Gallery */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Professional Certifications</h3>
              <div className="relative max-w-md">
                <div className="relative bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative min-h-64 md:min-h-80 flex items-center justify-center bg-white dark:bg-slate-600 py-6 px-4">
                    <picture>
                      <source srcSet={certificateImages[currentCertificateIndex].srcAvif} type="image/avif" />
                      <source srcSet={certificateImages[currentCertificateIndex].srcWebp} type="image/webp" />
                      <img
                        src={certificateImages[currentCertificateIndex].srcWebp}
                        alt={certificateImages[currentCertificateIndex].alt}
                        loading="lazy"
                        width="700"
                        height="500"
                        onLoad={handleImageLoad}
                        className="max-w-full max-h-64 md:max-h-80 object-contain transition-opacity duration-500"
                      />
                    </picture>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevCertificate}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full transition-colors z-10"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextCertificate}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full transition-colors z-10"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Certificate Details */}
                <div className="p-4 bg-white dark:bg-slate-700">
                  <div className="flex items-start gap-2 mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white flex-1">
                      {certificateImages[currentCertificateIndex].title}
                    </h4>
                    <svg aria-label="Verified" className="w-5 h-5 flex-shrink-0" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
                      <title>Verified</title>
                      <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    {certificateImages[currentCertificateIndex].description}
                  </p>
                  <a href={certificateImages[currentCertificateIndex].verificationLink} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 w-full">
                      View Certificate <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Achieved: {certificateImages[currentCertificateIndex].date}</p>
                  </div>
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {certificateImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentCertificateIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        idx === currentCertificateIndex ? "bg-cyan-600" : "bg-slate-300 dark:bg-slate-600"
                      }`}
                      aria-label={`Go to certificate ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Certificate Counter */}
                <div className="text-center mt-3 text-xs text-slate-600 dark:text-slate-400">
                  Certificate {currentCertificateIndex + 1} of {certificateImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="text-cyan-600">Connect</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Have a project in mind? I'd love to hear about it. Let's work together to bring your ideas to life.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <CustomContactForm isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:contact@example.com" className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 rounded-full transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12">
        <div className="container text-center">
          <p>&copy; 2025 Sourabh Saini. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
