import React, { useState } from 'react';
import { Vulnerability } from '../../types';

export const A02_CryptographicFailures_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [step, setStep] = useState<'entry' | 'success' | 'reveal'>('entry');
  const [password, setPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      setStep('success');
    }
  };

  return (
    <div className="animate-in fade-in duration-1000 text-right selection:bg-severity-medium selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* عنوان المحاكاة */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-white italic tracking-tight">نظام إدارة الحسابات الآمن</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full opacity-50"></div>
        </div>

        <div className="bg-[#0a0a0a] rounded-[3rem] border-2 border-white/5 shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
          
          {/* محتوى المحاكاة التفاعلي */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-center space-y-10">
            
            {/* المرحلة الأولى: إدخال البيانات كأنه مستخدم عادي */}
            {step === 'entry' && (
              <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-5">
                <div className="text-center space-y-3">
                  <span className="material-symbols-outlined text-primary text-6xl">lock_person</span>
                  <p className="text-gray-300 text-lg">يرجى تعيين كلمة مرور جديدة لحسابك</p>
                </div>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="أدخل كلمة مرور قوية هنا..."
                      className="w-full bg-black/50 border-2 border-white/10 rounded-2xl px-6 py-5 text-white text-center text-xl outline-none focus:border-primary transition-all shadow-inner"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-black font-black rounded-2xl hover:shadow-glow transition-all uppercase tracking-widest text-sm"
                  >
                    تأمين وحفظ البيانات
                  </button>
                </form>
              </div>
            )}

            {/* المرحلة الثانية: شعور كاذب بالأمان */}
            {step === 'success' && (
              <div className="w-full max-w-md space-y-8 text-center animate-in zoom-in-95">
                <div className="p-8 bg-primary/10 border-2 border-primary/30 rounded-[2.5rem] space-y-4 shadow-glow">
                  <span className="material-symbols-outlined text-primary text-7xl animate-bounce">verified</span>
                  <h3 className="text-2xl font-black text-white">تم تأمين بياناتك بنجاح!</h3>
                  <p className="text-gray-400">النظام يستخدم الآن تشفيراً متطوراً لحماية خصوصيتك في قاعدة البيانات.</p>
                </div>
                
                <div className="pt-6">
                  <button 
                    onClick={() => setStep('reveal')}
                    className="flex items-center gap-3 mx-auto px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold"
                  >
                    <span className="material-symbols-outlined">terminal</span>
                    معاينة ملف الجلسة (Debug View)
                  </button>
                </div>
              </div>
            )}

            {/* المرحلة الثالثة: لحظة اكتشاف الحقيقة الكارثية */}
            {step === 'reveal' && (
              <div className="w-full max-w-2xl space-y-10 animate-in shake duration-500">
                <div className="bg-severity-critical/10 border-2 border-severity-critical/40 p-8 lg:p-12 rounded-[3rem] relative overflow-hidden">
                  <div className="absolute top-0 left-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-8xl text-severity-critical">no_encryption</span>
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-end gap-4 text-severity-critical">
                      <h3 className="text-2xl font-black italic">تحذير: البيانات مكشوفة!</h3>
                      <span className="material-symbols-outlined text-4xl">warning</span>
                    </div>

                    <div className="bg-black/80 p-8 rounded-2xl border border-severity-critical/20 font-mono text-center space-y-4">
                      <p className="text-gray-500 text-xs uppercase tracking-widest">Internal_Session_Cookie</p>
                      <div className="text-3xl lg:text-5xl text-severity-critical font-black break-all drop-shadow-glow">
                        {password}
                      </div>
                      <p className="text-gray-600 text-[10px] mt-4 italic text-right">
                        تم العثور على كلمة المرور كنص واضح داخل ملفات النظام.
                      </p>
                    </div>

                    <div className="space-y-4 text-right">
                      <p className="text-gray-200 text-lg leading-relaxed font-bold">
                        ما حدث هنا هو كارثة أمنية حقيقية. النظام أخبرك في الخطوة السابقة أن البيانات محمية، لكنه في الحقيقة قام بتخزين كلمة مرورك بشكل مكشوف أو بترميز ضعيف جداً.
                      </p>
                      <p className="text-gray-400 text-base leading-relaxed">
                        هذا هو جوهر فشل التشفير؛ أن تعتقد كمطور أنك تحمي البيانات بينما هي في الواقع متاحة لأي مهاجم يستطيع الوصول لملفات السيرفر أو اعتراض حركة المرور. الأمان كان مجرد واجهة وهمية تخفي خلفها إهمالاً تقنياً جسيماً.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => { setStep('entry'); setPassword(''); }}
                    className="text-primary font-black hover:underline"
                  >
                    إعادة التجربة وتحليل الخطأ
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* زر الانتقال لقسم الكويز */}
          <div className="relative z-[110] p-10 flex justify-center border-t border-white/5 bg-black/20">
            <button 
              onClick={() => {
                const tabButtons = Array.from(document.querySelectorAll('button'));
                const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
                if (quizBtn) (quizBtn as HTMLElement).click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-green-600 text-white px-10 py-4 rounded-xl font-black hover:bg-green-700 transition-all cursor-pointer shadow-md text-sm uppercase tracking-widest"
            >
              انتقل إلى قسم الكويز
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
