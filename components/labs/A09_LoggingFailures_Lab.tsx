
import React, { useState, useEffect, useRef } from 'react';
import { Vulnerability } from '../../types';

type LoggingLevel = 'NONE' | 'WEAK' | 'SECURE';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'CRITICAL';
  message: string;
  details?: string;
}

export const A09_LoggingFailures_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [level, setLevel] = useState<LoggingLevel>('NONE');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'SAFE' | 'COMPROMISED'>('SAFE');
  const [breachCount, setBreachCount] = useState(0);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg: string, type: LogEntry['level'] = 'INFO', details?: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString(),
      level: type,
      message: msg,
      details
    };
    setLogs(prev => [...prev, newLog].slice(-50));
  };

  const handleAction = (actionType: 'LOGIN' | 'TRANSFER' | 'DELETE') => {
    setIsAttacking(true);
    
    // محاكاة تأخير السيرفر
    setTimeout(() => {
      setIsAttacking(false);
      
      if (level === 'NONE') {
        // عمى مطلق: لا يتم تسجيل أي شيء
        setSystemStatus('SAFE'); // النظام يظن أنه آمن لأنه "أعمى"
        setBreachCount(prev => prev + 1);
        // لا يتم استدعاء addLog هنا لإظهار غياب التسجيل
      } 
      else if (level === 'WEAK') {
        // سجلات عديمة الفائدة
        addLog("تمت معالجة الطلب بنجاح", "INFO");
        setSystemStatus('SAFE'); // السجلات ضعيفة جداً لدرجة أنها لا تكتشف الهجوم
        setBreachCount(prev => prev + 1);
      } 
      else {
        // سجلات أمنية حقيقية
        if (actionType === 'LOGIN') {
          addLog("فشل دخول: 50 محاولة من IP 185.22.x.x للمستخدم 'admin'", "CRITICAL", "النتيجة: تم حظر المصدر تلقائياً");
        } else if (actionType === 'TRANSFER') {
          addLog("إجراء حساس: محاولة تحويل مبلغ ضخم بدون توثيق", "WARN", "المستخدم: guest_88 | الحالة: تم إيقاف العملية");
        } else {
          addLog("تنبيه نظام: محاولة مسح سجلات قاعدة البيانات الأساسية", "CRITICAL", "المسار: /api/v1/purge | الحالة: تم منع الوصول");
        }
        setSystemStatus('SAFE'); // في الوضع الآمن، النظام يكتشف ويمنع، فيبقى آمناً حقيقةً
      }
    }, 800);
  };

  const resetLab = () => {
    setLogs([]);
    setSystemStatus('SAFE');
    setBreachCount(0);
    addLog("تم تشغيل نظام المراقبة. بانتظار الأحداث...");
  };

  return (
    <div className="animate-in fade-in duration-700 text-right font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
        
        {/* العناوين الكبيرة والواضحة */}
        <div className="text-center space-y-6">
          <h2 className="text-6xl font-black text-white italic tracking-tighter">مختبر "الرؤية العمياء"</h2>
          <p className="text-gray-400 text-2xl max-w-3xl mx-auto font-bold leading-relaxed">
            اختبر بنفسك كيف يمر الهجوم بسلام عندما يكون نظامك "أعمى" عن التسجيل.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* منطقة التفاعل (الجانب الأيمن) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-dark border-4 border-white/5 rounded-[3rem] p-10 shadow-2xl space-y-12">
              
              {/* اختيار مستوى التسجيل */}
              <div className="space-y-6">
                <label className="text-sm font-black text-primary uppercase tracking-widest block mb-2">اختر استراتيجية السيرفر:</label>
                <div className="grid grid-cols-3 gap-3 p-2 bg-black/60 rounded-2xl border border-white/10">
                  {(['NONE', 'WEAK', 'SECURE'] as LoggingLevel[]).map(l => (
                    <button
                      key={l}
                      onClick={() => { setLevel(l); setLogs([]); setBreachCount(0); }}
                      className={`py-4 rounded-xl text-xs font-black transition-all ${level === l ? 'bg-primary text-black shadow-glow' : 'text-gray-500 hover:text-white'}`}
                    >
                      {l === 'NONE' ? 'لا يوجد تسجيل' : l === 'WEAK' ? 'تسجيل ضعيف' : 'تسجيل آمن'}
                    </button>
                  ))}
                </div>
              </div>

              {/* أزرار الهجوم */}
              <div className="space-y-6">
                <h4 className="text-white font-black text-xl italic">نفذ هجوماً الآن:</h4>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    disabled={isAttacking}
                    onClick={() => handleAction('LOGIN')}
                    className="group flex items-center justify-between p-6 bg-white/5 border-2 border-white/10 rounded-[2rem] hover:border-primary/40 transition-all text-right active:scale-95"
                  >
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">password</span>
                    <div>
                      <p className="text-white font-black text-2xl">هجوم تخمين</p>
                      <p className="text-sm text-gray-500 font-bold">تجربة 100 كلمة سر في ثانية واحدة</p>
                    </div>
                  </button>

                  <button 
                    disabled={isAttacking}
                    onClick={() => handleAction('TRANSFER')}
                    className="group flex items-center justify-between p-6 bg-white/5 border-2 border-white/10 rounded-[2rem] hover:border-primary/40 transition-all text-right active:scale-95"
                  >
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">payments</span>
                    <div>
                      <p className="text-white font-black text-2xl">سرقة أموال</p>
                      <p className="text-sm text-gray-500 font-bold">محاولة تحويل رصيد بدون إذن</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* إدراك النظام */}
              <div className={`p-10 rounded-[2.5rem] border-4 transition-all duration-700 text-center space-y-4
                ${(level === 'NONE' || level === 'WEAK') && breachCount > 0 ? 'bg-green-500/5 border-green-500/20' : 'bg-black border-white/5'}
              `}>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">إدراك السيرفر للحالة الأمنية</p>
                <p className="text-3xl font-black text-white italic">
                  {(level === 'NONE' || level === 'WEAK') && breachCount > 0 ? 'كل شيء يعمل بشكل طبيعي ✓' : 'النظام مستقر'}
                </p>
                {(level === 'NONE' || level === 'WEAK') && breachCount > 0 && (
                  <p className="text-red-500 font-black text-lg animate-pulse mt-4">
                    !!! المهاجم سرق بياناتك فعلياً والسيرفر لا يزال يقول "طبيعي" !!!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* سجلات السيرفر (الجانب الأيسر) */}
          <div className="lg:col-span-7 flex flex-col h-[700px]">
            <div className="flex-1 bg-black rounded-[3.5rem] border-4 border-white/10 overflow-hidden flex flex-col shadow-2xl relative">
              
              {/* ترويسة الشاشة */}
              <div className="h-20 bg-white/5 border-b border-white/10 px-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${isAttacking ? 'bg-red-500 animate-ping' : 'bg-primary'}`}></div>
                  <span className="text-sm font-mono text-gray-400 font-black uppercase tracking-[0.4em]">Server_Log_Console</span>
                </div>
                <button onClick={resetLab} className="text-xs text-gray-600 hover:text-white font-black uppercase tracking-widest transition-colors">Clear</button>
              </div>

              {/* منطقة الرسائل */}
              <div className="flex-1 p-10 overflow-y-auto font-mono text-xl space-y-6 custom-scrollbar text-left" dir="ltr">
                {level === 'NONE' && logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-20 text-center" dir="rtl">
                     <span className="material-symbols-outlined text-[150px]">visibility_off</span>
                     <p className="text-2xl italic font-black">النظام "أعمى" تماماً. مهما فعل المهاجم، لن تكتب السجلات حرفاً واحداً.</p>
                  </div>
                ) : (
                  <>
                    {logs.length === 0 && <div className="text-gray-800 italic" dir="rtl">بانتظار الأحداث الأمنية...</div>}
                    {logs.map(log => (
                      <div key={log.id} className={`p-6 rounded-2xl border-2 animate-in slide-in-from-right-4 transition-all
                        ${log.level === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30 text-red-400' : log.level === 'WARN' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-white/5 text-gray-400'}
                      `}>
                        <div className="flex justify-between items-center mb-2 text-xs opacity-70">
                          <span className="font-black">[{log.time}] {log.level}</span>
                          <span className="font-bold">EVENT_ID: {log.id}</span>
                        </div>
                        <div className="text-2xl font-black leading-tight">{log.message}</div>
                        {log.details && <div className="mt-4 pt-4 border-t border-white/5 text-sm opacity-60 italic font-sans" dir="rtl">{log.details}</div>}
                      </div>
                    ))}
                    <div ref={logEndRef}></div>
                  </>
                )}
              </div>

              {/* تأثير تدرج سفلي */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* المساحة التحليلية (النتيجة) */}
        <div className="animate-in slide-in-from-top-6 duration-1000 delay-300">
          <div className={`p-12 rounded-[4rem] border-4 transition-all duration-1000
            ${level === 'NONE' ? 'bg-red-500/10 border-red-500/40' : level === 'WEAK' ? 'bg-yellow-500/10 border-yellow-500/40' : 'bg-primary/10 border-primary/40 shadow-glow'}
          `}>
             <div className="flex flex-col md:flex-row-reverse items-center gap-10">
               <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 border-4
                 ${level === 'NONE' ? 'bg-red-500/20 border-red-500/40 text-red-400' : level === 'WEAK' ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'bg-primary text-black'}
               `}>
                 <span className="material-symbols-outlined text-5xl font-black">
                   {level === 'NONE' ? 'emergency_home' : level === 'WEAK' ? 'low_priority' : 'fact_check'}
                 </span>
               </div>
               <div className="text-right flex-1 space-y-4">
                 <h4 className="text-4xl font-black text-white italic tracking-tight">
                   {level === 'NONE' ? 'كارثة: النظام أعمى تماماً' : level === 'WEAK' ? 'تضليل: سجلات بلا معنى' : 'أمان: رؤية كاملة'}
                 </h4>
                 <p className="text-2xl text-gray-300 leading-relaxed font-bold">
                   {level === 'NONE' && "المهاجم يتجول داخل النظام بحرية تامة. لا يوجد كاميرات مراقبة، لا يوجد حراس. أنت لا تعرف حتى أنك تعرضت للاختراق!"}
                   {level === 'WEAK' && "السيرفر يسجل رسائل عامة جداً تخفي الهجوم الحقيقي. المهاجم يختبئ وسط آلاف الرسائل اليومية العادية بنجاح."}
                   {level === 'SECURE' && "هذا هو التصميم الصحيح. النظام يسجل التفاصيل الدقيقة (IP، عدد المحاولات، نوع الهجوم). الآن يمكنك مطاردة المهاجم فوراً."}
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* زر الانتقال النهائي */}
        <div className="flex justify-center pt-10">
           <button 
            onClick={() => {
              const tabButtons = Array.from(document.querySelectorAll('button'));
              const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
              if (quizBtn) (quizBtn as HTMLElement).click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-20 py-6 bg-green-600 hover:bg-green-700 text-white font-black rounded-full shadow-[0_20px_60px_rgba(22,163,74,0.4)] transition-all active:scale-95 uppercase tracking-[0.2em] text-xl flex items-center gap-6"
           >
             <span>انتقل الآن إلى الاختبار</span>
             <span className="material-symbols-outlined text-3xl">arrow_back</span>
           </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .shadow-glow { box-shadow: 0 0 40px rgba(0, 212, 170, 0.3); }
      `}</style>
    </div>
  );
};
