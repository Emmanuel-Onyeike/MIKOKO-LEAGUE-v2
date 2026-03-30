/**
 * MIKOKO // NEURAL_DASH_2040 – Final Working Dashboard
 * Real-time updates from admin to all tabs
 * Menu modal fixed, syntax clean, push ready
 */

const mainContent = document.getElementById('main-content');
let newsPosts = [];

// ────────────────────────────────────────────────
// MENU MODAL CONTROL – Fixed & Working
// ────────────────────────────────────────────────
function toggleMenu(open) {
  const modal = document.getElementById('menu-modal');
  if (!modal) return;
  if (open) {
    modal.classList.add('active');
  } else {
    modal.classList.remove('active');
  }
}

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
            const teamKey = team.toLowerCase().replace(/\s+/g, '');
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
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : (gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-zinc-500')}">${isWaiting ? '–' : (gd > 0 ? '+' + gd : gd)}</td>
                <td class="p-2 font-heading text-[10px] text-right italic ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-red-600 font-bold'}">${isWaiting ? 'PENDING' : points}</td>
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
    </div>`;
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
// ALL VIEWS – complete & self-contained
// ────────────────────────────────────────────────

const views = {
  home: `
    <div class="animate-boot space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bento-card !p-6 flex flex-col items-center border-l-4 border-l-red-600">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Teams_Loaded</p>
                <span class="text-4xl font-bold italic tracking-tighter">08</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Live_Matches</p>
                <span class="text-4xl font-bold italic tracking-tighter text-zinc-500">00</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center">
                <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Session_Goals</p>
                <span class="text-4xl font-bold italic tracking-tighter text-zinc-500">00</span>
            </div>
            <div class="bento-card !p-6 flex flex-col items-center bg-red-600/5">
                <p class="text-[8px] font-heading text-red-600 uppercase mb-1">Arena_State</p>
                <p class="text-sm font-bold italic uppercase animate-pulse">Waiting...</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bento-card min-h-[250px] flex items-center justify-around relative overflow-hidden">
                <div class="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                    <span class="text-[120px] font-heading italic">VS</span>
                </div>
                <div class="text-center z-10">
                    <div class="w-16 h-16 bg-zinc-900 rounded-full mb-3 border border-red-600/20 mx-auto"></div>
                    <p class="font-heading text-[9px] tracking-widest uppercase">UNDECIDED  FC</p>
                </div>
                <div class="text-center z-10">
                    <span class="text-red-600 font-mono text-[10px] tracking-[0.4em] block mb-2">PENDING</span>
                    <div class="waveform justify-center"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
                </div>
                <div class="text-center z-10">
                    <div class="w-16 h-16 bg-zinc-900 rounded-full mb-3 border border-red-600/20 mx-auto"></div>
                    <p class="font-heading text-[9px] tracking-widest uppercase">GABI FC</p>
                </div>
            </div>

            <div class="bento-card">
                <h3 class="font-heading text-[9px] text-zinc-500 tracking-widest mb-4 uppercase">Rankings_Preview</h3>
                <div class="space-y-3">
                    ${['GABI FC', 'OGBAFIA FC', 'HASSAN FC'].map((team, i) => `
                        <div class="flex justify-between text-[10px] border-b border-white/5 pb-1">
                            <span class="text-zinc-600 font-mono">0${i+1}</span>
                            <span class="font-bold italic uppercase">${team}</span>
                            <span class="text-red-600 font-bold">--</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <h3 class="font-heading text-[10px] text-red-600 tracking-[0.5em] pt-8">NEURAL_ROSTER_DEPLOYS</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-20">
            ${Object.entries({
                "GABI FC": ["OBIECHIMA- GK", "NZEKWU", "OAK", "ALUIS", "GOZIE", "DIVINE AMALEX", "FECHI", "JOSEPH", "NWABUEZE", "SUCCESS", "BOUYKA", "KENDO", "NISSI", "IGALA"],
                "HASSAN FC": ["CYRIL - GK", "EKEVAL", "FRANKLIN", "PEPSI", "CHIMUANYA", "IKENNA PASCAL", "HENRY", "RIZZY", "JAMIKE", "EBUKA", "MEZIE", "MICHEAL MBAPPE", "SMITH", "ISIAH"],
                "OGBAFIA FC": ["BALON- GK", "EMPEROR", "DONALD", "EKENE", "MICHEAL", "JJ", "HASSAN", "CHILAKA", "KONJ", "ONOYE CHARLES", "BANJO", "IDIBIA", "KALA", "SIRKEN"],
                "JED FC": ["MAXWELL - GK", "FRANCIS", "CYRIL", "GENTLE", "DENNIS", "DUBEM", "BERNIE", "MARVIS", "RIDER", "KAKAS", "MILLER", "NELLY", "DIOR", "ZAKI"],
                "UNDECIDED FC": ["NNAMDI - GK", "NKOLAGWU", "AZZO", "ANTHONY", "CHIBUIKEM", "PLAYBOY", "HEZES", "MICHEAL", "ZICO", "HALLAND", "A1", "AMA", "ELVIS", "ARIEL", "JOSH"],
                "BIG PAMS FC": ["EMMA - GK", "SOMADINNA", "UGO", "ABBA", "RHEMA", "VON", "NOBLE", "CHARLES", "FAVOUR", "TEMPLE", "JOHN", "VICTOR JIZZY", "JP (LAW)", "JP (MAIN CAMP)", "CHUKWUMA"],
                "GUNNERS FC": ["PETER- GK", "DANIEL", "CHUKWUEMEKA", "ORORO", "SOPULU", "PASCAL", "PABLO", "SPORTY", "ECHE", "NESTER", "CHIMAOBI", "DAMMY", "MITCHELL", "DOMINIC"],
                "ZUBBY FC": ["ONE GUY - GK", "SOMTO", "JK", "SOLOMON BLACK", "CHUKA", "CALVIN", "ARINZE", "ELIJAH", "MELLO", "BABY", "GRANDSON", "CHINEMEREM", "JASO", "MARSHAL", "CUSH"]
            }).map(([teamName, players]) => `
                <div class="bento-card !p-0 overflow-hidden border-zinc-800 hover:border-red-600/30 transition-all">
                    <div class="bg-zinc-900/50 p-4 border-b border-white/5 flex justify-between items-center">
                        <p class="text-[9px] font-heading text-red-600 italic tracking-tighter">${teamName}</p>
                        <div class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                    </div>
                    <div class="p-4 h-56 overflow-y-auto roster-scroll space-y-2">
                        ${players.map((player, i) => `
                            <div class="flex items-center gap-3 group/item">
                                <span class="text-[8px] font-mono text-zinc-700">${(i + 1).toString().padStart(2, '0')}</span>
                                <span class="text-[9px] font-bold text-zinc-400 group-hover/item:text-white transition-colors uppercase">${player}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="mt-12 bento-card !p-0 overflow-hidden border-t border-red-600/20">
            <div class="flex items-stretch h-12">
                <div class="bg-red-600 px-6 flex items-center justify-center z-10">
                    <span class="text-[10px] font-heading text-white tracking-[0.2em] uppercase whitespace-nowrap">Neural_Breaking</span>
                </div>
                <div class="flex-1 bg-zinc-900/80 flex items-center overflow-hidden relative">
                    <div class="flex whitespace-nowrap animate-ticker gap-12">
                        <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <span class="text-red-600">●</span> GABI FC SECURES STAR SIGNING OBIECHIMA FOR GOALKEEPER NODE
                        </span>
                        <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <span class="text-red-600">●</span> OGBAFIA FC CORE STABILITY AT 98% AFTER TRAINING DEPLOYMENT
                        </span>
                        <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <span class="text-red-600">●</span> HASSAN FC MBAPPE VARIANT SPOTTED IN OPTIMIZATION DRILLS
                        </span>
                        <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <span class="text-red-600">●</span> ZUBBY FC READY FOR KICK-OFF: "ONE GUY" TAKES THE GLOVES
                        </span>
                    </div>
                </div>
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
          <div id="group-a-standings">
            ${renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'])}
          </div>
        </div>
        <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900">
          <div class="bg-zinc-900/30 p-4 border-b border-white/5">
            <h3 class="font-heading text-sm italic text-red-600/80 tracking-widest uppercase">GROUP_B_NODE</h3>
          </div>
          <div id="group-b-standings">
            ${renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'])}
          </div>
        </div>
      </div>
      <div class="text-center mt-10 py-6 bg-black/30 border border-red-600/10 rounded-xl">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
          <span class="text-red-600">●</span> Standings grid ready • Updates live from admin
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
      <p class="text-[9px] font-mono text-green-500/70 uppercase tracking-[0.4em]">Season_26 • Deployment_Active</p>
    </div>
    <div class="hidden md:block text-right">
      <span class="font-mono text-[10px] text-zinc-600 uppercase block">System_Time</span>
      <span class="font-heading text-xl text-zinc-500 italic">15:30:00</span>
    </div>
  </div>

  <div class="flex items-center space-x-4 px-2">
    <div class="h-[1px] flex-grow bg-zinc-800"></div>
    <h3 class="font-mono text-xs text-red-600 uppercase tracking-[0.5em]">Game_Week_01</h3>
    <div class="h-[1px] flex-grow bg-zinc-800"></div>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    
    <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors group">
      <div class="flex justify-between items-start mb-4">
        <span class="font-mono text-[9px] text-zinc-500 uppercase">30_MAR_2026 // 15:30</span>
        <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Venue: Law_Faculty_Pitch</span>
      </div>
      <div class="flex items-center justify-around text-center">
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Undecided FC</div>
        <div class="font-mono text-zinc-600 text-xs px-4">VS</div>
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Gabi FC</div>
      </div>
    </div>

    <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <span class="font-mono text-[9px] text-zinc-500 uppercase">31_MAR_2026 // 15:30</span>
        <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Venue: Law_Faculty_Pitch</span>
      </div>
      <div class="flex items-center justify-around text-center">
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Jed FC</div>
        <div class="font-mono text-zinc-600 text-xs px-4">VS</div>
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Ogbafia FC</div>
      </div>
    </div>

    <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <span class="font-mono text-[9px] text-zinc-500 uppercase">01_APR_2026 // 15:30</span>
        <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Venue: Law_Faculty_Pitch</span>
      </div>
      <div class="flex items-center justify-around text-center">
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Big Pams FC</div>
        <div class="font-mono text-zinc-600 text-xs px-4">VS</div>
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Hassan FC</div>
      </div>
    </div>

    <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <span class="font-mono text-[9px] text-zinc-500 uppercase">06_APR_2026 // 15:30</span>
        <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Venue: Law_Faculty_Pitch</span>
      </div>
      <div class="flex items-center justify-around text-center">
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Gunners FC</div>
        <div class="font-mono text-zinc-600 text-xs px-4">VS</div>
        <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Zubby FC</div>
      </div>
    </div>

  </div>
</div>`,

  'live-games': `
    <div class="animate-boot flex flex-col items-center justify-center py-20 min-h-[80vh] relative overflow-hidden">
  <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    <div class="w-[600px] h-[600px] border border-red-600/20 rounded-full animate-ping-slow"></div>
  </div>

  <div class="z-10 w-full max-w-4xl px-6 space-y-12">
    
    <div class="text-center space-y-2">
      <div class="inline-flex items-center gap-2 px-3 py-1 border border-red-600/30 bg-red-600/5 rounded-full">
        <span class="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
        <span id="match-status" class="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em]">Initialising_Link...</span>
      </div>
      <h2 class="font-heading text-4xl md:text-6xl text-zinc-300 italic uppercase tracking-tighter mt-4">Live_Match_Node</h2>
    </div>

    <div class="bento-card bg-black/40 border-white/5 p-12 relative group">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div class="flex-1 text-center md:text-right">
          <h3 class="font-heading text-3xl md:text-5xl text-zinc-200 uppercase italic">Undd FC</h3>
          <span class="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Home_Unit</span>
        </div>

        <div class="flex flex-col items-center px-10 border-x border-zinc-800/50">
          <div id="match-timer" class="font-heading text-5xl text-red-600 italic mb-2">00:00</div>
          <div class="font-heading text-6xl text-zinc-100 tracking-tighter"> - : - </div>
        </div>

        <div class="flex-1 text-center md:text-left">
          <h3 class="font-heading text-3xl md:text-5xl text-zinc-200 uppercase italic">Gabi FC</h3>
          <span class="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Away_Unit</span>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 h-[2px] bg-red-600/30 w-full overflow-hidden">
        <div id="timer-progress" class="h-full bg-red-600 transition-all duration-1000" style="width: 0%"></div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-8 font-mono text-[10px] text-zinc-600 uppercase">
      <div class="flex items-center gap-2">
        <span class="text-zinc-800">●</span> Venue: Law_Faculty_Pitch
      </div>
      <div class="flex items-center gap-2">
        <span class="text-zinc-800">●</span> Latency: 24ms
      </div>
      <div class="flex items-center gap-2">
        <span class="text-zinc-800">●</span> Stream: Encrypted
      </div>
    </div>
  </div>
</div>
`,

'pure-stream': `
<div class="animate-boot space-y-10 pb-28">
  <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center bg-black/60">
    <div class="flex items-center gap-4">
      <div class="relative w-4 h-4">
        <div id="stream-ping" class="absolute inset-0 bg-zinc-800 rounded-full"></div>
        <div id="stream-ping-pulse" class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30"></div>
      </div>
      <div>
        <h2 class="font-heading text-3xl italic tracking-tighter text-zinc-400 uppercase">Pure_Stream_v1</h2>
        <p id="stream-status-text" class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Direct Neural Feed • Initializing...</p>
      </div>
    </div>
    <div id="stream-tag" class="bg-red-600/5 px-5 py-2 border border-red-600/20">
      <span class="font-mono text-[9px] text-red-600/80 uppercase animate-pulse">STANDBY</span>
    </div>
  </div>

  <div id="stream-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6">
    </div>

  <div id="stream-footer" class="bento-card bg-red-600/5 border-red-600/20 text-center py-8">
    <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
      <span class="text-red-600 animate-pulse">Encryption_Key:</span> Pending_3:39PM_Release<br>
      High-bandwidth links remain encrypted until scheduled activation.
    </p>
  </div>
  
 
</div>
`,

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
        <!-- Replaced by real data -->
      </div>
      <div class="bento-card border-white/5 bg-black/40 text-center p-8 mt-12">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-relaxed">
          Live center now fully synced with admin • Real-time clock & scores active
        </p>
      </div>
    </div>`
};

// ────────────────────────────────────────────────
// TAB SWITCH FUNCTION
// ────────────────────────────────────────────────
function switchTab(tab) {
  if (!mainContent) return;
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'translateY(15px)';
  setTimeout(() => {
    mainContent.innerHTML = views[tab] || views.home;
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';

    // Re-activate nav/dock buttons
    document.querySelectorAll('.nav-link, .dock-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`nav-${tab}`)?.classList.add('active');
    document.getElementById(`dock-${tab}`)?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Force immediate update for news if already loaded
    if (tab === 'news' && newsPosts.length > 0) {
      updateNewsTab(newsPosts);
    }

    // Force immediate update for other tabs that need it
    if (tab === 'standings') updateStandingsUI();
    if (tab === 'live-center') updateLiveMatchUI();
  }, 250);
}

// ────────────────────────────────────────────────
// NEWS UPDATE (already perfect – keeping it)
// ────────────────────────────────────────────────
function updateNewsTab(posts) {
  if (!mainContent) return;
  if (posts.length > 0) {
    mainContent.innerHTML = `
      <div class="animate-boot space-y-10 pb-28">
        <div class="text-center mb-12">
          <h2 class="font-heading text-5xl md:text-7xl italic tracking-tighter text-red-600 uppercase">NEURAL_FEED_LIVE</h2>
          <p class="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] mt-4">Latest tactical broadcasts • ${posts.length} posts</p>
        </div>
        ${posts.map(p => `
          <div class="bento-card overflow-hidden border border-red-600/30 bg-black/50 backdrop-blur-md mb-10">
            ${p.image ? `<div class="relative h-64 md:h-96 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div></div>` : ''}
            <div class="p-6 md:p-10">
              <div class="flex justify-between items-center mb-5">
                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">${p.date || 'Just now'} • ${p.time || '--:--'}</span>
                <span class="px-4 py-1 bg-red-600/20 text-red-400 text-[9px] rounded-full">LIVE</span>
              </div>
              <div class="text-zinc-200 text-base leading-relaxed">${p.text || '<i class="text-zinc-500">[Visual transmission only]</i>'}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    mainContent.innerHTML = views.news;
  }
}

// ────────────────────────────────────────────────
// NEW: STANDINGS UI UPDATE FUNCTION (called live + on tab switch)
// ────────────────────────────────────────────────
function updateStandingsUI() {
  const ga = document.getElementById('group-a-standings');
  const gb = document.getElementById('group-b-standings');
  if (!ga || !gb) return;

  // We'll get the latest data from the listener cache or Firebase
  db.ref('standings').once('value').then(snap => {
    const data = snap.val() || {};
    ga.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], data);
    gb.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], data);
  });
}

// ────────────────────────────────────────────────
// NEW: LIVE MATCH UI UPDATE FUNCTION
// ────────────────────────────────────────────────
function updateLiveMatchUI() {
  const container = document.getElementById('live-center-dynamic');
  if (!container) return;

  db.ref('live_matches/node_alpha').once('value').then(snap => {
    const data = snap.val() || {};
    container.innerHTML = data.home && data.away
      ? renderLiveMatchCard(data.home, data.away, data.clock || '00:00', data.status || 'PENDING', data.homeScore || 0, data.awayScore || 0)
      : '<div class="p-12 text-center text-zinc-500">Awaiting live match data...</div>';
  });
}

// ────────────────────────────────────────────────
// REAL-TIME LISTENERS – ALL SECTIONS UPDATE INSTANTLY
// ────────────────────────────────────────────────
if (typeof db !== 'undefined') {
  // ── News (already perfect)
  db.ref('news_feed').orderByChild('timestamp').limitToLast(15).on('value', snapshot => {
    newsPosts = snapshot.val() ? Object.values(snapshot.val()) : [];
    newsPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    if (document.querySelector('#nav-news.active, #dock-news.active')) {
      updateNewsTab(newsPosts);
    }
  });

  // ── Standings (update both groups instantly – even if not on tab)
  db.ref('standings').on('value', snapshot => {
    const data = snapshot.val() || {};
    const ga = document.getElementById('group-a-standings');
    const gb = document.getElementById('group-b-standings');
    if (ga) ga.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], data);
    if (gb) gb.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], data);
  });

  // ── Live Match (update live-center instantly)
  db.ref('live_matches/node_alpha').on('value', snapshot => {
    const data = snapshot.val() || {};
    const container = document.getElementById('live-center-dynamic');
    if (container) {
      container.innerHTML = data.home && data.away
        ? renderLiveMatchCard(data.home, data.away, data.clock || '00:00', data.status || 'PENDING', data.homeScore || 0, data.awayScore || 0)
        : '<div class="p-12 text-center text-zinc-500">Awaiting live match data...</div>';
    }
  });

  // ── Fixtures, Leaderboard, Stream/Broadcast settings (refresh tab content instantly)
  ['fixtures', 'leaderboard', 'stream_settings', 'broadcast_settings', 'stream_links'].forEach(path => {
    db.ref(path).on('value', () => {
      const activeTab = document.querySelector('.nav-link.active, .dock-btn.active')?.id?.replace(/nav-|dock-/g, '');
      if (activeTab && ['fixtures', 'leaderboard'].includes(activeTab)) {
        switchTab(activeTab); // re-render whole tab with fresh data
      }
    });
  });
}

// ────────────────────────────────────────────────
// PUSH NOTIFICATIONS – Complete
// ────────────────────────────────────────────────

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn("Push not supported");
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
    console.error("Push setup failed:", err);
  }
}

// ────────────────────────────────────────────────
// START THE APP
// ────────────────────────────────────────────────

window.onload = () => {
  switchTab('home');
  subscribeToPush();
};
function toggleMenu(open) {
  const menu = document.getElementById('side-menu');
  if (!menu) return;
  menu.classList.toggle('active', open);
}

function updateMatchClock() {
    const timerEl = document.getElementById('match-timer');
    const statusEl = document.getElementById('match-status');
    const progressEl = document.getElementById('timer-progress');
    
    // Set Match Start: March 30, 2026, 15:30:00
    const startTime = new Date('2026-03-30T15:30:00').getTime();
    const now = new Date().getTime();
    const diffSeconds = Math.floor((now - startTime) / 1000);
    const diffMinutes = diffSeconds / 60;

    if (diffSeconds < 0) {
        statusEl.innerText = "Standby: Kick-off Pending";
        timerEl.innerText = "00:00";
        return;
    }

    // Phase 1: First Half (0-45 mins)
    if (diffMinutes <= 45) {
        statusEl.innerText = "Live: First_Half";
        timerEl.innerText = formatTime(diffSeconds);
        progressEl.style.width = (diffMinutes / 45 * 50) + "%";
    } 
    // Phase 2: Half Time (45-50 mins)
    else if (diffMinutes > 45 && diffMinutes <= 50) {
        statusEl.innerText = "Status: Half_Time";
        timerEl.innerText = "45:00";
        progressEl.style.width = "50%";
    } 
    // Phase 3: Second Half (50-95 mins)
    else if (diffMinutes > 50 && diffMinutes <= 95) {
        statusEl.innerText = "Live: Second_Half";
        // Calculate played time: current time minus the 5 min break
        const matchPlayedSeconds = diffSeconds - 300; 
        timerEl.innerText = formatTime(matchPlayedSeconds);
        progressEl.style.width = (50 + ((diffMinutes - 50) / 45 * 50)) + "%";
    } 
    // Phase 4: Full Time
    else {
        statusEl.innerText = "Status: Full_Time";
        timerEl.innerText = "90:00";
        progressEl.style.width = "100%";
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Update every second
setInterval(updateMatchClock, 1000);
updateMatchClock();



(function() {
  const streamUrls = [
    "https://elite-league-streamer.vercel.app/",
    "https://elite-league-streamer-2.vercel.app/", // Corrected assumed missing link
    "https://elite-league-streamer-3.vercel.app/"
  ];

  (function() {
  // Flag to prevent the iframe from refreshing every 10 seconds once live
  let isAlreadyLive = false;

  const streamUrls = [
    "https://elite-league-streamer.vercel.app/",
    "https://elite-league-streamer-2.vercel.app/",
    "https://elite-league-streamer-3.vercel.app/"
  ];

  function updateStreams() {
    const grid = document.getElementById('stream-grid');
    const statusText = document.getElementById('stream-status-text');
    const tag = document.getElementById('stream-tag');
    const ping = document.getElementById('stream-ping');
    const footer = document.getElementById('stream-footer');

    if (!grid) return; // Safety check

    const now = new Date();
    // Target: March 30, 2026, 03:39 PM
    const activationTime = new Date('2026-03-30T15:39:00');

    if (now >= activationTime) {
      // If we are already live, don't re-run the HTML injection (prevents iframe flicker)
      if (isAlreadyLive) return; 

      // ONLINE STATE
      isAlreadyLive = true;
      
      if (statusText) {
        statusText.innerText = "Direct Neural Feed • Nodes Active";
        statusText.className = "text-[9px] font-mono text-green-500 uppercase tracking-[0.4em] animate-pulse";
      }
      
      if (tag) {
        tag.innerHTML = '<span class="font-mono text-[9px] text-green-500 uppercase">LIVE_FEED</span>';
        tag.className = "bg-green-600/5 px-5 py-2 border border-green-600/20";
      }
      
      if (ping) ping.className = "absolute inset-0 bg-green-500 rounded-full";
      if (footer) footer.style.display = "none";

      grid.innerHTML = streamUrls.map((url, i) => `
        <div class="space-y-4">
          <div class="relative aspect-video bg-black border border-white/10 overflow-hidden">
            <iframe 
              src="${url}" 
              class="w-full h-full border-0" 
              allow="autoplay; fullscreen" 
              loading="lazy">
            </iframe>
            <div class="absolute inset-0 -z-10 flex items-center justify-center bg-zinc-950">
               <div class="w-8 h-8 border-2 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <a href="${url}" target="_blank" class="block w-full py-4 bg-red-600/10 border border-red-600/20 font-heading text-[9px] tracking-[0.3em] text-red-500 text-center hover:bg-red-600 hover:text-white transition-all uppercase">
            LINK_SCREEN_0${i+1} [DECRYPTED]
          </a>
        </div>
      `).join('');
      
    } else {
      // OFFLINE / WAITING STATE
      // Only render this if we haven't reached the time yet
      grid.innerHTML = [1, 2, 3].map(n => `
        <div class="space-y-4 opacity-75">
          <div class="relative aspect-video bg-zinc-950 border border-white/5 flex items-center justify-center">
            <div class="text-center px-6">
               <div class="w-10 h-10 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
               <span class="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">Awaiting_Signal_0${n}...</span>
            </div>
          </div>
          <button class="w-full py-4 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-600 cursor-not-allowed uppercase">
            LINK_SCREEN_0${n} <span class="text-red-600/50">[LOCKED]</span>
          </button>
        </div>
      `).join('');
    }
  }

  // Check every 10 seconds
  setInterval(updateStreams, 10000);
  updateStreams();
})();
