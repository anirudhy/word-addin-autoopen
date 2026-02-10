# 🚀 Deploy to GitHub Pages - Step by Step

## ✅ Step 1: Create GitHub Repository (Do This First)

1. **Go to:** https://github.com/new
2. **Repository name:** `word-addin-autoopen`
3. **Description:** `Word Add-in Auto-Open Demo`
4. **Visibility:** Public (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

---

## ✅ Step 2: Note Your GitHub Username

You'll need this for the URLs. Your GitHub username is what appears in your profile URL.

Example: If your profile is `https://github.com/johndoe`, your username is `johndoe`

**Your GitHub username:** _________________ (write it down)

---

## ✅ Step 3: Update Manifest with Your GitHub URL

Before pushing code, we need to update the manifest.xml to use your GitHub Pages URL.

The URL will be: `https://YOUR-USERNAME.github.io/word-addin-autoopen`

**Tell me your GitHub username and I'll update the manifest for you.**

---

## ✅ Step 4: Push Code to GitHub

After I update the manifest, run these commands:

```bash
cd C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings

# Configure git (if not done)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit - Word Add-in Auto-Open"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/word-addin-autoopen.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## ✅ Step 5: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR-USERNAME/word-addin-autoopen`
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source", select: **Deploy from a branch**
5. Under "Branch", select: **main** and **/dist**
6. Click **Save**

**Note:** We need to deploy from `/dist` folder (where webpack builds files)

---

## ✅ Step 6: Wait for Deployment (2-3 minutes)

GitHub will build and deploy your site. You'll see:
- A green checkmark when ready
- URL: `https://YOUR-USERNAME.github.io/word-addin-autoopen`

---

## ✅ Step 7: Test Your Deployment

Open browser and go to:
```
https://YOUR-USERNAME.github.io/word-addin-autoopen/taskpane.html
```

You should see the task pane UI!

---

## ✅ Step 8: Test in Word Online

1. Go to https://office.com
2. Open Word Online
3. Create new document
4. **Insert → Add-ins → My Add-ins → Upload My Add-in**
5. Upload the updated `manifest.xml` from:
   ```
   C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\dist\manifest.xml
   ```
6. Click **Show Taskpane**
7. ✅ **It should load without errors!**

---

## 🎯 What to Do Right Now

**Tell me your GitHub username so I can:**
1. Update manifest.xml with your GitHub Pages URL
2. Update taskpane.js if needed
3. Rebuild the project
4. Give you the exact git commands to run

**What's your GitHub username?**

---

## 📝 Expected Timeline

- Step 1-3: 5 minutes (create repo, update files)
- Step 4: 1 minute (push code)
- Step 5: 1 minute (enable Pages)
- Step 6: 2-3 minutes (GitHub builds and deploys)
- Step 7-8: 2 minutes (test)

**Total: ~10 minutes** ⏱️

---

## 🐛 Troubleshooting

### "Permission denied" when pushing
- Need to authenticate with GitHub
- Use personal access token instead of password
- Generate at: https://github.com/settings/tokens

### GitHub Pages not deploying
- Make sure you selected **/dist** folder
- Check Actions tab for build errors
- May need to add `docs` folder instead

### 404 on GitHub Pages URL
- Wait 2-3 minutes for deployment
- Check Settings → Pages shows green checkmark
- Verify URL is correct

---

**Ready? Tell me your GitHub username and let's do this!** 🚀
