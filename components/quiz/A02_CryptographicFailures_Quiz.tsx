
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

interface QuizStep {
  type: 'intro' | 'question';
  story: React.ReactNode;
  question?: string;
  options?: {
    text: string;
    feedback: React.ReactNode;
    isCorrect: boolean;
  }[];
}

const A02_QUIZ_DATA: QuizStep[] = [
  {
    type: 'intro',
    story: (
      <div className="space-y-6">
        <p>
          أنت الآن بصدد مراجعة قرارات أمنية تتعلق بحماية البيانات الحساسة.
        </p>
        <p>
          وجود التشفير لا يضمن الأمان دائما لأنه قد يكون <span className="text-severity-critical font-bold">مضللا</span> أو ضعيفا. هدفك هو اكتشاف حالات <span className="text-severity-critical font-bold">الأمان الزائف</span> التي تعتمد على أدوات غير كافية لحماية الخصوصية.
        </p>
        <p>
          هذا الاختبار يقيس مدى فهمك للمخاطر وليس مجرد قدرتك على الحفظ.
        </p>
      </div>
    ),
  },
  {
    type: 'question',
    story: (
      <span>لاحظت أن <span className="text-severity-critical font-bold">كلمات المرور</span> في قاعدة البيانات تبدو هكذا <span className="text-severity-critical font-bold">YWRtaW4xMjM=</span> المطور يصر أن هذا تشفير قوي.</span>
    ),
    question: "بصفتك خبير، ما هو حكمك الفوري على هذا الشكل؟",
    options: [
      {
        text: "هذا تشفير ممتاز ولا يمكن كبسه.",
        feedback: (
          <span>خطأ! هذا مجرد <span className="text-severity-critical font-bold">Encoding</span> من نوع <span className="text-severity-critical font-bold">Base64</span> هو لا يحمي البيانات بل يغير شكلها فقط. أي شخص يمكنه تحويلها للنص الأصلي في ثانية واحدة. هذا هو وهم الأمان الأول.</span>
        ),
        isCorrect: false
      },
      {
        text: "هذا مجرد تمثيل للبيانات وليس حماية حقيقية.",
        feedback: (
          <span>بالضبط! الـ <span className="text-severity-critical font-bold">Base64</span> ليس تشفيراً. المطور هنا ارتكب خطأ بدائياً بخلط المفاهيم. البيانات لا تزال مكشوفة تماماً لأي مهاجم.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>المطور يقول حسناً لقد استخدمنا <span className="text-severity-critical font-bold">خوارزمية MD5</span> لتحويل كلمات المرور إلى نصوص غير مفهومة.</span>
    ),
    question: "هل تشعر بالاطمئنان الآن؟",
    options: [
      {
        text: "نعم، الهاش يجعل العودة للنص الأصلي مستحيلة.",
        feedback: (
          <span>نظرياً الهاش هو اتجاه واحد ولكن <span className="text-severity-critical font-bold">خوارزمية MD5</span> قديمة جداً ومكسورة. المهاجم يمكنه استخدام جداول جاهزة <span className="text-severity-critical font-bold">Rainbow Tables</span> لمعرفة كلمة السر في أجزاء من الثانية.</span>
        ),
        isCorrect: false
      },
      {
        text: "لا، الـ MD5 خوارزمية مكسورة وعفا عليها الزمن.",
        feedback: (
          <span>صحيح! استخدام خوارزمية ضعيفة مثل <span className="text-severity-critical font-bold">MD5</span> أو <span className="text-severity-critical font-bold">SHA1</span> هو بمثابة وضع قفل ورقي على خزنة حديدية. المهاجمون يملكون أدوات لكسرها فوراً.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>أثناء فحصك لملفات الجافا سكربت الخاصة بالموقع وجدت هذا السطر <span className="text-severity-critical font-bold">const ENCRYPTION_KEY = MySecretKey123</span></span>
    ),
    question: "ماذا يعني وجود هذا المفتاح داخل الكود؟",
    options: [
      {
        text: "هذا يسهل عملية التشفير وفك التشفير بين السيرفر والعميل.",
        feedback: (
          <span>التسهيل ليس أماناً! وجود المفتاح داخل الكود <span className="text-severity-critical font-bold">Hardcoded Key</span> يعني أن أي شخص يحمل ملفات الموقع أصبح يملك مفتاح الخزنة. هذا فشل ذريع في إدارة المفاتيح.</span>
        ),
        isCorrect: false
      },
      {
        text: "هذه كارثة أمنية تجعل كل البيانات المشفرة بلا قيمة.",
        feedback: (
          <span>أحسنت! المفتاح يجب أن يبقى سراً في السيرفر فقط. إذا انكشف <span className="text-severity-critical font-bold">المفتاح</span> انتهى التشفير. المهاجم سيستخدمه لفك تشفير كل شيء بهدوء.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>الموقع يستخدم بروتوكول <span className="text-severity-critical font-bold">HTTP</span> لنقل بيانات بطاقات الائتمان لكنه يشفرها داخل الصفحة قبل الإرسال باستخدام مكتبة ضعيفة.</span>
    ),
    question: "هل هذا الإجراء كافٍ لحماية البيانات أثناء الانتقال؟",
    options: [
      {
        text: "لا، يجب استخدام HTTPS دائماً لتأمين قناة الاتصال كاملة.",
        feedback: (
          <span>دقيق جداً! التشفير داخل صفحة غير آمنة يعرضك لهجمات <span className="text-severity-critical font-bold">Man-in-the-Middle</span> المهاجم يمكنه تعديل الكود الذي يقوم بالتشفير نفسه قبل أن يعمل!</span>
        ),
        isCorrect: true
      },
      {
        text: "نعم، طالما أن البيانات مشفرة فلا يهم نوع البروتوكول.",
        feedback: (
          <span>خطأ كبير. قناة الاتصال هي الأساس. بدون <span className="text-severity-critical font-bold">HTTPS</span> لا يمكننا الوثوق حتى في الكود الذي يقوم بالتشفير لأنه قد يكون قد تعرض للتلاعب أثناء التحميل.</span>
        ),
        isCorrect: false
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>وجدت أن النظام يقوم بعمل <span className="text-severity-critical font-bold">Hash</span> لكلمة السر لكنه يعطي دائماً نفس الناتج لنفس الكلمة مثل كلمة باسورد تعطي دائماً نواتج متطابقة.</span>
    ),
    question: "ما هو العنصر المفقود هنا الذي يجعل الهاش أكثر قوة؟",
    options: [
      {
        text: "المفقود هو الملح الخاص بالتشفير.",
        feedback: (
          <span>عبقري! بدون <span className="text-severity-critical font-bold">Salt</span> يمكن للمهاجم استخدام هجمات القواميس <span className="text-severity-critical font-bold">Dictionary Attacks</span> بسهولة. الملح يجعل كل عملية هاش فريدة حتى لو كانت كلمة السر متطابقة.</span>
        ),
        isCorrect: true
      },
      {
        text: "المفقود هو زيادة طول كلمة السر.",
        feedback: (
          <span>زيادة الطول مفيدة لكن المشكلة هنا هيكلية. غياب الـ <span className="text-severity-critical font-bold">Salt</span> يجعل الهاش متوقعاً وقابلاً للمقارنة بجداول مخزنة مسبقاً.</span>
        ),
        isCorrect: false
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>تطبيق بنكي يستخدم مفتاحاً واحداً فقط <span className="text-severity-critical font-bold">Symmetric Key</span> لتشفير بيانات جميع المستخدمين وتخزينها.</span>
    ),
    question: "لماذا يعتبر هذا التصميم خطراً بمرور الوقت؟",
    options: [
      {
        text: "لأن تسريب مفتاح واحد يعني ضياع بيانات آلاف المستخدمين.",
        feedback: (
          <span>صحيح تماماً. هذا يسمى <span className="text-severity-critical font-bold">Single Point of Failure</span> في التشفير الاحترافي نفضل استخدام مفاتيح فريدة أو نظام إدارة مفاتيح <span className="text-severity-critical font-bold">KMS</span> معقد.</span>
        ),
        isCorrect: true
      },
      {
        text: "لأن التشفير التماثلي أبطأ من غيره.",
        feedback: (
          <span>بالعكس، التشفير التماثلي سريع جداً لكن مشكلته الكبرى في <span className="text-severity-critical font-bold">إدارة المفاتيح</span> وسريتها وليس في السرعة.</span>
        ),
        isCorrect: false
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>عند فحص شهادة الأمان للموقع اكتشفت أنها تستخدم خوارزمية <span className="text-severity-critical font-bold">SHA-1</span> للتوقيع الرقمي.</span>
    ),
    question: "بصفتك صائد ثغرات، ماذا تكتب في تقريرك؟",
    options: [
      {
        text: "الشهادة صالحة طالما أن التاريخ لم ينتهِ بعد.",
        feedback: (
          <span>خطأ! خوارزمية <span className="text-severity-critical font-bold">SHA-1</span> أصبحت ضعيفة ومعرضة لهجمات التصادم <span className="text-severity-critical font-bold">Collision</span> المتصفحات الحديثة تحذر منها ويجب الانتقال لـ <span className="text-severity-critical font-bold">SHA-256</span> فوراً.</span>
        ),
        isCorrect: false
      },
      {
        text: "ثغرة متوسطة الخطورة بسبب استخدام خوارزمية توقيع مكسورة.",
        feedback: (
          <span>تحليل سليم. استخدام <span className="text-severity-critical font-bold">مكونات قديمة</span> في التشفير هو دعوة صريحة للمهاجمين للبحث عن ثغرات التصادم.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>أحد المطورين يفتخر قائلاً لقد ابتكرت <span className="text-severity-critical font-bold">خوارزمية تشفير خاصة بي</span> لا يعرفها أحد لذا لن يستطيع أحد كسرها.</span>
    ),
    question: "ما هو الرد الأمني الصحيح على هذا الادعاء؟",
    options: [
      {
        text: "هذا قمة الأمان لأن الغموض يحمي النظام.",
        feedback: (
          <span>هذه أكبر مغالطة أمنية. التشفير القوي يعتمد على قوة الرياضيات التي تم اختبارها وليس على <span className="text-severity-critical font-bold">سرية الخوارزمية</span> التشفير المنزلي دائماً ما يكون كارثياً.</span>
        ),
        isCorrect: false
      },
      {
        text: "هذا خطر جداً، يجب استخدام الخوارزميات المعتمدة عالمياً فقط.",
        feedback: (
          <span>دقيق! قاعدة التشفير الأولى هي لا تخترع تشفيرك الخاص. الخوارزميات العامة مثل <span className="text-severity-critical font-bold">AES</span> تم فحصها لسنوات أما الخاصة فغالباً ما تحتوي على ثغرات بدائية.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>تطبيق موبايل يقوم بتوليد رموز التفعيل بناءً على <span className="text-severity-critical font-bold">توقيت الجهاز</span> فقط.</span>
    ),
    question: "أين الكارثة هنا في توليد الأرقام العشوائية؟",
    options: [
      {
        text: "لا توجد كارثة، الوقت يتغير دائماً فهو عشوائي.",
        feedback: (
          <span>الوقت متغير ولكنه ليس عشوائياً. المهاجم يمكنه تخمين التوقيت وتجربة نطاق صغير من الاحتمالات. يجب استخدام <span className="text-severity-critical font-bold">CSPRNG</span> للتوليد الآمن.</span>
        ),
        isCorrect: false
      },
      {
        text: "الرموز أصبحت قابلة للتنبؤ مما يسهل اختراق الحسابات.",
        feedback: (
          <span>صحيح! <span className="text-severity-critical font-bold">التنبؤ</span> هو عدو التشفير. إذا عرف المهاجم كيف تختار الماكينة الرقم فقد انتهى الأمر.</span>
        ),
        isCorrect: true
      }
    ]
  },
  {
    type: 'question',
    story: (
      <span>التحدي النهائي نظام يقوم بتشفير الملفات الحساسة باستخدام <span className="text-severity-critical font-bold">AES</span> لكنه يستخدم نفس <span className="text-severity-critical font-bold">Initialization Vector IV</span> لكل الملفات.</span>
    ),
    question: "ماذا يعني تكرار الـ IV بالنسبة للمهاجم؟",
    options: [
      {
        text: "يسمح للمهاجم بتحليل الأنماط واستنتاج أجزاء من النص الأصلي.",
        feedback: (
          <span>رائع! الـ <span className="text-severity-critical font-bold">IV</span> يجب أن يكون فريداً وعشوائياً لكل عملية تشفير. تكراره يحول التشفير القوي إلى لغز يمكن حله عبر تحليل الأنماط <span className="text-severity-critical font-bold">Pattern Analysis</span>.</span>
        ),
        isCorrect: true
      },
      {
        text: "لا يؤثر ذلك طالما أن المفتاح السري لا يزال مخفياً.",
        feedback: (
          <span>تفكير خاطئ. التشفير عبارة عن منظومة. أي خلل في التفاصيل مثل الـ <span className="text-severity-critical font-bold">IV</span> أو الـ <span className="text-severity-critical font-bold">Padding</span> يمكن أن يؤدي لكسر المنظومة بالكامل.</span>
        ),
        isCorrect: false
      }
    ]
  }
];

export const A02_CryptographicFailures_Quiz: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFinished, setShowFinished] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (A02_QUIZ_DATA[currentStep].options?.[idx].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < A02_QUIZ_DATA.length - 1) {
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
    const totalQuestions = A02_QUIZ_DATA.filter(q => q.type === 'question').length;
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return { title: "Encryption Illusion Breaker", msg: "أنت لا تنخدع بالمظاهر. تدرك أن التشفير الحقيقي هو منظومة رياضية صارمة وليس مجرد نصوص غريبة." };
    if (ratio >= 0.4) return { title: "Crypto Aware", msg: "لديك وعي جيد بالأخطاء الشائعة، لكن تذكر أن الشيطان يكمن في التفاصيل الصغيرة مثل الـ IV والـ Salt." };
    return { title: "False Sense of Security", msg: "أنت تقع في فخ 'وهم الأمان'. تذكر: ليس كل ما هو غير مفهوم هو مشفر أمنياً." };
  };

  if (showFinished) {
    const persona = getPersona();
    return (
      <div className="animate-in zoom-in duration-500 bg-surface-dark p-10 rounded-[2.5rem] border border-severity-critical/20 text-center space-y-8 shadow-[0_0_30px_rgba(255,71,87,0.1)]">
        <div className="w-24 h-24 bg-severity-critical/10 rounded-full flex items-center justify-center mx-auto border border-severity-critical/30">
          <span className="material-symbols-outlined text-severity-critical text-5xl">lock</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{persona.title}</h2>
          <p className="text-severity-critical font-bold">نتيجتك: {score} من {A02_QUIZ_DATA.filter(q => q.type === 'question').length}</p>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto italic">
          "{persona.msg}"
        </p>
        <button 
          onClick={retakeQuiz} 
          className="px-10 py-4 bg-severity-critical text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,71,87,0.3)] transition-all"
        >
          أعد الاختبار
        </button>
      </div>
    );
  }

  const step = A02_QUIZ_DATA[currentStep];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {A02_QUIZ_DATA.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-severity-critical' : 'bg-white/5'}`}
          ></div>
        ))}
      </div>

      <div className="bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        {/* Story Header */}
        <div className="bg-gradient-to-r from-severity-critical/10 to-transparent p-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-severity-critical mb-4">
            <span className="material-symbols-outlined animate-pulse">psychology</span>
            <span className="text-xs font-black uppercase tracking-[0.3em]">The Scenario</span>
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
                className="px-12 py-4 bg-severity-critical text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,71,87,0.3)] transition-all flex items-center gap-3"
              >
                <span>ابدأ التحقيق الآن</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-black text-white text-right">
                {step.question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {step.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`group text-right p-6 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4
                      ${selectedOption === null ? 'border-white/5 hover:border-severity-critical/40 hover:bg-severity-critical/5' : 
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
                      className="px-8 py-2 bg-white text-black font-black rounded-lg hover:bg-severity-critical hover:text-white transition-colors"
                    >
                      {currentStep === A02_QUIZ_DATA.length - 1 ? 'رؤية التقييم النهائي' : 'المهمة التالية'}
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
