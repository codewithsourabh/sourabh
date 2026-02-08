import { useAuth } from "@/_core/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Zap, Globe, Database, Workflow, ExternalLink, Github, Linkedin, Mail, Menu, X, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import CustomContactForm from "@/components/CustomContactForm";

import { useTheme } from "@/contexts/ThemeContext";

/**
 * Design System: Technical Elegance
 * Color: Deep slate blue (#1a2332) + Teal accent (#06b6d4)
 * Typography: Playfair Display (headings) + Inter (body) + JetBrains Mono (code)
 * Layout: Asymmetric with diagonal dividers and smooth animations
 */

interface HomeProps {
  onContactClick?: () => void;
}

export default function Home({ onContactClick }: HomeProps) {
  usePageTitle("Sourabh Saini - CRM & Automation Expert | HubSpot, WordPress, Workflow Automation");
  
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Keyboard shortcut for dark mode toggle (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);



  // Certificates sorted by date (newest first)
  const certificateImages = [
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
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/TPzjmtleZRxdSQEq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/hEzwOUflzfSWYjDK.webp",
      alt: "ClickUp Brain AI Expert Certificate",
      title: "ClickUp Brain AI Expert",
      date: "February 6, 2025",
      description: "Expert certification in ClickUp Brain AI and advanced automation",
      verificationLink: "http://verify.skilljar.com/c/ijkcf6byb7tw",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/oxZtxTfHcqxzymkA.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/pMnbnjXQrLDNusKo.webp",
      alt: "ClickUp Capacity Planning Certificate",
      title: "ClickUp Capacity Planning Certified",
      date: "February 19, 2025",
      description: "Expertise in ClickUp capacity planning and resource management",
      verificationLink: "http://verify.skilljar.com/c/v674p9wvr93c",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/FYLWVMHbjjOsNsqq.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/uiUIPfXJUpPSCgOS.webp",
      alt: "ClickUp Chat Knowledge Certificate",
      title: "ClickUp Chat Knowledge Certified",
      date: "February 5, 2025",
      description: "Expert knowledge in ClickUp Chat and AI-powered features",
      verificationLink: "http://verify.skilljar.com/c/vcdiyj78osi9",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/fdADpeKbeCdEMekL.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/nxAmKQPjfITCpSKE.webp",
      alt: "ClickUp Expert Certificate",
      title: "ClickUp Expert Certified",
      date: "February 6, 2025",
      description: "Advanced expertise in ClickUp platform and features",
      verificationLink: "http://verify.skilljar.com/c/gabz69gkgksa",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/awKtlfzkQQPDTqQj.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/MPAqRrzUsNuymdGp.webp",
      alt: "ClickUp for Guests Certificate",
      title: "ClickUp for Guests Certified",
      date: "January 20, 2025",
      description: "Expertise in managing ClickUp guest access and collaboration",
      verificationLink: "http://verify.skilljar.com/c/znneuu9necbe",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/IRfUraPwLXrcGefU.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/vbivHcZacYVnLEhe.webp",
      alt: "ClickUp Intermediate Certificate",
      title: "ClickUp Intermediate Certified",
      date: "January 15, 2025",
      description: "Intermediate-level proficiency in ClickUp workflows and automation",
      verificationLink: "http://verify.skilljar.com/c/b6zvturyawrs",
    },
    {
      srcAvif: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/dYUmwEgbdeNpShoI.avif",
      srcWebp: "https://files.manuscdn.com/user_upload_by_module/session_file/108200144/aqHJqwkAPWYDHMsa.webp",
      alt: "ClickUp Novice Certificate",
      title: "ClickUp Novice Certified",
      date: "January 10, 2025",
      description: "Foundation-level knowledge of ClickUp basics and core features",
      verificationLink: "http://verify.skilljar.com/c/pizpvf24j34b",
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
    const handleImageLoad = (event: Event) => {
      const img = event.target as HTMLImageElement;
      img.classList.add('loaded');
    };

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
      if ((img as HTMLImageElement).complete) {
        img.classList.add('loaded');
      }
    });

    return () => {
      lazyImages.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
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
        "Implemented rule-based automation to classify loan applications as Qualified or Not Qualified based on predefined business criteria",
        "Developed custom-coded actions within HubSpot workflows using Node.js for advanced decision logic and cross-system orchestration",
        "Established bi-directional data synchronization between HubSpot and Salesforce for customers, deals, and qualification status updates",
        "Implemented robust error handling, validation, logging, and monitoring in collaboration with compliance teams to meet financial regulations",
      ],
    },
    {
      title: "Software/HubSpot Engineer",
      company: "Outdoor Norway",
      period: "Feb 2024 – Aug 2025",
      highlights: [
        "Developed and maintained company websites, enhancing user experience and engagement",
        "Collaborated with cross-functional teams to automate workflows using HubSpot and ClickUp for improved operational efficiency",
        "Customized CRM and CMS platforms to support business processes, reporting needs, and customer journey optimization",
        "Built comprehensive integration system connecting HubSpot CRM with booking management platforms and customer communication tools",
        "Developed automated workflows to sync lead data from multiple touchpoints including website inquiries, partner referrals, and trade show contacts",
        "Implemented data standardization and normalization processes to clean customer information across disparate booking systems",
        "Created custom webhooks to trigger automated email sequences based on booking stages and customer segmentation",
        "Developed reporting dashboards providing real-time visibility into sales pipeline, conversion rates by travel package, and partner performance metrics",
      ],
    },
    {
      title: "HubSpot Integration Engineer",
      company: "Murmu Software Infotech",
      period: "Mar 2023 – Feb 2024",
      highlights: [
        "Developed and maintained WooCommerce websites using WordPress and integrated them seamlessly with HubSpot CRM",
        "Streamlined data flow through automation and system integration using Zapier with various third-party service platforms",
        "Created and customized APIs to enhance cross-platform functionality and enable seamless data exchange",
        "Implemented CRM customizations to improve client engagement and satisfaction through personalized workflows",
        "Designed integration architecture connecting HubSpot with financial data providers and compliance monitoring tools for B2B fintech company",
        "Built automated workflows to capture, qualify, and route leads from webinars, content downloads, and partner referral channels",
        "Integrated financial intelligence APIs to enrich CRM records with firmographics, investment focus areas, and regulatory status",
        "Developed compliance-focused automation to flag regulated communications and maintain audit-ready documentation trails",
      ],
    },
    {
      title: "Software Engineer",
      company: "Kadel Labs Pvt Ltd",
      period: "Feb 2022 – Feb 2023",
      highlights: [
        "Architected multi-step Zapier workflows, improving data accuracy by 30% and reducing manual effort by 40%",
        "Developed custom WordPress themes and plugins for clients, integrating CRMs to automate lead capture and synchronization",
        "Optimized WordPress performance using caching, lazy loading, and CDN implementation, reducing page load times by 40% and improving Core Web Vitals",
        "Documented HubSpot, WordPress, and Zapier integration workflows for marketing teams, enabling faster adoption and self-service troubleshooting",
        "Designed and implemented integration workflows between HubSpot and healthcare provider databases for B2B health tech platform",
        "Developed automated data pipelines to sync provider credentials, licensing details, and referral networks into HubSpot custom objects",
        "Built field mapping logic to standardize medical specialties, insurance networks, and facility information across multiple data sources",
        "Created webhook-driven compliance automation to trigger alerts for upcoming provider license expirations",
        "Implemented data validation processes to ensure credential accuracy while maintaining HIPAA-compliant data handling",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "Outdoor Norway",
      period: "Feb 2021 – Jan 2022",
      highlights: [
        "Built Outdoor Norway's website from scratch using a custom, responsive WordPress theme with modular architecture",
        "Integrated a third-party booking system to synchronize real-time availability and manage customer reservations",
        "Implemented technical and on-page SEO strategies including schema markup, meta tags, XML sitemaps, and site-speed optimizations",
        "Configured Google Analytics and Search Console, conducted keyword research and content audits to improve search rankings",
        "Achieved significant improvements in organic visibility and user engagement through comprehensive SEO implementation",
      ],
    },
    {
      title: "E-Commerce Intern",
      company: "Adigo Apparels",
      period: "Jun 2020 – Jul 2020",
      highlights: [
        "Created and managed spreadsheets for bulk upload of hundreds of women's apparel items with multiple size, color, and style variations",
        "Successfully uploaded products to Amazon, Flipkart, and Meesho with accurate categorization and pricing",
        "Mapped and validated product attributes (SKUs, pricing, tags, categories) to guarantee error-free bulk uploads and consistent storefront presentation",
        "Retouched and optimized product photography including background removal, color correction, and resizing to enhance visual appeal",
        "Performed post-upload QA on live listings, diagnosing import issues and synchronizing inventory levels across platforms",
        "Maintained data accuracy across multiple e-commerce platforms through rigorous quality assurance processes",
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
    {
      title: "E-Commerce Platform Integration",
      description: "Multi-platform e-commerce solution with bulk product uploads and inventory synchronization across Amazon, Flipkart, and Meesho",
      technologies: ["WooCommerce", "Amazon API", "Flipkart Integration", "Meesho API", "Inventory Management"],
      impact: "Successfully managed 1000+ product listings with automated inventory sync and 99% accuracy",
    },
    {
      title: "Travel Booking System Integration",
      description: "Real-time booking system integration with availability synchronization and automated reservation management",
      technologies: ["WordPress", "Booking Engine", "Real-time Sync", "Payment Gateway", "HubSpot"],
      impact: "Seamless real-time availability updates reducing booking conflicts by 100%",
    },
  ];

  const certifications = [
    {
      title: "8x ClickUp Certified",
      issuer: "ClickUp University",
      description: "Advanced expertise in ClickUp project management, workflow automation, and team collaboration. Demonstrates mastery of automation features and custom workflows.",
      icon: "Workflow",
    },
    {
      title: "HubSpot Marketing & Automation",
      issuer: "HubSpot Academy",
      description: "Comprehensive certification in HubSpot CRM, marketing automation, lead nurturing, and workflow design. Covers advanced integration and compliance requirements.",
      icon: "Zap",
    },
    {
      title: "WordPress Certified",
      issuer: "WordPress.org",
      description: "Professional certification in WordPress development, theme customization, plugin development, and site optimization. Includes SEO and performance best practices.",
      icon: "Globe",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20 md:py-32">
        <div className="absolute inset-0 opacity-50 hidden md:block">
          <picture>
            <source srcSet="https://cdn.sourabhsaini.com/assets/img/hero-bg.avif" type="image/avif" />
            <source srcSet="https://cdn.sourabhsaini.com/assets/img/hero-bg.webp" type="image/webp" />
            <img src="https://cdn.sourabhsaini.com/assets/img/hero-bg.webp" alt="Hero background" className="w-full h-full object-contain md:object-cover object-center" />
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

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skills.map((skillGroup, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow card-hover">
                <div className="flex items-start gap-4 mb-4">
                  {idx === 0 && <Globe className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 1 && <Zap className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 2 && <Code2 className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 3 && <Database className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 4 && <Workflow className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
                  {idx === 5 && <Globe className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />}
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
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-600">Education</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              Formal education in Computer Science Engineering with continuous professional development
            </p>
          </div>

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <Card key={idx} className="p-8 border-l-4 border-l-cyan-600 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-cyan-600 font-semibold">{edu.institution}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{edu.location}</p>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">{edu.period}</span>
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

          <div className="grid md:grid-cols-2 gap-8">
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
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyan-600">Certifications</span> & Credentials
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
              Professional certifications demonstrating expertise in CRM platforms, automation tools, and web development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, idx) => {
              const IconComponent = idx === 0 ? Workflow : idx === 1 ? Zap : Globe;
              return (
                <Card key={idx} className="p-8 border-t-4 border-t-cyan-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cert.title}</h3>
                      <p className="text-sm text-cyan-600 font-medium">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Certificate Carousel */}
          <div className="mt-20 pt-20 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-8 text-center">Certificate <span className="text-cyan-600">Gallery</span></h3>
            
            <div className="relative max-w-3xl mx-auto px-4">
              {/* Carousel Container */}
              <div className="relative bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg">
                {/* Certificate Image */}
                <div className="relative min-h-80 md:min-h-[450px] flex items-center justify-center bg-white dark:bg-slate-600 py-8 px-6">
                  <picture>
                    <source srcSet={certificateImages[currentCertificateIndex].srcAvif} type="image/avif" />
                    <source srcSet={certificateImages[currentCertificateIndex].srcWebp} type="image/webp" />
                    <img
                      src={certificateImages[currentCertificateIndex].srcWebp}
                      alt={certificateImages[currentCertificateIndex].alt}
                      loading="lazy"
                      width="700"
                      height="500"
                      className="max-w-full max-h-80 md:max-h-[420px] object-contain transition-opacity duration-500"
                    />
                  </picture>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevCertificate}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextCertificate}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Certificate Details */}
              <div className="p-6 bg-white dark:bg-slate-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {certificateImages[currentCertificateIndex].title}
                      </h4>
                      <svg aria-label="Verified" className="w-5 h-5" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
                        <title>Verified</title>
                        <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {certificateImages[currentCertificateIndex].description}
                    </p>
                    <a href={certificateImages[currentCertificateIndex].verificationLink} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                        View Certificate <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Achieved</p>
                    <p className="text-lg font-semibold text-cyan-600">
                      {certificateImages[currentCertificateIndex].date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {certificateImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCertificateIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentCertificateIndex ? "bg-cyan-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                    aria-label={`Go to certificate ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Certificate Counter */}
              <div className="text-center mt-4 text-sm text-slate-600 dark:text-slate-400">
                Certificate {currentCertificateIndex + 1} of {certificateImages.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <CustomContactForm isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
