
import React, { useState, useEffect } from 'react';
import { Vulnerability } from '../../types';

export const A03_Injection_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [userName, setUserName] = useState('Ahmed');
  const [labInput, setLabInput] = useState('');
  const [labResponse, setLabResponse] = useState<{ status: string, msg: string, isDanger: boolean } | null>(null);

  // منطق التفاعل مع الحمولات العشر والمدخلات الآمنة
  useEffect(() => {
    const input = labInput.trim();
    if (!input) {
      setLabResponse(null);
      return;
    }

    const payloads: Record<string, { status: string, msg: string }> = {
      "' OR 1=1 --": {
        status: "اختراق منطقية",
        msg: "أدخلت رموزاً تجعل الشرط البرمجي صحيحاً دائماً فقام السيرفر بعرض كافة البيانات المخزنة لديه وهذا خطير لأنه يكشف أسرار جميع المستخدمين بضغطة زر واحدة."
      },
      "' OR '1'='1": {
        status: "تجاوز فلاتر النصوص",
        msg: "استخدمت نصوصاً متشابهة بدلاً من الأرقام فخدعت النظام وجعلته يوافق على الدخول وهذا يعني أن الحماية النصية البسيطة لم تكن كافية لمنعك من اختراق المنطق."
      },
      "admin' --": {
        status: "تجاوز المصادقة",
        msg: "كتبت اسم المستخدم وأضفت علامة تلغي ما بعدها فقام السيرفر بتجاهل خانة كلمة المرور تماماً وسمح لك بالدخول كمدير للنظام بدون إذن."
      },
      "' UNION SELECT 1, user(), 3 --": {
        status: "تسريب معلومات",
        msg: "أضفت أمراً لدمج معلومات جديدة فقام السيرفر بجلب بيانات سرية تخص النظام نفسه وعرضها لك وهذا يسمح للمهاجم بمعرفة تفاصيل تقنية حساسة تساعده في الهجوم."
      },
      "1; DROP TABLE users --": {
        status: "هجوم تدميري",
        msg: "وضعت علامة تنهي الأمر الأول وتبدأ أمراً ثانياً فقام السيرفر بمسح قاعدة بيانات المستخدمين بالكامل وهذا الفعل تدميري ويؤدي لفقدان كافة معلومات الشركة."
      },
      "' OR SLEEP(5) --": {
        status: "حقن أعمى مبني على الوقت",
        msg: "أدخلت أمراً يجبر الخادم على الانتظار فاستجاب السيرفر وتأخر في الرد وهذا يثبت للمهاجم وجود ثغرة قابلة للاستغلال حتى لو كان الموقع لا يظهر أي بيانات واضحة."
      },
      "admin' #": {
        status: "تعليق الشيفرة",
        msg: "استخدمت رمزاً يخفي بقية الأوامر فقام السيرفر بتنفيذ الجزء الأول فقط وسمح لك بالدخول كمسؤول متجاهلاً كافة قيود الأمان التي وضعها المبرمج."
      },
      "' AND 1=2 UNION SELECT 'a','b' --": {
        status: "فحص أعمدة البيانات",
        msg: "جعلت البحث الأصلي يفشل عمداً وطلبت عرض بيانات من اختيارك فقام السيرفر بإظهار تلك المعلومات وهذا يساعد المهاجم في فهم هيكل النظام الداخلي بدقة."
      },
      "\" OR \"\"=\"": {
        status: "كسر قيود التنصيص",
        msg: "استخدمت علامات تنصيص مزدوجة لكسر حماية النص فقام السيرفر بقبول مدخلاتك كأوامر برمجية وهذا يثبت أن تغيير شكل الرموز لا يحمي النظام الضعيف من الاختراق."
      },
      "' OR 1=1 LIMIT 1 --": {
        status: "استهداف حساب المسؤول",
        msg: "أدخلت شرطاً صحيحاً وطلبت نتيجة واحدة فقط فقام السيرفر بجلب بيانات الحساب الأول في القائمة وهو حساب المدير الرئيسي وهذا يمنح المهاجم وصولاً كاملاً للنظام."
      }
    };

    if (payloads[input]) {
      setLabResponse({ ...payloads[input], isDanger: true });
    } else if (['101', '102', '103'].includes(input)) {
      setLabResponse({
        status: "إدخال آمن",
        msg: "لقد أدخلت رقم سجل صحيح، فقام السيرفر بالبحث عنه وعرضه لك فقط. هذا هو السلوك الطبيعي والآمن للنظام.",
        isDanger: false
      });
    } else {
      setLabResponse({
        status: "بيانات عادية",
        msg: "النظام يعامل هذا الإدخال كنص عادي ويبحث عنه في قاعدة البيانات. لا يوجد تهديد أمني هنا.",
        isDanger: false
      });
    }
  }, [labInput]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 overflow-x-hidden text-right">
      
      {/* 1. القصة - حكاية كويك-باي والكارثة الصامتة */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a2a] to-[#050505] p-6 lg:p-10 rounded-[2rem] border-r-8 border-primary shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl lg:text-4xl">history_edu</span>
            حكاية <span className="text-primary">كويك-باي</span> والكارثة الصامتة 🎭
          </h2>
          <div className="text-lg lg:text-xl text-gray-300 leading-relaxed space-y-4">
            <p>
              تخيل شركة <span className="text-primary">كويك-باي</span> الناشئة، المبرمجون فيها فخورون جداً بنظام الفواتير الجديد. 
              النظام بسيط: الموظف يدخل <span className="text-primary">رقم الفاتورة</span> في صندوق بحث، والسيرفر يذهب فوراً للبحث عنها في قاعدة البيانات وعرضها.
            </p>
            <p>
              في ليلة هادئة، دخل شخص غريب على صفحة التتبع، وبدلاً من كتابة رقم مثل <span className="text-primary">101</span>، كتب رموزاً غريبة: 
              <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded mx-1">' OR '1'='1</span>. 
            </p>
            <p>
              هنا حدث شيء لم يتوقعه أحد.. السيرفر لم يعترض، بل <span className="text-primary font-bold">صدّق</span> أن هذه الرموز هي جزء من الأوامر التي يجب تنفيذها!
            </p>
            <p>
              فجأة، انفتحت شاشة المتصفح لتكشف عن آلاف الفواتير، بيانات بطاقات ائتمان، وعناوين العملاء بالكامل. 
              المبرمج كان يظن أنه صنع <span className="text-primary">صندوق بحث بريء</span>، لكنه في الحقيقة أعطى المهاجم <span className="text-primary font-bold">مفتاحاً رئيسياً</span> لكل أسرار الشركة.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ما هي ثغرة Injection ؟ - شرح مبسط للمفهوم */}
      <section className="space-y-8 animate-in fade-in duration-1000">
        <div className="flex items-center gap-3 text-primary border-r-4 border-primary pr-4">
          <span className="material-symbols-outlined text-3xl">info</span>
          <h2 className="text-2xl lg:text-3xl font-black text-white italic">ما هي ثغرة Injection ؟</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4 hover:border-primary/20 transition-all">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">description</span>
              1️⃣ تعريف الثغرة
            </h3>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
              ببساطة، هي فوضى برمجية تحدث عندما <span className="text-primary font-bold">يخلط</span> الموقع بين مدخلاتك كمستخدم وبين الأوامر التي يجب عليه تنفيذها. فبدلاً من أن يتعامل الخادم مع مدخلاتك كمعلومات عادية، يبدأ بتنفيذها وكأنها جزء من شيفرته الخاصة. أنت هنا كأنك كتبت سطراً في كتاب الخادم، وهو صدّق أنك أنت المؤلف!
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4 hover:border-primary/20 transition-all">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">bolt</span>
              2️⃣ كيف يتم استغلالها؟
            </h3>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
              يبحث المهاجم عن أي مكان يمكنه من خلاله إرسال البيانات (مثل صندوق البحث أو نموذج الدخول). وبدلاً من كتابة اسم عادي، يكتب <span className="text-primary font-bold">أمراً مخفياً</span>. يأخذ الخادم هذا نص ويقوم بدمجه في أوامره الداخلية دون تفكير. وفجأة، يتحول هذا المدخل البسيط إلى مفتاح يفتح أبواب البيانات، أو يمسح السجلات، أو حتى يسيطر على الخادم بالكامل.
            </p>
          </div>
        </div>
      </section>

      {/* 3. لماذا يحدث هذا؟ - أزمة الثقة وتحول المدخلات لمنطق */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white border-b-2 border-primary w-fit pb-1">لماذا يحدث هذا؟</h2>
          <div className="text-gray-300 text-lg lg:text-xl leading-relaxed space-y-5">
            <p>
              تخيل أنك تعطي شخصاً غريباً ورقة وتطلب منه كتابة <span className="text-primary font-bold">اسمه</span> فقط في خانة التوقيع على عقد مهم.. 
              لكنه بدلاً من اسمه، كتب: <span className="text-primary italic font-bold">ويتنازل صاحب العقد عن كل أملاكه لي</span>.
            </p>
            <p>
              إذا قمت باعتماد الورقة دون تدقيق، فمبارك لك.. لقد خسرت كل شيء!
            </p>
            <p>
              هذا هو بالضبط جوهر ثغرة الحقن؛ المبرمج يترك <span className="text-primary font-bold">فراغاً</span> في الكود وينتظر من المستخدم أن يملأه ببيانات عادية (اسم أو رقم). 
              لكن المهاجم الذكي لا يضع بيانات، بل يضع <span className="text-primary font-bold">أوامر برمجية</span> صغيرة ومخفية.
            </p>
            <p>
              المشكلة الحقيقية هي <span className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">أزمة ثقة</span>؛ السيرفر <span className="text-primary font-bold">طيب</span> زيادة عن اللزوم، يظن أن كل ما يكتبه المستخدم هو مجرد كلام بريء، فيقوم بدمجه مباشرة مع أوامره الخاصة.
            </p>
            <p>
              فجأة، يتحول المستخدم من مجرد <span className="text-primary font-bold">زائر</span> إلى <span className="text-primary font-bold">مبرمج شريك</span>.. يكتب قواعد اللعبة ويغير سلوك موقعك كما يشاء.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-[#111] p-6 lg:p-8 rounded-2xl border border-white/5 space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              كيف يفكر المهاجم?
            </h3>
            <p className="text-base text-gray-400 leading-relaxed">
              المهاجم يبحث عن أي مكان يرسل فيه بيانات ثم يبدأ بوضع علامات خاصة مثل <span className="text-white font-mono bg-white/5 px-1">'</span> أو <span className="text-white font-mono bg-white/5 px-1">;</span>.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 lg:p-8 rounded-2xl border border-white/5 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              مراحل تنفيذ الهجوم
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-black text-xs">1</div>
                <p className="text-sm text-gray-400"><span className="text-white font-bold">الاستكشاف:</span> فحص كافة الحقول والروابط التي تستقبل بيانات من المستخدم.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-black text-xs">2</div>
                <p className="text-sm text-gray-400"><span className="text-white font-bold">الاختبار:</span> إدخال رموز خاصة لرؤية رد فعل النظام وهل تظهر أخطاء برمجية.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-black text-xs">3</div>
                <p className="text-sm text-gray-400"><span className="text-white font-bold">الاستغلال:</span> بناء أوامر برمجية مخصصة لتجاوز الحماية وسرقة البيانات.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SUBSECTION: أدوات التلاعب: أشهر حمولات الحقن (Payloads) */}
      <section className="space-y-8 animate-in fade-in duration-1000">
        <div className="flex items-center gap-3 text-primary border-r-4 border-primary pr-4">
          <span className="material-symbols-outlined text-3xl">construction</span>
          <h2 className="text-2xl font-black text-white italic">قاموس المهاجم: 10 حمولات (Payloads) شهيرة</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6" dir="ltr">
          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">1. ' OR 1=1 --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">أشهر حمولة؛ تجعل الشرط البرمجي دائماً صحيحاً، مما يفتح الأبواب المغلقة ويعرض كل بيانات الجدول بضغطة زر.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">2. ' OR '1'='1</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">نسخة بديلة تستخدم النصوص بدلاً من الأرقام لتجاوز بعض الفلاتر البسيطة التي قد تمنع الأرقام المباشرة في بعض الحقول.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">3. admin' --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تسمح للمهاجم بالدخول كحساب المسؤول (admin) مباشرة، حيث تقوم الرموز الأخيرة بإلغاء الجزء الذي يتحقق من كلمة المرور في الكود.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">4. ' UNION SELECT 1, user(), 3 --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تستخدم لدمج نتائج استعلام جديد مع الأصلي؛ هنا يحاول المهاجم معرفة اسم "مستخدم قاعدة البيانات" الحالي لجمع المعلومات الاستخباراتية.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">5. 1; DROP TABLE users --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">حمولة تدميرية؛ تُنهي الاستعلام الحالي وتبدأ أمراً جديداً تماماً لمسح جدول المستخدمين بالكامل من السيرفر إذا كان يدعم الأوامر المتعددة.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">6. ' OR SLEEP(5) --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تُستخدم في الحقن الأعمى؛ إذا استغرق الموقع 5 ثوانٍ للرد، فهذا يثبت للمهاجم وجود الثغرة حتى لو كان الموقع لا يظهر أي أخطاء.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">7. admin' #</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تؤدي نفس غرض الـ (--) ولكنها مخصصة لقواعد بيانات MySQL، حيث يُستخدم الرمز # كعلامة لبداية التعليق وتجاهل بقية كود المبرمج.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">8. ' AND 1=2 UNION SELECT 'a','b' --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تجعل البحث الأصلي يفشل (1=2) وتجبر النظام على إظهار بيانات يحددها المهاجم لاختبار أي الحقول تظهر بياناتها في الصفحة.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">9. " OR ""="</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تُستخدم لكسر الاستعلامات التي تعتمد على علامات التنصيص المزدوجة بدلاً من المفردة، وهي تقنية بديلة لمهاجمة أنواع مختلفة من الأكواد.</p>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">10. ' OR 1=1 LIMIT 1 --</div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-right" dir="rtl">تضمن جلب أول سجل فقط في قاعدة البيانات (الذي غالباً ما يكون هو حساب المدير الرئيسي) لضمان نجاح الاختراق بأقل ضجيج ممكن.</p>
          </div>
        </div>
      </section>

      {/* 3. مختبر الحقن التفاعلي */}
      <section className="bg-surface-dark p-6 lg:p-10 rounded-[3rem] border border-white/10 shadow-inner space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-4xl animate-pulse">terminal</span>
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-wider italic">مختبر الحقن (Injection Lab)</h2>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border-r-4 border-primary">
            <h3 className="text-lg font-bold text-white mb-2 italic">وصف المختبر</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              هذا المختبر يحاكي نظاماً بسيطاً للبحث عن المستخدمين في قاعدة بيانات. هدفنا هو اختبار كيف سيتعامل "منطق السيرفر" مع مدخلاتك. هل سيعاملها كبيانات بريئة، أم سيسمح لها بتغيير مسار الأوامر؟
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border-r-4 border-blue-400">
            <h3 className="text-lg font-bold text-white mb-2 italic">طريقة الاستخدام</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              قم بنسخ أي من "الحمولات العشر" المذكورة في القسم السابق وضعها في صندوق الإدخال أدناه. لاحظ كيف ستتغير استجابة النظام بناءً على الرموز التي استخدمتها.
            </p>
          </div>
        </div>
        
        <div className="bg-background-dark p-8 rounded-[2.5rem] border border-primary/20 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <label className="text-gray-400 text-sm font-bold block text-center mb-2">أدخل payload للاختبار:</label>
            <div className="relative group">
              <input 
                type="text" 
                value={labInput}
                onChange={(e) => setLabInput(e.target.value)}
                placeholder="جرب: ' OR 1=1 --"
                className="w-full bg-black/60 border-2 border-white/10 rounded-2xl px-8 py-5 text-primary font-mono outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-center text-xl shadow-inner"
                dir="ltr"
              />
              <div className="absolute bottom-2 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-primary">keyboard_command_key</span>
              </div>
            </div>
          </div>

          <div className="min-h-[220px] flex items-center justify-center relative">
            {!labResponse ? (
              <div className="text-center space-y-4 opacity-30">
                <span className="material-symbols-outlined text-6xl">leak_remove</span>
                <p className="text-sm font-mono tracking-widest uppercase">Waiting for payload input...</p>
              </div>
            ) : (
              <div className="w-full max-w-3xl animate-in zoom-in duration-500">
                <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-700 bg-black/80 shadow-2xl ${labResponse.isDanger ? 'border-severity-critical shadow-severity-critical/20' : 'border-primary shadow-primary/20'}`}>
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-4xl animate-bounce ${labResponse.isDanger ? 'text-severity-critical' : 'text-primary'}`}>
                        {labResponse.isDanger ? 'report' : 'verified_user'}
                      </span>
                      <h4 className={`text-2xl font-black italic tracking-tight ${labResponse.isDanger ? 'text-severity-critical' : 'text-primary'}`}>
                        {labResponse.status}
                      </h4>
                    </div>
                    <div className={`w-full p-1 rounded-2xl border mb-2 ${labResponse.isDanger ? 'bg-severity-critical/20 border-severity-critical/30 animate-pulse' : 'bg-primary/20 border-primary/30'}`}>
                      <div className={`p-5 rounded-xl border italic ${labResponse.isDanger ? 'bg-severity-critical/10 border-severity-critical/20' : 'bg-primary/10 border-primary/20'}`}>
                        <p className="text-gray-100 text-lg lg:text-xl leading-relaxed font-black">
                          {labResponse.msg}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${labResponse.isDanger ? 'bg-severity-critical/20 text-severity-critical border-severity-critical/30' : 'bg-primary/20 text-primary border-primary/30'}`}>
                         {labResponse.isDanger ? 'DANGER: INJECTION_DETECTED' : 'SYSTEM_LOG: SAFE_INPUT'}
                       </span>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${labResponse.isDanger ? 'bg-severity-critical/20 text-severity-critical border-severity-critical/30' : 'bg-primary/20 text-primary border-primary/30'}`}>
                         {labResponse.isDanger ? 'LOGIC_COMPROMISED' : 'LOGIC_STABLE'}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Learning Outcome */}
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-[2.5rem] text-center space-y-4">
          <h3 className="text-xl font-bold text-white italic">ماذا تعلمنا من هذه التجربة؟</h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            لقد لاحظت كيف أن الرموز البسيطة غيرت سلوك النظام تماماً؟ في الحقيقة، المهاجم لا يحتاج لبرامج معقدة، هو فقط يحتاج لـ <span className="text-primary font-bold italic">إقناع الخادم</span> بأن مدخلاتك هي جزء من منطقه البرمجي.
          </p>
          <div className="pt-4 border-t border-primary/10 space-y-4">
             <p className="text-primary font-black text-2xl uppercase tracking-[0.1em] animate-pulse">فكر في هذا: كيف يمكنك كمبرمج أن تمنع السيرفر من "تصديق" هذه الحمولات؟</p>
             <p className="text-gray-400 text-xl font-medium italic leading-relaxed">تذكر دائماً أن هجمات الحقن في العالم الحقيقي تبدأ بطلبات بسيطة وتنتهي بتسريب قواعد بيانات ضخمة.</p>
          </div>
        </div>
      </section>

      {/* 4. تحليل الشيفرة */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl lg:text-3xl font-black text-white">تحليل الشيفرة</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical">
              <span className="material-symbols-outlined text-2xl lg:text-3xl">report_problem</span>
              <h3 className="text-lg lg:text-xl font-bold uppercase tracking-widest">كود مخدوع (Vulnerable)</h3>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-xl">
              <div className="bg-[#080808] p-5 lg:p-8 font-mono text-sm lg:text-base leading-relaxed overflow-x-auto text-left min-w-0" dir="ltr">
                <pre>
                  <code className="block">
                    <span className="text-purple-400">const</span> <span className="text-red-400">query</span> = <span className="text-green-400">`SELECT * FROM users WHERE id = ${'${id}'}`</span>;<br/>
                    <span className="text-blue-400">db</span>.<span className="text-yellow-400">execute</span>(<span className="text-red-400">query</span>);
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed pr-4 border-r-2 border-severity-critical/30 italic">
              هذا الكود يثق في المستخدم زيادة عن اللزوم! بمجرد دمج المتغير مباشرة داخل النص، أنت سمحت للمهاجم إنه يعيد كتابة قواعد اللعبة ويغير مسار الاستعلام بالكامل لمصلحته.
            </p>
          </div>

          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-2xl lg:text-3xl">verified_user</span>
              <h3 className="text-lg lg:text-xl font-bold uppercase tracking-widest">كود مدرك (Secure)</h3>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-xl">
              <div className="bg-[#080808] p-5 lg:p-8 font-mono text-sm lg:text-base overflow-x-auto text-left min-w-0" dir="ltr">
                <pre>
                  <code className="block">
                    <span className="text-purple-400">const</span> <span className="text-red-400">query</span> = <span className="text-green-400">'SELECT * FROM users WHERE id = ?'</span>;<br/>
                    <span className="text-blue-400">db</span>.<span className="text-yellow-400">execute</span>(<span className="text-red-400">query</span>, [<span className="text-red-400">id</span>]);
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed pr-4 border-r-2 border-primary/30 italic">
              هنا فصلنا "الخطة" عن "البيانات". باستخدام علامة الاستفهام كحجز مكان، إنت بتخبر قاعدة البيانات: "استعدي لاستقبال معلومة، بس عامليها كمجرد نص عادي ولا تنفذينها كأمر أبدًا مهما كان محتواها".
            </p>
          </div>
        </div>

        <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center animate-pulse">
          <p className="text-primary font-bold text-lg italic">
            💡 فكر فيها كذا: قبل ما تدمج أي نص من المستخدم في كودك.. اسأل نفسك: "لو المستخدم كتب كود هنا، هل سيرفري بيفهمه كأمر؟" إذا كان الجواب نعم، فأنت في خطر!
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
          <button 
            onClick={() => {
              const tabButtons = Array.from(document.querySelectorAll('button'));
              const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
              if (labBtn) (labBtn as HTMLElement).click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-green-600 text-white font-black px-8 py-3 cursor-pointer"
          >
            انتقل إلى القسم العملي
          </button>
        </div>
      </section>

    </div>
  );
};
