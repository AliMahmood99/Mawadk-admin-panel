# Quick Start Guide

Get your Feedlot Management Consulting website up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
cd feedlot-consulting
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion
- next-intl
- shadcn/ui components
- And all other dependencies

### 2. Start Development Server

```bash
npm run dev
```

Open your browser to:
- **Arabic (default)**: http://localhost:3000/ar
- **English**: http://localhost:3000/en

The site will hot-reload as you make changes!

## ✏️ Essential Customization (10 minutes)

### Update Contact Information

#### 1. WhatsApp Button
**File**: `components/WhatsAppButton.tsx`

```typescript
const phoneNumber = "+966XXXXXXXXX"; // Replace with real number
```

#### 2. Contact Section
**File**: `components/sections/ContactFooter.tsx`

Update the `contactMethods` array:
```typescript
{
  value: '+966 XX XXX XXXX',
  href: 'tel:+966XXXXXXXXX'
},
{
  value: 'your-email@example.com',
  href: 'mailto:your-email@example.com'
}
```

#### 3. Company Name (Optional)
**File**: `components/Navigation.tsx`

```typescript
Feedlot Consulting // Change to your preferred name
```

### Update Content (Optional)

All text content is in these files:
- `messages/en.json` - English content
- `messages/ar.json` - Arabic content

Edit these JSON files to change any text on the website without touching the code!

## 📧 Email Integration (Optional)

To make the booking form send emails:

### Option 1: EmailJS (Easiest)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `components/sections/BookingForm.tsx`:

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    setSubmitted(true);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
```

### Option 2: API Route

Create `app/api/booking/route.ts` and integrate with your preferred email service.

## 🌍 Change Default Language

To make English the default instead of Arabic:

**File**: `lib/i18n.ts`
```typescript
export const defaultLocale = 'en' as const; // Changed from 'ar'
```

## 🎨 Customize Colors

**File**: `tailwind.config.ts`

```typescript
colors: {
  primary: { DEFAULT: "#YOUR_COLOR" },
  accent: { DEFAULT: "#YOUR_COLOR" },
  gold: { DEFAULT: "#YOUR_COLOR" },
}
```

## 📱 Test Responsive Design

Open Chrome DevTools (F12) and test:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

The site is fully responsive and should look great at all sizes!

## 🚢 Deploy to Vercel (5 minutes)

### Method 1: GitHub + Vercel Dashboard

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Done! Your site will be live at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your site will be deployed!

## 🧪 Build for Production Locally

```bash
npm run build
npm start
```

This builds an optimized production version and starts the server on port 3000.

## 📊 Performance Check

After deployment, check your performance:
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your deployed URL
3. Should see 95+ scores on all metrics!

## 🆘 Common Issues

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Styling Not Loading
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build Errors
```bash
# Clear everything and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## ✅ Checklist Before Going Live

- [ ] Updated all contact information (phone, email, WhatsApp)
- [ ] Customized content in en.json and ar.json
- [ ] Tested on mobile, tablet, and desktop
- [ ] Tested both English and Arabic versions
- [ ] Tested all navigation links work
- [ ] Tested booking form submits successfully
- [ ] Configured email notifications (if needed)
- [ ] Replaced placeholder company name
- [ ] Tested on actual devices (not just browser)
- [ ] Checked all WhatsApp/phone links work
- [ ] Reviewed all text for typos
- [ ] Set up custom domain (if needed)

## 🎯 Next Steps

1. **Add Analytics**: Integrate Google Analytics or Plausible
2. **Add Contact Form Backend**: Set up email notifications
3. **Custom Domain**: Connect your domain in Vercel
4. **SEO**: Add structured data and meta descriptions
5. **Images**: Add actual client photos/logos if available

## 📚 Need Help?

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **next-intl**: https://next-intl-docs.vercel.app/

---

**Your website is ready!** 🎉

Just customize the contact info and content, then deploy to Vercel. You'll have a professional, bilingual consulting website live in under 30 minutes!
