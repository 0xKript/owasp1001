
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

const A03_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6">
        <p>
          تعتمد تطبيقات الويب على استقبال مدخلات من المستخدم وإرسالها إلى الخادم لمعالجتها برمجيا.
        </p>
        <p>
          تظهر ثغرات الحقن عندما يفشل النظام في الفصل بين البيانات العادية وبين <span className="text-primary font-bold">الأوامر التنفيذية</span>. هذا الخلل يؤدي إلى تنفيذ مدخلات المستخدم كجزء من منطق البرمجة الأساسي بدلا من التعامل معها كمجرد معلومات مخزنة.
        </p>
        <p>
          يركز هذا الاختبار على قياس قدرتك في اكتشاف الحالات التي تتحول فيها البيانات إلى <span className="text-primary font-bold">منطق تخريبي</span> خلف واجهة الاستخدام.
        </p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: (
      <span>
        رأيت رابطاً يبدو هكذا <span className="text-primary font-bold">search.php user=Ahmed</span>. قمت بتغييره إلى <span className="text-primary font-bold">search.php user=Ahmed--</span>.
      </span>
    ),
    question: "هل تعتقد أن النظام سيعامل هذه العلامات كمجرد جزء من اسم أحمد ؟",
    options: [
      {
        text: "نعم، النظام سيبحث عن اسم يحتوي على هذه العلامات.",
        feedback: "خطأ! في الأنظمة الضعيفة، العلامات الخاصة تعني نهاية النص وبداية الأمر. أنت هنا بدأت في كسر المنطق، والنظام سيتوقف عن معاملة مدخلاتك كنص.",
        isCorrect: false
      },
      {
        text: "لا، هذه العلامات ستجعل النظام يظن أنني أصدر أمراً برمجياً.",
        feedback: "رائع! أنت بدأت تكتشف أزمة الثقة. المترجم سيعتقد أنك المبرمج الذي يخبره بكيفية تنفيذ الاستعلام، وليس مجرد مستخدم يبحث.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>
        المطور وضع حداً أقصى لطول الاسم في الواجهة <span className="text-primary font-bold">برمجة HTML</span> ليكون <span className="text-primary font-bold">10 أحرف</span> فقط لمنع كتابة أوامر طويلة.
      </span>
    ),
    question: "هل تعتبر هذا الدفاع كافياً ؟",
    options: [
      {
        text: "نعم، الأوامر الخطيرة عادة ما تكون طويلة جداً.",
        feedback: "ساذج جداً! المهاجم يمكنه تجاوز حماية المتصفح بسهولة وإرسال الطلب مباشرة للسيرفر. الحماية في الواجهة هي مجرد وهم أمان.",
        isCorrect: false
      },
      {
        text: "لا، يمكن تجاوز حماية المتصفح وإرسال أي طول للسيرفر.",
        feedback: "دقيق! أي حماية لا تتم في السيرفر هي حماية غير موجودة. المهاجم يستخدم أدوات مثل <span className='text-primary font-bold'>Burp Suite</span> لإرسال ما يريد بغض النظر عن قيود المتصفح.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "أدخلت علامة خاصة في حقل البحث فظهرت لك رسالة خطأ تقنية طويلة تحتوي على تفاصيل من قاعدة البيانات.",
    question: "هل هذا الخطأ مجرد خلل فني بسيط ؟",
    options: [
      {
        text: "نعم، مجرد خطأ برمجي يحتاج للإصلاح.",
        feedback: "أنت تفتقد عقلية المهاجم. هذا الخطأ هو خريطة الكنز. هو يخبر المهاجم أن النظام محقون وقابل للاختراق.",
        isCorrect: false
      },
      {
        text: "لا، هذا تأكيد على أن مدخلاتي غيرت منطق الاستعلام.",
        feedback: "أحسنت! رسائل الخطأ هي الثغرة التي يتنفس منها المهاجم ليفهم هيكل قاعدة البيانات ويبدأ هجومه الحقيقي.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>
        وجدت <span className="text-primary font-bold">حقلاً مخفياً</span> في الكود يرسل <span className="text-primary font-bold">category=books</span>. قمت بتعديله ليرسل حمولة حقن برمجية.
      </span>
    ),
    question: "هل الحقول المخفية محصنة ضد ثغرات الحقن ؟",
    options: [
      {
        text: "لا، المهاجم يملك السيطرة الكاملة على كل ما يرسله المتصفح.",
        feedback: "بالضبط! الكلمات المخفية تعني أنها لا تظهر للمستخدم العادي، لكن بالنسبة للمهاجم هي مجرد مدخل آخر ينتظر الحقن.",
        isCorrect: true
      },
      {
        text: "نعم، لأنها لا تظهر في الصفحة ولا يمكن للمستخدم الوصول إليها.",
        feedback: "خطأ فادح. المهاجم لا يستخدم الواجهة فقط، هو يحلل طلبات البروتوكول ويعدل أي قيمة يراها ذاهبة للسيرفر.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>
        أنت أمام <span className="text-primary font-bold">لوحة دخول</span> تطلب إيميل. تريد الدخول كأول مستخدم في قاعدة البيانات وهو المشرف دون معرفة كلمة السر.
      </span>
    ),
    question: "أي من هذه المدخلات هو الأقوى في كسر منطق الدخول؟",
    options: [
      { text: "admin@site.com", feedback: "هذا إدخال طبيعي، لن يكسر شيئاً.", isCorrect: false },
      { text: "admin OR 1=1 --", feedback: "رائع! أنت جعلت الشرط دائماً صحيح. السيرفر سيقول أن الإيميل هو المسؤول أو 1 يساوي 1 وبما أن الشرط محقق سيدخلك فوراً!", isCorrect: true },
      { text: "script alert 1 script", feedback: "هذا نوع آخر من الحقن، لكنه لن يكسر منطق الدخول في قاعدة البيانات حالياً.", isCorrect: false },
      { text: "DROP TABLE users", feedback: "عنيف جداً وقد لا يعمل إذا لم يكن النظام يدعم الأوامر المتعددة، كما أنه سيكشفك فوراً.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>
        تخيل الاستعلام التالي في السيرفر <span className="text-primary font-bold">SELECT FROM users WHERE name = INPUT</span>.
      </span>
    ),
    question: "ما هي وظيفة الرموز الخاصة في نهاية حمولة الحقن الخاصة بك؟",
    options: [
      { text: "مجرد زينة لجعل الكود يبدو احترافياً.", feedback: "لا، في عالم البرمجة كل رمز له نية وهدف أمني.", isCorrect: false },
      { text: "تخبر المتصفح أن يتوقف عن التحميل.", feedback: "خطأ، المتصفح لا يفهم هذه الرموز في هذا السياق البرمجي.", isCorrect: false },
      { text: "تعطيل وتهميش ما تبقى من الاستعلام الأصلي.", feedback: "عبقري! أنت تقص الجزء المتبقي من جملة الاستعلام التي كتبها المطور، لتجعل أمرك أنت هو الوحيد الذي يعمل.", isCorrect: true },
      { text: "تشفير البيانات قبل إرسالها.", feedback: "لا، هذا ليس تشفيراً للبيانات.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "النظام لا يظهر أي أخطاء واضحة، لكنك لاحظت أنه يأخذ وقتاً أطول للاستجابة عندما تضع أمراً معيناً.",
    question: "ماذا يسمى هذا النوع من الحقن؟",
    options: [
      { text: "الحقن المبني على الخطأ", feedback: "لا، قلنا أن النظام لا يظهر أخطاء برمجية واضحة.", isCorrect: false },
      { text: "الحقن الأعمى المبني على الوقت", feedback: "صحيح! أنت تستخدم الوقت كقناة اتصال. إذا تأخر السيرفر، فأنت تعلم أن شرطك البرمجي قد تحقق.", isCorrect: true },
      { text: "الحقن السريع", feedback: "لا يوجد مصطلح تقني بهذا الاسم في هذا السياق.", isCorrect: false },
      { text: "إنكار المنطق البرمجي", feedback: "لا، هذا ليس المصطلح الصحيح لوصف هذه الحالة.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "أنت تحلل الفرق بين أنواع الحقن المختلفة داخل الأنظمة.",
    question: "ما هو الفرق الجوهري بين حقن قواعد البيانات وحقن الأوامر ؟",
    options: [
      { text: "لا يوجد فرق، كلاهما واحد.", feedback: "هناك فرق كبير في المستهدف والنتيجة النهائية.", isCorrect: false },
      { text: "الأول يستهدف قاعدة البيانات، والثاني يستهدف نظام التشغيل.", feedback: "دقيق! في الأول أنت تسرق بيانات، وفي الثاني أنت تسيطر على السيرفر ككل وتنفذ أوامر مباشرة.", isCorrect: true },
      { text: "حقن البيانات أسرع من حقن الأوامر.", feedback: "السرعة ليست معياراً للفرق الجوهري بينهما.", isCorrect: false },
      { text: "حقن الأوامر يستهدف المتصفح فقط.", feedback: "خطأ، كلاهما يستهدف جانب السيرفر والخلفية البرمجية.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>
        المطور يقول لقد قمت بعمل فلتر يمنع كلمات مثل <span className="text-primary font-bold">SELECT</span> و <span className="text-primary font-bold">UNION</span> أنا الآن آمن.
      </span>
    ),
    question: "كيف سيرد عليه صائد الثغرات ؟",
    options: [
      { text: "سأجرب كتابتها بحروف كبيرة وصغيرة متنوعة.", feedback: "ذكاء فطري! الفلاتر المبنية على الكلمات غالباً ما تكون بسيطة ويمكن خداعها بتغيير حالة الأحرف أو الترميز.", isCorrect: true },
      { text: "سأبحث عن موقع آخر أسهل.", feedback: "المهاجم المحترف لا يستسلم بسهولة أمام عوائق بسيطة.", isCorrect: false },
      { text: "سأقوم بتشفير كل شيء يدوياً.", feedback: "التشفير ليس حلاً منطقياً في هذه الحالة.", isCorrect: false },
      { text: "الفلتر كافٍ فعلاً ولا يمكن تجاوزه.", feedback: "الثقة الزائدة في الفلاتر البسيطة هي ثغرة بحد ذاتها.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "أنت تريد حماية تطبيقك نهائياً من ثغرات الحقن البرمجي.",
    question: "ما هو الحل الجذري والوحيد الذي يفصل بين البيانات والأوامر؟",
    options: [
      { text: "منع المستخدمين من كتابة رموز خاصة.", feedback: "صعب جداً وقد يفسد تجربة المستخدم، وهناك دائماً طرق تقنية للالتفاف.", isCorrect: false },
      { text: "استخدام الاستعلامات المجهزة والمعلمة.", feedback: "هذا هو الحل الذهبي! أنت تخبر قاعدة البيانات أن هذا هو القالب، وهذه هي البيانات فقط، والسيرفر لن يخلط بينهما أبداً.", isCorrect: true },
      { text: "استخدام جدار حماية قوي فقط.", feedback: "الجدار هو طبقة حماية إضافية، لكنه ليس حلاً للخلل في الكود نفسه.", isCorrect: false },
      { text: "تغيير اسم قاعدة البيانات دورياً.", feedback: "هذا يسمى الأمان عبر الغموض وهو نهج فاشل تماماً في الحماية.", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: "في أحد المختبرات، أدخلت اسم مستخدم للبحث عنه، لكن النظام قام بحذف سجل من قاعدة البيانات بدلاً من مجرد البحث.",
    question: "هل المشكلة في سوء نية المستخدم، أم في تصميم النظام؟ ولماذا؟",
    options: [
      {
        text: "في المستخدم، لأنه أدخل كوداً خبيثاً عمداً.",
        feedback: "خطأ. المستخدم يمكنه إدخال ما يشاء. النظام هو المسؤول الوحيد عن تفسير هذا الإدخال بشكل آمن.",
        isCorrect: false
      },
      {
        text: "في النظام، لأنه فشل في معاملة الإدخال كبيانات فقط وحوله لأمر.",
        feedback: "تحليل سليم مئة بالمئة. الحقن هو دائماً خطأ في المترجم الذي يثق في البيانات لدرجة أنه يعتبرها جزءاً من منطقه الخاص.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: "وصلنا للنهاية. لقد رأيت كيف أن كلمة واحدة أو رمزاً واحداً قد يقلب موازين القوى في السيرفر.",
    question: "بصفتك صائد ثغرات، ما هي الحقيقة الكبرى التي تعلمتها عن الحقن؟",
    options: [
      {
        text: "أن الهجوم يعتمد على كسر اللغة التي يتحدث بها السيرفر مع قواعده.",
        feedback: "رؤية عميقة! أنت لا تهاجم الموقع، أنت تتدخل في المحادثة الخاصة بين السيرفر وقاعدة البيانات وتغير محتواها لصالحك.",
        isCorrect: true
      },
      {
        text: "أنها ثغرة قديمة ولم تعد موجودة في المواقع الحديثة.",
        feedback: "للأسف، لا تزال هذه الثغرة من أخطر التهديدات وتتصدر القوائم العالمية لأن المطورين لا يزالون يرتكبون نفس الأخطاء المنطقية.",
        isCorrect: false
      }
    ]
  }
];

export const A03_Injection_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A03_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A03_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A03_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "تفعيل عقلية الحقن البرمجي", msg: "أنت تملك القدرة على رؤية ما وراء الحقول. تدرك أن البيانات هي سلاح، وأن منطق النظام هو هدفك الحقيقي." };
    if (ratio >= 0.4) return { title: "كاسر المنطق البرمجي", msg: "لديك وعي جيد بمواطن الخلل في المنطق، لكنك تحتاج للتركيز أكثر على طرق التلاعب المتقدمة." };
    return { title: "مختبر مدخلات", msg: "أنت تختبر المدخلات بشكل سطحي. تذكر دائماً أن ما تراه في الواجهة هو مجرد قشرة، والحقيقة تكمن في الاستعلامات بالخلفية." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-primary/20 text-center space-y-8 shadow-[0_0_30px_rgba(212,170,0,0.1)]">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
          <span className="material-symbols-outlined text-primary text-5xl">data_object</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-primary font-bold">نتيجتك النهائية هي {score} من {A03_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          "{persona.msg}"
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-10 py-4 bg-primary text-black font-black rounded-xl hover:shadow-glow transition-all"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A03_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      <div className="flex gap-2">
        {A03_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-primary mb-4">
            <span className="material-symbols-outlined animate-pulse">psychology</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">السيناريو الحالي</span>
          </div>
          <div className="text-xl text-gray-200 leading-relaxed italic font-medium">
            {step.story}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {step.type === 'intro' ? (
            <div className="flex justify-center">
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-primary text-black font-black rounded-xl hover:shadow-glow transition-all flex items-center gap-3"
              >
                <span>ابدأ التحدي الذهني</span>
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
                      ${selectedOption === null ? 'border-white/5 hover:border-primary/40 hover:bg-primary/5' : 
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
                      className="px-8 py-2 bg-white text-black font-black rounded-lg hover:bg-primary transition-colors"
                    >
                      {currentStep === A03_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
