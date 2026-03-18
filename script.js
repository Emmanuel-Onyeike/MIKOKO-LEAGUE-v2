/**
 * MIKOKO // NEURAL_DASH_2040
 * FULL_CORE_ENGINE_RESTORATION_V3 – Real-time updates from admin + preserved waiting UI
 * All tabs update instantly when admin changes anything
 * NEWS tab keeps your exact offline/waiting UI until posts exist
 */

const mainContent = document.getElementById('main-content');

// ────────────────────────────────────────────────
// HELPER RENDER FUNCTIONS
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
    for (let i = 6; i <= 20; i++) {
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
// ALL VIEWS
// ────────────────────────────────────────────────

const views = {
    home: `
    <div class="animate-boot space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bento-card !p-6 flex flex-col items-center border-l-4 border-l-red-600">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Teams_Loaded</p>
                <span class="text-4xl font-bold italic tracking-tighter animate-pulse">08</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Live_Matches</p>
                <span class="text-4xl font-bold italic tracking-tighter text-zinc-500 animate-pulse">00</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Session_Goals</p>
                <span class="text-4xl font-bold italic tracking-tighter text-zinc-500 animate-pulse">00</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center bg-red-600/5">
                <p class="text-[8px] font-heading text-red-600 uppercase mb-1">Arena_State</p>
                <p class="text-sm font-bold italic uppercase animate-pulse text-red-400">Awaiting Deployment</p>
            </div>
        </div>
    </div>`,

    standings: `
    <div class="animate-boot space-y-8 pb-24">
        <div class="bento-card border-b-2 border-red-600 flex justify-between items-center relative overflow-hidden">
            <div class="absolute top-0 right-0 p-2 opacity-10">
                <span class="font-heading text-6xl italic text-zinc-800">INIT</span>
            </div>
            <div class="relative z-10">
                <h2 class="font-heading text-4xl italic tracking-tighter text-white uppercase">Group_Stage</h2>
                <p class="text-[9px] font-mono text-red-600/70 uppercase tracking-[0.4em] animate-pulse">Phase_01 • Deployment Pending</p>
            </div>
        </div>
      
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900">
                <div class="bg-zinc-900/30 p-4 border-b border-white/5">
                    <h3 class="font-heading text-sm italic text-red-600/80 tracking-widest uppercase">GROUP_A_NODE</h3>
                </div>
                <div id="group-a-node-container">
                    ${renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'])}
                </div>
            </div>
          
            <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900">
                <div class="bg-zinc-900/30 p-4 border-b border-white/5">
                    <h3 class="font-heading text-sm italic text-red-600/80 tracking-widest uppercase">GROUP_B_NODE</h3>
                </div>
                <div id="group-b-node-container">
                    ${renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'])}
                </div>
            </div>
        </div>
        <div class="text-center mt-10 py-6 bg-black/30 border border-red-600/10 rounded-xl">
            <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
                <span class="text-red-600">●</span> Standings grid initializing • First match data expected soon
            </p>
        </div>
    </div>`,

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
                <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Real-Time Control • Port Harcourt Node</p>
            </div>
        </div>
    </div>
    <div id="live-center-dynamic" class="grid grid-cols-1 gap-12">
        <!-- Will be replaced instantly by real data -->
    </div>
    <div class="bento-card border-white/5 bg-black/40 text-center p-8 mt-12">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-relaxed">
            Live center now fully synced with admin • Real-time clock & scores active
        </p>
    </div>
</div>`,
};

// ────────────────────────────────────────────────
// CORE FUNCTIONS
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
        // Special handling for NEWS tab
        if (tab === 'news') {
            if (newsPosts.length > 0) {
                updateNewsTab(newsPosts);
            } else {
                mainContent.innerHTML = views.news;
            }
        }
    }, 250);
}

// ────────────────────────────────────────────────
// IN-APP + BROWSER NOTIFICATION HELPERS
// ────────────────────────────────────────────────

function showAlert(title, message) {
    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "https://mikoko.neural/icon-192.png",
            tag: "mikoko-alert",
            requireInteraction: false
        });
    }

    // Slide-down toast
    let toast = document.getElementById('mikoko-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mikoko-toast';
        toast.style.cssText = `
            position: fixed;
            top: -120px;
            left: 50%;
            transform: translateX(-50%);
            width: 92%;
            max-width: 380px;
            background: linear-gradient(90deg, #111, #1a1a1a);
            color: white;
            padding: 18px 20px;
            border-radius: 14px;
            box-shadow: 0 20px 40px rgba(255,0,51,0.3);
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 15px;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 14px;
            border: 1px solid #ff0033;
            transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <div style="flex:1">
            <div style="font-weight: 700; font-size: 16px; letter-spacing: -0.3px;">${title}</div>
            <div style="opacity: 0.95; margin-top: 3px; line-height: 1.35;">${message}</div>
        </div>
        <button onclick="closeToast()" style="background:none;border:none;color:#ff0033;font-size:28px;line-height:1;padding:0 8px;cursor:pointer;">×</button>
    `;
    setTimeout(() => { toast.style.top = '24px'; }, 10);
    setTimeout(() => {
        if (toast) {
            toast.style.top = '-120px';
            setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 500);
        }
    }, 5500);
}

window.closeToast = function() {
    const toast = document.getElementById('mikoko-toast');
    if (toast) {
        toast.style.top = '-120px';
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 500);
    }
};

// ────────────────────────────────────────────────
// NEWS FEED LOGIC
// ────────────────────────────────────────────────

let newsPosts = [];

if (typeof db !== 'undefined') {
    const newsRef = db.ref('news_feed');
    newsRef.orderByChild('timestamp').limitToLast(15).on('value', (snapshot) => {
        newsPosts = [];
        snapshot.forEach((child) => {
            newsPosts.push(child.val());
        });
        newsPosts.reverse();
        console.log('📰 News updated – Total posts:', newsPosts.length);

        if (document.querySelector('#nav-news.active, #dock-news.active')) {
            updateNewsTab(newsPosts);
        }

        if (newsPosts.length > 0) {
            const latest = newsPosts[0];
            showAlert(
                "NEW MIKOKO UPDATE",
                latest.text ? latest.text.substring(0, 80) + (latest.text.length > 80 ? '...' : '') : "New broadcast received"
            );
        }
    });
}

function updateNewsTab(posts) {
    const container = document.getElementById('main-content');
    if (!container) return;
    if (posts && posts.length > 0) {
        container.innerHTML = `
            <div class="animate-boot space-y-10 pb-28">
                <div class="text-center mb-12">
                    <h2 class="font-heading text-5xl md:text-7xl italic tracking-tighter text-red-600 uppercase">
                        NEURAL_FEED_LIVE
                    </h2>
                    <p class="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] mt-4">
                        Latest tactical broadcasts • ${posts.length} posts
                    </p>
                </div>
                ${posts.map(post => `
                    <div class="bento-card overflow-hidden border border-red-600/30 bg-black/50 backdrop-blur-md mb-10">
                        ${post.image ? `
                            <div class="relative h-64 md:h-96 overflow-hidden">
                                <img src="${post.image}" alt="Broadcast visual" class="w-full h-full object-cover transition-all duration-1000" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            </div>
                        ` : ''}
                        <div class="p-6 md:p-10">
                            <div class="flex justify-between items-center mb-5">
                                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    ${post.date || 'Just now'} • ${post.time || '--:--'}
                                </span>
                                <span class="px-4 py-1 bg-red-600/20 text-red-400 text-[9px] rounded-full">LIVE</span>
                            </div>
                            <div class="text-zinc-200 text-base leading-relaxed">
                                ${post.text || '<i class="text-zinc-500">[Visual transmission only]</i>'}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        container.innerHTML = views.news;
    }
}

// ────────────────────────────────────────────────
// WEB PUSH – survives tab close / browser close
// ────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function subscribeToPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn("Push not supported in this browser");
        return;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('Service Worker registered');

        let permission = Notification.permission;
        if (permission === 'default') {
            permission = await Notification.requestPermission();
        }
        if (permission !== 'granted') {
            console.log('Notification permission denied');
            return;
        }

        const vapidPublicKey = 'BKBPpzP5k3KxgrWtQZbeQVllNkC2b0hZ80hjqzVEitg6DIdElmEJSo5SteugGU3kHw2jSYOnGwJ3ICmjg_67PnA';

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });

        const subRef = db.ref('push_subscriptions').push();
        await subRef.set({
            subscription: subscription.toJSON(),
            userAgent: navigator.userAgent,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        console.log("Push subscription saved!");
    } catch (err) {
        console.error("Push subscription failed:", err);
    }
}

// ────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────

window.onload = () => {
    // Start on home
    switchTab('home');

    // Subscribe to push notifications
    subscribeToPush();

    // Initial news check
    if (typeof db !== 'undefined') {
        db.ref('news_feed').once('value').then(snap => {
            const posts = [];
            snap.forEach(child => posts.push(child.val()));
            posts.reverse();
            newsPosts = posts;
            if (document.querySelector('#nav-news.active, #dock-news.active') && posts.length > 0) {
                updateNewsTab(posts);
            }
        });
    }
};
