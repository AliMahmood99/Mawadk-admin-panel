# Customization Guide

Quick reference for common customizations you might want to make to your Feedlot Management Consulting website.

## 🎨 Visual Customizations

### Change Color Scheme

**File**: `tailwind.config.ts`

```typescript
colors: {
  primary: { DEFAULT: "#YOUR_COLOR" },    // Navy Blue by default
  secondary: { DEFAULT: "#YOUR_COLOR" },   // Steel Blue by default
  accent: { DEFAULT: "#YOUR_COLOR" },      // Emerald Green by default
  gold: { DEFAULT: "#YOUR_COLOR" },        // Gold by default
}
```

Popular color combinations:
- **Tech Startup**: Primary: #0066FF, Accent: #00D4FF
- **Finance**: Primary: #1A1A2E, Accent: #0F3460, Gold: #E94560
- **Agriculture**: Primary: #2D5016, Accent: #8BC34A, Gold: #FFC107

### Change Fonts

**File**: `app/[locale]/layout.tsx`

```typescript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

// In body tag:
<body className={inter.className}>
```

For Arabic fonts, add:
```typescript
import { Cairo, Tajawal } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic'] });
```

### Change Logo/Company Name

**File**: `components/Navigation.tsx`

```typescript
<a href="#" className="text-2xl font-bold">
  Your Company Name Here
</a>
```

To add a logo image:
```typescript
<Image src="/logo.png" alt="Company Logo" width={150} height={40} />
```

### Change Animations Speed

**File**: Components using `transition={{ duration: 0.5 }}`

Faster: `duration: 0.3`
Slower: `duration: 0.8`

Or disable animations:
```typescript
// Remove Framer Motion wrappers
// Replace <motion.div> with <div>
```

## 📝 Content Customizations

### Update Contact Information

#### Phone Numbers
**Files to update**:
1. `components/WhatsAppButton.tsx` - Line 6
2. `components/sections/ContactFooter.tsx` - Lines 15-24

```typescript
const phoneNumber = "+966 XX XXX XXXX";
```

#### Email Addresses
**File**: `components/sections/ContactFooter.tsx`

```typescript
{
  value: 'your-email@company.com',
  href: 'mailto:your-email@company.com'
}
```

#### WhatsApp Message
**File**: `components/WhatsAppButton.tsx`

```typescript
const message = encodeURIComponent("Your custom message here");
```

### Change Experience Details

**File**: `messages/en.json` and `messages/ar.json`

Update the "experience" section:
```json
{
  "experience": {
    "fakih_company": "Your Company Name",
    "fakih_duration": "XX Years",
    "fakih_role": "Your Role",
    // ... etc
  }
}
```

### Add/Remove Services

**File**: `messages/en.json` and `messages/ar.json`

Add `service7_name`, `service7_desc`, etc.

**File**: `components/sections/Services.tsx`

Add to services array:
```typescript
{
  icon: YourIcon,
  name: t('service7_name'),
  description: t('service7_desc'),
  features: [
    t('service7_feature1'),
    // ...
  ]
}
```

### Modify Case Studies

**File**: `messages/en.json` and `messages/ar.json`

Add `case3_title`, `case3_situation`, etc.

**File**: `components/sections/CaseStudies.tsx`

Add to cases array.

### Update Statistics

**File**: `components/sections/Hero.tsx` - Lines 70-90

Change the stats in the dashboard mockup:
```typescript
<div className="text-3xl font-bold text-white">+XX%</div>
<div className="text-xs text-white/70">Your Metric</div>
```

**File**: `components/sections/Experience.tsx` - Lines 42-47

Change the counter statistics:
```typescript
{ value: 'XX+', label: t('stat_your_label') }
```

## 🔧 Functional Customizations

### Enable Email Notifications

#### Option 1: EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key

**File**: `components/sections/BookingForm.tsx`

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        ...formData,
        to_email: 'your-email@company.com'
      },
      'YOUR_PUBLIC_KEY'
    );
    setSubmitted(true);
  } catch (error) {
    console.error('Failed to send:', error);
    alert('Failed to send. Please try again.');
  }
};
```

#### Option 2: Custom API

Create `app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // Send email using your preferred service
  // (Sendgrid, Mailgun, Resend, etc.)

  return NextResponse.json({ success: true });
}
```

### Add Google Analytics

**File**: `app/[locale]/layout.tsx`

Add to `<head>`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

### Add More Languages

1. Create `messages/fr.json` (for French, etc.)
2. Update `lib/i18n.ts`:

```typescript
export const locales = ['en', 'ar', 'fr'] as const;
```

3. Add language option to `LanguageSwitcher.tsx`

### Change Default Language

**File**: `lib/i18n.ts`

```typescript
export const defaultLocale = 'en' as const; // Changed from 'ar'
```

### Add Social Media Links

**File**: `components/sections/ContactFooter.tsx`

Add to the contact methods or footer:

```typescript
<a href="https://linkedin.com/company/your-company">
  <Linkedin className="w-5 h-5" />
</a>
```

## 📱 Mobile Customizations

### Change Mobile Breakpoint

**File**: `tailwind.config.ts`

```typescript
theme: {
  screens: {
    'sm': '640px',  // Change these
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  }
}
```

### Hide Sections on Mobile

**File**: Any section component

```typescript
<section className="hidden md:block">
  {/* This section only shows on desktop */}
</section>
```

### Mobile-Specific Content

```typescript
<div className="block md:hidden">
  Mobile content here
</div>
<div className="hidden md:block">
  Desktop content here
</div>
```

## 🎯 SEO Customizations

### Update Meta Tags

**File**: `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Your Custom Title",
  description: "Your custom description",
  keywords: "feedlot, management, consulting",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Title",
    description: "Your description",
    images: ['/og-image.jpg'],
  },
};
```

### Add Structured Data

**File**: `app/[locale]/page.tsx`

Add JSON-LD schema:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Your Company Name",
      "description": "Your description",
      "url": "https://yourwebsite.com",
      "telephone": "+966XXXXXXXXX",
      "email": "info@yourcompany.com"
    })
  }}
/>
```

### Create Sitemap

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourwebsite.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://yourwebsite.com/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://yourwebsite.com/ar',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

## 🔒 Security Customizations

### Add reCAPTCHA to Form

1. Get reCAPTCHA keys from Google
2. Add to booking form:

```typescript
import ReCAPTCHA from "react-google-recaptcha";

<ReCAPTCHA
  sitekey="YOUR_SITE_KEY"
  onChange={(value) => setCaptcha(value)}
/>
```

### Add Rate Limiting

Create middleware or use Vercel's built-in rate limiting.

## 📊 Analytics Customizations

### Add Custom Events

**File**: Any component

```typescript
const trackEvent = (eventName: string, data: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, data);
  }
};

// Usage
<Button onClick={() => {
  trackEvent('booking_started', { service: 'consulting' });
  scrollToBooking();
}}>
```

### Add Heatmap Tracking

Add Hotjar or Microsoft Clarity:

```typescript
// In layout.tsx <head>
<script dangerouslySetInnerHTML={{
  __html: `
    (function(h,o,t,j,a,r){
      // Hotjar tracking code
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `
}} />
```

## 🎨 Advanced Customizations

### Add Blog Section

1. Create `app/[locale]/blog/page.tsx`
2. Create blog posts in `content/blog/`
3. Use MDX for rich content
4. Add blog link to navigation

### Add Client Portal

1. Add authentication (NextAuth.js)
2. Create protected routes
3. Add dashboard for clients
4. Track project progress

### Add Live Chat

Integrate Intercom, Crisp, or Tawk.to:

```typescript
// In layout.tsx
useEffect(() => {
  window.Intercom('boot', {
    app_id: 'YOUR_APP_ID'
  });
}, []);
```

## 💾 Data Customizations

### Add Database

For storing form submissions:

1. Set up Supabase or Firebase
2. Create API route
3. Store submissions
4. Create admin dashboard

### Add CMS

Integrate Sanity or Contentful:

1. Set up CMS
2. Create content schemas
3. Fetch content in components
4. Update content via CMS dashboard

## 🚀 Performance Customizations

### Add Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
  quality={85}
/>
```

### Enable Caching

**File**: `next.config.js`

```javascript
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ],
};
```

## 📝 Quick Reference

### Most Common Customizations

1. **Contact Info**: `WhatsAppButton.tsx` + `ContactFooter.tsx`
2. **Colors**: `tailwind.config.ts`
3. **Content**: `messages/en.json` + `messages/ar.json`
4. **Company Name**: `Navigation.tsx`
5. **Email Integration**: `BookingForm.tsx`

### Files You'll Edit Most

- `messages/en.json` - English content
- `messages/ar.json` - Arabic content
- `tailwind.config.ts` - Design/colors
- `components/sections/ContactFooter.tsx` - Contact info
- `components/WhatsAppButton.tsx` - WhatsApp number

### Files to Leave Alone

- `lib/utils.ts` - Core utilities
- `components/ui/*` - shadcn/ui components
- `tailwind.config.ts` (except colors) - Configuration
- `next.config.js` (unless needed) - Framework config

---

**Remember**: After any customization, test both English and Arabic versions, and check mobile responsiveness!

For questions, refer to the technology documentation:
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
