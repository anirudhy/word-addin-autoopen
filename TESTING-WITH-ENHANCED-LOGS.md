# 🔍 Testing Project 1 with Enhanced Logging

## Overview
Project 1 now includes comprehensive logging with `[project1]` tags for easy filtering in the browser console. This guide shows you how to start, test, and monitor the add-in.

---

## 🚀 Quick Start

### 1. Start the Backend (Required)

The WebSocket backend must be running first.

```bash
# Navigate to the backend folder
cd C:\Users\ayeddula\word-addin-autoopen-comparison\shared-backend

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

**Expected output:**
```
WebSocket server running on ws://localhost:8080
HTTP server running on http://localhost:3001
```

✅ Leave this terminal running.

---

### 2. Start Project 1

Open a **new terminal** window:

```bash
# Navigate to Project 1
cd C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings

# Install dependencies (first time only)
npm install

# Start the dev server
npm start
```

**Expected output:**
```
webpack compiled successfully
Project running at https://localhost:3000
```

✅ Leave this terminal running.

---

### 3. Verify Local Access

Before sideloading, test that the add-in loads locally:

1. Open browser: **https://localhost:3000/taskpane.html**
2. Accept the certificate warning:
   - Click **Advanced**
   - Click **Proceed to localhost (unsafe)**
3. You should see:
   - Title: "🔌 Client-Side Settings Auto-Open"
   - Connection status indicator
   - Logs appearing in the UI

---

## 📱 Sideload in Word Online

### Step-by-Step

1. **Navigate to Word Online:**
   - Go to https://office.com
   - Sign in with your Microsoft account

2. **Create or open a document:**
   - Click **Word** → **New blank document**
   - Or open an existing document

3. **Insert the Add-in:**
   - Click **Insert** tab in the ribbon
   - Click **Add-ins** → **My Add-ins**
   - Click **Upload My Add-in** (bottom right)
   - Click **Browse...** and select:
     ```
     C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\public\manifest.xml
     ```
   - Click **Upload**

4. **Open the Task Pane:**
   - You'll see "Auto-Open Commands" button in the **Home** ribbon
   - Click **Show Taskpane**
   - Task pane opens on the right side

---

## 🔍 Using the Enhanced Logging

### Browser Console (F12)

Open the browser developer tools and navigate to the **Console** tab.

#### Filter by Project
In the console filter box, type:
```
project1
```

Now you'll only see logs from this add-in!

#### Filter by Subsystem

Get even more specific:

| Filter | Shows |
|--------|-------|
| `[project1] [INIT]` | Initialization only |
| `[project1] [AUTO-OPEN]` | Auto-open settings only |
| `[project1] [WS]` | WebSocket activity only |
| `[project1] [WORD CMD]` | Word command execution only |

---

## 🧪 Testing Workflow

### Test 1: Initial Connection

**What to watch:**
```
[project1] [INFO] [00:12:34.567] === OFFICE ADD-IN STARTING ===
[project1] [INFO] [00:12:34.568] Host: Word
[project1] [INFO] [00:12:34.569] Platform: OfficeOnline
[project1] [INFO] [00:12:34.570] ✓ Running in Word (expected host)
[project1] [INFO] [00:12:34.571] Event listeners attached
[project1] [INFO] [00:12:34.572] [AUTO-OPEN] Checking current auto-open status...
[project1] [INFO] [00:12:34.573] [AUTO-OPEN] Retrieved setting value: undefined
[project1] [INFO] [00:12:34.574] [AUTO-OPEN] Interpreted as: DISABLED
[project1] [INFO] [00:12:34.575] [WS] Attempting connection to ws://localhost:8080
[project1] [RECEIVED] [00:12:34.678] [WS] ✓ WebSocket CONNECTED
```

**What this tells you:**
- ✅ Office.js initialized correctly
- ✅ Running in Word (not Excel/PowerPoint)
- ✅ Auto-open is initially disabled (expected)
- ✅ WebSocket connected successfully

---

### Test 2: Enable Auto-Open

**Steps:**
1. Click the **"Enable Auto-Open"** button

**What to watch:**
```
[project1] [SENT] [00:12:45.123] [AUTO-OPEN] Enable button clicked
[project1] [INFO] [00:12:45.124] [AUTO-OPEN] Reading current setting value...
[project1] [INFO] [00:12:45.125] [AUTO-OPEN] Current value: false
[project1] [INFO] [00:12:45.126] [AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = true
[project1] [INFO] [00:12:45.127] [AUTO-OPEN] Calling settings.saveAsync()...
[project1] [INFO] [00:12:45.234] [AUTO-OPEN] saveAsync callback triggered
[project1] [INFO] [00:12:45.235] [AUTO-OPEN] Result status: succeeded
[project1] [RECEIVED] [00:12:45.236] [AUTO-OPEN] ✓ Setting SAVED successfully to document
[project1] [INFO] [00:12:45.237] [AUTO-OPEN] Verification read: true
```

**What this tells you:**
- ✅ Setting was changed from `false` to `true`
- ✅ Save operation succeeded
- ✅ Verification confirms setting was persisted
- ✅ UI updated to show "Auto-Open: Enabled" (green)

**Expected UI changes:**
- Status indicator turns **green**
- Shows "Auto-Open: Enabled"

---

### Test 3: Verify Auto-Open Behavior

**Steps:**
1. **Save** the document (Ctrl+S or File → Save)
2. **Close** the document tab
3. **Reopen** the document from Recent or OneDrive

**What to watch when reopening:**
```
[project1] [INFO] [00:13:01.123] === OFFICE ADD-IN STARTING ===
[project1] [INFO] [00:13:01.234] [AUTO-OPEN] Checking current auto-open status...
[project1] [INFO] [00:13:01.235] [AUTO-OPEN] Retrieved setting value: true
[project1] [INFO] [00:13:01.236] [AUTO-OPEN] Type: boolean
[project1] [INFO] [00:13:01.237] [AUTO-OPEN] Interpreted as: ENABLED
[project1] [INFO] [00:13:01.345] [WS] Attempting connection to ws://localhost:8080
[project1] [RECEIVED] [00:13:01.456] [WS] ✓ WebSocket CONNECTED
```

**What this tells you:**
- ✅ Task pane opened **automatically** (didn't need to click ribbon button)
- ✅ Setting persisted (still shows `true`)
- ✅ WebSocket reconnected automatically

---

### Test 4: WebSocket Message Flow

**What to watch:**
```
[project1] [RECEIVED] [00:13:15.678] [WS] ⬇ Message received (87 bytes)
[project1] [RECEIVED] [00:13:15.679] [WS] Parsed message type: execute
[project1] [INFO] [00:13:15.680] [WS] Full message: {"type":"execute","action":"insertText","data":{"text":"Hello from WebSocket! "},"commandId":"cmd-123"}
[project1] [RECEIVED] [00:13:15.681] [WS] Execute command received - action: insertText
[project1] [SENT] [00:13:15.682] [WORD CMD] Executing command: insertText
[project1] [INFO] [00:13:15.683] [WORD CMD] Command data: {"text":"Hello from WebSocket! "}
[project1] [INFO] [00:13:15.684] [WORD CMD] Word.run context established
[project1] [INFO] [00:13:15.685] [WORD CMD] Inserting text: "Hello from WebSocket! " at location: end
[project1] [INFO] [00:13:15.786] [WORD CMD] Syncing changes to Word...
[project1] [INFO] [00:13:15.890] [WORD CMD] ✓ Sync complete
[project1] [SENT] [00:13:15.891] [WS] ⬆ Sending success response: {"type":"executionResult","commandId":"cmd-123","success":true}
[project1] [SENT] [00:13:15.892] [WORD CMD] ✓ insertText completed successfully
```

**What this tells you:**
- ✅ Backend sent a command
- ✅ Add-in received and parsed the message
- ✅ Word API executed the command
- ✅ Text was inserted successfully
- ✅ Success response sent back to backend

**Expected document changes:**
- Blue text appears: "Hello from WebSocket! "

---

### Test 5: Disable Auto-Open

**Steps:**
1. Click the **"Disable Auto-Open"** button

**What to watch:**
```
[project1] [SENT] [00:14:00.123] [AUTO-OPEN] Disable button clicked
[project1] [INFO] [00:14:00.124] [AUTO-OPEN] Reading current setting value...
[project1] [INFO] [00:14:00.125] [AUTO-OPEN] Current value: true
[project1] [INFO] [00:14:00.126] [AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = false
[project1] [INFO] [00:14:00.234] [AUTO-OPEN] saveAsync callback triggered
[project1] [RECEIVED] [00:14:00.235] [AUTO-OPEN] ✓ Setting SAVED successfully to document
```

**Expected UI changes:**
- Status indicator turns **red**
- Shows "Auto-Open: Disabled"

**Verify:**
1. Close and reopen document
2. Task pane should **NOT** open automatically
3. You'll need to click ribbon button again

---

## 🚨 Troubleshooting with Logs

### Problem: WebSocket Won't Connect

**Look for:**
```
[project1] [ERROR] [00:12:34.567] [WS] ✗ WebSocket ERROR event triggered
[project1] [ERROR] [00:12:34.568] [WS] Close code: 1006, reason: ""
```

**Solutions:**
1. Check backend is running:
   ```bash
   curl http://localhost:3001/health
   ```
2. Restart backend if needed:
   ```bash
   cd shared-backend
   npm start
   ```

---

### Problem: Auto-Open Not Working

**Look for:**
```
[project1] [ERROR] [00:12:45.123] [AUTO-OPEN] ✗ FAILED to save: ...
```

**Or:**
```
[project1] [INFO] [00:13:01.235] [AUTO-OPEN] Retrieved setting value: undefined
```

**Solutions:**
1. Ensure you clicked "Enable Auto-Open" button
2. Ensure you saved the document after enabling
3. Check that you're testing with the **same document** (not a new one)

---

### Problem: Commands Not Executing

**Look for:**
```
[project1] [ERROR] [00:13:15.789] [WORD CMD] ✗ insertText FAILED: ...
[project1] [ERROR] [00:13:15.790] [WORD CMD] Error stack: ...
```

**Solutions:**
1. Check the full error message in logs
2. Verify the command format is correct
3. Check that document isn't read-only

---

## 📊 Log Categories Explained

| Category | Prefix | What It Tracks |
|----------|--------|----------------|
| **Initialization** | `[INIT]` | Add-in startup, Office.js ready, DOM setup |
| **Auto-Open** | `[AUTO-OPEN]` | Setting reads/writes, enable/disable operations |
| **WebSocket** | `[WS]` | Connection lifecycle, messages, reconnection |
| **Word Commands** | `[WORD CMD]` | Command execution, Word API calls, sync operations |

| Log Type | Color in UI | Meaning |
|----------|-------------|---------|
| `[INFO]` | Black | General information |
| `[SENT]` | Green | Outgoing actions/messages |
| `[RECEIVED]` | Blue | Incoming data/success |
| `[ERROR]` | Red | Failures/errors |

---

## ✅ Success Checklist

### Initial Setup
- [ ] Backend running on `ws://localhost:8080`
- [ ] Project 1 running on `https://localhost:3000`
- [ ] Can access `https://localhost:3000/taskpane.html` in browser
- [ ] Certificate accepted (no blocking errors)

### Sideloading
- [ ] Add-in uploaded to Word Online
- [ ] "Auto-Open Commands" appears in Home ribbon
- [ ] "Show Taskpane" button clickable
- [ ] Task pane opens successfully

### Auto-Open Feature
- [ ] Initial status shows "Auto-Open: Disabled"
- [ ] Click "Enable Auto-Open" → status turns green
- [ ] Save, close, reopen document
- [ ] Task pane opens **automatically**
- [ ] WebSocket reconnects automatically

### WebSocket Communication
- [ ] Green "Connected to WebSocket" status
- [ ] Logs show message flow
- [ ] Blue text appears in document
- [ ] Commands execute successfully

### Console Logging
- [ ] Browser console shows `[project1]` tagged logs
- [ ] Can filter by `[project1]` to see only this add-in
- [ ] Can filter by subsystem (`[WS]`, `[AUTO-OPEN]`, etc.)
- [ ] Timestamps show precise timing (with milliseconds)

---

## 🎯 What to Expect

### Normal Operation Sequence

1. **Office.onReady** → Add-in initializes
2. **Check auto-open status** → Reads document setting
3. **Connect WebSocket** → Establishes connection to backend
4. **User clicks Enable** → Setting saved to document
5. **Document reopen** → Task pane opens automatically
6. **WebSocket reconnects** → Resume communication
7. **Commands execute** → Blue text appears

### Timeline (Typical)
- **0-500ms:** Office initialization
- **500-1000ms:** WebSocket connection
- **10s intervals:** Backend sends commands (if configured)
- **User actions:** Instant response to button clicks

---

## 📝 Additional Notes

### Performance
- Logs include **millisecond precision** timestamps
- You can measure exact timing of operations
- Use this to identify bottlenecks

### Filtering Tips
```javascript
// In browser console, you can also use regex filters:
/\[project1\].*\[WS\]/     // Only WebSocket logs
/\[project1\].*\[ERROR\]/  // Only errors
/\[project1\].*insertText/ // Only insertText operations
```

### Saving Logs
Right-click in console → **Save as...** to export logs for analysis

---

**Happy Testing! 🚀**

All logs are now tagged with `[project1]` and categorized for easy debugging. Use the browser console filters to focus on specific subsystems and troubleshoot issues effectively.
