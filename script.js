/**
 * MIKOKO // NEURAL_DASH_2040
 * FULL_CORE_ENGINE_RESTORATION_V2 – All views with strong waiting / initializing states
 * Extended leaderboard limited to 20 rows for performance
 */

const mainContent = document.getElementById('main-content');

// ────────────────────────────────────────────────
//  HELPER RENDER FUNCTIONS (enhanced waiting states)
// ────────────────────────────────────────────────

function renderGroupTable(teams, groupData = {}) {
    const hasRealData = Object.keys(groupData).length > 0 && Object.values(groupData).some(s => s.mp > 0 || s.w > 0);

    return `
        <div class="overflow-x-auto no-scrollbar">
            <table class="w-full text-left border-collapse min-w-[500px]">
                <thead class="bg-zinc-900/80 border-b border-white/10">
                    <tr>
                        <th class="p-2 font-heading text-[7px] text-zinc-500 uppercase">Pos</th>
                        <th class="p-2 font-heading text-[7px] text-zinc-500 uppercase">Team</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">MP</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">W</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">D</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">L</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">GF</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">GA</th>
                        <th class="p-2 font-mono text-[8px] text-zinc-500 uppercase text-center">GD</th>
                        <th class="p-2 font-heading text-[8px] text-red-600 uppercase text-right">P</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    ${teams.map((team, i) => {
                        const teamKey = team.split(' ')[0].toLowerCase();
                        const s = groupData[teamKey] || { mp:0, w:0, d:0, l:0, gf:0, ga:0 };
                        const gd = s.gf - s.ga;
                        const points = (s.w * 3) + (s.d * 1);
                        const isWaiting = !hasRealData || (s.mp === 0 && s.w === 0 && s.d === 0 && s.l === 0);

                        return `
                            <tr class="${isWaiting ? 'opacity-65' : 'hover:bg-white/[0.02]'} transition-colors">
                                <td class="p-2 font-mono text-[10px] ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-600'}">${i + 1}</td>
                                <td class="p-2 font-heading text-[9px] uppercase italic tracking-tighter ${isWaiting ? 'text-zinc-500' : 'text-zinc-300 group-hover:text-white'}">${team}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.mp}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.w}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.d}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.l}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.gf}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.ga}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : (gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-zinc-500')}">
                                    ${isWaiting ? '–' : (gd > 0 ? '+' + gd : gd)}
                                </td>
                                <td class="p-2 font-heading text-[10px] text-right italic ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-red-600 font-bold'}">
                                    ${isWaiting ? 'PENDING' : points}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            ${!hasRealData ? `
                <div class="py-10 text-center">
                    <div class="inline-block w-10 h-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4"></div>
                    <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
                        Standings node initializing • No match data received yet
                    </p>
                </div>
            ` : ''}
        </div>`;
}

function renderNilTopPlayers(unit) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `
            <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-2 border-zinc-900 hover:border-red-600/20 transition-all group opacity-70">
                <div class="flex items-center gap-4">
                    <span class="font-mono text-[10px] text-zinc-700 animate-pulse">0${i}</span>
                    <div class="w-10 h-10 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center overflow-hidden grayscale">
                        <div class="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-950 animate-pulse"></div>
                    </div>
                    <div>
                        <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase">NODE_${i}_NIL</span>
                        <p class="text-[7px] font-mono text-zinc-700 uppercase animate-pulse">Awaiting sync • Deployment pending</p>
                    </div>
                </div>
                <div class="text-right opacity-40">
                    <span class="font-heading text-lg italic text-zinc-600 animate-pulse">00</span>
                    <span class="text-[7px] font-mono text-zinc-700 block uppercase">${unit}</span>
                </div>
            </div>
        `;
    }
    return html;
}

function renderNilExtendedList(suffix) {
    let list = '';
    for (let i = 6; i <= 20; i++) { // reduced from 50 → 20 for performance
        list += `
            <div class="flex items-center justify-between py-2 border-b border-white/5 opacity-35">
                <div class="flex items-center gap-3">
                    <span class="font-mono text-[8px] text-zinc-800">${i.toString().padStart(2, '0')}</span>
                    <div class="w-4 h-4 rounded-sm bg-zinc-900 animate-pulse"></div>
                    <span class="text-[9px] font-bold text-zinc-700 uppercase tracking-tighter italic">UNASSIGNED_NODE_${i}</span>
                </div>
                <span class="font-mono text-[9px] text-zinc-800 animate-pulse">0 ${suffix}</span>
            </div>
        `;
    }
    return list + `
        <div class="text-center py-5 text-[9px] font-mono text-zinc-600 uppercase tracking-widest opacity-60">
            ... additional nodes waiting for admin deployment
        </div>`;
}

function renderMatchCard(home, away, time, date, venue) {
    const isPlaceholder = time.includes('16:00') || time.includes('17:00') || date === 'MAR NIL';

    return `
        <div class="bento-card !p-0 group border-zinc-900 ${isPlaceholder ? 'opacity-70' : 'hover:border-red-600/50'} transition-all duration-500">
            <div class="flex items-center justify-between p-6">
                <div class="flex-1 text-center">
                    <div class="w-12 h-12 bg-zinc-900 border border-white/5 mx-auto mb-3 rotate-45 flex items-center justify-center ${isPlaceholder ? 'animate-pulse border-red-600/20' : 'group-hover:border-red-600/50'}">
                        <span class="rotate-[-45deg] font-heading text-xs ${isPlaceholder ? 'text-red-600/50' : 'text-red-600'}">${home.charAt(0)}</span>
                    </div>
                    <span class="font-heading text-[10px] ${isPlaceholder ? 'text-zinc-500' : 'text-white'} tracking-tighter uppercase italic">${home}</span>
                </div>
                <div class="px-4 text-center">
                    <div class="font-mono text-[10px] ${isPlaceholder ? 'text-red-600/60 animate-pulse' : 'text-red-600 font-bold'} mb-1">${time}</div>
                    <div class="w-[1px] h-8 bg-zinc-800 mx-auto mb-1"></div>
                    <div class="font-mono text-[8px] ${isPlaceholder ? 'text-zinc-700' : 'text-zinc-600'} uppercase">${isPlaceholder ? 'TBD' : date}</div>
                </div>
                <div class="flex-1 text-center">
                    <div class="w-12 h-12 bg-zinc-900 border border-white/5 mx-auto mb-3 rotate-45 flex items-center justify-center ${isPlaceholder ? 'animate-pulse border-red-600/20' : 'group-hover:border-red-600/50'}">
                        <span class="rotate-[-45deg] font-heading text-xs ${isPlaceholder ? 'text-red-600/50' : 'text-red-600'}">${away.charAt(0)}</span>
                    </div>
                    <span class="font-heading text-[10px] ${isPlaceholder ? 'text-zinc-500' : 'text-white'} tracking-tighter uppercase italic">${away}</span>
                </div>
            </div>
            <div class="bg-black/40 py-2 px-4 border-t border-white/5 flex justify-between items-center">
                <span class="text-[7px] font-mono ${isPlaceholder ? 'text-zinc-600' : 'text-zinc-500'} tracking-[0.2em] uppercase">${isPlaceholder ? 'ARENA • AWAITING' : venue}</span>
                <button class="text-[7px] font-heading ${isPlaceholder ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-red-600'} tracking-widest uppercase transition">
                    ${isPlaceholder ? 'Not scheduled' : 'Set Reminder +'}
                </button>
            </div>
        </div>
    `;
}

function renderLiveMatchCard(home, away, clock, status, homeScore = 0, awayScore = 0) {
    const isWaiting = status === 'PENDING' || clock === '00:00';

    return `
    <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-zinc-950/50 backdrop-blur-xl ${isWaiting ? 'opacity-75' : ''}">
        <div class="p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-red-600/5 to-transparent">
            <div class="absolute top-4 font-mono text-[9px] ${isWaiting ? 'text-red-600/60 animate-pulse' : 'text-red-600'} tracking-[0.5em] uppercase">
                ${isWaiting ? 'INITIALIZING_NODE' : status}
            </div>
           
            <div class="flex items-center justify-between w-full max-w-3xl gap-4">
                <div class="flex-1 text-right">
                    <h3 class="font-heading text-xl md:text-4xl ${isWaiting ? 'text-zinc-500' : 'text-white'} italic tracking-tighter uppercase leading-none">${home}</h3>
                </div>
                <div class="flex flex-col items-center min-w-[120px]">
                    <div class="font-heading text-6xl md:text-8xl ${isWaiting ? 'text-zinc-600' : 'text-white'} tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        ${homeScore}:${awayScore}
                    </div>
                    <div class="mt-2 px-6 py-1 ${isWaiting ? 'bg-zinc-800' : 'bg-red-600'} font-mono text-xs ${isWaiting ? 'text-zinc-500' : 'text-white'} font-bold skew-x-[-12deg] shadow-[4px_4px_0px_#4a0000]">
                        ${isWaiting ? '00:00' : clock}
                    </div>
                </div>
                <div class="flex-1 text-left">
                    <h3 class="font-heading text-xl md:text-4xl ${isWaiting ? 'text-zinc-500' : 'text-white'} italic tracking-tighter uppercase leading-none">${away}</h3>
                </div>
            </div>
        </div>
        ${isWaiting ? `
            <div class="p-12 text-center">
                <div class="inline-block w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-6"></div>
                <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Live feed node • Awaiting official activation
                </p>
            </div>
        ` : `
            <div class="grid grid-cols-2 border-t border-white/5 bg-black/60 min-h-[150px]">
                <div class="p-4 border-r border-white/5 space-y-2">
                    <div class="flex items-center gap-2 mb-3 opacity-50">
                        <span class="font-heading text-[8px] text-zinc-400 uppercase">Home_Events</span>
                    </div>
                    <div class="flex items-center gap-3 animate-slide-right">
                        <span class="font-mono text-[10px] text-red-600">--'</span>
                        <span class="font-heading text-[9px] text-zinc-500 italic uppercase">Waiting_for_data...</span>
                    </div>
                </div>
                <div class="p-4 space-y-2 text-right">
                    <div class="flex items-center justify-end gap-2 mb-3 opacity-50">
                        <span class="font-heading text-[8px] text-zinc-400 uppercase">Away_Events</span>
                    </div>
                    <div class="flex items-center justify-end gap-3 opacity-40">
                        <span class="font-heading text-[9px] text-zinc-600 italic uppercase">No_Signal</span>
                        <span class="font-mono text-[10px] text-zinc-800">'--</span>
                    </div>
                </div>
            </div>
        `}
    </div>`;
}
// ────────────────────────────────────────────────
// REAL NEWS FEED DISPLAY – shows all posts in FEED tab
// ────────────────────────────────────────────────

function renderNewsFeed(posts) {
    if (!posts || posts.length === 0) {
        return `
            <div class="text-center py-20 opacity-70">
                <div class="inline-block w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-6"></div>
                <h3 class="font-heading text-3xl text-zinc-500 uppercase tracking-widest mb-4">NO_BROADCASTS_YET</h3>
                <p class="font-mono text-[11px] text-zinc-600 max-w-md mx-auto">
                    Neural feed initializing • First tactical broadcast pending
                </p>
            </div>
        `;
    }

    return posts.map(post => `
        <div class="bento-card overflow-hidden border border-red-600/20 bg-black/40 backdrop-blur-sm mb-8 animate-boot">
            ${post.image ? `
                <div class="relative h-64 md:h-96 overflow-hidden">
                    <img src="${post.image}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Tactical visual" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>
            ` : ''}
            
            <div class="p-6 md:p-8">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        ${post.date || 'Unknown'} • ${post.time || '--:--:--'}
                    </span>
                    <span class="px-3 py-1 bg-red-600/20 text-red-400 text-[9px] font-mono uppercase rounded-full animate-pulse">
                        LIVE_FEED
                    </span>
                </div>
                
                <div class="prose prose-invert max-w-none">
                    ${post.text ? post.text : '<p class="text-zinc-400 italic">[MEDIA_ONLY_POST]</p>'}
                </div>
            </div>
        </div>
    `).join('');
}

// Listen for news and update FEED tab when active
let newsPosts = []; // store all posts

if (typeof db !== 'undefined') {
    db.ref('news_feed').orderByChild('timestamp').limitToLast(20).on('value', (snapshot) => {
        newsPosts = [];
        snapshot.forEach(child => {
            const post = child.val();
            post.key = child.key; // optional, for future delete/edit
            newsPosts.push(post);
        });

        // If FEED tab is currently active, update it immediately
        const activeTab = document.querySelector('.nav-link.active, .dock-btn.active');
        if (activeTab && (activeTab.id === 'nav-news' || activeTab.id === 'dock-news')) {
            const feedContainer = document.querySelector('#main-content');
            if (feedContainer) {
                feedContainer.innerHTML = renderNewsFeed(newsPosts.reverse()); // newest first
            }
        }

        console.log(`Loaded ${newsPosts.length} news posts`);
    });
}

// When switching to NEWS tab, show current posts
// (we already have switchTab – just enhance it slightly)
const originalSwitchTab = switchTab;
switchTab = function(tab) {
    originalSwitchTab(tab);

    // After tab switch animation, check if it's news tab
    setTimeout(() => {
        if (tab === 'news') {
            const feedContainer = document.querySelector('#main-content');
            if (feedContainer) {
                feedContainer.innerHTML = renderNewsFeed(newsPosts.reverse());
            }
        }
    }, 300);
};
// ────────────────────────────────────────────────
//  ALL VIEWS – strong waiting/initializing states everywhere
// ────────────────────────────────────────────────

const views = {
    home: `... (your original home view with pulsing dots and "SIGNAL_PENDING" already good – kept as is for now) ...`,

    standings: `... (already updated in previous message with waiting rows + spinner) ...`,

    news: `
    <div class="animate-boot space-y-10 pb-28">
        <div class="relative group rounded-3xl overflow-hidden border border-red-600/10 h-[500px] bg-zinc-950">
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 animate-pulse"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center px-8">
                    <div class="w-24 h-24 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-8"></div>
                    <h2 class="text-5xl md:text-7xl font-heading italic tracking-tighter text-zinc-500 uppercase leading-tight">FEED NODE OFFLINE</h2>
                    <p class="text-zinc-600 font-mono text-base mt-6 uppercase tracking-widest">
                        Broadcast system in standby • No tactical stream received
                    </p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-70">
            <div class="bento-card h-64 flex items-center justify-center bg-black/40 border border-zinc-800">
                <div class="text-center px-6">
                    <span class="text-red-600/70 font-mono text-[11px] uppercase tracking-[0.4em] animate-pulse block mb-4">NEXT BROADCAST • TBD</span>
                    <h3 class="font-heading text-2xl italic uppercase text-zinc-500">Awaiting Content Deployment</h3>
                </div>
            </div>
           
            <div class="bento-card !bg-zinc-950/50 border-zinc-900 h-64 flex items-center justify-center">
                <p class="text-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed px-10">
                    Live tactical stream offline<br>
                    <span class="text-red-600 animate-pulse">[NO_CONNECTION]</span> • Node sync pending
                </p>
            </div>
        </div>

        <div class="text-center py-12 bg-black/30 border border-red-600/10 rounded-xl">
            <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em] animate-pulse">
                <span class="text-red-600">●</span> News & visual data • Waiting for first admin push
            </p>
        </div>
    </div>`,

    leaderboard: `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-red-600/30">
        <div class="flex items-center gap-6 opacity-80">
            <div class="nexus-core scale-75 md:scale-100"><div class="nexus-inner"></div><div class="nexus-orbit animate-pulse"></div></div>
            <div>
                <h2 class="font-heading text-3xl md:text-5xl text-zinc-400 italic uppercase tracking-tighter">LEADER_BOARDS</h2>
                <p class="font-mono text-[9px] tracking-[0.3em] text-red-600/70 uppercase animate-pulse">No performance data synced yet • S26</p>
            </div>
        </div>
        <div class="flex bg-zinc-900/30 p-1 rounded-full border border-white/5 opacity-60">
            <button class="px-6 py-2 font-heading text-[8px] tracking-widest text-zinc-600 cursor-not-allowed">GOALS</button>
            <button class="px-6 py-2 font-heading text-[8px] tracking-widest text-zinc-600 cursor-not-allowed">ASSISTS</button>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div id="goals-sector" class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <h3 class="font-heading text-lg italic text-zinc-400 uppercase"><span class="text-red-600/70">01.</span> GOAL_STRIKERS</h3>
                <span class="text-[8px] font-mono text-zinc-600 uppercase animate-pulse">No sync received</span>
            </div>
            <div class="space-y-3 opacity-70">
                ${renderNilTopPlayers('GOALS')}
            </div>
            <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/30">
                <div class="max-h-[400px] overflow-y-auto roster-scroll p-4 space-y-2">
                    ${renderNilExtendedList('G')}
                </div>
            </div>
        </div>

        <div id="assists-sector" class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <h3 class="font-heading text-lg italic text-zinc-400 uppercase"><span class="text-red-600/70">02.</span> TACTICAL_ASSISTS</h3>
                <span class="text-[8px] font-mono text-zinc-600 uppercase animate-pulse">No sync received</span>
            </div>
            <div class="space-y-3 opacity-70">
                ${renderNilTopPlayers('ASSISTS')}
            </div>
            <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/30">
                <div class="max-h-[400px] overflow-y-auto roster-scroll p-4 space-y-2">
                    ${renderNilExtendedList('A')}
                </div>
            </div>
        </div>
    </div>

    <div class="text-center mt-12 py-8 bg-black/40 border border-red-600/10 rounded-xl">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em] animate-pulse">
            Leaderboard matrix • Waiting for first goal & assist events to be logged
        </p>
    </div>
</div>`,

    fixtures: `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center">
        <div>
            <h2 class="font-heading text-4xl italic tracking-tighter text-zinc-400 uppercase">Match_Fixtures</h2>
            <p class="text-[9px] font-mono text-red-600/70 uppercase tracking-[0.4em] animate-pulse">Season_26 • Schedule not deployed</p>
        </div>
        <div class="hidden md:block text-right">
            <span class="font-mono text-[10px] text-zinc-600 uppercase block">System_Time</span>
            <span class="font-heading text-xl text-zinc-500 italic animate-pulse">--:--:--</span>
        </div>
    </div>

    <div class="text-center py-32 opacity-80">
        <div class="inline-block w-24 h-24 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-10"></div>
        <h3 class="font-heading text-4xl text-zinc-400 uppercase tracking-widest mb-6">NO_MATCHES_SCHEDULED</h3>
        <p class="font-mono text-[11px] text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Chronological fixture grid is currently empty.<br>
            Matches will appear here once the admin command center pushes the deployment sequence.
        </p>
    </div>
</div>`,

    'live-games': `
<div class="animate-boot flex flex-col items-center justify-center py-32 min-h-[80vh] relative overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div class="w-[450px] h-[450px] border border-red-600/40 rounded-full animate-ping-slow"></div>
        <div class="absolute w-[700px] h-[700px] border border-zinc-800 rounded-full animate-pulse-slow"></div>
    </div>

    <div class="relative mb-16">
        <div class="w-24 h-24 border-4 border-red-600/20 rounded-full flex items-center justify-center animate-pulse">
            <div class="w-8 h-8 bg-red-600 rounded-full shadow-[0_0_40px_#ff0033]"></div>
        </div>
    </div>

    <div class="text-center z-10 space-y-8 max-w-3xl px-6">
        <h2 class="font-heading text-5xl md:text-7xl text-zinc-300 italic uppercase tracking-tighter">LIVE_GRID_SCANNING</h2>
        <p class="font-mono text-[12px] text-red-600/80 uppercase tracking-[0.5em] animate-pulse">
            Searching for active Mikoko arena nodes...
        </p>
        <div class="flex justify-center gap-4 my-10">
            <span class="w-4 h-4 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            <span class="w-4 h-4 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span class="w-4 h-4 bg-zinc-700 rounded-full animate-bounce"></span>
        </div>
        <div class="bento-card bg-black/60 border-white/5 py-8 px-12 inline-block">
            <p class="text-[11px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                No live matches detected in the unified grid.<br>
                <span class="text-red-600 animate-pulse">Standby mode active</span> • First kick-off pending
            </p>
        </div>
    </div>

    <div class="mt-20 opacity-50 font-mono text-[10px] text-zinc-700 uppercase flex flex-wrap justify-center gap-8">
        <span>🛰️ Satellite Link: Stable</span>
        <span>📡 Signal Latency: --ms</span>
        <span>🔒 Encryption: Enabled</span>
    </div>
</div>`,

    'pure-stream': `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center bg-black/60">
        <div class="flex items-center gap-4">
            <div class="relative w-4 h-4">
                <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30"></div>
                <div class="absolute inset-0 bg-zinc-800 rounded-full"></div>
            </div>
            <div>
                <h2 class="font-heading text-3xl italic tracking-tighter text-zinc-400 uppercase">Pure_Stream_v1</h2>
                <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Direct Neural Feed • Nodes Offline</p>
            </div>
        </div>
        <div class="bg-red-600/5 px-5 py-2 border border-red-600/20">
            <span class="font-mono text-[9px] text-red-600/80 uppercase animate-pulse">STANDBY</span>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-75">
        ${[1,2,3].map(n => `
            <div class="space-y-4">
                <div class="relative aspect-video bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center">
                    <div class="text-center px-6">
                        <svg class="w-16 h-16 text-zinc-800 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span class="font-mono text-[10px] text-zinc-700 uppercase tracking-widest animate-pulse">FEED_${n}_OFFLINE</span>
                    </div>
                </div>
                <button class="w-full py-4 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-600 cursor-not-allowed">
                    LINK_SCREEN_0${n} <span class="text-red-600/50">[LOCKED – NO SIGNAL]</span>
                </button>
            </div>
        `).join('')}
    </div>

    <div class="bento-card bg-red-600/5 border-red-600/20 text-center py-8">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
            <span class="text-red-600 animate-pulse">Note:</span> Pure Stream nodes require active match deployment.<br>
            High-bandwidth links remain encrypted until 15–30 minutes before kick-off.
        </p>
    </div>
</div>`,

    'live-center': `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center bg-black/60">
        <div class="flex items-center gap-4">
            <div class="relative w-4 h-4">
                <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-40"></div>
                <div class="absolute inset-0 bg-red-600 rounded-full"></div>
            </div>
            <div>
                <h2 class="font-heading text-3xl italic tracking-tighter text-zinc-400 uppercase">Live_Center</h2>
                <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Real-Time Control • Port Harcourt Node • Offline</p>
            </div>
        </div>
        <div class="text-right hidden sm:block">
            <span class="font-mono text-[8px] text-zinc-600 uppercase block">Encryption</span>
            <span class="font-mono text-[10px] text-red-600/70 uppercase animate-pulse">No Active Link</span>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-12">
        <div class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase italic">NODE_ALPHA // PITCH_01</span>
                <span class="px-4 py-1 bg-red-600/5 border border-red-600/20 text-red-600/80 font-mono text-[9px] uppercase animate-pulse">Standby</span>
            </div>
            ${renderLiveMatchCard('NODE_A', 'NODE_B', '00:00', 'PENDING')}
        </div>

        <div class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase italic">NODE_BETA // PITCH_02</span>
                <span class="px-4 py-1 bg-zinc-900 border border-white/5 text-zinc-600 font-mono text-[9px] uppercase">Inactive</span>
            </div>
            ${renderLiveMatchCard('NODE_C', 'NODE_D', '00:00', 'PENDING')}
        </div>
    </div>

    <div class="bento-card border-white/5 bg-black/40 text-center p-8 mt-12">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-relaxed">
            Live center awaiting official match initialization.<br>
            Real-time events, clock, and discipline logs will activate upon admin activation.
        </p>
    </div>
</div>`,
};

// ────────────────────────────────────────────────
//  CORE FUNCTIONS (unchanged)
// ────────────────────────────────────────────────

function switchTab(tab) {
    if (!mainContent) return;
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(15px)';

    setTimeout(() => {
        mainContent.innerHTML = views[tab] || views['home'];
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';

        document.querySelectorAll('.nav-link, .dock-btn').forEach(btn => btn.classList.remove('active'));
        const navBtn = document.getElementById(`nav-${tab}`);
        const dockBtn = document.getElementById(`dock-${tab}`);
        if (navBtn) navBtn.classList.add('active');
        if (dockBtn) dockBtn.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
}

function toggleMenu(isOpen) {
    const menu = document.getElementById('side-menu');
    const drawer = document.getElementById('menu-drawer');
    const overlay = document.getElementById('menu-overlay');
    if (!menu || !drawer || !overlay) return;

    if (isOpen) {
        menu.classList.add('active');
        overlay.style.opacity = "1";
        drawer.style.transform = "translateX(0)";
        menu.style.pointerEvents = "auto";
    } else {
        menu.classList.remove('active');
        overlay.style.opacity = "0";
        drawer.style.transform = "translateX(100%)";
        menu.style.pointerEvents = "none";
    }
}

function showAlert(title, message) {
    const modal = document.getElementById('modalOverlay');
    const t = document.getElementById('modalTitle');
    const b = document.getElementById('modalBody');
    if (modal && t && b) {
        t.innerText = title;
        b.innerText = message;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) modal.style.display = 'none';
}

// ────────────────────────────────────────────────
//  FIREBASE + INIT
// ────────────────────────────────────────────────

if (typeof db !== 'undefined') {
    db.ref('standings').on('value', (snapshot) => {
        const allStats = snapshot.val() || {};

        const groupA = document.getElementById('group-a-node-container');
        if (groupA) groupA.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], allStats);

        const groupB = document.getElementById('group-b-node-container');
        if (groupB) groupB.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], allStats);
    });
}

setInterval(() => {
    const timer = document.getElementById('live-timer');
    if (timer) timer.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
}, 1000);
// Temporary news listener for testing
if (typeof db !== 'undefined') {
    db.ref('news_feed').on('child_added', (snapshot) => {
        const post = snapshot.val();
        console.log("New news post received:", post);

        // Show simple alert so you know it's working
        alert("New feed item!\n" + (post.text || "Image only") + "\nPosted: " + post.date);
    });
}
window.onload = () => switchTab('home');
