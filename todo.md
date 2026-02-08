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


## Icon Updates
- [x] Replace shield verification icon with Instagram-style verified checkmark


## Certificate Carousel Refinements
- [x] Remove background image from certificate picture tag
- [x] Add white background color to certificate container
- [x] Sort certificates by completion date (newest first)
- [x] Add verification links to certificate data
- [x] Add "View Certificate" button with verification link


## Blog Enhancement Features
- [x] Add arrow slide animation on hover to Read More button
- [x] Implement reading time badges on blog cards (e.g., "5 min read")


## Current Issues to Fix
- [x] Fix hero section background image - not displaying properly on mobile (cutting in half) - FIXED (hidden on mobile, visible on desktop)


## Social Sharing Enhancement
- [x] Add top 10 global social media platforms for blog post sharing (Facebook, Twitter/X, LinkedIn, WhatsApp, Reddit, Pinterest, Telegram, Email, Copy Link)
- [x] Create social sharing component with icons and share URLs
- [x] Integrate sharing functionality into blog post page
- [x] Write comprehensive vitest tests for social sharing functionality (17 tests covering URL generation, platform validation, and styling)
- [x] Convert horizontal social sharing icons to dropdown menu button format
- [x] Arrange Summarize and Share buttons side by side horizontally
- [x] Fix summarization error - "Failed to generate summary" (Added content cleaning, HTML tag removal, token limit handling, and improved error logging)
- [x] Add loading progress spinner (0-100%) while blog posts load
- [x] Fix progress spinner to cap at 100% maximum (Using Math.min to ensure value never exceeds 90% during loading, then 100% on completion)
- [x] Make progress spinner transition smooth from 1-100% continuously without stopping at 90% (Using requestAnimationFrame with exponential easing for natural-looking animation)
- [x] Refactor loading to show progress 0-100% then display article (load in background, show after 100%)
- [x] Ensure loader completes to 100% before showing article (guarantee full animation with 2-second minimum animation duration)
- [x] Implement circular progress spinner for blog page loading with same logic (0-100% then show posts)
- [x] Fix circular loader: reduce size and wait for actual data load before showing posts (Reduced from 120px to 80px, now waits for both animation AND data)
- [x] Fix circular loader loading twice - prevent effect from running multiple times (Used empty dependency array for animation effect, separated content visibility logic)
- [x] Fix category filter: reset loader and show articles after loading completes (Added effect to reset loader on category change, restart animation for category loads)
- [x] Fix loader stuck at 0% when clicking category - ensure animation starts properly (Changed to use isCategoryLoading instead of isLoading for category animation effect)

## Current Issues
- [x] Fix "Get in Touch" contact popup not opening (Added CustomContactForm to App.tsx and wired modal state)

## Form Updates
- [x] Add "Reason To Contact" dropdown field to contact form (Job, Project, General options)
- [x] Restructure form layout: Name/Email side by side, Phone/Reason side by side, Message full width (Grid layout with proper spacing)

## Form Improvements
- [x] Add placeholder to Reason To Contact dropdown instead of default selection (Empty by default, shows "Select a reason..." placeholder)

## Auto-Save Feature
- [x] Implement localStorage auto-save for contact form (1-second debounce on input changes)
- [x] Restore form data from localStorage on modal open (Loads draft when modal opens)
- [x] Clear saved data after successful form submission (Clears draft after successful HubSpot submission)
- [x] Add visual indicator showing when form is auto-saved (Shows "Auto-saved HH:MM:SS" with Save icon)

## UI Changes
- [x] Remove Contact Section from Home page (Removed "Let's Connect" section, contact still accessible via footer)

## SEO & Ad Network Files
- [x] Create ads.txt file with ad network verification data (Updated with Google AdSense: pub-6257979001505195)

## Comments Integration
- [x] Remove Disqus comments completely (User preference - free tier has limited customization options)

## Code Cleanup
- [x] Remove unused component files (Removed 28 unused components: AIChatBox, ContactFormModal, DashboardLayout, DashboardLayoutSkeleton, ManusDialog, Map, ComponentShowcase, and 21 unused UI components)
- [x] Update author bio to single paragraph (Kept only the first paragraph as requested by user)
- [x] Add social media links to author bio (Added Facebook, Instagram, LinkedIn, and X with sourabhxsaini handle)
- [x] Add "Follow Me On:" label before social icons (Added bold span with proper styling)
- [x] Layout social icons side by side with "Follow Me On:" label (Updated to flex layout with items-center)

## Newsletter & Footer
- [x] Add newsletter signup form to footer (Created "Stay Updated" section with email input and subscribe button, stores emails in localStorage)
- [x] Move newsletter form to blog article (Relocated newsletter signup to appear before author box in blog posts with gradient background styling)
- [x] Inject newsletter before last h2 heading in article content (Newsletter now appears within article content before the last h2 heading, not after content)
- [x] Update newsletter endpoint to custom WordPress API (Send JSON POST to https://whitesmoke-cormorant-464905.hostingersite.com/wp-json/custom/v1/newsletter with only email field, removed localStorage and other functionality)
- [x] Update related articles card design to match blog page cards (Added date, author, read time metadata and animated Read More button with underline effect)
- [x] Update author box mobile layout (Center-align author image, left-align description and social icons for mobile devices only)
- [x] Update contact modal mobile layout (Stack form fields vertically - one field per row on mobile devices)
- [x] Add country flags to country code dropdown (Display flag emojis next to country codes for better visual identification)
- [x] Expand country code dropdown to include all countries (Added 195+ countries with flags and calling codes, fixed duplicate key warnings)
- [x] Add country search/filter to dropdown (Created SearchableCountrySelect component with real-time search by country name or code)
- [x] Set default country based on IP geolocation (Integrated ipapi.co API to auto-detect visitor's country and pre-select country code)
- [x] Add popular countries section at top of dropdown (Marked 10 popular countries with priority display at the top of the list)
- [x] Add favicon files to public directory and link in HTML head (Added all 7 favicon files: android-chrome-192x192.png, android-chrome-512x512.png, apple-touch-icon.png, favicon.ico, favicon-16x16.png, favicon-32x32.png, site.webmanifest with proper HTML head tags)
- [x] Fix favicon 404 errors (Moved favicon files from root public/ to client/public/ directory to match Vite publicDir configuration)
- [x] Upload logo.svg to client/public/ directory (Copied logo.svg to public assets, accessible at /logo.svg)
- [x] Remove all static SEO meta tags and related logic from all pages (Removed meta description/keywords from index.html, removed structuredData imports/usage from Home.tsx, deleted structuredData.ts library file)
- [x] Implement AIOSEO integration for WordPress blog posts (Added SEOMetaTags component, aioseo-types.ts, updated WordPressPost interface with aioseo field, integrated SEOMetaTags in WordPressBlogPost with dynamic title/description/og:image/canonical URL)
- [x] Add console logging for AIOSEO data in blog posts (Added console.log statements in WordPressBlogPost to display AIOSEO availability and full data when articles are fetched, also added aioseo field to postBySlug router return)
