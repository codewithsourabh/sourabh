# Project TODO

## Completed Features
- [x] Basic homepage layout with hero section
- [x] Navigation menu with links to sections and blog
- [x] Skills section with categories
- [x] Experience section with job details
- [x] Projects section
- [x] Blog page with article listing
- [x] Article filtering by category (HubSpot, WordPress, CRM, Integration)
- [x] Article search functionality
- [x] Individual article view with sticky table of contents
- [x] Author bio section with social media links
- [x] Share functionality (LinkedIn, Facebook, WhatsApp, Twitter, Copy Link)
- [x] AI summarization links (ChatGPT, Claude, Gemini)
- [x] Custom contact form modal with HubSpot API integration
- [x] Real-time form validation (email format, phone number validation)
- [x] Loading spinner and success confirmation for form submissions
- [x] Certificates carousel with 3 ClickUp certifications
- [x] CDN image hosting (cdn.sourabhsaini.com/assets/img)
- [x] Logo clickable linking to home page
- [x] Removed vercel.json (using Manus deployment)
- [x] **AVIF/WebP image format support with HTML picture element fallback**
- [x] Hero heading layout - "Sourabh Saini" on first line, "CRM & Automation Expert" on second line

## Pending Features
- [ ] Upload author photo to `/images/author-bio.jpg` for blog articles
- [ ] Add email notifications for form submissions (Zapier integration)
- [ ] Add testimonials/social proof section
- [ ] Add more certificates to carousel
- [ ] Implement lazy loading for images
- [ ] Add blog search and filtering enhancements

## Bug Fixes
- [x] Fixed certificate carousel images - changed from `w-full h-full object-contain` to `max-w-full max-h-96 md:max-h-[500px] object-contain` to prevent cropping and allow proper scaling

## In Progress
- [x] Add 5 new ClickUp certificates to carousel (Chat Knowledge, Expert, For Guests, Intermediate, Novice)

## Current Tasks
- [x] Replace 3 existing certificates with updated versions (Admin, Brain AI, Capacity Planning)
- [x] Add author bio image to blog articles with AVIF/WebP support

## Performance Optimization
- [x] Add lazy loading to certificate carousel images in Home.tsx
- [x] Add lazy loading to author bio image in Blog.tsx
- [x] Add lazy loading to blog article thumbnail images

## SEO & Performance Enhancements
- [x] Add explicit width/height and aspect-ratio CSS to all images
- [x] Implement blur-up placeholder effect for lazy-loaded images
- [x] Add JSON-LD structured data (Person, Article, BreadcrumbList)


## SEO Fixes
- [x] Add meta keywords and description tags to homepage


## Certificate Carousel Improvements
- [x] Sort certificates by date (newest first)
- [x] Add verification checkmarks next to certificate names
- [x] Fix spacing issues (top/bottom congestion)
- [x] Remove excess background on left/right sides
