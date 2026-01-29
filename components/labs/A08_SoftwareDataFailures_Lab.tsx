
import React, { useState, useEffect } from 'react';
import { Vulnerability } from '../../types';

type SystemState = 'DASHBOARD' | 'UPDATE_REQUIRED' | 'INSTALLING' | 'POST_INSTALL' | 'BREACH_REVEALED';

export const A08_SoftwareDataFailures_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [state, setState] = useState<SystemState>('DASHBOARD');
  const [installProgress, setInstallProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLesson, setShowLesson] = useState(false);

  // بيانات النظام (وهمية)
  const stats = [
    { label: 'إجمالي الأصول الرقمية', value: '$4.2M', trend: '+12%' },
    { label: 'حالة الخوادم', value: 'نشط', trend: '100%' },
    { label: 'العمليات النشطة', value: '1,284', trend: 'Live' },
  ];

  const transactions = [
    { id: 'TX-9901', user: 'أحمد علي', amount: '$5,000', status: 'مؤكد' },
    { id: 'TX-9902', user: 'سارة خالد', amount: '$1,200', status: 'مؤكد' },
    { id: 'TX-9903', user: 'مشعل فهد', amount: '$9,800', status: 'مؤكد' },
  ];

  // محاكاة التثبيت
  useEffect(() => {
    if (state === 'INSTALLING') {
      const interval = setInterval(() => {
        setInstallProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState('POST_INSTALL'), 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      const logLines = [
        'جاري جلب الحزمة من CDN-GLOBAL...',
        'تجاوز فحص التوقيع الرقمي (بناءً على طلب المستخدم)...',
        'فك ضغط ملفات النواة: nexus_core_v4.2.tar.gz',
        'تحديث المكتبات البرمجية الأساسية...',
        'إعادة تشغيل خدمات الدفع الإلكتروني...',
        'تم الانتهاء: النظام يعمل الآن بالإصدار الأحدث.'
      ];

      logLines.forEach((line, i) => {
        setTimeout(() => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${line}`]), i * 800);
      });

      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div className="relative min-h-[800px] bg-[#050505] rounded-[4rem] border-[8px] border-white/5 overflow-hidden font-sans text-right transition-all duration-700 shadow-2xl" dir="rtl">
      
      {/* 🌌 Cyber Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,212,170,0.05),transparent)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,71,87,0.05),transparent)]"></div>
      </div>

      {/* 🖥️ Virtual OS Top Bar */}
      <header className="relative z-30 h-16 bg-black/80 backdrop-blur-xl border-b border-white/10 flex items-center px-10 justify-between">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">shield_person</span>
            <span className="text-xs font-black text-white/80 uppercase tracking-widest font-display">NEXUS PRIME v4.1</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-500 text-xs font-mono">
          <span>{new Date().toLocaleDateString('ar-EG')}</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 font-black">SVR_UP</span>
          </div>
        </div>
      </header>

      {/* 🏠 Main Dashboard Experience */}
      <div className="relative z-20 flex min-h-[calc(800px-64px)]">
        
        {/* Sidebar Nav */}
        <aside className="w-64 border-l border-white/5 bg-black/40 p-8 flex flex-col gap-4">
          {['الرئيسية', 'المعاملات', 'الأمان', 'الإعدادات'].map((item, i) => (
            <div key={i} className={`p-4 rounded-2xl flex items-center gap-3 transition-all ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-500 hover:bg-white/5'}`}>
              <span className="material-symbols-outlined text-xl">{['dashboard', 'payments', 'security', 'settings'][i]}</span>
              <span className="text-sm font-bold">{item}</span>
            </div>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-10 overflow-y-auto">
          
          {state === 'DASHBOARD' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black text-white italic tracking-tighter">أهلاً بك، المسؤول الرقمي</h1>
                  <p className="text-gray-500 mt-2">نظرة عامة على أداء النظام المالي اليوم.</p>
                </div>
                <button 
                  onClick={() => setState('UPDATE_REQUIRED')}
                  className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:shadow-glow transition-all active:scale-95 shadow-xl"
                >
                  فحص التحديثات
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] group hover:border-primary/30 transition-all">
                    <p className="text-gray-500 text-xs font-bold mb-1">{s.label}</p>
                    <div className="flex justify-between items-end">
                      <span className="text-3xl font-black text-white font-mono">{s.value}</span>
                      <span className="text-[10px] text-primary font-black bg-primary/10 px-2 py-0.5 rounded-full">{s.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                  <h3 className="text-white font-black text-lg">آخر العمليات المالية</h3>
                  <span className="text-gray-500 text-[10px] uppercase font-mono">Real-time DB Stream</span>
                </div>
                <table className="w-full text-right">
                  <thead className="bg-white/[0.01] text-gray-500 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-6">رقم العملية</th>
                      <th className="p-6">المستخدم</th>
                      <th className="p-6">المبلغ</th>
                      <th className="p-6">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {transactions.map((t, i) => (
                      <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6 font-mono text-primary">{t.id}</td>
                        <td className="p-6 text-white font-bold">{t.user}</td>
                        <td className="p-6 text-white font-mono font-black">{t.amount}</td>
                        <td className="p-6">
                          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black">✓ {t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {state === 'UPDATE_REQUIRED' && (
            <div className="h-full flex items-center justify-center animate-in zoom-in duration-500">
              <div className="max-w-xl w-full bg-surface-dark border-2 border-primary/20 rounded-[3.5rem] p-12 text-center space-y-8 shadow-glow">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto border border-primary/30">
                  <span className="material-symbols-outlined text-primary text-5xl animate-bounce">system_update_alt</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-white italic">تحديث أمني عاجل متاح</h2>
                  <p className="text-gray-400 leading-relaxed">
                    تم اكتشاف ثغرة في مكتبة المصادقة الأساسية. يجب تثبيت الإصدار <span className="text-primary font-bold">Nexus_Core_v4.2</span> فوراً لتأمين أصول الشركة.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setState('INSTALLING')}
                    className="group relative overflow-hidden bg-primary p-6 rounded-2xl flex flex-col items-center gap-1 transition-all hover:scale-[1.02]"
                  >
                    <span className="text-black font-black text-lg">تثبيت سريع (تجاوز فحص النزاهة)</span>
                    <span className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Recommended for speed // Skip Checksum</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                  <p className="text-[10px] text-gray-600 font-mono italic">ملاحظة: خيار التثبيت التقليدي (مع فحص النزاهة) قد يستغرق وقتاً أطول بسبب ضغط الشبكة.</p>
                </div>
              </div>
            </div>
          )}

          {state === 'INSTALLING' && (
            <div className="h-full flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-500">
               <div className="w-full max-w-2xl space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-primary font-black text-xl uppercase italic">Patching Core...</span>
                    <span className="text-gray-500 font-mono text-2xl">{installProgress}%</span>
                  </div>
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                    <div 
                      className="h-full bg-primary rounded-full shadow-glow transition-all duration-300"
                      style={{ width: `${installProgress}%` }}
                    ></div>
                  </div>
               </div>
               
               <div className="w-full max-w-2xl bg-black border border-white/5 rounded-3xl p-8 h-64 overflow-hidden relative shadow-inner">
                  <div className="absolute top-4 left-6 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[8px] text-gray-700 font-black uppercase font-mono tracking-widest">Live Install Log</span>
                  </div>
                  <div className="mt-6 space-y-2 font-mono text-[11px] text-left" dir="ltr">
                    {logs.map((log, i) => (
                      <div key={i} className="text-gray-400 animate-in slide-in-from-left-4">{log}</div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
               </div>
            </div>
          )}

          {state === 'POST_INSTALL' && (
            <div className="space-y-10 animate-in fade-in duration-1000">
               <div className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-[2.5rem] flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-black shadow-glow">
                      <span className="material-symbols-outlined text-4xl font-black">verified</span>
                    </div>
                    <div className="text-right">
                      <h3 className="text-green-500 font-black text-xl italic leading-none">نجاح الترقية</h3>
                      <p className="text-gray-400 text-xs mt-2">النظام يعمل الآن بكامل كفاءته الأمنية على الإصدار 4.2.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setState('BREACH_REVEALED')}
                    className="bg-white/10 hover:bg-white/20 text-white px-12 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all border border-white/20 shadow-lg"
                  >
                    تدقيق نهائي (Audit)
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 grayscale-[0.5]">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                    <p className="text-gray-500 text-xs font-bold mb-1">{s.label}</p>
                    <span className="text-3xl font-black text-white font-mono">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden opacity-90">
                <table className="w-full text-right">
                  <thead className="bg-white/[0.01] text-gray-500 text-[10px] uppercase font-black">
                    <tr><th className="p-6">رقم العملية</th><th className="p-6">المستخدم</th><th className="p-6">المبلغ</th><th className="p-6">الحالة</th></tr>
                  </thead>
                  <tbody className="text-sm">
                    {transactions.map((t, i) => (
                      <tr key={i} className="border-t border-white/5 italic">
                        <td className="p-6 font-mono text-primary/50">{t.id}</td>
                        <td className="p-6 text-white/50">{t.user}</td>
                        <td className="p-6 text-white/50">{t.amount}</td>
                        <td className="p-6"><span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-500 text-[10px]">مؤرشف</span></td>
                      </tr>
                    ))}
                    {/* The Secret Malicious Row */}
                    <tr className="bg-severity-critical/5 border-t border-severity-critical/20 animate-pulse">
                      <td className="p-6 font-mono text-severity-critical font-black italic">TX-HIDDEN-666</td>
                      <td className="p-6 text-white font-black">حساب خارجي مجهول</td>
                      <td className="p-6 text-severity-critical font-mono font-black">$2,500,000</td>
                      <td className="p-6"><span className="px-3 py-1 rounded-full bg-severity-critical/20 text-severity-critical text-[10px] font-black uppercase">تم تحويل الأصول</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {state === 'BREACH_REVEALED' && (
            <div className="space-y-12 animate-in zoom-in duration-700">
               <div className="bg-severity-critical/10 border-[3px] border-severity-critical/40 p-12 rounded-[4rem] text-center space-y-8 relative overflow-hidden group/alert">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover/alert:rotate-12 transition-transform duration-1000">
                    <span className="material-symbols-outlined text-[200px] text-severity-critical">broken_image</span>
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="w-24 h-24 bg-severity-critical rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(255,71,87,0.4)]">
                      <span className="material-symbols-outlined text-white text-6xl animate-pulse">gpp_maybe</span>
                    </div>
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">اكتشاف تلاعب في نزاهة النظام!</h2>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                      أثناء عملية التثبيت السريع، قمت بتجاوز <span className="text-severity-critical font-black underline decoration-severity-critical/40 decoration-4">فحص التوقيع الرقمي (Integrity Check)</span>. 
                      لقد قام المهاجم باختراق "سلسلة الإمداد" واستبدال حزمة التحديث الأصلية بحزمة مسمومة تحتوي على كود خبيث قام بجدولة تحويل بنكي ضخم خارج المؤسسة.
                    </p>
                    <div className="bg-black/60 p-6 rounded-3xl border border-severity-critical/20 font-mono text-severity-critical text-left text-xs" dir="ltr">
                      {`>>> AUDIT_FAILURE: CHECKSUM_MISMATCH_DETECTED`} <br/>
                      {`>>> ALERT: Malicious DLL 'nexus_auth.so' injected during install`} <br/>
                      {`>>> IMPACT: 2.5M USD Transferred to Unknown Source`}
                    </div>
                  </div>

                  <div className="relative z-10 pt-8 border-t border-white/5">
                    <button 
                      onClick={() => setShowLesson(true)}
                      className="bg-white text-black px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-severity-critical hover:text-white transition-all shadow-2xl active:scale-95"
                    >
                      تحليل الدرس المستفاد
                    </button>
                  </div>
               </div>

               {showLesson && (
                 <section className="bg-surface-dark border-2 border-primary/20 p-12 rounded-[4rem] animate-in slide-in-from-top-20 duration-1000 space-y-8 shadow-2xl">
                    <div className="flex items-center gap-6 flex-row-reverse border-b border-white/5 pb-8">
                       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary shrink-0">
                          <span className="material-symbols-outlined text-4xl">psychology</span>
                       </div>
                       <h2 className="text-3xl font-black text-white italic text-right flex-1 leading-none uppercase tracking-tighter">ماذا تعلمت من هذه التجربة؟</h2>
                    </div>
                    
                    <div className="text-right space-y-8">
                       <p className="text-2xl text-gray-200 leading-[1.8] font-medium">
                        لقد رأيت بعينك كيف أن النظام لم يتعرض للاختراق عبر "كلمة مرور ضعيفة" أو "ثغرة في الكود الخاص بك"، بل دخل الخطر من <span className="text-primary font-bold">باب الثقة</span>. 
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4 transition-all hover:border-primary/20">
                             <h4 className="text-primary font-black text-xl italic flex items-center gap-3 justify-end">
                               وهم المصدر الموثوق
                               <span className="material-symbols-outlined">inventory_2</span>
                             </h4>
                             <p className="text-gray-400 text-lg leading-relaxed">
                                مجرد تسمية التحديث "رسمي" أو تحميله من خادم مألوف لا يضمن سلامته. المهاجمون يستهدفون القواعد الخلفية للمطورين لزرع السم في قلب التحديثات.
                             </p>
                          </div>
                          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4 transition-all hover:border-primary/20">
                             <h4 className="text-primary font-black text-xl italic flex items-center gap-3 justify-end">
                               قدسية فحص النزاهة
                               <span className="material-symbols-outlined">verified_user</span>
                             </h4>
                             <p className="text-gray-400 text-lg leading-relaxed">
                                فحص الـ Hash أو التوقيع الرقمي ليس إجراءً "إضافياً" للسرعة، بل هو الجدار الوحيد الذي يضمن أن ما كتبه المطور هو فعلاً ما وصل إلى سيرفرك دون تلاعب.
                             </p>
                          </div>
                       </div>
                       
                       <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 text-center">
                          <p className="text-gray-300 text-2xl italic font-bold">
                            "في عالم سلسلة الإمداد.. <span className="text-white">الأمان</span> لا يعني الثقة في المصدر، بل يعني <span className="text-primary underline underline-offset-8">التحقق</span> من كل بايت قبل أن يصبح جزءاً من نظامك."
                          </p>
                       </div>
                    </div>
                 </section>
               )}
            </div>
          )}

        </main>
      </div>

      {/* 🎯 Sticky Footer Control to Quiz */}
      <div className="relative z-50 p-10 flex justify-center border-t border-white/5 bg-black/40 backdrop-blur-md">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-16 py-5 rounded-[2.5rem] font-black hover:bg-green-700 transition-all cursor-pointer shadow-[0_20px_50px_rgba(22,163,74,0.4)] text-lg uppercase tracking-widest active:scale-95 flex items-center gap-4"
        >
          <span>انتقل إلى قسم الاختبار</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <style>{`
        @keyframes shadow-pulse {
          0% { box-shadow: 0 0 10px rgba(0, 212, 170, 0.2); }
          50% { box-shadow: 0 0 30px rgba(0, 212, 170, 0.4); }
          100% { box-shadow: 0 0 10px rgba(0, 212, 170, 0.2); }
        }
        .shadow-glow {
          animation: shadow-pulse 3s infinite;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};
