
import React, { useState, useEffect, useRef } from 'react';
import { Vulnerability } from '../../types';

type LabStep = 'STORE' | 'INSTALLING' | 'ACTIVE' | 'IMPACT';

interface Library {
  id: string;
  name: string;
  version: string;
  date: string;
  status: 'modern' | 'legacy';
  description: string;
  icon: string;
}

export const A06_VulnerableComponents_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [step, setStep] = useState<LabStep>('STORE');
  const [selectedLib, setSelectedLib] = useState<Library | null>(null);
  const [telemetry, setTelemetry] = useState<string[]>(['[SYS] Security Monitor: Ready', '[SYS] Scanning for active nodes...']);
  const [isExploited, setIsExploited] = useState(false);
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  const libraries: Library[] = [
    {
      id: 'lib-modern',
      name: 'SecurePDF Generator Pro',
      version: 'v4.2.0 (Latest)',
      date: 'يناير 2025',
      status: 'modern',
      description: 'مكتبة حديثة بمعايير أمان 2025. تتطلب موارد نظام عالية.',
      icon: 'picture_as_pdf'
    },
    {
      id: 'lib-legacy',
      name: 'FastPDF Legacy Lite',
      version: 'v1.0.4 (Legacy)',
      date: 'مارس 2018',
      status: 'legacy',
      description: 'نسخة كلاسيكية منسية، خفيفة جداً وسريعة التحميل.',
      icon: 'history_edu'
    }
  ];

  const addLog = (msg: string) => {
    setTelemetry(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-10));
  };

  // تثبيت التمرير داخل الحاوية فقط لمنع نزول الصفحة بالكامل لأسفل
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [telemetry]);

  const handleInstall = (lib: Library) => {
    setSelectedLib(lib);
    setStep('INSTALLING');
    addLog(`INIT: Installing ${lib.name}...`);
    
    setTimeout(() => {
      setStep('ACTIVE');
      addLog(`SUCCESS: ${lib.name} integrated into system core.`);
    }, 2000);
  };

  const runFeature = () => {
    addLog(`EXEC: Requesting PDF generation...`);
    
    if (selectedLib?.status === 'legacy') {
      setTimeout(() => {
        setIsExploited(true);
        setStep('IMPACT');
        addLog(`!! CRITICAL: Unauthorized shell execution detected !!`);
        addLog(`EXPLOIT: CVE-2018-9921 triggered via PDF Buffer.`);
        addLog(`CMD: whoami -> root`);
        addLog(`CMD: cat /etc/shadow -> Exfiltrating...`);
        addLog(`ALERT: Connection to 185.x.x.x established.`);
      }, 1000);
    } else {
      addLog(`INFO: PDF generated safely. Integrity check passed.`);
      alert("تم توليد التقرير بنجاح وأمان.");
    }
  };

  return (
    <div className="relative min-h-[750px] bg-[#050505] rounded-[3.5rem] border-8 border-white/5 overflow-hidden font-sans text-right transition-all duration-700 shadow-2xl" dir="rtl">
      
      {/* HUD Header */}
      <div className="h-20 bg-black/60 border-b border-white/10 flex items-center px-10 justify-between relative z-30">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className={`w-3 h-3 rounded-full ${isExploited ? 'bg-red-500 animate-ping' : 'bg-primary'}`}></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
          </div>
          <span className="text-xs font-black text-white/40 tracking-[0.3em] font-mono">NEXUS_CORE_OS</span>
        </div>
        <div className="text-[10px] font-mono text-gray-500 uppercase">Secure Environment Node #992</div>
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row h-[calc(750px-80px)]">
        
        {/* 🛠️ Main Workspace */}
        <main className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
          
          {step === 'STORE' && (
            <div className="space-y-10 animate-in fade-in zoom-in duration-500">
              <div className="text-right space-y-2">
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase font-chakra">متجر نكسوس للإضافات</h2>
                <p className="text-gray-400 text-lg">اختر إضافة لتفعيل ميزة "توليد التقارير" في نظامك.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {libraries.map(lib => (
                  <div key={lib.id} className="group relative bg-white/5 border-2 border-white/5 rounded-[2.5rem] p-8 hover:border-primary/40 transition-all duration-500 flex flex-col justify-between h-[320px]">
                    <div className="flex justify-between items-start flex-row-reverse">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${lib.status === 'legacy' ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' : 'border-primary/20 bg-primary/5 text-primary'}`}>
                        <span className="material-symbols-outlined text-3xl">{lib.icon}</span>
                      </div>
                      <div className="text-left font-mono" dir="ltr">
                        <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{lib.version}</div>
                        <div className="text-[9px] text-gray-500 mt-1">{lib.date}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <h4 className="text-2xl font-black text-white">{lib.name}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{lib.description}</p>
                    </div>
                    <button 
                      onClick={() => handleInstall(lib)}
                      className={`w-full py-4 mt-6 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all
                        ${lib.status === 'legacy' ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-primary text-black hover:shadow-glow'}
                      `}
                    >
                      تثبيت الإضافة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'INSTALLING' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
               <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
               <div className="text-center space-y-2">
                 <h3 className="text-2xl font-black text-white italic">جاري دمج {selectedLib?.name}...</h3>
                 <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Optimizing system dependencies</p>
               </div>
            </div>
          )}

          {step === 'ACTIVE' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-10 animate-in zoom-in duration-500">
               <div className="p-10 bg-primary/5 border-2 border-primary/20 rounded-[3rem] text-center space-y-6 max-w-lg shadow-glow">
                  <span className="material-symbols-outlined text-primary text-7xl animate-bounce">check_circle</span>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white">الإضافة جاهزة للعمل</h3>
                    <p className="text-gray-400 text-lg">تم تثبيت المكون بنجاح. يمكنك الآن توليد أول تقرير PDF الخاص بك.</p>
                  </div>
                  <div className="space-y-4">
                    <button 
                      onClick={runFeature}
                      className="w-full py-5 bg-primary text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl text-lg"
                    >
                      توليد تقرير مالي (PDF)
                    </button>
                    
                    {/* المستطيل المطلوب: يظهر فقط عند استخدام النسخة الآمنة ليحث المستخدم على تجربة النسخة الضعيفة */}
                    {selectedLib?.status === 'modern' && (
                      <button
                        onClick={() => { setStep('STORE'); setTelemetry(['[SYS] Navigating back to store...']); }}
                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 hover:border-primary/40 transition-all text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-700 delay-300"
                      >
                        جرب تحمل اضافه FastPDF Legacy Lite
                      </button>
                    )}
                  </div>
               </div>
            </div>
          )}

          {step === 'IMPACT' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in slide-in-from-top-10 duration-700">
               {/* تخفيف اللون الأحمر ليصبح Crimson احترافي */}
               <div className="bg-[#8b1a1a] border-8 border-white/10 p-12 rounded-[4rem] text-center space-y-8 shadow-[0_0_80px_rgba(139,26,26,0.4)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-[200px]">gpp_maybe</span>
                  </div>
                  <div className="relative z-10 space-y-6">
                    <span className="material-symbols-outlined text-white text-8xl animate-pulse">skull</span>
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none font-chakra">SYSTEM COMPROMISED</h2>
                    <p className="text-white/90 text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
                      لقد نجحت في توليد التقرير.. ولكن بـ <span className="text-white font-extrabold italic drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] underline decoration-white/20 underline-offset-8">ثمنٍ باهظ</span>
                    </p>
                    <div className="bg-black/40 p-8 rounded-3xl text-right space-y-4 border border-white/10">
                       <p className="text-white text-lg leading-relaxed">
                        استخدامك لـ <span className="text-red-300 font-bold">FastPDF Legacy v1.0.4</span> فتح باباً خلفياً للمهاجمين. هذه النسخة تحتوي على ثغرة قديمة ومعروفة تسمح بتنفيذ أوامر النظام عن بُعد.
                       </p>
                    </div>
                  </div>
                  <div className="relative z-10 pt-4">
                     <button 
                      onClick={() => { setStep('STORE'); setIsExploited(false); setTelemetry(['[SYS] Monitoring Reset...']); }}
                      className="bg-white text-[#8b1a1a] px-12 py-4 rounded-2xl font-black text-lg hover:shadow-2xl transition-all active:scale-95"
                     >
                       إعادة المحاكاة وتجربة النسخة الآمنة
                     </button>
                  </div>
               </div>
            </div>
          )}
        </main>

        {/* 📊 Side Telemetry */}
        <aside className={`w-full lg:w-[420px] p-8 border-l transition-all duration-700 flex flex-col gap-6 ${isExploited ? 'bg-red-950/20 border-red-500/30' : 'bg-black/40 border-white/5'}`}>
           <div className="flex items-center justify-between border-b border-white/10 pb-4">
             <div className="flex items-center gap-3">
               <span className={`material-symbols-outlined text-2xl ${isExploited ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                 {isExploited ? 'security_update_warning' : 'monitoring'}
               </span>
               <span className={`text-sm font-black uppercase tracking-widest ${isExploited ? 'text-red-400' : 'text-gray-400'}`}>
                 System_Telemetry
               </span>
             </div>
             <span className="text-[10px] font-mono text-gray-600">NODE_LOG_STREAM</span>
           </div>

           <div className="flex-1 overflow-hidden relative">
              <div ref={logContainerRef} className="h-full overflow-y-auto space-y-3 font-mono text-[12px] text-left" dir="ltr">
                {telemetry.map((log, i) => (
                  <div key={i} className={`animate-in slide-in-from-right-4 transition-colors duration-500 ${log.includes('!!') || log.includes('CMD') ? 'text-red-400 font-black' : 'text-gray-500'}`}>
                    {log}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
           </div>

           {isExploited && (
             <div className="p-6 bg-red-500/10 border-r-4 border-red-500 rounded-l-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
               <p className="text-red-400 text-xs font-bold leading-relaxed">
                 تحليل: تم استغلال "مكون قديم" لتنفيذ كود خبيث. المبرمج لم يحدّث المكتبة، والمهاجم استخدم ثغرة عمرها 7 سنوات للسيطرة على النظام.
               </p>
             </div>
           )}
        </aside>
      </div>

      {/* 🎯 Immersive Footer Navigation */}
      <footer className="relative z-40 h-28 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center">
         <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-16 py-4 bg-green-600 text-white font-black rounded-full hover:bg-green-700 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
         >
           انتقل إلى قسم الاختبار
         </button>
      </footer>

      <style>{`
        .shadow-glow { box-shadow: 0 0 30px rgba(0, 212, 170, 0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};
