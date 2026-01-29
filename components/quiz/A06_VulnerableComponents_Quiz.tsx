
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

const A06_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-4 text-center py-2">
        <p className="text-xl leading-relaxed text-gray-300">
          أنت الآن <span className="text-primary font-bold">مبرمج</span> تحت ضغط هائل الموعد النهائي لتسليم المشروع غداً
        </p>
        <p className="text-xl leading-relaxed">
          وجدت <span className="text-primary font-bold">مكتبة</span> جاهزة تقوم بمعالجة الصور تماماً كما تطلب الإدارة
        </p>
        <p className="text-xl leading-relaxed text-gray-300">
          قمت بتثبيتها فوراً لأنها تعمل وأنهيت المهمة في ساعة واحدة الجميع يصفق لك
        </p>
        <p className="text-xl leading-relaxed">
          لكن هل فكرت يوماً متى كان <span className="text-primary font-bold">آخر تحديث</span> لهذه المكتبة
        </p>
        <p className="text-2xl font-black text-primary/90 mt-4 italic">
          البرنامج يعمل الآن لكن <span className="underline decoration-primary/40 underline-offset-4">الخطر</span> قد يكون مؤجلاً
        </p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: "وجدت مكتبة رائعة على منصة تطوير شهيرة لكن آخر تحديث لها كان قبل أربع سنوات والمطور توقف عن الاستجابة للمشكلات التقنية",
    question: "هل قرار الاعتماد على هذه المكونات المنسية يضمن بقاء نظامك صامداً？",
    options: [
      {
        text: "نعم طالما أنها تؤدي الوظيفة المطلوبة بدون أخطاء حالية",
        feedback: "خطأ تقني جسيم المكتبات التي لا تحظى بصيانة هي قنابل زمنية بمرور الوقت تكتشف ثغرات في الكود القديم ولا يجد المهاجم أي عائق لأن لا أحد سيقوم بإصلاحها",
        isCorrect: false
      },
      {
        text: "لا غياب التحديثات يعني أنها مكشوفة للثغرات المكتشفة حديثاً",
        feedback: "رؤية ثاقبة الأمان ليس حالة ثابتة ما كان آمناً قبل سنوات قد يكون مخترقاً اليوم والمكتبات المهجورة هي الصيد السهل لصائدي الثغرات",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "أثناء الفحص اكتشفت أن أحد المكونات التي تستخدمها يحتوي على ثغرة معروفة عالمياً لكنها لا تؤثر على الجزء الذي تستخدمه أنت من المكتبة",
    question: "هل المخاطرة بوجود ثغرة معروفة هي ثمن مقبول لاستمرارية التشغيل؟",
    options: [
      {
        text: "نعم طالما أنني لا أستخدم الجزء المصاب فلا توجد مخاطرة فعالة",
        feedback: "تفكير محفوف بالمخاطر المهاجم قد يجد طريقة للوصول إلى ذلك الجزء عبر مكتبات أخرى أو يستخدم وجود المكتبة نفسها لتنفيذ هجمات أعقد",
        isCorrect: false
      },
      {
        text: "لا وجود أي جزء مصاب يلوث بيئة الأمان في النظام ككل",
        feedback: "دقيق جداً أنت تدرك مبدأ سلسلة الإمداد المكون المصاب هو ثغرة محتملة بغض النظر عن طريقة استخدامك الحالية له",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "تستخدم مكتبة مشهورة جداً ولديها ملايين التحميلات أسبوعياً مما يعطي انطباعاً بأنها محصنة تماماً",
    question: "هل تمنح الشهرة حصانة مطلقة ضد الاختراق؟",
    options: [
      {
        text: "نعم كثرة المستخدمين تعني أن الثغرات ستكتشف وتحل فوراً",
        feedback: "وهم أمني أحياناً تمر سنوات على ثغرات في مكتبات عالمية دون أن يلاحظها أحد والشهرة لا تعني الحصانة بل تعني أهدافاً أكبر",
        isCorrect: false
      },
      {
        text: "لا الشهرة تجعلها هدفاً استراتيجياً للمهاجمين للبحث عن ثغرات خفية",
        feedback: "تحليل ذكي المكتبات المشهورة هي الجائزة الكبرى للمهاجمين لأن اختراقها يعني الوصول لملايين الأنظمة حول العالم بضربة واحدة",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "تخشى تحديث إحدى المكتبات لأن الإصدار الجديد قد يغير في شكل الواجهة أو يعطل بعض الوظائف المستقرة",
    question: "هل يستحق الحفاظ على ثبات الواجهة المخاطرة بانهيار الأمان？",
    options: [
      {
        text: "نعم استقرار التطبيق وتجربة المستخدم أهم من تحديث أمني غير مؤكد",
        feedback: "هذا هو وهم الاستقرار ما فائدة واجهة جميلة إذا كان النظام سيسقط بسبب اختراق كان يمكن تجنبه الأمان هو الأساس دائماً",
        isCorrect: false
      },
      {
        text: "لا يجب التحديث ومعالجة مشاكل التوافق لضمان حماية المستخدمين",
        feedback: "هذا هو الفكر الاحترافي المطور الحقيقي يواجه تحديات البرمجة ليضمن بيئة رقمية نظيفة ومؤمنة لمستخدميه",
        isCorrect: true
      }
    ]
  },
  {
    type: 'multiple',
    story: "تريد إدارة إصدارات المكتبات في ملف إعدادات مشروعك بذكاء",
    question: "ما هي الاستراتيجية الأمثل لإدارة سلاسل الإمداد البرمجية؟",
    options: [
      { text: "استخدام أحدث إصدار دائماً بدون مراجعة تقنية", feedback: "مخاطرة كبرى قد يحتوي الإصدار الأحدث على ثغرات جديدة أو هجمات تستهدف سلسلة الإمداد نفسها", isCorrect: false },
      { text: "تثبيت الإصدارات بدقة مع مراجعة التحديثات الأمنية دورياً", feedback: "سلوك مسؤول أنت تسيطر على ما يدخل نظامك وتحدثه فقط بعد التأكد من سلامته وتوافقه", isCorrect: true },
      { text: "عدم تحديد أي رقم إصدار وترك النظام يختار عشوائياً", feedback: "فوضى أمنية تامة تجعل من الصعب تتبع الأخطاء أو التنبؤ بسلوك النظام", isCorrect: false },
      { text: "الاعتماد على النسخ التجريبية دائماً للحصول على أحدث الميزات", feedback: "تخاطر باستقرار وأمان النظام في بيئة الإنتاج بدون مبرر أمني منطقي", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "عندما تقوم بتثبيت مكتبة واحدة تكتشف أنها قامت بتثبيت خمسين مكتبة أخرى لا تعرفها",
    question: "كيف تتعامل مع شبح التبعيات المتداخلة؟",
    options: [
      { text: "تجاهلها فهي مسؤولية مطور المكتبة الأساسي", feedback: "خطأ استراتيجي المهاجم قد يستهدف أصغر حلقة في السلسلة ليصل إلى قلب نظامك", isCorrect: false },
      { text: "استخدام أدوات فحص تلقائية لتحليل شجرة التبعيات بالكامل", feedback: "عبقري المطور الواعي يراقب كل التفاصيل ولا يثق إلا فيما يتم فحصه والتأكد من نزاهته الرقمية", isCorrect: true },
      { text: "حذف المكتبات التي لا يبدو اسمها مألوفاً لك", feedback: "فعل قد يؤدي لتعطل النظام بالكامل دون تحقيق أي فائدة أمنية حقيقية", isCorrect: false },
      { text: "محاولة إعادة كتابة كل الأكواد يدوياً لتجنب المكتبات تماماً", feedback: "غير واقعي في الصناعة الحديثة ويستهلك موارد زمنية هائلة دون ضمان جودة أمنية أفضل", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "مشروعك يعتمد على مكتبة قديمة جداً ولا يوجد لها بديل حديث حالياً في السوق",
    question: "ما هو الإجراء الدفاعي عند غياب البديل الحديث؟",
    options: [
      { text: "الاستمرار في استخدامها وتمني ألا يكتشف الثغرة أحد", feedback: "هذا هو التواكل الأمني الذي ينتهي دائماً بكارثة غير متوقعة", isCorrect: false },
      { text: "عزل الوظيفة في بيئة معزولة أو محاولة كتابة بديل داخلي", feedback: "تفكير دفاعي ناضج إذا اضطررت لاستخدام قطعة غيار قديمة فعليك حصر خطرها في أضيق نطاق ممكن", isCorrect: true },
      { text: "تغيير اسم المكتبة في الكود لتضليل المهاجمين", feedback: "الأمان عبر الغموض لا يصمد أمام أدوات التحليل المتقدمة التي يملكها المهاجمون", isCorrect: false },
      { text: "تحميل المستخدمين مسؤولية استخدام النظام بهذه الحالة", feedback: "فشل أخلاقي ومهني يدمر سمعة المطور والمؤسسة تقنياً", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تستخدم إطار عمل مشهوراً عالمياً وصدر له تحديث أمني عاجل وحرِج اليوم",
    question: "ما هو التوقيت المثالي لسد الثغرات المكتشفة حديثاً؟",
    options: [
      { text: "خلال الأشهر القادمة عند توفر الوقت الكافي للفريق", feedback: "تأخير قاتل المهاجمون يراقبون هذه التحديثات ويبدؤون الهجوم خلال ساعات من إعلان الثغرة", isCorrect: false },
      { text: "فوراً بعد تجربة التوافق في بيئة اختبار معزولة", feedback: "دقيق جداً السرعة في سد الثغرات هي المفتاح الحقيقي لصد هجمات اليوم الصفر وما بعدها", isCorrect: true },
      { text: "انتظار صدور النسخة الكبرى القادمة من النظام", feedback: "تأجيل غير مبرر يترك أبواب الحصن مفتوحة للرياح الرقمية العاتية", isCorrect: false },
      { text: "عدم التحديث طالما أن النسخة الحالية تؤدي عملها بوضوح", feedback: "هذا هو الفكر التقليدي الذي تسبب في أكبر الاختراقات العالمية في العقد الأخير", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تريد بناء نظام فحص آلي شامل للمكونات البرمجية داخل مؤسستك",
    question: "ما هو المصطلح الذي يمثل خريطة المكونات في مشروعك؟",
    options: [
      { text: "مخطط التدفق البرمجي", feedback: "مصطلح يصف منطق الكود وليس مكوناته المادية", isCorrect: false },
      { text: "قائمة المواد البرمجية SBOM", feedback: "أحسنت هذا هو المصطلح القياسي الذي يمثل قائمة المقادير لنظامك وبدونه لا يمكنك تتبع الأخطار بفعالية", isCorrect: true },
      { text: "خريطة الموقع الجغرافية", feedback: "بعيد تماماً عن سياق أمان سلاسل الإمداد البرمجية", isCorrect: false },
      { text: "سجل العمليات اليومي", feedback: "يصف سلوك النظام لا هيكله المكون من مكتبات خارجية", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: "تخيل أن نظامك تعرض للاختراق بسبب ثغرة في مكتبة تنسيق نصوص بسيطة جداً كنت تظن أنها غير مؤذية",
    question: "من المسؤول الحقيقي عن أمان الأكواد المستوردة؟",
    options: [
      {
        text: "مطور المكتبة الأصلي لأنه من كتب الكود المصاب بالثغرة",
        feedback: "خطأ مطور المصادر المفتوحة لا يضمن لك الأمان مسؤولية حماية نظامك تقع على عاتقك في اختيار ما تدمجه فيه",
        isCorrect: false
      },
      {
        text: "أنا المسؤول لأنني من قرر الوثوق في هذا المكون ودمجه في النظام",
        feedback: "تحليل ناضج واحترافي أنت تدرك أنك عندما تضع قطعة في نظامك فأنت تمنحها ثقتك وهذه الثقة يجب أن تبنى على فحص دقيق",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: "وصلنا للنهاية لقد رأيت كيف أن الاختصارات البرمجية قد تتحول إلى ثغرات مكلفة في المستقبل",
    question: "ما هي الحقيقة الكبرى التي تعلمتها عن حماية سلسلة الإمداد؟",
    options: [
      {
        text: "أن الأمان لا ينتهي بكتابة كود سليم بل يمتد لكل سطر كود تستورده",
        feedback: "هذه هي الحقيقة المرة أنت مسؤول عن كل بت يعمل في خادمك سواء كتبته أنت أو استوردته من الخارج",
        isCorrect: true
      },
      {
        text: "أن الحل هو تجنب استخدام أي مكتبات جاهزة والاعتماد على النفس كلياً",
        feedback: "تفكير غير عملي المكتبات ضرورية للابتكار والسرعة لكن السر يكمن في إدارتها وتحديثها لا في منعها",
        isCorrect: false
      }
    ]
  }
];

export const A06_VulnerableComponents_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A06_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A06_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A06_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Supply-Chain Sentinel", msg: "أنت حارس يقظ لسلسلة الإمداد تدرك أن أمانك يعتمد على أضعف حلقة في مكتباتك وتتخذ إجراءات استباقية لحمايتها" };
    if (ratio >= 0.4) return { title: "Dependency Guardian", msg: "لديك وعي جيد بمخاطر المكتبات الخارجية لكنك قد تقع أحياناً في فخ الثقة الزائدة بالمكونات المشهورة" };
    return { title: "Rapid Developer", msg: "أنت تفضل السرعة على الأمان تذكر أن الوقت الذي وفرته اليوم قد تضيعه أضعافاً غداً في محاولة إصلاح كارثة أمنية كان يمكن تجنبها" };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="max-w-2xl mx-auto animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-primary/20 text-center space-y-8 shadow-[0_0_30px_rgba(0,212,170,0.1)]">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
          <span className="material-symbols-outlined text-primary text-4xl">inventory_2</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-primary font-bold">نتيجتك: {score} من {A06_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          {persona.msg}
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-10 py-4 bg-primary/10 text-primary border border-primary/20 font-black rounded-xl hover:bg-primary/20 transition-all"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A06_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-4 max-w-3xl mx-auto min-h-0">
      {/* Progress Bar */}
      <div className="flex gap-1.5 mb-2">
        {A06_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-b from-primary/5 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center justify-center gap-3 text-primary mb-4">
            <span className="material-symbols-outlined animate-pulse text-2xl">package_2</span>
            <span className="text-xs font-black uppercase tracking-[0.4em]">Audit Intelligence Log</span>
          </div>
          <div className="text-gray-300 font-medium">
            {step.story}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8 space-y-8">
          {step.type === 'intro' ? (
            <div className="flex justify-center pt-2">
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-primary/10 text-primary border border-primary/20 font-black rounded-2xl hover:shadow-glow transition-all flex items-center gap-4 text-base active:scale-95"
              >
                <span>ابدأ الفحص الأمني للمكونات</span>
                <span className="material-symbols-outlined">radar</span>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-black text-white text-right leading-tight italic">
                {step.question}
              </h3>

              <div className={`grid grid-cols-1 ${step.type === 'binary' ? 'md:grid-cols-2' : ''} gap-4`}>
                {step.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`group text-right p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-start gap-4
                      ${selectedOption === null ? 'border-white/5 hover:border-primary/40 hover:bg-primary/5' : 
                        selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary/10' : 'border-severity-critical bg-severity-critical/10') : 
                        'opacity-40 border-white/5'}
                    `}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                      ${selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary' : 'border-severity-critical bg-severity-critical') : 'border-white/20'}
                    `}>
                       {selectedOption === idx && <span className="material-symbols-outlined text-[10px] text-black font-bold">{opt.isCorrect ? 'check' : 'close'}</span>}
                    </div>
                    <span className={`text-lg font-bold transition-colors ${selectedOption === idx ? (opt.isCorrect ? 'text-primary' : 'text-severity-critical') : 'text-gray-400 group-hover:text-gray-200'} leading-relaxed`}>{opt.text}</span>
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-6 rounded-[2rem] animate-in slide-in-from-top-4 duration-500 border-2
                  ${step.options?.[selectedOption].isCorrect ? 'border-primary/20 bg-primary/5 text-primary' : 'border-severity-critical/20 bg-severity-critical/5 text-severity-critical'}
                `}>
                  <div className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-2xl mt-1 ${step.options?.[selectedOption].isCorrect ? 'text-primary' : 'text-severity-critical'}`}>info</span>
                    <p className="text-base leading-relaxed font-medium">
                      {step.options?.[selectedOption].feedback}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={nextStep}
                      className={`px-8 py-2.5 font-black rounded-xl hover:brightness-110 transition-all shadow-lg text-sm ${step.options?.[selectedOption].isCorrect ? 'bg-primary text-black' : 'bg-severity-critical text-white'}`}
                    >
                      {currentStep === A06_QUIZ_DATA.length - 1 ? 'التقييم النهائي' : 'المهمة التالية'}
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
