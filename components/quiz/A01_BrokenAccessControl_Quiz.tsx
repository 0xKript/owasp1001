
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

interface QuizStep {
  story: React.ReactNode;
  question: string;
  options: {
    text: string;
    feedback: string;
    isCorrect: boolean;
  }[];
}

const A01_QUIZ_DATA: QuizStep[] = [
  {
    story: (
      <span>
        أنت الآن داخل لوحة التحكم الخاصة بك وتلاحظ أن الرابط في المتصفح ينتهي بـ <span className="text-primary font-bold">رقم المعرف 88</span>. تذكر أن هذا الرقم يمثل هويتك داخل النظام.
      </span>
    ),
    question: "ماذا تفعل لاختبار وجود ثغرة في التحكم بالوصول؟",
    options: [
      {
        text: "أحاول تغيير رقم المعرف من 88 إلى 1 بشكل يدوي في الرابط.",
        feedback: "عقلية هجومية ممتازة! أنت تحاول معرفة ما إذا كان النظام يتأكد فعلاً أنك تملك هذا الرقم أم يكتفي بوجودك داخل النظام فقط.",
        isCorrect: true
      },
      {
        text: "أستمر في تعديل بياناتي الخاصة للتأكد من أن الزر يعمل.",
        feedback: "هذا عمل مختبر جودة وليس خبير أمني. المهاجم دائماً يحاول تجاوز الحدود المسموحة له.",
        isCorrect: false
      },
      {
        text: "أبحث عن زر تسجيل الخروج للتأكد من أمان الجلسة.",
        feedback: "خطوة جيدة للأمان العام، لكنك هنا تضيع فرصة لاكتشاف خلل جوهري في صلاحيات الوصول.",
        isCorrect: false
      }
    ]
  },
  {
    story: (
      <span>
        بعد دخولك لحساب <span className="text-primary font-bold">المدير التنفيذي</span>، حاولت الضغط على زر <span className="text-primary font-bold">حذف الموظفين</span>، لكن النظام رفض العملية وأظهر رسالة منع.
      </span>
    ),
    question: "كيف تتصرف لتجاوز هذا المنع؟",
    options: [
      {
        text: "أتوقف عن المحاولة لأن المبرمج وضع حماية على هذا الزر.",
        feedback: "خطأ! الحماية في الواجهة الأمامية مجرد زينة. يجب أن نختبر هل الحماية موجودة فعلاً في الخادم أم لا.",
        isCorrect: false
      },
      {
        text: "أقوم باعتراض الطلب البرمجي وتغيير نوع الحساب من مستخدم عادي إلى مدير.",
        feedback: "رائع! أنت تختبر الآن مدى ثقة الخادم في البيانات التي يرسلها المستخدم يدوياً.",
        isCorrect: true
      },
      {
        text: "أراسل الدعم الفني لإخبارهم أن الزر لا يعمل.",
        feedback: "هذا سلوك مستخدم عادي. مهمتك هي إثبات أن النظام يمكن خداعه وتجاوز قيوده.",
        isCorrect: false
      }
    ]
  },
  {
    story: (
      <span>
        أثناء فحصك للموقع، وجدت مساراً مخفياً يسمح بـ <span className="text-primary font-bold">تحميل قاعدة البيانات</span> بالكامل دون الحاجة لتسجيل الدخول أو إدخال كلمة مرور.
      </span>
    ),
    question: "ما هو الخطأ الجوهري في تصميم هذا النظام؟",
    options: [
      {
        text: "المشكلة أن الرابط طويل وصعب الحفظ.",
        feedback: "الأمان لا يعتمد على سرية الروابط. المهاجم سيجد المسار دائماً إذا لم يكن محمياً بحارس حقيقي.",
        isCorrect: false
      },
      {
        text: "النظام يفتقر للتحقق من صلاحية الوصول عند هذا المسار المخفي.",
        feedback: "تحليل دقيق! المبرمج افترض أن عدم وجود زر يؤدي لهذا المسار كافٍ لحمايته، ونسي وضع قفل حقيقي على الباب الخلفي.",
        isCorrect: true
      },
      {
        text: "المشكلة في سرعة استجابة الخادم.",
        feedback: "السرعة لا علاقة لها بالأمن هنا. المشكلة هي من المسموح له بالدخول وليس متى يتم التحميل.",
        isCorrect: false
      }
    ]
  },
  // سؤال جديد 4 (Single Choice)
  {
    story: (
      <span>
        عندما يتمكن مستخدم عادي من الوصول إلى وظائف مخصصة <span className="text-primary font-bold">للمسؤول فقط</span> (مثل حذف حسابات الآخرين)، فإن هذا يمثل نوعاً خطيراً من كسر الصلاحيات.
      </span>
    ),
    question: "ما هو المصطلح التقني لهذا النوع من تصعيد الصلاحيات؟",
    options: [
      {
        text: "تصعيد صلاحيات رأسي (Vertical Privilege Escalation).",
        feedback: "صحيح! أنت تقفز من مستوى مستخدم عادي إلى مستوى إداري أعلى، وهذا هو جوهر التصعيد الرأسي.",
        isCorrect: true
      },
      {
        text: "تصعيد صلاحيات أفقي (Horizontal Privilege Escalation).",
        feedback: "خطأ. التصعيد الأفقي يكون بين مستخدمين في نفس المستوى (مثل مستخدم يدخل لبيانات مستخدم آخر).",
        isCorrect: false
      }
    ]
  },
  // سؤال جديد 5 (Multiple Choice)
  {
    story: (
      <span>
        قام أحد المهاجمين بتعديل الطلب المرسل للسيرفر ليتضمن القيمة <span className="text-primary font-bold">is_admin=true</span> بدلاً من القيمة الأصلية، ونجح في الحصول على صلاحيات كاملة.
      </span>
    ),
    question: "ما هو الدرس الأهم الذي يجب أن يتعلمه المبرمج من هذه الحادثة؟",
    options: [
      {
        text: "يجب تشفير كل البيانات المرسلة من المتصفح.",
        feedback: "التشفير وحده لا يكفي إذا كان السيرفر لا يزال يثق في القيمة بعد فك تشفيرها.",
        isCorrect: false
      },
      {
        text: "يجب أن تكون الصلاحيات مخزنة في الخادم ولا يحددها المستخدم أبداً.",
        feedback: "رائع! القاعدة الذهبية هي: الخادم لا يثق أبداً في أي معلومة تتعلق بالصلاحيات تأتي من طرف العميل.",
        isCorrect: true
      },
      {
        text: "يجب إخفاء حقل is_admin من الكود البرمجي.",
        feedback: "إخفاء الحقول هو (أمان عبر الغموض) وهو لا يحمي النظام من المهاجمين المحترفين.",
        isCorrect: false
      }
    ]
  },
  // سؤال جديد 6 (Multiple Choice)
  {
    story: (
      <span>
        اكتشفت أن رابط فواتير العملاء يبدو هكذا: <span className="text-primary font-bold">/api/v1/invoice/1001</span>. قمت بتغيير الرقم إلى 1002 وظهرت فاتورة شخص آخر.
      </span>
    ),
    question: "لماذا تعتبر هذه الثغرة (IDOR) جزءاً من فشل التحكم في الوصول؟",
    options: [
      {
        text: "لأنها تعتمد على تخمين الأرقام فقط.",
        feedback: "التخمين هو الوسيلة، لكن الثغرة الحقيقية هي فشل النظام في منعك من رؤية ما لا تملكه.",
        isCorrect: false
      },
      {
        text: "لأن النظام يفتقر للتحقق من ملكية المورد (Object) قبل عرضه.",
        feedback: "تحليل احترافي! النظام تأكد أنك مسجل دخول، لكنه لم يتأكد هل تملك الفاتورة رقم 1002 أم لا.",
        isCorrect: true
      },
      {
        text: "لأن الرابط مكشوف وغير مشفر.",
        feedback: "حتى لو كان الرابط مشفراً، إذا لم يوجد تحقق من الصلاحيات في السيرفر، ستظل الثغرة موجودة.",
        isCorrect: false
      }
    ]
  },
  // سؤال جديد 7 (Multiple Choice)
  {
    story: (
      <span>
        للوقاية من ثغرات <span className="text-primary font-bold">Broken Access Control</span>، يُنصح دائماً باتباع مبدأ تقليل الامتيازات الممنوحة للمستخدمين.
      </span>
    ),
    question: "ما هو أفضل نهج برمجي لتطبيق هذا المبدأ؟",
    options: [
      {
        text: "السماح بكل شيء افتراضياً ومنع بعض الصفحات الحساسة.",
        feedback: "نهج خطير جداً! قد تنسى منع صفحة واحدة وتكلف الشركة الكثير.",
        isCorrect: false
      },
      {
        text: "منع كل شيء افتراضياً والسماح فقط بما يحتاجه المستخدم فعلياً.",
        feedback: "هذا هو النهج الصحيح (Deny by Default). هكذا تضمن أن كل باب مفتوح هو باب قمت أنت بفتحه عن وعي وفحصه جيداً.",
        isCorrect: true
      },
      {
        text: "السماح للمستخدم بالوصول لأي صفحة يجد رابطها في الموقع.",
        feedback: "هذا هو التعريف الحرفي للنظام المخترق. المهاجم سيجد الروابط المخفية دائماً.",
        isCorrect: false
      }
    ]
  }
];

export const A01_BrokenAccessControl_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A01_QUIZ_DATA[currentStep].options[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A01_QUIZ_DATA.length - 1) {
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
    setIsStarted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isStarted) {
    return (
      <div className="animate-in fade-in duration-700 max-w-2xl mx-auto py-12 space-y-10 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-glow">
          <span className="material-symbols-outlined text-primary text-5xl animate-pulse">psychology</span>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-black text-white italic tracking-tighter">تحدي اختراق الصلاحيات</h2>
          <p className="text-gray-300 text-2xl leading-relaxed font-medium">
            مرحباً بك في مختبر الاختبار. هدفك اليوم هو التفكير كخبير أمني لاكتشاف مواطن الخلل في <span className="text-primary font-bold">صلاحيات الوصول</span>. هل تستطيع تمييز كيف يتلاعب المهاجمون بالمنطق البرمجي لتجاوز الحواجز الأمنية؟
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <button 
            onClick={() => setIsStarted(true)}
            className="px-16 py-6 bg-primary text-black font-black rounded-2xl hover:shadow-glow transition-all active:scale-95 text-xl uppercase tracking-widest"
          >
            أبدأ الاختبار
          </button>
        </div>
      </div>
    );
  }

  if (showFinished) {
    const ratio = score / A01_QUIZ_DATA.length;
    let persona = { title: "مراقب مبتدئ", msg: "أنت في بداية الطريق. تذكر دائماً: لا تثق أبداً بما تراه في الواجهة الأمامية للموقع، الحقيقة في السيرفر." };
    if (ratio === 1) persona = { title: "خبير اختراق الصلاحيات", msg: "مذهل! لقد أثبتّ أنك تملك عقلية المهاجم المحترف. أنت لا ترى الحدود، بل ترى الثغرات التي يتركها المبرمجون." };
    else if (ratio >= 0.6) persona = { title: "محلل أمني واعد", msg: "لديك أساس صلب جداً، لكنك تحتاج للتركيز أكثر على فكرة أن الخادم هو مصدر الحقيقة الوحيد ولا يجب أن يثق في العميل." };

    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-12 rounded-[3rem] border border-primary/20 text-center space-y-10 shadow-glow max-w-2xl mx-auto">
        <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/30">
          <span className="material-symbols-outlined text-primary text-6xl">military_tech</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-primary font-bold text-2xl">نتيجتك النهائية: {score} من {A01_QUIZ_DATA.length}</p>
        </div>
        <p className="text-gray-400 text-xl leading-relaxed max-w-md mx-auto italic font-medium">
          "{persona.msg}"
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-12 py-5 bg-primary text-black font-black rounded-xl hover:shadow-glow transition-all active:scale-95 text-lg"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A01_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 max-w-3xl mx-auto">
      {/* شريط التقدم */}
      <div className="flex gap-2 mb-4">
        {A01_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* رأس السؤال - السيناريو */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-10 border-b border-white/5">
          <div className="flex items-center gap-3 text-primary mb-6">
            <span className="material-symbols-outlined animate-pulse">history_edu</span>
            <span className="text-xs font-black uppercase tracking-[0.4em]">السيناريو الحالي</span>
          </div>
          <p className="text-2xl text-gray-200 leading-relaxed italic font-medium">
            {step.story}
          </p>
        </div>

        <div className="p-10 space-y-10">
          {/* نص السؤال */}
          <h3 className="text-3xl font-black text-white text-right leading-snug">
            {step.question}
          </h3>

          {/* الخيارات */}
          <div className="grid grid-cols-1 gap-4">
            {step.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={selectedOption !== null}
                className={`group text-right p-8 rounded-[1.5rem] border-2 transition-all duration-300 flex items-start gap-5
                  ${selectedOption === null ? 'border-white/5 hover:border-primary/40 hover:bg-primary/5' : 
                    selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary/10 shadow-glow' : 'border-red-500 bg-red-500/10') : 
                    'opacity-40 border-white/5'}
                `}
              >
                <div className={`mt-1 w-7 h-7 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                  ${selectedOption === idx ? (opt.isCorrect ? 'border-primary bg-primary' : 'border-red-500 bg-red-500') : 'border-white/20'}
                `}>
                   {selectedOption === idx && <span className="material-symbols-outlined text-xs text-black font-black">{opt.isCorrect ? 'check' : 'close'}</span>}
                </div>
                <span className="text-xl font-bold text-gray-300 group-hover:text-white leading-relaxed">{opt.text}</span>
              </button>
            ))}
          </div>

          {/* التغذية الراجعة */}
          {selectedOption !== null && (
            <div className={`p-8 rounded-[2rem] animate-in slide-in-from-top-4 duration-500 border-2
              ${step.options[selectedOption].isCorrect ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-red-500/5 border-red-500/20 text-red-500'}
            `}>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl mt-1">{step.options[selectedOption].isCorrect ? 'verified' : 'info'}</span>
                <p className="text-lg leading-relaxed font-bold">
                  {step.options[selectedOption].feedback}
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button 
                  onClick={nextStep}
                  className="px-10 py-3 bg-white text-black font-black rounded-xl hover:bg-primary transition-colors text-base"
                >
                  {currentStep === A01_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
