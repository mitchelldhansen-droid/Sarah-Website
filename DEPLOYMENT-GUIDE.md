# GitHub Pages Deployment Guide

## 🚀 Quick Start: Deploy to GitHub Pages

### Step 1: Prepare Your Files
Ensure you have these files ready:
- ✅ index.html (your website)
- ✅ All images with correct filenames
- ✅ README.md (documentation)
- ✅ CHANGELOG.md (version tracking)
- ✅ IMAGE-GUIDE.md (reference)

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Repository settings:
   - **Name:** `sarah-rose-costa-portfolio` (or your choice)
   - **Description:** "Portfolio website for artist Sarah Rose Costa"
   - **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file" → **SKIP THIS** (you already have one)
   - Click **"Create repository"**

### Step 3: Upload Files to GitHub

#### Option A: Web Upload (Easiest)
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL files:
   - index.html
   - All image files
   - README.md
   - CHANGELOG.md
   - IMAGE-GUIDE.md
3. Add commit message: "Initial commit: Version 1.0.0"
4. Click **"Commit changes"**

#### Option B: Command Line (For developers)
```bash
# Navigate to your folder
cd /path/to/your/website-folder

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Version 1.0.0"

# Connect to GitHub (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. In your repository, click **"Settings"** (top right)
2. Scroll down to **"Pages"** (left sidebar)
3. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
4. Click **"Save"**
5. Wait 2-3 minutes for deployment

### Step 5: Access Your Live Site

Your site will be available at:
```
https://USERNAME.github.io/REPO-NAME/
```

Example: `https://sarahrosecosta.github.io/portfolio/`

---

## 🔄 Making Updates After Initial Deployment

### For Minor Changes (Content, Images, Text)

#### Via Web Interface:
1. Go to your repository on GitHub
2. Click on the file you want to edit (e.g., index.html)
3. Click the pencil icon (✏️) to edit
4. Make your changes
5. Scroll down to "Commit changes"
6. Add descriptive message: `content: update about section text`
7. Click **"Commit changes"**
8. **Wait 2-3 minutes** → Changes will be live!

#### Via Command Line:
```bash
# Make changes to your local files
# Then:

git add .
git commit -m "content: updated portfolio images"
git push origin main
```

### For Major Changes (New Version)

1. **Update CHANGELOG.md** with new version number
2. **Make your changes** to index.html or other files
3. **Commit with version tag:**
```bash
git add .
git commit -m "feat: add testimonials section [v1.1.0]"
git tag v1.1.0
git push origin main --tags
```

---

## 📁 Recommended Repository Structure

```
your-repository/
├── index.html              ← Your website
├── README.md               ← Main documentation
├── CHANGELOG.md            ← Version history
├── IMAGE-GUIDE.md          ← Image reference
├── banner.jpg              ← All your images
├── hero.jpg
├── solo-portrait.jpg
├── ... (all other images)
└── .gitignore (optional)   ← Files to ignore
```

### Optional: Create .gitignore File

If you have files you DON'T want on GitHub (like PSDs, working files):

Create a file named `.gitignore` with:
```
# macOS
.DS_Store

# Working files
*.psd
*.ai
/drafts/
/temp/

# Environment files
.env
```

---

## 🎯 Custom Domain (Optional)

Want to use your own domain like `sarahrosecosta.com`?

### Step 1: In GitHub Settings
1. Go to Settings → Pages
2. Under "Custom domain", enter: `sarahrosecosta.com`
3. Click Save
4. Check "Enforce HTTPS" (after DNS propagation)

### Step 2: Update DNS Records

At your domain registrar (GoDaddy, Namecheap, etc.):

**For Root Domain (sarahrosecosta.com):**
Add 4 A records pointing to:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**For WWW (www.sarahrosecosta.com):**
Add CNAME record:
```
www → USERNAME.github.io
```

**Wait 24-48 hours** for DNS propagation.

### Step 3: Create CNAME File
In your repository root, create a file named `CNAME` (no extension):
```
sarahrosecosta.com
```

---

## 🔧 Troubleshooting

### Site Not Showing After 10 Minutes
- Check Settings → Pages → ensure main branch is selected
- Look for green checkmark next to your site URL
- Check "Actions" tab for build status

### Changes Not Appearing
- Hard refresh: `Ctrl+Shift+R` (PC) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Wait up to 5 minutes for GitHub Pages to rebuild

### Images Not Loading
- Check filenames match exactly (case-sensitive)
- Ensure images are in root folder, not subfolders
- Check image file extensions (.jpg vs .jpeg)

### 404 Error
- Verify repository is public
- Check that index.html is in root folder
- Ensure GitHub Pages is enabled in Settings

### Mobile Menu Not Working
- Check if JavaScript is running (open browser console)
- Verify no errors in Console (F12 → Console tab)

---

## 📊 Monitoring Your Site

### Check Build Status
1. Go to repository → **"Actions"** tab
2. See all deployments and their status
3. Green ✅ = Success, Red ❌ = Failed

### View Site Traffic
1. Repository → **"Insights"** tab
2. Click **"Traffic"**
3. See views, clones, and visitor stats

---

## 🔐 Security Best Practices

### Keep FormSpree Endpoint Private
- The endpoint `https://formspree.io/f/xnnoqqgo` is visible in source code
- This is normal for form services
- Monitor for spam in FormSpree dashboard
- Enable reCAPTCHA in FormSpree settings if needed

### Don't Commit Sensitive Data
- No passwords or API keys in code
- Use environment variables for sensitive data
- Check before committing!

---

## 📱 Testing Before Going Live

### Test Locally First
1. Open index.html in a browser directly
2. Test all links and buttons
3. Verify contact form works
4. Check mobile view (browser dev tools)

### Cross-Browser Testing
Test in:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome mobile)

### Responsive Testing
Test at these widths:
- 1920px (Desktop)
- 1366px (Laptop)
- 768px (Tablet)
- 375px (Mobile)

---

## 🎓 Git Commands Quick Reference

```bash
# Check status
git status

# Add all changes
git add .

# Add specific file
git add index.html

# Commit with message
git commit -m "your message here"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Create and push tag
git tag v1.0.0
git push origin --tags

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# See commit history
git log --oneline
```

---

## ✅ Pre-Launch Checklist

Before making your site public:
- [ ] All images uploaded and displaying correctly
- [ ] Updated Etsy shop URL in JavaScript
- [ ] Tested contact form (sent test message)
- [ ] Verified all navigation links work
- [ ] Checked mobile responsiveness
- [ ] Spell-checked all text content
- [ ] Updated prices if needed
- [ ] Social media links tested
- [ ] Cross-browser testing complete
- [ ] Asked friend to review site

---

## 🆘 Need Help?

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **FormSpree Help:** https://help.formspree.io/

---

## 🎉 You're Ready!

Your website is professional, responsive, and ready for the world. 

**Next Steps:**
1. Deploy to GitHub Pages
2. Share your URL on social media
3. Add link to Instagram bio
4. Update regularly with new work
5. Monitor form submissions

**Good luck with your portfolio! 🎨✨**

---

**Last Updated:** October 25, 2024
**Guide Version:** 1.0