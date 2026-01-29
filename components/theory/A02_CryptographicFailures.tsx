import React, { useState, useEffect } from 'react';
import { Vulnerability } from '../../types';

export const A02_CryptographicFailures_Theory: React.FC<{ vulnerability: Vulnerability }> = ({ vulnerability }) => {
  const [inputText, setInputText] = useState('MyPassword123');
  const [method, setMethod] = useState<'base64' | 'md5'>('base64');
  const [vaultType, setVaultType] = useState<'solid' | 'glass'>('glass');
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState('');

  // A simple deterministic function to simulate a 32-character hex hash (MD5-like)
  const generateSimulatedHash = (str: string) => {
    if (!str) return 'd41d8cd98f00b204e9800998ecf8427e'; // Empty string MD5 equivalent
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const p2 = (h2 >>> 0).toString(16).padStart(8, '0');
    const p3 = (Math.imul(h1, h2) >>> 0).toString(16).padStart(8, '0');
    const p4 = (Math.imul(h2, h1 + 7) >>> 0).toString(16).padStart(8, '0');
    return (p1 + p2 + p3 + p4).substring(0, 32);
  };

  // Real-time processing for feedback feel
  useEffect(() => {
    if (method === 'base64') {
      try {
        setOutput(btoa(inputText));
      } catch (e) {
        setOutput('---');
      }
    } else {
      // Generate dynamic hash based on input
      setOutput(generateSimulatedHash(inputText));
    }
  }, [inputText, method]);

  const toggleMethod = (m: 'base64' | 'md5') => {
    setIsProcessing(true);
    setMethod(m);
    setTimeout(() => setIsProcessing(false), 400);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans pb-10 text-right selection:bg-severity-medium selection:text-black">
      
      {/* قصة واقعية: كارثة أدوبي */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2a] to-[#0a1a1a] p-10 rounded-[2rem] border-r-8 border-severity-medium shadow-2xl">
        <div className="absolute -left-20 -top-20 opacity-10">
          
        </div>
        <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-severity-medium text-4xl">event_busy</span>
            حين خان التشفير أصحابه
          </h2>
          <div className="text-xl text-gray-300 leading-relaxed space-y-6">
            <p>
              في عام 2018 عشر تعرضت شركة <span className="text-severity-medium font-bold">أدوبي</span> لواحدة من أشهر حوادث تسريب البيانات في التاريخ.
            </p>
            <p>
              المهاجمون تمكنوا من الوصول إلى سجلات ملايين المستخدمين التي تحتوي على أسماء وكلمات مرور وتفاصيل حساسة.
            </p>
            <p>
              الشركة كانت تشعر بالثقة التامة لأنها لم تخزن الكلمات كنص واضح بل قامت بـ <span className="text-severity-medium font-bold">تشفيرها</span> لضمان سريتها.
            </p>
            <p>
              لكن الخطأ القاتل كان في اختيار <span className="text-severity-medium font-bold">طريقة تشفير سيئة</span> تعتمد على تحويل الكلمات المتطابقة إلى رموز متطابقة تماماً.
            </p>
            <p>
              هذا الخلل جعل المهاجمين يلاحظون أنماطاً متكررة بوضوح تام دون الحاجة لفك التشفير المعقد.
            </p>
            <p>
              بمجرد رؤية تكرار الرموز استنتج المهاجمون الكلمات الأكثر شيوعاً مثل كلمة مرور أو واحد اثنين ثلاثة مما كشف ملايين الحسابات في ثوانٍ.
            </p>
            <p>
              لقد كانت البيانات موجودة والنظام يعمل بدقة لكن الاعتماد على <span className="text-severity-medium font-bold">حماية وهمية</span> حول الخزنة الحديدية إلى مجرد قشرة رقيقة سقطت عند أول اختبار.
            </p>
          </div>
        </div>
      </section>

      {/* 1. تجربة الخزنة الزجاجية التفاعلية */}
      <section className="relative overflow-hidden bg-[#050505] p-1 bg-gradient-to-br from-severity-medium/20 to-transparent rounded-[3.5rem] border border-white/10 shadow-2xl">
        <div className="bg-[#0a0a0a] rounded-[3.4rem] p-8 lg:p-16 relative overflow-hidden group/vault">
          
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
          <div className={`absolute -right-20 -top-20 w-96 h-96 blur-[120px] rounded-full transition-all duration-1000 ${vaultType === 'glass' ? 'bg-severity-medium/20' : 'bg-primary/5'}`}></div>

          <div className="relative z-10 flex flex-col lg:flex-row-reverse gap-12 items-center">
            
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-5 justify-end">
                <div className="text-right">
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none font-sans">الخزنة الزجاجية!</h2>
                  <div className="h-1.5 w-24 bg-severity-medium mt-2 rounded-full shadow-glow group-hover/vault:w-40 transition-all duration-700"></div>
                </div>
                <div className="w-16 h-16 bg-severity-medium/10 rounded-[1.5rem] flex items-center justify-center border border-severity-medium/20 rotate-3">
                   <span className="material-symbols-outlined text-severity-medium text-4xl">visibility_off</span>
                </div>
              </div>

              <p className="text-2xl text-gray-300 leading-relaxed font-medium text-right">
                تخيل أنك تملك أثمن جوهرة في العالم. قررت حمايتها فاشتريت خزنة فولاذية ضخمة، بوزن 5 أطنان وأقفال إلكترونية معقدة. 
                <span className="text-white block mt-4 bg-white/5 p-4 border-r-4 border-severity-medium rounded-l-xl italic font-bold">
                  لكن هناك مشكلة صغيرة.. جدران الخزنة مصنوعة من الزجاج!
                </span>
                أي شخص يمر بجانبها يمكنه رؤية الجوهرة، تصويرها، ومعرفة كل أسرارك.
              </p>

              <div className="flex justify-end gap-4 pt-4">
                 <button 
                  onClick={() => setVaultType('solid')}
                  className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${vaultType === 'solid' ? 'bg-white text-black shadow-glow' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                 >تشفير حقيقي (فولاذ)</button>
                 <button 
                  onClick={() => setVaultType('glass')}
                  className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${vaultType === 'glass' ? 'bg-severity-medium text-black shadow-[0_0_20px_rgba(255,165,2,0.4)] animate-pulse' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                 >تشفير ضعيف (زجاج)</button>
              </div>
            </div>

            <div className="relative w-full max-w-[420px] aspect-square shrink-0">
               <div className={`w-full h-full rounded-[4rem] border-4 transition-all duration-1000 relative flex items-center justify-center overflow-hidden
                 ${vaultType === 'glass' ? 'bg-severity-medium/5 border-severity-medium/40 shadow-[inset_0_0_50px_rgba(255,165,2,0.1)]' : 'bg-[#111] border-gray-800 shadow-2xl'}
               `}>
                 <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                 <div className={`absolute inset-4 rounded-[3rem] border-2 border-white/5 transition-all duration-1000 flex flex-col items-center justify-center
                   ${vaultType === 'glass' ? 'opacity-10 blur-xl scale-110 pointer-events-none' : 'opacity-100 blur-0 scale-100 bg-gradient-to-br from-[#222] to-black z-20'}
                 `}>
                    <div className="w-32 h-32 rounded-full border-8 border-white/5 flex items-center justify-center animate-spin-slow">
                       <div className="w-20 h-2 bg-white/10 rounded-full"></div>
                       <div className="absolute w-2 h-20 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="mt-8 font-mono text-[10px] text-gray-600 uppercase tracking-[0.4em]">Hardware_Secure_Lock</div>
                 </div>

                 <div className={`transition-all duration-1000 flex flex-col items-center gap-6 ${vaultType === 'glass' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'}`}>
                    <div className="relative">
                       <span className="material-symbols-outlined text-9xl text-severity-medium drop-shadow-[0_0_30px_rgba(255,165,2,0.6)] animate-pulse">diamond</span>
                    </div>
                    <div className="space-y-2 text-center relative z-10">
                       <div className="bg-black/80 px-4 py-1.5 rounded border border-severity-medium/30 font-mono text-[11px] text-severity-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-severity-medium rounded-full animate-ping"></span>
                          PASS: Admin@2024
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ما هو Cryptographic Failures ؟ - التصميم الجديد والمستقل */}
      <section className="space-y-12 py-10 relative overflow-hidden">
        {/* عنوان القسم الرئيسي */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase drop-shadow-glow font-sans leading-tight">
              ما هو <span className="font-oxanium text-severity-medium">CRYPTOGRAPHIC FAILURES</span> ؟
            </h2>
            <div className="h-1.5 w-48 bg-gradient-to-r from-transparent via-severity-medium to-transparent rounded-full"></div>
        </div>

        {/* كرت التعريف الأساسي */}
        <div className="relative max-w-6xl mx-auto bg-surface-dark border-2 border-white/5 rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl group/def">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6 justify-end">
                    <p className="text-2xl lg:text-3xl text-gray-300 leading-relaxed font-medium">
                        ببساطة، هي ثغرة تحدث عندما يفشل التطبيق في حماية <span className="text-severity-medium font-black">بياناتك الحساسة</span> (مثل كلمات السر أو أرقام البطاقات) بسبب غياب التشفير أو استخدامه بشكل <span className="text-severity-medium italic font-bold">خاطئ وضعيف</span>.
                    </p>
                    <span className="material-symbols-outlined text-severity-medium text-8xl hidden sm:block group-hover/def:rotate-12 transition-transform">lock_reset</span>
                </div>
            </div>
        </div>

        {/* الكروت التفاعلية للأمثلة - تحسين شكل الخط هنا */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            
            {/* مثال الخوارزميات القديمة */}
            <div className="group/item relative bg-[#080808] border-2 border-white/10 rounded-[3rem] p-10 overflow-hidden hover:border-severity-medium/40 transition-all duration-500 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover/item:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[250px]">history</span>
                </div>
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-6 justify-end">
                        <div className="text-right">
                            <h3 className="text-2xl font-black text-white italic tracking-tight font-sans leading-none">
                              خوارزميات مكسورة <span className="font-oxanium text-severity-medium">(MD5)</span>
                            </h3>
                            <span className="text-[10px] text-severity-medium font-mono uppercase tracking-[0.2em] mt-2 block">Weak Algorithm</span>
                        </div>
                        <div className="w-16 h-16 bg-severity-medium/10 rounded-[1.2rem] flex items-center justify-center border border-severity-medium/20 text-severity-medium shadow-glow">
                            <span className="material-symbols-outlined text-4xl">skull</span>
                        </div>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium text-right">
                        استخدام خوارزمية <span className="text-white font-mono bg-white/5 px-2 rounded">MD5</span> يشبه استخدام قفل باب قديم جداً يملك كل اللصوص في العالم "مفتاحاً رئيسياً" له. المهاجم اليوم يملكون قوائم جاهزة بكل نواتج هذه الخوارزمية، مما يجعل كسرها مسألة ثوانٍ فقط.
                    </p>
                </div>
                <div className="relative z-10 bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-sm text-gray-500 text-left mt-6" dir="ltr">
                    md5("password") = <span className="text-severity-medium animate-pulse font-black">5f4dcc3b5aa765d...</span>
                </div>
            </div>

            {/* مثال تخزين المفاتيح */}
            <div className="group/item relative bg-[#080808] border-2 border-white/10 rounded-[3rem] p-10 overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-xl min-h-[420px] flex flex-col justify-between">
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover/item:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-[250px]">key</span>
                </div>
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-6 justify-end">
                        <div className="text-right">
                            <h3 className="text-2xl font-black text-white italic tracking-tight font-sans leading-none">
                              المفتاح تحت السجادة!
                            </h3>
                            <span className="text-[10px] text-primary font-mono uppercase tracking-[0.2em] mt-2 block">Hardcoded Keys</span>
                        </div>
                        <div className="w-16 h-16 bg-primary/10 rounded-[1.2rem] flex items-center justify-center border border-primary/20 text-primary shadow-glow">
                            <span className="material-symbols-outlined text-4xl">vpn_key</span>
                        </div>
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium text-right">
                        تخزين المفاتيح داخل الكود البرمجي (Hardcoding) يشبه شراء أغلى قفل في العالم ثم ترك المفتاح في ثقب الباب! المهاجم لا يحتاج لكسر التشفير، هو فقط "يقرأ" الكود ويأخذ المفتاح ليدخل من الباب الأمامي بكل بساطة.
                    </p>
                </div>
                <div className="relative z-10 bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-sm text-gray-500 text-left mt-6" dir="ltr">
                    <span className="text-purple-400 font-bold">const</span> <span className="text-primary font-black">SECRET_KEY</span> = <span className="text-green-400">"Admin_123_Secure"</span>; <span className="text-red-500 font-black">// !! EXPOSED !!</span>
                </div>
            </div>

        </div>
        
        {/* خلاصة ذكية سفلية */}
        <div className="bg-severity-medium/10 p-10 lg:p-14 rounded-[3rem] border border-white/5 text-center relative group overflow-hidden max-w-6xl mx-auto shadow-xl transition-colors duration-500">
           <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>
           <p className="text-gray-100 text-xl lg:text-2xl leading-relaxed relative z-10 italic font-bold">
             "الثغرة لا تكمن دائماً في كسر التشفير، بل في <span className="text-severity-medium font-black">سوء استخدامه</span> أو الاعتماد على <span className="text-severity-medium font-black">أدوات مكسورة</span> تعطي شعوراً زائفاً بالأمان."
           </p>
        </div>

        {/* 10 أشياء عملية تختبر فيها Cryptographic Failures */}
        <section className="space-y-12 py-10 max-w-6xl mx-auto text-left" dir="ltr">
            <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-tight text-center">
              10 أشياء عملية تختبر فيها <br /> <span className="font-oxanium text-primary">CRYPTOGRAPHIC FAILURES</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Weak Hashing Algorithms for Passwords */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">1. Weak Hashing Algorithms for Passwords</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">وجود دوال هاش ضعيفة يعني أن حماية كلمات المرور مكسورة تماماً.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        MD5<br/>
                        SHA1<br/>
                        NTLM<br/>
                        LM<br/>
                        CRC32
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: هذا يمثل فشلاً في التشفير.</p>
                </div>
                
                {/* 2. Weak Encryption Algorithms */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">2. Weak Encryption Algorithms</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">استخدام خوارزميات تشفير قديمة يشير إلى حماية مكسورة.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        DES<br/>
                        3DES<br/>
                        RC2<br/>
                        RC4<br/>
                        Blowfish
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: الاعتماد على هذه الخوارزميات يعني غياب الحماية الفعالة.</p>
                </div>

                {/* 3. Outdated TLS Versions */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">3. Outdated TLS Versions</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">استخدام نسخ قديمة لتشفير البيانات أثناء النقل يمثل خطراً كبيراً.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        TLS 1.0<br/>
                        TLS 1.1<br/>
                        SSL 3.0
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: الأنظمة الحديثة تتطلب استخدام الإصدارات 1.2 أو 1.3 حصراً.</p>
                </div>

                {/* 4. Short or Weak Key Sizes */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">4. Short or Weak Key Sizes</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">استخدام مفاتيح ذات أحجام صغيرة يؤدي إلى انهيار الأمان.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        RSA less than 2048<br/>
                        AES less than 128<br/>
                        DSA less than 2048
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: المفاتيح القصيرة تجعل كسر التشفير مسألة وقت فقط.</p>
                </div>

                {/* 5. Predictable JWT Signing Algorithms */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">5. Predictable JWT Signing Algorithms</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">استخدام خوارزميات توقيع ضعيفة في ملفات JWT يدمر مبدأ الثقة.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        alg set to none<br/>
                        alg set to HS256 without proper key management
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: التلاعب بالتوكن يصبح سهلاً ومتاحاً للمهاجمين.</p>
                </div>

                {/* 6. Hardcoded Secrets */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">6. Hardcoded Secrets</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">تخزين الأسرار داخل الكود البرمجي يمثل خطراً جسيماً.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        API_KEY=<br/>
                        SECRET=<br/>
                        PRIVATE_KEY=<br/>
                        JWT_SECRET=
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: بمجرد وصول المهاجم للكود تنكشف كل أسرار النظام.</p>
                </div>

                {/* 7. Insecure Random Generators */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">7. Insecure Random Generators</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">استخدام مولدات أرقام عشوائية ضعيفة يكسر عملية التشفير.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left text-right" dir="rtl">
                        أمثلة سيئة:<br/>
                        Math.random<br/>
                        rand<br/><br/>
                        بدائل آمنة:<br/>
                        SecureRandom<br/>
                        crypto.randomBytes
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: العشوائية الضعيفة تجعل التشفير قابلاً للتنبؤ والكسر.</p>
                </div>

                {/* 8. Missing Encryption for Sensitive Data */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">8. Missing Encryption for Sensitive Data</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">يجب عدم ظهور القيم الحساسة أبداً كنص واضح.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left text-right" dir="rtl">
                        فحص عدم ظهور ما يلي بدون تشفير:<br/>
                        Passwords<br/>
                        Tokens<br/>
                        Session IDs<br/><br/>
                        المواقع الجغرافية للبيانات:<br/>
                        URL<br/>
                        Cookies<br/>
                        LocalStorage
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: ظهور هذه البيانات بوضوح يعني فشلاً في حماية الخصوصية.</p>
                </div>

                {/* 9. Reusable or Long-Lived Tokens */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">9. Reusable or Long-Lived Tokens</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">يجب أن تنتهي صلاحية الرموز وتكون محددة النطاق.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        Token without expiration<br/>
                        Token usable for all actions
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: هذا يعتبر فشلاً في التشفير والتصميم معاً.</p>
                </div>

                {/* 10. Exposed Crypto Files or Endpoints */}
                <div className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] space-y-6 text-left" dir="ltr">
                    <h3 className="text-2xl font-black text-primary font-oxanium">10. Exposed Crypto Files or Endpoints</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-medium text-right" dir="rtl">ظهور ملفات التشفير للعامة يدمر الحماية فوراً.</p>
                    <div className="bg-black/60 p-5 rounded-2xl border border-white/5 font-mono text-base text-gray-500 text-left">
                        .env<br/>
                        /config<br/>
                        .git<br/>
                        private.key<br/>
                        id_rsa
                    </div>
                    <p className="text-severity-critical font-bold text-base text-right" dir="rtl">الاستنتاج: مكشوفية هذه الملفات تعني سقوط حصون التشفير بالكامل.</p>
                </div>
            </div>
        </section>
      </section>

      {/* 3. مختبر التشفير التفاعلي المطور (The Decryption Console) - Stacked Layout */}
      <section className="bg-surface-dark p-8 lg:p-12 rounded-[3.5rem] border-2 border-white/5 shadow-inner space-y-12 relative overflow-hidden group/hacker">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-4 text-severity-medium flex-row-reverse">
            <span className="material-symbols-outlined text-5xl animate-reverse-spin">vpn_key</span>
            <div className="text-right">
               <h2 className="text-3xl font-black uppercase tracking-wider font-oxanium leading-none">CRACKER LAB</h2>
               <p className="text-[10px] text-gray-600 font-mono mt-1">Live Encryption Analysis v2.0</p>
            </div>
          </div>
          
          <div className="flex p-1 bg-black/80 rounded-2xl border border-white/10 shadow-inner">
             <button 
              onClick={() => toggleMethod('base64')}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all ${method === 'base64' ? 'bg-severity-medium text-black shadow-glow' : 'text-gray-500 hover:text-white'}`}
             >BASE64</button>
             <button 
              onClick={() => toggleMethod('md5')}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black transition-all ${method === 'md5' ? 'bg-severity-medium text-black shadow-glow' : 'text-gray-500 hover:text-white'}`}
             >MD5 HASH</button>
          </div>
        </div>
        
        <div className="flex flex-col gap-10 relative z-10 max-w-6xl mx-auto w-full">
          
          {/* محطة الإدخال (Input Terminal) - Enhanced Input Visualization */}
          <div className="space-y-4 w-full">
            <div className="bg-black/90 p-8 rounded-[3rem] border-2 border-white/5 shadow-2xl relative group/input overflow-hidden">
              {/* ترويسة نافذة الإدخال */}
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                   </div>
                   <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">Console_Input_Stream</span>
                 </div>
                 <div className="flex gap-1 items-center">
                    <span className="text-[8px] text-severity-medium/40 font-mono uppercase mr-2">Waiting for input...</span>
                    <div className="w-1.5 h-1.5 bg-severity-medium rounded-full animate-pulse"></div>
                 </div>
              </div>

              {/* منطقة الكتابة مع رمز الموجه (Prompt) */}
              <div className="relative bg-[#111]/80 rounded-2xl border-2 border-white/5 p-6 lg:p-8 transition-all group-hover/input:border-severity-medium/30 focus-within:border-severity-medium focus-within:shadow-[0_0_30px_rgba(255,165,2,0.1)]">
                <div className="flex items-start gap-4">
                   <span className="text-severity-medium font-mono text-xl lg:text-2xl mt-1 select-none">{'>'}</span>
                   <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-transparent border-none text-white font-mono text-xl lg:text-2xl outline-none focus:ring-0 min-h-[140px] resize-none scrollbar-hide placeholder:text-gray-800"
                    dir="ltr"
                    spellCheck={false}
                    placeholder="أدخل النص هنا لتشفيره..."
                   />
                </div>
                
                {/* أيقونة تفاعلية في الزاوية */}
                <div className="absolute bottom-4 right-6 opacity-10 group-focus-within/input:opacity-40 transition-opacity">
                   <span className="material-symbols-outlined text-4xl lg:text-5xl text-severity-medium">edit_note</span>
                </div>
              </div>

              {/* تأثير خط المسح السفلي */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-severity-medium/20 to-transparent"></div>
            </div>
            <p className="text-[10px] text-gray-600 italic text-center font-medium">أضغط على المساحة السوداء أعلاه وابدأ بكتابة أي نص لاختبار أمانه.</p>
          </div>

          {/* محطة النتائج (The Reveal Window) - Full Width Below */}
          <div className="w-full">
            <div className={`relative p-10 bg-black/60 rounded-[3.5rem] border-2 transition-all duration-700 min-h-[250px] flex flex-col items-center justify-center text-center overflow-hidden
              ${isProcessing ? 'border-severity-medium/50 blur-[2px]' : 'border-white/5'}
            `}>
               {/* خلفية مسح ضوئي */}
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,165,2,0.3),transparent)]"></div>

               {isProcessing ? (
                 <div className="space-y-6 animate-pulse">
                    <div className="text-severity-medium font-mono text-xs uppercase tracking-[0.5em]">Analyzing_Entropy...</div>
                    <div className="flex justify-center gap-3">
                       {[1,2,3].map(i => <div key={i} className="w-2 h-8 bg-severity-medium rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}}></div>)}
                    </div>
                 </div>
               ) : (
                 <div className="space-y-8 w-full animate-in zoom-in duration-500">
                    <div className="space-y-3">
                       <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest uppercase tracking-[0.4em]">Extracted_Payload</span>
                       <div className="text-3xl lg:text-4xl font-mono text-severity-medium font-black break-all drop-shadow-[0_0_20px_rgba(255,165,2,0.5)] leading-tight px-4 selection:bg-white selection:text-black text-center" dir="ltr">
                          {output}
                       </div>
                    </div>
                    
                    <div className="bg-severity-medium/5 border border-severity-medium/20 p-6 rounded-[2rem] text-right relative overflow-hidden group/insight max-w-4xl mx-auto w-full">
                       <div className="absolute top-0 right-0 p-2 opacity-5">
                          <span className="material-symbols-outlined text-4xl">lightbulb</span>
                       </div>
                       <div className="flex items-center justify-end gap-3 text-severity-medium mb-3">
                          <span className="font-black text-[10px] uppercase tracking-widest italic">Hacker Insight</span>
                          <span className="material-symbols-outlined text-sm">psychology</span>
                       </div>
                       <p className="text-xs text-gray-500 leading-relaxed italic">
                          {method === 'base64' 
                            ? "تلاحظ؟ الـ Base64 مجرد 'تغيير شكل' وليس تشفيراً. المهاجم يعكس هذا نصاً فوراً بلمسة واحدة ليرى بياناتك الأصلية."
                            : "الهاش (MD5) يبدو معقداً، لكن المهاجمين يملكون 'قواميس' ضخمة تحتوي على مليارات الكلمات وهاشاتها المقابلة. إذا كانت كلمة سرك شائعة، فهي مكسورة مسبقاً."}
                       </p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
        
        {/* تأثير المسح الضوئي العالمي للمختبر */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-severity-medium/10 animate-scan-v-fast opacity-20 pointer-events-none"></div>
      </section>

      {/* 4. كود تحت المجهر */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">تحليل الشيفرة (Code Analysis)</h2>
          <div className="w-24 h-1 bg-severity-low mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          
          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-severity-critical justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest italic">خزنة زجاجية (Weak Crypto)</h3>
              <span className="material-symbols-outlined text-3xl">cancel</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-severity-critical/30 shadow-[0_0_40px_rgba(255,71,87,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-gray-500">// الخطر: استخدام MD5 يجعل كلمات السر عرضة لكسر القواميس</span><br/>
<span className="text-purple-400">const</span> <span className="text-blue-400">crypto</span> = <span className="text-yellow-400">require</span>(<span className="text-green-400">'crypto'</span>);<br/>
<span className="text-purple-400">const</span> <span className="text-red-400">hash</span> = <span className="text-blue-400">crypto</span>.<span className="text-yellow-400">createHash</span>(<span className="text-red-400">'md5'</span>).<span className="text-yellow-400">update</span>(pass).<span className="text-yellow-400">digest</span>(<span className="text-green-400">'hex'</span>);
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex items-center gap-3 text-primary justify-end">
              <h3 className="text-xl font-bold uppercase tracking-widest italic">خزنة فولاذية (Strong Crypto)</h3>
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="bg-[#080808] p-8 font-mono text-base leading-relaxed overflow-x-auto text-left" dir="ltr">
                <pre>
                  <code>
<span className="text-gray-500">// الأمان: استخدام Argon2 المقاوم لهجمات الكسر</span><br/>
<span className="text-purple-400">const</span> <span className="text-blue-400">argon2</span> = <span className="text-yellow-400">require</span>(<span className="text-green-400">'argon2'</span>);<br/>
<span className="text-purple-400">const</span> <span className="text-primary font-bold">secureHash</span> = <span className="text-purple-400">await</span> <span className="text-blue-400">argon2</span>.<span className="text-yellow-400">hash</span>(userPassword);
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. خلاصة صائد الشفرات */}
      <section className="relative p-10 bg-[#0d1515] rounded-[3rem] border border-severity-low/10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="material-symbols-outlined text-severity-low text-6xl animate-bounce">key_visualizer</span>
          <h2 className="text-3xl font-black text-white italic">قاعدة التشفير الذهبية</h2>
          <p className="text-gray-300 text-xl italic leading-relaxed">
            "لا تحاول اختراع خوارزمية تشفير خاصة بك، واستخدم دائماً ما أثبته مجتمع الأمن السيبراني كمعيار عالمي."
          </p>
        </div>
      </section>

      {/* Navigation Button */}
      <div className="mt-12 flex justify-center border-t border-white/5 pt-12">
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
