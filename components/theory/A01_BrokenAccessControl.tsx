import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A01_BrokenAccessControl_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [urlId, setUrlId] = useState('101');
  const [showExposure, setShowExposure] = useState(false);
  const [specialAccess, setSpecialAccess] = useState(false);
  const [hackingAttempts, setHackingAttempts] = useState(0);
  const [lastHackTime, setLastHackTime] = useState('');

  // حالة تفاعلية لقصة الفندق
  const [hotelRoom, setHotelRoom] = useState('101');
  const isHotelBreached = hotelRoom === '999';

  // حالة المختبر الموجه
  const [labPath, setLabPath] = useState('');
  const [tempPath, setTempPath] = useState('');
  
  const isIdorBreach = labPath === 'profile/100';
  const isAdminBreach = labPath === 'admin';

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right">
      
      {/* قصة واقعية: حين فتح الإذن الخاطئ كل الأبواب */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] to-[#05050a] p-10 rounded-[2.5rem] border-r-8 border-primary shadow-2xl transition-all duration-700 hover:shadow-primary/5">
        {/* خلفية تفاعلية ناعمة */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">history_edu</span>
            قصة واقعية: حين فتح الإذن الخاطئ كل الأبواب
          </h2>
          <div className="text-xl text-gray-300 leading-relaxed space-y-4">
            <p>
              في شركة <span className="text-primary font-bold">نكسوس التقنية</span>، كان المبرمجون فخورين جداً بنظام الفواتير الجديد الذي أطلقوه لخدمة آلاف العملاء. النظام كان سريعاً، وكلمات المرور مشفرة بأحدث المعايير، مما أعطى الجميع شعوراً زائفاً بالأمان المطلق.
            </p>
            <p>
              بدأت الكارثة عندما اكتشف أحد العملاء بالصدفة أنه عند عرض فاتورته الخاصة، يظهر رابط في المتصفح ينتهي برقم محدد يمثل معرف الفاتورة. بدافع الفضول، قام العميل بتغيير هذا الرقم بإنقاص واحد منه فقط وضغط على زر الإدخال.
            </p>
            <p>
              المفاجأة كانت أن النظام لم يعترض، بل قام فوراً بعرض فاتورة عميل آخر تحتوي على اسمه الكامل، وعنوان سكنه، وتفاصيل حسابه البنكي. النظام تأكد أن المستخدم مسجل دخوله فعلاً، لكنه ارتكب خطأ فادحاً بأنه لم يتأكد هل يملك هذا المستخدم الحق في رؤية تلك الفاتورة تحديداً أم لا.
            </p>
            <p>
              خلال ساعات قليلة، انتشر الخبر، واستطاع المهاجمون سحب آلاف السجلات الحساسة ببساطة عبر تغيير الأرقام في الرابط. هذه هي جوهر ثغرة <span className="text-primary font-bold">فشل التحكم في الوصول</span>؛ حيث ينهار جدار الحماية المنطقي بين بيانات المستخدمين رغم أن النظام يعرف هويتهم جيداً.
            </p>
          </div>
        </div>
      </section>

      {/* 1. الافتتاحية التفاعلية: تجربة فندق الأشباح الرقمي */}
      <section className="relative overflow-hidden bg-[#050505] p-1 bg-gradient-to-br from-white/5 to-transparent rounded-[3.5rem] border border-white/10 shadow-2xl">
        <div className="bg-[#0a0a0a] rounded-[3.4rem] p-10 lg:p-16 relative overflow-hidden group/hotel">
          
          {/* تأثيرات خلفية سينمائية */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 group-hover/hotel:bg-primary/10"></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 ${isHotelBreached ? 'bg-red-600/20' : 'bg-blue-600/5'}`}></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row-reverse gap-12 items-center">
            
            {/* الجانب النصي */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-5 justify-end">
                <div className="text-right">
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">فندق الأشباح الرقمي</h2>
                  <div className="h-1.5 w-24 bg-primary mt-2 rounded-full shadow-glow group-hover/hotel:w-40 transition-all duration-700"></div>
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center border border-primary/20 rotate-3">
                   <span className="material-symbols-outlined text-primary text-4xl">hotel</span>
                </div>
              </div>

              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                تخيل أنك حجزت الغرفة <span className="text-white font-black px-2 py-0.5 bg-white/5 rounded">101</span>. 
                البطاقة التي استلمتها هي هويتك داخل الفندق. المشكلة ليست في البطاقة، بل في أن أبواب الفندق <span className="text-primary italic">تثق في الرقم المكتب عليها فقط</span> دون التأكد من صاحبها.
              </p>

              <div className={`p-6 rounded-2xl border-2 transition-all duration-700 ${isHotelBreached ? 'bg-red-600/10 border-red-600/40 animate-pulse' : 'bg-white/5 border-white/10 opacity-60'}`}>
                <p className="text-lg leading-relaxed text-gray-300">
                  {isHotelBreached 
                    ? "⚠️ تم الاختراق! لقد قمت بتغيير الرقم يدوياً.. والآن انفتح باب الجناح الملكي لك رغم أنك لم تدفع ثمنه. النظام افترض أنك تملك الصلاحية لمجرد أنك تملك الرقم!"
                    : "جرّب تغيير رقم الغرفة في البطاقة المقابلة إلى 999 وشاهد ماذا سيحدث للمنطق الأمني للفندق."
                  }
                </p>
              </div>
            </div>

            {/* الجانب التفاعلي: بطاقة المفتاح الرقمية */}
            <div className="relative w-full max-w-[380px] aspect-[1.6/1] perspective-1000 shrink-0">
               <div className={`w-full h-full rounded-[2.5rem] border-4 transition-all duration-1000 relative overflow-hidden flex flex-col justify-between p-8
                 ${isHotelBreached ? 'bg-red-600/20 border-red-600 shadow-[0_0_50px_rgba(255,0,0,0.3)] -rotate-3 scale-110' : 'bg-gradient-to-br from-[#111] to-black border-white/20 shadow-2xl'}
               `}>
                 {/* خلفية البطاقة */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
                 
                 <div className="flex justify-between items-start relative z-10">
                    <span className={`material-symbols-outlined text-4xl ${isHotelBreached ? 'text-red-500 animate-bounce' : 'text-primary'}`}>
                      {isHotelBreached ? 'gpp_maybe' : 'verified_user'}
                    </span>
                    <div className="text-left font-mono" dir="ltr">
                      <div className="text-[8px] text-gray-600 uppercase font-black tracking-widest">Digital_ID_Token</div>
                      <div className="text-[10px] text-white">#BT-992-SEC</div>
                    </div>
                 </div>

                 <div className="relative z-10 space-y-1">
                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest text-center">Room_Access_Level</div>
                    <div className="flex items-center justify-center gap-4">
                       <span className="material-symbols-outlined text-gray-600 text-xl">edit</span>
                       <input 
                         type="text" 
                         value={hotelRoom}
                         maxLength={3}
                         onChange={(e) => setHotelRoom(e.target.value)}
                         className={`bg-black/60 border-2 rounded-xl w-24 py-2 text-center text-3xl font-black font-mono outline-none transition-all
                           ${isHotelBreached ? 'border-red-600 text-red-500 animate-shake shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'border-white/10 text-white focus:border-primary'}
                         `}
                       />
                    </div>
                 </div>

                 <div className="flex justify-between items-end relative z-10">
                    <div className="text-right">
                       <div className="text-[9px] text-gray-600 uppercase font-bold">Guest_Status</div>
                       <div className={`text-xs font-black uppercase tracking-widest ${isHotelBreached ? 'text-red-500' : 'text-green-500'}`}>
                         {isHotelBreached ? '!! UNAUTHORIZED !!' : 'AUTHENTICATED'}
                       </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                       <span className={`material-symbols-outlined text-2xl ${isHotelBreached ? 'text-red-500' : 'text-gray-700'}`}>
                         {isHotelBreached ? 'lock_open' : 'lock'}
                       </span>
                    </div>
                 </div>

                 {/* تأثير المسح الضوئي فوق البطاقة */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-white/5 animate-scan-v-fast opacity-20 pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. قسم "ما هي الثغرة؟" - تصميم HUD استخباراتي */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
           <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex items-center justify-between flex-row-reverse">
              <span className="text-xs font-pixel text-primary tracking-[0.3em] uppercase">Intelligence_Briefing // A01</span>
              <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
           </div>
           
           <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-right">
                 <h2 className="text-4xl font-black text-white italic">ما هي ثغرة <span className="text-primary">Broken Access Control</span>؟</h2>
                 <p className="text-gray-400 text-xl leading-relaxed">
                    هي فشل النظام في فرض <span className="text-white font-bold">الحدود الأمنية</span> بين المستخدمين. النظام قد ينجح في التأكد من هويتك (من أنت)، لكنه يفتقد للذكاء الكافي للتحقق من <span className="text-primary italic font-bold">صلاحياتك</span> (ماذا يُسمح لك بفعله). النتيجة؟ مستخدم عادي يستطيع الوصول لبيانات حساسة أو وظائف إدارية ببساطة عبر التلاعب بالطلبات.
                 </p>
                 <div className="flex items-center gap-4 justify-end pt-4">
                    <div className="text-right">
                       <span className="block text-primary font-pixel text-xs uppercase">Core Logic</span>
                       <span className="text-white font-bold text-base">انهيار جدار الصلاحيات</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-4xl">security_update_good</span>
                 </div>
              </div>

              {/* المقارنة التفاعلية */}
              <div className="bg-black/50 p-6 rounded-3xl border border-white/5 space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border-r-4 border-primary group/item hover:bg-primary/5 transition-all">
                    <div className="flex items-center gap-3 justify-end mb-1">
                       <span className="text-white font-black text-lg">من أنت؟ (Authentication)</span>
                       <span className="material-symbols-outlined text-primary text-xl">fingerprint</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">التأكد من أنك User-101 عبر كلمة مرورك أو هويتك الرقمية.</p>
                 </div>
                 <div className="flex justify-center py-2">
                    <span className="material-symbols-outlined text-gray-700">sync_alt</span>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border-r-4 border-severity-medium group/item hover:bg-severity-medium/5 transition-all">
                    <div className="flex items-center gap-3 justify-end mb-1">
                       <span className="text-white font-black text-lg">ماذا تستطيع أن تفعل؟ (Authorization)</span>
                       <span className="material-symbols-outlined text-severity-medium text-xl">key_visualizer</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">هنا تقع الثغرة! الفشل في التأكد هل User-101 مسموح له قراءة ملفات Account-A؟</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. قسم المنظور - ماذا يرى المطور وما يراه المهاجم */}
      <section className="relative group max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-severity-medium/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative bg-gradient-to-br from-[#1a150a] to-[#0a0a0a] border-2 border-severity-medium/30 rounded-[2rem] p-8 shadow-2xl overflow-hidden group-hover:border-severity-medium/60 transition-all">
           <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <span className="material-symbols-outlined text-[150px] text-severity-medium">lightbulb</span>
           </div>
           
           <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 text-right" dir="rtl">
              <div className="w-20 h-20 bg-severity-medium/20 rounded-full flex items-center justify-center border border-severity-medium/30 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,165,2,0.2)] shrink-0">
                 <span className="material-symbols-outlined text-severity-medium text-4xl animate-pulse">psychology</span>
              </div>
              <div className="flex-1 space-y-4">
                 <h3 className="text-2xl font-black text-severity-medium italic flex items-center gap-3 w-full justify-start">
                    <span className="material-symbols-outlined text-3xl">visibility</span>
                    <span>ماذا يرى المطوّر… وما يراه المهاجم؟</span>
                 </h3>
                 <p className="text-gray-300 leading-relaxed text-xl font-medium">
                    غالباً ما يعتمد المطورون على <span className="text-white font-bold underline decoration-severity-medium/50">الأمان عبر الغموض</span>، ظناً منهم أن أحداً لن يخمن المسارات المخفية أو يغير أرقام المعرفات يدوياً. إنهم ينسون أن المهاجم لا يستخدم واجهة المستخدم فقط، بل يتلاعب بطلبات الـ HTTP مباشرة.
                 </p>
              </div>
           </div>
           
           <div className="mt-6 flex justify-end">
              <div className="px-4 py-1.5 bg-black/40 rounded-full border border-white/5 text-xs font-pixel text-gray-500 uppercase tracking-widest">
                 Threat_Model: Cognitive_Bias
              </div>
           </div>
        </div>
      </section>

      {/* أشهر 10 طرق يستغل بها Broken Access Control */}
      <section className="space-y-8 animate-in fade-in duration-1000">
        <div className="flex items-center gap-3 text-primary border-r-4 border-primary pr-4">
          <span className="material-symbols-outlined text-3xl">list_alt</span>
          <h2 className="text-3xl lg:text-5xl font-black text-white italic">أشهر 10 طرق يستغل بها Broken Access Control</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6" dir="ltr">
          
          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">1. IDOR (Insecure Direct Object Reference)</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الوصول لبيانات سجلات المستخدمين الآخرين عبر تغيير رقم المعرف.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: تغيير الرقم 101 إلى 102 في رابط المتصفح.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: تسريب بيانات مستخدمين آخرين بالكامل.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">2. Missing Authorization on API endpoints</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الوصول لنقاط نهاية الواجهات البرمجية الحساسة بدون توثيق كافٍ.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: طلب رابط api/v1/users من المتصفح مباشرة.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: كشف أسرار النظام وتفاصيل قاعدة البيانات.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">3. Horizontal Privilege Escalation</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الانتقال من حساب مستخدم إلى حساب مستخدم آخر في نفس المستوى.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: مستخدم عادي يدخل لملف شخصي لمستخدم عادي آخر ويعدله.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: انتهاك خصوصية المستخدمين المساويين في الرتبة.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">4. Vertical Privilege Escalation</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الحصول على صلاحيات أعلى من المسموح بها للحساب الحالي.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: مستخدم عادي يكتسب صلاحيات المدير أو المسؤول الرئيسي.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: السيطرة الكاملة على وظائف النظام الحساسة.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">5. Accessing Admin Panels Directly</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-400 text-bold text-base lg:text-lg italic">مثال: كتابة مسار /admin-dashboard في شريط العنوان وتجاوز الحماية.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: الوصول لأدوات التحكم المركزية في الموقع.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">6. Hidden Functionality Exposure</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">اكتشاف وظائف مخفية في كود المصدر أو ملفات النظام الداخلية.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: العثور على ميزة debug_delete_all واستخدامها بدون إذن.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: تنفيذ عمليات تدميرية غير مخصصة للمستخدمين.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">7. Parameter Tampering for Access</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">التلاعب بالمتغيرات المرسلة في الطلب لتغيير الصلاحية الممنوحة.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: تغيير قيمة is_admin من false إلى true في طلب المتصفح.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: خداع السيرفر ومنحه صلاحيات غير مستحقة قانوناً.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">8. Insecure Object References</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الإشارة لكائنات النظام الداخلية بأسماء أو أرقام يمكن تخمينها.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: طلب ملف backup.zip الموجود في مجلد متاح للعامة.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: تحميل ملفات حساسة تخص البنية التحتية.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">9. Role Validation Missing</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-400 text-bold text-lg lg:text-xl font-medium">غياب التحقق من الدور الوظيفي للمستخدم عند كل طلب جديد.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: السيرفر ينفذ طلب الحذف لمجرد وجود جلسة دخول نشطة.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: السماح بأفعال غير مصرح بها بناءً على نوع الحساب.</p>
            </div>
          </div>

          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3 hover:border-primary/30 transition-all group">
            <div className="text-left font-mono text-primary text-xl lg:text-2xl font-black group-hover:scale-[1.02] transition-transform" dir="ltr">10. Direct URL Access to Restricted Resources</div>
            <div className="text-right space-y-2" dir="rtl">
              <p className="text-gray-300 text-lg lg:text-xl font-medium">الوصول المباشر للملفات أو الموارد الخاصة عبر روابطها المباشرة.</p>
              <p className="text-gray-400 text-base lg:text-lg italic">مثال: فتح رابط صورة هوية مستخدم آخر المخزنة في السيرفر.</p>
              <p className="text-severity-critical font-bold text-base lg:text-lg uppercase">→ الخطر: تسريب المستندات والملفات الشخصية المحمية.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Access Control Breach Experience */}
      <section className="bg-[#050505] p-8 lg:p-12 rounded-[3.5rem] border border-primary/30 shadow-2xl space-y-10 relative overflow-hidden group">
        {/* Header HUD */}
        <div className="relative flex items-center justify-between border-b border-white/10 pb-8 flex-row-reverse">
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-3xl text-primary animate-pulse">explore</span>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-white italic tracking-tight uppercase leading-none">Access Control Breach Experience</h2>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">Logic Discovery Lab</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></div>
             <span className="text-primary text-xs font-mono tracking-widest uppercase">Live_Node_Discovery</span>
          </div>
        </div>

        {/* كيف تستخدم هذا اللاب؟ */}
        <div className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 space-y-8 text-right">
           <div className="flex items-center gap-3 justify-end border-b border-white/5 pb-4 mb-2">
             <h3 className="text-primary font-black text-4xl italic">
               كيف تستخدم هذا اللاب؟
             </h3>
             <span className="material-symbols-outlined text-primary text-4xl">help_center</span>
           </div>
           <div className="space-y-8 text-gray-300">
              <div className="flex gap-4 justify-end group/item transition-all hover:translate-x-[-4px]">
                 <div className="flex-1">
                    <span className="text-white font-bold text-2xl block mb-2">1 ما هو هدفك في هذا اللاب</span>
                    <p className="text-xl leading-relaxed">هدفك هو اكتشاف ثغرة فشل التحكم في الوصول عبر محاكاة واقعية لنظام شركة نكسوس التقنية وتجاوز الحدود المنطقية التي وضعها المبرمج.</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end group/item transition-all hover:translate-x-[-4px]">
                 <div className="flex-1">
                    <span className="text-white font-bold text-2xl block mb-2">2 ماذا ترى كمستخدم عادي</span>
                    <p className="text-xl leading-relaxed">أنت الآن موظف عادي تملك صلاحية الوصول لبياناتك الشخصية فقط عبر رابط محدد يظهر فيه رقم معرفك الخاص.</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end group/item transition-all hover:translate-x-[-4px]">
                 <div className="flex-1">
                    <span className="text-white font-bold text-2xl block mb-2">3 ماذا يُطلب منك أن تجرّب</span>
                    <p className="text-xl leading-relaxed">عليك التفكير كمهاجم عبر تجربة تغيير الأرقام في رابط المتصفح أو محاولة كتابة مسارات لصفحات حساسة مثل صفحة الإدارة التي لم تظهر في قائمتك.</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end group/item transition-all hover:translate-x-[-4px]">
                 <div className="flex-1">
                    <span className="text-white font-bold text-2xl block mb-2">4 متى تعتبر أنك نجحت</span>
                    <p className="text-xl leading-relaxed">تعتبر ناجحا عند تمكنك من رؤية بيانات موظف آخر لا تملك صلاحية الوصول إليه أو عند فتح لوحة التحكم الإدارية الكاملة.</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end group/item transition-all hover:translate-x-[-4px]">
                 <div className="flex-1">
                    <span className="text-white font-bold text-2xl block mb-2">5 ماذا يعني هذا أمنيًا</span>
                    <p className="text-xl leading-relaxed">هذا يثبت وجود ثغرة فشل التحكم في الوصول حيث يعتمد النظام على هوية المستخدم فقط ولا يتحقق من صلاحياته عند طلب الموارد.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Scenario Setup */}
        <div className="bg-white/5 p-8 rounded-[2.5rem] border-r-8 border-primary relative z-10">
           <h3 className="text-white font-black text-xl mb-4 italic">قصة المختبر</h3>
           <p className="text-gray-300 text-lg leading-relaxed">
              أنت الآن موظف في شركة نكسوس التقنية. تم منحك حسابا عاديا لمتابعة مهامك اليومية. النظام يبدو منظما وكل قسم معزول عن الآخر بناء على نوع الحساب. هل هذا العزل حقيقي أم مجرد وهم بصري؟
           </p>
        </div>

        {/* Interactive Simulated Browser */}
        <div className="bg-[#0a0a0a] rounded-[3rem] border border-white/10 overflow-hidden shadow-inner relative z-10">
           {/* Simulated URL Bar */}
           <div className="bg-[#151515] px-6 py-4 flex items-center gap-4 border-b border-white/5" dir="ltr">
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
              </div>
              <div className="flex-1 bg-black/60 rounded-xl px-5 py-2.5 flex items-center gap-4 text-sm font-mono text-gray-500 border border-white/5">
                 <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-700 select-none">https://nexus-corp.com/api/v1/</span>
                    <input 
                      type="text" 
                      value={tempPath}
                      onChange={(e) => setTempPath(e.target.value)}
                      className="bg-transparent border-none p-0 focus:ring-0 text-primary font-black w-full"
                      placeholder="path/id"
                    />
                 </div>
                 <button 
                   onClick={() => setLabPath(tempPath)}
                   className="bg-primary text-black px-6 py-1.5 rounded-xl font-black text-xs hover:bg-primary-hover transition-all shrink-0 shadow-glow"
                 >
                   تنفيذ الطلب
                 </button>
              </div>
              <div className="material-symbols-outlined text-gray-600 text-xl">refresh</div>
           </div>

           {/* Simulated Page Content */}
           <div className="p-12 min-h-[350px] flex flex-col items-center justify-center text-center">
              {labPath === 'profile/101' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary/20">
                      <span className="material-symbols-outlined text-primary text-5xl">person</span>
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white">User-101</h4>
                      <p className="text-gray-500 font-bold tracking-widest uppercase text-[11px]">رتبة الحساب: موظف عادي</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-sm text-gray-400">مهامك اليومية: مراجعة سجلات الصيانة العادية</p>
                   </div>
                   <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-bold italic">
                      تلميح: فكر في كيفية الوصول لسجلات زملائك عبر تعديل بسيط في الرابط الظاهر أمامك.
                   </div>
                </div>
              )}

              {isIdorBreach && (
                <div className="space-y-8 animate-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-severity-critical/10 rounded-full flex items-center justify-center mx-auto border-2 border-severity-critical/40 shadow-[0_0_30px_rgba(255,71,87,0.2)]">
                      <span className="material-symbols-outlined text-severity-critical text-5xl animate-pulse">shield_person</span>
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-severity-critical italic">Account-A</h4>
                      <p className="text-severity-critical font-black tracking-widest uppercase text-[11px]">رتبة الحساب: مديرة العمليات</p>
                   </div>
                   <div className="p-5 bg-severity-critical/10 rounded-2xl border border-severity-critical/30 space-y-4">
                      <div className="flex items-center justify-center gap-3 text-severity-critical font-black uppercase text-sm">
                         <span className="material-symbols-outlined animate-bounce">warning</span>
                         تنبيه وصول غير مصرح
                      </div>
                      <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                        نجاح: لقد تجاوزت الحدود المنطقية ووصلت لبيانات Account-A عبر استغلال ضعف التحقق من المعرفات. النظام لم يفحص هل تملك الحق في رؤية هذا الرقم تحديدا أم لا.
                      </p>
                   </div>
                </div>
              )}

              {isAdminBreach && (
                <div className="space-y-8 animate-in zoom-in duration-500 w-full max-w-2xl">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-severity-critical/5 border-2 border-severity-critical/20 rounded-3xl text-right space-y-3">
                         <h5 className="text-white font-black text-sm uppercase tracking-widest">لوحة التحكم السرية</h5>
                         <div className="h-1 w-12 bg-severity-critical rounded-full"></div>
                         <p className="text-[11px] text-gray-500 italic">ميزة حذف المستخدمين: مفعلة</p>
                         <p className="text-[11px] text-gray-500 italic">تصدير قاعدة البيانات: مفعل</p>
                      </div>
                      <div className="p-6 bg-severity-critical/5 border-2 border-severity-critical/20 rounded-3xl text-right space-y-3">
                         <h5 className="text-white font-black text-sm uppercase tracking-widest">إعدادات النظام</h5>
                         <div className="h-1 w-12 bg-severity-critical rounded-full"></div>
                         <p className="text-[11px] text-gray-500 italic">تغيير مفاتيح التشفير</p>
                         <p className="text-[11px] text-gray-500 italic">إيقاف الخوادم</p>
                      </div>
                   </div>
                   <div className="p-5 bg-severity-critical/10 rounded-2xl border border-severity-critical/30 space-y-4">
                      <div className="flex items-center justify-center gap-3 text-severity-critical font-black uppercase text-sm">
                         <span className="material-symbols-outlined animate-bounce">lock_open</span>
                         وصول غير مصرح للوحة الإدارة
                      </div>
                      <p className="text-gray-300 text-base leading-relaxed">
                        نجاح: لقد تمكنت من الوصول للوحة التحكم السرية عبر كتابة المسار مباشرة مما يثبت غياب حارس الصلاحيات. المبرمج أخفى الزر من القائمة لكنه لم يحم المسار نفسه.
                      </p>
                   </div>
                </div>
              )}

              {!['profile/101', 'profile/100', 'admin'].includes(labPath) && (
                <div className="text-gray-700 italic flex flex-col items-center gap-4 opacity-40">
                   <span className="material-symbols-outlined text-6xl">search_off</span>
                   <p className="text-sm font-mono tracking-widest uppercase">Path_Not_Defined // Waiting_For_Input</p>
                </div>
              )}
           </div>
        </div>

        {/* Interactive Controls / Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div className="space-y-3">
             <button 
               onClick={() => { setTempPath('profile/100'); setLabPath('profile/100'); }}
               className={`w-full p-8 rounded-[2.5rem] border-2 transition-all text-right group ${isIdorBreach ? 'border-severity-critical bg-severity-critical/10' : 'border-white/5 bg-white/5 hover:border-primary/40'}`}
             >
                <h4 className="text-white font-black text-2xl mb-2 italic leading-none">المهمة الأولى: كسر الحدود</h4>
                <p className="text-base text-gray-400 leading-relaxed">جرب تغيير الرقم في نهاية الرابط للوصول لبيانات شخص آخر في نفس المستوى الوظيفي.</p>
             </button>
             <p className="text-sm text-primary/60 text-right px-4 italic">تلميح: انظر إلى الرابط في الأعلى وفكر ماذا سيحدث لو غيرت الرقم 101.</p>
           </div>

           <div className="space-y-3">
             <button 
               onClick={() => { setTempPath('admin'); setLabPath('admin'); }}
               className={`w-full p-8 rounded-[2.5rem] border-2 transition-all text-right group ${isAdminBreach ? 'border-severity-critical bg-severity-critical/10' : 'border-white/5 bg-white/5 hover:border-primary/40'}`}
             >
                <h4 className="text-white font-black text-2xl mb-2 italic leading-none">المهمة الثانية: القفز للأعلى</h4>
                <p className="text-base text-gray-400 leading-relaxed">حاول كتابة مسار الإدارة مباشرة في الرابط لتجاوز قيود القائمة الظاهرة أمامك.</p>
             </button>
             <p className="text-sm text-primary/60 text-right px-4 italic">تلميح: المبرمج قد يخفي الأزرار لكنه قد ينسى حماية المسار الفعلي للوحة الإدارة.</p>
           </div>
        </div>

        {/* Breach Analysis (Visible after success) */}
        {(isIdorBreach || isAdminBreach) && (
          <div className="space-y-6 animate-in slide-in-from-top-6 duration-700 relative z-10">
             <div className="bg-black/80 p-8 rounded-[3rem] border border-severity-critical/30 space-y-6">
                <div className="flex items-center gap-3 text-severity-critical mb-2 flex-row-reverse">
                   <span className="material-symbols-outlined">psychology</span>
                   <h4 className="text-xl font-black italic">كيف فكر المهاجم؟</h4>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                   المهاجم لا يثق بما تظهره الواجهة الرسومية. هو يحلل بنية الروابط ويتوقع المسارات المخفية. عندما يجد أن النظام يثق في المعرفات المرسلة عبر الرابط دون فحص دقيق للصلاحيات، يعلم أنه عثر على منجم بيانات. المشكلة هنا هي <span className="text-white font-bold underline decoration-severity-critical">ثقة الخادم العمياء</span> في طلبات المستخدم.
                </p>
             </div>

             <div className="bg-primary/5 p-8 rounded-[3rem] border border-primary/20 space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2 flex-row-reverse">
                   <span className="material-symbols-outlined">verified</span>
                   <h4 className="text-xl font-black italic">الحل في التصميم الآمن</h4>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                   يجب فرض ضوظوابط الوصول عند كل نقطة دخول للنظام. لا يكفي أن يكون المستخدم مسجلا دخوله، بل يجب التأكد برمجيا في كل طلب من أن هذا المستخدم تحديدا يملك الحق في رؤية هذا المورد أو تنفيذ هذا الإجراء. التصميم الصحيح يفترض أن المستخدم <span className="text-white font-bold">خصم محتمل</span> يحاول تجاوز حدوده.
                </p>
             </div>
          </div>
        )}
      </section>

      {/* 5. كود تحت المجهر */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">كود تحت المجهر</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-500 font-mono text-base mt-4 text-center">Environment: Node.js / Express</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          
          {/* الكود الضعيف */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-2xl font-bold uppercase tracking-widest">ثغرة واضحة (Vulnerable)</h3>
              <span className="material-symbols-outlined text-3xl">cancel</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_30px_rgba(255,71,87,0.1)]">
              <div className="absolute top-0 right-0 w-1 h-full bg-severity-critical"></div>
              <div className="bg-[#080808] p-8 font-mono text-lg leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code className="block">
<span className="text-gray-500">{'// الخطر: المطور يثق بمدخلات المستخدم كمعيار وحيد'}</span><br/>
<span className="text-blue-400">app</span>.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/api/profile'</span>, (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) <span className="text-blue-400">=&gt;</span> {'{'}<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-red-400">targetId</span> = <span className="text-orange-400">req</span>.<span className="text-blue-400">query</span>.<span className="text-red-400">id</span>; <span className="text-severity-critical font-bold text-sm bg-severity-critical/20 px-1 rounded animate-pulse">!! خطر: تحكم خارجي !!</span><br/>
<br/>
&nbsp;&nbsp;<span className="text-gray-500">{'// لا يوجد تحقق: هل تملك هذه الـ ID فعلاً؟'}</span><br/>
&nbsp;&nbsp;<span className="text-blue-400">db</span>.<span className="text-yellow-400">findUser</span>(<span className="text-red-400">targetId</span>).<span className="text-yellow-400">then</span>(<span className="text-orange-400">user</span> <span className="text-blue-400">=&gt;</span> {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">res</span>.<span className="text-yellow-400">json</span>(<span className="text-orange-400">user</span>);<br/>
&nbsp;&nbsp;{'}'});<br/>
{'}'});
                  </code>
                </pre>
              </div>
            </div>
            <div className="bg-severity-critical/5 p-4 rounded-xl border border-severity-critical/10 flex items-center gap-3 justify-end">
              <p className="text-base text-gray-400 italic">المشكلة: يمكن للمهاجم كتابة أي رقم في الرابط والحصول على أي ملف شخصي.</p>
              <span className="material-symbols-outlined text-severity-critical">info</span>
            </div>
          </div>

          {/* الكود الآمن */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-2xl font-bold uppercase tracking-widest">كود آمن (Secure)</h3>
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>
              <div className="bg-[#080808] p-8 font-mono text-lg leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code className="block">
<span className="text-gray-500">{'// الأمان: nعتمد على هوية المستخدم الموثقة في السيرفر'}</span><br/>
<span className="text-blue-400">app</span>.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/api/profile'</span>, (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) <span className="text-blue-400">=&gt;</span> {'{'}<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-primary font-bold">safeUserId</span> = <span className="text-orange-400">req</span>.<span className="text-blue-400">session</span>.<span className="text-primary">userId</span>; <span className="text-primary font-bold text-sm bg-primary/20 px-1 rounded">✓ موثوق ومحمي</span><br/>
<br/>
&nbsp;&nbsp;<span className="text-gray-500">{'// الآن لا يمكن للمستخدم التلاعب بهويته'}</span><br/>
&nbsp;&nbsp;<span className="text-blue-400">db</span>.<span className="text-yellow-400">findUser</span>(<span className="text-primary font-bold">safeUserId</span>).<span className="text-yellow-400">then</span>(<span className="text-orange-400">user</span> <span className="text-blue-400">=&gt;</span> {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-400">res</span>.<span className="text-yellow-400">json</span>(<span className="text-orange-400">user</span>);<br/>
&nbsp;&nbsp;{'}'});<br/>
{'}'});
                  </code>
                </pre>
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3 justify-end">
              <p className="text-base text-gray-400 italic">الحل: نستخدم المعرف الموجود في الجلسة المشفرة (Session) التي لا يملك المستخدم وصولاً لها.</p>
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. خلاصة صائد الثغرات */}
      <section className="relative p-10 bg-gradient-to-br from-background-dark to-surface-dark rounded-[2.5rem] border border-white/5 text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
        <div className="relative z-10 space-y-4">
          <span className="material-symbols-outlined text-primary text-5xl">shield</span>
          <h2 className="text-3xl font-bold text-white">تذكر دائماً</h2>
          <p className="text-gray-300 text-xl italic max-w-2xl mx-auto">
            لا تثق أبداً في أي مدخلات تأتي من جانب العميل، وتحقق من الصلاحيات عند كل باب رقمي تطرقه.
          </p>
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all cursor-pointer shadow-md"
        >
          انتقل إلى القسم العملي
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

    </div>
  );
};
