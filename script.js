/**
 * MIKOKO // NEURAL_DASH_2040
 * FULL_CORE_ENGINE_RESTORATION_V2
 */

const mainContent = document.getElementById('main-content');

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
                    <p class="font-heading text-[9px] tracking-widest uppercase">GABI FC</p>
                </div>
                <div class="text-center z-10">
                    <span class="text-red-600 font-mono text-[10px] tracking-[0.4em] block mb-2">PENDING</span>
                    <div class="waveform justify-center"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>
                </div>
                <div class="text-center z-10">
                    <div class="w-16 h-16 bg-zinc-900 rounded-full mb-3 border border-red-600/20 mx-auto"></div>
                    <p class="font-heading text-[9px] tracking-widest uppercase">HASSAN FC</p>
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
                <span class="font-heading text-6xl italic">DEPO</span>
            </div>
            <div class="relative z-10">
                <h2 class="font-heading text-4xl italic tracking-tighter text-white uppercase">Group_Stage</h2>
                <p class="text-[9px] font-mono text-red-600 uppercase tracking-[0.4em]">Arena_Deploys // Phase_01</p>
            </div>
        </div>
        
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900">
                <div class="bg-zinc-900/30 p-4 border-b border-white/5">
                    <h3 class="font-heading text-sm italic text-red-600 tracking-widest uppercase">GROUP_A_NODE</h3>
                </div>
                ${renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'])}
            </div>
            
            <div class="space-y-4 bento-card !p-0 overflow-hidden border-zinc-900">
                <div class="bg-zinc-900/30 p-4 border-b border-white/5">
                    <h3 class="font-heading text-sm italic text-red-600 tracking-widest uppercase">GROUP_B_NODE</h3>
                </div>
                ${renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'])}
            </div>
        </div>
    </div>`,





    
    news: `
    <div class="animate-boot space-y-10 pb-28">
        <div class="relative group rounded-3xl overflow-hidden border border-red-600/20 h-[500px]">
            <div class="absolute inset-0 bg-[url('OGB.jpeg')] bg-cover bg-center grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div class="absolute top-8 right-8">
                <span class="px-4 py-2 bg-red-600 text-[10px] font-heading tracking-[0.4em] uppercase animate-pulse">Match_01_Live</span>
            </div>
            <div class="absolute bottom-0 p-8 md:p-12 w-full backdrop-blur-sm bg-black/40">
                <h2 class="text-5xl md:text-7xl font-heading italic tracking-tighter text-white uppercase leading-[0.8] mb-4">
                    ZUBBY FC <span class="text-red-600">VS</span> GUNNERS FC
                </h2>
                <p class="text-zinc-300 font-mono text-xs max-w-xl leading-relaxed uppercase tracking-widest italic">
                    The Arena is primed. Zubby FC's "One Guy" node has established contact. Gunners FC responding with high-frequency defensive drills. Kick-off sequence initiated.
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bento-card group overflow-hidden relative h-64 flex items-end">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
                <div class="relative z-10 p-6">
                    <span class="text-red-600 font-mono text-[10px] uppercase mb-2 block tracking-widest">Up_Next // M_02</span>
                    <h3 class="font-heading text-2xl italic uppercase">JED FC <span class="text-zinc-500 text-sm">VS</span> OGBAFIA FC</h3>
                </div>
            </div>
            
            <div class="bento-card !bg-zinc-950/50 border-zinc-900 h-64 overflow-y-auto roster-scroll p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-heading text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Live_Tactical_Stream</h3>
                    <div class="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                </div>
                <div class="space-y-3">
                    <p class="text-[9px] font-mono text-zinc-500 uppercase"><span class="text-red-600">[SYNC]</span> Zubby FC node strength: 100%</p>
                    <p class="text-[9px] font-mono text-zinc-500 uppercase"><span class="text-red-600">[SYNC]</span> Gunners FC node strength: 98%</p>
                    <p class="text-[9px] font-mono text-zinc-500 uppercase"><span class="text-zinc-600">[WAIT]</span> Jed FC vs Ogbafia FC: Buffering...</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
                <h3 class="font-heading text-xs tracking-[0.4em] text-white uppercase italic px-2">Group_A_Visual_Data</h3>
                <div class="bento-card !p-0 overflow-hidden border-zinc-800">
                    <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200" class="w-full h-72 object-cover opacity-80 hover:opacity-100 transition-opacity">
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="font-heading text-xs tracking-[0.4em] text-white uppercase italic px-2">Group_B_Visual_Data</h3>
                <div class="bento-card !p-0 overflow-hidden border-zinc-800">
                    <img src="BIG .jpeg" class="w-full h-72 object-cover opacity-80 hover:opacity-100 transition-opacity">
                </div>
            </div>
        </div>
    </div>`,
leaderboard: `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-red-600">
        <div class="flex items-center gap-6">
            <div class="nexus-core scale-75 md:scale-100"><div class="nexus-inner"></div><div class="nexus-orbit"></div></div>
            <div>
                <h2 class="font-heading text-3xl md:text-5xl text-white italic uppercase tracking-tighter">LEADER_BOARDS</h2>
                <p class="font-mono text-[9px] tracking-[0.3em] text-red-600 uppercase">Neural_Performance_Metrics // S26</p>
            </div>
        </div>
        
        <div class="flex bg-zinc-900/50 p-1 rounded-full border border-white/5">
            <button onclick="document.getElementById('goals-sector').scrollIntoView({behavior:'smooth'})" class="px-6 py-2 font-heading text-[8px] tracking-widest text-zinc-500 hover:text-white transition">GOALS</button>
            <button onclick="document.getElementById('assists-sector').scrollIntoView({behavior:'smooth'})" class="px-6 py-2 font-heading text-[8px] tracking-widest text-zinc-500 hover:text-white transition">ASSISTS</button>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div id="goals-sector" class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <h3 class="font-heading text-lg italic text-white uppercase"><span class="text-red-600">01.</span> GOAL_STRIKERS</h3>
                <span class="text-[8px] font-mono text-zinc-600 uppercase animate-pulse">Syncing_Nodes...</span>
            </div>
            
            <div class="space-y-3">
                ${renderNilTopPlayers('GOALS')}
            </div>

            <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/20">
                <div class="max-h-[400px] overflow-y-auto roster-scroll p-4 space-y-2">
                    ${renderNilExtendedList('G')}
                </div>
            </div>
        </div>

        <div id="assists-sector" class="space-y-6">
            <div class="flex items-center justify-between px-2">
                <h3 class="font-heading text-lg italic text-white uppercase"><span class="text-red-600">02.</span> TACTICAL_ASSISTS</h3>
                <span class="text-[8px] font-mono text-zinc-600 uppercase animate-pulse">Syncing_Nodes...</span>
            </div>

            <div class="space-y-3">
                ${renderNilTopPlayers('ASSISTS')}
            </div>

            <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-black/20">
                <div class="max-h-[400px] overflow-y-auto roster-scroll p-4 space-y-2">
                    ${renderNilExtendedList('A')}
                </div>
            </div>
        </div>

    </div>
</div>`,

   fixtures: `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600 flex justify-between items-center">
        <div>
            <h2 class="font-heading text-4xl italic tracking-tighter text-white uppercase">Match_Fixtures</h2>
            <p class="text-[9px] font-mono text-red-600 uppercase tracking-[0.4em]">Chronological_Deployment // Season_26</p>
        </div>
        <div class="hidden md:block text-right">
            <span class="font-mono text-[10px] text-zinc-600 uppercase block">System_Time</span>
            <span class="font-heading text-xl text-white italic" id="fixture-clock">00:00</span>
        </div>
    </div>

    <div class="space-y-12">
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-800"></div>
                <h3 class="font-heading text-xs tracking-[0.3em] text-zinc-500 uppercase">Match_Day_01</h3>
                <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-800"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${renderMatchCard('ZUBBY FC', 'GUNNERS FC', '16:00', 'MAR NIL', 'ARENA_01')}
                ${renderMatchCard('JED FC', 'OGBAFIA FC', '17:00', 'MAR NIL', 'ARENA_01')}
            </div>
        </div>

        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-zinc-800"></div>
                <h3 class="font-heading text-xs tracking-[0.3em] text-zinc-500 uppercase">Match_Day_02</h3>
                <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-zinc-800"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${renderMatchCard('BIG PAMS FC', 'ANTHONY FC', '16:00', 'MAR NIL', 'ARENA_02')}
                ${renderMatchCard('UNDECIDED FC', 'HASSAN FC', '17:00', 'MAR NIL', 'ARENA_02')}
            </div>
        </div>
    </div>
</div>`,

    
   'live-games': `
<div class="animate-boot flex flex-col items-center justify-center py-24 min-h-[60vh] relative overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div class="w-[300px] h-[300px] border border-red-600 rounded-full animate-ping"></div>
        <div class="absolute w-[500px] h-[500px] border border-zinc-800 rounded-full"></div>
    </div>

    <div class="relative mb-10">
        <div class="w-16 h-16 border-2 border-red-600/20 rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_20px_#ff0033]"></div>
        </div>
        <div class="absolute inset-0 border-t-2 border-red-600 rounded-full animate-[spin_3s_linear_infinite] opacity-40"></div>
    </div>

    <div class="text-center z-10 space-y-4">
        <h2 class="font-heading text-3xl md:text-5xl text-white italic uppercase tracking-tighter">SIGNAL_SEARCH</h2>
        
        <div class="flex flex-col items-center gap-2">
            <p class="font-mono text-[10px] tracking-[0.4em] text-red-600 uppercase">Status: Scanning_Arena_Matches...</p>
            <div class="flex gap-1">
                <span class="w-1 h-1 bg-zinc-800 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span class="w-1 h-1 bg-zinc-800 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span class="w-1 h-1 bg-zinc-800 rounded-full animate-bounce"></span>
            </div>
        </div>

        <div class="bento-card bg-black/40 border-white/5 mt-10 py-3 px-8">
            <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                No active matches detected in the <span class="text-white">Mikoko_Unified_Grid</span>. <br>
                Next deployment scheduled for <span class="text-red-600">MAR 20 // 16:00</span>.
            </p>
        </div>
    </div>

    <div class="mt-12 opacity-20 font-mono text-[8px] text-zinc-600 uppercase flex gap-8">
        <span>🛰️ Satellite: Stable</span>
        <span>📡 Latency: 0.04ms</span>
        <span>🔒 Secure: Enabled</span>
    </div>
</div>`,

    
    'pure-stream': `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600 flex justify-between items-center bg-black/60">
        <div class="flex items-center gap-4">
            <div class="relative w-3 h-3">
                <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20"></div>
                <div class="absolute inset-0 bg-zinc-800 rounded-full"></div>
            </div>
            <div>
                <h2 class="font-heading text-3xl italic tracking-tighter text-white uppercase">Pure_Stream_v1</h2>
                <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Direct_Neural_Feed // 3_Active_Nodes</p>
            </div>
        </div>
        <div class="bg-red-600/10 px-4 py-1 border border-red-600/20">
            <span class="font-mono text-[9px] text-red-600 uppercase animate-pulse">Standby_Mode</span>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="space-y-4">
            <div class="relative aspect-video bg-zinc-950 border border-white/5 overflow-hidden group">
                <div class="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-40">
                    <svg class="w-8 h-8 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span class="font-mono text-[8px] text-zinc-700 uppercase tracking-widest">FEED_SIGNAL_LOST</span>
                </div>
                <div class="absolute w-full h-[1px] bg-red-600/30 top-0 animate-[scan_4s_linear_infinite]"></div>
            </div>
            <button onclick="triggerAlert('STREAM_RESTRICTED', 'Access Denied. Feed 01 will activate 15 minutes prior to Kickoff.')" 
                class="w-full py-3 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-500 hover:border-red-600/50 hover:text-white transition group">
                LINK_SCREEN_01 <span class="text-red-600 opacity-50 group-hover:opacity-100">[LOCKED]</span>
            </button>
        </div>

        <div class="space-y-4">
            <div class="relative aspect-video bg-zinc-950 border border-white/5 overflow-hidden">
                <div class="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-40">
                    <svg class="w-8 h-8 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span class="font-mono text-[8px] text-zinc-700 uppercase tracking-widest">FEED_SIGNAL_LOST</span>
                </div>
                <div class="absolute w-full h-[1px] bg-red-600/30 top-1/2 animate-[scan_4s_linear_infinite_reverse]"></div>
            </div>
            <button onclick="triggerAlert('STREAM_RESTRICTED', 'Access Denied. Feed 02 is currently encrypted. Check Match Day Schedule.')" 
                class="w-full py-3 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-500 hover:border-red-600/50 hover:text-white transition group">
                LINK_SCREEN_02 <span class="text-red-600 opacity-50 group-hover:opacity-100">[LOCKED]</span>
            </button>
        </div>

        <div class="space-y-4">
            <div class="relative aspect-video bg-zinc-950 border border-white/5 overflow-hidden">
                <div class="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-40">
                    <svg class="w-8 h-8 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span class="font-mono text-[8px] text-zinc-700 uppercase tracking-widest">FEED_SIGNAL_LOST</span>
                </div>
                <div class="absolute w-full h-[1px] bg-red-600/30 bottom-0 animate-[scan_6s_linear_infinite]"></div>
            </div>
            <button onclick="triggerAlert('STREAM_RESTRICTED', 'Access Denied. Feed 03 is offline. Satellite link required during live events.')" 
                class="w-full py-3 bg-white/5 border border-white/10 font-heading text-[9px] tracking-[0.3em] text-zinc-500 hover:border-red-600/50 hover:text-white transition group">
                LINK_SCREEN_03 <span class="text-red-600 opacity-50 group-hover:opacity-100">[LOCKED]</span>
            </button>
        </div>

    </div>

    <div class="bento-card bg-red-600/5 border-red-600/20 text-center py-6">
        <p class="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            <span class="text-red-600">Note:</span> Pure Stream nodes are high-bandwidth encrypted lines. <br class="hidden md:block">
            Links only become functional 15-30 minutes before official match deployments.
        </p>
    </div>
</div>`,

    
   'live-center': `
<div class="animate-boot space-y-10 pb-28">
    <div class="bento-card border-b-2 border-red-600 flex justify-between items-center bg-black/60">
        <div class="flex items-center gap-4">
            <div class="relative w-3 h-3">
                <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30"></div>
                <div class="absolute inset-0 bg-red-600 rounded-full"></div>
            </div>
            <div>
                <h2 class="font-heading text-3xl italic tracking-tighter text-white uppercase">Live_Center</h2>
                <p class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em]">Real_Time_Match_Control // Port_Harcourt_Node</p>
            </div>
        </div>
        <div class="text-right hidden sm:block">
            <span class="font-mono text-[8px] text-zinc-600 uppercase block">Encryption_Active</span>
            <span class="font-mono text-[10px] text-red-600 uppercase">Secure_Admin_Link</span>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-12">
        
        <div class="space-y-4">
            <div class="flex items-center justify-between px-2">
                <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase italic">NODE_ALPHA // PITCH_01</span>
                <span class="px-3 py-1 bg-red-600/10 border border-red-600/30 text-red-600 font-mono text-[9px] uppercase animate-pulse">Waiting_For_Official</span>
            </div>
            
            ${renderLiveMatchCard('TEAM_A', 'TEAM_B', '00:00', 'PENDING')}
        </div>

        <div class="space-y-4">
            <div class="flex items-center justify-between px-2">
                <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase italic">NODE_BETA // PITCH_02</span>
                <span class="px-3 py-1 bg-zinc-900 border border-white/5 text-zinc-600 font-mono text-[9px] uppercase">Standby_Mode</span>
            </div>
            
            ${renderLiveMatchCard('TEAM_C', 'TEAM_D', '00:00', 'PENDING')}
        </div>

    </div>

    <div class="bento-card border-white/5 bg-white/[0.02] text-center p-6 mt-10">
        <p class="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.3em]">
            Official match data is pushed directly from the <span class="text-red-600 font-bold">Tech_Nxxt Admin Panel</span>. <br>
            Time, Events, and Discipline records are updated in sub-10ms intervals.
        </p>
    </div>
</div>`,

    
};

// --- CORE FUNCTIONS ---

function switchTab(tab) {
    const el = document.getElementById('main-content');
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
        el.innerHTML = views[tab] || views['home'];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        
        document.querySelectorAll('.nav-link, .dock-btn').forEach(btn => btn.classList.remove('active'));
        const navBtn = document.getElementById(`nav-${tab}`);
        const dockBtn = document.getElementById(`dock-${tab}`);
        if(navBtn) navBtn.classList.add('active');
        if(dockBtn) dockBtn.classList.add('active');
        
        window.scrollTo(0, 0);
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




//////// for the Standing 
function renderGroupTable(teams, groupData = {}) {
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
                        // Normalize team name to match Firebase keys (e.g., "GUNNERS FC" -> "gunners")
                        const teamKey = team.split(' ')[0].toLowerCase();
                        const s = groupData[teamKey] || { mp:0, w:0, d:0, l:0, gf:0, ga:0 };
                        
                        // Tactical Calculations
                        const gd = s.gf - s.ga;
                        const points = (s.w * 3) + (s.d * 1);

                        return `
                            <tr class="group hover:bg-white/[0.02] transition-colors">
                                <td class="p-2 font-mono text-[10px] text-zinc-600">${i + 1}</td>
                                <td class="p-2 font-heading text-[9px] uppercase italic tracking-tighter text-zinc-300 group-hover:text-white">${team}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.mp}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.w}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.d}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.l}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.gf}</td>
                                <td class="p-2 font-mono text-[10px] text-center text-zinc-500">${s.ga}</td>
                                <td class="p-2 font-mono text-[10px] text-center ${gd > 0 ? 'text-green-500' : gd < 0 ? 'text-red-500' : 'text-zinc-400'}">${gd > 0 ? '+' + gd : gd}</td>
                                <td class="p-2 font-heading text-[10px] text-right italic text-red-600 font-bold">${points}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>`;
}

db.ref('standings').on('value', (snapshot) => {
    const allStats = snapshot.val() || {};
    
    // Update Group A Container
    const groupAContainer = document.querySelector('#group-a-node-container'); // Add this ID to your HTML
    if (groupAContainer) {
        groupAContainer.innerHTML = renderGroupTable(['GUNNERS FC', 'JED FC', 'OGBAFIA FC', 'ZUBBY FC'], allStats);
    }

    // Update Group B Container
    const groupBContainer = document.querySelector('#group-b-node-container'); // Add this ID to your HTML
    if (groupBContainer) {
        groupBContainer.innerHTML = renderGroupTable(['BIG PAMS FC', 'HASSAN FC', 'UNDECIDED FC', 'GABI FC'], allStats);
    }
});




setInterval(() => {
    const timer = document.getElementById('live-timer');
    if (timer) timer.innerText = new Date().toLocaleTimeString('en-GB');
}, 1000);

window.onload = () => switchTab('home');
function renderNilTopPlayers(unit) {
    let placeholders = '';
    for (let i = 1; i <= 5; i++) {
        placeholders += `
            <div class="flex items-center justify-between p-4 bg-white/[0.01] border-l-2 border-zinc-900 hover:border-red-600/30 transition-all group">
                <div class="flex items-center gap-4">
                    <span class="font-mono text-[10px] text-zinc-700">0${i}</span>
                    <div class="w-10 h-10 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center overflow-hidden grayscale opacity-50">
                        <div class="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-950"></div>
                    </div>
                    <div>
                        <span class="font-heading text-[10px] text-zinc-500 tracking-widest uppercase">NODE_NIL</span>
                        <p class="text-[7px] font-mono text-zinc-700 uppercase">Waiting_for_deployment</p>
                    </div>
                </div>
                <div class="text-right opacity-30">
                    <span class="font-heading text-lg italic text-zinc-500">00</span>
                    <span class="text-[7px] font-mono text-zinc-600 block uppercase">${unit}</span>
                </div>
            </div>
        `;
    }
    return placeholders;
}

function renderNilExtendedList(suffix) {
    let list = '';
    for (let i = 6; i <= 50; i++) {
        list += `
            <div class="flex items-center justify-between py-2 border-b border-white/5 opacity-40">
                <div class="flex items-center gap-3">
                    <span class="font-mono text-[8px] text-zinc-800">${i.toString().padStart(2, '0')}</span>
                    <div class="w-4 h-4 rounded-sm bg-zinc-900"></div>
                    <span class="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter italic">UNDEFINED_PLAYER</span>
                </div>
                <span class="font-mono text-[9px] text-zinc-800">0 ${suffix}</span>
            </div>
        `;
    }
    return list;
}
function renderMatchCard(home, away, time, date, venue) {
    return `
        <div class="bento-card !p-0 group border-zinc-900 hover:border-red-600/50 transition-all duration-500">
            <div class="flex items-center justify-between p-6">
                <div class="flex-1 text-center">
                    <div class="w-12 h-12 bg-zinc-900 border border-white/5 mx-auto mb-3 rotate-45 flex items-center justify-center group-hover:border-red-600/50 transition-colors">
                        <span class="rotate-[-45deg] font-heading text-xs text-red-600">${home.charAt(0)}</span>
                    </div>
                    <span class="font-heading text-[10px] text-white tracking-tighter uppercase italic">${home}</span>
                </div>

                <div class="px-4 text-center">
                    <div class="font-mono text-[10px] text-red-600 font-bold mb-1">${time}</div>
                    <div class="w-[1px] h-8 bg-zinc-800 mx-auto mb-1"></div>
                    <div class="font-mono text-[8px] text-zinc-600 uppercase">${date}</div>
                </div>

                <div class="flex-1 text-center">
                    <div class="w-12 h-12 bg-zinc-900 border border-white/5 mx-auto mb-3 rotate-45 flex items-center justify-center group-hover:border-red-600/50 transition-colors">
                        <span class="rotate-[-45deg] font-heading text-xs text-red-600">${away.charAt(0)}</span>
                    </div>
                    <span class="font-heading text-[10px] text-white tracking-tighter uppercase italic">${away}</span>
                </div>
            </div>
            
            <div class="bg-black/40 py-2 px-4 border-t border-white/5 flex justify-between items-center">
                <span class="text-[7px] font-mono text-zinc-500 tracking-[0.2em] uppercase">${venue}</span>
                <button class="text-[7px] font-heading text-zinc-400 hover:text-red-600 tracking-widest uppercase transition">Set_Reminder +</button>
            </div>
        </div>
    `;
}

function renderLiveMatchCard(home, away, clock, status, homeScore = 0, awayScore = 0) {
    return `
    <div class="bento-card !p-0 overflow-hidden border-zinc-900 bg-zinc-950/50 backdrop-blur-xl">
        <div class="p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-red-600/5 to-transparent">
            <div class="absolute top-4 font-mono text-[9px] text-red-600 tracking-[0.5em] uppercase animate-pulse">${status}</div>
            
            <div class="flex items-center justify-between w-full max-w-3xl gap-4">
                <div class="flex-1 text-right">
                    <h3 class="font-heading text-xl md:text-4xl text-white italic tracking-tighter uppercase leading-none">${home}</h3>
                    <div class="flex justify-end gap-1 mt-2">
                        <div class="w-2 h-3 bg-yellow-500 rounded-sm opacity-20"></div> <div class="w-2 h-3 bg-red-600 rounded-sm opacity-20"></div>
                    </div>
                </div>

                <div class="flex flex-col items-center min-w-[120px]">
                    <div class="font-heading text-6xl md:text-8xl text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        ${homeScore}:${awayScore}
                    </div>
                    <div class="mt-2 px-6 py-1 bg-red-600 font-mono text-xs text-white font-bold skew-x-[-12deg] shadow-[4px_4px_0px_#4a0000]">
                        ${clock}
                    </div>
                </div>

                <div class="flex-1 text-left">
                    <h3 class="font-heading text-xl md:text-4xl text-white italic tracking-tighter uppercase leading-none">${away}</h3>
                    <div class="flex justify-start gap-1 mt-2">
                        <div class="w-2 h-3 bg-yellow-500 rounded-sm opacity-20"></div>
                        <div class="w-2 h-3 bg-red-600 rounded-sm opacity-20"></div>
                    </div>
                </div>
            </div>
        </div>

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

        <div class="bg-zinc-900/80 py-2 px-4 border-t border-white/5 flex justify-between items-center">
            <div class="flex items-center gap-4">
                <span class="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Official: <span class="text-zinc-400 font-bold">UNASSIGNED</span></span>
                <span class="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">Sync: <span class="text-green-500 font-bold">99%</span></span>
            </div>
            <div class="text-[7px] font-heading text-red-600/50 uppercase tracking-tighter">Correction_Protocol_Active</div>
        </div>
    </div>`;
}
