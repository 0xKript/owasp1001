
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A04_InsecureDesign_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [designChoice, setDesignChoice] = useState<'client' | 'server' | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right">
      
      {/* 1. الافتتاحية القصصية: قصة حقيقية عن خلل التصميم */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a2a] to-[#050a10] p-10 rounded-[2rem] border-r-8 border-severity-high shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-severity-high text-4xl">history_edu</span>
            كارثة التذاكر المحجوزة
          </h2>
          <div className="text-xl text-gray-300 leading-relaxed space-y-4">
            <p>
              في أحد المواقع العالمية لحجز تذاكر المباريات، أراد الفريق إرضاء الجماهير عبر ميزة جديدة تسمح للمشجع بـ <span className="text-severity-high font-bold">حجز مقعده لمدة ساعة كاملة</span> قبل الدفع، وذلك ليعطوه وقتاً كافياً لإتمام عملية الشراء.
            </p>
            <p>
              برمجياً، كان الكود ممتازاً ولا يحتوي على ثغرة واحدة تسمح باختراق قاعدة البيانات. لكن من ناحية <span className="text-severity-high font-bold">التصميم المنطقي</span>، ارتكب الفريق خطأً فادحاً.
            </p>
            <p>
              قام أحد المنافسين ببرمجة أداة بسيطة تفتح آلاف الحسابات الوهمية في ثوانٍ، وتقوم بـ <span className="text-severity-high font-bold">حجز جميع مقاعد المباراة</span> دفعة واحدة. لم يقم بشراء تذكرة واحدة، بل اكتفى بحجزها فقط.
            </p>
            <p>
              النتيجة كانت أن المشجعين الحقيقيين وجدوا الموقع يخبرهم بأن المباراة مباعة بالكامل، بينما في الحقيقة كانت جميع المقاعد فارغة ولكنها محجوزة في طابور الانتظار. قبل انتهاء الساعة بدقيقة، ألغى المهاجم حجوزاته لتبدأ العملية من جديد، مما تسبب في <span className="text-severity-high font-bold">شلل كامل للمبيعات</span> وخسائر ضخمة للشركة.
            </p>
            <p>
              المشكلة هنا لم تكن خطأ في كتابة الكود، بل في <span className="text-severity-high font-bold">فكرة التصميم</span> التي لم تضع قيوداً على عدد الحجوزات المعلقة للمستخدم الواحد.
            </p>
          </div>
        </div>
      </section>

      {/* 2. جوهر الثغرة */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-right">
          <h2 className="text-4xl font-black text-white w-fit ml-auto pb-1">ماهي ثغرة Insecure Design ؟</h2>
          <div className="text-gray-300 text-xl leading-relaxed space-y-4">
            <p>
              التصميم غير الآمن يعني أننا قمنا بإنشاء نظام يعمل تماماً كما طلبنا منه، لكن ما طلبناه كان يفتقر إلى <span className="text-severity-high font-bold">التفكير الأمني المستقبلي</span>.
            </p>
            <p>
              هذه الثغرة تختلف عن الأخطاء البرمجية الأخرى لأنها تقع في مرحلة <span className="text-severity-high font-bold">التخطيط والرسم</span> قبل أن يبدأ المبرمج بكتابة سطر واحد.
            </p>
            <p>
              ببساطة، هو فشل في توقع كيف يمكن لشخص سيء أن يسيء استخدام ميزات النظام المشروعة لتحقيق أهداف تخريبية أو سرقة البيانات. الأمان هنا لم يكن جزءاً من <span className="text-severity-high font-bold">أساس البناء</span> بل تم تجاهله تماماً.
            </p>
          </div>
        </div>
        <div className="relative group">
           <div className="absolute -inset-2 bg-gradient-to-r from-severity-high to-primary rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
           <div className="relative bg-surface-dark p-10 rounded-[2rem] border border-white/5 space-y-6">
              <h3 className="text-3xl font-bold text-white flex items-center gap-2 justify-end">
                أمثلة على خلل التصميم
                <span className="material-symbols-outlined text-severity-high">warning</span>
              </h3>
              <ul className="space-y-4 text-right">
                <li className="flex gap-3 justify-end">
                  <span className="text-gray-400 text-base">أنظمة تسمح للمستخدم بتغيير السعر في متصفحه قبل الشراء.</span>
                  <span className="material-symbols-outlined text-severity-critical text-sm mt-1">error_outline</span>
                </li>
                <li className="flex gap-3 justify-end">
                  <span className="text-gray-400 text-base">ميزات استعادة كلمة المرور التي تكشف وجود الحساب من عدمه.</span>
                  <span className="material-symbols-outlined text-severity-critical text-sm mt-1">error_outline</span>
                </li>
                <li className="flex gap-3 justify-end">
                  <span className="text-gray-400 text-base">تطبيقات تعتمد كلياً على روابط مخفية دون حماية حقيقية.</span>
                  <span className="material-symbols-outlined text-severity-critical text-sm mt-1">error_outline</span>
                </li>
              </ul>
           </div>
        </div>
      </section>

      {/* 4. لماذا نقع في هذا الخطأ؟ */}
      <section className="space-y-8 text-right">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white italic">لماذا نقع في هذا الخطأ؟</h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-6 hover:border-severity-high/20 transition-all">
            <div className="flex items-start gap-4 justify-end">
               <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-bold text-white">التركيز المفرط على تجربة المستخدم</h4>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    الرغبة الكبيرة في إرضاء المستخدم وجعل النظام <span className="text-severity-high font-bold">سهل الاستخدام للغاية</span> تجعلنا أحياناً نركز على السهولة وننسى تماماً وضع الحواجز الأمنية الضرورية.
                  </p>
               </div>
               <div className="w-12 h-12 bg-severity-high/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-severity-high">person_check</span>
               </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-6 hover:border-severity-high/20 transition-all">
            <div className="flex items-start gap-4 justify-end">
               <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-bold text-white">ضيق الوقت والسرعة في الإطلاق</h4>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    السرعة الكبيرة المطلوبة في إطلاق المنتجات البرمجية تدفع الفرق أحياناً لتجاوز مرحلة <span className="text-severity-high font-bold">التخطيط الأمني العميق</span>، حيث يتم البدء في البرمجة فوراً دون دراسة المخاطر المحتملة للتصميم.
                  </p>
               </div>
               <div className="w-12 h-12 bg-severity-high/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-severity-high">speed</span>
               </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-6 hover:border-severity-high/20 transition-all">
            <div className="flex items-start gap-4 justify-end">
               <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-bold text-white">الاعتقاد بأن الكود السليم يعني أماناً مطلقاً</h4>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    يوجد اعتقاد خطابئ بأن خلو الكود من <span className="text-severity-high font-bold">الأخطاء التقنية</span> مثل الحقن أو الثغرات البرمجية يعني بالضرورة أن النظام آمن، بينما الحقيقة هي أن التصميم المنطقي الضعيف قد يدمر الأمان تماماً حتى مع كود مثالي.
                  </p>
               </div>
               <div className="w-12 h-12 bg-severity-high/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-severity-high">verified</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: 10 أمثلة على Insecure Design Vulnerabilities */}
      <section className="space-y-8 text-right">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white italic">10 أمثلة على Insecure Design Vulnerabilities</h2>
          <div className="w-24 h-1 bg-severity-high mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto" dir="ltr">
          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">1- Missing Rate Limiting</h4>
            <p className="text-gray-300 text-lg">ما فيه حد لعدد المحاولات</p>
            <p className="text-gray-400 text-sm mt-1 italic">مثال: إرسال OTP بلا قيود</p>
            <p className="text-severity-high font-bold mt-2">→ تصميم غير آمن</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">2- Business Logic Flaws</h4>
            <p className="text-gray-300 text-lg">النظام يسمح بتجاوز خطوات</p>
            <p className="text-gray-400 text-sm mt-1 italic">مثال: شراء بدون دفع</p>
            <p className="text-severity-high font-bold mt-2">→ Insecure Design</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">3- Client‑Side Trust</h4>
            <p className="text-gray-300 text-lg">السيرفر يثق بقيم جاية من المتصفح</p>
            <p className="text-gray-400 text-sm mt-1 italic">مثال: السعر، الدور (role)</p>
            <p className="text-severity-high font-bold mt-2">→ Insecure Design</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">4- Missing Authorization Checks</h4>
            <p className="text-gray-300 text-lg">صلاحيات غير مُتحققة في كل request</p>
            <p className="text-severity-high font-bold mt-2">→ المستخدم العادي يوصل لأشياء أدمن</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">5- Privilege Escalation by Design</h4>
            <p className="text-gray-300 text-lg">ترقية صلاحيات بدون تحقق قوي</p>
            <p className="text-severity-high font-bold mt-2">→ تصميم خاطئ</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">6- Insecure Password Reset Flow</h4>
            <p className="text-gray-300 text-lg">إعادة تعيين كلمة المرور بدون تحقق كافي</p>
            <p className="text-severity-high font-bold mt-2">→ خلل تصميمي</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">7- Predictable User / Object IDs</h4>
            <p className="text-gray-300 text-lg">استخدام IDs متسلسلة بدون حماية</p>
            <p className="text-severity-high font-bold mt-2">→ تصميم يسمح بالوصول غير المصرح</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">8- No Abuse Prevention</h4>
            <p className="text-gray-300 text-lg">النظام يسمح بالإساءة (spam, automation)</p>
            <p className="text-gray-400 text-sm mt-1 italic">بدون CAPTCHA أو limits</p>
            <p className="text-severity-high font-bold mt-2">→ Insecure Design</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">9- Insecure Workflow</h4>
            <p className="text-gray-300 text-lg">تنفيذ عمليات حساسة بخطوة وحدة</p>
            <p className="text-gray-400 text-sm mt-1 italic">بدون confirmation أو re‑auth</p>
            <p className="text-severity-high font-bold mt-2">→ تصميم خطير</p>
          </div>

          <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/10 hover:border-severity-high/40 transition-all text-left shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,71,87,0.1)] group">
            <h4 className="text-2xl font-black text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">10- Over‑Permissive Functionality</h4>
            <p className="text-gray-300 text-lg">إعطاء المستخدم صلاحيات أكثر من اللازم</p>
            <p className="text-gray-400 text-sm mt-1 italic">مثال: API تعيد بيانات غير ضرورية</p>
            <p className="text-severity-high font-bold mt-2">→ Insecure Design</p>
          </div>
        </div>
      </section>

      {/* 3. تجربة تفاعلية: Design Flaw Simulator (REPLACED LAB) */}
      <section className="bg-[#050505] p-8 rounded-[3rem] border-2 border-white/5 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        <div className="flex items-center gap-4 text-severity-high justify-end relative z-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Design Flaw Simulator</h2>
          <span className="material-symbols-outlined text-4xl animate-pulse">architecture</span>
        </div>

        <div className="bg-surface-dark p-10 rounded-[2.5rem] border border-white/10 space-y-10 relative z-10 text-right">
          {/* 1. Scenario Introduction */}
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-severity-high/10 border border-severity-high/20">
                <span className="w-2 h-2 bg-severity-high rounded-full animate-ping"></span>
                <span className="text-[10px] font-black text-severity-high uppercase tracking-widest">Active Scenario: Coupon System</span>
             </div>
             <p className="text-gray-300 text-xl leading-relaxed font-medium">
               تخيل أنك تصمم نظام قسائم خصم لمتجر إلكتروني كبير. هدفك جعل النظام سريعاً وسهلاً، ولكن عليك الحذر من الثغرات التصميمية قبل أن يبدأ المبرمج بكتابة الكود.
             </p>
          </div>

          {/* 2. Design Decision Panel */}
          <div className="space-y-6">
             <h4 className="text-white font-bold text-lg italic">القرار التصميمي: أين نضع منطق التحقق من القسيمة؟</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setDesignChoice('client')}
                  className={`p-8 rounded-3xl border-2 transition-all text-right space-y-3 group ${designChoice === 'client' ? 'border-severity-critical bg-severity-critical/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-center justify-end gap-3 font-bold text-2xl">
                    <span className="text-[#ff5c5c]">التصميم السريع</span>
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-severity-critical">speed</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">يتم التحقق من صحة القسيمة داخل المتصفح فوراً لسرعة الاستجابة وتوفير جهد السيرفر.</p>
                </button>

                <button 
                  onClick={() => setDesignChoice('server')}
                  className={`p-8 rounded-3xl border-2 transition-all text-right space-y-3 group ${designChoice === 'server' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                >
                  <div className="flex items-center justify-end gap-3 text-primary font-bold text-2xl">
                    التصميم الآمن
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">shield</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">يرسل المتصفح الكود للسيرفر، والسيرفر هو من يقرر هل القسيمة صالحة أم لا بناءً على بياناته.</p>
                </button>
             </div>
          </div>

          {/* 3. Immediate Feedback System */}
          {designChoice === 'client' && (
            <div className="animate-in slide-in-from-top-4 duration-500 space-y-6">
               <div className="p-8 bg-severity-critical/10 border-2 border-severity-critical/30 rounded-[2.5rem] space-y-4">
                  <div className="flex items-center justify-end gap-3 text-severity-critical font-black text-xl">
                    <span>❌ تصميم خطير: الثقة العمياء في المتصفح</span>
                    <span className="material-symbols-outlined">report</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    لقد منحت المتصفح سلطة اتخاذ القرار النهائي. هذا الخلل في التصميم يسمح للمهاجم بالتحكم في النتيجة لأن الكود يعمل في بيئة هو يملكها بالكامل.
                  </p>
               </div>

               {/* 4. Attacker Perspective */}
               <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] space-y-3">
                  <h5 className="text-severity-critical font-bold text-sm italic">كيف يفكر المهاجم:</h5>
                  <p className="text-gray-400 leading-relaxed">
                    سأقوم بفتح أدوات المطور، وأبحث عن الكود الذي يقوم بالتحقق، ثم سأغير منطق الوظيفة لتعيد دائماً نتيجة ناجحة بغض النظر عن الكود الذي كتبته. سأحصل على خصومات ضخمة على كل مشترياتي ببساطة.
                  </p>
               </div>

               {/* 5. Secure Design Hint */}
               <div className="p-6 bg-primary/5 border-r-4 border-primary rounded-l-2xl">
                  <p className="text-primary font-bold text-sm">تلميح للتصميم الآمن:</p>
                  <p className="text-gray-400 text-sm italic">لا تسمح أبداً لمنطق يعمل لدى العميل باتخاذ قرارات مالية أو أمنية. اجعل السيرفر هو المصدر الوحيد للحقيقة والتحقق.</p>
               </div>
            </div>
          )}

          {designChoice === 'server' && (
            <div className="animate-in slide-in-from-top-4 duration-500 p-8 bg-primary/10 border-2 border-primary/30 rounded-[2.5rem] flex items-center justify-end gap-6">
               <div className="text-right space-y-2">
                 <h4 className="text-primary font-black text-xl italic">اختيار معماري سليم!</h4>
                 <p className="text-gray-300">لقد وضعت جدار حماية منطقي يمنع المستخدم من التلاعب بقواعد العمل الأساسية، هكذا نطبق الأمان عبر التصميم.</p>
               </div>
               <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-black shadow-glow">
                 <span className="material-symbols-outlined text-4xl font-black">verified</span>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. كود تحت المجهر: المنطق المعطوب */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white italic">المنطق البرمجي (Design Logic)</h2>
          <div className="w-24 h-1 bg-severity-high mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          
          {/* تصميم خاطئ */}
          <div className="group space-y-4 text-right">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">تصميم منطقي هش</h3>
              <span className="material-symbols-outlined text-3xl">wrong_location</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_40px_rgba(255,71,87,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-gray-500">// السيناريو: تطبيق تجارة إلكترونية</span><br/>
<span className="text-blue-400">function</span> <span className="text-yellow-400">addToCart</span>(<span className="text-orange-400">productId</span>, <span className="text-orange-400">price</span>) {'{'}<br/>
&nbsp;&nbsp;<span className="text-gray-500">// التصميم يسمح للواجهة الأمامية بإرسال السعر!</span><br/>
&nbsp;&nbsp;<span className="text-blue-400">cart</span>.<span className="text-yellow-400">push</span>({'{'} id: <span className="text-orange-400">productId</span>, price: <span className="text-orange-400">price</span> {'}'});<br/>
&nbsp;&nbsp;<span className="text-severity-critical font-bold text-xs bg-severity-critical/20 px-1 rounded animate-pulse">!! خطأ تصميم: المهاجم سيغير السعر لـ 0.01$ !!</span><br/>
{'}'}
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic">هنا الخطأ ليس في الكود، بل في قرار السماح للعميل بتحديد السعر.</p>
          </div>

          {/* تصميم آمن */}
          <div className="group space-y-4 text-right">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">تصميم واعي</h3>
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-blue-400">function</span> <span className="text-yellow-400">addToCart</span>(<span className="text-orange-400">productId</span>) {'{'}<br/>
&nbsp;&nbsp;<span className="text-gray-500">// الأمان: السيرفر هو المصدر الوحيد للحقيقة</span><br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-primary">actualPrice</span> = <span className="text-blue-400">db</span>.<span className="text-yellow-400">getProductPrice</span>(<span className="text-orange-400">productId</span>);<br/>
&nbsp;&nbsp;<span className="text-blue-400">cart</span>.<span className="text-yellow-400">push</span>({'{'} id: <span className="text-orange-400">productId</span>, price: <span className="text-primary">actualPrice</span> {'}'});<br/>
&nbsp;&nbsp;<span className="text-primary font-bold text-xs bg-primary/20 px-2 py-1 rounded inline-block mt-2">✓ تصميم آمن: لا يمكن التلاعب بالسعر</span><br/>
{'}'}
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic">هنا قمنا بتصميم العملية بحيث لا يملك المستخدم أي سلطة على البيانات الحساسة.</p>
          </div>

        </div>
      </section>

      {/* 6. خلاصة المعماري الذكي */}
      <section className="relative p-12 bg-gradient-to-br from-background-dark to-severity-high/5 rounded-[3rem] border border-severity-high/10 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-severity-high/5 blur-[120px] rounded-full"></div>
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-severity-high text-7xl">psychology_alt</span>
          <h2 className="text-3xl font-black text-white italic">فكر كصائد، ابنِ كحصن</h2>
          <p className="text-gray-300 text-xl leading-relaxed">
            التصميم الآمن هو عقلية تبدأ قبل كتابة أول سطر كود. اسأل نفسك دائماً: <br/>
            <span className="text-white font-bold bg-white/5 px-2 py-1 rounded inline-block mt-4">كيف يمكن للمهاجم أن يستخدم هذه الميزة بطريقة لم أقصدها؟</span>
          </p>
          <p className="text-severity-high font-mono text-sm tracking-widest uppercase mt-4">Safety by design, not by patch.</p>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-10 py-4 bg-primary text-black font-black rounded-xl shadow-lg hover:shadow-glow transition-all cursor-pointer"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

    </div>
  );
};
