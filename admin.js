// --- MIKOKO_ADMIN_CORE_V1 ---
// Initialize Firebase (Replace the config below with your actual Firebase Project keys)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "mikoko-league.firebaseapp.com",
    databaseURL: "https://mikoko-league-default-rtdb.firebaseio.com",
    projectId: "mikoko-league",
    storageBucket: "mikoko-league.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase App and Database
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Security Gate
const ENCRYPTED_PIN = "123789"; 

function checkAccess() {
    const pinInput = document.getElementById('admin-pin').value;
    if (pinInput === ENCRYPTED_PIN) {
        document.getElementById('login-overlay').classList.add('hidden');
        showNotify("ACCESS_GRANTED // NEURAL_LINK_STABLE");
        syncCurrentState(); // Load existing data into admin fields
    } else {
        alert("SECURITY_BREACH: INVALID_PIN");
    }
}

// --- 1. LIVE_CENTER_CONTROL ---
function updateLiveMatch(node) {
    const homeName = document.getElementById(`live-home-name`).value;
    const awayName = document.getElementById(`live-away-name`).value;
    
    db.ref('live_matches/' + node).update({
        home: homeName,
        away: awayName,
        timestamp: Date.now()
    }).then(() => showNotify(`NODE_${node}_UPDATED`));
}

function updateScore(node, team, increment) {
    const scoreRef = db.ref(`live_matches/${node}/${team}_score`);
    scoreRef.transaction((currentScore) => {
        return (currentScore || 0) + increment;
    }).then(() => showNotify(`SCORE_SYNCED`));
}

function setMatchStatus(node, status) {
    db.ref(`live_matches/${node}`).update({
        status: status, // e.g., 'LIVE', 'HT', 'FT', 'ET'
        last_update: new Date().toLocaleTimeString()
    }).then(() => showNotify(`STATUS: ${status}`));
}

// --- 2. LEADERBOARD & RANKING ---
function syncPlayerStats() {
    const playerName = document.getElementById('player-select').value;
    const goalsToAdd = parseInt(document.getElementById('add-goals').value) || 0;
    const assistsToAdd = parseInt(document.getElementById('add-assists').value) || 0;

    const playerRef = db.ref('leaderboard/' + playerName);
    playerRef.transaction((stats) => {
        if (stats) {
            stats.goals += goalsToAdd;
            stats.assists += assistsToAdd;
        }
        return stats;
    }).then(() => {
        showNotify(`${playerName}_STATS_SYNCED`);
        document.getElementById('add-goals').value = '';
    });
}

// --- 3. NEWS_FEED_BROADCAST ---
function publishNews() {
    const content = document.getElementById('news-content').value;
    if (!content) return;

    const newPostRef = db.ref('news_feed').push();
    newPostRef.set({
        text: content,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        showNotify("BROADCAST_PUBLISHED");
        document.getElementById('news-content').value = '';
    });
}

// --- 4. STREAM_LINK_CONTROL ---
function updateStreamLinks() {
    const s1 = document.getElementById('stream-1-url').value;
    const s2 = document.getElementById('stream-2-url').value;
    const s3 = document.getElementById('stream-3-url').value;

    db.ref('streams').set({
        link1: s1,
        link2: s2,
        link3: s3,
        active: true
    }).then(() => showNotify("STREAM_NODES_CONFIGURED"));
}

// --- UI_HELPER_FUNCTIONS ---
function showNotify(msg) {
    const alertBox = document.getElementById('admin-alert');
    alertBox.innerText = msg;
    alertBox.classList.remove('hidden');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 3000);
}

// Fetch current data from Firebase to populate admin inputs on login
function syncCurrentState() {
    db.ref('live_matches/node_alpha').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            document.getElementById('live-home-name').value = data.home;
            document.getElementById('live-away-name').value = data.away;
        }
    });
}
function toggleSignal(status) {
    // status can be 'SEARCHING' or 'ACTIVE'
    db.ref('broadcast_settings').update({
        mode: status,
        last_toggle: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        showNotify(`SIGNAL_MODE: ${status}`);
        
        // Visual UI feedback in Admin
        if(status === 'SEARCHING') {
            document.getElementById('signal-active-config').style.opacity = '0.3';
            document.getElementById('signal-active-config').style.pointerEvents = 'none';
        } else {
            document.getElementById('signal-active-config').style.opacity = '1';
            document.getElementById('signal-active-config').style.pointerEvents = 'auto';
        }
    });
}

function publishLiveSignal() {
    const home = document.getElementById('signal-home').value;
    const away = document.getElementById('signal-away').value;

    db.ref('broadcast_settings').update({
        mode: 'ACTIVE',
        active_home: home,
        active_away: away,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => showNotify("LIVE_SIGNAL_BROADCASTED"));
}
let currentImageBase64 = null;

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            currentImageBase64 = e.target.result; // This holds the image data
            document.getElementById('image-preview').src = e.target.result;
            document.getElementById('image-preview-container').classList.remove('hidden');
            document.getElementById('upload-label').innerText = "IMAGE_LOADED_SUCCESSFULLY";
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

function clearImage() {
    currentImageBase64 = null;
    document.getElementById('news-image-input').value = "";
    document.getElementById('image-preview-container').classList.add('hidden');
    document.getElementById('upload-label').innerText = "Upload_Tactical_Visual";
}

// Update your publishNews function to include the image
async function publishNews() {
    const content = document.getElementById('news-content').value;
    
    if (!content && !currentImageBase64) return;

    db.ref('news_feed').push({
        text: content, // This supports <h1>, <b>, <i> etc.
        image: currentImageBase64, // The encoded image
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        date: new Date().toLocaleDateString()
    }).then(() => {
        showNotify("BROADCAST_PUBLISHED");
        document.getElementById('news-content').value = '';
        clearImage();
    });
}
function setStreamStatus(status) {
    const isLive = status === 'LIVE';
    
    db.ref('stream_settings').update({
        broadcast_status: status, // 'STANDBY' or 'LIVE'
        is_unlocked: isLive
    }).then(() => {
        showNotify(`BROADCAST_MODIFIED: ${status}`);
        
        // Update Admin UI feedback
        const dot = document.getElementById('stream-status-dot');
        const text = document.getElementById('stream-status-text');
        
        if (isLive) {
            dot.className = "w-2 h-2 bg-red-600 rounded-full animate-ping";
            text.innerText = "Live_Broadcast";
            text.classList.replace('text-zinc-500', 'text-red-600');
        } else {
            dot.className = "w-2 h-2 bg-zinc-800 rounded-full";
            text.innerText = "Standby_Mode";
            text.classList.replace('text-red-600', 'text-zinc-500');
        }
    });
}

function updateStreamLinks() {
    const s1 = document.getElementById('stream-1-url').value;
    const s2 = document.getElementById('stream-2-url').value;
    const s3 = document.getElementById('stream-3-url').value;

    db.ref('stream_links').set({
        node_1: s1 || "https://elite-league-streamer.vercel.app/",
        node_2: s2 || "https://elite-league-streamer-2.vercel.app/",
        node_3: s3 || "https://elite-league-streamer-3.vercel.app/"
    }).then(() => showNotify("NODES_SYNCED_TO_BACKEND"));
}
