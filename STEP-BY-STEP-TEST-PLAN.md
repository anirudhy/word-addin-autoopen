# 📋 Complete Testing Guide for Project 1

## 📍 Where is Your Add-in?

Your manifest file is located at:
```
C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\public\manifest.xml
```

This is the file you'll upload to Word Online.

---

## 🎯 Complete Testing Workflow

### Phase 1: Sideload the Add-in

#### Step 1: Go to Word Online
1. Open browser (Chrome/Edge recommended)
2. Navigate to: **https://office.com**
3. Sign in with your Microsoft account
4. Click **Word** icon
5. Click **New blank document**

#### Step 2: Upload the Add-in
1. In the document, click the **Insert** tab (top ribbon)
2. Click **Add-ins** button
3. Click **My Add-ins** (left sidebar)
4. Click **Upload My Add-in** (bottom right corner)
5. Click **Browse...** button
6. Navigate to:
   ```
   C:\Users\ayeddula\word-addin-autoopen-comparison\01-client-side-settings\public\manifest.xml
   ```
7. Click **Open**
8. Click **Upload**
9. Wait for confirmation message

#### Step 3: Find Your Add-in
After upload, you should see:
- A new button group in the **Home** ribbon tab
- Button group labeled: **"Auto-Open Commands"**
- Contains a button: **"Show Taskpane"**

---

### Phase 2: Initial Testing (No Auto-Open Yet)

#### Test 1: Open Task Pane Manually

**Action:**
1. Click the **"Show Taskpane"** button in the Home ribbon

**Expected Result:**
✅ Task pane opens on the right side of the document

**What to See:**
- Title: "🔌 Client-Side Settings Auto-Open"
- Green status: "Connected to WebSocket"
- Log window with entries
- "Enable Auto-Open" button
- "Disable Auto-Open" button
- Status showing: "Auto-Open: Disabled" (red)

**In Browser Console (F12 → Console tab, filter: `project1`):**
```
[project1] [INFO] === OFFICE ADD-IN STARTING ===
[project1] [INFO] Host: Word
[project1] [INFO] Platform: OfficeOnline
[project1] [INFO] ✓ Running in Word (expected host)
[project1] [INFO] Event listeners attached
[project1] [INFO] [AUTO-OPEN] Checking current auto-open status...
[project1] [INFO] [AUTO-OPEN] Retrieved setting value: undefined
[project1] [INFO] [AUTO-OPEN] Type: undefined
[project1] [INFO] [AUTO-OPEN] Interpreted as: DISABLED
[project1] [INFO] [WS] Attempting connection to ws://localhost:8080
[project1] [RECEIVED] [WS] ✓ WebSocket CONNECTED
[project1] [SENT] [WS] Sending initial ping: {"type":"ping","source":"client-side-settings","timestamp":...}
```

**What This Tests:**
- ✅ Add-in loads successfully
- ✅ Office.js initializes correctly
- ✅ WebSocket connects to backend
- ✅ Initial auto-open status is DISABLED (expected)

---

#### Test 2: WebSocket Communication

**Action:**
1. Keep task pane open
2. Wait 10 seconds (backend sends commands every 10 seconds)

**Expected Result:**
✅ Blue text appears in your Word document: "Hello from WebSocket! "

**In Task Pane Log:**
```
[00:12:34.567] [WS] ⬇ Message received (87 bytes)
[00:12:34.568] [WS] Parsed message type: execute
[00:12:34.569] [WORD CMD] Executing command: insertText
[00:12:34.570] ✓ insertText completed successfully
```

**In Browser Console:**
```
[project1] [RECEIVED] [WS] ⬇ Message received (87 bytes)
[project1] [RECEIVED] [WS] Parsed message type: execute
[project1] [INFO] [WS] Full message: {"type":"execute","action":"insertText",...}
[project1] [SENT] [WORD CMD] Executing command: insertText
[project1] [INFO] [WORD CMD] Command data: {"text":"Hello from WebSocket! "}
[project1] [INFO] [WORD CMD] Word.run context established
[project1] [INFO] [WORD CMD] Inserting text: "Hello from WebSocket! " at location: end
[project1] [INFO] [WORD CMD] Syncing changes to Word...
[project1] [INFO] [WORD CMD] ✓ Sync complete
[project1] [SENT] [WORD CMD] ✓ insertText completed successfully
```

**What This Tests:**
- ✅ WebSocket is actually connected
- ✅ Backend can send commands to add-in
- ✅ Add-in can execute Word API commands
- ✅ Text appears in document (visible proof)

---

#### Test 3: Close and Reopen Task Pane

**Action:**
1. Click the **X** button on the task pane to close it
2. Click **"Show Taskpane"** button in ribbon again

**Expected Result:**
✅ Task pane reopens
✅ WebSocket reconnects
✅ Status shows "Auto-Open: Disabled" (still disabled)

**In Browser Console:**
```
[project1] [INFO] === OFFICE ADD-IN STARTING ===
[project1] [INFO] [AUTO-OPEN] Retrieved setting value: undefined
[project1] [INFO] [AUTO-OPEN] Interpreted as: DISABLED
[project1] [RECEIVED] [WS] ✓ WebSocket CONNECTED
```

**What This Tests:**
- ✅ Task pane can be reopened
- ✅ Setting persists (still disabled)
- ✅ WebSocket reconnects automatically

---

### Phase 3: Enable Auto-Open Feature

#### Test 4: Enable Auto-Open

**Action:**
1. With task pane open, click **"Enable Auto-Open"** button

**Expected Result:**
✅ Status changes to "Auto-Open: Enabled" (green)
✅ Success message in log

**In Task Pane Log:**
```
[00:15:00.123] [AUTO-OPEN] Enable button clicked
[00:15:00.124] [AUTO-OPEN] Reading current setting value...
[00:15:00.125] [AUTO-OPEN] Current value: false
[00:15:00.126] [AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = true
[00:15:00.234] ✓ Auto-open enabled successfully
[00:15:00.235] Auto-Open: Enabled
```

**In Browser Console:**
```
[project1] [SENT] [AUTO-OPEN] Enable button clicked
[project1] [INFO] [AUTO-OPEN] Reading current setting value...
[project1] [INFO] [AUTO-OPEN] Current value: undefined
[project1] [INFO] [AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = true
[project1] [INFO] [AUTO-OPEN] Calling settings.saveAsync()...
[project1] [INFO] [AUTO-OPEN] saveAsync callback triggered
[project1] [INFO] [AUTO-OPEN] Result status: succeeded
[project1] [RECEIVED] [AUTO-OPEN] ✓ Setting SAVED successfully to document
[project1] [RECEIVED] [AUTO-OPEN] Task pane will auto-open on next document load
[project1] [INFO] [AUTO-OPEN] Verification read: true
[project1] [INFO] [AUTO-OPEN] Updating UI status indicator to: ENABLED
```

**What This Tests:**
- ✅ Button click triggers setting change
- ✅ Office.js settings API works
- ✅ Setting saves successfully to document
- ✅ Verification confirms setting was written
- ✅ UI updates to show enabled state

---

#### Test 5: Save Document

**Action:**
1. Click **File** → **Save As** (or press Ctrl+S)
2. Name it: `test-auto-open.docx`
3. Save to **OneDrive**
4. Wait for "Saved" confirmation

**Expected Result:**
✅ Document saved successfully
✅ Auto-open setting is embedded in the document file

**What This Tests:**
- ✅ Setting persists when document is saved
- ✅ Document contains the auto-open configuration

---

### Phase 4: Verify Auto-Open Works

#### Test 6: Close and Reopen Document

**Action:**
1. **Close the document tab** (X on the browser tab)
2. Go back to https://office.com
3. Click on **Recent** → find `test-auto-open.docx`
4. Click to open it

**Expected Result (THIS IS THE KEY TEST!):**
✅ Document opens
✅ Task pane **automatically opens** WITHOUT clicking any button
✅ WebSocket connects automatically
✅ Blue text continues to appear (if backend is running)

**In Browser Console (immediately when document opens):**
```
[project1] [INFO] === OFFICE ADD-IN STARTING ===
[project1] [INFO] [AUTO-OPEN] Checking current auto-open status...
[project1] [INFO] [AUTO-OPEN] Retrieved setting value: true
[project1] [INFO] [AUTO-OPEN] Type: boolean
[project1] [INFO] [AUTO-OPEN] Interpreted as: ENABLED
[project1] [INFO] [AUTO-OPEN] Updating UI status indicator to: ENABLED
[project1] [INFO] [WS] Attempting connection to ws://localhost:8080
[project1] [RECEIVED] [WS] ✓ WebSocket CONNECTED
```

**What This Tests:**
- ✅ AUTO-OPEN WORKS! (Most important test)
- ✅ Setting was persisted in document
- ✅ Task pane opens without user action
- ✅ WebSocket auto-connects on pane open
- ✅ Full functionality restored automatically

---

### Phase 5: Test Disable Auto-Open

#### Test 7: Disable Auto-Open

**Action:**
1. With task pane open (from auto-open), click **"Disable Auto-Open"** button

**Expected Result:**
✅ Status changes to "Auto-Open: Disabled" (red)

**In Browser Console:**
```
[project1] [SENT] [AUTO-OPEN] Disable button clicked
[project1] [INFO] [AUTO-OPEN] Current value: true
[project1] [INFO] [AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = false
[project1] [RECEIVED] [AUTO-OPEN] ✓ Setting SAVED successfully to document
[project1] [INFO] [AUTO-OPEN] Verification read: false
```

**What This Tests:**
- ✅ Can disable auto-open after enabling
- ✅ Setting updates correctly

---

#### Test 8: Verify Disabled State

**Action:**
1. Save document (Ctrl+S)
2. Close document tab
3. Reopen document from Recent

**Expected Result:**
✅ Document opens
❌ Task pane does **NOT** open automatically
✅ Must click "Show Taskpane" button manually

**In Browser Console (after manually opening):**
```
[project1] [INFO] [AUTO-OPEN] Retrieved setting value: false
[project1] [INFO] [AUTO-OPEN] Interpreted as: DISABLED
```

**What This Tests:**
- ✅ Disable function works
- ✅ Setting persists when disabled
- ✅ Must manually open task pane again

---

### Phase 6: Edge Cases & Error Testing

#### Test 9: WebSocket Reconnection

**Action:**
1. With task pane open and connected, stop the backend:
   ```bash
   claude task stop bb6d9bd
   ```
2. Watch the task pane

**Expected Result:**
✅ Status changes to "Disconnected" (red)
✅ Reconnection attempts shown in log

**In Task Pane Log:**
```
[00:20:00.000] [WS] ✗ WebSocket connection closed
[00:20:00.001] Reconnecting in 3s (attempt 1/5)
[00:20:03.001] Reconnecting in 6s (attempt 2/5)
[00:20:09.001] Reconnecting in 12s (attempt 3/5)
```

**Action (Resume):**
1. Restart backend:
   ```bash
   cd C:\Users\ayeddula\word-addin-autoopen-comparison\shared-backend
   npm start
   ```
2. Wait for reconnection or click **"Reconnect"** button

**Expected Result:**
✅ Connection restored
✅ Status back to "Connected" (green)

**What This Tests:**
- ✅ Handles WebSocket disconnections gracefully
- ✅ Auto-reconnect with exponential backoff
- ✅ Manual reconnect button works

---

#### Test 10: New Document (No Auto-Open)

**Action:**
1. Create a **new blank document** (don't open the saved one)
2. Open the task pane manually

**Expected Result:**
✅ Task pane opens
✅ Status shows "Auto-Open: Disabled" (red)
✅ Auto-open only applies to specific documents, not all documents

**What This Tests:**
- ✅ Auto-open is per-document, not global
- ✅ New documents start with disabled state
- ✅ Each document has independent settings

---

## 📊 Success Criteria Summary

### ✅ Must Pass (Core Functionality)

| Test | What It Validates | Status |
|------|-------------------|--------|
| **Test 1** | Add-in loads and initializes | ⬜ |
| **Test 2** | WebSocket communication works | ⬜ |
| **Test 4** | Enable auto-open saves setting | ⬜ |
| **Test 6** | Auto-open actually works on reopen | ⬜ |
| **Test 7** | Disable auto-open works | ⬜ |
| **Test 8** | Disabled state persists | ⬜ |

### ✅ Should Pass (Enhanced Features)

| Test | What It Validates | Status |
|------|-------------------|--------|
| **Test 3** | Pane can reopen after close | ⬜ |
| **Test 9** | WebSocket reconnection works | ⬜ |
| **Test 10** | Per-document setting isolation | ⬜ |

---

## 🎯 What You're Testing For

### Primary Goal: Auto-Open Functionality
**Question:** Does the task pane automatically open when you reopen a document where you enabled auto-open?

**Answer:** YES if Test 6 passes ✅

### Secondary Goal: WebSocket Persistence
**Question:** Does the WebSocket reconnect when the pane auto-opens?

**Answer:** YES if Test 6 shows WebSocket connected ✅

### Tertiary Goal: User Control
**Question:** Can users enable/disable auto-open at will?

**Answer:** YES if Tests 4, 7, 8 all pass ✅

---

## 📝 Common Issues & Solutions

### Issue: Task Pane Won't Open
**Symptoms:** Clicking "Show Taskpane" does nothing

**Solutions:**
1. Check browser console for errors (F12)
2. Verify https://localhost:3000 is running
3. Refresh the Word document
4. Try removing and re-uploading the add-in

---

### Issue: WebSocket Won't Connect
**Symptoms:** Status stuck on "Disconnected" (red)

**Solutions:**
1. Check backend is running: `curl http://localhost:3001/health`
2. Look for firewall blocking port 8080
3. Check browser console for WebSocket errors
4. Try clicking "Reconnect" button

---

### Issue: Auto-Open Doesn't Work
**Symptoms:** Task pane doesn't open on document reopen

**Solutions:**
1. Check console logs - was setting actually saved?
   - Look for: `[AUTO-OPEN] Setting SAVED successfully`
2. Did you save the document after enabling?
3. Are you reopening the **same document**? (not a new one)
4. Check status indicator was green before closing
5. Verify setting in console:
   ```javascript
   Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument')
   // Should return: true
   ```

---

### Issue: Blue Text Not Appearing
**Symptoms:** No text inserted in document

**Solutions:**
1. Is WebSocket connected? (should be green)
2. Is backend running and sending commands?
3. Check console for command execution logs
4. Backend sends commands every 10 seconds - wait a bit

---

## 🔧 Debugging Tools

### Browser Console Commands

Open console (F12) and run:

```javascript
// Check current auto-open setting
Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument')

// Check WebSocket state (in task pane context)
ws.readyState
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED

// Filter logs
// Type in filter box: project1
// or: [project1] [WS]
// or: [project1] [AUTO-OPEN]
```

---

## 🎓 What You Learn From This

### Understanding #1: Office.js Settings API
The auto-open feature uses:
```javascript
Office.context.document.settings.set('Office.AutoShowTaskpaneWithDocument', true);
Office.context.document.settings.saveAsync(callback);
```

This setting is **embedded in the document file** and persists across sessions.

### Understanding #2: Per-Document vs Global
Auto-open is **per-document**, not global. Each document stores its own preference. This is different from Approach #2 (Shared Runtime) which is more persistent.

### Understanding #3: User Control
This approach gives users full control. They must explicitly enable auto-open. Good for optional features, but requires user action.

### Understanding #4: WebSocket Lifecycle
The WebSocket only stays connected **while the task pane is open**. If the pane closes, the connection closes. This is different from Approach #2 which maintains connections even when pane is closed.

---

## ✅ Final Checklist

Before considering testing complete:

- [ ] Add-in sideloaded successfully
- [ ] Task pane opens manually first time
- [ ] WebSocket connects and shows green status
- [ ] Blue text appears in document (WebSocket works)
- [ ] Clicked "Enable Auto-Open" → status turns green
- [ ] Saved document after enabling
- [ ] Closed and reopened document
- [ ] **Task pane opened automatically** (KEY SUCCESS!)
- [ ] WebSocket reconnected on auto-open
- [ ] Clicked "Disable Auto-Open" → status turns red
- [ ] Closed and reopened → pane did NOT auto-open
- [ ] Console logs show detailed [project1] tagged output
- [ ] Can filter console by `project1` successfully

---

**If all checkboxes are checked, Project 1 is working perfectly!** 🎉

The enhanced logging will help you understand exactly what's happening at each step and troubleshoot any issues quickly.
