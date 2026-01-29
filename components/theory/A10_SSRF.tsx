
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A10_SSRF_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [inputUrl, setInputUrl] = useState('https://example.com/logo.png');
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'fetching' | 'success' | 'exposed'>('idle');
  const [responseLabel, setResponseLabel] = useState('');

  const simulateFetch = () => {
    setFetchStatus('fetching');
    setTimeout(() => {
      if (inputUrl.includes('localhost') || inputUrl.includes('127.0.0.1') || inputUrl.includes('169.254')) {
        setFetchStatus('exposed');
        setResponseLabel('⚠️ خطأ أمني: الخادم حاول الوصول لبيانات داخلية حساسة!');
      } else {
        setFetchStatus('success');
        setResponseLabel('✓ تم جلب الصورة بنجاح من المصدر الخارجي.');
      }
    }, 1500);
  };

  const ssrfExamples = [
    {
      url: "http://localhost/",
      desc: "يُستخدم للوصول إلى الخدمات التي تعمل محليًا على السيرفر نفسه، والتي لا تكون متاحة من الإنترنت، مثل لوحات إدارة داخلية أو APIs حساسة."
    },
    {
      url: "http://127.0.0.1/",
      desc: "طريقة بديلة للوصول إلى localhost باستخدام عنوان IP، وغالبًا تُستعمل لتجاوز الفلاتر التي تمنع كلمة localhost فقط."
    },
    {
      url: "http://169.254.169.254/latest/meta-data/",
      desc: "عنوان خاص بخدمات الميتاداتا في بيئات الكلاود، وقد يؤدي إلى تسريب معلومات حساسة مثل API keys و IAM roles و access tokens."
    },
    {
      url: "http://internal-api/",
      desc: "يشير إلى خدمات داخلية غير مكشوفة للعامة، وقد تحتوي على وظائف إدارية أو بيانات داخلية حساسة."
    },
    {
      url: "http://admin:admin@127.0.0.1/",
      desc: "استغلال صيغة تضمين بيانات الدخول داخل الرابط للوصول إلى خدمات داخلية محمية بمصادقة بسيطة."
    },
    {
      url: "http://[::1]/",
      desc: "عنوان IPv6 المكافئ لـ localhost، يُستخدم لتجاوز الفلاتر التي تمنع IPv4 فقط."
    },
    {
      url: "file:///etc/passwd",
      desc: "محاولة إجبار السيرفر على قراءة ملفات محلية بدل طلب HTTP، وقد تؤدي إلى تسريب ملفات نظام حساسة."
    },
    {
      url: "http://127.0.0.1:8080/",
      desc: "الوصول إلى خدمات داخلية تعمل على منافذ غير قياسية مثل admin panels و dashboards و internal services."
    },
    {
      url: "http://metadata.google.internal/",
      desc: "عنوان خاص ببيئة Google Cloud، يسمح بالوصول إلى بيانات ميتاداتا خاصة بالبنية التحتية إذا لم يتم منعه."
    },
    {
      url: "gopher://127.0.0.1:6379/",
      desc: "استخدام بروتوكولات غير HTTP للتواصل مع خدمات داخلية مثل Redis، وقد يؤدي إلى تنفيذ أوامر داخلية خطيرة."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10">
      
      {/* قصة حقيقية واقعية - كارثة كابيتال ون */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#050505] p-10 rounded-[2rem] border-r-8 border-primary shadow-2xl text-center">
        <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3 justify-center italic">
             قصة سقوط حصن كابيتال ون الرقمي
            <span className="material-symbols-outlined text-primary text-4xl">history_edu</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            تخيل بنكا عملاقا يسقط لا بسبب هجوم خارجي عنيف بل بسبب طلب واحد صغير من قلب الخادم ففي عام 2019 استغل مهاجم ذكي ثغرة SSRF داخل جدار الحماية السحابي ليحول الخادم إلى جاسوس داخلي يقوم بسحب مفاتيح الأسرار من قلب سحابة AWS وكأن الخادم سلم مفاتيح الخزنة بنفسه للمخترق مما أدى لتسريب بيانات مئة مليون عميل في واحدة من أذكى وأخطر عمليات التسلل الرقمي التي شهدها التاريخ
          </p>
        </div>
      </section>

      {/* 1. قصة افتتاحية: ساعي البريد المخدوع */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a2a] to-[#050510] p-10 rounded-[2rem] border-r-8 border-primary shadow-2xl text-center">
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 justify-center">
            ساعي البريد المخدوع
            <span className="material-symbols-outlined text-primary text-4xl">mail</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            تخيل أنك أمام قصر محصن يمنعك الحراس من دخوله لكنك تلاحظ ساعي بريد مسموحا له بالتجول في كل الغرف بكل حرية فتقترب منه وتطلب منه بلطف أن يذهب لغرفة الأسرار ويصور لك الأوراق الهامة ويحضرها لك الساعي الذي يثق في الجميع ينفذ طلبك بابتسامة ويحضر لك الكنز دون أن يسأل عن هويتك هذا هو الخادم المصاب بثغرة SSRF فهو ينفذ طلباتك للوصول لمناطق محظورة داخل شبكته لأنه ببساطة يثق في كل ما تطلبه منه
          </p>
        </div>
      </section>

      {/* 2. ما هي الثغرة حقيقة؟ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-right">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white border-b-2 border-primary w-fit ml-auto pb-1">ما هي ثغرة SSRF؟</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            ثغرة Server-Side Request Forgery تحدث عندما يثق تطبيق الويب في رابط يقدمه المستخدم، ويستخدم هذا الرابط لإجراء طلب من جانب الخادم. 
            المهاجم هنا لا يطلب البيانات لنفسه، بل يجبر الخادم على طلبها بدلاً عنه، مستغلاً صلاحيات الخادم داخل الشبكة الداخلية.
          </p>
        </div>
        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 space-y-4 shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-end">
            لماذا هي خطيرة؟
            <span className="material-symbols-outlined text-primary">dangerous</span>
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed italic">
            الخطر يكمن في أن الخادم عادة ما يثق في نفسه وفي الأجهزة الموجودة معه في نفس الشبكة. عبر الـ SSRF، يمكن للمهاجم قراءة ملفات النظام، الوصول لقواعد البيانات الداخلية، أو حتى سحب مفاتيح الوصول في بيئات الكلاود مثل AWS.
          </p>
        </div>
      </section>

      {/* 3. كيف تحدث الأخطاء؟ */}
      <section className="space-y-6 text-right">
        <h2 className="text-2xl font-black text-white text-center italic">أين يقع المطورون في الفخ؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform">link</span>
              <h4 className="text-white font-bold mb-2">قبول الروابط المطلقة</h4>
              <p className="text-lg text-gray-400">السماح للمستخدم بإدخال أي رابط يبدأ بـ http دون تقييده بنطاق معين.</p>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform">security_update_warning</span>
              <h4 className="text-white font-bold mb-2">غياب Whitelisting</h4>
              <p className="text-lg text-gray-400">عدم وجود قائمة بيضاء بالمواقع الموثوقة التي يُسمح للخادم بمراسلتها.</p>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform">visibility_off</span>
              <h4 className="text-white font-bold mb-2">الثقة في الشبكة الداخلية</h4>
              <p className="text-lg text-gray-400">الافتراض بأن الشبكة الداخلية آمنة دائماً ولا تحتاج لمصادقة إضافية للطلبات القادمة من الخادم نفسه.</p>
           </div>
        </div>
      </section>

      {/* 📍 NEW SECTION: Practical Examples */}
      <section className="space-y-10 py-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-4xl font-black text-primary italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,212,170,0.5)]">
            أمثلة عملية على استغلال ثغرة
          </h2>
          <h2 className="text-2xl lg:text-3xl font-black text-primary italic uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,212,170,0.5)] font-display">
            Server‑Side Request Forgery (SSRF)
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto px-4" dir="ltr">
          {ssrfExamples.map((item, index) => (
            <div key={index} className="flex flex-row items-start gap-6 bg-white/[0.02] border border-primary/20 p-8 rounded-[2rem] hover:bg-primary/5 transition-all group">
              <div className="flex-none text-4xl font-black font-mono text-primary/40 group-hover:text-primary transition-colors">
                {index + 1}
              </div>
              <div className="flex-1 space-y-3 text-right" dir="rtl">
                <div className="text-xl font-mono font-black text-primary tracking-wide text-left" dir="ltr">
                  {item.url}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-10 bg-primary/10 border-2 border-primary/30 rounded-[3rem] text-center shadow-[0_0_40px_rgba(0,212,170,0.1)]">
          <p className="text-2xl text-primary font-black italic leading-relaxed">
            SSRF لا يهاجم المستخدم، بل يجعل السيرفر يهاجم نفسه أو شبكته الداخلية
          </p>
        </div>
      </section>

      {/* 5. تجربة تفاعلية: محاكي طلبات الخادم (The SSRF Simulator) */}
      <section className="bg-[#121212] p-10 rounded-[2.5rem] border-2 border-primary/20 shadow-[0_20px_50px_rgba(0,212,170,0.15)] space-y-8 relative overflow-hidden text-right group/lab">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover/lab:bg-primary/10 transition-colors"></div>
        
        <div className="flex items-center gap-4 text-primary justify-end mb-2 relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-[0.2em] font-display drop-shadow-glow">SERVER-SIDE REQUEST SIMULATOR</h2>
          <span className="material-symbols-outlined text-5xl animate-pulse text-primary drop-shadow-glow">dns</span>
        </div>
        
        <div className="bg-[#050505]/80 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 space-y-10 relative z-10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
          <div className="space-y-6">
            <p className="text-gray-400 text-sm text-right font-mono tracking-tight opacity-80">تطبيقك لديه ميزة جلب صورة بروفايل من رابط خارجي. جرب إعطاء الخادم رابطاً:</p>
            
            <div className="flex flex-col gap-6 items-stretch relative">
              <div className="relative group">
                <input 
                  type="text" 
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  dir="ltr"
                  placeholder="Payload URL..."
                  className="w-full bg-black/60 border-2 border-white/10 rounded-2xl px-8 py-5 text-primary font-mono outline-none focus:border-primary focus:ring-8 focus:ring-primary/10 transition-all text-center text-xl placeholder:text-gray-900 shadow-inner group-hover:border-white/20"
                />
              </div>
              <button 
                onClick={simulateFetch}
                disabled={fetchStatus === 'fetching'}
                className="group relative overflow-hidden py-5 bg-primary text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(0,212,170,0.6)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-glow"
              >
                <span className="relative z-10 uppercase tracking-widest text-lg">
                   {fetchStatus === 'fetching' ? 'EXECUTING REQUEST...' : 'INJECT PAYLOAD'}
                </span>
                <span className="material-symbols-outlined relative z-10 text-2xl group-hover:translate-x-2 transition-transform">send</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button onClick={() => setInputUrl('http://localhost/admin/config')} className="text-[10px] font-black bg-white/5 hover:bg-severity-critical/20 hover:text-severity-critical hover:border-severity-critical/40 border-2 border-white/10 px-5 py-2.5 rounded-xl text-gray-500 transition-all uppercase tracking-widest font-mono">localhost</button>
              <button onClick={() => setInputUrl('http://169.254.169.254/latest/meta-data/')} className="text-[10px] font-black bg-white/5 hover:bg-severity-critical/20 hover:text-severity-critical hover:border-severity-critical/40 border-2 border-white/10 px-5 py-2.5 rounded-xl text-gray-500 transition-all uppercase tracking-widest font-mono">Cloud Metadata</button>
              <button onClick={() => setInputUrl('https://trusted-site.com/avatar.jpg')} className="text-[10px] font-black bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/40 border-2 border-white/10 px-5 py-2.5 rounded-xl text-gray-500 transition-all uppercase tracking-widest font-mono">رابط طبيعي</button>
            </div>
          </div>

          <div className="relative h-48 bg-black/90 rounded-[2.5rem] border-2 border-white/5 flex items-center justify-center overflow-hidden shadow-[inset_0_4px_30px_rgba(0,0,0,0.9)] group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,170,0.03),transparent)] opacity-50"></div>
             
             {fetchStatus === 'idle' && (
               <div className="text-gray-700 font-mono flex items-center gap-3 animate-pulse">
                 <span className="material-symbols-outlined text-lg">terminal</span>
                 <span className="uppercase tracking-[0.3em] font-black">SYSTEM_IDLE: AWAITING_INPUT</span>
               </div>
             )}
             
             {fetchStatus === 'fetching' && (
               <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm text-primary uppercase font-mono tracking-[0.5em] font-black drop-shadow-glow">FETCHING_INTERNAL_NODES...</span>
               </div>
             )}
             
             {fetchStatus === 'success' && (
               <div className="text-primary flex flex-col items-center animate-in zoom-in slide-in-from-bottom-4 duration-700 relative z-10 text-left" dir="ltr">
                  <span className="material-symbols-outlined text-7xl drop-shadow-[0_0_20px_rgba(0,212,170,0.6)]">verified</span>
                  <span className="text-lg mt-4 font-mono font-black uppercase tracking-widest">{responseLabel}</span>
               </div>
             )}
             
             {fetchStatus === 'exposed' && (
               <div className="text-severity-critical flex flex-col items-center animate-in shake duration-700 relative z-10 text-left" dir="ltr">
                  <span className="material-symbols-outlined text-8xl drop-shadow-[0_0_30px_rgba(255,71,87,0.7)]">report</span>
                  <span className="text-xl mt-4 font-black uppercase tracking-tighter drop-shadow-md">{responseLabel}</span>
                  <div className="mt-4 py-2 px-6 bg-severity-critical/20 rounded-2xl border border-severity-critical/40 backdrop-blur-md">
                    <span className="text-xs font-mono font-black tracking-widest uppercase">
                       [SYSTEM_CRITICAL_LEAK]: المهاجم استطاع قراءة بيانات داخلية لا تظهر للعامة!
                    </span>
                  </div>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* 4. كود تحت المجهر: فن الطلب الآمن */}
      <section className="space-y-8 text-right">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white italic">The SSRF Code</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          
          {/* كود ضعيف */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">خادم مطيع (Vulnerable)</h3>
              <span className="material-symbols-outlined text-3xl">sentiment_very_dissatisfied</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_40px_rgba(255,71,87,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-gray-500">// الخطر: الخادم يطلب أي رابط يرسله المستخدم دون تردد</span><br/>
<span className="text-blue-400">app</span>.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/fetch-image'</span>, <span className="text-blue-400">async</span> (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) <span className="text-blue-400">{'=>'}</span> {'{'}<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-red-400">userUrl</span> = <span className="text-orange-400">req</span>.<span className="text-blue-400">query</span>.<span className="text-red-400">url</span>;<br/>
&nbsp;&nbsp;<br/>
&nbsp;&nbsp;<span className="text-gray-500">// لا يوجد أي تحقق.. الخادم يذهب لأي مكان!</span><br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-orange-400">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-400">axios.get</span>(<span className="text-red-400">userUrl</span>);<br/>
&nbsp;&nbsp;<span className="text-orange-400">res</span>.<span className="text-yellow-400">send</span>(<span className="text-orange-400">response.data</span>);<br/>
&nbsp;&nbsp;<span className="text-severity-critical font-bold text-xs bg-severity-critical/20 px-1 rounded animate-pulse">!! خطر: المهاجم سيسحب ملفات السيرفر عبر هذا الطلب !!</span><br/>
{'}'});           </code>
                </pre>
              </div>
            </div>
          </div>

          {/* كود آمن */}
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest">خادم حذر (Secure)</h3>
              <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-gray-500">// الأمان: التحقق من الرابط مقابل قائمة بيضاء (Whitelisting)</span><br/>
<span className="text-purple-400">const</span> <span className="text-primary font-bold">ALLOWED_DOMAINS</span> = [<span className="text-green-400">'trusted-cdn.com'</span>, <span className="text-green-400">'images.myapp.com'</span>];<br/>
<br/>
<span className="text-blue-400">app</span>.<span className="text-yellow-400">get</span>(
  <span className="text-green-400">'/fetch-image'</span>, 
  <span className="text-blue-400">async</span> (<span className="text-orange-400">req</span>, <span className="text-orange-400">res</span>) 
  <span className="text-blue-400">{'=>'}</span> {'{'}<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-primary">userUrl</span> = <span className="text-purple-400">new</span> <span className="text-yellow-400">URL</span>(<span className="text-orange-400">req.query.url</span>);<br/>
<br/>
&nbsp;&nbsp;<span className="text-purple-400">if</span> (!<span className="text-primary font-bold">ALLOWED_DOMAINS</span>.<span className="text-yellow-400">includes</span>(<span className="text-primary">userUrl.hostname</span>)) {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>.<span className="text-yellow-400">status</span>(<span className="text-orange-400">403</span>).<span className="text-yellow-400">send</span>(<span className="text-green-400">'المصدر غير موثوق'</span>);<br/>
&nbsp;&nbsp;{'}'}<br/>
<br/>
&nbsp;&nbsp;<span className="text-primary font-bold text-xs bg-primary/20 px-2 py-1 rounded inline-block mt-2">✓ آمن: الخادم لن يطلب إلا من المصادر الموثوقة</span><br/>
{'}'});

                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. خلاصة الخبير الأمني */}
      <section className="relative p-12 bg-gradient-to-br from-background-dark to-primary/5 rounded-[3rem] border border-primary/10 text-center overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <span className="material-symbols-outlined text-[150px] text-primary">verified_user</span>
        </div>
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-widest">الخادم ليس دمية</h2>
          <p className="text-gray-300 text-xl leading-relaxed">
            لا تسمح أبداً لمستخدميك بتوجيه بوصلة الخادم. الطلبات التي يجريها الخادم يجب أن تكون دائماً تحت سيطرتك المطلقة، ومحصورة في نطاقات موثوقة ومحددة مسبقاً.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-widest">Validate URLs</span>
             <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-widest">Allow-list Only</span>
             <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-widest">Restrict Internal IPs</span>
          </div>
        </div>
      </section>

      {/* زر الانتقال للقسم العملي */}
      <div className="flex justify-center mt-12">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const labBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('المحاكاة'));
            if (labBtn) (labBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-primary text-black font-black px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-glow"
        >
          انتقل إلى قسم العملي
        </button>
      </div>

    </div>
  );
};
