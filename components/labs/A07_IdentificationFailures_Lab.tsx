import React, { useState, useEffect, useRef } from 'react';
import { Vulnerability } from '../../types';

export const A07_IdentificationFailures_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  // --- States ---
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[SYSTEM] Waiting for authentication...']);
  const [currentSessionID, setCurrentSessionID] = useState('SESSION_INIT_88291');
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; type: 'error' | 'success' | 'warning' | 'none' }>({ msg: '', type: 'none' });

  // --- Refs ---
  const logEndRef = useRef<HTMLDivElement>(null);

  // --- Helpers ---
  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8));
  };

  // --- Lab Logic ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsProcessing(true);
    setFeedback({ msg: '', type: 'none' });

    setTimeout(() => {
      setIsProcessing(false);
      const isDefaultCreds = username === 'admin' && password === 'admin';
      const isWeakPass = password === '123456' || password === 'password';
      const userExists = username === 'admin' || username === 'user_test';

      if (!isSecureMode) {
        // Vulnerable Mode Logic
        addLog(`REQ: POST /login?user=${username}&sid=${currentSessionID}`);
        
        if (isDefaultCreds || (userExists && isWeakPass)) {
          setIsLoggedIn(true);
          setFeedback({ msg: 'تم الدخول بنجاح! (تم قبول بيانات ضعيفة/افتراضية)', type: 'success' });
          addLog(`AUTH_SUCCESS: User identity accepted blindly.`);
        } else if (!userExists) {
          setFeedback({ msg: 'خطأ: اسم المستخدم غير موجود في النظام!', type: 'error' });
          addLog(`ENUM_LEAK: Application revealed that user "${username}" does not exist.`);
        } else {
          setFeedback({ msg: 'خطأ: كلمة المرور غير صحيحة لهذا الحساب!', type: 'error' });
          addLog(`ENUM_LEAK: Application confirmed "${username}" exists but password failed.`);
        }
        setLoginAttempts(prev => prev + 1);
      } else {
        // Secure Mode Logic
        addLog(`REQ: POST /login (Payload Encrypted)`);
        
        if (loginAttempts >= 3) {
          setIsLocked(true);
          setFeedback({ msg: 'تم قفل الحساب مؤقتاً بسبب محاولات فاشلة متكررة (Rate Limiting)', type: 'error' });
          addLog(`SECURITY_BLOCK: Bruteforce protection triggered.`);
          return;
        }

        if (isDefaultCreds && password.length < 12) {
          setFeedback({ msg: 'خطأ: بيانات الاعتماد غير صحيحة أو السياسة ترفضها.', type: 'error' });
          addLog(`POLICY_REJECT: Weak/Default password blocked by security policy.`);
        } else if (username === 'admin' && password === 'Admin@Complex#2025') {
          setIsLoggedIn(true);
          setFeedback({ msg: 'تم الدخول بنجاح عبر مصادقة قوية.', type: 'success' });
          addLog(`AUTH_SUCCESS: Identity verified with strong credentials.`);
        } else {
          setFeedback({ msg: 'اسم المستخدم أو كلمة المرور غير صحيحة.', type: 'error' });
          addLog(`GENERIC_ERROR: Generic failure message sent to prevent enumeration.`);
        }
        setLoginAttempts(prev => prev + 1);
      }
    }, 800);
  };

  const handleSensitiveAction = () => {
    if (isSecureMode) {
      setShowReauthModal(true);
      addLog(`RE_AUTH_REQUIRED: Triggering re-authentication for sensitive action.`);
    } else {
      addLog(`ACTION_SUCCESS: Identity assumed valid (Missing Re-authentication).`);
      alert("تم تنفيذ العملية الحساسة فوراً بدون طلب كلمة المرور مرة أخرى!");
    }
  };

  return (
    <div className="relative min-h-[850px] bg-[#020205] rounded-[4rem] border-[6px] border-white/5 overflow-hidden font-sans text-right group/lab transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
      
      {/* 🚀 Animated Background & Cyber Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,170,0.1),transparent)]"></div>
      </div>

      {/* 🖥️ Virtual Browser Header */}
      <div className="relative z-20 h-20 bg-[#0a0a10] border-b border-white/10 flex items-center px-10 gap-6">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
        </div>
        <div className="flex-1 bg-black/60 rounded-full h-10 border border-white/10 flex items-center px-6 gap-3 group/url">
          <span className="material-symbols-outlined text-gray-600 text-sm">lock</span>
          <div className="text-xs font-mono flex-1 text-left overflow-hidden whitespace-nowrap" dir="ltr">
            <span className="text-gray-500">https://</span>
            <span className="text-gray-300">nexus-bank.io/v1/auth</span>
            {!isSecureMode && (
              <span className="text-primary animate-pulse">?session_id={currentSessionID}</span>
            )}
          </div>
          {!isSecureMode && (
            <span className="text-[9px] text-primary font-black uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded">Session_In_URL</span>
          )}
        </div>
      </div>

      <div className="relative z-20 flex flex-col lg:flex-row min-h-[calc(850px-80px)]">
        
        {/* 🛠️ Sidebar: The Internal Monitor (Server View) */}
        <aside className="w-full lg:w-[380px] border-l border-white/10 bg-[#050508]/80 backdrop-blur-xl p-10 flex flex-col justify-between">
          <div className="space-y-10">
            <div className="flex items-center justify-between flex-row-reverse">
              <div className="text-right">
                <h3 className="text-white font-black text-xl italic leading-none">Internal Monitor</h3>
                <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">Server-Side Inspection</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${isSecureMode ? 'border-primary/40 bg-primary/5 text-primary' : 'border-severity-critical/40 bg-severity-critical/5 text-severity-critical'}`}>
                <span className="material-symbols-outlined">{isSecureMode ? 'shield' : 'gpp_maybe'}</span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-4">
              <div className="flex justify-between items-center flex-row-reverse">
                <span className="text-xs text-gray-400 font-bold">حالة المصادقة</span>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isLoggedIn ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                  {isLoggedIn ? 'Authenticated' : 'Guest'}
                </span>
              </div>
              <div className="flex justify-between items-center flex-row-reverse">
                <span className="text-xs text-gray-400 font-bold">صلاحية الجلسة</span>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isLoggedIn ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>
                  {isLoggedIn ? 'Permanent (Weak)' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between items-center flex-row-reverse">
                <span className="text-xs text-gray-400 font-bold">محاولات الفشل</span>
                <span className={`text-[10px] font-black font-mono ${loginAttempts >= 3 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                  {loginAttempts} محاولات
                </span>
              </div>
            </div>

            {/* Live Logs Terminal */}
            <div className="bg-black border-2 border-white/5 rounded-3xl p-6 h-64 overflow-hidden relative group/term shadow-inner">
               <div className="text-[8px] text-gray-700 font-mono uppercase mb-4 flex justify-between">
                 <span>Log_Stream_v4.2</span>
                 <span className="animate-pulse text-primary">● LIVE</span>
               </div>
               <div className="space-y-2 font-mono text-[10px] text-left" dir="ltr">
                 {terminalLogs.map((log, i) => (
                   <div key={i} className={`break-all ${log.includes('LEAK') || log.includes('BLOCK') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : 'text-gray-500'}`}>
                     {log}
                   </div>
                 ))}
                 <div ref={logEndRef}></div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Mode Switcher WOW Button */}
          <button 
            onClick={() => {
              setIsSecureMode(!isSecureMode);
              setIsLoggedIn(false);
              setLoginAttempts(0);
              setIsLocked(false);
              setTerminalLogs(['[SYSTEM] Configuration changed. Resetting state...']);
              setFeedback({ msg: '', type: 'none' });
            }}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 border-2 flex items-center justify-center gap-4 active:scale-95 shadow-2xl
              ${isSecureMode 
                ? 'bg-severity-critical/10 border-severity-critical/30 text-severity-critical hover:bg-severity-critical/20' 
                : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 shadow-glow'}
            `}
          >
            <span className="material-symbols-outlined">{isSecureMode ? 'lock_open' : 'lock'}</span>
            {isSecureMode ? 'Switch to Vulnerable' : '🔐 Switch to Secure'}
          </button>
        </aside>

        {/* 🎨 Main Content Area: The Login Form Experience */}
        <main className="flex-1 p-12 lg:p-20 flex flex-col items-center justify-center">
          {!isLoggedIn ? (
            <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
              
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center border-4 transition-all duration-700 shadow-2xl ${isSecureMode ? 'bg-primary/10 border-primary/40 rotate-0' : 'bg-severity-critical/10 border-severity-critical/40 rotate-6 animate-pulse'}`}>
                    <span className={`material-symbols-outlined text-5xl ${isSecureMode ? 'text-primary' : 'text-severity-critical'}`}>
                      {isSecureMode ? 'verified_user' : 'no_accounts'}
                    </span>
                  </div>
                  {!isSecureMode && (
                    <div className="absolute -top-4 -right-4 bg-severity-critical text-white text-[8px] font-black px-2 py-1 rounded shadow-lg uppercase animate-bounce">Vulnerable_Active</div>
                  )}
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter">بوابة الوصول المركزي</h2>
                <p className="text-gray-400 text-sm font-medium">أدخل بيانات الاعتماد للمتابعة إلى النظام المالي.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative group/field">
                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-600 group-focus-within/field:text-primary transition-colors">person</span>
                    </div>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLocked || isProcessing}
                      placeholder="اسم المستخدم"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-5 pr-14 pl-6 text-white font-bold outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-right placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative group/field">
                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-600 group-focus-within/field:text-primary transition-colors">lock</span>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLocked || isProcessing}
                      placeholder="كلمة المرور"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-5 pr-14 pl-6 text-white font-bold outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-right placeholder:text-gray-700"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLocked || isProcessing || !username || !password}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-xl
                    ${isLocked || isProcessing ? 'bg-gray-800 text-gray-600' : 'bg-white text-black hover:bg-primary active:scale-95 shadow-white/5'}
                  `}
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Authenticate</span>
                      <span className="material-symbols-outlined text-lg">login</span>
                    </>
                  )}
                </button>
              </form>

              {feedback.type !== 'none' && (
                <div className={`p-6 rounded-2xl border-2 flex items-start gap-4 animate-in slide-in-from-top-4 duration-500
                  ${feedback.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 
                    feedback.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-glow' : 
                    'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'}
                `}>
                  <span className="material-symbols-outlined mt-1">{feedback.type === 'error' ? 'report' : 'verified'}</span>
                  <p className="text-sm font-bold leading-relaxed">{feedback.msg}</p>
                </div>
              )}

              {/* 💡 Tips Area */}
              {!isLoggedIn && !isSecureMode && (
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  {['admin:admin', 'user_test:123456'].map(tip => (
                    <button key={tip} onClick={() => {
                      const [u, p] = tip.split(':');
                      setUsername(u); setPassword(p);
                    }} className="text-[14px] font-black bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-full text-gray-500 transition-all uppercase tracking-widest font-mono">
                      Try {tip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full max-w-2xl space-y-12 animate-in zoom-in-95 duration-700">
               <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 text-center space-y-8 relative overflow-hidden group/success">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/success:opacity-100 transition-opacity blur-3xl"></div>
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto border-4 border-black shadow-glow">
                    <span className="material-symbols-outlined text-black text-4xl font-black">done_all</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white italic">تم الدخول إلى النظام المالي</h3>
                    <p className="text-gray-400 text-lg">أهلاً بك، {username}. لديك وصول كامل الآن.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleSensitiveAction}
                      className="p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all text-right space-y-2 group"
                    >
                       <div className="flex justify-between items-center">
                         <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">payments</span>
                         <span className="text-[8px] font-mono text-gray-600 uppercase">Action_01</span>
                       </div>
                       <div className="text-white font-bold text-sm">تحويل مبلغ 10,000$</div>
                    </button>
                    <button 
                      onClick={handleSensitiveAction}
                      className="p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all text-right space-y-2 group"
                    >
                       <div className="flex justify-between items-center">
                         <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">settings_accessibility</span>
                         <span className="text-[8px] font-mono text-gray-600 uppercase">Action_02</span>
                       </div>
                       <div className="text-white font-bold text-sm">تغيير البريد الإلكتروني</div>
                    </button>
                  </div>
               </div>

               <div className="text-center">
                  <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-all">Sign Out / Clear Identity</button>
               </div>
            </div>
          )}
        </main>
      </div>

      {/* 🔐 Re-auth Modal (Secure Mode ONLY) */}
      {showReauthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-surface-dark border-2 border-primary/20 rounded-[3rem] p-10 space-y-8 shadow-glow">
              <div className="text-center space-y-4">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                   <span className="material-symbols-outlined text-4xl">password</span>
                 </div>
                 <h3 className="text-2xl font-black text-white italic">إجراء حساس مكتشف</h3>
                 <p className="text-gray-400 text-sm">يرجى إعادة إدخال كلمة المرور لتأكيد رغبتك في تنفيذ هذه العملية.</p>
              </div>
              <input 
                type="password" 
                placeholder="كلمة المرور الحالية"
                className="w-full bg-black/40 border-2 border-white/10 rounded-2xl py-4 px-6 text-white text-center font-bold outline-none focus:border-primary/40 transition-all"
              />
              <div className="flex gap-4">
                <button onClick={() => { setShowReauthModal(false); addLog(`RE_AUTH_CANCELLED: Action aborted.`); }} className="flex-1 py-4 text-gray-500 font-black text-xs uppercase tracking-widest hover:text-white transition-all">Cancel</button>
                <button onClick={() => { 
                  setShowReauthModal(false); 
                  addLog(`RE_AUTH_SUCCESS: Action authorized.`); 
                  alert("تم تأكيد الهوية وتنفيذ العملية بأمان!"); 
                }} className="flex-1 py-4 bg-primary text-black font-black rounded-2xl hover:brightness-110 shadow-glow text-xs uppercase tracking-widest">Confirm</button>
              </div>
           </div>
        </div>
      )}

      {/* 🚩 Achievement Banner: When Vulnerability is used */}
      {!isSecureMode && isLoggedIn && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-severity-critical/90 backdrop-blur-md px-10 py-4 rounded-full border-2 border-white/20 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-20 duration-1000">
          <span className="material-symbols-outlined text-white animate-bounce">warning</span>
          <span className="text-white text-xs font-black uppercase tracking-widest">VULNERABILITY_USED: DEFAULT_OR_WEAK_CREDS</span>
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        </div>
      )}

      {/* 🎯 Navigation Button to Quiz Section */}
      <div className="relative z-[110] p-10 flex justify-center border-t border-white/5 bg-black/20">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-10 py-4 rounded-xl font-black hover:bg-green-700 transition-all cursor-pointer shadow-md text-sm uppercase tracking-widest"
        >
          انتقل إلى قسم الكويز
        </button>
      </div>

      <style>{`
        .shadow-glow {
          box-shadow: 0 0 40px rgba(0, 212, 170, 0.25);
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
