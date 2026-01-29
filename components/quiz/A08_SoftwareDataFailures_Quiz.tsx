
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

interface QuizStep {
  type: 'intro' | 'binary' | 'multiple' | 'analytical';
  story: React.ReactNode;
  question?: string;
  options?: {
    text: string;
    feedback: React.ReactNode;
    isCorrect: boolean;
  }[];
}

const A08_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6 text-right leading-[1.8]">
        <p className="text-xl">
          أنت الآن مهندس <span className="text-severity-high font-bold">DevOps</span> في شركة تقنية كبرى. النظام يحتاج لتحديث عاجل لسد ثغرة أمنية. يظهر لك إشعار: <span className="text-severity-high font-bold">تحديث متاح من المصدر الرسمي</span>.
        </p>
        <p className="text-xl">
          الوقت يداهمك، والضغوط من الإدارة كبيرة لإنهاء المهمة. ضغطت زر <span className="text-severity-high font-bold">Update</span> واطمأن قلبك لأنك قمت بالصواب.. لكن، هل تأكدت من أن ما وصلك هو فعلاً ما أرسله المطور؟
        </p>
        <p className="text-xl italic border-r-4 border-severity-high pr-6">
          تذكر: لم يخدعك المهاجم بالقوة.. أنت فقط صدّقته دون دليل.
        </p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: "وصلك رابط لتحديث مكتبة برمجية عبر بروتوكول HTTP العادي. الرابط يبدو صحيحاً واسم المكتبة مألوف جداً.",
    question: "هل تعتبر تحميل هذا التحديث قراراً موثوقاً؟",
    options: [
      {
        text: "موثوق، طالما أن المصدر معروف لي مسبقاً.",
        feedback: (
          <span>
            خطأ فادح! غياب التشفير <span className="text-severity-critical font-bold">HTTPS</span> يسمح لهجمات <span className="text-severity-critical font-bold">Man-in-the-Middle</span> بتغيير محتوى الملف أثناء الطريق. أنت هنا تثق في <span className="text-severity-critical font-bold">الاسم</span> وتتجاهل <span className="text-severity-critical font-bold">الطريق</span>.
          </span>
        ),
        isCorrect: false
      },
      {
        text: "غير موثوق، لأن الطريق غير مشفر ويمكن التلاعب بالملف.",
        feedback: "أحسنت! الأمان يقتضي أن يكون كل من المصدر والطريق محميين. الملف قد يصلك ملغماً دون أن تشعر بتغير حجمه أو اسمه.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "زميلك في قسم التطوير أرسل لك سكربت (Script) جديد عبر تطبيق Slack لزيادة أداء السيرفر، وقال لك: هذا السكربت سينقذنا جميعاً.",
    question: "هل تقوم بتشغيل السكربت فوراً بناءً على ثقتك في زميلك؟",
    options: [
      {
        text: "نعم، زميلي موثوق وهو من كتب الكود بنفسه.",
        feedback: "تفكير عاطفي وليس أمنياً. ماذا لو تم اختراق حساب زميلك؟ ماذا لو تم تعديل الملف في Slack؟ الثقة في الأشخاص لا تعني سلامة (Integrity) البيانات.",
        isCorrect: false
      },
      {
        text: "لا، يجب التحقق من بصمة الملف (Hash) أو مراجعته يدوياً أولاً.",
        feedback: (
          <span>
            رائع! هذا هو مبدأ <span className="text-severity-high font-bold">Zero Trust</span>. أنت لا تشكك في زميلك، بل تتأكد من أن البيانات التي بين يديك لم تتعرض لأي تلاعب خارجي.
          </span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "وجدت تحديثاً لبرنامج حماية (Antivirus)، لكن الشركة لم توفر توقيعاً رقمياً (Digital Signature) لهذا الإصدار تحديداً.",
    question: "هل تثق في سلامة هذا التحديث؟",
    options: [
      {
        text: "لا، غياب التوقيع يعني غياب إثبات الهوية والنزاهة.",
        feedback: "بالضبط! التوقيع الرقمي هو الختم الذي يضمن أن الملف جاء من الشركة ولم يُفتح في الطريق. غيابه يعني أن أي شخص قد يكون وضع بصمته فيه.",
        isCorrect: true
      },
      {
        text: "نعم، طالما أن البرنامج يعمل بشكل طبيعي بعد التثبيت.",
        feedback: (
          <span>
            خطأ. البرمجيات الخبيثة الحديثة صامتة. هي تترك البرنامج يعمل <span className="text-severity-critical font-bold">طبيعياً</span> بينما تقوم بأعمالها التخريبية في الخلفية.
          </span>
        ),
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: "النظام يقوم بتنزيل Plugins تلقائياً من مستودع (Repository) عام مشهور جداً.",
    question: "هل مجرد شهرة المستودع تكفي لاعتبار التحديثات موثوقة؟",
    options: [
      {
        text: "نعم، المستودعات الكبرى تخضع لرقابة صارمة.",
        feedback: (
          <span>
            للأسف لا. هجمات <span className="text-severity-critical font-bold">Supply Chain</span> تستهدف المستودعات الكبرى لزرع ملفات خبيثة في مكتبات مشهورة. الشهرة لا تحمي الـ <span className="text-severity-critical font-bold">Integrity</span>.
          </span>
        ),
        isCorrect: false
      },
      {
        text: "لا، يجب تثبيت الإصدارات (Pinning) والتحقق من الـ Checksums.",
        feedback: "دقيق جداً! أنت تسيطر على ما يدخل نظامك وتتأكد من أنه النسخة المحددة التي تمت مراجعتها مسبقاً.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'multiple',
    story: "تريد بناء نظام تحديث آمن لأجهزة المستخدمين في شركتك.",
    question: "ما هي الطريقة الأكثر فعالية لضمان أن التحديث لم يتم التلاعب به؟",
    options: [
      { text: "تغيير اسم الملف كل يوم.", feedback: "هذا مجرد تمويه ولا يمنع التلاعب بالمحتوى.", isCorrect: false },
      { text: "استخدام قناة اتصال مشفرة فقط.", feedback: "جيد، لكنه يحمي الطريق فقط ولا يحمي من اختراق المصدر نفسه.", isCorrect: false },
      { text: "التوقيع الرقمي (Digital Signature) والتحقق منه في جهاز المستخدم.", feedback: "هذا هو الحل الذهبي! التوقيع يربط الملف بهوية المصدر ويضمن عدم تغير بت واحد فيه.", isCorrect: true },
      { text: "جعل حجم الملف كبيراً جداً ليصعب رفعه.", feedback: "غير منطقي ولا علاقة له بالأمن.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تستخدم خط إنتاج برمجيات (CI/CD Pipeline) يقوم بسحب الكود وبنائه تلقائياً.",
    question: "أين تكمن الخطورة في الـ Integrity داخل هذه السلسلة؟",
    options: [
      { text: "في سرعة عملية البناء.", feedback: "السرعة ميزة وليست خطراً أمنياً مباشراً هنا.", isCorrect: false },
      { text: "في الثقة العمياء في أن الكود المسحوب هو الكود الأصلي دون مراجعة البصمة.", feedback: "رائع! إذا تم اختراق مخزن الكود، الـ Pipeline سيقوم بناء ونشر كود خبيث وكأنه رسمي تماماً.", isCorrect: true },
      { text: "في استخدام لغة برمجة قديمة.", feedback: "هذا يخص ثغرات أخرى، وليس الـ Integrity للبيانات.", isCorrect: false },
      { text: "في عدم وجود واجهة رسومية للـ Pipeline.", feedback: "مجرد تفصيل تقني لا يؤثر على الأمان الجوهري.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تطبيقك يقوم باستقبال بيانات مشفرة (Serialized Objects) من المستخدم لإعادة استخدامها في السيرفر.",
    question: "كيف تحمي الـ Integrity لهذه البيانات الحساسة؟",
    options: [
      { text: "تشفير البيانات بكلمة سر بسيطة.", feedback: (<span>التشفير لا يمنع المبدل من إعادة إرسال بيانات قديمة صحيحة <span className="text-severity-critical font-bold">Replay Attack</span>.</span>), isCorrect: false },
      { text: "استخدام (MAC) أو توقيع رقمي للبيانات قبل إرسالها للعميل.", feedback: "عبقري! أنت تضع ختم أمان على البيانات، وإذا حاول المستخدم تغيير أي حرف، السيرفر سيرفضها فوراً.", isCorrect: true },
      { text: "طلب من المستخدم عدم لمس البيانات.", feedback: "تفكير ساذج.. المهاجم لن يستمع لنصيحتك.", isCorrect: false },
      { text: "تقليل حجم البيانات المرسلة.", feedback: "لا يمنع التلاعب بالبيانات المتبقية.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تقوم بتحميل مكتبة JavaScript من رابط خارجي (CDN) لتسريع الموقع.",
    question: "ما هي خاصية التي تضمن للمتصفح أن الملف الخارجي سليم تماماً؟",
    options: [
      { text: "Attribute: async", feedback: "هذا يخص سرعة التحميل فقط.", isCorrect: false },
      { text: "Subresource Integrity (SRI)", feedback: "صحيح! المتصفح سيقارن بصمة الملف المحمل مع البصمة التي وضعتها أنت في الكود، ويرفضه لو اختلفا.", isCorrect: true },
      { text: "Cross-Origin Resource Sharing (CORS)", feedback: "هذا يخص صلاحيات الوصول وليس سلامة المحتوى.", isCorrect: false },
      { text: "Cache-Control", feedback: "هذا يخص التخزين المؤقت فقط.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "أنت بصدد استلام نسخة احتياطية (Backup) ضخمة لقاعدة البيانات من طرف خارجي.",
    question: "ما هي الخطوة الأولى المقدسة قبل البدء في استعادتها؟",
    options: [
      { text: "فتح الملف لرؤية ما بداخله.", feedback: "خطر! الملف قد يحتوي على أكواد تنفذ بمجرد الفتح.", isCorrect: false },
      { text: "التحقق من بصمة الهاش (Hash Verification) المقدمة من المصدر.", feedback: "هذا هو السلوك الاحترافي. أنت تتأكد أن الملف الذي وصلك هو نسخة طبق الأصل من الذي أُرسل.", isCorrect: true },
      { text: "تغيير اسم الملف ليتناسب مع قاعدة بياناتك.", feedback: "إجراء تنظيمي لا يحمي من التلاعب.", isCorrect: false },
      { text: "البدء في الاستعادة فوراً لتوفير الوقت.", feedback: "مخاطرة كبرى قد تؤدي لتلويث قاعدة بياناتك بالكامل.", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: "النظام تم تحديثه بنجاح ولم يظهر أي خطأ برمجياً. لكن بعد ساعات، لاحظت أن السيرفر بدأ يرسل بيانات لموقع مجهول في الصين. التحديث كان يحتوي على باب خلفي.",
    question: "أين انكسرت الـ Integrity في هذه الرحلة؟ وكيف نجا المهاجم؟",
    options: [
      {
        text: "انكسرت في الكود البرمجي، ونجا المهاجم لذكائه في التشفير.",
        feedback: "خطأ. المشكلة ليست في ذكاء المهاجم، بل في فشل العملية الأمنية للتحقق.",
        isCorrect: false
      },
      {
        text: "انكسرت في عملية التحقق من المصدر، ونجا المهاجم لأننا وثقنا في التحديث دون مراجعة توقيعه الرقمي.",
        feedback: "تحليل سليم 100%. التلاعب حدث في مرحلة التوزيع (Distribution) ونظامك قبله لأنه مبرمج على الثقة العمياء.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: (
      <span>
        في نهاية هذا التحدي، أدركت أن معظم الاختراقات الكبرى حدثت بسبب تحديثات رسمية تم التلاعب بها في الطريق.
      </span>
    ),
    question: "بصفتك الآن Trust-but-Verify Mindset، ما هي الحقيقة الكبرى؟",
    options: [
      {
        text: "أن الثقة هي أكبر ثغرة أمنية، والـ Integrity هي الدليل الوحيد على الأمان.",
        feedback: (
          <span>
            هذا هو لب الموضوع! لا تثق في أي بايت <span className="text-severity-high font-bold">Byte</span> يدخل نظامك إلا إذا قدم دليلاً رياضياً <span className="text-severity-high font-bold">Hash/Signature</span> على سلامته.
          </span>
        ),
        isCorrect: true
      },
      {
        text: "أن استخدام البرامج مفتوحة المصدر هو الحل الوحيد للـ Integrity.",
        feedback: "غير صحيح. البرامج مفتوحة المصدر يمكن التلاعب بها أيضاً في مستودعاتها.",
        isCorrect: false
      }
    ]
  }
];

export const A08_SoftwareDataFailures_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A08_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A08_QUIZ_DATA.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
    } else {
      setShowFinished(true);
    }
  };

  const getPersona = () => {
    const totalQuestions = A08_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Trust-but-Verify Mindset", msg: "أنت حارس يقظ للبيانات. تدرك أن سلامة النظام تعتمد على التشكيك المستمر والتحقق الرياضي من كل ما يدخل إليه." };
    if (ratio >= 0.4) return { title: "Integrity Aware", msg: "لديك وعي جيد بمخاطر التلاعب، لكنك قد تقع أحياناً في فخ الثقة في المصدر المألوف دون التحقق من الختم الرقمي." };
    return { title: "Blind Truster", msg: "أنت تثق في التحديثات والبيانات أكثر من اللازم. المهاجم لا يحتاج لاختراقك، هو فقط ينتظرك لتفتح له الباب بنفسك." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-12 rounded-[3.5rem] border-2 border-severity-high/20 text-center space-y-10 shadow-[0_0_50px_rgba(255,71,87,0.15)] max-w-4xl mx-auto">
        <div className="w-28 h-28 bg-severity-high/10 rounded-full flex items-center justify-center mx-auto border-2 border-severity-high/30 shadow-glow-red">
          <span className="material-symbols-outlined text-severity-high text-6xl">verified_user</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-severity-high font-black text-2xl">نتيجتك النهائية: {score} من {A08_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto italic font-medium">
          "{persona.msg}"
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-14 py-5 bg-severity-high text-white font-black rounded-2xl hover:shadow-[0_0_30px_rgba(255,71,87,0.4)] transition-all uppercase tracking-widest text-sm"
        >
          أريد تحدي ثغرة أخرى!
        </button>
      </div>
    );
  }

  const step = A08_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-10 max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-3">
        {A08_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 flex-1 rounded-full transition-all duration-700 ${idx <= currentStep ? 'bg-severity-high shadow-glow-red' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[3.5rem] border-2 border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-severity-high/10 to-transparent p-10 border-b border-white/5 relative">
          <div className="flex items-center gap-4 text-severity-high mb-6">
            <span className="material-symbols-outlined animate-pulse text-3xl">lock_reset</span>
            <span className="text-xs font-black uppercase tracking-[0.4em] font-mono">Integrity Audit Log // Phase_{currentStep + 1}</span>
          </div>
          <div className="text-2xl text-gray-200 leading-relaxed font-medium">
            {step.story}
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-severity-high/30 to-transparent"></div>
        </div>

        {/* Question Area */}
        <div className="p-10 space-y-10">
          {step.type === 'intro' ? (
            <div className="flex justify-center pt-4">
              <button 
                onClick={nextStep}
                className="px-16 py-5 bg-severity-high text-white font-black rounded-2xl hover:shadow-[0_0_40px_rgba(255,71,87,0.5)] transition-all flex items-center gap-4 text-lg active:scale-95 uppercase tracking-widest"
              >
                <span>ابدأ مراجعة الثقة</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-black text-white text-right leading-tight italic">
                {step.question}
              </h3>

              <div className={`grid grid-cols-1 ${step.type === 'binary' ? 'md:grid-cols-2' : ''} gap-6`}>
                {step.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`group text-right p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex items-start gap-6
                      ${selectedOption === null ? 'border-white/5 hover:border-severity-high/40 hover:bg-severity-high/5 cursor-pointer' : 
                        selectedOption === idx ? (opt.isCorrect ? 'border-severity-high bg-severity-high/10 shadow-glow-red' : 'border-severity-critical bg-severity-critical/10') : 
                        'opacity-40 border-white/5 cursor-default'}
                    `}
                  >
                    <div className={`mt-1 w-8 h-8 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-500
                      ${selectedOption === idx ? (opt.isCorrect ? 'border-severity-high bg-severity-high' : 'border-severity-critical bg-severity-critical') : 'border-white/20'}
                    `}>
                       {selectedOption === idx && <span className="material-symbols-outlined text-xs text-black font-black">{opt.isCorrect ? 'check' : 'close'}</span>}
                    </div>
                    <span className="text-xl font-bold text-gray-300 group-hover:text-white leading-relaxed">{opt.text}</span>
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-8 rounded-[3rem] animate-in slide-in-from-top-6 duration-700 border-2
                  ${step.options?.[selectedOption].isCorrect ? 'bg-severity-high/5 border-severity-high/20 text-severity-high shadow-glow-red' : 'bg-severity-critical/5 border-severity-critical/20 text-severity-critical shadow-glow-red'}
                `}>
                  <div className="flex items-start gap-5">
                    <span className={`material-symbols-outlined text-4xl mt-1 ${step.options?.[selectedOption].isCorrect ? 'text-severity-high' : 'text-severity-critical'}`}>
                      {step.options?.[selectedOption].isCorrect ? 'verified' : 'info'}
                    </span>
                    <p className="text-xl leading-relaxed font-medium">
                      {step.options?.[selectedOption].feedback}
                    </p>
                  </div>
                  <div className="flex justify-end mt-8">
                    <button 
                      onClick={nextStep}
                      className={`px-12 py-3 font-black rounded-xl hover:brightness-110 transition-all shadow-2xl text-sm uppercase tracking-widest ${step.options?.[selectedOption].isCorrect ? 'bg-severity-high text-white' : 'bg-severity-critical text-white'}`}
                    >
                      {currentStep === A08_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
