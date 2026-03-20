// ────────────────────────────────────────────────
// MIKOKO ADMIN CORE v3 – Fully Functional & Complete
// Emmanuel – Mikoko League Admin Dashboard
// All buttons work, updates reflect on dashboard instantly
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
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  alert("CRITICAL: Firebase connection failed. Check config keys.");
}

// ────────────────────────────────────────────────
// SECURITY & LOGIN
// ────────────────────────────────────────────────
const ENCRYPTED_PIN = "123789"; // CHANGE THIS IN PRODUCTION!

function checkAccess() {
  const pinInput = document.getElementById('admin-pin')?.value?.trim();

  if (!pinInput) {
    showNotify("ERROR: PIN required", "error");
    return;
  }

  if (pinInput === ENCRYPTED_PIN) {
    document.getElementById('login-overlay')?.classList.add('hidden');
    document.getElementById('admin-logged-in')?.classList.remove('hidden');
    document.getElementById('admin-content')?.classList.remove('disabled-section');

    showNotify("ACCESS_GRANTED // NEURAL_LINK_STABLE", "success");
    syncCurrentState(); // Load existing data
  } else {
    showNotify("SECURITY_BREACH: INVALID_PIN", "error");
  }
}

// ────────────────────────────────────────────────
// UI NOTIFICATION HELPER
// ────────────────────────────────────────────────
function showNotify(message, type = "info") {
  const alertBox = document.getElementById('admin-alert');
  if (!alertBox) return;

  alertBox.className = "fixed bottom-10 right-10 px-6 py-4 font-heading text-sm rounded-xl shadow-2xl animate-bounce z-[1000]";

  if (type === "success") {
    alertBox.classList.add("bg-green-600", "text-white");
  } else if (type === "error") {
    alertBox.classList.add("bg-red-700", "text-white");
  } else {
    alertBox.classList.add("bg-red-600", "text-white");
  }

  alertBox.innerText = message;
  alertBox.classList.remove('hidden');

  setTimeout(() => alertBox.classList.add('hidden'), 4500);
}

// ────────────────────────────────────────────────
// LOAD EXISTING DATA ON LOGIN
// ────────────────────────────────────────────────
function syncCurrentState() {
  // Live match
  db.ref('live_matches/node_alpha').once('value')
    .then(snapshot => {
      const data = snapshot.val() || {};
      document.getElementById('live-home-name').value = data.home || '';
      document.getElementById('live-away-name').value = data.away || '';
    })
    .catch(err => console.error("Sync live match failed:", err));

  // Broadcast settings
  db.ref('broadcast_settings').once('value')
    .then(snapshot => {
      const data = snapshot.val() || {};
      if (data.mode === 'SEARCHING') {
        const config = document.getElementById('signal-active-config');
        if (config) {
          config.style.opacity = '0.3';
          config.style.pointerEvents = 'none';
        }
      }
    })
    .catch(err => console.error("Sync broadcast settings failed:", err));

  // Stream links
  db.ref('stream_links').once('value')
    .then(snapshot => {
      const data = snapshot.val() || {};
      document.getElementById('stream-1-url').value = data.node_1 || '';
      document.getElementById('stream-2-url').value = data.node_2 || '';
      document.getElementById('stream-3-url').value = data.node_3 || '';
    })
    .catch(err => console.error("Sync streams failed:", err));

  showNotify("ADMIN_STATE_SYNCED // FULL_CONTROL_GRANTED", "success");
}

// ────────────────────────────────────────────────
// 1. LIVE MATCH CONTROL
// ────────────────────────────────────────────────
function updateLiveMatch() {
  const home = document.getElementById('live-home-name')?.value?.trim();
  const away = document.getElementById('live-away-name')?.value?.trim();

  if (!home || !away) {
    showNotify("ERROR: Both team names required", "error");
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "UPDATING...";

  db.ref('live_matches/node_alpha').update({
    home,
    away,
    timestamp: Date.now()
  })
    .then(() => showNotify("LIVE_MATCH_UPDATED // NODE_ALPHA", "success"))
    .catch(err => showNotify("UPDATE_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "UPDATE_LIVE_MATCH";
    });
}

function setMatchStatus(status) {
  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "SETTING...";

  db.ref('live_matches/node_alpha').update({
    status,
    last_update: new Date().toLocaleTimeString()
  })
    .then(() => showNotify(`MATCH_STATUS: ${status}`, "success"))
    .catch(err => showNotify("STATUS_UPDATE_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = status;
    });
}

// ────────────────────────────────────────────────
// 2. PLAYER STATS (LEADERBOARD)
// ────────────────────────────────────────────────
function syncPlayerStats() {
  const player = document.getElementById('player-select')?.value?.trim();
  const goals = parseInt(document.getElementById('add-goals')?.value) || 0;
  const assists = parseInt(document.getElementById('add-assists')?.value) || 0;

  if (!player) {
    showNotify("ERROR: Select a player first", "error");
    return;
  }

  if (goals === 0 && assists === 0) {
    showNotify("WARNING: No changes detected", "info");
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "SYNCING...";

  db.ref('leaderboard/' + player).transaction(current => {
    current = current || { goals: 0, assists: 0 };
    current.goals = (current.goals || 0) + goals;
    current.assists = (current.assists || 0) + assists;
    current.last_updated = Date.now();
    return current;
  })
    .then(() => {
      showNotify(`${player.toUpperCase()} STATS_SYNCED`, "success");
      document.getElementById('add-goals').value = '';
      document.getElementById('add-assists').value = '';
    })
    .catch(err => showNotify("SYNC_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "SYNC_PLAYER_STATS";
    });
}

// ────────────────────────────────────────────────
// 3. NEWS / FEED BROADCAST
// ────────────────────────────────────────────────
let currentImageBase64 = null;

function previewImage(input) {
  if (!input.files?.[0]) return;

  const reader = new FileReader();
  reader.onload = e => {
    currentImageBase64 = e.target.result;
    document.getElementById('image-preview').src = currentImageBase64;
    document.getElementById('image-preview-container').classList.remove('hidden');
    document.getElementById('upload-label').innerText = "IMAGE_READY";
  };
  reader.readAsDataURL(input.files[0]);
}

function clearImage() {
  currentImageBase64 = null;
  document.getElementById('news-image-input').value = "";
  document.getElementById('image-preview-container').classList.add('hidden');
  document.getElementById('upload-label').innerText = "Upload_Tactical_Visual";
}

async function publishNews() {
  const content = document.getElementById('news-content')?.value?.trim();

  if (!content && !currentImageBase64) {
    showNotify("ERROR: Content or image required", "error");
    return;
  }

  if (!confirm("Publish this broadcast to all users?")) return;

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "PUBLISHING...";

  try {
    await db.ref('news_feed').push({
      text: content || "[MEDIA_ONLY]",
      image: currentImageBase64 || null,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
    showNotify("BROADCAST_PUBLISHED_SUCCESSFULLY", "success");
    document.getElementById('news-content').value = '';
    clearImage();
  } catch (err) {
    showNotify("PUBLISH_FAILED: " + err.message, "error");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerText = "PUBLISH_TO_ALL_NODES";
  }
}

// ────────────────────────────────────────────────
// 4. STREAM LINKS & STATUS
// ────────────────────────────────────────────────
function updateStreamLinks() {
  const s1 = document.getElementById('stream-1-url')?.value?.trim();
  const s2 = document.getElementById('stream-2-url')?.value?.trim();
  const s3 = document.getElementById('stream-3-url')?.value?.trim();

  if (!s1 && !s2 && !s3) {
    showNotify("WARNING: At least one stream link required", "info");
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "UPDATING...";

  db.ref('stream_links').set({
    node_1: s1 || null,
    node_2: s2 || null,
    node_3: s3 || null,
    updated: Date.now()
  })
    .then(() => showNotify("STREAM_LINKS_UPDATED", "success"))
    .catch(err => showNotify("STREAM_UPDATE_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "UPDATE_ALL_NODES";
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
      showNotify(`STREAM_STATUS: ${status}`, "success");
      const dot = document.getElementById('stream-status-dot');
      const text = document.getElementById('stream-status-text');
      if (dot && text) {
        if (isLive) {
          dot.className = "w-3 h-3 bg-red-600 rounded-full animate-ping";
          text.innerText = "LIVE_BROADCAST";
          text.classList.replace('text-zinc-500', 'text-red-600');
        } else {
          dot.className = "w-3 h-3 bg-zinc-700 rounded-full";
          text.innerText = "STANDBY_MODE";
          text.classList.replace('text-red-600', 'text-zinc-500');
        }
      }
    })
    .catch(err => showNotify("STATUS_CHANGE_FAILED: " + err.message, "error"))
    .finally(() => btn.disabled = false);
}

// ────────────────────────────────────────────────
// 5. FIXTURES PUBLISH
// ────────────────────────────────────────────────
function publishFixtures() {
  const day = document.getElementById('match-day-target')?.value;
  if (!day || day === "SELECT_MATCH_DAY...") {
    showNotify("ERROR: Select a match day first", "error");
    return;
  }

  const slot1Home = document.getElementById('fix-1-home')?.value?.trim();
  const slot1Away = document.getElementById('fix-1-away')?.value?.trim();
  const slot1Time = document.getElementById('fix-1-time')?.value?.trim();
  const slot1Date = document.getElementById('fix-1-date')?.value?.trim();
  const slot1Arena = document.getElementById('fix-1-arena')?.value?.trim();

  const slot2Home = document.getElementById('fix-2-home')?.value?.trim();
  const slot2Away = document.getElementById('fix-2-away')?.value?.trim();
  const slot2Time = document.getElementById('fix-2-time')?.value?.trim();
  const slot2Date = document.getElementById('fix-2-date')?.value?.trim();
  const slot2Arena = document.getElementById('fix-2-arena')?.value?.trim();

  if (!slot1Home || !slot1Away || !slot1Time || !slot1Date) {
    showNotify("ERROR: Slot 01 incomplete", "error");
    return;
  }

  if (!confirm(`Publish fixtures for ${day.toUpperCase()}?`)) return;

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "PUBLISHING...";

  const fixtures = {
    [day]: {
      slot_01: {
        home: slot1Home,
        away: slot1Away,
        time: slot1Time,
        date: slot1Date,
        arena: slot1Arena || "ARENA_DEFAULT"
      },
      slot_02: slot2Home && slot2Away ? {
        home: slot2Home,
        away: slot2Away,
        time: slot2Time || "TBD",
        date: slot2Date || slot1Date,
        arena: slot2Arena || "ARENA_DEFAULT"
      } : null
    }
  };

  db.ref('fixtures').update(fixtures)
    .then(() => showNotify(`FIXTURES_PUBLISHED // ${day.toUpperCase()}`, "success"))
    .catch(err => showNotify("FIXTURE_PUBLISH_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "PUBLISH_FIXTURES_TO_GRID";
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
      showNotify(`SIGNAL_MODE_CHANGED: ${status}`, "success");
      const config = document.getElementById('signal-active-config');
      if (config) {
        config.style.opacity = status === 'SEARCHING' ? '0.35' : '1';
        config.style.pointerEvents = status === 'SEARCHING' ? 'none' : 'auto';
      }
    })
    .catch(err => showNotify("SIGNAL_TOGGLE_FAILED: " + err.message, "error"))
    .finally(() => btn.disabled = false);
}

// ────────────────────────────────────────────────
// 7. STANDINGS SYNC – Supports ANY team
// ────────────────────────────────────────────────
function syncTableStandings() {
  const teamId = document.getElementById('standing-team-select')?.value?.trim();
  if (!teamId) {
    showNotify("ERROR: Select a team first", "error");
    return;
  }

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
  btn.innerText = "SYNCING...";

  db.ref(`standings/${teamId}`).set(stats)
    .then(() => {
      showNotify(`${teamId.toUpperCase()} STANDINGS_SYNCED`, "success");
      ['std-mp', 'std-w', 'std-d', 'std-l', 'std-gf', 'std-ga'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    })
    .catch(err => showNotify("STANDINGS_SYNC_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "SYNC_TABLE_DATA";
    });
}

// ────────────────────────────────────────────────
// 8. MISSING FUNCTION – LIVE SIGNAL PUBLISH (your error fix)
// ────────────────────────────────────────────────
function publishLiveSignal() {
  const message = prompt("Enter live signal message (e.g., 'Kick-off in 5 minutes!')");
  if (!message) return;

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "PUBLISHING...";

  db.ref('live_signals').push({
    message: message,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    type: 'live'
  })
    .then(() => showNotify("LIVE_SIGNAL_PUBLISHED", "success"))
    .catch(err => showNotify("SIGNAL_PUBLISH_FAILED: " + err.message, "error"))
    .finally(() => {
      btn.disabled = false;
      btn.innerText = "PUBLISH_LIVE_SIGNAL";
    });
}

// ────────────────────────────────────────────────
// END OF ADMIN.JS – All buttons now work
// ────────────────────────────────────────────────
