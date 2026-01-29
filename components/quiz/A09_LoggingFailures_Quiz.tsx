
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

const A09_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6 text-center">
        <p>أنت الآن في دور فريق الدفاع ومحلل مركز العمليات الأمنية في شركة مالية ضخمة. تجلس أمام شاشات المراقبة، الهدوء يعم الغرفة، الرسوم البيانية مستقرة، والمستخدمون يدخلون ويخرجون بانسيابية. لا توجد أي تنبيهات حمراء، والمدير يمر بجانبك ويقول: <span className="text-purple-500 font-bold">يبدو أن نظام الحماية لدينا لا يقهَر</span>. لكنك تشعر بقشعريرة.. الصمت في عالم الأمن لا يعني الأمان دائماً. كل شيء يبدو طبيعياً.. وهذا هو الخطر.</p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: (
      <span>قام أحدهم بمحاولة تسجيل الدخول <span className="text-severity-critical font-bold">1000 مرة</span> في دقيقة واحدة باستخدام كلمات مرور عشوائية. النظام منع الدخول، لكنه لم يسجل أي تفاصيل عن هذه المحاولات الفاشلة.</span>
    ),
    question: "بصفتك محلل أمني، هل هذا التهديد مرئي بالنسبة لك الآن؟",
    options: [
      {
        text: "مرئي، طالما أن النظام منع الاختراق فنحن نعرف ما حدث.",
        feedback: "خطأ فادح! المهاجم جرب 1000 مفتاح وأنت لا تملك أي سجل يثبت ذلك. بالنسبة لك، لم يحدث شيء، بينما المهاجم يجمع معلومات عن نظامك الآن وهو غير مرئي.",
        isCorrect: false
      },
      {
        text: "غير مرئي، لأن غياب السجلات جعل الهجوم يمر دون أثر.",
        feedback: "أحسنت! أنت تدرك أن المنع وحده لا يكفي. بدون تسجيل، أنت أعمى عن محاولات الاختراق التي فشلت اليوم وقد تنجح غداً.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>تم تغيير صلاحيات مستخدم عادي إلى مدير من داخل لوحة التحكم. العملية تمت بنجاح، ولكن لم ينطلق أي إنذار في غرفة العمليات.</span>
    ),
    question: "هل تعتبر نظام المراقبة لديك ناجحاً هنا؟",
    options: [
      {
        text: "نعم، طالما أن العملية شرعية وتمت من داخل النظام.",
        feedback: "تفكير خطير! تغيير الصلاحيات الحساسة هو حدث أمني يجب أن يتبعه إنذار فوري. صمت النظام هنا سمح لمهاجم محتمل بالسيطرة على كل شيء دون أن يراه أحد.",
        isCorrect: false
      },
      {
        text: "لا، غياب الإنذار عن الأحداث الحساسة هو فشل في المراقبة.",
        feedback: "دقيق! المراقبة الحقيقية هي التي تفرز الأحداث وتصرخ عندما يحدث شيء غير معتاد. الصمت هنا هو عدوك الأول.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>تلقيت بلاغاً عن نشاط مشبوه من عنوان <span className="text-purple-500 font-bold">IP</span> في دولة أخرى. ذهبت للبحث في السجلات لتتبع مساره، ففوجئت أن السجلات تُحذف تلقائياً كل <span className="text-purple-500 font-bold">4 ساعات</span> لتوفير مساحة التخزين.</span>
    ),
    question: "هل هذا الإعداد يسمح لك بإجراء تحقيق جنائي فعال؟",
    options: [
      {
        text: "لا، تدمير السجلات بسرعة يجعل تتبع المهاجم مستحيلاً.",
        feedback: "رائع! السجلات هي الصندوق الأسود لنظامك. بدون الاحتفاظ بها لفترة كافية، المهاجم يمكنه الدخول والخروج والقيام بما يريد، وبحلول وقت اكتشافك سيكون أثره قد اختفى تماماً.",
        isCorrect: true
      },
      {
        text: "نعم، طالما أن السجلات الحالية متوفرة فهذا كافٍ.",
        feedback: "خطأ. المهاجمون الأذكياء يختبئون لأسابيع. حذف السجلات بسرعة هو أفضل هدية تقدمها لهم لإخفاء جرائمهم.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>قام السيرفر بإرسال كميات ضخمة من البيانات إلى موقع خارجي مجهول. السجلات كتبت: <span className="text-purple-500 font-bold">الحالة 200</span> واعتبرت الطلب ناجحاً دون إرسال أي تنبيه بالنشاط غير الطبيعي.</span>
    ),
    question: "هل تعتبر هذا السلوك كشفاً صحيحاً؟",
    options: [
      {
        text: "نعم، السجلات سجلت العملية وهذا هو المطلوب.",
        feedback: "تفكير سطحي. التسجيل سجل الحدث، لكن المراقبة فشلت في فهمه. تسجيل الكارثة دون التنبيه بها هو مجرد كتابة نعي لنظامك.",
        isCorrect: false
      },
      {
        text: "لا، تسجيل الحدث دون تمييز شذوذه هو عمى أمني.",
        feedback: "بالضبط! المراقبة الذكية يجب أن تلاحظ الأنماط الغريبة. تسجيل نجاح سرقة البيانات هو قمة الفشل في الرصد.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>تريد تحديد أي الأحداث يجب أن يتم تسجيلها في السجلات لضمان الرؤية الأمنية القصوى.</span>
    ),
    question: "أي قائمة هي الأهم للتركيز عليها؟",
    options: [
      { text: "كل طلبات الصور وتنسيقات التصميم في الموقع.", feedback: "هذا سيملأ السجلات ببيانات تافهة ويصعب مهمتك في البحث.", isCorrect: false },
      { text: "عمليات الدخول، تغيير الصلاحيات، محاولات الوصول المرفوضة، وتعديل البيانات الحساسة.", feedback: "خيار احترافي! أنت تركز على نقاط التحول في الأمن. هذه هي الأحداث التي تكشف المهاجم.", isCorrect: true },
      { text: "وقت تشغيل المعالج وسرعة المروحة فقط.", feedback: "هذا يخص الأداء البرمجي وليس الأمان السيبراني.", isCorrect: false },
      { text: "أسماء جميع الزوار الذين فتحوا الصفحة الرئيسية.", feedback: "معلومة تسويقية وليست أمنية جوهرية.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>المهاجم نجح في الدخول للسيرفر وقام فوراً بمسح ملف السجلات المخزن محلياً على نفس الجهاز.</span>
    ),
    question: "ما هو القرار التصميمي الذي كان سينقذ الرؤية في هذه الحالة؟",
    options: [
      { text: "إخفاء ملف السجلات في مجلد سري.", feedback: "الأمان عبر الغموض لا يعمل مع المهاجمين المحترفين.", isCorrect: false },
      { text: "تشفير ملف السجلات بكلمة سر.", feedback: "المهاجم الذي يملك صلاحيات كاملة سيفك التشفير أو يحذف الملف ببساطة.", isCorrect: false },
      { text: "إرسال السجلات فوراً إلى خادم سجلات مركزي ومنفصل.", feedback: "عبقري! حتى لو سيطر المهاجم على السيرفر، السجلات موجودة في مكان آخر آمن بعيداً عن متناول يده.", isCorrect: true },
      { text: "جعل ملف السجلات للقراءة فقط.", feedback: "المهاجم المحترف يمكنه تغيير صلاحيات الملف بسهولة.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>تصلك <span className="text-purple-500 font-bold">5000 رسالة</span> تنبيه كل ساعة، ومعظمها بسبب مستخدمين ينسون كلمات مرورهم. أنت الآن تتجاهل كل التنبيهات بسبب التعب.</span>
    ),
    question: "كيف تعالج هذه المشكلة أمنياً؟",
    options: [
      { text: "إغلاق نظام التنبيهات نهائياً لترتاح.", feedback: "هذا هو الانتحار الأمني. المهاجم سيدخل وأنت نائم.", isCorrect: false },
      { text: "ضبط عتبة التنبيه ليرسل إنذاراً فقط عند حدوث 10 محاولات فاشلة لنفس الحساب في دقيقة.", feedback: "رائع! أنت تقلل الضجيج لتركز على الهجمات الحقيقية.", isCorrect: true },
      { text: "توظيف المزيد من المحللين لقراءة كل رسالة.", feedback: "حل مكلف وغير فعال، فالعنصر البشري سيخطئ دائماً أمام هذا الكم من البيانات.", isCorrect: false },
      { text: "تحويل التنبيهات إلى صندوق البريد المزعج.", feedback: "هذا يعني أنك قررت رسمياً ألا ترى الهجوم.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>أنت تقوم بتحليل سجلات الخادم واكتشفت مئات الطلبات التي تحتوي على علامات هجوم الحقن.</span>
    ),
    question: "بصفتك محلل عمليات أمنية، ما هو الإجراء الفوري الأصح؟",
    options: [
      { text: "انتظار حتى ينجح المهاجم في الدخول ثم التصرف.", feedback: "تفكير كارثي. يجب استباق الهجوم.", isCorrect: false },
      { text: "حظر عنوان المهاجم فوراً وتفعيل قواعد حماية مشددة.", feedback: "رد فعل احترافي! المراقبة أعطتك الأفضلية لصد الهجوم قبل أن يصل لهدفه.", isCorrect: true },
      { text: "إرسال إيميل للمهاجم تطلب منه التوقف.", feedback: "المهاجم سيضحك كثيراً ثم يكمل عمله.", isCorrect: false },
      { text: "مسح هذه السجلات لكي لا يراها المدير ويغضب.", feedback: "هذا تستر على جريمة وفشل مهني كامل.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>تريد التأكد من أن نظام التسجيل والمراقبة لديك يعمل فعلياً وليس مجرد واجهة.</span>
    ),
    question: "ما هو أفضل اختبار تقوم به؟",
    options: [
      { text: "سؤال المبرمج إذا كان قد فعلها.", feedback: "الثقة ليست معياراً أمنياً. يجب التحقق.", isCorrect: false },
      { text: "القيام بمحاكاة هجوم حقيقي والتأكد من ظهور التنبيهات.", feedback: "أحسنت! هذا هو الاختبار الحقيقي. إذا لم يصرخ النظام أثناء الاختراق التجريبي، فهو لن يفعل ذلك أثناء الاختراق الحقيقي.", isCorrect: true },
      { text: "التأكد من أن لون لوحة التحكم أخضر.", feedback: "اللون الأخضر قد يخفي خلفه نظاماً ميتاً.", isCorrect: false },
      { text: "قراءة كود البرمجة سطراً بسطر.", feedback: "مجهود ضخم وقد لا يكتشف أخطاء الإعدادات.", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: (
      <span>اكتشفت اليوم أن قاعدة البيانات تم تسريبها بالكامل قبل <span className="text-purple-500 font-bold">10 أيام</span>. بالعودة للسجلات، وجدت أنها فارغة تماماً لتلك الفترة، ولم يصل أي إنذار لأي موظف.</span>
    ),
    question: "أين فشل النظام هنا؟ وهل المشكلة في قوة الحماية أم في جودة الرؤية؟ ولماذا؟",
    options: [
      {
        text: "فشل في الحماية، لأن المهاجم استطاع الدخول أصلاً.",
        feedback: "خطأ. الحماية قد تُكسر دائماً، لكن الفشل الحقيقي هنا هو أن المهاجم عاش وتصرف لمدة 10 أيام دون أن يشعر به أحد. الفشل في الرؤية.",
        isCorrect: false
      },
      {
        text: "فشل في الرؤية، لأن غياب التسجيل والإنذار منح المهاجم الزمن الكافي لسرقة كل شيء بصمت.",
        feedback: "تحليل عميق وصحيح! في الأمن السيبراني، الزمن هو أهم عامل. غياب المراقبة يعطي المهاجم وقتاً غير محدود للعمل براحة تامة.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: (
      <span>وصلنا للنهاية. لقد رأيت كيف أن المهاجم قد يمر من أمام عينيك ولا تراه لأنك لم تضبط عدساتك بشكل صحيح.</span>
    ),
    question: "بصفتك الآن مراقب أمني، ما هي الحقيقة المرة التي تعلمتها؟",
    options: [
      {
        text: "أن ما لا تراه.. لا تستطيع إيقافه. التسجيل ليس رفاهية، بل هو الضوء في نفق الأمن المظلم.",
        feedback: "هذا هو لب الموضوع! التسجيل والمراقبة هي الحواس التي تمكنك من الاستجابة. بدونها، أنت مجرد ضحية تنتظر الاكتشاف بالصدفة.",
        isCorrect: true
      },
      {
        text: "أن الأنظمة الحديثة لا تحتاج لمراقبة لأنها تحمي نفسها تلقائياً.",
        feedback: "وهم خطير. لا يوجد نظام يحمي نفسه تماماً. المراقبة البشرية والآلية المستمرة هي الضمان الوحيد.",
        isCorrect: false
      }
    ]
  }
];

export const A09_LoggingFailures_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A09_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A09_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A09_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "مراقب أمني خبير", msg: "أنت تملك أعين الصقر. تدرك أن السجلات هي القصة الحقيقية للنظام، وأن الإنذار المبكر هو ما ينقذ الشركات من الإفلاس الرقمي." };
    if (ratio >= 0.4) return { title: "واعٍ بالرؤية الأمنية", msg: "لديك وعي جيد بأهمية الرصد، لكنك قد تقع أحياناً في فخ الضجيج أو إهمال التفاصيل الصغيرة التي يختبئ فيها المهاجم." };
    return { title: "مشغل أعمى", msg: "أنت تعمل في الظلام. تثق في هدوء الشاشات وتنسى أن المهاجم الصامت هو الأخطر. ابدأ في بناء استراتيجية تسجيل سجلات صارمة فوراً." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-purple-500/20 text-center space-y-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
        <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
          <span className="material-symbols-outlined text-purple-500 text-5xl">visibility</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-purple-400 font-bold">نتيجتك: {score} من {A09_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          {persona.msg}
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-16 py-5 bg-purple-600 text-white font-black rounded-[2rem] hover:bg-purple-700 transition-all active:scale-95 shadow-xl"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A09_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {A09_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-purple-500' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-purple-400 mb-4">
            <span className="material-symbols-outlined animate-pulse">monitoring</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">SOC Live Feed</span>
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
                className="px-12 py-4 bg-purple-600 text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-3 active:scale-95"
              >
                <span>ابدأ المراقبة الآن</span>
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
                      ${selectedOption === null ? 'border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5' : 
                        selectedOption === idx ? (opt.isCorrect ? 'border-purple-500 bg-purple-500/10' : 'border-red-500 bg-red-500/10') : 
                        'opacity-40 border-white/5'}
                    `}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                      ${selectedOption === idx ? (opt.isCorrect ? 'border-purple-500 bg-purple-500' : 'border-red-500 bg-red-500') : 'border-white/20'}
                    `}>
                       {selectedOption === idx && <span className="material-symbols-outlined text-xs text-black font-bold">{opt.isCorrect ? 'check' : 'close'}</span>}
                    </div>
                    <span className="text-lg font-bold text-gray-300 group-hover:text-white">{opt.text}</span>
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-6 rounded-2xl animate-in slide-in-from-top-4 duration-500 border
                  ${step.options?.[selectedOption].isCorrect ? 'bg-purple-500/5 border-purple-500/20 text-purple-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}
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
                      className={`px-8 py-2 font-black rounded-lg transition-all ${step.options?.[selectedOption].isCorrect ? 'bg-purple-600 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {currentStep === A09_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
