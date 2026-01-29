import React, { useState } from 'react';
import { Vulnerability } from '../../types';

type ViewState = 'login' | 'user' | 'admin';

export const A01_BrokenAccessControl_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [view, setView] = useState<ViewState>('login');
  const [urlPath, setUrlPath] = useState('/login');
  const [tempUrl, setTempUrl] = useState('/dashboard/user');

  const handleLogin = () => {
    setView('user');
    setUrlPath('/dashboard/user');
    setTempUrl('/dashboard/user');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl.trim() === '/dashboard/admin') {
      setView('admin');
      setUrlPath('/dashboard/admin');
    } else if (tempUrl.trim() === '/dashboard/user') {
      setView('user');
      setUrlPath('/dashboard/user');
    }
  };

  return (
    <div className={`relative min-h-[600px] rounded-[3rem] transition-colors duration-700 overflow-hidden font-sans border-4 ${view === 'admin' ? 'bg-[#0a0505] border-red-900/30' : 'bg-[#0f172a] border-white/10'}`}>
      
      {/* simulated Browser Header / URL Bar */}
      {view !== 'login' && (
        <div className="bg-black/60 p-4 border-b border-white/10">
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-[#1e293b] rounded-full px-5 py-2 border border-white/5 group focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-gray-500 text-sm">lock</span>
            <div className="flex items-center flex-1 text-sm font-mono tracking-tight" dir="ltr">
              <span className="text-gray-500 shrink-0">https://nexus-corp.com</span>
              <form onSubmit={handleUrlSubmit} className="flex-1">
                <input 
                  type="text" 
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 text-white w-full ml-0.5"
                />
              </form>
            </div>
            <button onClick={handleUrlSubmit} className="material-symbols-outlined text-gray-500 hover:text-white transition-colors text-lg">refresh</button>
          </div>
        </div>
      )}

      {/* 1️⃣ LOGIN PAGE */}
      {view === 'login' && (
        <div className="h-[600px] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] w-full max-w-sm text-center space-y-8 backdrop-blur-xl">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-4xl">shield</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">نظام الدخول الموحد</h3>
              <p className="text-gray-400 text-sm">يرجى تسجيل الدخول للوصول للوحة التحكم</p>
            </div>
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-primary text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-glow"
            >
              دخول كموظف عادي
            </button>
          </div>
        </div>
      )}

      {/* 2️⃣ USER DASHBOARD */}
      {view === 'user' && (
        <div className="p-8 lg:p-12 animate-in slide-in-from-left-10 duration-500 space-y-10">
          <div className="flex items-center justify-between border-b border-white/5 pb-8 flex-row-reverse">
            <div className="text-right">
              <h3 className="text-3xl font-black text-white italic">لوحة التحكم</h3>
              <div className="flex items-center gap-2 justify-end mt-1">
                <span className="text-xs text-primary font-bold uppercase tracking-widest">Employee_Account</span>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
               <span className="material-symbols-outlined text-gray-400">person</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-right space-y-3">
               <span className="material-symbols-outlined text-primary">shopping_cart</span>
               <h4 className="text-white font-bold">طلباتي الأخيرة</h4>
               <p className="text-gray-400 text-sm italic">لا توجد طلبات جديدة حالياً.</p>
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-right space-y-3">
               <span className="material-symbols-outlined text-primary">account_circle</span>
               <h4 className="text-white font-bold">تحديث ملفي</h4>
               <p className="text-gray-400 text-sm italic">تعديل الاسم والبريد الإلكتروني.</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-8 rounded-[2rem] text-right space-y-4">
             <div className="flex items-center gap-3 justify-end text-primary">
                <p className="font-bold">هذه لوحة تحكم المستخدم العادي</p>
                <span className="material-symbols-outlined">info</span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               أنت الآن تشاهد ميزات الموظف فقط. لاحظ الرابط (URL) في شريط البحث بالأعلى.
             </p>
             <div className="bg-black/40 p-4 rounded-xl border border-white/5 inline-block w-full">
               <p className="text-white font-bold text-base mb-1">تحدي:</p>
               <p className="text-gray-500 text-sm">جرّب تغيير جزء بسيط من الرابط وشوف ماذا يحدث.</p>
             </div>
          </div>
        </div>
      )}

      {/* 3️⃣ ADMIN AREA */}
      {view === 'admin' && (
        <div className="p-8 lg:p-12 animate-in zoom-in duration-700 space-y-10 relative">
          <div className="absolute inset-0 bg-red-600/5 pointer-events-none animate-pulse"></div>

          <div className="flex items-center justify-between border-b border-red-500/20 pb-8 flex-row-reverse relative z-10">
            <div className="text-right">
              <h3 className="text-3xl font-black text-red-500 italic">منطقة المدير</h3>
              <div className="flex items-center gap-2 justify-end mt-1">
                <span className="text-xs text-red-400 font-bold uppercase tracking-widest">System_Administrator</span>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/30">
               <span className="material-symbols-outlined text-red-500">settings_suggest</span>
            </div>
          </div>

          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl flex items-center justify-end gap-4 relative z-10">
             <div className="text-right">
                <p className="text-red-500 font-black text-lg">تم الوصول لمنطقة إدارية بدون صلاحية</p>
                <p className="text-red-400/80 text-sm">لقد تم كسر حاجز الوصول (Access Control Breach)</p>
             </div>
             <span className="material-symbols-outlined text-red-500 text-4xl">gpp_maybe</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="p-8 bg-black/60 border border-red-900/30 rounded-[2rem] text-right space-y-3">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded uppercase font-bold">Confidential</span>
                 <span className="material-symbols-outlined text-red-400">payments</span>
               </div>
               <h4 className="text-white font-bold">سجل الرواتب والأرباح</h4>
               <div className="space-y-1">
                 <div className="h-2 w-full bg-white/5 rounded-full"></div>
                 <div className="h-2 w-3/4 bg-white/5 rounded-full"></div>
               </div>
            </div>
            <div className="p-8 bg-black/60 border border-red-900/30 rounded-[2rem] text-right space-y-3">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded uppercase font-bold">Admin Only</span>
                 <span className="material-symbols-outlined text-red-400">group_remove</span>
               </div>
               <h4 className="text-white font-bold">إدارة وحذف الحسابات</h4>
               <p className="text-red-400/40 text-xs italic">أدوات التحكم المركزية مفعلة.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center space-y-6 relative z-10">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
             </div>
             <div className="space-y-3">
                <h4 className="text-xl font-bold text-white italic">ما حدث الآن هو مثال حي على Broken Access Control</h4>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                  أنت لم تقم بهجوم معقد، فقط قمت بتغيير كلمة <span className="text-white font-mono bg-white/5 px-2 rounded">user</span> إلى <span className="text-white font-mono bg-white/5 px-2 rounded">admin</span> في الرابط.
                  <br/>
                  <span className="text-primary font-bold">المشكلة:</span> النظام لم يتحقق هل هذا المستخدم مخوّل أم لا عند طلب الصفحة الجديدة، واعتمد فقط على ما هو مكتوب في الرابط.
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Navigation for next section */}
      <div className="relative z-[110] p-10 flex justify-center border-t border-white/5">
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

      <style>{`
        .shadow-glow {
          box-shadow: 0 0 20px rgba(0, 212, 170, 0.4);
        }
      `}</style>
    </div>
  );
};
