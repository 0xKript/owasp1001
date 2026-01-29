
import React, { useState } from 'react';
import { Vulnerability } from '../../types';
import { TOP_10_2023 } from '../../constants';

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

const A07_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-4 text-center py-4">
        <p className="text-2xl leading-relaxed text-gray-400">
          تخيل أنك تجلس لتناول القهوة وفجأة يهتز هاتفك
        </p>
        <p className="text-2xl leading-relaxed text-gray-300">
          إشعار من <span className="text-primary font-bold">حسابك</span> البنكي تم تغيير رقم الهاتف المرتبط بحسابك بنجاح
        </p>
        <p className="text-2xl leading-relaxed text-gray-400">
          لم تفعل ذلك تفتح بريدك الإلكتروني لتجد رسائل شكر على مشتريات لم تطلبها
        </p>
        <p className="text-2xl leading-relaxed text-gray-300">
          تحاول تسجيل الدخول فتظهر رسالة <span className="text-primary font-bold">كلمة المرور</span> خاطئة
        </p>
        <p className="text-2xl leading-relaxed text-gray-400">
          أنت لم تُخترق بشكل تقني عنيف لكنك ببساطة لم تعد أنت بالنسبة لـ <span className="text-primary font-bold italic">النظام</span>
        </p>
        <p className="text-3xl leading-relaxed font-black text-primary/90 mt-6 drop-shadow-glow">
          لقد سرق أحدهم <span className="underline decoration-primary/40 decoration-4 underline-offset-8">هويتك</span> الرقمية بالكامل
        </p>
      </div>
    ),
  },
  {
    type: 'binary',
    story: "تستخدم نفس كلمة المرور لجميع حساباتك لأنها سهلة التذكر وتحتوي على رموز",
    question: "هل هذا الإجراء يعتبر آمناً لحماية هويتك؟",
    options: [
      {
        text: "نعم، طالما أنها معقدة وتحتوي على رموز فلا خوف عليها.",
        feedback: "خطأ قاتل! هذا يسمى (Credential Stuffing). إذا تسربت كلمة مرورك من موقع واحد ضعيف، سيقوم المهاجم بتجربتها آلياً على كل المواقع الأخرى وسينجح في انتحال شخصيتك في ثوانٍ.",
        isCorrect: false
      },
      {
        text: "لا، تكرار كلمات المرور هو دعوة مفتوحة لانتحال الشخصية الشامل.",
        feedback: "بالضبط! الأمان يقتضي أن يكون لكل 'هوية' مفتاح فريد. استخدام مدير كلمات مرور (Password Manager) هو الحل الأمثل هنا.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "دخلت على حسابك من جهاز عام وقمت باختيار تذكرني لتوفير الوقت في المرة القادمة",
    question: "هل تثق في النظام لحماية جلستك بعد مغادرتك؟",
    options: [
      {
        text: "نعم، النظام سيغلق الجلسة تلقائياً بعد فترة.",
        feedback: "تفكير ساذج! خيار 'تذكرني' يضع ملف تعريف (Cookie) طويل الأمد. أي شخص سيجلس بعدك على نفس الجهاز سيجد نفسه داخل حسابك فوراً دون الحاجة للباسورد. لقد تركت هويتك خلفك!",
        isCorrect: false
      },
      {
        text: "لا، هذا التصرف يسمح لأي مستخدم لاحق بالدخول كأنني هو.",
        feedback: "أحسنت! إدارة الجلسات (Session Management) يجب أن تكون صارمة، خاصة في الأجهزة غير الموثوقة.",
        isCorrect: true
      }
    ]
  },
  {
    type: 'binary',
    story: "الموقع لا يطلب منك رمز تحقق ثانٍ ويكتفي فقط بكلمة المرور للدخول للبيانات الحساسة",
    question: "هل تعتبر نظام المصادقة في هذا الموقع قوياً؟",
    options: [
      {
        text: "لا، الاعتماد على عامل واحد فقط هو نقطة فشل وحيدة.",
        feedback: "رائع! الـ MFA هو خط الدفاع الأخير. حتى لو سرق المهاجم كلمة مرورك، لن يستطيع انتحال شخصيتك بدون العامل الثاني (مثل هاتفك).",
        isCorrect: true
      },
      {
        text: "نعم، طالما أن كلمة المرور قوية فلا حاجة لإزعاج المستخدم بخطوات إضافية.",
        feedback: "خطأ أمني فادح. كلمات المرور تُسرق، تُخمن، وتُسرب دائماً. 'الإزعاج' البسيط في الـ MFA هو ما يحمي حسابك من الضياع.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'binary',
    story: "قمت بتسجيل الخروج من الموقع لكنك لاحظت أنك إذا ضغطت على زر الرجوع في المتصفح تظهر بعض بياناتك الحساسة مرة أخرى",
    question: "هل هذا يعني أن المصادقة لا تزال نشطة؟",
    options: [
      {
        text: "نعم، السيرفر لم يقم بإنهاء الجلسة بشكل كامل وصحيح.",
        feedback: "دقيق! فشل إنهاء الجلسة (Insecure Logout) هو ثغرة تسمح للمهاجمين بالوصول للبيانات المخزنة مؤقتاً أو استعادة الجلسة بالكامل.",
        isCorrect: true
      },
      {
        text: "لا، هذا مجرد تخزين مؤقت من المتصفح ولا يشكل خطراً.",
        feedback: "خطأ. الـ Cache قد يحتوي على معلومات حساسة جداً (مثل أرقام الحسابات). النظام المصمم جيداً يخبر المتصفح بعدم تخزين الصفحات الحساسة ويقتل الجلسة تماماً.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'multiple',
    story: "المهاجم يحاول تخمين كلمة مرور حساب المدير عبر تجربة آلاف الكلمات في الدقيقة",
    question: "ما هو الإجراء الأمني الذي فشل النظام في تطبيقه لمنع هذا؟",
    options: [
      { text: "تشفير قاعدة البيانات.", feedback: "التشفير يحمي البيانات المخزنة، لكنه لا يمنع محاولات الدخول غير المحدودة.", isCorrect: false },
      { text: "تحديد معدل المحاولات وقفل الحساب مؤقتاً.", feedback: "صحيح! النظام يجب أن يشك في أي 'هوية' تحاول الدخول بشكل متكرر وفاشل ويوقفها فوراً.", isCorrect: true },
      { text: "تغيير لون صفحة الدخول.", feedback: "هذا إجراء جمالي لا علاقة له بالأمن.", isCorrect: false },
      { text: "طلب اسم المستخدم مرتين.", feedback: "هذا مجرد تعقيد للمستخدم ولا يمنع الهجوم الآلي.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تلقيت رابطاً على الإيميل يقول اضغط هنا لتأكيد هويتك",
    question: "إذا استطاع المهاجم رؤية هذا الرابط في سجلات السيرفر، ماذا يمكنه أن يفعل؟",
    options: [
      { text: "لا شيء، الرابط مخصص لك فقط.", feedback: "خطأ. الروابط التي تحتوي على Tokens هي بمثابة مفاتيح مؤقتة.", isCorrect: false },
      { text: "سرقة هويتك عبر استخدام الـ Token نفسه.", feedback: "بالضبط! إذا لم يكن الـ Token مشفراً ومؤقتاً ومرتبطاً بجهازك، يمكن لأي شخص يملكه أن يصبح 'أنت'.", isCorrect: true },
      { text: "تغيير تصميم الموقع.", feedback: "غير منطقي، الـ Token يخص الصلاحيات وليس التصميم.", isCorrect: false },
      { text: "قراءة إيميلاتك القديمة فقط.", feedback: "قد يتمكن من فعل أكثر من ذلك، السيطرة على الحساب بالكامل.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "تريد إنشاء سياسة كلمات مرور لشركتك الجديدة",
    question: "أي من هذه الشروط هو الأكثر فعالية في حماية الهوية ضد الهجمات الحديثة؟",
    options: [
      { text: "إجبار المستخدم على تغيير الباسورد كل 30 يوماً.", feedback: "أثبتت الدراسات أن هذا يجعل المستخدمين يختارون كلمات أسهل وأضعف.", isCorrect: false },
      { text: "منع كلمات المرور الشائعة وفرض طول لا يقل عن 12 حرفاً.", feedback: "رائع! الطول ومنع الشائع أهم بكثير من 'التعقيد' الذي يسهل نسيانه.", isCorrect: true },
      { text: "طلب كتابة الباسورد باللغة العربية فقط.", feedback: "هذا قد يسبب مشاكل في التوافق ولا يزيد الأمان بشكل جوهري.", isCorrect: false },
      { text: "عدم السماح باستخدام الأرقام.", feedback: "هذا يقلل من احتمالات كلمة المرور ويجعلها أضعف.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "المهاجم قام بسرقة ملف تعريف الجلسة من متصفحك أثناء تصفحك لموقع غير مشفر",
    question: "كيف سيستفيد المهاجم من هذا الملف؟",
    options: [
      { text: "سيعرف المواقع التي زرتها فقط.", feedback: "هذا جزء بسيط من المشكلة.", isCorrect: false },
      { text: "سيننتحل شخصيتك فوراً دون الحاجة لمعرفة كلمة سرك.", feedback: "كارثة حقيقية! الكوكي هو 'إثبات الهوية' الذي يقدمه المتصفح للسيرفر. إذا سُرق، سُرق الحساب.", isCorrect: true },
      { text: "سيقوم بمسح ملفات جهازك.", feedback: "الكوكي لا يعطي صلاحية الوصول للملفات المحلية.", isCorrect: false },
      { text: "سيغير خلفية سطح المكتب لديك.", feedback: "هذا ليس من وظائف الكوكي.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "عند طلب نسيت كلمة المرور يسألك الموقع ما هو اسم أول مدرسة ارتدتها",
    question: "أين تكمن الخطورة الأمنية في هذا النوع من إثبات الهوية؟",
    options: [
      { text: "أن المستخدم قد ينسى اسم المدرسة.", feedback: "مشكلة في سهولة الاستخدام، وليست هي المشكلة الأمنية الأساسية.", isCorrect: false },
      { text: "أن هذه المعلومات يمكن جمعها بسهولة عبر الهندسة الاجتماعية.", feedback: "صحيح! إثبات الهوية عبر معلومات عامة هو تصميم فاشل. المهاجم سيبحث في بروفايلك ويجد الإجابة.", isCorrect: true },
      { text: "أن السؤال طويل جداً.", feedback: "لا علاقة للطول بالأمان هنا.", isCorrect: false },
      { text: "لا توجد خطورة، هذا إجراء قياسي.", feedback: "للأسف هو إجراء شائع لكنه غير آمن بتاتاً.", isCorrect: false }
    ]
  },
  {
    type: 'multiple',
    story: "أنت الآن مبرمج وتريد تخزين جلسة المستخدم بشكل آمن في المتصفح",
    question: "أي خاصية يجب تفعيلها في ملف تعريف الجلسة لمنع سرقته عبر البرمجة النصية؟",
    options: [
      { text: "Secure Flag", feedback: "هذا يضمن إرسال الكوكي عبر HTTPS فقط، وهو مهم لكنه لا يمنع الـ JS.", isCorrect: false },
      { text: "HttpOnly Flag", feedback: "عبقري! هذا يمنع أي كود JavaScript (مثل هجمات XSS) من الوصول للكوكي، مما يحمي الجلسة من السرقة.", isCorrect: true },
      { text: "SameSite Flag", feedback: "هذا يحمي من هجمات CSRF، وهو مهم لكنه ليس المستهدف هنا.", isCorrect: false },
      { text: "Expires Flag", feedback: "هذا يحدد وقت انتهاء الكوكي فقط.", isCorrect: false }
    ]
  },
  {
    type: 'analytical',
    story: "المهاجم دخل إلى لوحة التحكم وأرسل طلباً لتغيير البريد الإلكتروني والنظام نفذ الطلب فوراً لأن المستخدم مسجل دخوله بالفعل",
    question: "لماذا يعتبر هذا فشلاً في المصادقة؟ وهل هناك حل؟",
    options: [
      {
        text: "نعم، الفشل هو عدم طلب إعادة مصادقة قبل تنفيذ عمليات حساسة.",
        feedback: "تحليل احترافي! الهوية يجب أن تُثبت مرة أخرى عند القيام بأفعال لا يمكن التراجع عنها، حتى لو كانت الجلسة نشطة.",
        isCorrect: true
      },
      {
        text: "لا، طالما أن المستخدم دخل في البداية فلا داعي لإزعاجه مرة أخرى.",
        feedback: "هذا هو التفكير الذي يسمح للمهاجمين بالاستيلاء الكامل على الحسابات بمجرد سرقة الجلسة.",
        isCorrect: false
      }
    ]
  },
  {
    type: 'analytical',
    story: "في نهاية هذا الكابوس اكتشفت أن المهاجم لم يكسر تشفير الموقع ولم يستخدم ثغرات تقنية معقدة",
    question: "بصفتك الآن حارس الهوية ما هو الدرس الأهم في التمييز بين تعريف الهوية والمصادقة؟",
    options: [
      {
        text: "أن التعريف هو الادعاء والمصادقة هي الدليل الصارم والخلل دائماً يكون في ضعف الدليل.",
        feedback: "هذا هو لب الموضوع! الأنظمة تفشل عندما تكتفي بـ 'ادعاء' ضعيف أو دليل يمكن تزويره بسهولة.",
        isCorrect: true
      },
      {
        text: "أن كلاهما نفس الشيء ولا يوجد فرق حقيقي بينهما.",
        feedback: "خطأ. فهم الفرق هو الخطوة الأولى لبناء أنظمة حماية هوية متينة.",
        isCorrect: false
      }
    ]
  }
];

export const A07_IdentificationFailures_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A07_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A07_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A07_QUIZ_DATA.filter(q => q.type !== 'intro').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Identity Guardian", msg: "أنت حارس منيع لهويتك الرقمية. تدرك أن كلمة المرور ليست سوى البداية، وأن الأمان الحقيقي يكمن في إدارة الجلسات والـ MFA." };
    if (ratio >= 0.4) return { title: "Identity Aware", msg: "لديك وعي جيد بمخاطر انتحال الشخصية، لكنك قد تقع أحياناً في فخ 'الراحة' على حساب الأمان في بعض الإعدادات." };
    return { title: "Trusting User", msg: "أنت تثق في الأنظمة أكثر من اللازم وتترك أبواب هويتك مواربة. المهاجم لا يحتاج لكسر النظام إذا كنت تعطيه مفاتيحك بسهولة." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="max-w-3xl mx-auto animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-primary/20 text-center space-y-8 shadow-[0_0_30px_rgba(0,212,170,0.1)]">
        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
          <span className="material-symbols-outlined text-primary text-5xl">fingerprint</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-primary font-bold">نتيجتك: {score} من {A07_QUIZ_DATA.filter(q => q.type !== 'intro').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          "{persona.msg}"
        </p>
        <div className="flex justify-center pt-4">
          <button 
            onClick={retakeQuiz} 
            className="px-12 py-5 bg-primary text-black font-black rounded-2xl hover:shadow-glow transition-all active:scale-95 cursor-pointer text-lg"
          >
            أعد الاختبار
          </button>
        </div>
      </div>
    );
  }

  const step = A07_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-4 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-2">
        {A07_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-b from-primary/5 to-transparent p-10 border-b border-white/5">
          <div className="flex items-center justify-center gap-3 text-primary mb-6">
            <span className="material-symbols-outlined animate-pulse text-3xl">psychology</span>
            <span className="text-sm font-black uppercase tracking-[0.4em]">Identity Crisis Report</span>
          </div>
          <div className="text-gray-300 font-medium">
            {step.story}
          </div>
        </div>

        <div className="p-10 space-y-10">
          {step.type === 'intro' ? (
            <div className="flex justify-center pt-2">
              <button 
                onClick={nextStep}
                className="px-16 py-5 bg-primary text-black font-black rounded-2xl hover:shadow-glow transition-all flex items-center gap-4 text-lg active:scale-95"
              >
                <span>ابدأ استعادة هويتك</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-black text-white text-right leading-tight italic">
                {step.question}
              </h3>

              <div className={`grid grid-cols-1 ${step.type === 'binary' ? 'md:grid-cols-2' : ''} gap-5`}>
                {step.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`group text-right p-8 rounded-[2rem] border-2 transition-all duration-300 flex items-start gap-5
                      ${selectedOption === null ? 'border-white/5 hover:border-primary/40 hover:bg-primary/5 cursor-pointer' : 
                        selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary/10' : 'border-severity-critical bg-severity-critical/10') : 
                        'opacity-40 border-white/5 cursor-default'}
                    `}
                  >
                    <div className={`mt-1 w-7 h-7 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                      ${selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary' : 'border-severity-critical bg-severity-critical') : 'border-white/20'}
                    `}>
                       {selectedOption === idx && <span className="material-symbols-outlined text-xs text-black font-bold">{opt.isCorrect ? 'check' : 'close'}</span>}
                    </div>
                    <span className={`text-xl font-bold transition-colors ${selectedOption === idx ? (opt.isCorrect ? 'text-primary' : 'text-severity-critical') : 'text-gray-400 group-hover:text-gray-200'} leading-relaxed`}>{opt.text}</span>
                  </button>
                ))}
              </div>

              {selectedOption !== null && (
                <div className={`p-8 rounded-[2.5rem] animate-in slide-in-from-top-4 duration-500 border-2
                  ${step.options?.[selectedOption].isCorrect ? 'border-primary/20 bg-primary/5 text-primary' : 'border-severity-critical/20 bg-severity-critical/5 text-severity-critical'}
                `}>
                  <div className="flex items-start gap-4">
                    <span className={`material-symbols-outlined text-3xl mt-1 ${step.options?.[selectedOption].isCorrect ? 'text-primary' : 'text-severity-critical'}`}>info</span>
                    <p className="text-lg leading-relaxed font-medium">
                      {step.options?.[selectedOption].feedback}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={nextStep}
                      className={`px-10 py-3 font-black rounded-xl hover:brightness-110 transition-all shadow-lg cursor-pointer ${step.options?.[selectedOption].isCorrect ? 'bg-primary text-black' : 'bg-severity-critical text-white'}`}
                    >
                      {currentStep === A07_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
