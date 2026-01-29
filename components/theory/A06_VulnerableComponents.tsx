
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A06_VulnerableComponents_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'idle' | 'found'>('idle');

  const startScan = () => {
    setIsScanning(true);
    setScanResult('idle');
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('found');
    }, 2500);
  };

  const checklistItems = [
    {
      num: "01",
      title: "Outdated JavaScript Libraries",
      content: "دور في الـ source عن:",
      examples: ["jquery-1.x", "bootstrap-3.x", "angularjs-1.x"]
    },
    {
      num: "02",
      title: "Known Vulnerable Framework Versions",
      content: "نسخ مشهورة بمشاكل:",
      examples: ["Spring < 5", "Struts 2.x", "Django < 2", "Laravel < 8"]
    },
    {
      num: "03",
      title: "Exposed Dependency Files",
      content: "Paths عملية:",
      examples: ["/package.json", "/package-lock.json", "/yarn.lock", "/pom.xml"]
    },
    {
      num: "04",
      title: "Outdated CMS Versions",
      content: "دور على:",
      examples: ["WordPress < latest", "Joomla", "Drupal"]
    },
    {
      num: "05",
      title: "Vulnerable Server Software",
      content: "Headers أو banners:",
      examples: ["Apache 2.2", "Nginx 1.10", "OpenSSL 1.0.1"]
    },
    {
      num: "06",
      title: "Known Vulnerable Admin Tools",
      content: "أشياء خطيرة:",
      examples: ["phpMyAdmin", "Adminer", "Jenkins", "Tomcat Manager"]
    },
    {
      num: "07",
      title: "Client‑Side Dependency Enumeration",
      content: "ملفات:",
      examples: ["/static/js/", "/assets/"],
      footer: "وابحث عن version في اسم الملف"
    },
    {
      num: "08",
      title: "Old API Versions Still Active",
      content: "Endpoints مثل:",
      examples: ["/api/v1/", "/api/old/", "/api/test/"]
    },
    {
      num: "09",
      title: "Vulnerable Docker / Container Images",
      content: "Indicators:",
      examples: ["FROM ubuntu:16.04", "FROM node:10"]
    },
    {
      num: "10",
      title: "CVE‑Mapped Libraries",
      content: "مكتبات لها CVEs معروفة:",
      examples: ["log4j", "lodash", "jackson", "commons-collections"]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right">
      
      {/* (1) القصة الواقعية */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] to-[#050505] p-10 rounded-[2rem] border-r-8 border-severity-critical shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3 justify-end italic">
             كارثة إيكويفاكس.. حين أسقط التحديث المنسي الملايين
            <span className="material-symbols-outlined text-severity-critical text-4xl">history_edu</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            في عام 2017 تعرضت شركة إيكويفاكس العملاقة لواحدة من أكبر عمليات تسريب البيانات في التاريخ. السبب لم يكن هجوماً معقداً، بل كان مجرد مكتبة برمجية تسمى أباتشي ستراتس تحتوي على ثغرة أمنية معروفة وموثقة. الشركة أهملت تحديث هذه المكتبة البسيطة، مما فتح الباب للمخترقين لسرقة بيانات مائة وسبعة وأربعين مليون مستخدم. كارثة عالمية وخسائر بمليارات الدولارات كان يمكن منعها بضغطة زر واحدة لتحديث المكونات البرمجية.
          </p>
        </div>
      </section>

      {/* (2) سيارة تسلا بفرامل لوري قديم */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a10] to-[#050505] p-10 rounded-[2rem] border-r-8 border-severity-medium shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 justify-center">
            سيارة تسلا بفرامل لوري قديم
            <span className="material-symbols-outlined text-severity-medium text-4xl">minor_crash</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            تخيل أنك اشتريت أحدث سيارة كهربائية في العالم ذكاء اصطناعي شاشات عملاقة وسرعة جنونية لكن لتوفير الوقت استخدم المصنع فرامل من شاحنة صنعت في عام 1970 السيارة مذهلة لكن بمجرد أن تحتاج للتوقف ستكتشف أن تلك القطعة القديمة هي التي ستدمر كل شيء ثغرة <span className="text-severity-medium font-bold">Vulnerable and Outdated Components</span> هي بالضبط هكذا تطبيقك حديث وقوي لكنك تعتمد على <span className="text-severity-medium font-bold">قطعة غيار برمجية</span> منسية ومليئة بالثقوب
          </p>
        </div>
      </section>

      {/* (3) تعريف رسمي للثغرة */}
      <section className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <h2 className="text-2xl font-black text-white w-fit ml-auto">ما هي ثغرة Vulnerable and Outdated Components؟</h2>
        <p className="text-gray-300 text-xl leading-relaxed">
          هي مخاطرة أمنية تنشأ عندما يستخدم النظام مكونات برمجية مثل المكتبات أو أطر العمل أو أنظمة التشغيل التي تحتوي على ثغرات أمنية معروفة أو أصبحت قديمة وغير مدعومة بالتحديثات. تكمن خطورتها في أن المهاجمين يستهدفون هذه المكونات الضعيفة كمدخل مباشر للسيطرة على التطبيق بالكامل دون الحاجة لاختراق الكود الأساسي الذي كتبه المطور.
        </p>
      </section>

      {/* (4) جزئية لماذا هذه الثغرة مخادعة؟ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white w-fit ml-auto">لماذا هذه الثغرة مخادعة؟</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
             المطورون اليوم لا يبدؤون من الصفر بل يستخدمون مكونات جاهزة لاختصار الوقت هذه المكونات هي <span className="text-severity-medium font-bold">سلسلة الإمداد البرمجية</span> إذا كان أحد هذه المكونات ضعيفاً يصبح تطبيقك كله ضعيفاً تخيلها كبناء جدار من الطوب القوي لكنك استخدمت <span className="text-severity-medium font-bold">غراء منتهي الصلاحية</span> الجدار سيسقط مهما كان الطوب ممتازاً
          </p>
        </div>
        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 space-y-4 shadow-xl text-right">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 justify-start flex-row-reverse">
            كيف يفكر صائد الثغرات؟
            <span className="material-symbols-outlined text-severity-medium">psychology</span>
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed italic">
            المهاجم الذكي لا يبحث عن ثغرة في كودك المعقد الذي كتبته بعناية هو يبحث عن إصدار المكتبات التي تستخدمها مثل مكتبة بي دي إف أو معالجة الصور ثم يبحث في قواعد بيانات الثغرات العالمية ليرى إذا كان إصدارك قديماً ومكشوفاً
          </p>
        </div>
      </section>

      {/* (6) جزئية أين يقع الخطأ؟ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black text-white text-center">أين يقع الخطأ؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all text-center">
              <span className="material-symbols-outlined text-primary mb-3">history</span>
              <h4 className="text-xl text-white font-bold mb-2">عقلية يعمل لا تلمسه</h4>
              <p className="text-sm text-gray-400">المطور يخشى تحديث المكتبات حتى لا يتعطل التطبيق فيبقى على إصدارات مليئة بالثغرات</p>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all text-center">
              <span className="material-symbols-outlined text-primary mb-3">inventory_2</span>
              <h4 className="text-xl text-white font-bold mb-2">تجاهل الاعتماديات</h4>
              <p className="text-sm text-gray-400">عدم معرفة ما هي المكتبات التي تعتمد عليها مكتباتك سلسلة إمداد خفية</p>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all text-center">
              <span className="material-symbols-outlined text-primary mb-3">visibility_off</span>
              <h4 className="text-xl text-white font-bold mb-2">غياب الرقابة</h4>
              <p className="text-sm text-gray-400">عدم استخدام أدوات فحص تلقائية تخبر المطور بوجود تحديثات أمنية فور صدورها</p>
           </div>
        </div>
      </section>

      {/* (7) 10 أشياء عملية تختبر فيها الثغرة */}
      <section className="space-y-16 py-10 relative">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-glow">
            10 أشياء عملية تختبر فيها <span className="font-oxanium text-primary">Vulnerable Components</span>
          </h2>
          <div className="h-1.5 w-64 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto px-4" dir="ltr">
          {checklistItems.map((item) => (
            <div 
              key={item.num} 
              className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,212,170,0.15)] overflow-hidden animate-pulse-slow"
            >
              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex items-center justify-between">
                   <div className="text-6xl font-black font-oxanium text-primary/30 group-hover:text-primary transition-colors">{item.num}</div>
                </div>

                <div className="space-y-2 text-right" dir="rtl">
                  <h4 className="text-2xl font-black text-white tracking-tight">{item.title}</h4>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed text-right font-medium" dir="rtl">
                  {item.content}
                </p>

                <div className="mt-auto pt-6 space-y-5" dir="rtl">
                  <div className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-2 text-right">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {item.examples.map(ex => (
                        <span key={ex} className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/5 font-mono text-xs text-primary transition-colors">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {item.footer && (
                    <p className="text-xs text-gray-500 font-bold text-right italic">{item.footer}</p>
                  )}

                  <div className="bg-severity-critical/10 border-r-4 border-severity-critical p-4 rounded-l-2xl text-right">
                    <p className="text-sm text-gray-300 font-bold leading-relaxed">
                      <span className="text-severity-critical block mb-1 uppercase tracking-tighter">لماذا هذا مهم؟</span>
                      تحديد المكونات القديمة هو المفتاح الأول للمهاجم لمعرفة نوع ونقاط ضعف البنية التحتية لتطبيقك.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* (8) جزئية اللاب - Dependency Scanner */}
      <section className="bg-surface-dark p-12 rounded-[4rem] border border-white/10 shadow-inner space-y-10 relative overflow-hidden group/radar">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,212,170,0.05),transparent)] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
           <div className="flex items-center gap-5 text-severity-medium flex-row-reverse">
             <span className="material-symbols-outlined text-6xl animate-pulse">radar</span>
             <div className="text-right">
                <h2 className="text-3xl font-black uppercase tracking-wider font-oxanium leading-none">VULN-RADAR v2.0</h2>
                <p className="text-[10px] text-gray-600 font-mono mt-1">Real-time Component Integrity Analysis</p>
             </div>
           </div>
           <p className="text-gray-400 text-lg text-right max-w-xl font-medium" dir="rtl">
             أنت الآن <span className="text-primary">Bug Hunter</span>، اضغط على الزر أدناه لبدء فحص "سلسلة الإمداد" لهذا النظام واكتشاف القطع المهترئة.
           </p>
        </div>
        
        <div className="bg-background-dark p-10 rounded-[3rem] border border-white/5 space-y-8 relative z-10 shadow-2xl">
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-blue-400 text-3xl">package_2</span>
                  <div className="text-left" dir="ltr">
                    <span className="text-base font-mono text-white font-bold block">auth-handler-lib</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Version: 2.4.1</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black">STABLE</span>
                </div>
             </div>
             <div className="flex items-center justify-between p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-orange-400 text-3xl">image_search</span>
                  <div className="text-left" dir="ltr">
                    <span className="text-base font-mono text-white font-bold block">image-processor-utils</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Version: 1.0.0</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-4 py-1.5 rounded-full font-black transition-all duration-700 ${scanResult === 'found' ? 'bg-severity-critical text-white' : 'bg-gray-800 text-gray-500'}`}>
                    {scanResult === 'found' ? 'CRITICAL VULN' : 'WAITING SCAN'}
                  </span>
                </div>
             </div>
          </div>
          <button 
            onClick={startScan}
            disabled={isScanning}
            className={`w-full py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${isScanning ? 'bg-gray-800 text-gray-600 scale-95' : 'bg-primary text-black hover:shadow-glow hover:-translate-y-1'}`}
          >
            <span className={`material-symbols-outlined text-3xl ${isScanning ? 'animate-spin' : ''}`}>
              {isScanning ? 'sync' : 'search_check'}
            </span>
            {isScanning ? 'جاري فحص قاعدة بيانات CVE...' : 'تشغيل رادار الفحص الأمني (Audit)'}
          </button>
          {scanResult === 'found' && (
            <div className="p-8 bg-severity-critical/10 border-2 border-severity-critical/30 rounded-[2.5rem] animate-in zoom-in duration-500 relative overflow-hidden group/alert">
               <div className="relative z-10 flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="w-16 h-16 bg-severity-critical/20 rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-severity-critical text-4xl">report</span>
                  </div>
                  <div className="text-right flex-1 space-y-3">
                    <h4 className="text-severity-critical font-black text-xl italic uppercase tracking-wider">تم العثور على ثغرة موروثة!</h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      المكتبة <span className="text-white font-mono bg-white/5 px-2 rounded">image-processor-utils</span> قديمة جداً ولم يتم تحديثها منذ 3 سنوات. المهاجم يمكنه استغلال خطأ في معالجة الصور داخل هذه المكتبة للسيطرة على السيرفر (RCE)، رغم أن الكود الذي كتبته أنت سليم تماماً!
                    </p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* The Blueprint */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white italic">The Blueprint</h2>
          <div className="w-24 h-1 bg-severity-medium mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-10">
          
          {/* الكود الضعيف */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-red-500 justify-end">
              <h3 className="text-xl font-black uppercase tracking-widest">نظام إدارة المكونات التقليدي المتهالك</h3>
              <span className="material-symbols-outlined text-3xl">history_toggle_off</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-red-500/30 shadow-[0_0_40px_rgba(255,71,87,0.15)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre><code>{`// ملف package.json قديم ومنسي
{
  "dependencies": {
    "`}<span className="text-red-400 font-bold">"old-crypto-lib"</span>{`": `}<span className="text-orange-500 font-black animate-pulse">"1.0.2"</span>{`, // !! CVE-2019-XXXX !!
    "`}<span className="text-red-400">"express"</span>{`": `}<span className="text-orange-500 font-black">"3.0.0"</span>{` // إصدار أثري مكشوف
  }
}
// `}<span className="text-red-600 italic">المطور لا يستخدم npm audit أو أي أداة فحص أمني</span></code></pre>
              </div>
            </div>
          </div>

          {/* الكود الآمن */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-xl font-black uppercase tracking-widest">نظام الإدارة والرقابة الاستباقية المتكامل</h3>
              <span className="material-symbols-outlined text-3xl">update</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.15)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre><code>{`// استخدام أدوات التحديث التلقائية والرقابة المستمرة
{
  "dependencies": {
    "`}<span className="text-primary font-black">"secure-crypto-lib"</span>{`": `}<span className="text-emerald-500 font-black">"^5.2.0"</span>{`,
    "`}<span className="text-primary font-black">"express"</span>{`": `}<span className="text-emerald-500 font-black">"^4.18.2"</span>{`
  }
}
// `}<span className="text-emerald-400 italic">تنفيذ دوري لأوامر الفحص الأمني (Continuous Security):</span>{`
`}<span className="text-black bg-emerald-500 px-2 py-0.5 rounded font-black">npm audit --fix</span>{` // ✓ تم سد الثغرات وتأمين السلسلة`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* (9) جزئية قاعدة الأمان في المكونات */}
      <section className="relative p-1 space-y-8 max-w-4xl mx-auto overflow-hidden rounded-[4rem]">
        <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[4rem] border-2 border-primary/10 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* خلفية احترافية بطابع أمني */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-400">قاعدة الأمان في المكونات</h2>
            
            <div className="space-y-8">
              <p className="text-gray-200 text-2xl leading-relaxed font-medium italic">
                "لا تستخدم أي مكتبة لا تعرف من يطورها، ولا تترك أي مكتبة بدون تحديث أمني. الأمان ليس حالة ثابتة، بل هو سباق مع الزمن للتخلص من المكونات المهترئة."
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 pt-10 border-t border-white/5">
                 <span className="px-8 py-3 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-black uppercase tracking-[0.3em] hover:bg-primary/20 transition-all cursor-default">Update</span>
                 <span className="px-8 py-3 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-black uppercase tracking-[0.3em] hover:bg-primary/20 transition-all cursor-default">Audit</span>
                 <span className="px-8 py-3 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-black uppercase tracking-[0.3em] hover:bg-primary/20 transition-all cursor-default">Inventory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* زر الانتقال المعدل */}
      <div className="mt-12 flex justify-center pt-10 border-t border-white/5">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-14 py-5 rounded-[2rem] font-black hover:bg-green-700 transition-all cursor-pointer shadow-[0_20px_40px_rgba(22,163,74,0.3)] text-sm uppercase tracking-[0.2em] active:scale-95"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

    </div>
  );
};
