
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

const A10_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6 text-center">
        <p>أنت الآن في دور محلل أمني تراجع تطبيقاً يسمح للمستخدمين بجلب صورة بروفايل عبر وضع رابط خارجي. التطبيق بسيط، سريع، ولا يطلب صلاحيات معقدة. المدير يظن أن الميزة مفيدة جداً ولا تشكل أي خطر، فالمستخدم يطلب فقط صورة.. لكنك تدرك أن المشكلة ليست في الرابط نفسه، بل في هوية الطرف الذي سيقوم بطلب هذا الرابط. تذكر: في عالم تزوير طلبات الخادم، الخادم لا يُخترق بالقوة، بل يُقاد للقيام بأعمال بالنيابة عن المهاجم.</p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: (
      <span>النظام يطلب من المستخدم إدخال رابط لصورة، ثم يقوم الخادم بسحب هذه الصورة وعرضها.</span>
    ),
    question: "هل يجب الوثوق في أن الخادم سيطلب فقط ملفات الصور العامة؟",
    options: [
      {
        text: "يجب الوثوق، لأن الكود مبرمج لمعالجة الصور فقط.",
        feedback: "تفكير سطحي! المهاجم قد يرسل رابطاً لـ صفحة إعدادات داخلية. الخادم سيحاول طلبها ظناً منها أنها صورة، وبذلك يكتشف المهاجم وجود خدمات لا تظهر للإنترنت.",
        isCorrect: false
      },
      {
        text: "لا يجب الوثوق، لأن المستخدم هو من يحدد وجهة طلب الخادم.",
        feedback: "أحسنت! هذه هي البداية. بمجرد أن تسمح للمستخدم بتوجيه طلبات الخادم الخارجية، فقد فتحت باباً للـ SSRF.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>الشركة تستخدم خدمات سحابية، والمهاجم أرسل رابطاً يشير إلى عنوان البيانات الوصفية الخاص بمزود الخدمة.</span>
    ),
    question: "هل تعتقد أن الخادم سيرفض هذا الطلب تلقائياً لأنه ليس صورة؟",
    options: [
      {
        text: "لا يجب الوثوق، الخادم سينفذ الطلب كأنه طلب داخلي شرعي.",
        feedback: "بالضبط! الخادم يثق في نفسه. بالنسبة له، هو يطلب معلومة من بيئته الخاصة، وسيقوم بجلب مفاتيح الوصول للمهاجم على طبق من ذهب.",
        isCorrect: true
      },
      {
        text: "يجب الوثوق، فجدران الحماية الخارجية ستمنع هذا الطلب.",
        feedback: "خطأ. جدران الحماية تحمي من الخارج للداخل، لكن هنا الطلب يخرج من الخادم نفسه إلى بيئته الداخلية، وهو ما يسمى حدود الثقة.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>تستخدم ميزة ويب هوكس للسماح للمستخدمين بربط تطبيقاتهم، وتطلب منهم وضع رابط لاستلام الإشعارات.</span>
    ),
    question: "هل ترك هذا الرابط مفتوحاً لأي وجهة يعتبر إعداداً آمناً؟",
    options: [
      {
        text: "نعم، طالما أننا نرسل فقط بيانات الإشعارات الخاصة بنا.",
        feedback: "تفكير قاصر. المهاجم قد يوجه الرابط لخدمة داخلية حساسة ويستخدم الإشعار نفسه كطريقة لعمل مسح للمنافذ داخل شبكتك.",
        isCorrect: false
      },
      {
        text: "لا يجب الوثوق، فقد يُستخدم الخادم كـ وكيل لمهاجمة الشبكة الداخلية.",
        feedback: "رائع! أنت تدرك أن الخادم أصبح أداة في يد المهاجم للوصول لما وراء الحدود المسموحة.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: (
      <span>النظام يقوم بتحويل الروابط المختصرة قبل جلب البيانات.</span>
    ),
    question: "هل عملية تتبع التحويل آمنة بطبيعتها؟",
    options: [
      {
        text: "لا يجب الوثوق، التحويل قد يقود الخادم لعنوان محلي محظور.",
        feedback: "دقيق جداً! المهاجم قد يضع رابطاً يبدو خارجياً، ولكنه يقوم بعمل تحويل لعنوان داخلي، وبذلك يخدع أي فلاتر بسيطة وضعتها.",
        isCorrect: true
      },
      {
        text: "يجب الوثوق، لأننا قمنا بفحص الرابط الأول وكان آمناً.",
        feedback: "خطأ. فحص المحطة الأولى لا يضمن سلامة الوجهة النهائية. المهاجمون يعشقون سلاسل التحويل لتجاوز الحماية.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>المهاجم يرسل طلباً للخادم للوصول إلى صفحة الإدارة التي تعمل على المنفذ المحلي.</span>
    ),
    question: "ماذا يرى نظام إدارة الصلاحيات الداخلي عندما يصل هذا الطلب؟",
    options: [
      { text: "يرى طلباً من مستخدم خارجي مجهول.", feedback: "خطأ، الطلب يخرج من عنوان الخادم نفسه.", isCorrect: false },
      { text: "يرى طلباً موثوقاً قادماً من نفس الجهاز فيسمح به.", feedback: "صحيح! الخادم يثق في نفسه، وتزوير الطلبات يستغل هذه الثقة العمياء لتجاوز طبقات المصادقة.", isCorrect: true },
      { text: "يرى فيروساً ويقوم بحذفه.", feedback: "هذا ليس فيروساً، بل هو سوء استخدام للمنطق.", isCorrect: false },
      { text: "لا يرى شيئاً لأن الطلب مشفر.", feedback: "التشفير لا يمنع النظام من رؤية مصدر الطلب الداخلي.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>قمت بوضع قائمة سوداء تمنع الكلمات التي تشير للعناوين المحلية.</span>
    ),
    question: "لماذا قد يفشل هذا الدفاع بسهولة أمام مهاجم ذكي؟",
    options: [
      { text: "لأن المهاجم قد يغلق المتصفح.", feedback: "لا علاقة لهذا بالأمان.", isCorrect: false },
      { text: "لأن هناك طرقاً لا حصر لها لتمثيل نفس العنوان عبر الترميز أو النطاقات الوهمية.", feedback: "عبقري! القوائم السوداء دائماً ما تُخترق لأن المهاجمين يجدون بدائل تقنية للعنوان المحظور لا يتعرف عليها الفلتر.", isCorrect: true },
      { text: "لأن القائمة السوداء تبطئ السيرفر.", feedback: "هذه مشكلة أداء وليست الفجوة الأمنية الجوهرية.", isCorrect: false },
      { text: "لأنها لا تحمي من الفيروسات.", feedback: "نكرر، هذه ثغرة منطقية وليست ملفاً خبيثاً.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>المهاجم يحاول استغلال الثغرة في بيئة سحابية للوصول لخدمة المعلومات السرية.</span>
    ),
    question: "ما هي الجائزة الكبرى التي يحصل عليها المهاجم من هذا العنوان تحديداً؟",
    options: [
      { text: "معرفة سرعة المعالج في الخادم.", feedback: "معلومة غير مفيدة أمنياً.", isCorrect: false },
      { text: "سحب مفاتيح الوصول المؤقتة للسيطرة على حساب السحابة بالكامل.", feedback: "كارثة حقيقية! هذا هو الهدف الأسمى في البيئات الحديثة، تحويل اختراق تطبيق واحد إلى اختراق للبنية التحتية بالكامل.", isCorrect: true },
      { text: "تغيير خلفية لوحة التحكم.", feedback: "تبسيط مخل لخطورة الثغرة.", isCorrect: false },
      { text: "تحميل ملفات التنسيق الخاصة بالموقع.", feedback: "هذه ملفات عامة أصلاً.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>تريد بناء قائمة بيضاء لحماية الخادم من تزوير الطلبات.</span>
    ),
    question: "أي من هذه الخيارات يمثل التطبيق الأصح لمفهوم القوائم البيضاء؟",
    options: [
      { text: "السماح بجميع الروابط التي تنتهي بنطاق تجاري.", feedback: "غير آمن، المهاجم يمكنه تسجيل نطاق ينتهي بنفس اللاحقة.", isCorrect: false },
      { text: "السماح فقط بنطاقات محددة وموثوقة ورفض ما عداها.", feedback: "هذا هو السلوك المسؤول! أنت تقيد الخادم ليتحدث فقط مع من تعرفهم وتثق بهم يقيناً.", isCorrect: true },
      { text: "السماح بالروابط الطويلة فقط.", feedback: "الطول ليس معياراً للأمان.", isCorrect: false },
      { text: "منع الروابط التي تحتوي على أرقام.", feedback: "فلتر عشوائي وغير فعال.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>المهاجم يستخدم الثغرة للقيام بـ مسح للمنافذ للشبكة الداخلية.</span>
    ),
    question: "كيف يكتشف المهاجم أن منفذاً داخلياً مفتوح رغم أنه لا يرى النتيجة مباشرة؟",
    options: [
      { text: "عبر سماع صوت المروحة في السيرفر.", feedback: "غير منطقي.", isCorrect: false },
      { text: "عبر تحليل زمن الاستجابة أو رسائل الخطأ المختلفة.", feedback: "تحليل احترافي! المهاجم يستخدم ردود فعل الخادم كمرآة لما يحدث في الشبكة المحجوبة عنه.", isCorrect: true },
      { text: "عبر إرسال إيميل للمدير يسأله.", feedback: "هذه هندسة اجتماعية وليست SSRF.", isCorrect: false },
      { text: "عبر تشفير الطلب.", feedback: "التشفير لا يساعد في اكتشاف المنافذ.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: (
      <span>الفرق بين طلب العميل وطلب الخادم.</span>
    ),
    question: "لماذا يعتبر طلب الخادم في هذه الثغرة أخطر بمراحل؟",
    options: [
      { text: "لأن الخادم أسرع في التحميل.", feedback: "السرعة ليست هي السبب الأمني.", isCorrect: false },
      { text: "لأن الخادم يملك هوية وصلاحيات داخل الشبكة لا يملكها المتصفح الخارجي.", feedback: "أحسنت! الخادم هو عضو موثوق في النادي الداخلي، بينما العميل هو غريب يقف خارج الأبواب.", isCorrect: true },
      { text: "لأن الخادم يستخدم لغة برمجة معقدة.", feedback: "لا علاقة للغة البرمجة بصلاحيات الشبكة.", isCorrect: false },
      { text: "لأن العميل لا يمكنه كتابة روابط.", feedback: "المتصفح يكتب روابط دائماً.", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: (
      <span>اكتشفت أن المهاجم استطاع قراءة ملف الحسابات الداخلي للسيرفر عبر رابط صورة. الخادم جلب الملف وعرض محتوياته بدلاً من الصورة.</span>
    ),
    question: "هل الهجوم جاء من خارج الشبكة أم من داخلها؟ ولماذا؟",
    options: [
      {
        text: "من الخارج، لأن المهاجم هو من ضغط الزر في متصفحه.",
        feedback: "خطأ. المهاجم حرض على الهجوم، لكن الفعل تم تنفيذه من داخل السيرفر بصلاحياته الداخلية. الخادم هاجم نفسه.",
        isCorrect: false
      },
      {
        text: "هو هجوم خارجي بأدوات داخلية، لأن الخادم تحول إلى وكيل للمهاجم.",
        feedback: "تحليل دقيق! هذا هو جوهر الخداع؛ المهاجم يستعير يد السيرفر ليضرب بها أهدافاً لا تصل إليها يده.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'analytical',
    story: (
      <span>وصلنا للنهاية. لقد رأيت كيف أن الثقة المطلقة في قدرة الخادم على طلب الروابط كانت هي الفجوة.</span>
    ),
    question: "بصفتك الآن مراقب لتزوير الطلبات، ما هي الحقيقة الكبرى التي تعلمتها؟",
    options: [
      {
        text: "أن أخطر الهجمات هي التي تجعل النظام يثق بنفسه أكثر من اللازم، ويفتح أبوابه الداخلية لمن يطرق من الداخل.",
        feedback: "رؤية ناضجة جداً! الأمان الحقيقي هو تقليل مساحة الثقة حتى بالنسبة للطلبات التي تخرج من نظامك نفسه.",
        isCorrect: true
      },
      {
        text: "أن منع الروابط الخارجية هو الحل الوحيد للأمان.",
        feedback: "غير واقعي. التطبيقات تحتاج للتواصل، ولكن الحل هو التحكم والتدقيق الصارم وليس المنع المطلق.",
        isCorrect: false
      }
    ]
  }
];

export const A10_SSRF_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A10_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A10_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A10_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "محلل خِداع السيرفرات", msg: "أنت تملك بصيرة أمنية حادة. تدرك أن الخادم ليس مجرد منفذ للطلبات، بل هو كيان يملك صلاحيات يجب حمايتها من الخداع المنطقي." };
    if (ratio >= 0.4) return { title: "واعٍ بالحدود الأمنية", msg: "لديك وعي جيد بحدود الثقة، ولكنك قد تغفل أحياناً عن الطرق الملتوية التي يستخدمها المهاجمون لإقناع الخادم بتجاوز تلك الحدود." };
    return { title: "مفكر خارجي فقط", msg: "أنت تركز على الهجمات القادمة من الخارج وتنسى أن الخادم نفسه قد يكون حصان طروادة يفتح الشبكة الداخلية للمهاجمين. ابدأ في التفكير بـ أمان المخرجات." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-severity-low/20 text-center space-y-8 shadow-[0_0_30px_rgba(255,211,42,0.1)]">
        <div className="w-24 h-24 bg-severity-low/10 rounded-full flex items-center justify-center mx-auto border border-severity-low/30">
          <span className="material-symbols-outlined text-severity-low text-5xl">dns</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-severity-low font-bold">نتيجتك: {score} من {A10_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          {persona.msg}
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-16 py-5 bg-severity-low text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,211,42,0.4)] transition-all active:scale-95"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A10_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {A10_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-severity-low' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-severity-low/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-severity-low mb-4">
            <span className="material-symbols-outlined animate-pulse">security_update_good</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">Trust Boundary Audit</span>
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
                className="px-12 py-4 bg-severity-low text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,211,42,0.4)] transition-all flex items-center gap-3 active:scale-95"
              >
                <span>ابدأ مراجعة الثقة بالخادم</span>
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
                      ${selectedOption === null ? 'border-white/5 hover:border-severity-low/40 hover:bg-severity-low/5' : 
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
                <div className={`p-6 rounded-2xl animate-in slide-in-from-top-4 duration-500 border text-right
                  ${step.options?.[selectedOption].isCorrect ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-severity-critical/5 border-severity-critical/20 text-severity-critical'}
                `}>
                  <div className="flex items-start gap-3 justify-end">
                    <p className="text-base leading-relaxed font-medium">
                      {step.options?.[selectedOption].feedback}
                    </p>
                    <span className="material-symbols-outlined mt-1">{step.options?.[selectedOption].isCorrect ? 'verified' : 'info'}</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={nextStep}
                      className="px-8 py-2 bg-white text-black font-black rounded-lg hover:bg-severity-low hover:text-black transition-colors"
                    >
                      {currentStep === A10_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
