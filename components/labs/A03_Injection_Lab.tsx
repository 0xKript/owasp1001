
import React, { useState, useEffect } from 'react';
import { Vulnerability } from '../../types';

type LabState = 'LOGIN' | 'DASHBOARD';

export const A03_Injection_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [state, setState] = useState<LabState>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBypassed, setIsBypassed] = useState(false);
  const [showError, setShowError] = useState(false);

  // منطق محاكاة السيرفر: كيف يرى السيرفر الطلب؟
  const getQueryPreview = () => {
    if (state === 'LOGIN') {
      return `SELECT * FROM users WHERE user='${username || "..."}' AND pass='${password || "..."}'`;
    }
    return `SELECT * FROM items WHERE name LIKE '%${searchQuery || "..."}%'`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // محاكاة ثغرة الحقن في الدخول
    if (username.includes("' OR 1=1 --") || username.includes("' OR '1'='1")) {
      setIsBypassed(true);
      setState('DASHBOARD');
    } else if (username === 'admin' && password === 'password123') {
      setState('DASHBOARD');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const dbResults = [
    { id: 1, name: 'مستند سري - مشروع X', type: 'Private' },
    { id: 2, name: 'خطة التسويق 2025', type: 'Public' },
    { id: 3, name: 'كلمات مرور المشرفين', type: 'System' },
  ];

  const getFilteredResults = () => {
    if (searchQuery.includes("' UNION")) {
      return dbResults; // محاكاة سحب كل البيانات
    }
    return dbResults.filter(item => item.type === 'Public');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-right">
      
      {/* منطقة المحاكاة الرئيسية */}
      <div className="max-w-5xl mx-auto bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* شريط المتصفح الوهمي */}
        <div className="bg-[#1a1a1a] p-4 border-b border-white/5 flex items-center gap-4 px-8">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="flex-1 bg-black/50 rounded-lg px-4 py-1.5 text-xs font-mono text-gray-500 flex items-center gap-2" dir="ltr">
            <span className="material-symbols-outlined text-sm">lock</span>
            https://vulnerable-site.com/{state.toLowerCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* الجانب الأيسر: كواليس السيرفر (Back-end) */}
          <div className="bg-[#050505] p-8 border-l border-white/5 flex flex-col gap-6">
            <div className="flex items-center justify-between flex-row-reverse">
              <h4 className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                Server Console (SQL)
                <span className="material-symbols-outlined text-sm animate-pulse">terminal</span>
              </h4>
            </div>
            
            <div className="bg-black/80 rounded-xl p-6 border border-primary/20 h-48 font-mono text-sm overflow-hidden relative group">
              <div className="text-gray-500 mb-2">// الاستعلام الذي ينفذه السيرفر الآن:</div>
              <code className="text-primary break-all leading-relaxed block" dir="ltr">
                {getQueryPreview()}
              </code>
              {isBypassed && state === 'DASHBOARD' && (
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center backdrop-blur-[1px] animate-in fade-in">
                  <span className="bg-primary text-black font-black px-4 py-1 rounded text-[10px] uppercase">Logic Compromised</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
               <h5 className="text-white font-bold text-sm italic">ملاحظة المطور:</h5>
               <p className="text-gray-400 text-xs leading-relaxed">
                 راقب كيف يتم دمج ما تكتبه في الحقول مع استعلام SQL في الأعلى. إذا وضعت رموزاً مثل <code className="text-white">'</code> فإنك تقوم بكسر حدود النص والبدء في كتابة أوامر برمجية للسيرفر.
               </p>
            </div>
          </div>

          {/* الجانب الأيمن: واجهة المستخدم (Front-end) */}
          <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-[450px]">
            
            {state === 'LOGIN' ? (
              <div className="w-full max-w-sm space-y-8 animate-in slide-in-from-right-4">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-white">تسجيل الدخول</h3>
                  <p className="text-gray-500 text-sm italic">جرب تخطي الدخول بدون معرفة الباسورد</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all text-right"
                  />
                  <input 
                    type="password" 
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all text-right"
                  />
                  <button className="w-full py-3 bg-white text-black font-black rounded-xl hover:bg-primary transition-all">
                    دخول
                  </button>
                </form>

                {showError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center font-bold">
                    بيانات الدخول غير صحيحة!
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 text-center">
                   <p className="text-[10px] text-gray-600 mb-2 uppercase font-black">حمولات مقترحة (Payloads):</p>
                   <div className="flex flex-wrap justify-center gap-2">
                      <button onClick={() => setUsername("' OR 1=1 --")} className="px-3 py-1 bg-white/5 hover:bg-primary/20 rounded text-[9px] text-gray-400 font-mono transition-colors">' OR 1=1 --</button>
                      <button onClick={() => setUsername("admin' --")} className="px-3 py-1 bg-white/5 hover:bg-primary/20 rounded text-[9px] text-gray-400 font-mono transition-colors">admin' --</button>
                   </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-8 animate-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 flex-row-reverse">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">dashboard</span>
                    لوحة المشرف
                  </h3>
                  <button onClick={() => {setState('LOGIN'); setIsBypassed(false); setUsername(''); setPassword('');}} className="text-xs text-gray-500 hover:text-white">خروج</button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="ابحث في قاعدة البيانات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white focus:border-primary outline-none transition-all text-right"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                  </div>

                  {/* التعديل الأول: نص توضيحي عند إدخال payload محدد */}
                  {searchQuery === "' UNION SELECT 1,2,3 --" && (
                    <div className="p-5 bg-white/5 border-r-4 border-primary rounded-l-xl animate-in fade-in slide-in-from-top-2">
                      <p className="text-gray-200 font-bold text-base leading-relaxed">
                        لقد نجحت في دمج استعلام إضافي مع البحث الأصلي عبر أمر 'UNION SELECT'، مما أجبر السيرفر على سحب بيانات من جداول غير مخصصة للعامة.
                        <br /><br />
                        هذا التلاعب خطير لأنه يمنح المهاجم القدرة على كشف أسرار قاعدة البيانات وتجاوز قيود الوصول البرمجية بالكامل.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {getFilteredResults().map(item => (
                      <div key={item.id} className={`p-4 rounded-xl border flex items-center justify-between flex-row-reverse transition-all ${item.type !== 'Public' ? 'bg-primary/10 border-primary/30 animate-pulse' : 'bg-white/5 border-white/5'}`}>
                        <span className="text-white font-bold text-sm">{item.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${item.type === 'Public' ? 'bg-gray-700 text-gray-300' : 'bg-primary text-black'}`}>
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {isBypassed && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                    <p className="text-primary text-xs font-bold text-center leading-relaxed">
                      رائع! لقد دخلت كمشرف دون الحاجة لباسورد. جرب الآن كتابة <code className="text-white font-mono">' UNION SELECT 1,2,3 --</code> في حقل البحث لرؤية بيانات لا يجب أن تظهر للعامة.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* التعديل الثاني: تصغير زر الانتقال لقسم الاختبار */}
      <div className="flex justify-center pt-8 border-t border-white/5 mt-10">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-black rounded-lg shadow-xl transition-all active:scale-95 uppercase tracking-widest text-base flex items-center justify-center gap-3"
        >
          <span>انتقل إلى قسم الاختبار</span>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

    </div>
  );
};
