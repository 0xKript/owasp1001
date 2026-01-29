
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

const A05_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <span>
        يعمل النظام تقنيا بشكل ممتاز ولا توجد أخطاء واضحة في الكود البرمجي لكن غياب الحماية في الإعدادات يشكل خطرا حقيقيا ثغرة <span className="text-[#d4af37]">Security Misconfiguration</span> لا تظهر كمشكلة برمجية بل تنتج عن ضعف <span className="text-[#d4af37]">Server Settings</span> أو الاعتماد على <span className="text-[#d4af37]">Default Configuration</span> مما يترك النظام مكشوفا للاختراق
      </span>
    ),
  },
  // Phase 1: Binary Exposure Check (5 Questions)
  {
    type: 'binary',
    story: "أثناء مرحلة التطوير، قمت بتفعيل الـ Debug Mode لرؤية تفاصيل الأخطاء فوراً. الآن التطبيق انتقل للعمل الفعلي (Production) والـ Debug Mode لا يزال مفعلاً.",
    question: "هل تترك هذا الإعداد كما هو لتسهيل حل المشاكل مستقبلاً？",
    options: [
      {
        text: "نعم، هو مفيد جداً للمطورين عند حدوث عطل مفاجئ.",
        feedback: "خطأ فادح! الـ Debug Mode يكشف للمهاجم مسارات الملفات، إصدارات المكتبات، وأحياناً أجزاء من الكود. المهاجم يعشق 'السيرفر الثرثار'.",
        isCorrect: false
      },
      {
        text: "لا، يجب إغلاقه فوراً وتحويل الأخطاء إلى سجلات (Logs) داخلية فقط.",
        feedback: "أحسنت! الإعداد الآمن يقتضي إظهار رسائل عامة للمستخدم (مثل 404 أو 500) والاحتفاظ بالتفاصيل خلف الستار.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "السيرفر الجديد جاء محملاً بتطبيقات تجريبية (Sample Apps) وصفحة 'Welcome' افتراضية توضح إمكانيات النظام.",
    question: "هل بقاء هذه الصفحات يمثل خطورة حقيقية？",
    options: [
      {
        text: "نعم، هي تكشف نوع السيرفر وإصداره وتعطي المهاجم طرف خيط.",
        feedback: "دقيق جداً! المهاجم يستخدم هذه الصفحات للتأكد من نوع السيرفر وبناء هجوم مخصص له. الأمان يبدأ بمسح كل ما هو غير ضروري.",
        isCorrect: true
      },
      {
        text: "لا، هي مجرد صفحات ثابتة لا تضر بالنظام الأساسي.",
        feedback: "غير صحيح. هذه الصفحات غالباً ما تكون معروفة الثغرات، وبقاؤها يعطي انطباعاً بأن المسؤول عن السيرفر أهمل الإعدادات الأساسية.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: "قاعدة البيانات الجديدة تعمل بكلمة السر الافتراضية (admin/admin)، وقد وضعت جدار حماية (Firewall) قوياً أمام السيرفر.",
    question: "هل الاعتماد على جدار الحماية كافٍ لتأمين الحسابات الافتراضية？",
    options: [
      {
        text: "نعم، طالما أن المنفذ مغلق عن العالم الخارجي فنحن بأمان.",
        feedback: "تفكير خطير! المهاجم قد يخترق تطبيقاً آخر داخل الشبكة، ومن هناك سيجد قاعدة البيانات مفتوحة له بكلمة السر الافتراضية. لا تثق أبداً في الإعدادات الافتراضية (Default Settings).",
        isCorrect: false
      },
      {
        text: "لا، يجب تغيير كل كلمات السر الافتراضية فور التثبيت.",
        feedback: "بالضبط! القاعدة الأولى في الـ Hardening هي تغيير كل ما هو 'Default'. المهاجمون يملكون قوائم جاهزة بكل كلمات السر الافتراضية لكل الأنظمة.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "الموقع يستخدم شهادة SSL مشفرة، ولكنك تركت المنافذ (Ports) غير المستخدمة (مثل FTP أو Telnet) مفتوحة 'للاحتياط'.",
    question: "هل بقاء هذه المنافذ مفتوحة يعتبر إعداداً آمناً？",
    options: [
      {
        text: "لا، كل منفذ مفتوح هو باب محتمل للدخول غير المصرح به.",
        feedback: "رائع! في الأمن السيبراني نتبع مبدأ (Least Privilege). أي خدمة لا تحتاجها يجب أن تُغلق فوراً لتقليل مساحة الهجوم.",
        isCorrect: true
      },
      {
        text: "نعم، طالما أنها محمية بكلمة سر فلا مشكلة.",
        feedback: "خطأ. الخدمات القديمة مثل Telnet ترسل البيانات نصاً مكشوفاً، وبقاؤها مفتوحاً يزيد من احتمالية اكتشاف ثغرات فيها.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: "تقوم برفع ملفاتك على Cloud Storage (مثل S3 Bucket). لجعل المطورين يعملون بسرعة، جعلت الرابط عاماً (Public) معتقداً أن أحداً لن يخمن الرابط الطويل.",
    question: "هل 'صعوبة التخمين' تعتبر وسيلة أمان كافية？",
    options: [
      {
        text: "نعم، الاحتمالات الرياضية تجعل التخمين مستحيلاً.",
        feedback: "ساذج جداً! هناك أدوات تقوم بمسح شامل للإنترنت لاكتشاف الـ Buckets العامة. الأمان عبر الغموض (Security by Obscurity) هو دائماً فشل.",
        isCorrect: false
      },
      {
        text: "لا، الوصول العام هو دعوة صريحة لتسريب البيانات.",
        feedback: "أحسنت! هذا واحد من أشهر أنواع الـ Misconfiguration في السحابة حالياً. الوصول يجب أن يكون محكوماً بصلاحيات (IAM) فقط.",
        isCorrect: true
      }
    ]
  },
  // Phase 2: Misconfiguration Traps (5 Questions)
  {
    type: 'multiple',
    story: "تريد ضبط إعدادات الـ HTTP Headers لزيادة حماية المتصفح.",
    question: "أي من هذه الخيارات يمثل أفضل إعداد لمنع 'حقن الإطارات' (Clickjacking)؟",
    options: [
      { text: "Server: Apache/2.4", feedback: "هذا يكشف نوع السيرفر ولا يحمي من الـ Clickjacking.", isCorrect: false },
      { text: "X-Frame-Options: DENY", feedback: "إعداد ممتاز! أنت تخبر المتصفح ألا يسمح بوضع موقعك داخل iframe، مما يحمي المستخدمين من الخداع.", isCorrect: true },
      { text: "Allow-Credentials: true", feedback: "هذا إعداد لـ CORS ولا علاقة له بالـ Clickjacking.", isCorrect: false },
      { text: "Cache-Control: no-cache", feedback: "هذا يخص التخزين المؤقت فقط.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "قمت بتثبيت خادم ويب جديد (Nginx). ما هي الخطوة الأولى والأهم في الـ Configuration؟",
    question: "اختر الإجراء الأمني الأصح:",
    options: [
      { text: "تغيير منفذ الـ HTTP من 80 إلى 8080.", feedback: "مجرد تمويه بسيط ولا يمنع الاختراق.", isCorrect: false },
      { text: "تعطيل إظهار رقم الإصدار (server_tokens off).", feedback: "خطوة أساسية في الـ Hardening! تقليل المعلومات المسربة يحرم المهاجم من معرفة الثغرات المناسبة لإصدارك.", isCorrect: true },
      { text: "زيادة سرعة المعالج في السيرفر.", feedback: "هذا يخص الأداء وليس الأمان مباشرة.", isCorrect: false },
      { text: "وضع خلفية جميلة لصفحة الـ 404.", feedback: "لمسة جمالية، لكنها لا تزيد الأمان.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تستخدم نظام إدارة محتوى (WordPress) والموقع يعمل بشكل رائع. لم تقم بتحديث الإضافات (Plugins) منذ 6 أشهر لأنك تخشى تعطل التصميم.",
    question: "ما هو تصنيفك لهذا الموقف أمنياً؟",
    options: [
      { text: "إدارة مخاطر مقبولة للحفاظ على استقرار الموقع.", feedback: "خطأ. بقاء النظام بدون تحديثات أمنية (Patches) هو دعوة مفتوحة للمهاجمين الذين يستغلون ثغرات معروفة (N-Day exploits).", isCorrect: false },
      { text: "Security Misconfiguration بسبب إهمال التحديثات الأمنية.", feedback: "دقيق! الأمان يتطلب التحديث المستمر. يجب أن تملك بيئة تجريبية (Staging) لتجربة التحديثات قبل تطبيقها.", isCorrect: true },
      { text: "حرص زائد لا داعي له.", feedback: "بالعكس، هذا إهمال وليس حرصاً.", isCorrect: false },
      { text: "مشكلة تخص المبرمج الأصلي للإضافة فقط.", feedback: "المبرمج أصدر التحديث، مسؤوليتك أنت هي تطبيقه على سيرفرك.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "عند إعداد صلاحيات المستخدمين في قاعدة البيانات لتطبيق ويب بسيط.",
    question: "ما هو الإعداد الذي يتبع مبدأ الـ Least Privilege؟",
    options: [
      { text: "إعطاء التطبيق صلاحيات (Root/DB Admin) لضمان عدم حدوث أخطاء.", feedback: "كارثة! لو حدث SQL Injection، سيتمكن المهاجم من حذف قاعدة البيانات بالكامل.", isCorrect: false },
      { text: "إنشاء مستخدم خاص يملك فقط صلاحيات (SELECT, INSERT, UPDATE) على جداول محددة.", feedback: "تصميم احترافي! هكذا تحصر الضرر في أضيق نطاق ممكن حتى لو تم اختراق التطبيق.", isCorrect: true },
      { text: "السماح بالدخول للقاعدة من أي عنوان IP.", feedback: "إعداد خطير جداً ويسهل الوصول المباشر للقاعدة.", isCorrect: false },
      { text: "استخدام كلمة سر بسيطة لأن الكود هو من يستخدمها وليس البشر.", feedback: "كلمات السر يجب أن تكون قوية دائماً بغض النظر عن المستخدم.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تستخدم خدمات سحابية وقمت بإنشاء مفاتيح وصول (API Keys) للمطورين.",
    question: "أي من هذه الممارسات تعتبر Misconfiguration؟",
    options: [
      { text: "تغيير المفاتيح (Key Rotation) كل 90 يوماً.", feedback: "هذه ممارسة آمنة وممتازة.", isCorrect: false },
      { text: "إعطاء كل مطور مفتاحاً خاصاً به.", feedback: "جيد لتتبع المسؤولية.", isCorrect: false },
      { text: "رفع ملف يحتوي على المفاتيح في مستودع الكود (GitHub) العام.", feedback: "هذا هو الانتحار الرقمي! المهاجمون يملكون Bots تبحث عن هذه المفاتيح في ثوانٍ لاستغلال حسابك.", isCorrect: true },
      { text: "تشفير المفاتيح قبل تخزينها في السيرفر.", feedback: "خطوة أمنية جيدة.", isCorrect: false }
    ]
  },
  // Phase 3: Final Silent Breach (2 analytical questions)
  {
    type: 'analytical',
    story: "اكتشفت أن المهاجم دخل للسيرفر عبر 'خدمة قديمة' كانت مفعلة افتراضياً ولم تكن تعرف بوجودها. النظام لم يرسل أي تنبيه لأن الخدمة تعتبر شرعية.",
    question: "أين تكمن الكارثة الحقيقية هنا في مفهوم الـ Misconfiguration؟",
    options: [
      {
        text: "في ضعف جدار الحماية الخارجي.",
        feedback: "خطأ. جدار الحماية سمح بمرور حركة المرور لأنك تركت 'الباب' مفتوحاً في الإعدادات.",
        isCorrect: false
      },
      {
        text: "في وجود 'سطح هجوم' (Attack Surface) غير ضروري لم يتم تقليصه.",
        feedback: "تحليل سليم. الأمان ليس فقط في منع الخطأ، بل في 'تقليل الفرص'. كل ميزة أو خدمة لا تحتاجها هي خطر إضافي.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: "وصلنا للنهاية. لقد رأيت كيف أن إعداداً بسيطاً قد يفتح باباً خلفياً صامتاً.",
    question: "بصفتك الآن 'Hardened Mindset'، ما هو شعورك تجاه الإعدادات الافتراضية؟",
    options: [
      {
        text: "أنها أعدت من قبل خبراء وهي آمنة بما يكفي.",
        feedback: "تفكير خاطئ. الإعدادات الافتراضية صممت لـ 'سهولة التشغيل' وليس لـ 'الأمان القصوى'.",
        isCorrect: false
      },
      {
        text: "أنها 'عدو صامت' يجب مراجعته وتغييره دائماً لتناسب احتياجات الأمن الخاصة بي.",
        feedback: "رؤية ناضجة. الأمان هو عملية مستمرة من التحقق والتقوية (Hardening) وليس مجرد ضغطة زر.",
        isCorrect: true
      }
    ]
  }
];

export const A05_SecurityMisconfig_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A05_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A05_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A05_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Hardened Mindset", msg: "أنت لا تترك شيئاً للصدفة. تدرك أن السيرفر الآمن هو السيرفر الذي لا يثرثر ولا يفتح أبواباً لا يحتاجها." };
    if (ratio >= 0.4) return { title: "Configuration Aware", msg: "لديك وعي جيد بالمخاطر، لكنك قد تقع أحياناً في فخ 'الثقة في الجدران الخارجية'. تذكر أن الخطر غالباً ما يأتي من الداخل." };
    return { title: "Comfort Zone Admin", msg: "أنت تفضل أن 'يعمل كل شيء' بأقل مجهود. هذا هو بالضبط ما يبحث عنه المهاجم. ابدأ في تعلم فن الـ Server Hardening." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-severity-medium/20 text-center space-y-8 shadow-[0_0_30px_rgba(255,165,2,0.1)]">
        <div className="w-24 h-24 bg-severity-medium/10 rounded-full flex items-center justify-center mx-auto border border-severity-medium/30">
          <span className="material-symbols-outlined text-severity-medium text-5xl">settings_applications</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-severity-medium font-bold">نتيجتك: {score} من {A05_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          "{persona.msg}"
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-10 py-4 bg-severity-medium text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,165,2,0.4)] transition-all"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A05_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {A05_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-severity-medium' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-severity-medium/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-severity-medium mb-4">
            <span className="material-symbols-outlined animate-pulse">settings</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">System Config Log</span>
          </div>
          {/* Constrained width for intro step to prevent rectangular stretching */}
          <div className={`text-lg text-gray-200 leading-relaxed font-medium ${step.type === 'intro' ? 'max-w-2xl mx-auto text-center py-6' : ''}`}>
            {step.story}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8 space-y-8">
          {step.type === 'intro' ? (
            <div className="flex justify-center pb-4">
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-severity-medium text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,165,2,0.4)] transition-all flex items-center gap-3"
              >
                <span>ابدأ مراجعة الإعدادات</span>
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
                      ${selectedOption === null ? 'border-white/5 hover:border-severity-medium/40 hover:bg-severity-medium/5' : 
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
                      className="px-8 py-2 bg-white text-black font-black rounded-lg hover:bg-severity-medium hover:text-black transition-colors"
                    >
                      {currentStep === A05_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
