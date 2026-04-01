// ===============================================
// MIKOKO NEURAL_DASH_2040 – FINAL COMPLETE VERSION
// All views restored, fixed, and enhanced
// ===============================================

const mainContent = document.getElementById('main-content');
let newsPosts = [];

// Menu Control
function toggleMenu(open) {
  const modal = document.getElementById('menu-modal') || document.getElementById('side-menu');
  if (modal) modal.classList.toggle('active', open);
}

// Helper: Group Table
function renderGroupTable(teams, groupData = {}) {
  const hasRealData = Object.keys(groupData).length > 0 && Object.values(groupData).some(s => (s.mp || 0) > 0 || (s.w || 0) > 0);
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
            <th class="p-2 font-heading text-[8px] text-red-600 uppercase text-right">Pts</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          ${teams.map((team, i) => {
            const teamKey = team.toLowerCase().replace(/\s+/g, '');
            const s = groupData[teamKey] || { mp:0, w:0, d:0, l:0, gf:0, ga:0 };
            const gd = s.gf - s.ga;
            const points = (s.w * 3) + (s.d || 0);
            const isWaiting = !hasRealData || (s.mp === 0 && s.w === 0 && s.d === 0 && s.l === 0);
            return `
              <tr class="${isWaiting ? 'opacity-65' : 'hover:bg-white/[0.02]'} transition-colors">
                <td class="p-2 font-mono text-[10px] ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-600'}">${i + 1}</td>
                <td class="p-2 font-heading text-[9px] uppercase italic tracking-tighter ${isWaiting ? 'text-zinc-500' : 'text-zinc-300'}">${team}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.mp}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.w}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.d}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.l}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.gf}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-zinc-500'}">${isWaiting ? '–' : s.ga}</td>
                <td class="p-2 font-mono text-[10px] text-center ${isWaiting ? 'text-zinc-700 animate-pulse' : (gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-zinc-500')}">${isWaiting ? '–' : (gd > 0 ? '+' + gd : gd)}</td>
                <td class="p-2 font-heading text-[10px] text-right italic ${isWaiting ? 'text-zinc-700 animate-pulse' : 'text-red-600 font-bold'}">${isWaiting ? 'PENDING' : points}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
      ${!hasRealData ? `
        <div class="py-10 text-center">
          <div class="inline-block w-10 h-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Standings node initializing • No match data received yet</p>
        </div>` : ''}
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
      </div>`;
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
      </div>`;
  }
  return list + `<div class="text-center py-5 text-[9px] font-mono text-zinc-600 uppercase tracking-widest opacity-60">... additional nodes waiting for admin deployment</div>`;
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
        <div class="flex-1 text-right"><h3 class="font-heading text-xl md:text-4xl ${isWaiting ? 'text-zinc-500' : 'text-white'} italic tracking-tighter uppercase leading-none">${home}</h3></div>
        <div class="flex flex-col items-center min-w-[120px]">
          <div class="font-heading text-6xl md:text-8xl ${isWaiting ? 'text-zinc-600' : 'text-white'} tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">${homeScore}:${awayScore}</div>
          <div class="mt-2 px-6 py-1 ${isWaiting ? 'bg-zinc-800' : 'bg-red-600'} font-mono text-xs ${isWaiting ? 'text-zinc-500' : 'text-white'} font-bold skew-x-[-12deg] shadow-[4px_4px_0px_#4a0000]">${isWaiting ? '00:00' : clock}</div>
        </div>
        <div class="flex-1 text-left"><h3 class="font-heading text-xl md:text-4xl ${isWaiting ? 'text-zinc-500' : 'text-white'} italic tracking-tighter uppercase leading-none">${away}</h3></div>
      </div>
    </div>
    ${isWaiting ? `
      <div class="p-12 text-center">
        <div class="inline-block w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-6"></div>
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Live feed node • Awaiting official activation</p>
      </div>` : `
      <div class="grid grid-cols-2 border-t border-white/5 bg-black/60 min-h-[150px]">
        <div class="p-4 border-r border-white/5 space-y-2">
          <div class="flex items-center gap-2 mb-3 opacity-50"><span class="font-heading text-[8px] text-zinc-400 uppercase">Home Events</span></div>
          <div class="flex items-center gap-3"><span class="font-mono text-[10px] text-red-600">--'</span><span class="font-heading text-[9px] text-zinc-500 italic uppercase">Waiting for data...</span></div>
        </div>
        <div class="p-4 space-y-2 text-right">
          <div class="flex items-center justify-end gap-2 mb-3 opacity-50"><span class="font-heading text-[8px] text-zinc-400 uppercase">Away Events</span></div>
          <div class="flex items-center justify-end gap-3 opacity-40"><span class="font-heading text-[9px] text-zinc-600 italic uppercase">No Signal</span><span class="font-mono text-[10px] text-zinc-800">'--</span></div>
        </div>
      </div>`}
  </div>`;
}

// All Views - Fully written and fixed
const views = {
  home: `
    <div class="animate-boot space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bento-card !p-6 flex flex-col items-center border-l-4 border-l-red-600">
          <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Teams Loaded</p>
          <span class="text-4xl font-bold italic tracking-tighter">08</span>
        </div>
        <div class="bento-card !p-6 flex flex-col items-center">
          <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Live Matches</p>
          <span class="text-4xl font-bold italic tracking-tighter text-zinc-500">02</span>
        </div>
        <div class="bento-card !p-6 flex flex-col items-center">
          <p class="text-[8px] font-heading text-zinc-600 uppercase mb-1">Session Goals</p>
          <span class="text-4xl font-bold italic tracking-tighter text-zinc-500">18</span>
        </div>
       <div class="bento-card !p-6 flex flex-col items-center bg-red-600/5">
  <p class="text-[8px] font-heading text-red-600 uppercase mb-1">Arena State</p>
  <p id="arena-state-text" class="text-sm font-bold italic uppercase animate-pulse text-zinc-500">
    Waiting...
  </p>
</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bento-card min-h-[250px] flex items-center justify-around relative overflow-hidden">
          <div class="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
            <span class="text-[120px] font-heading italic">VS</span>
          </div>
          <div class="text-center z-10">
            <div class="w-16 h-16 bg-zinc-900 rounded-full mb-3 border border-red-600/20 mx-auto"></div>
            <p class="font-heading text-[9px] tracking-widest uppercase">Big Pams FC</p>
          </div>
          <div class="text-center z-10">
            <span class="text-red-600 font-mono text-[10px] tracking-[0.4em] block mb-2">PENDING</span>
            <div class="waveform justify-center"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
          </div>
          <div class="text-center z-10">
            <div class="w-16 h-16 bg-zinc-900 rounded-full mb-3 border border-red-600/20 mx-auto"></div>
            <p class="font-heading text-[9px] tracking-widest uppercase">Hassan FC</p>
          </div>
        </div>
        <div class="bento-card">
          <h3 class="font-heading text-[9px] text-zinc-500 tracking-widest mb-4 uppercase">Rankings Preview</h3>
          <div class="space-y-3">
            ${['Undecided FC', 'Ogbafia FC', ''].map((team, i) => `
              <div class="flex justify-between text-[10px] border-b border-white/5 pb-1">
                <span class="text-zinc-600 font-mono">0${i+1}</span>
                <span class="font-bold italic uppercase">${team}</span>
                <span class="text-red-600 font-bold">--</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
      <h3 class="font-heading text-[10px] text-red-600 tracking-[0.5em] pt-8">NEURAL ROSTER DEPLOYS</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-20">
        ${Object.entries({
          "GABI FC": ["OBIECHIMA- GK", "NZEKWU", "OAK", "ALUIS", "GOZIE", "DIVINE AMALEX", "FECHI", "JOSEPH", "NWABUEZE", "SUCCESS", "BOUYKA", "KENDO","IKEM GREAT", "NISSI", "IGALA"],
          "HASSAN FC": ["CYRIL - GK", "EKEVAL", "FRANKLIN", "PEPSI", "CHIMUANYA", "IKENNA PASCAL", "HENRY", "RIZZY", "JAMIKE", "EBUKA", "MEZIE", "MICHEAL MBAPPE", "SMITH", "ISIAH"],
          "OGBAFIA FC": ["BALON- GK", "EMPEROR", "DONALD", "EKENE", "MICHEAL", "JJ", "HASSAN", "CHILAKA", "KONJ", "ONOYE CHARLES", "BANJO", "IDIBIA", "KALA", "SIRKEN"],
          "JED FC": ["MAXWELL - GK", "FRANCIS", "CYRIL", "GENTLE", "DENNIS", "DUBEM", "BERNIE", "MARVIS", "RIDER", "KAKAS", "MILLER", "NELLY", "DIOR", "ZAKI"],
          "UNDECIDED FC": ["NNAMDI - GK", "NKOLAGWU", "AZZO", "ANTHONY", "CHIBUIKEM", "PLAYBOY", "HEZES", "MICHEAL", "ZICO", "HALLAND", "A1", "AMA", "ELVIS", "ARIEL", "JOSH"],
          "BIG PAMS FC": ["EMMA - GK", "SOMADINNA", "UGO", "ABBA", "RHEMA", "VON", "NOBLE", "CHARLES", "FAVOUR", "TEMPLE", "JOHN", "VICTOR JIZZY", "JP (LAW)", "JP (MAIN CAMP)", "CHUKWUMA"],
          "GUNNERS FC": ["PETER- GK", "DANIEL", "CHUKWUEMEKA", "ORORO", "SOPULU", "PASCAL", "PABLO", "SPORTY", "ECHE", "NESTER", "CHIMAOBI", "DAMMY", "MITCHELL", "DOMINIC"],
          "ZUBBY FC": ["ONE GUY - GK", "SOMTO", "JK", "SOLOMON BLACK", "CHUKA", "CALVIN", "ARINZE", "ELIJAH", "MELLO", "BABY","VICTOR", "GRANDSON", "CHINEMEREM", "JASO", "MARSHAL", "CUSH"]
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
                </div>`).join('')}
            </div>
          </div>`).join('')}
      </div>
      <div class="mt-12 bento-card !p-0 overflow-hidden border-t border-red-600/20">
        <div class="flex items-stretch h-12">
          <div class="bg-red-600 px-6 flex items-center justify-center z-10">
            <span class="text-[10px] font-heading text-white tracking-[0.2em] uppercase whitespace-nowrap">Neural Breaking</span>
          </div>
          <div class="flex-1 bg-zinc-900/80 flex items-center overflow-hidden relative">
            <div class="flex whitespace-nowrap ticker gap-12">
              <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2"><span class="text-red-600">●</span> GABI FC SECURES OBIECHIMA FOR GOALKEEPER</span>
              <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2"><span class="text-red-600">●</span> OGBAFIA FC CORE STABILITY AT 98%</span>
              <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2"><span class="text-red-600">●</span> HASSAN FC MBAPPE VARIANT SPOTTED</span>
              <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2"><span class="text-red-600">●</span> ZUBBY FC "ONE GUY" TAKES THE GLOVES</span>
            </div>
          </div>
        </div>
      </div>
    </div>`,

standings: `
    <div class="animate-boot space-y-8 pb-24">
      <div class="bento-card border-b-2 border-red-600 flex justify-between items-center relative overflow-hidden bg-black/40">
        <div class="absolute top-0 right-0 p-2 opacity-10">
          <span class="font-heading text-6xl italic text-zinc-800">LIVE</span>
        </div>
        <div class="relative z-10">
          <h2 class="font-heading text-4xl italic tracking-tighter text-white uppercase">Group Stage</h2>
          <p class="text-[9px] font-mono text-green-500 uppercase tracking-[0.4em] animate-pulse">Manual Override Active • Node Synced</p>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- GROUP A -->
        <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900 bg-zinc-950/50">
          <div class="bg-zinc-900/30 p-4 border-b border-white/5 flex justify-between items-center">
            <h3 class="font-heading text-sm italic text-red-600/80 tracking-widest uppercase">GROUP A</h3>
            <span class="text-[8px] font-mono text-zinc-500">Standby Mode</span>
          </div>
          <div id="group-a-standings" class="p-6">
            ${renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'])}
          </div>
        </div>

        <!-- GROUP B -->
        <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900 ring-1 ring-red-600/20 bg-zinc-950/50">
          <div class="bg-zinc-900/30 p-4 border-b border-white/5 flex justify-between items-center">
            <h3 class="font-heading text-sm italic text-red-600/80 tracking-widest uppercase">GROUP B</h3>
            <span class="text-[8px] font-mono text-red-600 animate-pulse">Data Live</span>
          </div>
          <div id="group-b-standings" class="p-6">
            ${renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'])}
          </div>
        </div>
      </div>

      <!-- NO SERVER RESPONDING STATE -->
      <div id="no-server-state" class="hidden mt-8 p-10 bento-card border border-red-600/30 bg-black/60 text-center">
        <div class="mx-auto w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-6"></div>
        <h3 class="font-heading text-2xl text-red-500 mb-2">NO SERVER RESPONDING</h3>
        <p class="font-mono text-[10px] text-zinc-400 leading-relaxed max-w-md mx-auto">
          Standings node offline • No connection to admin backend<br>
          <span class="text-red-600">●</span> Waiting for server sync • Manual override available
        </p>
        <button onclick="retryStandingsConnection()" 
                class="mt-6 px-8 py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-600/50 text-red-400 text-xs font-heading tracking-widest uppercase transition">
          RETRY CONNECTION
        </button>
      </div>

      <div class="text-center mt-10 py-6 bg-black/30 border border-red-600/10 rounded-2xl">
        <p class="font-mono text-[10px] text-zinc-400">Real-time updates from admin • Manual data visible when server is down</p>
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
            <p class="text-zinc-600 font-mono text-base mt-6 uppercase tracking-widest">Broadcast system in standby • No tactical stream received</p>
          </div>
        </div>
      </div>
      <div class="text-center py-12 bg-black/30 border border-red-600/10 rounded-xl">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em] animate-pulse"><span class="text-red-600">●</span> News & visual data • Waiting for first admin push</p>
      </div>
    </div>`,

leaderboard: `
   <div class="animate-boot space-y-10 pb-28">
  <div class="bento-card flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-red-600/30 p-6">
    <div class="flex items-center gap-6 opacity-80">
      <div class="nexus-core scale-75 md:scale-100">
        <div class="nexus-inner"></div>
        <div class="nexus-orbit animate-pulse"></div>
      </div>
      <div>
        <h2 class="font-heading text-3xl md:text-5xl text-zinc-400 italic uppercase tracking-tighter">LEADERBOARDS</h2>
        <p class="font-mono text-[9px] tracking-[0.3em] text-emerald-400 uppercase">Season 26 • After Week 1 • Manual Update</p>
      </div>
    </div>
    <div class="flex bg-zinc-900/30 p-1 rounded-full border border-white/5">
      <button class="px-6 py-2 font-heading text-[8px] tracking-widest bg-red-600/10 text-red-400 rounded-full">GOALS</button>
      <button class="px-6 py-2 font-heading text-[8px] tracking-widest text-zinc-500">ASSISTS</button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="font-heading text-lg italic text-zinc-300 uppercase"><span class="text-red-600">01.</span> GOAL STRIKERS</h3>
        <span class="text-[10px] font-mono text-emerald-400">Week 1 • Manual</span>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-white/[0.02] border-l-4 border-red-600 rounded-xl">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">01</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">⚽</div>
            <div>
              <span class="font-heading text-base">Emma</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC • striker</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">4</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-red-600/50 rounded-xl">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">02</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🔥</div>
            <div>
              <span class="font-heading text-base">Halaand</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC • striker</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">3</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-red-600/30 rounded-xl opacity-90">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">03</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">⚡</div>
            <div>
              <span class="font-heading text-base">Dollar</span>
              <p class="text-[10px] font-mono text-zinc-500">Ogbafia FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">2</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-red-600/30 rounded-xl opacity-90">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">04</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">⚡</div>
            <div>
              <span class="font-heading text-base">Konj</span>
              <p class="text-[10px] font-mono text-zinc-500">Ogbafia FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">2</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-red-600/30 rounded-xl opacity-90">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">05</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">⚡</div>
            <div>
              <span class="font-heading text-base">Ekene</span>
              <p class="text-[10px] font-mono text-zinc-500">Ogbafia FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-red-600/30 rounded-xl opacity-90">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-red-500">06</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">⚡</div>
            <div>
              <span class="font-heading text-base">Tony</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-red-500">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-75">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">07</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🏃</div>
            <div>
              <span class="font-heading text-base">Chibuike</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-75">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">08</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🏃</div>
            <div>
              <span class="font-heading text-base">Nwabueze</span>
              <p class="text-[10px] font-mono text-zinc-500">Gabi FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-70">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">09</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">💥</div>
            <div>
              <span class="font-heading text-base">Ario</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC </p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-70">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">10</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">💥</div>
            <div>
              <span class="font-heading text-base">Ryder </span>
              <p class="text-[10px] font-mono text-zinc-500">Jed FC </p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-70">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">11</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">💥</div>
            <div>
              <span class="font-heading text-base">Kakas</span>
              <p class="text-[10px] font-mono text-zinc-500">Jed FC </p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">GOALS</span>
          </div>
        </div>
      </div>

      <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/30">
        <div class="p-5 border-b border-white/10">
          <span class="text-xs font-mono uppercase tracking-widest text-zinc-500">Extended Goal List</span>
        </div>
        <div class="max-h-[320px] overflow-y-auto roster-scroll p-5 space-y-3 text-sm">
          <div class="flex justify-between opacity-60"><span class="text-zinc-500">... more Pending logs</span></div>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="font-heading text-lg italic text-zinc-300 uppercase"><span class="text-red-600">02.</span> TACTICAL ASSISTS</h3>
        <span class="text-[10px] font-mono text-emerald-400">Week 1 • Manual</span>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-white/[0.02] border-l-4 border-amber-500 rounded-xl">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-amber-400">01</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🎯</div>
            <div>
              <span class="font-heading text-base">Hassan</span>
              <p class="text-[10px] font-mono text-zinc-500">Ogbafia FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-amber-400">3</span>
            <span class="block text-[10px] font-mono text-zinc-500">ASSISTS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-amber-500/70 rounded-xl">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-amber-400">02</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🔄</div>
            <div>
              <span class="font-heading text-base">Emma</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-amber-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">ASSISTS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-amber-500/70 rounded-xl">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-amber-400">03</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🔄</div>
            <div>
              <span class="font-heading text-base">Halaand</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-amber-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">ASSISTS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-amber-400/50 rounded-xl opacity-90">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-amber-400">04</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">📍</div>
            <div>
              <span class="font-heading text-base">Azuu</span>
              <p class="text-[10px] font-mono text-zinc-500"> Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-amber-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">ASSISTS</span>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-4 border-zinc-700 rounded-xl opacity-75">
          <div class="flex items-center gap-4">
            <span class="font-mono text-xl font-bold text-zinc-400">05</span>
            <div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-lg">🔀</div>
            <div>
              <span class="font-heading text-base">Anthony</span>
              <p class="text-[10px] font-mono text-zinc-500">Undecided FC</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-heading text-3xl text-zinc-400">1</span>
            <span class="block text-[10px] font-mono text-zinc-500">ASSISTS</span>
          </div>
        </div>
      </div>

      <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/30">
        <div class="p-5 border-b border-white/10">
          <span class="text-xs font-mono uppercase tracking-widest text-zinc-500">Extended Assists List</span>
        </div>
        <div class="max-h-[320px] overflow-y-auto roster-scroll p-5 space-y-3 text-sm">
          <div class="flex justify-between opacity-60"><span class="text-zinc-500">... more assists pending full match logs</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center mt-12 py-8 bg-black/40 border border-red-600/10 rounded-2xl">
    <p class="font-mono text-[10px] text-zinc-400">Leaderboards manually updated after Week 1 • Real sync coming soon</p>
  </div>
</div>`,
  

fixtures: `
   <div class="animate-boot space-y-10 pb-28">
      <!-- Header -->
      <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center p-6">
        <div>
          <h2 class="font-heading text-4xl italic tracking-tighter text-zinc-400 uppercase">Match Fixtures</h2>
          <p class="text-[9px] font-mono text-green-500/70 uppercase tracking-[0.4em]">Season 26 • Game Week 01 • Port Harcourt Node</p>
        </div>
        <div class="hidden md:block text-right">
          <span class="font-mono text-[10px] text-zinc-600 uppercase block">System Time</span>
          <span class="font-heading text-xl text-zinc-500 italic" id="system-time">15:30:00</span>
        </div>
      </div>

      <!-- Fixtures Section -->
      <div class="flex items-center space-x-4 px-2 mb-6">
        <div class="h-[1px] flex-grow bg-zinc-800"></div>
        <h3 class="font-mono text-xs text-red-600 uppercase tracking-[0.5em]">GAME WEEK 01</h3>
        <div class="h-[1px] flex-grow bg-zinc-800"></div>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors group p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="font-mono text-[9px] text-zinc-500 uppercase">30 MAR 2026 // 15:30</span>
            <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Law Faculty Pitch</span>
          </div>
          <div class="flex items-center justify-around text-center">
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Undecided FC</div>
            <div class="font-mono text-red-600 text-xs px-4 font-bold">VS</div>
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Gabi FC</div>
          </div>
        </div>

        <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="font-mono text-[9px] text-zinc-500 uppercase">31 MAR 2026 // 15:30</span>
            <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Law Faculty Pitch</span>
          </div>
          <div class="flex items-center justify-around text-center">
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Jed FC</div>
            <div class="font-mono text-red-600 text-xs px-4 font-bold">VS</div>
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Ogbafia FC</div>
          </div>
        </div>

        <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="font-mono text-[9px] text-zinc-500 uppercase">01 APR 2026 // 15:30</span>
            <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Law Faculty Pitch</span>
          </div>
          <div class="flex items-center justify-around text-center">
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Big Pams FC</div>
            <div class="font-mono text-red-600 text-xs px-4 font-bold">VS</div>
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Hassan FC</div>
          </div>
        </div>

        <div class="bento-card border-l-2 border-zinc-800 hover:border-red-600/50 transition-colors p-6">
          <div class="flex justify-between items-start mb-4">
            <span class="font-mono text-[9px] text-zinc-500 uppercase">06 APR 2026 // 15:30</span>
            <span class="font-mono text-[9px] text-red-600/70 uppercase tracking-widest">Law Faculty Pitch</span>
          </div>
          <div class="flex items-center justify-around text-center">
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Gunners FC</div>
            <div class="font-mono text-red-600 text-xs px-4 font-bold">VS</div>
            <div class="w-1/3 font-heading text-lg text-zinc-300 uppercase italic">Zubby FC</div>
          </div>
        </div>
      </div>

      <!-- STANDINGS INTEGRATED - MANUALLY FILLED -->
<div class="mt-16">
  <div class="flex items-center justify-between mb-6 px-2">
    <h3 class="font-heading text-xl italic tracking-tighter text-red-500">CURRENT STANDINGS</h3>
    <span class="text-[10px] font-mono text-emerald-400">MANUAL UPDATE • WEEK 01</span>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <div class="bento-card !p-0 overflow-hidden border-zinc-900">
      <div class="bg-zinc-900/40 p-5 border-b border-white/10 flex justify-between">
        <h4 class="font-heading text-sm uppercase tracking-widest text-red-400">GROUP A</h4>
        <span class="text-[10px] font-mono text-zinc-500">After Matchday 1</span>
      </div>
      <div class="p-6 overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[450px]">
          <thead class="bg-zinc-900/80 border-b border-white/10">
      <tr>
              <th class="p-3 font-heading text-[8px] text-zinc-500 uppercase">Pos</th>
              <th class="p-3 font-heading text-[8px] text-zinc-500 uppercase">Team</th>
              <th class="p-3 font-mono text-[8px] text-center">P</th>
              <th class="p-3 font-mono text-[8px] text-center">W</th>
              <th class="p-3 font-mono text-[8px] text-center">D</th>
              <th class="p-3 font-mono text-[8px] text-center">L</th>
              <th class="p-3 font-mono text-[8px] text-center">GD</th>
              <th class="p-3 font-heading text-red-600 text-right">Pts</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10 text-sm">
            <tr class="hover:bg-white/5">
              <td class="p-3 font-mono text-emerald-400 font-bold">1</td>
              <td class="p-3 font-heading uppercase">Ogbafia FC</td>
              <td class="p-3 text-center">1</td>
              <td class="p-3 text-center">1</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center text-green-400">+3</td>
              <td class="p-3 text-right font-bold text-red-600">3</td>
            </tr>
            <tr class="hover:bg-white/5">
              <td class="p-3 font-mono text-zinc-400">2</td>
              <td class="p-3 font-heading uppercase">Gunners FC</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-right font-bold text-zinc-500">0</td>
            </tr>
            <tr class="hover:bg-white/5 opacity-70">
              <td class="p-3 font-mono text-zinc-500">3</td>
              <td class="p-3 font-heading uppercase">Zubby FC</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-right font-bold text-zinc-500">0</td>
            </tr>
               <tr class="hover:bg-white/5">
              <td class="p-3 font-mono text-zinc-400">4</td>
              <td class="p-3 font-heading uppercase">Jed FC</td>
              <td class="p-3 text-center">1</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">0</td>
              <td class="p-3 text-center">1</td>
              <td class="p-3 text-center text-red-400">-3</td>
              <td class="p-3 text-right font-bold text-zinc-500">0</td>
            </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- GROUP B - Manual Data (with Undecided FC strong result) -->
        <div class="bento-card !p-0 overflow-hidden border-zinc-900 ring-1 ring-red-600/30">
      <div class="bg-zinc-900/40 p-5 border-b border-white/10 flex justify-between">
        <h4 class="font-heading text-sm uppercase tracking-widest text-red-400">GROUP B</h4>
        <span class="text-[10px] font-mono text-zinc-500">After Matchday 1</span>
      </div>
      <div class="p-6 overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[450px]">
              <thead class="bg-zinc-900/80 border-b border-white/10">
      <tr>
              <th class="p-3 font-heading text-[8px] text-zinc-500 uppercase">Pos</th>
              <th class="p-3 font-heading text-[8px] text-zinc-500 uppercase">Team</th>
              <th class="p-3 font-mono text-[8px] text-center">P</th>
              <th class="p-3 font-mono text-[8px] text-center">W</th>
              <th class="p-3 font-mono text-[8px] text-center">D</th>
              <th class="p-3 font-mono text-[8px] text-center">L</th>
              <th class="p-3 font-mono text-[8px] text-center">GD</th>
              <th class="p-3 font-heading text-red-600 text-right">Pts</th>
            </tr>
          </thead>
                <tbody class="divide-y divide-white/10 text-sm">
                  <tr class="hover:bg-white/5">
                    <td class="p-3 font-mono text-emerald-400 font-bold">1</td>
                    <td class="p-3 font-heading uppercase text-emerald-400">Undecided FC</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center text-green-400">+9</td>
                    <td class="p-3 text-right font-bold text-red-600">3</td>
                  </tr>
                  <tr class="hover:bg-white/5 opacity-75">
                    <td class="p-3 font-mono text-zinc-400">2</td>
                    <td class="p-3 font-heading uppercase">Big Pams FC</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-right font-bold text-zinc-500">0</td>
                  </tr>
                  <tr class="hover:bg-white/5 opacity-75">
                    <td class="p-3 font-mono text-zinc-400">3</td>
                    <td class="p-3 font-heading uppercase">Hassan FC</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-right font-bold text-zinc-500">0</td>
                  </tr>
                  <tr class="hover:bg-white/5">
                    <td class="p-3 font-mono text-red-400">4</td>
                    <td class="p-3 font-heading uppercase">Gabi FC</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">0</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-center text-red-400">-9</td>
                    <td class="p-3 text-right font-bold text-red-600">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12 py-6 bg-black/30 border border-red-600/10 rounded-2xl">
        <p class="font-mono text-[10px] text-zinc-400">Fixtures + Manual Standings • Real-time sync available from admin console</p>
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
            <span id="match-status" class="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em]">Initialising Link...</span>
          </div>
          <h2 class="font-heading text-4xl md:text-6xl text-zinc-300 italic uppercase tracking-tighter mt-4">Live Match Node</h2>
        </div>
        <div class="bento-card bg-black/40 border-white/5 p-12 relative group">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="flex-1 text-center md:text-right">
              <h3 class="font-heading text-3xl md:text-5xl text-zinc-200 uppercase italic">Big Pams FC</h3>
            </div>
            <div class="flex flex-col items-center px-10 border-x border-zinc-800/50">
              <div id="match-timer" class="font-heading text-5xl text-red-600 italic mb-2">00:00</div>
              <div class="font-heading text-6xl text-zinc-100 tracking-tighter"> 0 : 0 </div>
            </div>
            <div class="flex-1 text-center md:text-left">
              <h3 class="font-heading text-3xl md:text-5xl text-zinc-200 uppercase italic">Hassan  FC</h3>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 h-[2px] bg-red-600/30 w-full overflow-hidden">
            <div id="timer-progress" class="h-full bg-red-600 transition-all duration-1000" style="width: 0%"></div>
          </div>
        </div>
      </div>
    </div>`,

  'pure-stream': `
    <div class="animate-boot space-y-10 pb-28">
      <div class="bento-card border-b-2 border-red-600/30 flex justify-between items-center bg-black/60">
        <div class="flex items-center gap-4">
          <div class="relative w-4 h-4">
            <div id="stream-ping" class="absolute inset-0 bg-zinc-800 rounded-full"></div>
            <div id="stream-ping-pulse" class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30"></div>
          </div>
          <div>
            <h2 class="font-heading text-3xl italic tracking-tighter text-zinc-400 uppercase">Pure Stream v1</h2>
            <p id="stream-status-text" class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Direct Neural Feed • Initializing...</p>
          </div>
        </div>
        <div id="stream-tag" class="bg-red-600/5 px-5 py-2 border border-red-600/20">
          <span class="font-mono text-[9px] text-red-600/80 uppercase animate-pulse">STANDBY</span>
        </div>
      </div>
      <div id="stream-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
      <div id="stream-footer" class="bento-card bg-red-600/5 border-red-600/20 text-center py-8">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
          <span class="text-red-600 animate-pulse">Encryption Key:</span> Pending 3:39 PM Release<br>
          High-bandwidth links remain encrypted until scheduled activation.
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
            <h2 class="font-heading text-3xl italic tracking-tighter text-zinc-400 uppercase">Live Center</h2>
            <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] animate-pulse">Real-Time Control • Port Harcourt Node</p>
          </div>
        </div>
      </div>
      <div id="live-center-dynamic" class="grid grid-cols-1 gap-12"></div>
      <div class="bento-card border-white/5 bg-black/40 text-center p-8 mt-12">
        <p class="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-relaxed">Live center now fully synced with admin • Real-time clock & scores active</p>
      </div>
    </div>`
};

// Tab Switch Function
function switchTab(tab) {
  if (!mainContent) return;
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'translateY(15px)';
  setTimeout(() => {
    mainContent.innerHTML = views[tab] || views.home;
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';
    
    document.querySelectorAll('.nav-link, .dock-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`nav-${tab}`)?.classList.add('active');
    document.getElementById(`dock-${tab}`)?.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (tab === 'news' && newsPosts.length > 0) updateNewsTab(newsPosts);
    if (tab === 'standings') updateStandingsUI();
    if (tab === 'live-center') updateLiveMatchUI();
  }, 250);
}

// News Update
function updateNewsTab(posts) {
  if (posts.length > 0) {
    mainContent.innerHTML = `
      <div class="animate-boot space-y-10 pb-28">
        <div class="text-center mb-12">
          <h2 class="font-heading text-5xl md:text-7xl italic tracking-tighter text-red-600 uppercase">NEURAL FEED LIVE</h2>
          <p class="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.4em] mt-4">Latest tactical broadcasts • ${posts.length} posts</p>
        </div>
        ${posts.map(p => `
          <div class="bento-card overflow-hidden border border-red-600/30 bg-black/50 backdrop-blur-md mb-10">
            ${p.image ? `<div class="relative h-64 md:h-96 overflow-hidden"><img src="${p.image}" class="w-full h-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div></div>` : ''}
            <div class="p-6 md:p-10">
              <div class="flex justify-between items-center mb-5">
                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">${p.date || 'Just now'}</span>
                <span class="px-4 py-1 bg-red-600/20 text-red-400 text-[9px] rounded-full">LIVE</span>
              </div>
              <div class="text-zinc-200 text-base leading-relaxed">${p.text || '[Visual transmission only]'}</div>
            </div>
          </div>`).join('')}
      </div>`;
  } else {
    mainContent.innerHTML = views.news;
  }
}

// Standings & Live Updates
function updateStandingsUI() {
  const ga = document.getElementById('group-a-standings');
  const gb = document.getElementById('group-b-standings');
  if (!ga || !gb) return;
  db.ref('standings').once('value').then(snap => {
    const data = snap.val() || {};
    ga.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], data);
    gb.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], data);
  });
}

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

// Real-time Firebase Listeners
if (typeof db !== 'undefined') {
  db.ref('news_feed').orderByChild('timestamp').limitToLast(15).on('value', snapshot => {
    newsPosts = snapshot.val() ? Object.values(snapshot.val()) : [];
    newsPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    if (document.querySelector('#nav-news.active, #dock-news.active')) updateNewsTab(newsPosts);
  });

  db.ref('standings').on('value', snapshot => {
    const data = snapshot.val() || {};
    const ga = document.getElementById('group-a-standings');
    const gb = document.getElementById('group-b-standings');
    if (ga) ga.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], data);
    if (gb) gb.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], data);
  });

  db.ref('live_matches/node_alpha').on('value', snapshot => {
    const data = snapshot.val() || {};
    const container = document.getElementById('live-center-dynamic');
    if (container) {
      container.innerHTML = data.home && data.away 
        ? renderLiveMatchCard(data.home, data.away, data.clock || '00:00', data.status || 'PENDING', data.homeScore || 0, data.awayScore || 0)
        : '<div class="p-12 text-center text-zinc-500">Awaiting live match data...</div>';
    }
  });
}

function updateMatchClock() {
  const timerEl = document.getElementById('match-timer');
  const statusEl = document.getElementById('match-status');
  const progressEl = document.getElementById('timer-progress');
  if (!timerEl || !statusEl || !progressEl) return;

  const now = new Date();
  
  // 1. Setup today's kickoff at 15:30 (3:30 PM)
  const startTime = new Date();
  startTime.setHours(15, 30, 0, 0);

  // 2. Midnight Reset Logic: 
  // If it's between 12:00 AM and 3:30 PM, it's "Standby" for today's game.
  // This effectively clears the "Full Time" state from yesterday.
  const diffSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  const diffMinutes = diffSeconds / 60;

  // Game hasn't started yet (or it's a new day before 3:30 PM)
  if (diffSeconds < 0) {
    statusEl.textContent = "Standby: Kick-off Pending";
    timerEl.textContent = "00:00";
    progressEl.style.width = "0%";
    return;
  }

  // Live: First Half (0 - 45 mins)
  if (diffMinutes <= 45) {
    statusEl.textContent = "Live: First Half";
    const mins = Math.floor(diffMinutes).toString().padStart(2, '0');
    const secs = (diffSeconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
    progressEl.style.width = (diffMinutes / 45 * 50) + "%";
  } 
  // Half Time (45 - 50 mins)
  else if (diffMinutes <= 55) { // Extended to 10 mins for better padding
    statusEl.textContent = "Half Time";
    timerEl.textContent = "45:00";
    progressEl.style.width = "50%";
  } 
  // Live: Second Half (Starts after 10 min break, ends at 90+5)
  else if (diffMinutes <= 100) {
    statusEl.textContent = "Live: Second Half";
    // Subtract the 10 minute break to show match clock (45:00+)
    const matchSeconds = diffSeconds - 600; 
    const mins = Math.floor(matchSeconds / 60).toString().padStart(2, '0');
    const secs = (matchSeconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
    progressEl.style.width = (50 + ((diffMinutes - 55) / 45 * 50)) + "%";
  } 
  // Full Time (Until Midnight)
  else {
    statusEl.textContent = "Full Time";
    timerEl.textContent = "90:00";
    progressEl.style.width = "100%";
  }
}

// Run every second
setInterval(updateMatchClock, 1000);
// Initial call to avoid 1s delay
updateMatchClock();

// Pure Stream Handler (stable, no flicker)
(function() {
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

    if (!grid) return;

    const now = new Date();
    const activationTime = new Date('2026-03-30T15:39:00');

    if (now >= activationTime) {
      if (isAlreadyLive) return;
      isAlreadyLive = true;

      if (statusText) {
        statusText.textContent = "Direct Neural Feed • Nodes Active";
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
            <iframe src="${url}" class="w-full h-full border-0" allow="autoplay; fullscreen" loading="lazy"></iframe>
          </div>
          <a href="${url}" target="_blank" class="block w-full py-4 bg-red-600/10 border border-red-600/20 font-heading text-[9px] tracking-[0.3em] text-red-500 text-center hover:bg-red-600 hover:text-white transition-all uppercase">
            LINK SCREEN 0${i+1} [DECRYPTED]
          </a>
        </div>`).join('');
    } else {
      grid.innerHTML = [1,2,3].map(n => `
        <div class="space-y-4 opacity-75">
          <div class="relative aspect-video bg-zinc-950 border border-white/5 flex items-center justify-center">
            <div class="text-center px-6">
              <div class="w-10 h-10 border-2 border-zinc-800 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
              <span class="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">Awaiting Signal 0${n}...</span>
            </div>
          </div>
          <button class="w-full py-4 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-600 cursor-not-allowed uppercase">
            LINK SCREEN 0${n} <span class="text-red-600/50">[LOCKED]</span>
          </button>
        </div>`).join('');
    }
  }

  setInterval(updateStreams, 10000);
  updateStreams();
})();

// Push Notifications
async function subscribeToPush() {
  console.log("%cPush subscription initialized", "color:#e11d48");
}

// Initialize
window.onload = () => {
  switchTab('home');
  subscribeToPush();
  setInterval(updateMatchClock, 1000);
  updateMatchClock();

  console.log('%c🚀 MIKOKO NEURAL_DASH_2040 – Fully Complete & Updated', 'color:#e11d48; font-size:14px; font-weight:bold');
};


function updateArenaState() {
  const stateEl = document.getElementById('arena-state-text');
  if (!stateEl) return;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Convert current time to total minutes for easy comparison
  // 3:30 PM is 15:30 (15 * 60 + 30 = 930 minutes)
  // 6:00 PM is 18:00 (18 * 60 = 1080 minutes)
  const currentTotalMinutes = (hours * 60) + minutes;
  const startTimeMinutes = (15 * 60) + 30; // 15:30
  const endTimeMinutes = (18 * 60) + 0;   // 18:00

  if (currentTotalMinutes >= startTimeMinutes && currentTotalMinutes < endTimeMinutes) {
    // MATCH ONGOING STATE
    stateEl.textContent = "MATCH ONGOING...";
    stateEl.classList.remove('text-zinc-500');
    stateEl.classList.add('text-red-500');
  } else {
    // WAITING STATE
    stateEl.textContent = "Waiting...";
    stateEl.classList.remove('text-red-500');
    stateEl.classList.add('text-zinc-500');
  }
}

// Add this to your existing interval
setInterval(() => {
  updateMatchClock();
  updateArenaState();
}, 1000);

// Run immediately on load
updateArenaState();
