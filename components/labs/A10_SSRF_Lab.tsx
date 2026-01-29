
import React, { useState, useEffect, useRef } from 'react';
import { Vulnerability } from '../../types';

interface InternalService {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: 'ONLINE' | 'RESTRICTED' | 'DISCOVERED';
  description: string;
  secretData?: string;
}

export const A10_SSRF_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [discoveredServices, setDiscoveredServices] = useState<InternalService[]>([]);
  const [activeResponse, setActiveResponse] = useState<{title: string, content: string, type: 'public' | 'internal' | 'error'} | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[SYS] SSRF Shield: Monitoring established...', '[SYS] Proxy Agent: Ready for request routing.']);
  
  const internalServices: Record<string, InternalService> = {
    'localhost': { id: 's1', name: 'Admin Control Panel', ip: '127.0.0.1', port: 8080, status: 'RESTRICTED', description: 'Internal dashboard for site administrators.', secretData: 'CREDENTIALS_EXPOSED: admin / P@ssw0rd9921' },
    '127.0.0.1': { id: 's1', name: 'Admin Control Panel', ip: '127.0.0.1', port: 8080, status: 'RESTRICTED', description: 'Internal dashboard for site administrators.', secretData: 'CREDENTIALS_EXPOSED: admin / P@ssw0rd9921' },
    '169.254.169.254': { id: 's2', name: 'Cloud Metadata Service', ip: '169.254.169.254', port: 80, status: 'RESTRICTED', description: 'AWS/GCP instance metadata endpoint.', secretData: 'IAM_ROLE_KEYS: AKIA_EXAMPLE_KEY_TEMP_882' },
    'database.internal': { id: 's3', name: 'Main DB Cluster', ip: '10.0.0.5', port: 5432, status: 'RESTRICTED', description: 'Production database instance.', secretData: 'DB_STR: postgresql://root:internal_only@10.0.0.5:5432' }
  };

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-6));
  };

  const handleExecuteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    setIsProcessing(true);
    setActiveResponse(null);
    addLog(`INIT: Fetching resource from "${urlInput}"...`);

    setTimeout(() => {
      setIsProcessing(false);
      const input = urlInput.toLowerCase().trim();
      
      // Checking for Internal Hits
      let matchedService: InternalService | null = null;
      for (const key in internalServices) {
        if (input.includes(key)) {
          matchedService = internalServices[key];
          break;
        }
      }

      if (matchedService) {
        addLog(`ALERT: Internal IP detected! Trust boundary bypassed.`);
        addLog(`FETCH_SUCCESS: Resource extracted from ${matchedService.ip}`);
        
        setActiveResponse({
          title: `Internal Discovery: ${matchedService.name}`,
          content: matchedService.secretData || '',
          type: 'internal'
        });

        if (!discoveredServices.find(s => s.id === matchedService?.id)) {
          setDiscoveredServices(prev => [...prev, {...matchedService!, status: 'DISCOVERED'}]);
        }
      } else {
        addLog(`FETCH_SUCCESS: External resource loaded.`);
        setActiveResponse({
          title: "Public Asset Loaded",
          content: "This is a public resource fetched by the server. No internal boundaries were crossed.",
          type: 'public'
        });
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-[900px] bg-[#05050a] rounded-[4rem] border-[6px] border-white/5 overflow-hidden font-sans text-right transition-all duration-1000 shadow-[0_0_100px_rgba(0,0,0,1)]" dir="rtl">
      
      {/* 🌌 Cinematic Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.03),transparent)]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      {/* 📡 Top HUD Nav */}
      <header className="relative z-30 h-24 bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-12">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <h2 className="text-xl font-black italic text-cyan-400 tracking-tighter font-display">SSRF_EXPLOIT_CONDUIT_v9</h2>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Boundary Integrity: <span className="text-red-500">COMPROMISED</span></span>
           <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
             <span className="material-symbols-outlined text-cyan-400">leak_add</span>
           </div>
        </div>
      </header>

      <div className="relative z-20 flex flex-col xl:flex-row h-[calc(900px-96px)]">
        
        {/* 🛠️ Workstation Area (Left/Main) */}
        <main className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto">
          
          <div className="text-right space-y-2">
            <h1 className="text-4xl font-black text-white italic">أداة جلب الأصول السحابية</h1>
            <p className="text-gray-400 font-medium">أدخل الرابط الخارجي (URL) وسيقوم خادمنا بجلب البيانات لك فوراً.</p>
          </div>

          {/* Request Console */}
          <div className="bg-white/[0.02] border-2 border-white/5 rounded-[3rem] p-10 space-y-8 shadow-inner relative group">
            <div className="absolute -top-4 right-10 bg-cyan-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">The Attack Vector</div>
            
            <form onSubmit={handleExecuteRequest} className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Input Stream</span>
                  <span className="text-[10px] font-mono text-cyan-500/60">Target URL or IP</span>
                </div>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://google.com/icon.png"
                    className="w-full bg-black/60 border-2 border-white/10 rounded-3xl py-6 px-10 text-cyan-400 font-mono text-center text-xl outline-none focus:border-cyan-500/50 focus:ring-8 focus:ring-cyan-500/5 transition-all shadow-2xl"
                    dir="ltr"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-cyan-500 text-3xl">language</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing || !urlInput}
                className={`w-full py-6 rounded-[2rem] font-black text-lg uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-6 shadow-2xl
                  ${isProcessing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-cyan-500/20 active:scale-95'}
                `}
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Execute Request</span>
                    <span className="material-symbols-outlined font-black">rocket_launch</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Payloads */}
            <div className="flex flex-wrap justify-center gap-3">
               <button onClick={() => setUrlInput('https://google.com/favicon.ico')} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-gray-400 font-black hover:text-white transition-all">Normal Request</button>
               <button onClick={() => setUrlInput('http://localhost/admin/secrets')} className="px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-[10px] text-cyan-500 font-black hover:bg-cyan-500/10 transition-all italic">Internal Localhost</button>
               <button onClick={() => setUrlInput('http://169.254.169.254/latest/meta-data')} className="px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-[10px] text-cyan-500 font-black hover:bg-cyan-500/10 transition-all italic">Cloud Metadata</button>
            </div>
          </div>

          {/* Response Viewer */}
          <div className="flex-1 min-h-[300px] flex flex-col">
            <div className={`flex-1 bg-black/60 rounded-[3.5rem] border-2 transition-all duration-700 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden
              ${activeResponse ? (activeResponse.type === 'internal' ? 'border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.1)]' : 'border-white/10') : 'border-white/5 opacity-50'}
            `}>
               {!activeResponse && !isProcessing && (
                 <div className="flex flex-col items-center gap-6 opacity-30">
                    <span className="material-symbols-outlined text-8xl">sensors_off</span>
                    <span className="text-xs font-mono uppercase tracking-[0.5em]">Waiting for Request Execution</span>
                 </div>
               )}

               {isProcessing && (
                 <div className="space-y-6 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                    <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Routing through Internal Proxy...</span>
                 </div>
               )}

               {activeResponse && !isProcessing && (
                 <div className="animate-in zoom-in duration-500 w-full space-y-8">
                    <div className="flex flex-col items-center gap-4">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${activeResponse.type === 'internal' ? 'bg-cyan-500 text-black animate-bounce' : 'bg-white/10 text-white'}`}>
                          <span className="material-symbols-outlined text-4xl">{activeResponse.type === 'internal' ? 'security' : 'public'}</span>
                       </div>
                       <h3 className={`text-2xl font-black italic ${activeResponse.type === 'internal' ? 'text-cyan-400' : 'text-white'}`}>{activeResponse.title}</h3>
                    </div>
                    
                    <div className="bg-black/80 p-8 rounded-3xl border border-white/5 font-mono text-left shadow-2xl overflow-x-auto" dir="ltr">
                       <p className={`text-lg break-all leading-relaxed ${activeResponse.type === 'internal' ? 'text-cyan-300 font-black' : 'text-gray-400'}`}>
                         {activeResponse.content}
                       </p>
                    </div>

                    {activeResponse.type === 'internal' && (
                      <div className="bg-cyan-500/10 p-6 rounded-2xl border border-cyan-500/20">
                        <p className="text-cyan-400 font-bold text-sm">أحسنت! لقد نجحت في إجبار الخادم على كشف بياناته الداخلية عبر استغلال ثقة النظام في الطلبات القادمة من "نفسه".</p>
                      </div>
                    )}
                 </div>
               )}
            </div>
          </div>
        </main>

        {/* 🗺️ Infrastructure Sidebar (Right) */}
        <aside className="w-full xl:w-[450px] bg-[#08080c] border-r border-white/10 p-10 flex flex-col gap-10">
           
           <div className="space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Topology</span>
                <span className="material-symbols-outlined text-gray-700">hub</span>
             </div>

             <div className="relative h-64 bg-black rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.2),transparent)]"></div>
                
                {/* Visual Network Nodes */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                   {/* Main Server Node */}
                   <div className="absolute w-16 h-16 bg-cyan-500/20 border-2 border-cyan-500 rounded-2xl flex items-center justify-center z-20 shadow-glow">
                      <span className="material-symbols-outlined text-cyan-400 text-3xl">dns</span>
                   </div>
                   
                   {/* Hidden Nodes (Appear on discovery) */}
                   {Object.values(internalServices).map((s, i) => {
                      const isFound = discoveredServices.find(ds => ds.id === s.id);
                      const angle = (i * (360 / 3)) * (Math.PI / 180);
                      const x = Math.cos(angle) * 80;
                      const y = Math.sin(angle) * 80;

                      return (
                        <div key={i} className="absolute transition-all duration-1000" style={{ transform: `translate(${x}px, ${y}px)` }}>
                           <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-700 
                             ${isFound ? 'bg-red-500/20 border-red-500 scale-110 shadow-glow-red' : 'bg-white/5 border-white/10 opacity-20 scale-75'}`}>
                              <span className="material-symbols-outlined text-xs">{isFound ? 'shield_lock' : 'lock'}</span>
                           </div>
                           {isFound && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black text-red-400 uppercase tracking-tighter">DISCOVERED</div>}
                        </div>
                      )
                   })}

                   {/* Connection Lines */}
                   <div className="absolute w-48 h-48 border border-white/5 rounded-full border-dashed animate-spin-slow opacity-20"></div>
                </div>
             </div>
           </div>

           <div className="flex-1 flex flex-col gap-6">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Internal Service Catalog</span>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                 {discoveredServices.length === 0 ? (
                   <div className="h-full flex items-center justify-center text-gray-800 italic text-xs text-center p-10 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
                     No internal services mapped yet. Route a request to internal IPs to discover the infrastructure.
                   </div>
                 ) : (
                   discoveredServices.map(s => (
                     <div key={s.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl animate-in slide-in-from-right-4 space-y-2 group/item">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-cyan-400 font-mono tracking-widest">{s.ip}:{s.port}</span>
                           <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        </div>
                        <h4 className="text-white font-bold text-sm">{s.name}</h4>
                        <p className="text-[10px] text-gray-500 italic">{s.description}</p>
                     </div>
                   ))
                 )}
              </div>
           </div>

           {/* Log Terminal (Sidebar Bottom) */}
           <div className="h-48 bg-black/80 border border-white/5 rounded-3xl p-6 font-mono text-[10px] text-left space-y-1 overflow-hidden relative shadow-inner" dir="ltr">
              <div className="text-gray-700 uppercase mb-2 border-b border-white/5 pb-1 flex justify-between">
                <span>Request_Inspector_v1.0</span>
                <span className="animate-pulse text-cyan-500">READY</span>
              </div>
              {terminalLogs.map((log, i) => (
                <div key={i} className={`truncate ${log.includes('ALERT') || log.includes('BYPASS') ? 'text-red-400 font-bold' : log.includes('INIT') ? 'text-cyan-500' : 'text-gray-600'}`}>
                  {log}
                </div>
              ))}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
           </div>
        </aside>
      </div>

      {/* 🎯 Immersive Footer to Quiz */}
      <footer className="relative z-40 h-28 bg-[#0a0a10]/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center">
         <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-20 py-5 bg-white text-black font-black rounded-[2.5rem] hover:bg-cyan-500 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 uppercase tracking-[0.3em] text-sm"
         >
           انتقل إلى قسم الاختبار
         </button>
      </footer>

      <style>{`
        @keyframes shadow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.2); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.4); }
        }
        .shadow-glow { animation: shadow-pulse 3s infinite; }
        .shadow-glow-red { box-shadow: 0 0 30px rgba(239, 68, 68, 0.2); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};
