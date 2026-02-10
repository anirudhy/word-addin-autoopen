# 🚀 Ready to Deploy!

## ✅ What I've Done

1. ✅ Updated manifest.xml with your GitHub Pages URL
2. ✅ Built production files to `/dist` folder
3. ✅ Created README.md
4. ✅ Initialized git repository

**Your GitHub Pages URL will be:** `https://anirudhy.github.io/word-addin-autoopen/`

---

## 📋 Step 1: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Repository name:** `word-addin-autoopen`
3. **Description:** `Word Add-in Auto-Open Demo - Client-Side Settings Approach`
4. **Visibility:** ✅ **Public** (required for free GitHub Pages)
5. **Do NOT check any boxes** (no README, .gitignore, or license)
6. Click **"Create repository"**

---

## 📋 Step 2: Configure Git & Push Code

Copy and paste these commands in **Git Bash** or **Command Prompt**:

```bash
# Navigate to project
cd "C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings"

# Configure git (update with your info)
git config user.name "Anirudh Yeddula"
git config user.email "ayeddula@microsoft.com"

# Add all files
git add .

# Commit
git commit -m "Initial commit - Word Add-in Auto-Open with GitHub Pages deployment"

# Add remote
git remote add origin https://github.com/anirudhy/word-addin-autoopen.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You may need to authenticate with GitHub. Use a personal access token if prompted for password.

---

## 📋 Step 3: Enable GitHub Pages

1. Go to: **https://github.com/anirudhy/word-addin-autoopen**
2. Click **Settings** tab (top right)
3. Click **Pages** in left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/dist` ⚠️ **IMPORTANT: Select /dist NOT / (root)**
5. Click **Save**

**You should see:** "Your site is ready to be published at https://anirudhy.github.io/word-addin-autoopen/"

---

## 📋 Step 4: Wait for Deployment

- GitHub will build and deploy (takes 2-3 minutes)
- You'll see a green checkmark when ready
- The message will change to: **"Your site is live at..."**

Refresh the Settings → Pages page to check status.

---

## 📋 Step 5: Verify Deployment

Open in your browser:
```
https://anirudhy.github.io/word-addin-autoopen/taskpane.html
```

**You should see:**
- ✅ Task pane UI loads
- ✅ Status shows "WebSocket Disabled (Testing Mode)"
- ✅ "Enable Auto-Open" button visible
- ✅ No errors in console (F12)

---

## 📋 Step 6: Test in Word Online

### Upload Manifest

1. Go to: **https://office.com**
2. Open **Word** → **New blank document**
3. Click **Insert** tab
4. Click **Add-ins**
5. Click **My Add-ins**
6. Click **Upload My Add-in**
7. Select file:
   ```
   C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\dist\manifest.xml
   ```
8. Click **Upload**

### Open Task Pane

1. Look for **"Auto-Open Commands"** button in Home ribbon
2. Click **"Show Taskpane"**
3. ✅ **Task pane should load without errors!**

**Expected:**
- ✅ Task pane opens on right side
- ✅ Status shows "WebSocket Disabled (Testing Mode)" (gray)
- ✅ Auto-open status shows "Disabled" (red)
- ✅ No blocking errors!

### Test Auto-Open Feature

1. Click **"Enable Auto-Open"** button
2. Status turns **green**: "Auto-Open: Enabled"
3. Press **Ctrl+S** to save document
4. **Close** the document tab
5. **Reopen** the document from Recent
6. ✨ **Task pane opens automatically!**

---

## ✅ Success Checklist

After following all steps:

- [ ] GitHub repository created at `https://github.com/anirudhy/word-addin-autoopen`
- [ ] Code pushed successfully
- [ ] GitHub Pages enabled with `/dist` folder
- [ ] Deployment shows green checkmark
- [ ] Can access `https://anirudhy.github.io/word-addin-autoopen/taskpane.html`
- [ ] Manifest uploaded in Word Online
- [ ] Task pane opens without blocking errors
- [ ] Auto-open feature works (pane opens on document reopen)

---

## 🐛 Troubleshooting

### Authentication Error When Pushing

If you get "authentication failed":

1. **Generate Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click **Generate new token (classic)**
   - Select scopes: `repo` (all)
   - Copy the token

2. **Use token as password:**
   ```bash
   # When prompted for password, paste your token
   git push -u origin main
   ```

### GitHub Pages Not Deploying

- Make sure you selected **/dist** folder (not / root)
- Wait 2-3 minutes for first deployment
- Check **Actions** tab for build status
- If failed, check you have dist folder: `ls dist/`

### 404 on GitHub Pages

- Verify URL: `https://anirudhy.github.io/word-addin-autoopen/taskpane.html`
- Check Settings → Pages shows "Your site is live"
- May take up to 5 minutes for first deploy

### Task Pane Won't Load in Word

- Check browser console (F12) for errors
- Verify manifest.xml points to correct URL
- Make sure you uploaded manifest from `/dist` folder
- Try removing and re-uploading the add-in

---

## 🎉 What to Do After Success

Once everything works:

1. **Share your achievement!** You've deployed a working Office Add-in
2. **Test the auto-open feature** thoroughly
3. **Check browser console** with `project1` filter to see detailed logs
4. **Try disabling auto-open** and verify it stops working

---

## 🔄 Making Updates

When you make code changes:

```bash
# Make your changes to src/
# Then rebuild and push

npm run build
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will auto-deploy the updates (takes 1-2 minutes).

---

## 📞 Need Help?

Let me know if:
- Authentication fails
- GitHub Pages won't deploy
- Task pane won't load in Word
- Any other issues

**Now run the commands in Step 2 and let me know when you've created the repository!** 🚀
