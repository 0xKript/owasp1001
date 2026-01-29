import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A08_SoftwareDataFailures_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [labStatus, setLabStatus] = useState<'idle' | 'updating' | 'compromised' | 'secured'>('idle');
  const [checkIntegrity, setCheckIntegrity] = useState(false);

  const runInstallation = () => {
    setLabStatus('updating');
    setTimeout(() => {
      if (checkIntegrity) {
        setLabStatus('secured');
      } else {
        setLabStatus('compromised');
      }
    }, 2000);
  };

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-6 duration-1000 font-sans pb-32 text-right" dir="rtl">
      
      {/* 1️⃣ المشهد الأول: اللحظة التي خان فيها المصنع العالم */}
      <section className="relative group max-w-5xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-purple-500/5 to-blue-500/10 rounded-[3rem] blur-xl opacity-50"></div>
        <div className="relative bg-[#050505] border border-white/5 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-6 justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none">تسمم في قلب المصنع</h2>
                <p className="text-primary text-xs font-mono uppercase tracking-[0.4em] mt-2">Digital Breach: The SolarWinds Tale</p>
              </div>
              <span className="material-symbols-outlined text-primary text-6xl drop-shadow-glow">factory</span>
            </div>

            <div className="text-2xl text-gray-300 leading-[1.8] space-y-6">
              <p>
                تخيل آلاف الشركات والوكالات الحكومية تنتظر بلهفة <span className="text-primary">تحديثاً رسمياً</span> لسد ثغراتها. التحديث وصل فعلاً، يحمل التوقيع الرسمي، ومن المصدر الموثوق تماماً. 
              </p>
              <p className="text-white font-bold italic border-r-4 border-primary pr-6 bg-white/5 py-4 rounded-l-2xl">
                لكن في تلك اللحظة، لم يكن المهاجمون يطرقون الأبواب الخارجية.. لقد كانوا في الداخل، يضعون <span className="text-primary">السم</span> في آلات التصنيع نفسها!
              </p>
              <p>
                ما حدث في كارثة <span className="text-primary font-black uppercase">SolarWinds</span> لم يكن اختراقاً عادياً، بل كان انهياراً عالمياً لمبدأ <span className="text-white underline decoration-primary underline-offset-8 italic">النزاهة</span>. النظام وثق في التحديث لمجرد أنه جاء من المسار المعتاد، متجاهلاً أن المسار نفسه أصبح ملوثاً.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ هوية الكود: حينما تصبح البصمة هي كل شيء */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-white flex items-center gap-4 justify-end">
            هوية الكود وسر البصمة
            <span className="w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          <div className="space-y-6 text-xl text-gray-400 leading-relaxed">
            <p>
              في العالم الرقمي، الكود ليس مجرد نصوص، بل هو كيان يحتاج لـ <span className="text-white font-bold italic">هوية موثقة</span>. 
            </p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 group hover:border-primary/30 transition-all">
              <span className="text-primary font-black block mb-2">Software Integrity:</span>
              هل هذا البرنامج هو فعلاً ما كتبه المبرمج؟ أم أن هناك <span className="text-white font-bold italic">ضيفاً ثقيلاً</span> أضاف سطراً واحداً في الطريق?
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 group hover:border-blue-400/30 transition-all">
              <span className="text-blue-400 font-black block mb-2">Data Integrity:</span>
              هل المعلومات التي يقرأها النظام الآن هي الحقيقة؟ أم تم التلاعب بـ <span className="text-white font-bold italic">الخريطة</span> ليضل النظام طريقه؟
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full aspect-square bg-primary/5 rounded-[4rem] border-2 border-primary/20 flex items-center justify-center relative overflow-hidden group">
            <span className="material-symbols-outlined text-[180px] text-primary/10 group-hover:scale-110 transition-transform duration-1000">fingerprint</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-10 text-center w-full">
              <span className="text-[10px] text-primary font-mono font-black uppercase tracking-[0.5em] animate-pulse">Verifying_Signature</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ لحظة غض النظر: كيف يسقط النظام في الفخ؟ */}
      <section className="relative max-w-4xl mx-auto text-center space-y-10">
        <h2 className="text-4xl font-black text-gray-300 italic">لحظة غض النظر</h2>
        <div className="p-12 bg-surface-dark rounded-[4rem] border border-white/10 relative shadow-inner">
           <p className="text-2xl text-gray-300 leading-[2] italic">
             يحدث الفشل عندما يتوقف النظام عن السؤال: <span className="font-bold">من أين أتيت؟</span> ويبدأ في افتراض: <span>بما أنك هنا، فأنت صديق</span>.
           </p>
           <div className="mt-10 flex justify-center gap-4">
              <div className="px-6 py-2 bg-severity-critical/10 border border-severity-critical/20 rounded-full text-xs text-gray-300 font-black uppercase">الثقة العمياء</div>
              <div className="px-6 py-2 bg-severity-critical/10 border border-severity-critical/20 rounded-full text-xs text-gray-300 font-black uppercase">غياب الحارس</div>
              <div className="px-6 py-2 bg-severity-critical/10 border border-severity-critical/20 rounded-full text-xs text-gray-300 font-black uppercase">الاعتقاد الواهم</div>
           </div>
        </div>
      </section>

      {/* 4️⃣ الطرق المختصرة: حينما تصبح الراحة خطراً */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900/20 to-black p-12 rounded-[3.5rem] border border-blue-500/20 flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-32 h-32 bg-blue-500/10 rounded-3xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-6xl text-blue-400">add_link</span>
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-black text-white italic">الأبواب الجانبية المفتوحة</h3>
            <p className="text-xl text-gray-400 leading-relaxed">
              المطورون يعشقون السرعة، لذا يجلبون مكتبات وأكواداً من <span className="text-blue-400 font-bold italic">طرق مختصرة</span> وروابط خارجية. لكن كل رابط خارجي هو في الحقيقة <span className="text-blue-400 font-bold italic">حبل سري</span> يربط أمان تطبيقك بأمان شخص آخر لا تعرفه. إذا سقط هو، سحبتك الجاذبية معه فوراً.
            </p>
          </div>
        </div>
      </section>

      {/* 5️⃣ صراع المفاهيم: أزمة الثقة لا أزمة العمر */}
      <section className="max-w-4xl mx-auto bg-white/5 p-12 rounded-[4rem] border border-white/5 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">أزمة ثقة لا أزمة عمر</h2>
          <p className="text-2xl text-gray-300 leading-relaxed font-medium">
            هذه الثغرة لا تهتم إذا كان الكود <span className="text-primary italic">قديماً</span> أم <span className="text-primary italic">حديثاً</span>. هي تسأل سؤالاً واحداً فقط: <br/>
            <span className="text-white font-black text-4xl block mt-6 drop-shadow-glow">هل أنت فعلاً من تدّعي؟</span>
          </p>
        </div>
      </section>

      {/* 6️⃣ عقلية الصياد: المراقب الصامت */}
      <section className="relative overflow-hidden bg-[#0d150d] p-16 rounded-[4rem] border border-primary/20 shadow-2xl max-w-5xl mx-auto">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <span className="material-symbols-outlined text-[200px] text-primary">visibility</span>
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-black text-primary italic flex items-center gap-3 justify-center leading-none">
            عقلية المهاجم: فن الانتظار
            <span className="material-symbols-outlined text-4xl">psychology</span>
          </h2>
          <p className="text-2xl text-gray-300 leading-relaxed italic">
            المهاجم هنا لا يكسر الباب، هو ينتظر خلف الستار حتى تفتح له الباب بنفسك. يبحث عن تلك اللحظة التي ينسى فيها النظام التأكد من التوقيع الرقمي، ليدخل كوده الخاص متنكراً في زي تحديث رسمي.
          </p>
        </div>
      </section>

      {/* 7️⃣ تجارب ذهنية: هل تثق في الوجبة؟ */}
      <section className="max-w-5xl mx-auto space-y-12 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-widest">نماذج للتخيل الذهني</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all text-right space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
              </div>
              <h4 className="text-white font-bold text-2xl italic">المطعم والوجبة المسمومة</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                مطعم يثق في مورد الخضار لدرجة أنه لا يغسلها. إذا قرر المورد أو شخص في الطريق وضع السم، سيقدم المطعم الموت لزبائنه وهو يظن أنه يقدم الجودة.
              </p>
           </div>
           <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all text-right space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-3xl">mail</span>
              </div>
              <h4 className="text-white font-bold text-2xl italic">الرسالة التي غيرت مجرى التاريخ</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                ملك يثق في ختم رسوله. تمكن أحدهم من تغيير سطر واحد في الرسالة وتزوير الختم. الملك نفذ الأمر فوراً، وبدأت الحرب بـ <span className="text-primary">تلاعب</span> بسيط في الطريق.
              </p>
           </div>
        </div>
      </section>

      {/* نقاط الضعف الشائعة في Software and Data Integrity Failures */}
      <section className="max-w-5xl mx-auto space-y-16 py-10 text-right">
        <h2 className="font-black italic tracking-tighter uppercase leading-tight drop-shadow-glow brightness-125">
          <span className="block text-4xl lg:text-5xl text-white mb-2">نقاط الضعف الشائعة في</span>
          <span className="block text-3xl lg:text-4xl text-primary">Software and Data Integrity Failures</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="ltr">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">1. Unsigned or Unverified Updates</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>تحديث تطبيق يتم تحميله عبر HTTP بدون توقيع رقمي</li>
                <li>Plugin يتم تثبيته يدويًا بدون checksum</li>
                <li>تحديث تطبيق من مصدر غير المتجر الرسمي</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">2. Tampered JavaScript Dependencies</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>تحميل مكتبة من مصدر خارجي بدون integrity</li>
                <li>استبدال ملف برمجيات خارجي بنسخة معدلة</li>
                <li>مصدر خارجي مخترق يوزع كود تتبع أو برمجيات خبيثة</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">3. Insecure CI/CD Pipelines</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>خط إنتاج برمجيات بدون مراجعة طلبات التغيير</li>
                <li>أسرار مخزنة داخل خط الإنتاج بشكل مكشوف</li>
                <li>أي شخص يقدر يشغل بناء وينشر للإنتاج</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">4. Untrusted Third-Party Components</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>استخدام حزمة برمجية غير موثقة</li>
                <li>إضافة برمجية من مصدر غير رسمي</li>
                <li>مكتبة برمجية بدون مطور معروف</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">5. Missing Integrity Checks for Files</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>تحميل ملفات بدون مقارنة البصمة</li>
                <li>قبول ملفات إعدادات بدون تحقق</li>
                <li>تحديث برمجيات ثابتة بدون تأكد</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">6. Insecure Deserialization of Data</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>فك تشفير بيانات من طلب المستخدم مباشرة</li>
                <li>تحويل بيانات المستخدم لكيانات برمجية بدون تحقق</li>
                <li>استخدام أدوات تحويل بيانات غير آمنة</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">7. Client-Side Trust in Critical Data</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>السعر يرسل من المتصفح ويعتمد</li>
                <li>دور المستخدم يحدد من المتصفح</li>
                <li>خيارات أمنية تعتمد على التخزين المحلي</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">8. Unprotected Webhooks or Update Endpoints</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>نقطة نهاية لاستلام بيانات بدون فحص التوقيع</li>
                <li>نقطة تحديث تقبل أي طلب</li>
                <li>رابط استلام بيانات بدون رمز سري</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">9. Supply Chain Attacks Exposure</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>اختراق حزمة برمجية شائعة</li>
                <li>تحديث تبعيات يحتوي بابا خلفيا</li>
                <li>تلاعب بمكتبة مستخدمة على نطاق واسع</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-left">
            <h4 className="text-3xl font-bold text-primary mb-4 drop-shadow-glow brightness-110">10. Improper Version Control of Artifacts</h4>
            <div className="text-gray-300 space-y-1" dir="rtl">
              <p className="font-bold text-lg text-primary mb-3">أمثلة:</p>
              <ul className="list-disc pr-6 text-gray-400 text-lg space-y-2">
                <li>استخدام أحدث نسخة بدل نسخة محددة</li>
                <li>استبدال ملف بالبناء بدون تنبيه</li>
                <li>عدم توثيق مصدر الملفات التنفيذية</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* مختبر تفاعلي: متجر الإضافات البرمجية */}
      <section className="max-w-5xl mx-auto p-12 bg-black border-2 border-primary/20 rounded-[3.5rem] shadow-2xl space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-primary uppercase">مختبر نزاهة البرمجيات</h2>
          <p className="text-gray-400 text-xl leading-relaxed">تطبيق ويب لتحميل إضافات النظام. هل ستتحقق من سلامة ما تثبته؟</p>
        </div>

        <div className="bg-surface-dark p-10 rounded-3xl border border-white/10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">Update Manager</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>
          </div>

          {labStatus === 'idle' && (
            <div className="space-y-8">
              <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-primary text-5xl">extension</span>
                  <div>
                    <h4 className="text-white font-bold text-xl">إضافة تحسين الأداء v2.0</h4>
                    <p className="text-gray-500 text-sm mt-1">المصدر: خادم توزيع خارجي</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-black/40 p-6 rounded-xl border border-white/5">
                <span className="text-base text-gray-300">تفعيل فحص التوقيع الرقمي قبل التثبيت</span>
                <button 
                  onClick={() => setCheckIntegrity(!checkIntegrity)}
                  className={`w-14 h-7 rounded-full transition-colors relative ${checkIntegrity ? 'bg-primary' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${checkIntegrity ? 'left-8' : 'left-1'}`}></div>
                </button>
              </div>

              <button 
                onClick={runInstallation}
                className="w-full py-5 bg-primary text-black font-black text-lg rounded-xl hover:brightness-110 active:scale-95 transition-all uppercase"
              >
                بدء التثبيت
              </button>
            </div>
          )}

          {labStatus === 'updating' && (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="text-primary font-mono text-sm uppercase tracking-widest">Installing Component</span>
            </div>
          )}

          {labStatus === 'compromised' && (
            <div className="space-y-8 animate-in zoom-in duration-500">
              <div className="p-10 bg-severity-critical/10 border border-severity-critical/30 rounded-2xl text-center">
                <span className="material-symbols-outlined text-severity-critical text-6xl mb-4">gpp_maybe</span>
                <h4 className="text-white font-bold text-xl">تم اختراق النظام</h4>
                <p className="text-gray-400 text-lg mt-3 leading-relaxed">لقد وثقت في الإضافة دون فحص نزاهتها. تم زرع كود خبيث داخل ملفاتك الأساسية بصمت.</p>
              </div>
              <button onClick={() => setLabStatus('idle')} className="w-full py-4 text-gray-500 hover:text-white transition-colors text-sm uppercase font-bold">إعادة تهيئة البيئة</button>
            </div>
          )}

          {labStatus === 'secured' && (
            <div className="space-y-8 animate-in zoom-in duration-500">
              <div className="p-10 bg-primary/10 border border-primary/30 rounded-2xl text-center">
                <span className="material-symbols-outlined text-primary text-6xl mb-4">verified</span>
                <h4 className="text-white font-bold text-xl">تم إيقاف التهديد</h4>
                <p className="text-gray-400 text-lg mt-3 leading-relaxed">فشل فحص التوقيع الرقمي للملف المحمل. تم رفض التثبيت وحماية نزاهة النظام من كود مجهول الهوية.</p>
              </div>
              <button onClick={() => setLabStatus('idle')} className="w-full py-4 text-primary font-bold transition-colors text-sm uppercase">العودة للوضع الآمن</button>
            </div>
          )}
        </div>

        <div className="pt-10 border-t border-white/5">
          <h3 className="text-2xl font-black text-white mb-6">ماذا تعلمت من التجربة؟</h3>
          <p className="text-gray-400 text-xl leading-relaxed">
            لقد اكتشفت أن التحديثات والبرمجيات التي نحملها من الإنترنت قد تبدو شرعية في مظهرها، لكنها قد تكون ملوثة بكود خبيث في الطريق. الثقة العمياء هي الثغرة الحقيقية، والحل الوحيد هو فرض آليات فحص النزاهة والتوقيع الرقمي لكل بايت يدخل النظام. غياب هذا الحارس يعني أنك تمنح المهاجم مفتاح الخزنة بمحض إرادتك.
          </p>
        </div>
      </section>

      {/* 8️⃣ دستور الوقاية: إعادة بناء الثقة */}
      <section className="relative p-1 space-y-8 max-w-4xl mx-auto overflow-hidden rounded-[4rem]">
        <div className="bg-white/5 backdrop-blur-3xl p-20 rounded-[4rem] border-2 border-primary/10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-12">
            <h2 className="text-4xl font-black text-white italic tracking-widest uppercase">دستور إعادة بناء الثقة</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-right">
               <div className="space-y-3">
                  <span className="text-primary font-black text-xl flex items-center justify-end gap-3">
                    التحقق قبل التصديق
                    <span className="material-symbols-outlined">rule</span>
                  </span>
                  <p className="text-gray-400 text-lg">عامل كل بايت يدخل نظامك كأنه خصم محتمل حتى يثبت العكس بالبصمة الرقمية.</p>
               </div>
               <div className="space-y-3">
                  <span className="text-primary font-black text-xl flex items-center justify-end gap-3">
                    سيادة التوقيع
                    <span className="material-symbols-outlined">verified</span>
                  </span>
                  <p className="text-gray-400 text-lg">لا كود بدون ختم، ولا بيانات بدون توقيع. النزاهة هي الحارس الذي لا ينام.</p>
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
          className="bg-green-600 text-white px-20 py-6 rounded-[2.5rem] font-black hover:bg-green-700 transition-all cursor-pointer shadow-[0_20px_40px_rgba(22,163,74,0.3)] text-base uppercase tracking-[0.3em] active:scale-95"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

    </div>
  );
};
