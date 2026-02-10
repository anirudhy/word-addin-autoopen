# 🔧 Fix WebSocket Blocking Issue

## Problem
Modern browsers block public websites (like office.com) from connecting to localhost for security reasons.

**Error:** "The connection is blocked because it was initiated by a public page to connect to devices or servers on your local network."

---

## ✅ Solution 1: Use ngrok (Recommended for Testing)

ngrok creates a public tunnel to your localhost, bypassing browser restrictions.

### Step 1: Download & Install ngrok

1. Go to: https://ngrok.com/download
2. Download ngrok for Windows
3. Extract to a folder (e.g., `C:\ngrok\`)
4. No installation needed - it's a single .exe file

**Or use winget:**
```cmd
winget install ngrok
```

### Step 2: Create ngrok Account (Free)

1. Go to: https://dashboard.ngrok.com/signup
2. Sign up (free account)
3. Copy your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken

### Step 3: Configure ngrok

Open Command Prompt and run:
```cmd
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 4: Expose WebSocket Backend

In a new terminal window:
```cmd
ngrok http 8080
```

**Expected output:**
```
Session Status                online
Account                       your-email@example.com
Forwarding                    https://abcd1234.ngrok.io -> http://localhost:8080
```

**Copy the HTTPS URL** (e.g., `https://abcd1234.ngrok.io`)

### Step 5: Update Add-in to Use ngrok URL

You need to change the WebSocket URL from `ws://localhost:8080` to the ngrok URL.

**Edit:** `C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\src\taskpane.js`

**Change line 3:**
```javascript
// FROM:
const WS_URL = 'ws://localhost:8080';

// TO (use wss:// for secure):
const WS_URL = 'wss://abcd1234.ngrok.io';  // Replace with your ngrok URL
```

**Important:**
- Use `wss://` (not `ws://`) for the ngrok URL
- Replace `abcd1234.ngrok.io` with your actual ngrok URL

### Step 6: Restart Project 1

The webpack dev server will auto-reload, or manually restart:
```bash
# Stop current server (Ctrl+C in that terminal)
# Or stop the background task
claude task stop b1a981b

# Start again
cd C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings
npm start
```

### Step 7: Test in Word Online

1. Reload Word document (or close and reopen)
2. Open task pane
3. WebSocket should now connect via ngrok! ✅

---

## ✅ Solution 2: Use Edge with Flags (Simpler, Less Reliable)

### Step 1: Enable Edge Flags

1. Open Microsoft Edge
2. Go to: `edge://flags`
3. Search for: **insecure**
4. Find: **Block insecure private network requests**
5. Set to: **Disabled**
6. Click **Restart**

### Step 2: Test in Word Online

1. Go to https://office.com in Edge
2. Sideload add-in
3. WebSocket might connect now

**Note:** This is less reliable as Microsoft keeps changing these policies.

---

## ✅ Solution 3: Update Backend to Support WSS (Production-Ready)

For production, you'd use a proper SSL certificate. For testing, we can modify the backend.

### Step 1: Update Backend Server

**Edit:** `C:\Users\ayeddula\word-addin-autoopen-comparison\shared-backend\server.js`

**Add at the top (after requires):**
```javascript
const https = require('https');
const fs = require('fs');
```

**Replace WebSocket server initialization:**
```javascript
// FROM:
const wss = new WebSocket.Server({ port: WS_PORT });

// TO:
const server = https.createServer({
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem')
});

const wss = new WebSocket.Server({ server });
server.listen(WS_PORT);
```

**This requires SSL certificates**, which is complex for localhost testing. **Use ngrok instead.**

---

## 🎯 Recommended Workflow

**For Development/Testing:**
1. Use **ngrok** (Solution 1)
2. Free, easy to set up
3. Works reliably across all browsers
4. No code changes to backend needed
5. Just update WS_URL in taskpane.js

**For Production:**
1. Deploy backend to cloud (Azure, AWS, etc.)
2. Use proper SSL certificates
3. Update WS_URL to production URL

---

## 📝 Quick Setup Guide (ngrok)

### Terminal 1: Backend
```bash
cd C:\Users\ayeddula\word-addin-autoopen-comparison\shared-backend
npm start
```

### Terminal 2: ngrok
```bash
ngrok http 8080
```
Copy the `https://` URL shown

### Terminal 3: Frontend
1. Edit `01-client-side-settings\src\taskpane.js`
2. Change `WS_URL` to ngrok URL with `wss://`
3. Start frontend:
   ```bash
   cd C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings
   npm start
   ```

### Browser: Word Online
1. Sideload manifest
2. Open task pane
3. ✅ WebSocket connects via ngrok!

---

## 🔍 Verify ngrok is Working

Once ngrok is running, test the connection:

```bash
curl https://your-ngrok-url.ngrok.io/health
```

Should return backend health status.

---

## ⚠️ ngrok Free Tier Limitations

- URLs change every time you restart ngrok
- 40 connections/minute limit (fine for testing)
- Session expires after 2 hours (just restart ngrok)

For persistent URL, upgrade to ngrok paid plan or deploy to cloud.

---

## 🎓 What You're Learning

**Why this happens:**
- Office.com is a public HTTPS website
- Your backend is on localhost (private network)
- Browsers block this to prevent malicious websites from scanning your local network

**Production solution:**
- Deploy backend to cloud with proper domain
- Use WSS (WebSocket Secure) with SSL certificate
- No localhost involved = no browser blocking

**Development workaround:**
- ngrok creates a public tunnel to localhost
- Browser sees it as a public URL, not localhost
- Everything works smoothly for testing

---

**Choose ngrok (Solution 1) and follow the steps above!** 🚀
