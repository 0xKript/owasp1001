
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

interface QuizStep {
  type: 'intro' | 'binary' | 'multiple' | 'analytical';
  story: React.ReactNode;
  question?: string;
  options?: {
    text: string;
    feedback: string;
    isCorrect: boolean;
  }[];
}

const A04_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6">
        <p className="text-xl">أنت الآن في دور المسؤول عن تصميم الأنظمة لشركة كبرى.</p>
        <p className="text-xl text-gray-400">المشروع يسير بسرعة مذهلة والجميع سعيد لأن النظام يعمل بسلاسة، كما أن الكود المكتوب نظيف وخالٍ تماماً من الأخطاء التقنية المعتادة.</p>
        
        <div className="h-px bg-white/5 w-full my-6"></div>
        
        <p className="text-xl italic font-bold">لكن هناك تساؤل يحتاج إلى إجابة، فهل النظام آمن من الناحية التصميمية؟</p>
        
        <p className="text-xl">تذكر دائماً أن أخطر الثغرات هي التي لا تظهر كأخطاء برمجية، بل تظهر كأنها ميزات عادية يمكن استغلالها.</p>
        
        <p className="text-xl font-bold text-white">هل أنت مستعد للبدء في تحليل المخطط الهندسي واكتشاف الثغرات الكامنة في صلب التصميم؟</p>
      </div>
    ),
  },
  // Phase 1: Binary Design Checks (5 Questions)
  {
    type: 'binary',
    story: <span>قررت إضافة ميزة <span className="text-severity-critical">استرجاع الحساب</span> عبر أسئلة الأمان التقليدية (مثل: ما هو اسم حيوانك الأليف؟). المطور يقول أنها ميزة محبوبة وسهلة الاستخدام.</span>,
    question: "هل هذا القرار التصميمي سليم أمنياً؟",
    options: [
      {
        text: "نعم، هي وسيلة فعالة لاسترجاع الحساب بسرعة.",
        feedback: "خطأ تصميمي! هذه المعلومات غالباً ما تكون عامة أو يمكن تخمينها عبر الهندسة الاجتماعية. التصميم الآمن يجب أن يعتمد على وسائل يصعب تخمينها مثل الـ MFA أو روابط البريد الموقوتة.",
        isCorrect: false
      },
      {
        text: "لا، هذا التصميم يخلق نقطة ضعف تعتمد على معلومات عامة.",
        feedback: "أحسنت! أنت تدرك أن سهولة الاستخدام لا يجب أن تأتي على حساب أمان التصميم. أسئلة الأمان هي ثغرة تصميمية كلاسيكية.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: <span>في صفحة الدفع، يقوم النظام بإرسال السعر الإجمالي في حقل <span className="text-severity-critical">مخفي</span> (Hidden Field) من المتصفح إلى السيرفر لتسريع عملية المعالجة.</span>,
    question: "هل تثق في هذا التصميم لنظام مالي؟",
    options: [
      {
        text: "نعم، طالما أن الحقل مخفي فلا يمكن للمستخدم العادي رؤيته.",
        feedback: "تصميم كارثي! المهاجم سيقوم بتعديل القيمة في المتصفح قبل الإرسال. أي تصميم يعتمد على ثقة السيرفر في بيانات حساسة قادمة من العميل هو Insecure Design.",
        isCorrect: false
      },
      {
        text: "لا، يجب أن يكون السيرفر هو المصدر الوحيد للسعر الحقيقي.",
        feedback: "دقيق! في الـ Secure Design، العميل يرسل فقط (ماذا يريد)، والسيرفر هو من يحدد (بكم). لا تترك Boundary الثقة مفتوحاً للمستخدم.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: <span>النظام يسمح للمستخدمين الجدد باختيار أي اسم مستخدم (Username)، وعندما يختار أحدهم اسماً موجوداً بالفعل، يخبره النظام فوراً: <span className="text-severity-critical">هذا الاسم مأخوذ</span>.</span>,
    question: "هل هذا التصميم (User Enumeration) يعتبر مخاطرة؟",
    options: [
      {
        text: "لا، هي ميزة ضرورية لمساعدة المستخدم في التسجيل.",
        feedback: "من وجهة نظر تجارية نعم، لكن أمنياً هي ثغرة تصميم تسمح للمهاجم ببناء قائمة بأسماء مستخدمي النظام لديك لاستخدامها في هجمات أخرى.",
        isCorrect: false
      },
      {
        text: "نعم، التصميم يكشف معلومات داخلية عن قاعدة البيانات.",
        feedback: "رؤية ثاقبة. التصميم الآمن يحاول دائماً تقليل المعلومات المسربة Information Leakage حتى في أبسط العمليات.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: <span>النظام يسمح برفع صور البروفايل، ولمنع الاختراق، يقوم الكود بالتأكد من أن امتداد الملف هو <span className="text-severity-critical">.jpg</span> فقط.</span>,
    question: "هل هذا التصميم كافٍ لمنع رفع ملفات خبيثة؟",
    options: [
      {
        text: "لا، الامتداد يمكن تزييفه ويجب فحص محتوى الملف نفسه.",
        feedback: "صحيح! الاعتماد على الاسم فقط هو فشل في تصميم طبقات الحماية. المهاجم قد يرفع ملف Shell ويسميه photo.jpg.php إذا كان التصميم لا يعالج الملفات بحذر.",
        isCorrect: true
      },
      {
        text: "نعم، طالما أننا منعنا الملفات التنفيذية فنحن بأمان.",
        feedback: "خطأ. المهاجمون يجدون طرقاً للالتفاف على فلاتر الامتدادات البسيطة. التصميم يجب أن يكون أكثر عمقاً Defense in Depth.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: <span>تم تصميم نظام العروض بحيث يمكن استخدام كود الخصم (Promo Code) مرة واحدة فقط لكل حساب، دون تحديد عدد مرات المحاولة الخاطئة.</span>,
    question: "هل ترى في هذا التصميم ثغرة منطق أعمال (Business Logic Abuse)؟",
    options: [
      {
        text: "نعم، هذا يسمح للمهاجمين بتجربة ملايين الأكواد عشوائياً.",
        feedback: "أحسنت! هذا ما نسميه غياب الـ Rate Limiting في مرحلة التصميم. المهاجم سيستخدم Bruteforce للحصول على أكواد خصم مجانية.",
        isCorrect: true
      },
      {
        text: "لا، طالما أن الكود سيعمل مرة واحدة فالمخاطرة مقبولة.",
        feedback: "خطأ. التفكير في النجاح فقط ونسيان تكرار الفشل هو جوهر الـ Insecure Design.",
        isCorrect: false
      }
    ]
  },
  // Phase 2: Design Tradeoffs (4 Questions)
  {
    type: 'multiple',
    story: <span>تريد تصميم نظام <span className="text-severity-critical">تغيير البريد الإلكتروني</span> للمستخدمين. أي خيار هو الأكثر أماناً تصميماً (Secure by Design)؟</span>,
    question: "اختر التصميم الأمثل:",
    options: [
      { text: "تغيير الإيميل فوراً بمجرد أن يطلبه المستخدم من لوحة التحكم.", feedback: "خطير جداً! إذا تم اختراق الجلسة، سيفقد المستخدم حسابه للأبد في ثانية.", isCorrect: false },
      { text: "إرسال رابط تأكيد للإيميل الجديد فقط.", feedback: "غير كافٍ. ماذا لو كان الإيميل الجديد هو إيميل المهاجم؟ المهاجم سيؤكده وينتهي الأمر.", isCorrect: false },
      { text: "إرسال رابط تأكيد للإيميل القديم والجديد معاً، ولا يتم التغيير إلا بموافقة الطرفين.", feedback: "هذا هو التصميم المتين! أنت تفترض الأسوأ (Threat Modeling) وتضع حواجز تمنع الاستيلاء السهل على الحسابات.", isCorrect: true },
      { text: "طلب كلمة السر الحالية فقط sebelum التغيير.", feedback: "جيد، لكنه لا يمنع سرقة الحساب إذا كانت كلمة السر مكشوفة.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: <span>النظام يتيح ميزة <span className="text-severity-critical">مشاركة الملفات عبر رابط</span>. كيف ستصمم هذه الروابط؟</span>,
    question: "ما هو القرار التصميمي الذي يراعي الـ Trust Boundary؟",
    options: [
      { text: "استخدام رقم تسلسلي بسيط مثل file/101, file/102.", feedback: "كارثة! أي شخص سيقوم بتغيير الرقم ليصل لكل ملفات المستخدمين الآخرين (IDOR).", isCorrect: false },
      { text: "استخدام رابط يحتوي على اسم المستخدم والملف.", feedback: "سهل التخمين ولا يوفر أي حماية حقيقية.", isCorrect: false },
      { text: "توليد رابط عشوائي طويل جداً (UUID) مع تحديد تاريخ انتهاء صلاحية وكلمة مرور اختيارية.", feedback: "تصميم ممتاز! أنت تدرك أن الرابط نفسه هو مفتاح ويجب أن يكون غير قابل للتخمين ومؤقت.", isCorrect: true },
      { text: "جعل الملفات متاحة فقط لمن يملك الرابط دون أي قيود أخرى.", feedback: "تصميم متوسط الخطورة، فقد يتسرب الرابط ويبقى الملف مكشوفاً للأبد.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: <span>أنت تصمم نظام <span className="text-severity-critical">النقاط</span> (Loyalty Points). يربح المستخدم نقطة مقابل كل طلب.</span>,
    question: "أين تكمن الثغرة في التصميم إذا كان العميل (Mobile App) هو من يرسل طلب إضافة نقطة بعد نجاح الدفع؟",
    options: [
      { text: "لا توجد ثغرة طالما أن التطبيق مشفر.", feedback: "التشفير لا يمنع المهاجم من محاكاة طلبات الـ API الخاصة بتطبيقك.", isCorrect: false },
      { text: "الثغرة هي اعتماد السيرفر على ثقة عمياء في أن الطلب قادم من عملية شراء حقيقية.", feedback: "رائع! هذا هو Logic Abuse. المهاجم سيكرر إرسال طلب إضافة نقطة آلاف المرات دون شراء أي شيء.", isCorrect: true },
      { text: "الثغرة في سرعة معالجة النقاط.", feedback: "لا، السرعة ليست هي المشكلة الأمنية هنا.", isCorrect: false },
      { text: "الثغرة هي حجم النقاط في قاعدة البيانات.", feedback: "هذا تقليل من شأن المشكلة التصميمية.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: <span>عند تصميم <span className="text-severity-critical">لوحة تحكم المشرفين</span> (Admin Dashboard)، ما هو الإجراء التصميمي الأهم؟</span>,
    question: "اختر الفلسفة الأمنية الأصح:",
    options: [
      { text: "إخفاء الرابط وجعله صعب التخمين.", feedback: "هذا Security by Obscurity وهو ليس أماناً حقيقياً.", isCorrect: false },
      { text: "وضع جدار حماية (WAF) أمامها فقط.", feedback: "جيد، لكنه لا يعالج خلل التصميم الداخلي.", isCorrect: false },
      { text: "عزل اللوحة في شبكة داخلية (VPN) مع فرض MFA وتقييد الوصول حسب الـ IP.", feedback: "تصميم احترافي! أنت تضع طبقات حماية (Defense in Depth) وتفترض أن كلمة السر وحدها ليست كافية.", isCorrect: true },
      { text: "استخدام كلمة سر معقدة جداً للمدير.", feedback: "تفكير سطحي. التصميم يجب أن يحمي حتى لو ضاعت كلمة السر.", isCorrect: false }
    ]
  },
  // Phase 3: Final Design Failure (2 analytical questions)
  {
    type: 'analytical',
    story: (
      <div className="space-y-6">
        <div className="bg-severity-critical/10 p-8 rounded-[2rem] border-r-8 border-severity-critical">
          <p className="text-xl">نظام بنكي يسمح للمستخدمين بـ <span className="text-severity-critical">تحويل الأموال</span> عبر إدخال رقم الحساب والمبلغ.</p>
          <p className="text-xl text-gray-400 mt-4 leading-relaxed">النظام يعمل بدقة، لكنه لا يتحقق مما إذا كان المستخدم يملك رصيداً كافياً <span className="text-severity-critical font-bold">قبل</span> حجز العملية في الطابور (Queue).</p>
        </div>
      </div>
    ),
    question: "لماذا يعتبر هذا Insecure Design وليس مجرد Bug في الكود؟",
    options: [
      {
        text: "لأن المشكلة في سرعة تنفيذ الأوامر البرمجية.",
        feedback: "خطأ. المشكلة أعمق من السرعة.",
        isCorrect: false
      },
      {
        text: "لأن الخلل في تتابع الخطوات المنطقي الذي سمح بحدوث حالة Race Condition تصميماً.",
        feedback: "تحليل معماري ممتاز! أنت تدرك أن الخطأ في الرؤية الكلية لكيفية تدفق البيانات (Workflow)، مما سمح بسحب مبالغ غير موجودة.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: (
      <div className="space-y-8 py-4">
        <p className="text-2xl text-center text-white font-black italic">في نهاية رحلتك كمصمم أنظمة</p>
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-5xl">architecture</span>
          </div>
          <p className="text-xl text-gray-300 text-center leading-relaxed max-w-2xl mx-auto">
            اكتشفت أن معظم الثغرات التي واجهتها كان يمكن تجنبها في مرحلة <span className="text-severity-critical">الرسم</span> (Whiteboard).
          </p>
        </div>
        <div className="h-px bg-white/5 w-full my-4"></div>
      </div>
    ),
    question: "بصفتك الآن Risk-Aware Designer، ما هو الدرس الأكبر؟",
    options: [
      {
        text: "أن الأمان يبدأ بـ Threat Modeling (توقع التهديدات) قبل كتابة أول سطر كود.",
        feedback: "هذا هو لب الموضوع! Insecure Design هو نتيجة مباشرة لتجاهل التفكير في المهاجم أثناء مرحلة التخطيط.",
        isCorrect: true
      },
      {
        text: "أن البرمجة بلغات حديثة تحميك تلقائياً من أخطاء التصميم.",
        feedback: "للأسف لا. لغة البرمجة تحميك من أخطاء الذاكرة، لكنها لا تفكر بدلاً منك في منطق الأعمال.",
        isCorrect: false
      }
    ]
  }
];

export const A04_InsecureDesign_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A04_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A04_QUIZ_DATA.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
    } else {
      setShowFinished(true);
    }
  };

  const retakeQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setShowFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPersona = () => {
    const totalQuestions = A04_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Secure-by-Design Mindset", msg: "أنت لست مجرد مبرمج، أنت معماري أنظمة تدرك أن الأمان يبدأ من الورقة والقلم. رؤيتك للتهديدات استثنائية." };
    if (ratio >= 0.4) return { title: "Risk-Aware Designer", msg: "لديك وعي جيد بالمخاطر التصميمية، لكن تذكر دائماً أن المهاجم يبحث عن الثقوب المنطقية في أبسط الميزات." };
    return { title: "Feature-Driven Thinker", msg: "أنت تركز على نجاح الميزة وسهولتها، وتنسى أن المنطق الجميل قد يكون باباً خلفياً سهلاً للمهاجمين. ابدأ بممارسة الـ Threat Modeling." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-severity-high/20 text-center space-y-8 shadow-[0_0_30px_rgba(255,71,87,0.1)]">
        <div className="w-24 h-24 bg-severity-high/10 rounded-full flex items-center justify-center mx-auto border border-severity-high/30">
          <span className="material-symbols-outlined text-severity-high text-5xl">architecture</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-severity-high font-bold">نتيجتك: {score} من {A04_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          "{persona.msg}"
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-10 py-4 bg-severity-high text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,71,87,0.3)] transition-all"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A04_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {A04_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-severity-high' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-severity-high/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-severity-high mb-4">
            <span className="material-symbols-outlined animate-pulse">architecture</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">Design Document</span>
          </div>
          <div className="text-xl text-gray-200 leading-relaxed italic font-medium">
            {step.story}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8 space-y-8">
          {step.type === 'intro' ? (
            <div className="flex justify-center">
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-severity-high text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,71,87,0.3)] transition-all flex items-center gap-3"
              >
                <span>ابدأ اختبار التصميم الآمن</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-black text-white text-right">
                {step.question}
              </h3>

              <div className={`grid grid-cols-1 ${step.type === 'binary' ? 'md:grid-cols-2' : ''} gap-4`}>
                {step.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`group text-right p-6 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4
                      ${selectedOption === null ? 'border-white/5 hover:border-severity-high/40 hover:bg-severity-high/5' : 
                        selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary/10' : 'border-severity-critical bg-severity-critical/10') : 
                        'opacity-40 border-white/5'}
                    `}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                      ${selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary' : 'border-severity-critical bg-severity-critical') : 'border-white/20'}
                    `}>
                       {selectedOption === idx && <span className="material-symbols-outlined text-xs text-black font-bold">{opt.isCorrect ? 'check' : 'close'}</span>}
                    </div>
                    <span className="text-lg font-bold text-gray-300 group-hover:text-white">{opt.text}</span>
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-6 rounded-2xl animate-in slide-in-from-top-4 duration-500 border
                  ${step.options?.[selectedOption].isCorrect ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-severity-critical/5 border-severity-critical/20 text-severity-critical'}
                `}>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-1">{step.options?.[selectedOption].isCorrect ? 'verified' : 'info'}</span>
                    <p className="text-base leading-relaxed font-medium">
                      {step.options?.[selectedOption].feedback}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={nextStep}
                      className="px-8 py-2 bg-white text-black font-black rounded-lg hover:bg-severity-high hover:text-white transition-colors"
                    >
                      {currentStep === A04_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
