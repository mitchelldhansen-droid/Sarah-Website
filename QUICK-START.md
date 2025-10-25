# 🚀 QUICK START GUIDE

## Get Your Website Live in 3 Steps

### STEP 1: Add Your Images (10 minutes)
Place these 32 images in the same folder as `index.html`:

**Essential (3):**
- banner.jpg (wide banner)
- hero.jpg (your logo/photo)
- featured-artwork.jpg (current special piece)

**Services (8):**
- solo-portrait.jpg, duo-portrait.jpg, animal-face.jpg, animal-full.jpg
- book-cover.jpg, logo.jpg, logo-suite.jpg, portfolio-review.jpg

**Portfolio (20+):**
- portfolio-01.jpg through portfolio-20.jpg (minimum)
- portfolio-21.jpg through portfolio-24.jpg (optional for "load more")

See IMAGE-GUIDE.md for detailed specs!

---

### STEP 2: Update Etsy Link (2 minutes)
Open `index.html` in a text editor, find line ~690:

**Change this:**
```javascript
const etsyURL = 'https://www.etsy.com/shop/YourShopName'; // UPDATE THIS
```

**To your actual Etsy URL:**
```javascript
const etsyURL = 'https://www.etsy.com/shop/ActualShopName';
```

Save the file!

---

### STEP 3: Upload to GitHub (15 minutes)

#### A. Create Repository
1. Go to GitHub.com → Sign in
2. Click "+" → "New repository"
3. Name: `sarah-portfolio` (or your choice)
4. Make it Public
5. Click "Create repository"

#### B. Upload Files
1. Click "uploading an existing file"
2. Drag ALL files (index.html + images + docs)
3. Commit message: "Initial release v1.0.0"
4. Click "Commit changes"

#### C. Enable GitHub Pages
1. Go to Settings → Pages
2. Source: Branch = "main", Folder = "/ (root)"
3. Click "Save"
4. Wait 2-3 minutes

#### D. View Your Site!
Your URL: `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## 🎯 That's It!

Your website is now live! 

**What You Get:**
✅ Professional portfolio site
✅ Mobile-responsive design
✅ Working contact form
✅ Portfolio gallery with 20+ images
✅ 8 service offerings with pricing
✅ Social media integration
✅ Featured artwork section

---

## 📋 Test Your Site

Open your live URL and check:
- [ ] All sections scroll smoothly
- [ ] Images load correctly
- [ ] Mobile menu works (test on phone)
- [ ] Contact form sends (try sending yourself a message)
- [ ] All Etsy links work
- [ ] Instagram link works
- [ ] "Load More" button shows additional portfolio items

---

## 🔄 Making Future Updates

**To update content:**
1. Edit index.html on your computer
2. Go to GitHub repo → Upload changed file
3. Wait 2-3 minutes → Changes are live!

**To add new portfolio images:**
1. Name new images: portfolio-25.jpg, portfolio-26.jpg, etc.
2. Add to your folder
3. Add HTML code for new items (copy existing pattern)
4. Upload to GitHub

**To change pricing:**
1. Open index.html
2. Find `class="price"`
3. Update the prices
4. Save and upload to GitHub

---

## 📚 Full Documentation Available

- **README.md** - Complete website overview
- **IMAGE-GUIDE.md** - Detailed image requirements
- **CHANGELOG.md** - Track your versions
- **DEPLOYMENT-GUIDE.md** - Advanced GitHub & domain setup

---

## 🆘 Common Issues

**Images not showing?**
→ Check filename spelling (exact match, case-sensitive)

**Etsy links not working?**
→ Update the etsyURL variable in JavaScript (line ~690)

**Changes not appearing?**
→ Hard refresh: Ctrl+Shift+R (PC) or Cmd+Shift+R (Mac)

**Mobile menu stuck?**
→ Check JavaScript is enabled in browser

---

## 💡 Pro Tips

1. **Compress images** before uploading (use TinyPNG.com) for faster loading
2. **Update featured artwork** regularly to keep site fresh
3. **Test on multiple devices** before sharing widely
4. **Add to Instagram bio** once live
5. **Monitor contact form** submissions in FormSpree
6. **Update portfolio** with new work monthly

---

## 🎨 Next Steps After Launch

1. Share on social media
2. Add link to Instagram bio
3. Update business cards with URL
4. Tell clients about services page
5. Monitor which services get most interest
6. Gather testimonials for future version
7. Track site visits in GitHub Insights

---

## Contact Form Details

**Service:** FormSpree (Free tier)
**Endpoint:** https://formspree.io/f/xnnoqqgo
**Limit:** 50 submissions/month
**Notifications:** Go to your email
**Upgrade:** If you exceed 50, upgrade FormSpree plan

---

## 🎉 You're Ready to Launch!

Everything is set up and ready to go. Just add your images, update that Etsy link, and push to GitHub!

**Your website includes:**
- ✨ Beautiful, professional design
- 📱 Mobile-optimized
- 🎨 Portfolio showcase
- 💼 Services & pricing
- 📧 Working contact form
- 🔗 Social integration
- ⚡ Fast loading
- 🎯 SEO-friendly

**Time to shine! 🚀**

---

**Questions?** Check the other documentation files or reach out!

**Last Updated:** October 25, 2024