import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";

/**
 * Design System: Technical Elegance
 * Color: Deep slate blue (#1a2332) + Teal accent (#06b6d4)
 * Typography: Google Sans (headings) + Inter (body)
 * Layout: Clean, readable blog layout with card-based articles
 */

export default function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const articles = [
    {
      id: "hubspot-automation",
      title: "Mastering HubSpot Automation: Building Efficient Workflows",
      excerpt: "Learn how to design and implement powerful HubSpot workflows that automate lead nurturing, customer engagement, and sales processes.",
      date: "January 15, 2024",
      author: "Sourabh Saini",
      category: "HubSpot",
      readTime: "8 min read",
      content: `HubSpot automation is a game-changer for businesses looking to scale their operations without proportionally increasing manual effort. In this comprehensive guide, we'll explore how to design workflows that truly move the needle.

## Understanding HubSpot Workflows

HubSpot workflows are automated sequences of actions triggered by specific conditions. They're the backbone of modern marketing and sales automation, allowing you to nurture leads, segment contacts, and trigger timely communications.

## Key Components of Effective Workflows

1. **Enrollment Triggers**: Define when contacts enter your workflow. This could be based on form submissions, list membership, or custom properties.

2. **Conditions and Branches**: Use conditional logic to create personalized paths. Different contacts receive different experiences based on their behavior and characteristics.

3. **Actions**: Execute tasks like sending emails, updating properties, creating tasks, or triggering integrations.

4. **Delays**: Strategic delays ensure your communications feel natural and don't overwhelm contacts.

## Real-World Example: Lead Nurturing Workflow

Imagine a contact fills out a "Product Demo" form. Your workflow could:
- Send an immediate confirmation email
- Wait 2 days
- Send an educational email about your solution
- Wait 3 days
- If they haven't opened the email, send a follow-up
- If they opened it, send a product comparison guide
- After 5 days of no engagement, assign to sales team

## Best Practices

- **Keep it simple**: Complex workflows are hard to maintain and debug
- **Test thoroughly**: Use test contacts to validate your workflow logic
- **Monitor performance**: Track enrollment rates, completion rates, and engagement metrics
- **Iterate regularly**: Update workflows based on performance data
- **Document everything**: Keep clear notes on workflow purpose and logic

## Advanced Techniques

### Custom Properties
Use custom properties to store data that drives workflow decisions. This creates more sophisticated segmentation and personalization.

### Integration with External Systems
Connect HubSpot with tools like Zapier, Make, or custom APIs to extend workflow capabilities beyond HubSpot's native features.

### Lead Scoring Integration
Combine workflows with lead scoring to automatically escalate high-quality leads to your sales team.

## Measuring Workflow Success

Track these key metrics:
- Enrollment rate
- Completion rate
- Email open rates
- Click-through rates
- Conversion rates
- Time to conversion

By mastering HubSpot automation, you'll free up your team to focus on high-value activities while maintaining consistent, personalized customer engagement.`,
    },
    {
      id: "wordpress-seo",
      title: "WordPress SEO Optimization: A Complete Technical Guide",
      excerpt: "Master on-page and technical SEO for WordPress sites, including Core Web Vitals, schema markup, and performance optimization.",
      date: "January 10, 2024",
      author: "Sourabh Saini",
      category: "WordPress",
      readTime: "10 min read",
      content: `WordPress powers over 40% of the web, but many WordPress sites leave significant SEO performance on the table. This guide covers technical and on-page SEO strategies specific to WordPress.

## WordPress SEO Foundation

Before diving into tactics, understand that WordPress SEO rests on three pillars:
1. Technical SEO (site structure, performance, crawlability)
2. On-page SEO (content, keywords, metadata)
3. Off-page SEO (backlinks, authority)

## Technical SEO for WordPress

### Site Structure
- Use a logical URL structure: example.com/category/post-name/
- Ensure your homepage links to important pages
- Use breadcrumb navigation for better crawlability

### XML Sitemaps
- Enable XML sitemaps in your SEO plugin
- Submit to Google Search Console and Bing Webmaster Tools
- Update frequency should reflect your publishing schedule

### Robots.txt
- Ensure important pages aren't blocked
- Block low-value pages like admin areas and duplicate content

### Core Web Vitals
Google's Core Web Vitals are crucial ranking factors:
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

Optimize these through:
- Image optimization and lazy loading
- Minifying CSS and JavaScript
- Leveraging browser caching
- Using a Content Delivery Network (CDN)

## On-Page SEO Best Practices

### Keyword Research
- Use tools like SEMrush, Ahrefs, or Google Keyword Planner
- Target long-tail keywords with lower competition
- Analyze search intent for each keyword

### Title Tags and Meta Descriptions
- Keep titles under 60 characters
- Include your primary keyword naturally
- Write compelling meta descriptions (under 160 characters)

### Heading Structure
- Use H1 for your main title (only one per page)
- Use H2 for major sections
- Use H3 for subsections
- Ensure logical hierarchy

### Internal Linking
- Link to relevant internal pages
- Use descriptive anchor text
- Aim for 2-5 internal links per 1000 words

## Schema Markup

Implement schema markup to help search engines understand your content:
- Article schema for blog posts
- Organization schema for your site
- Product schema for e-commerce
- FAQ schema for common questions

## WordPress Plugins for SEO

Essential plugins:
- **Yoast SEO** or **Rank Math**: Comprehensive SEO optimization
- **WP Rocket**: Caching and performance
- **Smush**: Image optimization
- **Broken Link Checker**: Maintain site health

## Performance Optimization

- Enable gzip compression
- Minimize CSS and JavaScript
- Optimize images (WebP format when possible)
- Use a caching plugin
- Consider a CDN like Cloudflare

## Monitoring and Analysis

- Set up Google Search Console
- Monitor Core Web Vitals in Google PageSpeed Insights
- Track rankings with SEO tools
- Analyze user behavior with Google Analytics

By implementing these WordPress SEO strategies, you'll improve your site's visibility, user experience, and ultimately, conversions.`,
    },
    {
      id: "crm-integration",
      title: "Seamless CRM Integration: Connecting HubSpot with Your Tech Stack",
      excerpt: "Explore strategies for integrating HubSpot with WordPress, e-commerce platforms, and custom applications using APIs and automation.",
      date: "January 5, 2024",
      author: "Sourabh Saini",
      category: "Integration",
      readTime: "9 min read",
      content: `Modern businesses use multiple tools across their tech stack. The key to efficiency is making these tools work together seamlessly. This guide covers integrating HubSpot with your existing systems.

## Why CRM Integration Matters

A siloed CRM creates data inconsistencies and manual work. Integration ensures:
- Single source of truth for customer data
- Automated data synchronization
- Reduced manual data entry
- Better insights across systems

## Integration Methods

### 1. Native Integrations
HubSpot offers native integrations with popular platforms:
- WordPress (via HubSpot plugin)
- Shopify (e-commerce)
- Slack (team communication)
- Google Workspace (productivity)

These are the easiest to set up and maintain.

### 2. Zapier and Make
For platforms without native integrations, use automation platforms:
- Zapier: 6000+ app integrations
- Make (formerly Integromat): Visual workflow builder
- Pabbly Connect: Budget-friendly option

These are ideal for simple, trigger-based integrations.

### 3. Custom API Integration
For complex requirements, build custom integrations using HubSpot's REST API:
- Sync data bidirectionally
- Create custom workflows
- Build specialized data transformations

## HubSpot and WordPress Integration

### Setup Process
1. Install the HubSpot WordPress plugin
2. Connect your HubSpot account
3. Configure forms to sync with HubSpot
4. Map WordPress user data to HubSpot contacts

### Benefits
- Capture leads directly from your website
- Track website visitor behavior
- Sync WordPress user data to HubSpot
- Use HubSpot data to personalize WordPress content

### Best Practices
- Test form submissions thoroughly
- Map fields correctly to avoid data loss
- Use conditional logic for complex scenarios
- Monitor sync logs for errors

## E-Commerce Integration

### Shopify + HubSpot
- Sync customers and orders
- Track purchase behavior
- Create targeted campaigns based on purchase history
- Automate post-purchase workflows

### WooCommerce + HubSpot
- Use Zapier or custom integration
- Sync products, orders, and customers
- Create abandoned cart recovery workflows
- Track revenue per contact

## Data Mapping Best Practices

When integrating systems, proper data mapping is crucial:
- Identify corresponding fields in both systems
- Handle data type conversions (dates, numbers, text)
- Create fallback values for missing data
- Document all mappings

## Error Handling and Monitoring

- Set up alerts for failed syncs
- Monitor data quality regularly
- Create audit logs for compliance
- Establish rollback procedures

## Performance Considerations

- Batch API calls to avoid rate limits
- Schedule syncs during off-peak hours
- Cache frequently accessed data
- Monitor API usage and costs

## Security Best Practices

- Use OAuth for authentication
- Store API keys securely
- Encrypt sensitive data in transit
- Regularly audit access permissions
- Follow GDPR and CCPA compliance requirements

By implementing proper CRM integration, you'll create a unified system that drives efficiency and insights across your entire organization.`,
    },
    {
      id: "booking-system",
      title: "Building Real-Time Booking Systems: Integration and Synchronization",
      excerpt: "Learn how to implement real-time booking system integrations with HubSpot, handling availability sync, confirmation workflows, and customer management.",
      date: "December 28, 2023",
      author: "Sourabh Saini",
      category: "Integration",
      readTime: "7 min read",
      content: `Booking systems are critical for service-based businesses. Integrating them with your CRM ensures seamless customer management and operational efficiency.

## Booking System Architecture

A robust booking system requires:
- **Frontend**: User-facing booking interface
- **Backend**: Availability management and reservations
- **CRM Integration**: Customer data and communication
- **Calendar Sync**: Real-time availability updates

## Real-Time Availability Synchronization

### The Challenge
Multiple booking channels (website, phone, email) can lead to double-bookings if not synchronized.

### Solution: Webhook-Based Sync
1. When a booking is made, trigger a webhook
2. Update availability in real-time
3. Sync across all channels
4. Send confirmation to customer

### Implementation
- Use webhooks for immediate updates
- Implement queue systems for high-volume bookings
- Cache availability data for performance
- Implement conflict resolution logic

## HubSpot Integration for Booking Systems

### Contact Management
- Create/update contacts automatically
- Store booking history in contact properties
- Track customer preferences and notes
- Segment customers based on booking behavior

### Workflow Automation
- Send booking confirmations
- Reminder emails before appointments
- Follow-up after service completion
- Upsell opportunities based on history

### Custom Properties
Create custom properties to track:
- Booking frequency
- Average booking value
- Service preferences
- Cancellation history

## Handling Cancellations and Rescheduling

### Cancellation Workflow
1. Update availability immediately
2. Notify relevant parties
3. Log cancellation reason
4. Trigger follow-up workflow

### Rescheduling Process
1. Release original time slot
2. Check new availability
3. Update booking record
4. Send confirmation for new time

## Payment Integration

### Secure Payment Processing
- Use PCI-compliant payment processors (Stripe, PayPal)
- Implement secure payment forms
- Store payment tokens securely
- Handle refunds and disputes

### Payment Confirmation
- Sync payment status to HubSpot
- Trigger different workflows based on payment status
- Track revenue per customer

## Notification Strategy

### Customer Notifications
- Booking confirmation (immediate)
- Reminder (24 hours before)
- Post-service follow-up (24 hours after)
- Satisfaction survey (1 week after)

### Internal Notifications
- New booking alerts for staff
- Cancellation alerts
- Low availability alerts
- Revenue reports

## Handling Time Zones

For businesses serving multiple time zones:
- Store all times in UTC
- Convert to user's local time zone
- Handle daylight saving time changes
- Provide clear time zone information

## Scalability Considerations

- Database optimization for high-volume bookings
- Caching strategies for availability
- Load balancing for traffic spikes
- Queue systems for processing

## Compliance and Security

- GDPR compliance for customer data
- PCI DSS for payment processing
- Data encryption in transit and at rest
- Regular security audits

## Monitoring and Analytics

Track these metrics:
- Booking conversion rate
- Average booking value
- Cancellation rate
- Customer satisfaction
- Staff utilization

By implementing a well-integrated booking system, you'll improve customer experience, reduce manual work, and gain valuable business insights.`,
    },
    {
      id: "data-sync-strategies",
      title: "Data Synchronization Strategies: Ensuring Consistency Across Systems",
      excerpt: "Master data synchronization techniques to maintain consistency between HubSpot, WordPress, e-commerce platforms, and custom applications.",
      date: "December 20, 2023",
      author: "Sourabh Saini",
      category: "Integration",
      readTime: "8 min read",
      content: `Data inconsistency across systems is a common problem that leads to poor decision-making and customer experience. This guide covers strategies for maintaining synchronized data.\n\n## The Data Synchronization Challenge

When data exists in multiple systems:
- Updates in one system may not reflect in others
- Manual syncs are error-prone and time-consuming
- Conflicts can arise when updates happen simultaneously
- Audit trails become difficult to maintain

## Synchronization Approaches

### 1. Real-Time Sync (Event-Driven)
Data updates immediately when changes occur.

**Advantages:**
- Always up-to-date
- Immediate conflict detection
- Better user experience

**Disadvantages:**
- Higher complexity
- More API calls
- Requires robust error handling

**Implementation:**
- Use webhooks for immediate notifications
- Implement message queues (RabbitMQ, Kafka)
- Handle failed syncs with retry logic

### 2. Batch Sync (Scheduled)
Data syncs at regular intervals (hourly, daily).

**Advantages:**
- Simpler implementation
- Lower API costs
- Easier to debug

**Disadvantages:**
- Data lag between syncs
- Potential for larger conflicts
- May miss time-sensitive updates

**Implementation:**
- Schedule cron jobs for sync operations
- Use delta queries to sync only changes
- Implement checkpoints to track progress

### 3. Hybrid Approach
Combine real-time and batch syncing.

**Example:**
- Real-time sync for critical data (orders, payments)
- Batch sync for less critical data (analytics, preferences)
- Scheduled reconciliation to catch missed updates

## Data Mapping and Transformation

### Field Mapping
Create a mapping document:
- Source field → Destination field
- Data type conversions
- Default values for missing data
- Validation rules

### Data Transformation
Handle differences between systems:
- Format conversions (dates, phone numbers)
- Unit conversions (currency, measurements)
- Encoding differences (character sets)
- Calculated fields

### Example: Contact Sync
\`\`\`
HubSpot Contact -> WordPress User
- firstname -> first_name
- lastname -> last_name
- email -> user_email
- phone -> phone_number
- lifecyclestage -> user_role
\`\`\`

## Conflict Resolution

When the same data is updated in multiple systems simultaneously:

### Last-Write-Wins
The most recent update takes precedence.
- Simple but can lose data
- Works for non-critical fields

### Source Priority
Designate one system as the source of truth.
- Prevents conflicts
- May lose updates from other systems
- Good for master data

### Manual Review
Flag conflicts for human review.
- Ensures data integrity
- Requires manual intervention
- Best for critical data

### Merge Strategy
Combine data from both sources intelligently.
- Most sophisticated
- Requires custom logic
- Best for complex scenarios

## Error Handling and Recovery

### Error Detection
- Validate data before syncing
- Check for required fields
- Verify data types and formats
- Detect duplicate records

### Retry Logic
- Implement exponential backoff
- Set maximum retry attempts
- Log failed syncs for investigation
- Alert on repeated failures

### Rollback Procedures
- Maintain transaction logs
- Implement rollback for failed syncs
- Keep backup copies of data
- Document rollback procedures

## Monitoring and Logging

### Key Metrics
- Sync success rate
- Data lag time
- Conflict frequency
- API usage and costs

### Logging Strategy
- Log all sync operations
- Record data changes
- Track errors and resolutions
- Maintain audit trail for compliance

### Alerting
- Alert on sync failures
- Notify on data conflicts
- Monitor for performance degradation
- Track unusual patterns

## Performance Optimization

### API Optimization
- Use bulk operations when available
- Implement rate limiting
- Cache frequently accessed data
- Minimize API calls

### Database Optimization
- Index frequently queried fields
- Partition large tables
- Archive old data
- Optimize queries

### Network Optimization
- Use compression for data transfer
- Implement connection pooling
- Optimize payload size
- Use CDN for static data

## Security Considerations

### Data Protection
- Encrypt sensitive data in transit
- Use OAuth for authentication
- Implement role-based access control
- Audit access logs

### Compliance
- GDPR data retention policies
- CCPA data deletion requests
- HIPAA for healthcare data
- SOC 2 compliance

## Testing Strategy

### Unit Tests
- Test individual sync functions
- Verify data transformations
- Test error handling

### Integration Tests
- Test sync between systems
- Verify data consistency
- Test conflict resolution

### Load Tests
- Test with large datasets
- Simulate high-volume syncs
- Monitor performance

## Best Practices Summary

1. **Choose the right sync strategy** for your use case
2. **Document all mappings** and transformations
3. **Implement robust error handling** and recovery
4. **Monitor continuously** for issues
5. **Test thoroughly** before production
6. **Plan for scalability** from the start
7. **Maintain audit trails** for compliance

By implementing proper data synchronization strategies, you'll ensure consistency across your systems, improve data quality, and make better business decisions.`,
    },
  ];

  // Extract unique categories
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  // Filter articles based on selected category and search query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  if (selectedArticleId && selectedArticle) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
          <div className="container flex items-center justify-between h-16">
            <div className="text-xl font-bold text-cyan-600">Sourabh</div>
            <a href="/blog" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 md:py-20">
          <div className="container max-w-3xl">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{selectedArticle.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedArticle.date}</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose dark:prose-invert max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('```')) {
                  return (
                    <pre key={idx} className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4">
                      <code>{paragraph.replace(/```/g, '')}</code>
                    </pre>
                  );
                }
                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold text-cyan-600">Sourabh</div>
          <a href="/" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Blog & <span className="text-cyan-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Exploring HubSpot automation, WordPress optimization, and integration strategies to help you build scalable digital solutions.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Filter by:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-cyan-600 text-white"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-cyan-600 dark:hover:border-cyan-600"
                }`}
              >
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-cyan-600 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-cyan-600 dark:hover:border-cyan-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto md:min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
              Found {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-cyan-600 flex flex-col h-full"
                onClick={() => setSelectedArticleId(article.id)}
              >
                <div className="mb-4 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{article.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 hover:text-cyan-600 transition line-clamp-2">
                    {article.title}
                  </h2>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 w-full justify-center text-sm">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No articles found in this category. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to discuss these topics?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Reach out to discuss HubSpot implementations, WordPress optimization, or integration strategies for your business.
          </p>
          <a href="/#contact">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
