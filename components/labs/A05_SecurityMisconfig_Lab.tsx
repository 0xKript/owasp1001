import React, { useState, useEffect } from 'react';
import { Vulnerability } from '../../types';

export const A05_SecurityMisconfig_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [inputValue, setInputValue] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{ title: string; explanation: React.ReactNode } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // محاكاة وقت التحليل
    setTimeout(() => {
      const input = inputValue.toLowerCase().trim();
      let resTitle = 'نتيجة التحليل';
      let resBody: React.ReactNode = <span>لم يتم العثور على مشكلة أمنية واضحة في هذا المدخل المحدد. جرب فحص مسارات أخرى أو بيانات اعتماد مختلفة.</span>;

      // 1. Default Credentials
      if (['admin:admin', 'admin:password', 'root:root', 'test:test'].includes(input)) {
        resTitle = 'بيانات اعتماد افتراضية';
        resBody = <span>النظام قبل البيانات فورا. الاعتماد على <span className="text-[#d4af37]">Default Credentials</span> يعني أن الإعدادات لم يتم تغييرها منذ التثبيت الأول وهذا يمنح أي مهاجم حق الدخول المباشر والسيطرة الكاملة.</span>;
      }
      // 2. Admin / Debug Panels
      else if (['/admin', '/admin/login', '/administrator', '/manager', '/phpmyadmin'].includes(input)) {
        resTitle = 'واجهة إدارية مكشوفة';
        resBody = <span>تم العثور على المسار بنجاح. وجود <span className="text-[#d4af37]">Exposed Admin Panel</span> بدون حماية إضافية هو ثغرة تسمح للمهاجم بمحاولة الدخول أو استغلال واجهة الإدارة للسيطرة على السيرفر.</span>;
      }
      // 3. Debug / Development Mode
      else if (input.includes('debug=true') || input.includes('app_env=dev') || input.includes('stack trace')) {
        resTitle = 'وضعية التطوير نشطة';
        resBody = <span>النظام يعمل حاليا بوضعية <span className="text-[#d4af37]">Debug Mode</span>. هذا يؤدي إلى تسريب معلومات داخلية تقنية وحساسة عن بنية الكود وقواعد البيانات مما يسهل عملية الاختراق.</span>;
      }
      // 4. Directory Listing
      else if (['/uploads', '/images', '/backup'].includes(input)) {
        resTitle = 'استعراض المجلدات مفعل';
        resBody = <span>الملفات مكشوفة للعلن. تفعيل خاصية <span className="text-[#d4af37]">Directory Listing</span> يسمح لأي شخص برؤية قائمة الملفات وتحميلها مما قد يؤدي لتسريب وثائق سرية أو أكواد مصدرية.</span>;
      }
      // 5. Exposed Config Files
      else if (['.env', 'config.php', 'web.config', 'application.properties'].includes(input)) {
        resTitle = 'تسريب ملفات الإعدادات';
        resBody = <span>تم الوصول لملف الإعدادات. تسريب <span className="text-[#d4af37]">Configuration Files</span> يكشف كلمات مرور قواعد البيانات ومفاتيح التشفير مما يعني سقوط النظام تقنيا بالكامل بمجرد قراءة هذا الملف.</span>;
      }
      // 6. Missing Security Headers
      else if (['content-security-policy', 'x-frame-options', 'x-content-type-options', 'strict-transport-security'].includes(input.toLowerCase())) {
        resTitle = 'غياب رؤوس الحماية';
        resBody = <span>الحماية غير مفعلة في المتصفح. غياب <span className="text-[#d4af37]">Security Headers</span> يعني أن المتصفح لا يفرض أي قيود أمنية مما يفتح الباب لهجمات سرقة الجلسات أو حقن الواجهات.</span>;
      }
      // 7. Unrestricted File Upload
      else if (['.php', '.jsp', '.exe'].includes(input)) {
        resTitle = 'رفع ملفات غير مقيد';
        resBody = <span>تم قبول الامتداد كملف صالح للرفع. ميزة <span className="text-[#d4af37]">Unrestricted File Upload</span> تسمح للمهاجم برفع كود برمجي خبيث وتشغيله مباشرة على السيرفر لتنفيذ أوامر تخريبية.</span>;
      }
      // 8. Open Cloud Storage
      else if (['/s3', '/bucket', '/storage'].includes(input)) {
        resTitle = 'تخزين سحابي مكشوف';
        resBody = <span>الوصول للتخزين متاح للجميع. إعداد <span className="text-[#d4af37]">Cloud Storage</span> بشكل مفتوح وبدون مصادقة يؤدي لتسريب بيانات ضخمة وحساسة بضغطة زر واحدة.</span>;
      }
      // 9. Exposed Backups
      else if (['backup.zip', 'site.bak', 'old.tar.gz', 'db.sql'].includes(input)) {
        resTitle = 'نسخ احتياطية منسية';
        resBody = <span>تم العثور على نسخة احتياطية منسية. بقاء <span className="text-[#d4af37]">Exposed Backups</span> في مسارات عامة يعني أن المهاجم حصل على نسخة كاملة من بيانات النظام لدراستها واختراقها بهدوء.</span>;
      }
      // 10. Unused Services
      else if (['/actuator', '/status', '/metrics', '/health'].includes(input)) {
        resTitle = 'خدمات داخلية مكشوفة';
        resBody = <span>الخدمات الداخلية متاحة للطلب. ترك <span className="text-[#d4af37]">Unsecured Services</span> تعمل بدون حاجة فعلية يكشف حالة السيرفر وتفاصيله الداخلية مما يساعد في التخطيط لهجمات متقدمة.</span>;
      }

      setAnalysisResult({ title: resTitle, explanation: resBody });
      setIsAnalyzing(false);
    }, 1200);
  };

  if (!isBooted) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center bg-black rounded-[3rem] border border-white/5">
        <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4"></div>
        <div className="font-mono text-[10px] text-[#d4af37] tracking-[0.4em] uppercase">Initializing Configuration Scanner...</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in duration-1000 p-1">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0a0a0a] rounded-[3.5rem] border-2 border-white/5 shadow-2xl overflow-hidden flex flex-col min-h-[650px] relative">
          
          {/* Header HUD */}
          <header className="h-24 bg-black/60 border-b border-white/5 flex items-center justify-between px-10 z-10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#d4af37]/10 rounded-2xl flex items-center justify-center border border-[#d4af37]/20">
                <span className="material-symbols-outlined text-[#d4af37] text-3xl">settings_input_component</span>
              </div>
              <div>
                <h2 className="text-white font-black italic text-sm uppercase tracking-widest">Configuration Audit Terminal</h2>
                <p className="text-[10px] text-gray-500 font-mono">Status: Awaiting System Inspection</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
               <div className="text-right hidden sm:block">
                  <div className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Security Level</div>
                  <div className="text-sm font-oxanium font-black text-[#d4af37]">GRADE_C</div>
               </div>
               <span className="material-symbols-outlined text-gray-800 text-4xl">radar</span>
            </div>
          </header>

          <div className="flex-1 p-10 flex flex-col items-center space-y-12 relative z-10">
            
            <div className="text-center space-y-3 max-w-2xl">
              <h3 className="text-2xl font-black text-white italic">لوحة فحص إعدادات النظام</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                أدخل أي مسار أو ملف أو بيانات اعتماد تشك في وجود خلل في إعداداتها لرؤية تقرير التحليل الأمني الفوري.
              </p>
            </div>

            {/* Input & Action Area */}
            <div className="w-full max-w-3xl">
              <form onSubmit={handleAnalysis} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-600 group-focus-within:text-[#d4af37] transition-colors">search</span>
                  </div>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="مثال: .env أو admin:admin أو /admin"
                    className="w-full bg-black/40 border-2 border-white/5 rounded-2xl pr-14 pl-6 py-5 text-white font-mono text-lg outline-none focus:border-[#d4af37]/40 focus:ring-4 focus:ring-[#d4af37]/5 transition-all text-right"
                    dir="ltr"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isAnalyzing || !inputValue.trim()}
                  className={`px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3
                    ${isAnalyzing || !inputValue.trim() 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#d4af37] text-black hover:brightness-110 active:scale-95 shadow-[#d4af37]/10'}
                  `}
                >
                  {isAnalyzing ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send</span>
                      <span className="material-symbols-outlined text-lg">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results Window */}
            <div className="w-full max-w-3xl flex-1 flex flex-col">
              <div className={`flex-1 bg-black/40 rounded-[2.5rem] border-2 border-white/5 p-8 relative overflow-hidden transition-all duration-700
                ${analysisResult ? 'opacity-100 translate-y-0 border-[#d4af37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]' : 'opacity-40 translate-y-4'}
              `}>
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${analysisResult ? 'bg-[#d4af37] animate-pulse' : 'bg-gray-800'}`}></div>
                  <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">Inspection_Result</span>
                </div>

                <div className="h-full flex flex-col items-center justify-center text-center">
                  {!analysisResult && !isAnalyzing && (
                    <div className="opacity-20 flex flex-col items-center gap-4">
                      <span className="material-symbols-outlined text-7xl">security_update_warning</span>
                      <span className="font-mono text-xs uppercase tracking-[0.3em]">No Active Scan Data</span>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="space-y-6 flex flex-col items-center">
                       <div className="flex gap-2">
                         <div className="w-2 h-8 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                         <div className="w-2 h-8 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                         <div className="w-2 h-8 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                       </div>
                       <span className="text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.5em]">Analyzing Payload...</span>
                    </div>
                  )}

                  {analysisResult && !isAnalyzing && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                      <h4 className="text-[#d4af37] text-3xl font-black italic">{analysisResult.title}</h4>
                      <p className="text-gray-300 text-xl leading-relaxed max-w-xl mx-auto font-medium">
                        {analysisResult.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Footer Info */}
          <footer className="h-14 bg-black border-t border-white/5 px-10 flex items-center justify-between text-[10px] font-mono text-gray-600">
            <div className="flex gap-6">
              <span className="text-[#d4af37]/60">SERVER_ID: PROD-990</span>
              <span>Uptime: 99.9%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Encrypted Secure Protocol Active</span>
            </div>
          </footer>
        </div>

        {/* زر الانتقال لقسم الكويز */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => {
              const tabButtons = Array.from(document.querySelectorAll('button'));
              const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
              if (quizBtn) (quizBtn as HTMLElement).click();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-green-700 transition-all cursor-pointer shadow-xl text-xs uppercase tracking-widest active:scale-95"
          >
            انتقل إلى قسم الكويز
          </button>
        </div>
      </div>
    </div>
  );
};