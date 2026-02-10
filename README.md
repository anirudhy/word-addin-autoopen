# Word Add-in Auto-Open Demo

This Office Add-in demonstrates the **client-side settings approach** for auto-opening task panes in Word.

## Live Demo

- **Add-in URL:** https://anirudhy.github.io/word-addin-autoopen/
- **Test in Word Online:** https://office.com

## Features

- ✅ User-controlled auto-open (via button)
- ✅ Per-document setting persistence
- ✅ Enhanced logging with `[project1]` tags
- ✅ Clean UI with status indicators

## How to Use

1. Go to https://office.com and open Word
2. Click **Insert → Add-ins → My Add-ins → Upload My Add-in**
3. Upload the manifest.xml from this repository
4. Click **"Show Taskpane"** in the ribbon
5. Click **"Enable Auto-Open"** button
6. Save, close, and reopen the document
7. ✨ Task pane opens automatically!

## Local Development

```bash
npm install
npm start
```

Runs at https://localhost:3000

## Deployment

This project is deployed to GitHub Pages from the `/dist` folder.

```bash
npm run build
git add dist/
git commit -m "Update build"
git push
```

## Technology

- Office.js API
- Webpack
- Vanilla JavaScript
- GitHub Pages hosting

## Learn More

- [Office Add-ins Documentation](https://learn.microsoft.com/en-us/office/dev/add-ins/)
- [Auto-open Task Panes](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/automatically-open-a-task-pane-with-a-document)
