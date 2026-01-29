import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A07_IdentificationFailures_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [isSecureMode, setIsSecureMode] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; type: 'none' | 'success' | 'error' | 'neutral' }>({ msg: '', type: 'none' });

  const handleInteractiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = "admin@company.com";
    
    if (!isSecureMode) {
      if (emailInput.toLowerCase() === targetEmail) {
        setFeedback({ msg: "تم العثور على الحساب! أرسلنا رابط الاستعادة إلى البريد المذكور", type: 'success' });
      } else {
        setFeedback({ msg: "خطأ: هذا البريد الإلكتروني غير مسجل في نظامنا!", type: 'error' });
      }
    } else {
      setFeedback({ msg: "إذا كان هذا الحساب مسجلاً لدينا، فستصلك رسالة برابط استعادة كلمة المرور قريباً.", type: 'neutral' });
    }
  };

  const practicalChecks = [
    {
      title: "1. Weak / Common Passwords",
      subtitle: "Strings تُستخدم مباشرة في الاختبار",
      payloads: ["admin", "admin123", "password", "123456", "qwerty"],
      explanation: "إذا الحساب يقبل كلمات مرور شائعة أو قصيرة → فشل في سياسة التحقق من الهوية.",
      icon: "password"
    },
    {
      title: "2. Default Credentials",
      subtitle: "Credentials جاهزة",
      payloads: ["admin:admin", "root:root", "test:test", "user:user"],
      explanation: "وجود حسابات افتراضية بدون تغيير = كسر مصادقة مباشر.",
      icon: "account_circle"
    },
    {
      title: "3. Username Enumeration",
      subtitle: "قيم تلاحظها",
      payloads: ["\"user not found\"", "\"invalid username\"", "\"wrong password\""],
      explanation: "اختلاف رسالة الخطأ يكشف إذا اليوزر موجود أو لا.",
      icon: "person_search"
    },
    {
      title: "4. No Rate Limiting (Bruteforce)",
      subtitle: "نمط هجوم",
      payloads: ["password1", "password2", "password3", "password4"],
      explanation: "إذا تقدر تجرب عدد غير محدود من المحاولات بدون حظر → الثغرة موجودة.",
      icon: "security_update_warning"
    },
    {
      title: "5. Predictable Reset Tokens",
      subtitle: "أمثلة Tokens ضعيفة",
      payloads: ["123456", "000000", "111111", "abcdef"],
      explanation: "توكن إعادة تعيين سهل التخمين أو قصير = فشل مصادقة.",
      icon: "key"
    },
    {
      title: "6. Reusable Password Reset Links",
      subtitle: "سلوك خطير",
      payloads: ["reset_token=ABC123 (يعمل أكثر من مرة)"],
      explanation: "رابط إعادة التعيين ما ينتهي أو يُستخدم عدة مرات.",
      icon: "link_off"
    },
    {
      title: "7. Session Fixation",
      subtitle: "قيم جلسة",
      payloads: ["PHPSESSID=abcd1234", "JSESSIONID=1111"],
      explanation: "إذا نفس Session ID يظل صالح بعد تسجيل الدخول → كسر مصادقة.",
      icon: "cookie"
    },
    {
      title: "8. Session ID in URL",
      subtitle: "شكل واضح",
      payloads: ["/dashboard?sessionid=abcd1234"],
      explanation: "الجلسة في الرابط = قابلة للتسريب والاختطاف.",
      icon: "http"
    },
    {
      title: "9. Missing Re‑Authentication",
      subtitle: "عمليات حساسة بدون تحقق",
      payloads: ["change_email", "change_password", "disable_2fa"],
      explanation: "تنفيذ عمليات خطيرة بدون طلب كلمة المرور مرة ثانية.",
      icon: "lock_reset"
    },
    {
      title: "10. Long‑Lived / Never Expiring Sessions",
      subtitle: "سلوك",
      payloads: ["cookie expires=+30days", "no expiration"],
      explanation: "الجلسة تبقى فعالة لفترة طويلة أو للأبد.",
      icon: "timer_off"
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-20 text-right">
      
      {/* 1️⃣ قصة الثغرة – "كارثة ياهو" */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#050505] p-10 rounded-[2.5rem] border-r-8 border-primary shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black italic justify-center flex items-center gap-3 text-[#00d4aa] drop-shadow-[0_0_15px_rgba(0,212,170,0.8)]">
             كارثة ياهو والمليارات من الهويات المسروقة
            <span className="material-symbols-outlined text-4xl">history_edu</span>
          </h2>
          <div className="text-xl text-gray-300 leading-[2.2] space-y-6">
            <p>
              في عام 2013، شهد العالم واحدة من أضخم كوارث الأمن السيبراني في التاريخ عندما تعرضت شركة <span className="text-primary font-bold">ياهو</span> لاختراق كشف بيانات 3 مليارات حساب. لم يقتحم المهاجمون السيرفرات بالمتفجرات، بل استغلوا ضعفاً في الطريقة التي يتحقق بها النظام من <span className="text-primary font-bold">هوية</span> المستخدمين عبر ملفات الكوكيز. 
            </p>
            <p>
              المهاجمون تمكنوا من تزوير <span className="text-primary font-bold">هويات رقمية</span> جعلت خوادم ياهو تعتقد يقيناً أنهم أصحاب الحسابات الحقيقيين دون الحاجة حتى لكلمة مرور. هذه الفجوة سمحت لهم بالدخول لكل زوايا الحسابات الشخصية، مما يثبت أن انهيار جدار <span className="text-primary font-bold">التحقق</span> يعني فقدان السيطرة على كل شيء.
            </p>
          </div>
        </div>
      </section>

      {/* 2️⃣ ماهي ثغرة Identification & Authentication Failures ؟ */}
      <section className="relative group max-w-5xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2.5rem] blur opacity-25"></div>
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <h2 className="text-3xl font-black text-white italic w-fit ml-auto pb-2 mb-8">ماهي ثغرة Identification & Authentication Failures ؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-xl leading-relaxed">
                هي ثغرة أمنية تقع عندما يفشل النظام في التأكد من أن الشخص الذي يطرق الباب هو فعلاً من يدّعي أنه هو. النظام هنا يعاني من "عمى هويات"؛ فهو يصدق الادعاءات بدون أدلة قوية، أو يترك المفتاح تحت السجادة بعد دخولك أول مرة.
              </p>
              <div className="p-6 bg-primary/5 border-r-4 border-primary rounded-l-2xl">
                <p className="text-white font-bold italic text-lg">النظام يعتقد أنك مستخدم شرعي بينما أنت لست كذلك.</p>
              </div>
            </div>
            <div className="bg-black/50 p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <span className="block text-primary font-bold text-lg">Identification</span>
                  <span className="text-gray-400 text-sm">من أنت؟ (الادعاء)</span>
                </div>
                <span className="material-symbols-outlined text-primary text-4xl">person_search</span>
              </div>
              <div className="flex justify-center">
                <span className="material-symbols-outlined text-gray-700">sync_alt</span>
              </div>
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <span className="block text-blue-400 font-bold text-lg">Authentication</span>
                  <span className="text-gray-400 text-sm">هل تملك الدليل؟ (البرهان)</span>
                </div>
                <span className="material-symbols-outlined text-blue-400 text-4xl">fingerprint</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ لماذا تحدث هذه الثغرة؟ */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-white italic border-r-4 border-primary pr-4">لماذا تحدث هذه الثغرة؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/20 transition-all text-center space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">emergency_home</span>
              <h4 className="text-xl text-white font-bold">إهمال الدفاع</h4>
              <p className="text-gray-200 text-lg leading-relaxed">غياب ميزة التحقق بخطوتين (MFA) مما يجعل كلمة المرور هي الحصن الوحيد والضعيف.</p>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/20 transition-all text-center space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">key_visualizer</span>
              <h4 className="text-xl text-white font-bold">بساطة الأدلة</h4>
              <p className="text-gray-200 text-lg leading-relaxed">السماح بكلمات مرور بدائية (مثل 123456) يسهل على أي مهاجم تخمينها في ثوانٍ.</p>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/20 transition-all text-center space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">timer_off</span>
              <h4 className="text-xl text-white font-bold">جلسات أبدية</h4>
              <p className="text-gray-200 text-lg leading-relaxed">عدم إنهاء الجلسة (Session) بشكل صحيح بعد الخروج، مما يترك الباب موارباً لمن يجلس بعدك.</p>
           </div>
        </div>
      </section>

      {/* 4️⃣ أين تظهر المشكلة غالباً؟ */}
      <section className="bg-surface-dark p-10 rounded-[3rem] border border-white/10 shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-white italic mb-10 text-center uppercase tracking-widest">أين تظهر المشكلة غالباً؟</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
          {[
            { label: 'Login Pages', icon: 'login', desc: 'بوابات الدخول التقليدية' },
            { label: 'API Endpoints', icon: 'api', desc: 'نقاط تواصل التطبيقات' },
            { label: 'Password Reset', icon: 'lock_reset', desc: 'أنظمة استعادة الحساب' },
            { label: 'Session Cookies', icon: 'cookie', desc: 'ملفات تعريف الجلسة' },
          ].map((item, i) => (
            <div key={i} className="bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center gap-6 group hover:bg-primary/5 transition-all">
               <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{item.icon}</span>
               </div>
               <div className="text-left">
                  <div className="text-white font-black uppercase tracking-tighter text-xl">{item.label}</div>
                  <div className="text-gray-400 text-xs uppercase font-bold tracking-widest text-lg">{item.desc}</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ كيف يفكر المهاجمون؟ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a150a] to-[#0a0a0a] p-12 rounded-[3.5rem] border border-severity-medium/30 shadow-2xl max-w-5xl mx-auto">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <span className="material-symbols-outlined text-[150px] text-severity-medium">psychology</span>
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-black text-severity-medium italic flex items-center gap-3 justify-center leading-none">
            كيف يفكر المهاجمون؟
            <span className="material-symbols-outlined text-4xl">psychology</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-black/60 p-8 rounded-[2rem] border border-white/5 space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2 justify-end">
                مبدأ الملاحظة
                <span className="material-symbols-outlined text-primary text-sm">visibility</span>
              </h4>
              <p className="text-gray-400 leading-relaxed text-lg">"لا أحتاج لاختراق الكود، سأراقب فقط كيف يتعامل النظام مع الأخطاء. هل يخبرني أن البريد موجود فعلاً؟ إذاً، لقد قطع نصف الطريق!"</p>
            </div>
            <div className="bg-black/60 p-8 rounded-[2rem] border border-white/5 space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2 justify-end">
                مبدأ إعادة الاستخدام
                <span className="material-symbols-outlined text-primary text-sm">history</span>
              </h4>
              <p className="text-gray-400 leading-relaxed text-lg">"سأستخدم كلمات مرور مسربة من مواقع أخرى. الناس يميلون لاستخدام نفس المفتاح لكل الأبواب، وهذا هو منجم الذهب الخاص بي."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ أثر الثغرة (Impact) */}
      <section className="max-w-5xl mx-auto space-y-10">
        <h2 className="text-3xl font-black text-white italic text-center">أثر الثغرة (Impact)</h2>
        <div className="flex flex-wrap justify-center gap-6">
           <div className="px-10 py-6 bg-severity-critical/10 border-2 border-severity-critical/20 rounded-3xl text-center group hover:bg-severity-critical/20 transition-all">
              <span className="material-symbols-outlined text-severity-critical text-4xl mb-2 block">person_off</span>
              <span className="text-white font-bold text-xl block">انتحال الشخصية</span>
           </div>
           <div className="px-10 py-6 bg-severity-critical/10 border-2 border-severity-critical/20 rounded-3xl text-center group hover:bg-severity-critical/20 transition-all">
              <span className="material-symbols-outlined text-severity-critical text-4xl mb-2 block">database</span>
              <span className="text-white font-bold text-xl block">تسريب البيانات</span>
           </div>
           <div className="px-10 py-6 bg-severity-critical/10 border-2 border-severity-critical/20 rounded-3xl text-center group hover:bg-severity-critical/20 transition-all">
              <span className="material-symbols-outlined text-severity-critical text-4xl mb-2 block">admin_panel_settings</span>
              <span className="text-white font-bold text-xl block">السيطرة الإدارية</span>
           </div>
        </div>
      </section>

      {/* Common Identification & Authentication Failure Patterns */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase font-oxanium">
            <span className="text-white shadow-none">10 أشياء عملية تختبر فيها</span> <br />
            <span className="text-primary">Identification & Authentication Failure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="ltr">
          {practicalChecks.map((check, index) => (
            <div key={index} className="group bg-surface-dark border-2 border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col shadow-2xl">
              <div className="p-8 space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-gray-500 font-mono font-black uppercase tracking-widest">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:shadow-glow transition-all">
                    <span className="material-symbols-outlined">{check.icon}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-right" dir="rtl">
                  <h3 className="text-2xl font-black text-white italic">{check.title}</h3>
                  <p className="text-primary/70 text-xs font-black uppercase tracking-widest">{check.subtitle}</p>
                </div>

                <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-2 font-mono text-base text-left" dir="ltr">
                  {check.payloads.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-gray-700">➜</span>
                      <span className="text-gray-200 group-hover:text-primary transition-colors">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/40 p-6 border-t border-white/5 text-right" dir="rtl">
                <p className="text-gray-300 text-lg leading-relaxed font-medium italic">
                  <span className="text-white font-bold not-italic">الشرح:</span> {check.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🧪 قسم LAB: محاكاة اختراق الهوية */}
      <section className="max-w-6xl mx-auto py-10 bg-[#08080c] rounded-[4rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary"></div>
        
        <div className="p-12 space-y-12 flex flex-col">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Lab Environment v7.0</div>
            <h2 className="text-4xl font-black text-white italic leading-tight">مختبر: هل نظامك يسرب الأسرار؟</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              في هذا السيناريو، ستقوم بدور مهاجم يحاول التأكد من وجود بريد <span className="text-white font-mono bg-white/5 px-2 rounded">admin@company.com</span> في النظام قبل البدء في هجوم التخمين.
            </p>
          </div>

          <div className="flex flex-col gap-12 items-stretch">
            {/* المحاكاة */}
            <div className="bg-black/60 p-10 rounded-[3rem] border-2 border-white/5 flex flex-col justify-between shadow-inner">
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border ${isSecureMode ? 'bg-primary/20 text-primary border-primary/30' : 'bg-severity-critical/20 text-severity-critical border-severity-critical/30 animate-pulse'}`}>
                      {isSecureMode ? 'MODE: SECURE' : 'MODE: VULNERABLE'}
                    </span>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                       <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                       <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                    </div>
                  </div>

                  <form onSubmit={handleInteractiveSubmit} className="space-y-6">
                    <div className="space-y-3 text-right">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Forgot Password Recovery</label>
                      <div className="relative group">
                        <input 
                          type="email" 
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="أدخل البريد الإلكتروني للاختبار..."
                          className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-5 text-white focus:border-primary outline-none transition-all text-center text-lg font-mono"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-primary">alternate_email</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isSecureMode ? 'bg-primary text-black' : 'bg-severity-critical text-white shadow-glow-red'}`}
                    >
                      إرسال طلب الاستعادة
                    </button>
                  </form>

                  {feedback.type !== 'none' && (
                    <div className={`p-6 rounded-2xl animate-in zoom-in duration-300 border-2 text-center font-bold
                      ${feedback.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 
                        feedback.type === 'error' ? 'bg-severity-critical/10 border-severity-critical/30 text-severity-critical shadow-[0_0_20px_rgba(255,71,87,0.1)]' : 
                        'bg-blue-500/10 border-blue-500/30 text-blue-400'}
                    `}>
                      {feedback.msg}
                    </div>
                  )}
               </div>

               <div className="mt-10 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => { setIsSecureMode(!isSecureMode); setFeedback({ msg: '', type: 'none' }); }}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all border-2
                      ${isSecureMode ? 'bg-severity-critical/10 border-severity-critical/30 text-severity-critical hover:bg-severity-critical/20' : 'bg-primary/10 border-primary/30 text-primary shadow-glow hover:bg-primary/20'}
                    `}
                  >
                    <span className="material-symbols-outlined">{isSecureMode ? 'lock_open' : 'lock'}</span>
                    {isSecureMode ? 'تعطيل الحماية (Switch to Vulnerable)' : '🔐 تفعيل الحماية (Switch to Secure)'}
                  </button>
               </div>
            </div>

            {/* الشرح الجانبي - Moved below the simulation */}
            <div className="flex flex-col justify-center space-y-8 text-right mt-8 pt-8 border-t border-white/5">
               <div className="space-y-4">
                  <h4 className="text-3xl font-bold text-white flex items-center gap-3 italic justify-end">
                    لماذا تشعر بالخطر?
                    <span className="material-symbols-outlined text-primary">psychology</span>
                  </h4>
                  <p className="text-gray-300 text-xl leading-relaxed">
                    في الوضع <span className="text-severity-critical font-bold">الضعيف</span>، النظام يخبرك بصراحة إذا كان البريد موجوداً أم لا. هذا يسمى <span className="text-white font-bold">User Enumeration</span>. المهاجم يستخدم هذه المعلومة لبناء قائمة أهداف حقيقية 100%، مما يسهل عليه هجوم التخمين لاحقاً.
                  </p>
               </div>
               <div className="p-8 bg-white/5 border-r-4 border-primary rounded-l-[2rem] space-y-2">
                  <p className="text-primary font-black text-lg uppercase tracking-widest">النتيجة في الوضع الآمن:</p>
                  <p className="text-gray-200 text-lg">يجب أن تكون الرسالة مبهمة دائماً، مثل "سيصلك رابط في حال وجود الحساب"، وبذلك لا يعرف المهاجم هل نجح في تخمين البريد أم لا.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* مثال عملي يوضح الثغرة (كود ضار vs كود آمن) */}
      <section className="space-y-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {/* 🔴 الكود الأول: كود ضار */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-2xl font-black uppercase tracking-widest">تطبيق "ثرثار" (Vulnerable Implementation)</h3>
              <span className="material-symbols-outlined text-3xl">report</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_40px_rgba(255,71,87,0.15)] transition-all">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre><code>
<span className="text-gray-500">1 // مسار تسجيل الدخول بدون حماية من التخمين</span><br/>
<span className="text-blue-400">app.post</span>(<span className="text-green-400">'/login'</span>, (<span className="text-orange-400">req, res</span>) <span className="text-blue-400">=&gt;</span> {'{'}<br/>
<span className="text-gray-500">2 &nbsp;&nbsp;const {'{ user, pass }'} = req.body;</span><br/>
<span className="text-gray-500">3 &nbsp;&nbsp;if (!db.userExists(user)) {'{'}</span><br/>
<span className="text-red-400">4 &nbsp;&nbsp;&nbsp;&nbsp;return res.send('User does not exist'); </span> <span className="text-[10px] bg-red-400/20 px-1 rounded animate-pulse">!! تسريب معلومة !!</span><br/>
<span className="text-gray-500">5 &nbsp;&nbsp;{'}'}</span><br/>
<span className="text-gray-500">6 &nbsp;&nbsp;if (db.getPass(user) !== pass) {'{'}</span><br/>
<span className="text-red-400">7 &nbsp;&nbsp;&nbsp;&nbsp;return res.send('Wrong password for ' + user); </span> <span className="text-[10px] bg-red-400/20 px-1 rounded">!! تحديد الخطأ بدقة !!</span><br/>
<span className="text-gray-500">8 &nbsp;&nbsp;{'}'}</span><br/>
<span className="text-gray-500">9 &nbsp;&nbsp;res.send('Welcome!');</span><br/>
{'}'});
                </code></pre>
              </div>
            </div>
            {/* الشرح */}
            <div className="bg-severity-critical/5 p-6 rounded-2xl border-r-4 border-severity-critical text-right space-y-3">
               <p className="text-lg text-gray-200"><strong>شرح السطر 1:</strong> تعريف مسار الدخول كطلب POST عادي دون أي قيود على عدد المحاولات.</p>
               <p className="text-lg text-gray-200"><strong>شرح السطر 3-4:</strong> <span className="text-severity-critical font-bold">هنا تكمن الثغرة الأولى</span>؛ النظام يفحص وجود المستخدم ويخبر المهاجم بصراحة "المستخدم غير موجود". هذا يسمح للمهاجم بعمل قائمة بكل المستخدمين الحقيقيين.</p>
               <p className="text-lg text-gray-200"><strong>شرح السطر 6-7:</strong> <span className="text-severity-critical font-bold">الثغرة الثانية</span>؛ النظام يؤكد وجود المستخدم ويخبر المهاجم أن الخطأ "فقط" في كلمة المرور، مما يعطي المهاجم الضوء الأخضر للبدء في تخمين الباسورد لهذا المستخدم تحديداً.</p>
            </div>
          </div>

          {/* 🟢 الكود الثاني: كود آمن */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-2xl font-black uppercase tracking-widest">تطبيق "حذر" (Secure Implementation)</h3>
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.15)] transition-all">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre><code>
<span className="text-gray-500">1 // استخدام محدد للمحاولات لمنع هجمات الـ Brute Force</span><br/>
<span className="text-blue-400">app.post</span>(<span className="text-green-400">'/login'</span>, <span className="text-primary font-bold">limiter</span>, <span className="text-blue-400">async</span> (<span className="text-orange-400">req, res</span>) <span className="text-blue-400">=&gt;</span> {'{'}<br/>
<span className="text-gray-500">2 &nbsp;&nbsp;const {'{ user, pass }'} = req.body;</span><br/>
<span className="text-primary">3 &nbsp;&nbsp;const isValid = await auth.verify(user, pass);</span><br/>
<span className="text-gray-500">4</span><br/>
<span className="text-primary">5 &nbsp;&nbsp;if (!isValid) {'{'}</span><br/>
<span className="text-primary">6 &nbsp;&nbsp;&nbsp;&nbsp;return res.status(401).send('Invalid username or password');</span><br/>
<span className="text-gray-500">7 &nbsp;&nbsp;{'}'}</span><br/>
<span className="text-gray-500">8</span><br/>
<span className="text-primary">9 &nbsp;&nbsp;// طلب المصادقة الثنائية (MFA) كإجراء إضافي</span><br/>
<span className="text-gray-500">10 &nbsp;if (user.mfaEnabled) {'{'} return res.promptMFA(); {'}'}</span><br/>
{'}'});
                </code></pre>
              </div>
            </div>
            {/* الشرح */}
            <div className="bg-primary/5 p-6 rounded-2xl border-r-4 border-primary text-right space-y-3">
               <p className="text-lg text-gray-200"><strong>شرح السطر 1:</strong> أضفنا <span className="text-primary font-bold">limiter</span>؛ وهو كود يمنع المهاجم من محاولة الدخول أكثر من 5 مرات في الدقيقة، مما يقتل هجمات التخمين الآلية.</p>
               <p className="text-lg text-gray-200"><strong>شرح السطر 3-6:</strong> <span className="text-primary font-bold">الحماية الجوهرية</span>؛ لاحظ أننا نستخدم رسالة خطأ واحدة ومبهمة "اسم المستخدم أو كلمة المرور غير صحيحة". لا نخبر المهاجم أين أخطأ بالضبط، وبذلك نحمي هوية مستخدمينا.</p>
               <p className="text-lg text-gray-200"><strong>شرح السطر 10:</strong> تفعيل <span className="text-primary font-bold">MFA</span>؛ حتى لو نجح المهاجم في سرقة كلمة المرور، سيظل عاجزاً عن الدخول بدون رمز التحقق الثاني القادم لهاتف المستخدم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* متى تعرف أن الثغرة موجودة ؟ */}
      <section className="relative p-1 max-w-4xl mx-auto overflow-hidden rounded-[3rem]">
        <div className="bg-[#0c0c14] p-16 rounded-[2.9rem] border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-10">
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase flex items-center justify-center gap-4">
               تشخيص وجود الثغرة
               <span className="w-12 h-1 bg-primary rounded-full"></span>
            </h2>
            <div className="p-8 bg-black/40 rounded-3xl border border-primary/20 shadow-inner">
               <p className="text-gray-200 text-2xl leading-[1.8] font-medium italic">
                إذا استطعت الدخول لحساب مستخدم دون برهان حقيقي، أو إذا تمكنت من <span className="text-primary font-bold">تخمين</span> الهوية القادمة، أو إذا وجدت النظام يثق في <span className="text-primary font-bold">الادعاء</span> أكثر من <span className="text-primary font-bold">الدليل</span>.. فأنت أمام نظام مكسور الهوية.
               </p>
            </div>
            <div className="flex justify-center gap-2">
               {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-primary rounded-full" style={{opacity: 0.3 + (i * 0.2)}}></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* زر الانتقال المعدل */}
      <div className="mt-12 flex justify-center pt-10 border-t border-white/5">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-14 py-5 rounded-[2rem] font-black hover:bg-green-700 transition-all cursor-pointer shadow-[0_20px_40px_rgba(22,163,74,0.3)] text-sm uppercase tracking-[0.2em] active:scale-95"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

    </div>
  );
};
