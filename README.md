# Sarah Rose Costa - Portfolio Website

## 📋 Overview
This is a single-page scroll website for artist Sarah Rose Costa, featuring:
- Responsive design (desktop & mobile optimized)
- Soft rounded corners throughout
- White background with green/purple accent palette
- Sticky navigation with hamburger menu on mobile
- FormSpree contact form integration
- Instagram and Etsy links

## 🎨 Color Palette
- **White Background:** #FFFFFF
- **Light Green:** #B8D4B8
- **Dark Green:** #4A7C59
- **Light Purple:** #D4B5D4
- **Dark Purple:** #7B4B7B

## 🔤 Typography
- **Headings:** Playfair Display (elegant serif)
- **Body Text:** Lora (readable serif)
- **Source:** Google Fonts

## 📁 File Structure
```
/root-folder/
├── index.html          (Main website file)
├── banner.jpg          (1200x200px recommended)
├── hero.jpg            (250x250px square)
├── solo-portrait.jpg   (Service example)
├── duo-portrait.jpg    (Service example)
├── animal-face.jpg     (Service example)
├── animal-full.jpg     (Service example)
├── book-cover.jpg      (Service example)
├── logo.jpg            (Service example)
├── logo-suite.jpg      (Service example)
├── portfolio-review.jpg (Service example)
├── custom-commission.jpg (Service example)
├── portfolio-01.jpg    (Portfolio pieces)
├── portfolio-02.jpg
├── ... (up to portfolio-24.jpg)
└── featured-artwork.jpg (900x400px recommended)
```

## 🖼️ Image Requirements

### Banner Image
- **Filename:** `banner.jpg`
- **Size:** 1200x200px (or similar wide format)
- **Purpose:** Top banner spanning full width

### Hero Section
- **Filename:** `hero.jpg`
- **Size:** 250x250px (square)
- **Purpose:** Main profile image or logo

### Service Examples (9 total)
- **Filenames:** 
  - `solo-portrait.jpg`
  - `duo-portrait.jpg`
  - `animal-face.jpg`
  - `animal-full.jpg`
  - `book-cover.jpg`
  - `logo.jpg`
  - `logo-suite.jpg`
  - `portfolio-review.jpg`
  - `custom-commission.jpg`
- **Size:** Flexible (will display at 300x200px in cards)
- **Purpose:** Example work for each service

### Portfolio Images (20-24)
- **Filenames:** `portfolio-01.jpg` through `portfolio-24.jpg`
- **Size:** Square format recommended (will display at 250x250px)
- **Purpose:** Showcase of previous work
- **Note:** First 20 show immediately, items 21-24 appear when "Load More" is clicked

### Featured Artwork
- **Filename:** `featured-artwork.jpg`
- **Size:** 900x400px (or similar wide format)
- **Purpose:** Current limited edition piece

## 🔗 Links to Update

### Etsy Shop URL
**Current Status:** Placeholder
**Location in Code:** Line ~690 in the JavaScript section
```javascript
const etsyURL = 'https://www.etsy.com/shop/YourShopName'; // UPDATE THIS
```
**Replace with Sarah's actual Etsy shop URL**

### Social Media Links (Already Set)
- Instagram: `https://www.instagram.com/costaandcraftsstudio/` ✅
- FormSpree: `https://formspree.io/f/xnnoqqgo` ✅

## 📱 Sections Breakdown

### 1. Navigation Bar
- Fixed to top on scroll
- Smooth scroll to sections
- Hamburger menu on mobile (< 768px)

### 2. Banner
- Full-width decorative banner
- Gradient placeholder if no image

### 3. Hero Section
- Profile/logo image
- Name and tagline
- Social links (Instagram + Etsy)

### 4. About Section
- Three paragraphs about Sarah
- Conversational, fun tone
- Highlights creative journey

### 5. Services Section
Nine service cards with:
- Example image
- Service name
- Mock pricing
- Description
- "Order Yours Today" button → Etsy

**Services:**
1. Solo Portrait - $150+
2. Duo Portrait - $225+
3. Animal Portrait (Face) - $125+
4. Animal Portrait (Full Body) - $200+
5. Book Cover Design - $400+
6. Logo Design - $250+
7. Logo Suite - $500+
8. Portfolio Review & Tutoring - $65/hour
9. Custom Commission - $170+

### 6. Portfolio Section
- Grid of 20+ images
- Click any image → Etsy shop
- "Load More" button reveals additional pieces
- Responsive grid (adjusts to screen size)

### 7. Featured Limited Edition
- Special 1:1 piece
- "Only One Available" badge
- Detailed description
- Price and purchase link
- Highlighted in gradient background

### 8. Contact Section
- FormSpree integration (ready to use)
- Fields: Name, Email, Subject, Message
- Submit sends to FormSpree endpoint

### 9. Footer
- Social links repeated
- Copyright notice
- Fun tagline

## 🚀 How to Use

### Option 1: Simple Setup
1. Place all images in the same folder as `index.html`
2. Name images exactly as shown in the file structure above
3. Update the Etsy URL in the JavaScript (line ~690)
4. Open `index.html` in a browser

### Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload `index.html` and all images to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://username.github.io/repo-name`

### Option 3: Custom Domain
1. Upload files to your web hosting
2. Point your domain to the hosting
3. Access via your custom domain

## 🎨 Customization Tips

### Changing Colors
All colors are defined in CSS variables at the top of the `<style>` section (lines 13-20):
```css
:root {
    --white: #FFFFFF;
    --light-green: #B8D4B8;
    --dark-green: #4A7C59;
    --light-purple: #D4B5D4;
    --dark-purple: #7B4B7B;
}
```

### Updating Prices
Search for class="price" in the HTML to find and update pricing

### Changing Text
All text content can be directly edited in the HTML

### Adding More Portfolio Items
1. Add more `<a href="#" class="portfolio-item hidden">` blocks
2. Follow the existing pattern
3. Images will work with "Load More" functionality

## 📊 Responsive Breakpoints
- **Desktop:** > 768px (full navigation)
- **Mobile:** ≤ 768px (hamburger menu, stacked layout)

## ✅ Checklist Before Launch
- [ ] Add all 24+ images with correct filenames
- [ ] Update Etsy shop URL in JavaScript
- [ ] Test contact form (send a test message)
- [ ] Verify all social links work
- [ ] Check mobile responsiveness
- [ ] Update pricing if needed
- [ ] Test in multiple browsers
- [ ] Add actual service descriptions if desired
- [ ] Update featured artwork details regularly

## 🐛 Troubleshooting

**Images not showing?**
- Check filename spelling (case-sensitive)
- Ensure images are in the same folder as index.html
- Check file extensions (.jpg, .png, etc.)

**Contact form not working?**
- FormSpree endpoint is active
- Check spam folder for test messages
- Verify form action URL is correct

**Mobile menu not working?**
- Ensure JavaScript is enabled in browser
- Check browser console for errors

## 📝 Notes
- All Etsy links currently point to placeholder
- Portfolio items 21-24 are hidden until "Load More" is clicked
- Contact form uses FormSpree (free tier: 50 submissions/month)
- Website is fully functional with placeholders
- No external dependencies (fonts, frameworks)
- Pure HTML5, CSS3, and vanilla JavaScript

## 🎯 Future Enhancements (Optional)
- Add image lightbox for portfolio viewing
- Integrate shopping cart for direct purchases
- Add testimonials section
- Include blog/news section
- Add loading animations
- Implement dark mode toggle

---

**Ready to launch!** Just add your images and update the Etsy URL. 🎨✨