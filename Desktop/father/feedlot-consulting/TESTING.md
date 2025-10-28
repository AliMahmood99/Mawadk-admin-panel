# Testing Guide

Comprehensive testing checklist to ensure your Feedlot Management Consulting website works perfectly before deployment.

## 🧪 Pre-Launch Testing Checklist

### 1. Development Environment Setup

```bash
cd feedlot-consulting
npm install
npm run dev
```

Verify the site loads at:
- [ ] http://localhost:3000/ar (Arabic - default)
- [ ] http://localhost:3000/en (English)

### 2. Navigation Testing

#### Desktop Navigation
- [ ] Logo clicks scroll to top
- [ ] "Home" link scrolls to hero section
- [ ] "Services" link scrolls to services section
- [ ] "Experience" link scrolls to experience section
- [ ] "Contact" link scrolls to contact section
- [ ] Language switcher toggles between EN/AR
- [ ] "Contact" button scrolls to booking form
- [ ] Navigation becomes sticky on scroll
- [ ] Navigation background changes on scroll

#### Mobile Navigation (< 768px)
- [ ] Hamburger menu icon appears
- [ ] Menu opens/closes correctly
- [ ] All links work in mobile menu
- [ ] Language switcher works in mobile menu
- [ ] Menu closes after clicking a link
- [ ] Menu closes when clicking outside

### 3. Language & RTL Testing

#### Arabic Version (/ar)
- [ ] Text displays in Arabic
- [ ] Layout is RTL (right-to-left)
- [ ] Icons flip correctly for RTL
- [ ] WhatsApp button on left side (RTL)
- [ ] Navigation items align right
- [ ] All sections render correctly RTL
- [ ] Numbers display correctly
- [ ] Dates format correctly

#### English Version (/en)
- [ ] Text displays in English
- [ ] Layout is LTR (left-to-right)
- [ ] WhatsApp button on right side (LTR)
- [ ] Navigation items align left
- [ ] All sections render correctly LTR

#### Language Switching
- [ ] Switch from AR to EN maintains scroll position
- [ ] Switch from EN to AR maintains scroll position
- [ ] URL updates correctly (/ar ↔ /en)
- [ ] All content translates properly
- [ ] No missing translations (check console)

### 4. Section-by-Section Testing

#### Hero Section
- [ ] Title displays correctly in both languages
- [ ] Subtitle displays correctly
- [ ] Trust badges appear with icons
- [ ] "Schedule Consultation" button scrolls to booking
- [ ] "Explore Services" button scrolls to services
- [ ] Animated stats dashboard visible (desktop only)
- [ ] Background gradient displays
- [ ] Scroll indicator animates
- [ ] Animations trigger on page load

#### Value Proposition Section
- [ ] Section title displays
- [ ] All 3 feature cards render
- [ ] Icons display correctly
- [ ] Hover effects work on cards
- [ ] Animation triggers on scroll into view

#### System Showcase Section
- [ ] "Flagship Solution" badge displays
- [ ] All 6 feature cards render
- [ ] Each card has icon, title, features list
- [ ] Benefit text displays at bottom
- [ ] Hover effects work (shadow + lift)
- [ ] Cards have correct color coding (accent/gold)
- [ ] Checkmark icons display in feature lists

#### Case Studies Section
- [ ] Both case study cards render
- [ ] Badges show (Situation, Solution, Results)
- [ ] All 4 results display per case
- [ ] Checkmark icons display
- [ ] Different accent colors (accent/gold)
- [ ] Hover shadow effects work

#### Experience Section
- [ ] Section title displays
- [ ] All 4 stats display correctly
- [ ] Timeline displays both experiences
- [ ] "Current" badge shows on recent position
- [ ] Timeline line visible (desktop)
- [ ] Timeline dots display
- [ ] Achievement checkmarks display
- [ ] Cards animate on scroll

#### Services Section
- [ ] Section title and subtitle display
- [ ] All 6 service cards render
- [ ] "Flagship" badge on first service
- [ ] Icons display correctly
- [ ] Feature lists show with checkmarks
- [ ] "Ideal For" text displays where present
- [ ] "Learn More" buttons scroll to booking
- [ ] Hover effects work

#### Why Work With Us Section
- [ ] Section title displays
- [ ] All 4 reason cards render
- [ ] Icons centered with correct colors
- [ ] Cards centered and aligned
- [ ] Hover effects work

#### Booking Form Section
- [ ] Section title displays
- [ ] Step indicators show (1, 2, 3)
- [ ] Step 1: All contact fields display
  - [ ] Full Name (required)
  - [ ] Company Name (required)
  - [ ] Position
  - [ ] Email (required)
  - [ ] Phone (required)
  - [ ] Location
- [ ] Step 2: Operation fields display
  - [ ] Operation Type dropdown
  - [ ] Operation Scale dropdown
  - [ ] Challenges textarea
- [ ] Step 3: Final fields display
  - [ ] Preferred Date picker
  - [ ] How Heard input
- [ ] "Previous" button disabled on step 1
- [ ] "Next" button advances to next step
- [ ] "Previous" button goes back
- [ ] "Submit" button shows on step 3
- [ ] Form submission shows success message
- [ ] Success message displays check icon
- [ ] Required field validation works

#### FAQ Section
- [ ] Section title displays
- [ ] All 6 questions render
- [ ] Accordion items expand/collapse
- [ ] Chevron rotates on expand
- [ ] Only one item open at a time
- [ ] Answers display correctly
- [ ] Hover effects on questions

#### Contact Section
- [ ] Section title and subtitle display
- [ ] All 3 contact cards render (Phone, Email, WhatsApp)
- [ ] Icons display correctly
- [ ] Links are clickable
- [ ] Phone link opens dialer
- [ ] Email link opens mail client
- [ ] WhatsApp link opens WhatsApp
- [ ] Hover effects work on cards

#### Footer
- [ ] Company name displays
- [ ] Tagline text shows
- [ ] Quick Links section renders
- [ ] Legal links display
- [ ] All footer links work
- [ ] Copyright year is correct (2025)
- [ ] Footer background color correct

### 5. Floating Elements

#### WhatsApp Button
- [ ] Button displays in bottom corner
- [ ] Correct position (right for LTR, left for RTL)
- [ ] Green WhatsApp color (#25D366)
- [ ] Icon displays
- [ ] Link opens WhatsApp with pre-filled message
- [ ] Button always visible while scrolling
- [ ] Hover effect works

### 6. Responsive Design Testing

Test at these viewport widths:

#### Mobile (375px - 640px)
- [ ] Navigation collapses to hamburger
- [ ] All sections stack vertically
- [ ] Text is readable (not too small)
- [ ] Cards are full width
- [ ] Buttons are easily tappable (44px minimum)
- [ ] No horizontal scrolling
- [ ] Images don't overflow
- [ ] Spacing looks good

#### Tablet (768px - 1024px)
- [ ] 2-column grids work
- [ ] Navigation shows full menu
- [ ] Hero section looks good
- [ ] Stats cards are 2 columns
- [ ] Service cards are 2 columns

#### Desktop (1280px+)
- [ ] 3-column grids work
- [ ] Hero shows dashboard mockup
- [ ] Timeline displays correctly
- [ ] Maximum width containers center content
- [ ] No elements too spread out

### 7. Animation Testing

- [ ] Hero: Elements fade in on load
- [ ] Hero: Stats animate upward
- [ ] Hero: Badges appear with delay
- [ ] Sections: Content fades in on scroll
- [ ] Cards: Subtle entrance animations
- [ ] Buttons: Hover scale effects
- [ ] Scroll indicator: Up/down animation
- [ ] Navigation: Smooth scroll behavior
- [ ] Forms: Step transitions smooth
- [ ] Accordion: Smooth expand/collapse

### 8. Performance Testing

```bash
npm run build
npm start
```

#### Lighthouse Audit
1. Open site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select "Performance, Accessibility, Best Practices, SEO"
5. Click "Generate report"

**Target Scores:**
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

#### Loading Speed
- [ ] Initial page load < 2 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] No layout shifts (CLS score)
- [ ] Images load progressively

### 9. Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

Check:
- [ ] All sections render correctly
- [ ] Animations work
- [ ] Forms submit
- [ ] Links work
- [ ] No console errors

### 10. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can submit form with keyboard
- [ ] Can navigate menu with keyboard
- [ ] Can close modals with ESC

#### Screen Reader
- [ ] Headings in logical order (h1, h2, h3)
- [ ] Images have alt text (or are decorative)
- [ ] Links have descriptive text
- [ ] Form labels associated with inputs
- [ ] Error messages announced

#### Color Contrast
- [ ] Text readable on backgrounds
- [ ] Links distinguishable from text
- [ ] Buttons have good contrast
- [ ] Focus indicators visible

### 11. Form Testing

#### Validation
- [ ] Required fields show error if empty
- [ ] Email field validates email format
- [ ] Phone field accepts valid formats
- [ ] Can't submit without required fields
- [ ] Error messages clear and helpful

#### User Flow
- [ ] Can complete all 3 steps
- [ ] Can go back and edit previous steps
- [ ] Data persists when going back
- [ ] Success message appears after submit
- [ ] Form resets after successful submission

### 12. Link Testing

Go through and click every link:
- [ ] All navigation links work
- [ ] All footer links work
- [ ] All CTA buttons work
- [ ] Service "Learn More" buttons work
- [ ] Contact method links work
- [ ] Language switcher works
- [ ] External links open in new tab
- [ ] No broken links (404s)

### 13. SEO Testing

#### Meta Tags
- [ ] Title tag present in both languages
- [ ] Description meta tag present
- [ ] Language meta tags correct
- [ ] Viewport meta tag present
- [ ] Canonical URL set

#### Content
- [ ] Headings hierarchy correct (H1 → H2 → H3)
- [ ] Only one H1 per page
- [ ] Descriptive heading text
- [ ] Alt text on important images
- [ ] Semantic HTML used

### 14. Console Check

Open browser console (F12 → Console):
- [ ] No JavaScript errors
- [ ] No missing resource errors (404s)
- [ ] No CORS errors
- [ ] No translation key errors
- [ ] No React warnings

### 15. Production Build Testing

```bash
npm run build
```

Check for:
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Bundle size reasonable
- [ ] All pages pre-rendered

### 16. Final Pre-Deployment Checklist

- [ ] All placeholder text replaced
- [ ] Real contact information added
- [ ] Company name updated everywhere
- [ ] Email integration configured (if needed)
- [ ] Analytics added (if needed)
- [ ] Favicon added (create one at favicon.io)
- [ ] Open Graph image added
- [ ] Privacy policy page created (if needed)
- [ ] Terms of service page created (if needed)

## 🐛 Common Issues & Fixes

### Issue: Styles not loading
**Fix**: Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Issue: Translations not showing
**Fix**: Check JSON syntax in messages files
```bash
# Validate JSON
cat messages/en.json | json_pp
cat messages/ar.json | json_pp
```

### Issue: Build fails
**Fix**: Check TypeScript errors
```bash
npm run build --verbose
```

### Issue: Animations not working
**Fix**: Check Framer Motion installation
```bash
npm install framer-motion
```

## ✅ Testing Complete!

If all items above are checked, your website is ready for deployment! 🎉

Proceed to deployment:
```bash
vercel
```

Or follow the deployment guide in `README.md`.
