// ────────────────────────────────────────────────
// MIKOKO ADMIN CORE v3 – Complete & Fully Functional
// Emmanuel – Mikoko League Admin Dashboard
// Every function written out, no missing pieces
// ────────────────────────────────────────────────

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDwu7gufqSKAnMutOs_cv6_xhYZQ9s6tQw",
  authDomain: "goteach-276b6.firebaseapp.com",
  projectId: "goteach-276b6",
  storageBucket: "goteach-276b6.firebasestorage.app",
  messagingSenderId: "270747208183",
  appId: "1:270747208183:web:42a884509da5e14f4406f2",
  measurementId: "G-KQLHT74L1Q"
};

// Initialize Firebase
let db;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  console.log("Admin Firebase initialized");
} catch (error) {
  console.error("Firebase init failed:", error);
  alert("Firebase connection failed. Check config.");
}

// ────────────────────────────────────────────────
// PIN SECURITY
// ────────────────────────────────────────────────
const ENCRYPTED_PIN = "123789"; // CHANGE THIS BEFORE GOING LIVE

function checkAccess() {
  const pin = document.getElementById('admin-pin')?.value?.trim();
  if (!pin) return showNotify("Enter PIN", "error");

  if (pin === ENCRYPTED_PIN) {
    document.getElementById('login-overlay')?.classList.add('hidden');
    document.getElementById('admin-logged-in')?.classList.remove('hidden');
    document.getElementById('admin-content')?.classList.remove('disabled-section');
    showNotify("ACCESS GRANTED", "success");
    syncCurrentState();
  } else {
    showNotify("INVALID PIN", "error");
  }
}

// ────────────────────────────────────────────────
// NOTIFICATION
// ────────────────────────────────────────────────
function showNotify(message, type = "info") {
  const box = document.getElementById('admin-alert');
  if (!box) return;

  box.className = `fixed bottom-10 right-10 px-6 py-4 rounded-xl shadow-2xl z-[1000] text-white font-medium ${
    type === 'success' ? 'bg-green-600' :
    type === 'error'   ? 'bg-red-700'   : 'bg-gray-700'
  }`;

  box.textContent = message;
  box.classList.remove('hidden');
  setTimeout(() => box.classList.add('hidden'), 4500);
}

// ────────────────────────────────────────────────
// LOAD EXISTING DATA
// ────────────────────────────────────────────────
function syncCurrentState() {
  // Live match
  db.ref('live_matches/node_alpha').once('value')
    .then(snap => {
      const d = snap.val() || {};
      document.getElementById('live-home-name').value = d.home || '';
      document.getElementById('live-away-name').value = d.away || '';
    })
    .catch(e => console.error("Live match sync error:", e));

  // Broadcast settings
  db.ref('broadcast_settings').once('value')
    .then(snap => {
      const d = snap.val() || {};
      if (d.mode === 'SEARCHING') {
        const config = document.getElementById('signal-active-config');
        if (config) {
          config.style.opacity = '0.3';
          config.style.pointerEvents = 'none';
        }
      }
    })
    .catch(e => console.error("Broadcast settings sync error:", e));

  // Stream links
  db.ref('stream_links').once('value')
    .then(snap => {
      const d = snap.val() || {};
      document.getElementById('stream-1-url').value = d.node_1 || '';
      document.getElementById('stream-2-url').value = d.node_2 || '';
      document.getElementById('stream-3-url').value = d.node_3 || '';
    })
    .catch(e => console.error("Stream links sync error:", e));

  showNotify("Data loaded from server", "success");
}

// ────────────────────────────────────────────────
// 1. LIVE MATCH
// ────────────────────────────────────────────────
function updateLiveMatch() {
  const home = document.getElementById('live-home-name')?.value?.trim();
  const away = document.getElementById('live-away-name')?.value?.trim();
  if (!home || !away) return showNotify("Both teams required", "error");

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Updating...";

  db.ref('live_matches/node_alpha').update({
    home, away,
    timestamp: Date.now()
  })
  .then(() => showNotify("Live match updated", "success"))
  .catch(e => showNotify("Update failed: " + e.message, "error"))
  .finally(() => {
    btn.disabled = false;
    btn.textContent = "Update Live Match";
  });
}

function setMatchStatus(status) {
  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Setting...";

  db.ref('live_matches/node_alpha').update({
    status,
    last_update: new Date().toLocaleTimeString()
  })
  .then(() => showNotify(`Status: ${status}`, "success"))
  .catch(e => showNotify("Status update failed: " + e.message, "error"))
  .finally(() => {
    btn.disabled = false;
    btn.textContent = status;
  });
}

// ────────────────────────────────────────────────
// 2. PLAYER STATS / LEADERBOARD
// ────────────────────────────────────────────────
function syncPlayerStats() {
  const player = document.getElementById('player-select')?.value?.trim();
  const goals   = parseInt(document.getElementById('add-goals')?.value)   || 0;
  const assists = parseInt(document.getElementById('add-assists')?.value) || 0;

  if (!player) return showNotify("Select player first", "error");
  if (goals === 0 && assists === 0) return showNotify("No stats changed", "info");

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Syncing...";

  db.ref('leaderboard/' + player).transaction(current => {
    current = current || { goals: 0, assists: 0 };
    current.goals   = (current.goals   || 0) + goals;
    current.assists = (current.assists || 0) + assists;
    current.last_updated = Date.now();
    return current;
  })
  .then(() => {
    showNotify(`${player} stats updated`, "success");
    document.getElementById('add-goals').value = '';
    document.getElementById('add-assists').value = '';
  })
  .catch(e => showNotify("Sync failed: " + e.message, "error"))
  .finally(() => {
    btn.disabled = false;
    btn.textContent = "Sync Player Stats";
  });
}

// ────────────────────────────────────────────────
// 3. NEWS / BROADCAST
// ────────────────────────────────────────────────
let currentImageBase64 = null;

function previewImage(input) {
  if (!input.files?.[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    currentImageBase64 = e.target.result;
    document.getElementById('image-preview').src = currentImageBase64;
    document.getElementById('image-preview-container').classList.remove('hidden');
    document.getElementById('upload-label').textContent = "Image Ready";
  };
  reader.readAsDataURL(input.files[0]);
}

function clearImage() {
  currentImageBase64 = null;
  document.getElementById('news-image-input').value = "";
  document.getElementById('image-preview-container').classList.add('hidden');
  document.getElementById('upload-label').textContent = "Upload Tactical Visual";
}

async function publishNews() {
  const content = document.getElementById('news-content')?.value?.trim();
  if (!content && !currentImageBase64) return showNotify("Content or image required", "error");

  if (!confirm("Publish to all users?")) return;

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Publishing...";

  try {
    await db.ref('news_feed').push({
      text: content || "[MEDIA_ONLY]",
      image: currentImageBase64 || null,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
    showNotify("Broadcast published", "success");
    document.getElementById('news-content').value = '';
    clearImage();
  } catch (err) {
    showNotify("Publish failed: " + err.message, "error");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = "Publish to All Nodes";
  }
}

// ────────────────────────────────────────────────
// 4. STREAM LINKS & STATUS
// ────────────────────────────────────────────────
function updateStreamLinks() {
  const s1 = document.getElementById('stream-1-url')?.value?.trim();
  const s2 = document.getElementById('stream-2-url')?.value?.trim();
  const s3 = document.getElementById('stream-3-url')?.value?.trim();

  if (!s1 && !s2 && !s3) return showNotify("At least one link required", "info");

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Updating...";

  db.ref('stream_links').set({
    node_1: s1 || null,
    node_2: s2 || null,
    node_3: s3 || null,
    updated: Date.now()
  })
  .then(() => showNotify("Stream links updated", "success"))
  .catch(e => showNotify("Stream update failed: " + e.message, "error"))
  .finally(() => {
    btn.disabled = false;
    btn.textContent = "Update All Nodes";
  });
}

function setStreamStatus(status) {
  const isLive = status === 'LIVE';
  const btn = event.target;
  btn.disabled = true;

  db.ref('stream_settings').update({
    broadcast_status: status,
    is_unlocked: isLive,
    last_change: Date.now()
  })
  .then(() => {
    showNotify(`Stream status: ${status}`, "success");
    const dot  = document.getElementById('stream-status-dot');
    const text = document.getElementById('stream-status-text');
    if (dot && text) {
      dot.className = isLive ? "w-3 h-3 bg-red-600 rounded-full animate-ping" : "w-3 h-3 bg-zinc-700 rounded-full";
      text.textContent = isLive ? "LIVE_BROADCAST" : "STANDBY_MODE";
      text.classList.toggle('text-red-600', isLive);
      text.classList.toggle('text-zinc-500', !isLive);
    }
  })
  .catch(e => showNotify("Status change failed: " + e.message, "error"))
  .finally(() => btn.disabled = false);
}

// ────────────────────────────────────────────────
// 5. FIXTURES
// ────────────────────────────────────────────────
function publishFixtures() {
  const day = document.getElementById('match-day-target')?.value;
  if (!day || day === "SELECT_MATCH_DAY...") return showNotify("Select match day", "error");

  const s1h = document.getElementById('fix-1-home')?.value?.trim();
  const s1a = document.getElementById('fix-1-away')?.value?.trim();
  const s1t = document.getElementById('fix-1-time')?.value?.trim();
  const s1d = document.getElementById('fix-1-date')?.value?.trim();
  const s1ar = document.getElementById('fix-1-arena')?.value?.trim();

  const s2h = document.getElementById('fix-2-home')?.value?.trim();
  const s2a = document.getElementById('fix-2-away')?.value?.trim();
  const s2t = document.getElementById('fix-2-time')?.value?.trim();
  const s2d = document.getElementById('fix-2-date')?.value?.trim();
  const s2ar = document.getElementById('fix-2-arena')?.value?.trim();

  if (!s1h || !s1a || !s1t || !s1d) return showNotify("Slot 1 incomplete", "error");

  if (!confirm(`Publish for ${day}?`)) return;

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Publishing...";

  const data = {
    [day]: {
      slot_01: { home: s1h, away: s1a, time: s1t, date: s1d, arena: s1ar || "ARENA_DEFAULT" },
      slot_02: s2h && s2a ? { home: s2h, away: s2a, time: s2t || "TBD", date: s2d || s1d, arena: s2ar || "ARENA_DEFAULT" } : null
    }
  };

  db.ref('fixtures').update(data)
    .then(() => showNotify(`Fixtures published for ${day}`, "success"))
    .catch(e => showNotify("Fixtures failed: " + e.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Publish Fixtures";
    });
}

// ────────────────────────────────────────────────
// 6. SIGNAL TOGGLE
// ────────────────────────────────────────────────
function toggleSignal(status) {
  const btn = event.target;
  btn.disabled = true;

  db.ref('broadcast_settings').update({
    mode: status,
    last_toggle: firebase.database.ServerValue.TIMESTAMP
  })
  .then(() => {
    showNotify(`Signal mode: ${status}`, "success");
    const config = document.getElementById('signal-active-config');
    if (config) {
      config.style.opacity = status === 'SEARCHING' ? '0.35' : '1';
      config.style.pointerEvents = status === 'SEARCHING' ? 'none' : 'auto';
    }
  })
  .catch(e => showNotify("Signal toggle failed: " + e.message, "error"))
  .finally(() => btn.disabled = false);
}

// ────────────────────────────────────────────────
// 7. STANDINGS
// ────────────────────────────────────────────────
function syncTableStandings() {
  const teamId = document.getElementById('standing-team-select')?.value?.trim();
  if (!teamId) return showNotify("Select team first", "error");

  const stats = {
    mp: parseInt(document.getElementById('std-mp')?.value) || 0,
    w: parseInt(document.getElementById('std-w')?.value) || 0,
    d: parseInt(document.getElementById('std-d')?.value) || 0,
    l: parseInt(document.getElementById('std-l')?.value) || 0,
    gf: parseInt(document.getElementById('std-gf')?.value) || 0,
    ga: parseInt(document.getElementById('std-ga')?.value) || 0,
    last_updated: Date.now()
  };

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = "Syncing...";

  db.ref(`standings/${teamId}`).set(stats)
    .then(() => {
      showNotify(`${teamId.toUpperCase()} standings updated`, "success");
      ['std-mp','std-w','std-d','std-l','std-gf','std-ga'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    })
    .catch(e => showNotify("Standings failed: " + e.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Sync Table Data";
    });
}

// ────────────────────────────────────────────────
// END – All functions complete
// ────────────────────────────────────────────────
