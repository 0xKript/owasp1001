
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A05_SecurityMisconfig_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [labInput, setLabInput] = useState('');
  const [labResponse, setLabResponse] = useState<{ title: string; body: React.ReactNode } | null>(null);
  const [isKeyActive, setIsKeyActive] = useState(false);

  const handleLabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = labInput.toLowerCase().trim();

    if (['admin:admin', 'admin:password', 'root:root', 'test:test'].includes(input)) {
      setLabResponse({
        title: 'دخول غير مصرح',
        body: (
          <span>تم قبول البيانات فوراً. الاعتماد على <span className="text-[#d4af37]">Default Credentials</span> يعني أن المهاجم لا يحتاج لاختراق الكود بل يدخل من الباب الأمامي للنظام باستخدام كلمات مرور منشورة ومعروفة للجميع.</span>
        )
      });
    } else if (['/admin', '/admin/login', '/administrator', '/manager', '/phpmyadmin'].includes(input)) {
      setLabResponse({
        title: 'لوحة تحكم مكشوفة',
        body: (
          <span>تم العثور على المسار. وجود <span className="text-[#d4af37]">Exposed Admin Panel</span> يمنح المهاجم واجهة جاهزة لمحاولة كسر كلمة المرور أو استغلال ثغرات إدارية للسيطرة الكاملة على السيرفر.</span>
        )
      });
    } else if (['debug=true', 'app_env=dev', 'stack trace'].includes(input)) {
      setLabResponse({
        title: 'تسريب معلومات التطوير',
        body: (
          <span>النظام يعمل الآن بوضعية <span className="text-[#d4af37]">Debug Mode</span>. هذا يظهر تفاصيل داخلية عن الأخطاء ومسارات الكود مما يساعد المهاجم على فهم بنية النظام واكتشاف ثغرات أعمق بسهولة.</span>
        )
      });
    } else if (['/uploads', '/images', '/backup'].includes(input)) {
      setLabResponse({
        title: 'استعراض المجلدات',
        body: (
          <span>الملفات مكشوفة للعلن. تفعيل خاصية <span className="text-[#d4af37]">Directory Listing</span> يسمح لأي شخص برؤية قائمة الملفات وتحميلها مما قد يؤدي لتسريب وثائق خاصة أو نسخ احتياطية.</span>
        )
      });
    } else if (['.env', 'config.php', 'web.config', 'application.properties'].includes(input)) {
      setLabResponse({
        title: 'ملفات الإعدادات مكشوفة',
        body: (
          <span>تم الوصول للملف بنجاح. هذه النوعية من <span className="text-[#d4af37]">Config Files</span> تحتوي غالباً على كلمات مرور قواعد البيانات ومفاتيح التشفير مما يعني سقوط النظام تقنياً بالكامل بمجرد قراءتها.</span>
        )
      });
    } else if (['content-security-policy', 'x-frame-options', 'x-content-type-options', 'strict-transport-security'].includes(input)) {
      setLabResponse({
        title: 'غياب رؤوس الحماية',
        body: (
          <span>المتصفح لا يتلقى تعليمات أمنية. غياب <span className="text-[#d4af37]">Security Headers</span> يجعل المستخدمين عرضة لهجمات مثل حقن الواجهات أو سرقة الجلسات عبر المتصفح دون مقاومة من السيرفر.</span>
        )
      });
    } else if (['.php', '.jsp', '.exe'].includes(input)) {
      setLabResponse({
        title: 'رفع ملفات غير مقيد',
        body: (
          <span>تم قبول امتداد الملف. ميزة <span className="text-[#d4af37]">Unrestricted File Upload</span> تسمح للمهاجم برفع كود برمجي خبيث وتشغيله مباشرة على السيرفر مما يؤدي لاختراق النظام من الداخل.</span>
        )
      });
    } else if (['/s3', '/bucket', '/storage'].includes(input)) {
      setLabResponse({
        title: 'تخزين سحابي مفتوح',
        body: (
          <span>الوصول للملفات متاح للجميع. إعداد <span className="text-[#d4af37]">Cloud Storage</span> بشكل خاطئ وبدون صلاحيات دخول صارمة يؤدي لتسريب بيانات الملايين من المستخدمين بضغطة زر واحدة.</span>
        )
      });
    } else if (['backup.zip', 'site.bak', 'old.tar.gz', 'db.sql'].includes(input)) {
      setLabResponse({
        title: 'نسخ احتياطية منسية',
        body: (
          <span>تم بدء التحميل. بقاء <span className="text-[#d4af37]">Exposed Backups</span> في مسارات يسهل تخمينها يعني أن المهاجم حصل على نسخة كاملة من كود الموقع وقاعدة البيانات لدراستها واختراقها في بيئته الخاصة.</span>
        )
      });
    } else if (['/actuator', '/status', '/metrics', '/health'].includes(input)) {
      setLabResponse({
        title: 'خدمات إاضافية غير مؤمنة',
        body: (
          <span>تم جلب بيانات الحالة. ترك <span className="text-[#d4af37]">Unsecured Services</span> تعمل دون حاجة فعلية يكشف معلومات فنية حساسة عن أداء السيرفر وعملياته الداخلية مما يسهل عمليات التجسس التقني.</span>
        )
      });
    } else {
      setLabResponse({
        title: 'طلب غير معروف',
        body: (
          <span>جرب كتابة مسارات مثل .env أو كلمات مرور مثل admin:admin لاكتشاف الإعدادات الخاطئة في هذا النظام.</span>
        )
      });
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right">
      
      {/* قصة واقعية: كارثة إكزاكتس */}
      <section className="relative overflow-hidden bg-[#d4af37]/10 p-10 rounded-[2rem] border-r-8 border-[#d4af37] shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 justify-center">
            خادم مفتوح للجميع
            <span className="material-symbols-outlined text-[#d4af37] text-4xl">history_edu</span>
          </h2>
          <div className="text-xl text-gray-300 leading-relaxed space-y-6">
            <p>
              في عام 2018 عشر واجهت <span className="text-[#d4af37]">شركة إكزاكتس</span> المتخصصة في تسويق البيانات كارثة أمنية كبرى هزت ثقة الملايين حول العالم. الشركة كانت تمتلك <span className="text-[#d4af37]">قاعدة بيانات ضخمة</span> تحتوي على تفاصيل شخصية دقيقة عن مئات الملايين من الأشخاص.
            </p>
            <p>
              المفاجأة لم تكن وجود ثغرة برمجية معقدة أو هجوم من مخترق محترف بل كانت في <span className="text-[#d4af37]">إهمال تقني بسيط</span> للغاية في إعدادات النظام. قاعدة البيانات كانت تعمل بكفاءة تقنية عالية لكنها وضعت على خادم متصل بشبكة الإنترنت <span className="text-[#d4af37]">دون تفعيل أي وسيلة للمصادقة</span> أو طلب <span className="text-[#d4af37]">كلمة مرور</span>.
            </p>
            <p>
              أي شخص في العالم كان يعرف العنوان الرقمي للخادم استطاع الوصول إلى كافة السجلات وقراءتها وتحميلها بالكامل دون أن يمنعه أي حارس رقمي. النظام لم يكن معطلا بل كان يعمل تماما كما تم إعداده لكن <span className="text-[#d4af37]">الإعداد الخاطئ</span> كان يمنح الجميع حق الدخول المطلق.
            </p>
            <p>
              نتج عن هذا الإهمال <span className="text-[#d4af37]">كشف بيانات</span> أكثر من ثلاثمائة وأربعين مليون شخص مما عرض الشركة لملاحقات قانونية وغرامات هائلة وفقدان تام للمصداقية. كل هذا حدث لأن بابا واحدا في الإعدادات بقي مفتوحا تماما لمن يعرف أين ينظر.
            </p>
          </div>
        </div>
      </section>

      {/* 1. الافتتاحية القصصية: المفتاح فوق الباب */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a0a] to-[#050505] p-10 rounded-[2rem] border-r-8 border-severity-medium shadow-2xl">
        <div className="relative z-10 space-y-4 flex flex-col items-center">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 justify-center">
            المفتاح فوق الباب
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl text-center">
              تخيل أنك استأجرت خزنة في بنك ودفعت آلاف الدولارات للحماية لكن عندما غادرت تركت <span className="text-severity-medium">كلمة السر الافتراضية 1234</span> كما هي ووضعت ورقة على الباب تقول <span className="text-severity-medium">المفتاح تحت السجادة</span> ثغرة <span className="text-severity-medium">Security Misconfiguration</span> ليست خطأ في <span className="text-severity-medium">صناعة</span> الخزنة بل في <span className="text-[#d4af37]">طريقة استخدامك</span> لها المهاجم هنا لا يكسر الكود بل يستخدم الأبواب التي نسيت أنت إغلاقها
            </p>
            <button 
              onClick={() => setIsKeyActive(!isKeyActive)}
              className={`w-16 h-16 rounded-full border-2 transition-all duration-500 flex items-center justify-center shrink-0 ${isKeyActive ? 'border-primary bg-primary/20 shadow-glow rotate-180' : 'border-white/10 bg-white/5'}`}
            >
              <span className={`material-symbols-outlined text-3xl ${isKeyActive ? 'text-primary' : 'text-gray-600'}`}>vpn_key</span>
            </button>
          </div>
        </div>
      </section>

      {/* تعريف الثغرة المعدل ليكون أكثر حيوية */}
      <section className="space-y-10 text-right px-4">
        <h2 className="text-2xl font-black text-white italic border-r-4 border-[#d4af37] pr-4">
          ما هي ثغرة Security Misconfiguration؟
        </h2>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="hidden lg:flex flex-1 justify-center relative">
            <div className="w-64 h-64 border-2 border-[#d4af37]/20 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="absolute inset-0 border-t-2 border-[#d4af37]/40 rounded-full"></div>
              <span className="material-symbols-outlined text-[100px] text-[#d4af37]/10">settings</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
               <div className="w-40 h-2 bg-[#d4af37]/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#d4af37]/40 animate-regress"></div>
               </div>
               <div className="w-32 h-2 bg-[#d4af37]/10 rounded-full overflow-hidden mx-auto">
                  <div className="w-1/2 h-full bg-severity-critical/40 animate-regress" style={{ animationDelay: '1s' }}></div>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl ml-auto lg:flex-[2]">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-[#d4af37]/20 transition-all">
              <p className="text-lg text-gray-300 leading-relaxed">
                تحدث ثغرة <span className="text-[#d4af37]">Security Misconfiguration</span> نتيجة الفشل في تطبيق ضوابط الأمان المناسبة على مكونات النظام أو الاعتماد على <span className="text-[#d4af37]">Default Settings</span> التي تأتي بها الخوادم وقواعد البيانات. تشمل هذه المشكلة ترك حسابات افتراضية بكلمات مرور معروفة أو تفعيل خدمات غير ضرورية تزيد من مساحة الهجوم المتاحة.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-[#d4af37]/20 transition-all">
              <p className="text-lg text-gray-300 leading-relaxed">
                تنشأ المخاطر عند غياب عمليات <span className="text-[#d4af37]">Hardening</span> اللازمة لتأمين البيئة البرمجية مما يؤدي إلى تسريب معلومات تقنية حساسة عبر رسائل الخطأ أو واجهات الإدارة المكشوفة. يعد هذا الخلل ناتجاً عن قصور في <span className="text-[#d4af37]">Server Configuration</span> وليس خطأ في كود التطبيق نفسه مما يجعل الأنظمة عرضة للاختراق رغم كفاءتها الوظيفية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 أشياء عملية تختبر فيها Security Misconfiguration */}
      <section className="bg-[#080808] p-8 lg:p-12 rounded-[2.5rem] border border-white/5 space-y-12 shadow-2xl">
        <div className="text-right">
          <h2 className="text-2xl font-black text-white italic border-r-4 border-primary pr-4">10 أشياء عملية تختبر فيها Security Misconfiguration</h2>
        </div>
        
        <div className="space-y-10" style={{ direction: 'ltr', textAlign: 'left' }}>
          {/* 1 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">1</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">باب الدخول الذي لم يُغلق</div>
              <div className="text-base font-mono text-primary uppercase">Default Credentials</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح اختبار ما إذا كان النظام ما زال يستخدم بيانات الدخول الافتراضية يعني أن أي شخص يمكنه الدخول كمدير بدون اختراق حقيقي</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                admin:admin<br/>
                admin:password<br/>
                root:root<br/>
                test:test
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">2</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">لوحة التحكم المكشوفة للجميع</div>
              <div className="text-base font-mono text-primary uppercase">Exposed Admin or Debug Panels</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح وجود لوحات إدارة أو تصحيح أخطاء بدون حماية يسمح بالتحكم الكامل أو كشف معلومات حساسة</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                /admin<br/>
                /admin/login<br/>
                /administrator<br/>
                /manager<br/>
                /phpmyadmin
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">3</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">النظام يعمل بعقلية المطور لا الإنتاج</div>
              <div className="text-base font-mono text-primary uppercase">Debug or Development Mode Enabled</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح وضع التطوير يكشف أخطاء داخلية ومسارات وبيانات تساعد المهاجم على فهم النظام</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                debug=true<br/>
                APP_ENV=dev<br/>
                ظهور stack trace
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">4</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">السيرفر يعرض محتوياته بنفسه</div>
              <div className="text-base font-mono text-primary uppercase">Directory Listing Enabled</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح السماح بعرض الملفات يعني كشف نسخ احتياطية أو ملفات حساسة بدون أي مجهود</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                /uploads/<br/>
                /images/<br/>
                /backup/
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">5</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">ملفات الإعدادات في العلن</div>
              <div className="text-base font-mono text-primary uppercase">Exposed Configuration Files</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح هذه الملفات غالبًا تحتوي على كلمات مرور وقيم اتصال مباشرة بقلب النظام</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                .env<br/>
                config.php<br/>
                web.config<br/>
                application.properties
              </div>
            </div>
          </div>

          {/* 6 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">6</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">الموقع بلا دروع حماية</div>
              <div className="text-base font-mono text-primary uppercase">Missing Security Headers</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح غياب هذه الرؤوس يسمح بهجمات مثل Clickjacking و XSS بدون مقاومة</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                Content-Security-Policy<br/>
                X-Frame-Options<br/>
                X-Content-Type-Options<br/>
                Strict-Transport-Security
              </div>
            </div>
          </div>

          {/* 7 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">7</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">رفع الملفات بلا حارس</div>
              <div className="text-base font-mono text-primary uppercase">Unrestricted File Upload</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح السماح برفع ملفات تنفيذية قد يؤدي إلى تشغيل أوامر مباشرة على السيرفر</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                .php<br/>
                .jsp<br/>
                .exe
              </div>
            </div>
          </div>

          {/* 8 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">8</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">التخزين السحابي المفتوح</div>
              <div className="text-base font-mono text-primary uppercase">Open Cloud Storage or Buckets</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح الوصول المفتوح يعني تسريب بيانات أو ملفات داخلية بدون أي مصادقة</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                /s3/<br/>
                /bucket/<br/>
                /storage/
              </div>
            </div>
          </div>

          {/* 9 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">9</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">بقايا الماضي المكشوفة</div>
              <div className="text-base font-mono text-primary uppercase">Exposed Backups or Old Files</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح النسخ الاحتياطية غالبًا تحتوي على قاعدة بيانات كاملة أو كود قديم ضعيف</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                backup.zip<br/>
                site.bak<br/>
                old.tar.gz<br/>
                db.sql
              </div>
            </div>
          </div>

          {/* 10 */}
          <div className="flex gap-6 items-start">
            <div className="text-primary font-black text-5xl shrink-0">10</div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white leading-tight">خدمات تعمل بلا سبب</div>
              <div className="text-base font-mono text-primary uppercase">Unused or Unsecured Services</div>
              <div className="text-gray-400 text-base leading-relaxed" style={{ direction: 'rtl', textAlign: 'right' }}>التوضيح الخدمات غير المستخدمة توسع سطح الهجوم وقد تسمح بالتحكم أو كشف الحالة الداخلية</div>
              <div className="font-mono text-primary text-base bg-black/40 p-5 rounded-2xl border border-white/5 mt-2" dir="ltr">
                /actuator<br/>
                /status<br/>
                /metrics<br/>
                /health
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مختبر اكتشاف الإعدادات الخاطئة الجديد */}
      <section className="bg-surface-dark p-8 rounded-[3rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-2xl font-black text-white italic">مختبر اكتشاف الإعدادات الخاطئة</h2>
          <p className="text-gray-400 text-sm">أدخل مساراً أو إعداداً من القائمة أعلاه لرؤية النتيجة</p>
        </div>
        
        <div className="bg-black/60 p-8 rounded-[2.5rem] border border-white/5 space-y-8 relative z-10 max-w-2xl mx-auto">
          <form onSubmit={handleLabSubmit} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={labInput}
              onChange={(e) => setLabInput(e.target.value)}
              placeholder="مثال: .env أو admin:admin"
              className="flex-1 bg-background-dark border-2 border-white/5 rounded-2xl px-6 py-4 text-white font-mono outline-none focus:border-[#d4af37] transition-all text-center"
              dir="ltr"
            />
            <button 
              type="submit"
              className="bg-[#d4af37] text-black font-black px-10 py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-lg"
            >
              Send
            </button>
          </form>

          {labResponse && (
            <div className="animate-in zoom-in duration-500 space-y-4">
              <div className="h-px bg-white/10 w-full"></div>
              <div className="text-right space-y-3">
                <h4 className="text-[#d4af37] font-black text-xl italic">{labResponse.title}</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {labResponse.body}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. مثال إعداد (Headers Comparison) - يظهر الآن تحت لوحة التحكم */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">تحليل الـ Headers</h2>
          <div className="w-24 h-1 bg-severity-medium mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {/* إعداد خاطئ */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">إعداد "ثرثار" (VULNERABLE)</h3>
              <span className="material-symbols-outlined text-3xl">info</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_40px_rgba(255,71,87,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-gray-400 text-left" dir="ltr">
                <pre>
                  <code>
HTTP/1.1 200 OK<br/>
<span className="text-red-400">Server: Apache/2.4.41 (Ubuntu)</span> <span className="text-[10px] bg-red-400/20 px-1 rounded">!! كشف الإصدار !!</span><br/>
<span className="text-red-400">X-Powered-By: PHP/7.4.3</span> <span className="text-[10px] bg-red-400/20 px-1 rounded">!! كشف التقنية !!</span><br/>
Content-Type: text/html; charset=UTF-8<br/>
<span className="text-gray-600 italic">// المهاجم الآن يعرف بالضبط أي ثغرات يبحث عنها لهذا الإصدار</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* إعداد آمن */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">إعداد "كتوم" (SECURE)</h3>
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
HTTP/1.1 200 OK<br/>
<span className="text-primary font-bold">Server: Cloud-Server</span> <span className="text-[10px] bg-primary/20 px-1 rounded">✓ مبهم وآمن</span><br/>
<span className="text-primary font-bold">X-Content-Type-Options: nosniff</span><br/>
<span className="text-primary font-bold">X-Frame-Options: DENY</span><br/>
Content-Type: text/html; charset=UTF-8<br/>
<span className="text-gray-600 italic">// النظام لا يكشف أي معلومات تساعد المهاجم في التخطيط</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. خلاصة حيوية وتفاعلية */}
      <section className="relative p-12 bg-gradient-to-br from-[#0d1510] to-severity-medium/5 rounded-[3rem] border-2 border-severity-medium/10 text-center overflow-hidden">
        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-widest text-[#d4af37]">مبدأ الحصانة المطلقة</h2>
          <div className="bg-black/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl">
            <p className="text-gray-300 text-xl leading-relaxed font-medium">
              تذكر دائماً: <span className="text-severity-medium font-bold">الجمال في البساطة، والأمان في الصمت</span>. 
              أغلق كل شيء لا تحتاجه، غير كل شيء جاء افتراضياً، ولا تسمح لسيرفرك بأن يثرثر بأسراره لكل من يطرق بابه.
            </p>
            <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
               <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-[#d4af37] font-black uppercase tracking-widest">#CheckDefaults</span>
               <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-[#d4af37] font-black uppercase tracking-widest">#HardenServer</span>
               <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-[#d4af37] font-black uppercase tracking-widest">#HideErrors</span>
            </div>
          </div>
        </div>
      </section>

      {/* زر الانتقال للقسم العملي */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-10 py-4 rounded-xl font-black hover:bg-green-700 transition-all cursor-pointer shadow-md text-sm uppercase tracking-widest"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

    </div>
  );
};
