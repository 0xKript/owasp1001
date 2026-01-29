import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A09_LoggingFailures_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  type LogType = 'info' | 'error' | 'alert';
  interface LogEntry {
    id: number;
    msg: string;
    type: LogType;
  }

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMonitoringEnabled, setIsMonitoringEnabled] = useState(false);

  const triggerEvent = (eventName: string, isAttack: boolean) => {
    const newLog: LogEntry = {
      id: Date.now(),
      msg: isAttack ? `DETECTED Potential Brute Force on user admin` : `INFO User login attempt user_123`,
      type: isAttack ? (isMonitoringEnabled ? 'alert' : 'info') : 'info'
    };
    
    if (isAttack && !isMonitoringEnabled) {
      newLog.msg = `INFO Connection established from 192.168.1.1`;
      newLog.type = 'info';
    }

    setLogs(prev => [newLog, ...prev].slice(0, 5));
  };

  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right" dir="rtl">
      
      {/* القصة الحقيقية الواقعية الموثقة */}
      <section className="relative max-w-5xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[3.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
        <div className="relative bg-[#050505] border-2 border-primary/20 p-10 lg:p-16 rounded-[3.5rem] shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/30 shadow-glow">
                <span className="material-symbols-outlined text-primary text-5xl">history_edu</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white italic drop-shadow-glow tracking-tighter">
                  كارثة شركة تارجت والدروس القاسية
              </h2>
            </div>
            
            <div className="text-xl lg:text-2xl text-gray-300 leading-relaxed space-y-8 max-w-4xl mx-auto">
              <p className="border-r-4 border-primary/30 pr-6">
                في عام 2013 تعرضت شركة تارجت لواحدة من أكبر عمليات تسريب البيانات في التاريخ. المهاجمون تمكنوا من سرقة بيانات 40 مليون بطاقة بنكية. المثير للدهشة أن النظام الأمني للشركة أرسل تنبيهات واضحة بوجود نشاط مريب.
              </p>
              
              <div className="relative p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 overflow-hidden group/alertbox">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/alertbox:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-8xl">warning</span>
                </div>
                <p className="text-primary font-black italic relative z-10">
                  لكن هذه التنبيهات ضاعت وسط آلاف السجلات اليومية العادية. الفريق الأمني لم يلاحظ الهجوم إلا بعد فوات الأوان.
                </p>
              </div>
              
              <p className="text-gray-400">
                هذه الحادثة أثبتت للعالم أن تسجيل الأحداث لا يكفي إذا لم تكن هناك مراقبة ذكية وفعالة. الفشل في <span className="text-primary font-black uppercase tracking-widest">Logging Failures</span> حول التنبيهات إلى مجرد نصوص ميتة لا يراها أحد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الافتتاحية القصصية - البنك */}
      <section className="relative max-w-5xl mx-auto group">
        <div className="absolute -inset-1 bg-white/5 rounded-[3.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 p-10 lg:p-16 rounded-[3.5rem] shadow-2xl overflow-hidden">
          
          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="flex items-center gap-6 justify-center">
              <h2 className="text-3xl lg:text-5xl font-black text-white italic drop-shadow-glow">
                البنك الذي بلا كاميرات
              </h2>
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                <span className="material-symbols-outlined text-red-500 text-4xl animate-pulse">videocam_off</span>
              </div>
            </div>

            <div className="bg-white/[0.02] p-8 lg:p-12 rounded-[3rem] border border-white/5 relative">
              <div className="absolute -top-4 -right-4 bg-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">Scenario_Analogy</div>
              <p className="text-xl lg:text-2xl text-gray-300 leading-[2] text-center italic">
                تخيل بنكا يحتوي على أحدث الأبواب الفولاذية وحراس مدججين بالسلاح عند المدخل. دخل لص من نافذة خلفية نسيها المطور مفتوحة تجول في الخزنة سرق الذهب وخرج بهدوء. المشكلة ليست في السرقة فقط بل في أن البنك لا يملك كاميرات مراقبة ولم ينطلق أي إنذار. بعد مائتي يوم اكتشف المدير بالصدفة أن الذهب اختفى. المهاجم هنا لم يكسر النظام فحسب بل اختفى فيه. هذا هو <span className="text-primary font-bold shadow-glow">Logging Failures</span> أن تكون أعمى في وقت تحتاج فيه لألف عين.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ماهي ثغرة Logging Failures ؟ */}
      <section className="max-w-5xl mx-auto relative px-4">
        <div className="relative bg-[#0c0c0c] border border-white/10 p-10 lg:p-16 rounded-[3.5rem] shadow-2xl text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.05),transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full border border-primary/40 bg-black text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              Core Definition
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter leading-tight">
                ماهي ثغرة <span className="text-primary uppercase drop-shadow-glow">Logging Failures؟</span>
              </h2>
            </div>

            <p className="text-lg lg:text-xl text-gray-300 leading-[1.8] max-w-3xl mx-auto font-medium">
              هي ثغرة أمنية تظهر عندما يفشل التطبيق في تسجيل الأحداث الهامة أو مراقبتها بشكل صحيح. يعني ذلك أن الهجوم قد يقع وينتهي دون أن يترك أي أثر يدل عليه مما يمنع الفريق الأمني من اكتشاف الاختراق أو التحقيق فيه. ببساطة هي غياب الذاكرة الأمنية للنظام.
            </p>
          </div>
        </div>
      </section>

      {/* كيف يفكر صائد الثغرات */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-8 text-right">
          <h2 className="text-4xl font-black text-white border-b-4 border-primary w-fit pb-2 ml-auto drop-shadow-glow">كيف يفكر صائد الثغرات؟</h2>
          <p className="text-2xl text-gray-300 leading-relaxed">
            المهاجم الذكي يراقب النظام بصمت تام. إذا وجد أن أفعاله المشبوهة لا تثير أي رد فعل من النظام يعلم يقينا أن الطريق ممهد أمامه للسيطرة الكاملة. هو لا يخشى الحماية التي تمنعه بل يخشى الحماية التي تراه وتسجل خطواته.
          </p>
        </div>
        <div className="bg-[#0a0a0a] p-10 rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-10">
             <span className="material-symbols-outlined text-8xl text-primary">psychology</span>
           </div>
           <h3 className="text-3xl font-bold text-white flex items-center gap-3 justify-end mb-6">
             عقلية المهاجم
             <span className="material-symbols-outlined text-primary text-4xl">terminal</span>
           </h3>
           <p className="text-xl text-gray-400 leading-relaxed italic">
             أول ما أفعله كمهاجم بعد الدخول هو محاولة مسح السجلات أو التأكد من أنني لا أثير أي تنبيهات. إذا وجدت النظام صامتا ولا يسجل محاولات الدخول الخاطئة أو طلبات الواجهة البرمجية الغريبة فأنا أعلم أنني في جنة المهاجمين.
           </p>
        </div>
      </section>

      {/* لماذا نفشل في المراقبة */}
      <section className="space-y-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-white text-center drop-shadow-glow">لماذا نفشل في المراقبة؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all text-center group">
              <span className="material-symbols-outlined text-primary text-6xl mb-6 group-hover:scale-110 transition-transform">database_off</span>
              <h4 className="text-2xl text-white font-black mb-4">غياب الأحداث الهامة</h4>
              <p className="text-lg text-gray-400 leading-relaxed">عدم تسجيل عمليات تسجيل الدخول الفاشلة أو تغيير الصلاحيات أو العمليات الحساسة في النظام.</p>
           </div>
           <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all text-center group">
              <span className="material-symbols-outlined text-primary text-6xl mb-6 group-hover:scale-110 transition-transform">notifications_paused</span>
              <h4 className="text-2xl text-white font-black mb-4">تنبيهات بلا معنى</h4>
              <p className="text-lg text-gray-400 leading-relaxed">إرسال آلاف التنبيهات يوميا لأحداث تافهة مما يجعل المطورين يتجاهلون التنبيهات الحقيقية والخطيرة.</p>
           </div>
           <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all text-center group">
              <span className="material-symbols-outlined text-primary text-6xl mb-6 group-hover:scale-110 transition-transform">storage</span>
              <h4 className="text-2xl text-white font-black mb-4">تخزين محلي فقط</h4>
              <p className="text-lg text-gray-400 leading-relaxed">تخزين السجلات على نفس الخادم مما يسهل على المهاجم مسحها وإخفاء أثره فور دخوله.</p>
           </div>
        </div>
      </section>

      {/* أمثلة عملية - تم إصلاح علامة الأكبر من هنا */}
      <section className="space-y-12 py-12 bg-black/40 rounded-[4rem] border border-primary/10 p-12 shadow-inner max-w-6xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tight uppercase drop-shadow-glow">أمثلة عملية على وجود الثغرة</h2>
          <div className="h-2 w-48 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="ltr">
          {[
            { id: 1, title: 'محاولات دخول فاشلة بدون سجل', desc: 'مستخدم يجرب كلمة مرور خاطئة مرات كثيرة ولا يتم تسجيل أي فشل في السجلات' },
            { id: 2, title: 'تجاهل محاولات الوصول غير المصرح', desc: 'طلبات على صفحات إدارية ترفض فعليا لكن دون تسجيل أي سجل أمني عنها' },
            { id: 3, title: 'غياب تسجيل تغيير الصلاحيات', desc: 'ترقية مستخدم إلى رتبة مدير أو تغيير أدوار الحسابات بدون أي أثر في السجلات' },
            { id: 4, title: 'عدم تسجيل استعادة كلمة المرور', desc: 'عملية إعادة تعيين كلمة المرور تتم دون تسجيل من طلبها أو متى تمت وبأي عنوان' },
            { id: 5, title: 'إهمال تسجيل أخطاء المصادقة', desc: 'رفض الجلسات المنتهية أو الرموز غير الصالحة دون توضيح السبب الحقيقي في السجلات' },
            { id: 6, title: 'سجلات تفتقر للمعلومات الأساسية', desc: 'يتم تسجيل الحدث لكن بدون ذكر هوية المستخدم أو الوقت مما يجعل التتبع مستحيلا' },
            { id: 7, title: 'غياب التنبيهات الأمنية الفورية', desc: 'وقوع هجوم تخمين واضح والسجلات تكتب كل شيء لكن لا يوجد أي نظام تنبيه يصرخ محذرا' },
            { id: 8, title: 'عدم توثيق التغييرات الحساسة', desc: 'تعطيل الحماية أو تغيير إعدادات النظام الحساسة أو تفعيل وضع التطوير بدون سجل' },
            { id: 9, title: 'سجلات قابلة للتلاعب أو الحذف', desc: 'المهاجم يملك القدرة على تعديل السجلات أو مسحها بالكامل ليخفي آثار جريمته للأبد' },
            { id: 10, title: 'غياب المراقبة والتحليل البشري', desc: 'السجلات موجودة بكثرة لكن لا أحد يقوم بمراجعتها أو تحليلها لاكتشاف الأنماط المشبوهة' }
          ].map(item => (
            <div key={item.id} className="bg-surface-dark border border-white/5 p-8 rounded-[2rem] hover:border-primary/60 transition-all group flex gap-8 shadow-xl" dir="rtl">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-primary/20 group-hover:text-primary transition-colors leading-none">{item.id}</span>
                <div className="w-1 h-full bg-primary/10 mt-4 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-lg text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-12 text-center">
          <p className="text-3xl font-black text-white italic bg-primary/5 p-12 rounded-[3rem] border-2 border-primary/20 shadow-glow">
            هذه الثغرة لا تمنع الهجوم لكنها تمنع اكتشافه
          </p>
        </div>
      </section>

      {/* SOC Operation Center */}
      <section className="bg-surface-dark p-10 rounded-[3rem] border border-primary/20 shadow-2xl space-y-8 relative overflow-hidden max-w-6xl mx-auto">
        <div className="flex items-center gap-4 text-primary justify-end">
          <h2 className="text-3xl font-black uppercase tracking-wider drop-shadow-glow">SOC Operation Center</h2>
          <span className="material-symbols-outlined text-4xl animate-pulse">monitoring</span>
        </div>
        
        <div className="bg-background-dark p-10 rounded-[2.5rem] border border-primary/10 space-y-10 relative z-10 shadow-inner">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
            <div className="space-y-6 flex-1 text-right">
               <p className="text-gray-400 text-lg font-bold">حالة المراقبة الحية</p>
               <div className="flex gap-6">
                  <button 
                    onClick={() => setIsMonitoringEnabled(!isMonitoringEnabled)}
                    className={`flex-1 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${isMonitoringEnabled ? 'bg-primary text-black' : 'bg-severity-critical text-white'}`}
                  >
                    <span className="material-symbols-outlined">{isMonitoringEnabled ? 'visibility' : 'visibility_off'}</span>
                    {isMonitoringEnabled ? 'Monitoring Active' : 'Monitoring Inactive'}
                  </button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => triggerEvent('Login', false)} className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors uppercase">Normal Traffic</button>
                  <button onClick={() => triggerEvent('Attack', true)} className="p-4 bg-severity-critical/10 border border-severity-critical/30 rounded-xl text-sm font-bold text-severity-critical hover:bg-severity-critical/20 transition-colors uppercase">Injection Attempt</button>
               </div>
            </div>

            <div className="flex-1 w-full space-y-3">
               <div className="text-xs text-gray-500 font-mono uppercase flex justify-between px-2">
                 <span className="animate-pulse text-primary font-black">LIVE STREAM</span>
                 <span className="font-black">Terminal_Access</span>
               </div>
               <div className="bg-black/80 p-8 rounded-3xl border border-white/10 min-h-[220px] font-mono text-sm space-y-3 overflow-hidden text-left shadow-2xl" dir="ltr">
                  {logs.length === 0 && <p className="text-gray-800 italic font-black">System idle... Awaiting events...</p>}
                  {logs.map(log => (
                    <div key={log.id} className={`flex gap-3 animate-in slide-in-from-right-4 ${log.type === 'alert' ? 'text-primary font-black drop-shadow-glow' : 'text-gray-500'}`}>
                      <span className="opacity-40">[{new Date(log.id).toLocaleTimeString()}]</span>
                      <span>{log.msg}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {!isMonitoringEnabled && logs.some(l => l.msg.includes('Connection established')) && (
            <div className="p-6 bg-severity-critical/10 border border-severity-critical/30 rounded-2xl animate-bounce text-center shadow-glow">
               <p className="text-lg text-severity-critical font-black flex items-center gap-4 justify-center">
                 أنت الآن تتعرض للاختراق المهاجم يختبئ خلف رسائل عادية لأن نظام المراقبة لديك لا يميز الأنماط المشبوهة
                 <span className="material-symbols-outlined text-3xl">warning</span>
               </p>
            </div>
          )}
        </div>
      </section>

      {/* Logging Strategy - تم إصلاح علامات الـ Arrow Functions هنا */}
      <section className="space-y-12 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-primary italic uppercase tracking-[0.2em] drop-shadow-glow animate-pulse">Logging Strategy</h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full shadow-glow"></div>
        </div>

        <div className="grid grid-cols-1 gap-16">
          <div className="group space-y-6">
            <div className="flex items-center gap-4 text-severity-critical justify-end">
              <h3 className="text-2xl font-black uppercase tracking-widest">تجاهل تام</h3>
              <span className="material-symbols-outlined text-4xl">disabled_by_default</span>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-severity-critical/40 shadow-2xl group-hover:shadow-severity-critical/10 transition-all">
              <div className="bg-[#050505] p-10 font-mono text-xl leading-relaxed overflow-x-auto text-left shadow-[inset_0_0_20px_rgba(255,71,87,0.1)]" dir="ltr">
                <pre>
                  <code>
                    <span className="text-blue-400">app</span>.<span className="text-yellow-400">post</span>(<span className="text-orange-400">transfer</span>, (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) ={'>>'} {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">if</span> (!<span className="text-yellow-400">verifyAuth</span>(<span className="text-orange-400">req</span>)) {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>.<span className="text-yellow-400">status</span>(<span className="text-cyan-400">401</span>).<span className="text-yellow-400">send</span>(<span className="text-green-400">Unauthorized</span>);<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'});
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="group space-y-6">
            <div className="flex items-center gap-4 text-primary justify-end">
              <h3 className="text-2xl font-black uppercase tracking-widest drop-shadow-glow">تسجيل ذكي</h3>
              <span className="material-symbols-outlined text-4xl">fact_check</span>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-primary/40 shadow-2xl group-hover:shadow-primary/20 transition-all">
              <div className="bg-[#050505] p-10 font-mono text-xl leading-relaxed overflow-x-auto text-left shadow-[inset_0_0_30px_rgba(0,212,170,0.1)]" dir="ltr">
                <pre>
                  <code>
                    <span className="text-blue-400">app</span>.<span className="text-yellow-400">post</span>(<span className="text-orange-400">transfer</span>, (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) ={'>>'} {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">if</span> (!<span className="text-yellow-400">verifyAuth</span>(<span className="text-orange-400">req</span>)) {'{'}<br/>
                    <span className="text-primary font-black drop-shadow-glow">
                  &nbsp;&nbsp;&nbsp;&nbsp;logger.warn({'{'} event: <span className="text-green-400">UNAUTHORIZED</span>, ip: <span className="text-orange-400">req</span>.ip {'}'}); 
                </span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>.<span className="text-yellow-400">status</span>(<span className="text-cyan-400">401</span>).<span className="text-yellow-400">send</span>(<span className="text-green-400">Unauthorized</span>);<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'});
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* خلاصة حارس المراقبة */}
      <section className="relative p-16 bg-gradient-to-br from-black to-primary/10 rounded-[4rem] border border-primary/20 text-center overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl rounded-full"></div>
        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-primary italic drop-shadow-glow uppercase tracking-widest">العين التي لا تنام</h2>
          <p className="text-2xl text-gray-300 leading-relaxed font-medium italic">
            الأمان ليس في بناء جدران لا تخترق بل في امتلاك نظام يخبرك فورا عندما يحاول أحدهم لمس تلك الجدران. التسجيل هو ذاكرة تطبيقك والمراقبة هي وعيه اللحظي.
          </p>
        </div>
      </section>

      {/* زر الانتقال */}
      <div className="mt-12 flex justify-center border-t border-white/5 pt-12">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-10 py-4 rounded-xl font-black hover:bg-green-700 transition-all cursor-pointer shadow-md text-sm uppercase tracking-widest"
        >
          انتقل الى قسم العملي
        </button>
      </div>

    </div>
  );
};