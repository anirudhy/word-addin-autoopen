/* global Office, Word */

const WS_URL = 'wss://fundic-erinn-uncreative.ngrok-free.dev';
let ws = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

// DOM elements
let wsStatus, wsStatusText, log, enableAutoOpenBtn, disableAutoOpenBtn, autoOpenStatus, reconnectBtn, clearLogBtn;

Office.onReady((info) => {
  console.log('[project1] [INIT] Office.onReady called', info);

  // Initialize DOM references first
  wsStatus = document.getElementById('wsStatus');
  wsStatusText = document.getElementById('wsStatusText');
  log = document.getElementById('log');
  enableAutoOpenBtn = document.getElementById('enableAutoOpen');
  disableAutoOpenBtn = document.getElementById('disableAutoOpen');
  autoOpenStatus = document.getElementById('autoOpenStatus');
  reconnectBtn = document.getElementById('reconnectBtn');
  clearLogBtn = document.getElementById('clearLog');

  addLog(`=== OFFICE ADD-IN STARTING ===`, 'info');
  addLog(`Host: ${info.host}`, 'info');
  addLog(`Platform: ${info.platform}`, 'info');

  if (info.host === Office.HostType.Word) {
    addLog(`✓ Running in Word (expected host)`, 'info');

    // Set up event listeners
    enableAutoOpenBtn.addEventListener('click', enableAutoOpen);
    disableAutoOpenBtn.addEventListener('click', disableAutoOpen);
    reconnectBtn.addEventListener('click', connectWebSocket);
    clearLogBtn.addEventListener('click', () => {
      addLog('--- Log cleared by user ---', 'info');
      log.innerHTML = '';
    });

    addLog(`Event listeners attached`, 'info');

    // Check current auto-open status
    addLog(`Checking initial auto-open status...`, 'info');
    checkAutoOpenStatus();

    // WebSocket is OPTIONAL for testing - auto-open works without it
    addLog(`⚠️ WebSocket disabled for testing (browser security restrictions)`, 'info');
    addLog(`✓ Auto-open feature will still work perfectly!`, 'info');
    updateConnectionStatus('disabled');

    // Uncomment below to try WebSocket connection (will likely fail from office.com)
    // addLog(`Initiating WebSocket connection...`, 'info');
    // connectWebSocket();

    addLog(`=== INITIALIZATION COMPLETE ===`, 'info');
  } else {
    addLog(`✗ Unexpected host: ${info.host} (expected Word)`, 'error');
  }
});

function addLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
  const logMessage = `[${timestamp}] ${message}`;

  // Console logging for debugging with project tag
  console.log(`[project1] [${type.toUpperCase()}] ${logMessage}`);

  // UI logging
  if (log) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = logMessage;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }
}

function updateConnectionStatus(status) {
  wsStatus.className = `status ${status}`;
  const messages = {
    connected: 'Connected to WebSocket',
    connecting: 'Connecting...',
    disconnected: 'Disconnected',
    disabled: 'WebSocket Disabled (Testing Mode)'
  };
  wsStatusText.textContent = messages[status] || status;
  addLog(`[WS STATUS] ${messages[status] || status}`, 'info');
}

function connectWebSocket() {
  addLog(`[WS] connectWebSocket() called`, 'info');

  if (ws) {
    addLog(`[WS] Existing WebSocket state: ${['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][ws.readyState]}`, 'info');
  }

  if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
    addLog('[WS] WebSocket already connected or connecting - skipping', 'info');
    return;
  }

  updateConnectionStatus('connecting');
  addLog(`[WS] Attempting connection to ${WS_URL}`, 'info');

  try {
    ws = new WebSocket(WS_URL);
    addLog(`[WS] WebSocket object created successfully`, 'info');

    ws.onopen = () => {
      reconnectAttempts = 0;
      updateConnectionStatus('connected');
      addLog('[WS] ✓ WebSocket CONNECTED', 'received');

      // Send initial ping
      const pingMessage = { type: 'ping', source: 'client-side-settings', timestamp: Date.now() };
      addLog(`[WS] Sending initial ping: ${JSON.stringify(pingMessage)}`, 'sent');
      ws.send(JSON.stringify(pingMessage));
    };

    ws.onmessage = (event) => {
      addLog(`[WS] ⬇ Message received (${event.data.length} bytes)`, 'received');
      try {
        const data = JSON.parse(event.data);
        addLog(`[WS] Parsed message type: ${data.type}`, 'received');
        addLog(`[WS] Full message: ${JSON.stringify(data)}`, 'info');

        if (data.type === 'execute') {
          addLog(`[WS] Execute command received - action: ${data.action}`, 'received');
          executeWordCommand(data);
        } else if (data.type === 'pong') {
          addLog(`[WS] Pong received from server`, 'received');
        } else {
          addLog(`[WS] Unhandled message type: ${data.type}`, 'info');
        }
      } catch (err) {
        addLog(`[WS] ✗ Error parsing message: ${err.message}`, 'error');
        addLog(`[WS] Raw data: ${event.data}`, 'error');
      }
    };

    ws.onerror = (error) => {
      addLog(`[WS] ✗ WebSocket ERROR event triggered`, 'error');
      addLog(`[WS] Error details: ${error.message || 'No error message available'}`, 'error');
      addLog(`[WS] Error type: ${error.type}`, 'error');
    };

    ws.onclose = (event) => {
      updateConnectionStatus('disconnected');
      addLog(`[WS] ✗ WebSocket CLOSED`, 'error');
      addLog(`[WS] Close code: ${event.code}, reason: "${event.reason || 'No reason provided'}"`, 'error');
      addLog(`[WS] Was clean close: ${event.wasClean}`, 'info');

      // Auto-reconnect with exponential backoff
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1);
        addLog(`[WS] Will reconnect in ${delay / 1000}s (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`, 'info');
        setTimeout(connectWebSocket, delay);
      } else {
        addLog(`[WS] ✗ Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached - giving up`, 'error');
      }
    };
  } catch (err) {
    addLog(`[WS] ✗ Failed to create WebSocket: ${err.message}`, 'error');
    addLog(`[WS] Stack trace: ${err.stack}`, 'error');
    updateConnectionStatus('disconnected');
  }
}

async function executeWordCommand(command) {
  addLog(`[WORD CMD] Executing command: ${command.action}`, 'sent');
  addLog(`[WORD CMD] Command data: ${JSON.stringify(command.data || {})}`, 'info');
  addLog(`[WORD CMD] Command ID: ${command.commandId || 'N/A'}`, 'info');

  try {
    await Word.run(async (context) => {
      const { action, data } = command;
      addLog(`[WORD CMD] Word.run context established`, 'info');

      switch (action) {
        case 'insertText':
          addLog(`[WORD CMD] Inserting text: "${data.text}" at location: ${data.location || 'end'}`, 'info');
          const range = context.document.body.insertText(
            data.text,
            data.location || Word.InsertLocation.end
          );
          range.font.color = 'blue';
          addLog(`[WORD CMD] Text range created, color set to blue`, 'info');
          break;

        case 'getSelection':
          addLog(`[WORD CMD] Getting current selection`, 'info');
          const selection = context.document.getSelection();
          selection.load('text');
          await context.sync();
          addLog(`[WORD CMD] Selection text: "${selection.text}"`, 'received');
          break;

        case 'highlightText':
          addLog(`[WORD CMD] Highlighting selection with color: ${data.color || 'yellow'}`, 'info');
          const sel = context.document.getSelection();
          sel.font.highlightColor = data.color || 'yellow';
          break;

        default:
          addLog(`[WORD CMD] ✗ Unknown action: ${action}`, 'error');
          return;
      }

      addLog(`[WORD CMD] Syncing changes to Word...`, 'info');
      await context.sync();
      addLog(`[WORD CMD] ✓ Sync complete`, 'info');

      // Send success response back to server
      if (ws && ws.readyState === WebSocket.OPEN) {
        const response = {
          type: 'executionResult',
          commandId: command.commandId,
          success: true,
          timestamp: Date.now()
        };
        addLog(`[WS] ⬆ Sending success response: ${JSON.stringify(response)}`, 'sent');
        ws.send(JSON.stringify(response));
      } else {
        addLog(`[WS] Cannot send response - WebSocket not open (state: ${ws ? ws.readyState : 'null'})`, 'error');
      }

      addLog(`[WORD CMD] ✓ ${action} completed successfully`, 'sent');
    });
  } catch (error) {
    addLog(`[WORD CMD] ✗ ${command.action} FAILED: ${error.message}`, 'error');
    addLog(`[WORD CMD] Error stack: ${error.stack}`, 'error');

    // Send error response back to server
    if (ws && ws.readyState === WebSocket.OPEN) {
      const errorResponse = {
        type: 'executionResult',
        commandId: command.commandId,
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
      addLog(`[WS] ⬆ Sending error response: ${JSON.stringify(errorResponse)}`, 'error');
      ws.send(JSON.stringify(errorResponse));
    }
  }
}

function enableAutoOpen() {
  addLog('[AUTO-OPEN] Enable button clicked', 'sent');
  addLog('[AUTO-OPEN] Reading current setting value...', 'info');

  const currentValue = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
  addLog(`[AUTO-OPEN] Current value: ${currentValue}`, 'info');

  addLog('[AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = true', 'info');
  Office.context.document.settings.set('Office.AutoShowTaskpaneWithDocument', true);

  addLog('[AUTO-OPEN] Calling settings.saveAsync()...', 'info');
  Office.context.document.settings.saveAsync((result) => {
    addLog(`[AUTO-OPEN] saveAsync callback triggered`, 'info');
    addLog(`[AUTO-OPEN] Result status: ${result.status}`, 'info');

    if (result.status === Office.AsyncResultStatus.Succeeded) {
      addLog('[AUTO-OPEN] ✓ Setting SAVED successfully to document', 'received');
      addLog('[AUTO-OPEN] Task pane will auto-open on next document load', 'received');

      // Verify it was actually saved
      const verifyValue = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
      addLog(`[AUTO-OPEN] Verification read: ${verifyValue}`, 'info');

      updateAutoOpenStatus(true);
    } else {
      addLog(`[AUTO-OPEN] ✗ FAILED to save: ${result.error.message}`, 'error');
      addLog(`[AUTO-OPEN] Error code: ${result.error.code}`, 'error');
      addLog(`[AUTO-OPEN] Error name: ${result.error.name}`, 'error');
    }
  });
}

function disableAutoOpen() {
  addLog('[AUTO-OPEN] Disable button clicked', 'sent');
  addLog('[AUTO-OPEN] Reading current setting value...', 'info');

  const currentValue = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
  addLog(`[AUTO-OPEN] Current value: ${currentValue}`, 'info');

  addLog('[AUTO-OPEN] Setting Office.AutoShowTaskpaneWithDocument = false', 'info');
  Office.context.document.settings.set('Office.AutoShowTaskpaneWithDocument', false);

  addLog('[AUTO-OPEN] Calling settings.saveAsync()...', 'info');
  Office.context.document.settings.saveAsync((result) => {
    addLog(`[AUTO-OPEN] saveAsync callback triggered`, 'info');
    addLog(`[AUTO-OPEN] Result status: ${result.status}`, 'info');

    if (result.status === Office.AsyncResultStatus.Succeeded) {
      addLog('[AUTO-OPEN] ✓ Setting SAVED successfully to document', 'received');
      addLog('[AUTO-OPEN] Task pane will NOT auto-open on next document load', 'received');

      // Verify it was actually saved
      const verifyValue = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
      addLog(`[AUTO-OPEN] Verification read: ${verifyValue}`, 'info');

      updateAutoOpenStatus(false);
    } else {
      addLog(`[AUTO-OPEN] ✗ FAILED to save: ${result.error.message}`, 'error');
      addLog(`[AUTO-OPEN] Error code: ${result.error.code}`, 'error');
      addLog(`[AUTO-OPEN] Error name: ${result.error.name}`, 'error');
    }
  });
}

function checkAutoOpenStatus() {
  addLog('[AUTO-OPEN] Checking current auto-open status...', 'info');

  try {
    const isEnabled = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
    addLog(`[AUTO-OPEN] Retrieved setting value: ${isEnabled}`, 'info');
    addLog(`[AUTO-OPEN] Type: ${typeof isEnabled}`, 'info');

    const boolValue = isEnabled === true;
    addLog(`[AUTO-OPEN] Interpreted as: ${boolValue ? 'ENABLED' : 'DISABLED'}`, 'info');

    updateAutoOpenStatus(boolValue);
  } catch (error) {
    addLog(`[AUTO-OPEN] ✗ Error checking status: ${error.message}`, 'error');
    updateAutoOpenStatus(false);
  }
}

function updateAutoOpenStatus(enabled) {
  addLog(`[AUTO-OPEN] Updating UI status indicator to: ${enabled ? 'ENABLED' : 'DISABLED'}`, 'info');
  autoOpenStatus.textContent = `Auto-Open: ${enabled ? 'Enabled' : 'Disabled'}`;
  autoOpenStatus.className = `autoopen-status ${enabled ? 'enabled' : 'disabled'}`;
}
