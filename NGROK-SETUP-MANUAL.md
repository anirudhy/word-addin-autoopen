# 🚀 Manual ngrok Setup Instructions

## Step 1: Download ngrok

1. **Open your browser** and go to: https://ngrok.com/download
2. Click **"Download for Windows"** (64-bit)
3. Save the ZIP file to your Downloads folder

**OR** use this direct link:
https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip

---

## Step 2: Extract ngrok

1. Go to your **Downloads** folder
2. **Right-click** on `ngrok-v3-stable-windows-amd64.zip`
3. Click **"Extract All..."**
4. Extract to: `C:\Users\ayeddula\ngrok\`
5. You should now have: `C:\Users\ayeddula\ngrok\ngrok.exe`

---

## Step 3: Sign up for ngrok (Free)

1. Go to: https://dashboard.ngrok.com/signup
2. Sign up with email or GitHub
3. After signing in, go to: https://dashboard.ngrok.com/get-started/your-authtoken
4. **Copy your authtoken** (looks like: `2abCdEf3GhIjK4lMnOpQrStUvWxYz_5AbCdEfGhIjKlMn`)

---

## Step 4: Configure ngrok with Your Token

Open **Command Prompt** (Win+R, type `cmd`, press Enter) and run:

```cmd
cd C:\Users\ayeddula\ngrok
ngrok.exe config add-authtoken YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token you copied in Step 3.

**Example:**
```cmd
ngrok.exe config add-authtoken 2abCdEf3GhIjK4lMnOpQrStUvWxYz_5AbCdEfGhIjKlMn
```

You should see:
```
Authtoken saved to configuration file: C:\Users\ayeddula/.ngrok2/ngrok.yml
```

---

## Step 5: Start ngrok Tunnel

In the same Command Prompt window:

```cmd
ngrok.exe http 8080
```

**You should see output like this:**
```
ngrok

Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       50ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abcd-12-34-56-78.ngrok-free.app -> http://localhost:8080

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**✅ COPY THE HTTPS URL!**

The line that says `Forwarding` shows your public URL. Example:
```
https://abcd-12-34-56-78.ngrok-free.app
```

**IMPORTANT:**
- Use the **HTTPS** URL (not HTTP)
- Keep this Command Prompt window **open** - closing it stops the tunnel
- The URL changes each time you restart ngrok (free tier)

---

## Step 6: Verify ngrok is Working

Open another Command Prompt and test:

```cmd
curl https://YOUR-NGROK-URL.ngrok-free.app/health
```

Replace `YOUR-NGROK-URL` with your actual ngrok URL.

**Expected response:**
```json
{"status":"ok","connections":0,"timestamp":"2026-02-10T..."}
```

If you see this, ngrok is working! ✅

---

## ⚠️ Common Issues

### "command not found: ngrok"
- Make sure you're in the correct directory: `cd C:\Users\ayeddula\ngrok`
- Or use the full path: `C:\Users\ayeddula\ngrok\ngrok.exe http 8080`

### "ERR_NGROK_108" or authentication error
- Your authtoken wasn't configured correctly
- Re-run: `ngrok.exe config add-authtoken YOUR_TOKEN`
- Make sure you copied the entire token

### Firewall blocking ngrok
- Windows Firewall might ask for permission
- Click **"Allow access"**

---

## 📝 What to Do Next

Once ngrok is running and you have your HTTPS URL:

1. **Tell me your ngrok URL** (e.g., `https://abcd-1234.ngrok-free.app`)
2. I'll update your `taskpane.js` file to use it
3. Restart the frontend
4. Test in Word Online - WebSocket should connect! ✅

---

## 🔧 Quick Reference

**Start ngrok:**
```cmd
cd C:\Users\ayeddula\ngrok
ngrok.exe http 8080
```

**Stop ngrok:**
- Press `Ctrl+C` in the Command Prompt window

**Restart ngrok:**
- Just run `ngrok.exe http 8080` again
- You'll get a NEW URL (free tier limitation)

---

**Follow these steps and let me know your ngrok URL when it's running!** 🚀
