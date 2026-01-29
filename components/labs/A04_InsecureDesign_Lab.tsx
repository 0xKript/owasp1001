
import React, { useState } from 'react';
import { Vulnerability } from '../../types';

type LabStep = 'intro' | 'purchase' | 'exploit' | 'aha';

export const A04_InsecureDesign_Lab: React.FC<{ vulnerability: Vulnerability }> = () => {
  const [step, setStep] = useState<LabStep>('intro');
  const [balance, setBalance] = useState(100);
  const [orderStatus, setOrderStatus] = useState<'none' | 'purchased' | 'refunded'>('none');
  const [refundCount, setRefundCount] = useState(0);

  const handlePurchase = () => {
    setBalance(prev => prev - 50);
    setOrderStatus('purchased');
    setStep('purchase');
  };

  const handleRefund = () => {
    // الخلل التصميمي هنا: النظام لا يتحقق من حالة الطلب الحالية أو عدد المرات
    // هو فقط ينفذ عملية "إرجاع المبلغ" بناءً على رقم الطلب دون حدود منطقية
    setBalance(prev => prev + 50);
    setRefundCount(prev => prev + 1);
    setOrderStatus('refunded');
    
    if (refundCount >= 1) {
      setStep('aha');
    } else {
      setStep('exploit');
    }
  };

  return (
    <div className="animate-in fade-in duration-700 font-sans text-right">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* المحفظة الرقمية - ثابتة دائمًا كمرجع للمستخدم */}
        <div className="bg-[#111] border-2 border-white/5 p-6 rounded-3xl flex justify-between items-center flex-row-reverse shadow-xl">
           <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">رصيد محفظتك</p>
                <p className="text-3xl font-mono font-black text-primary">${balance}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              </div>
           </div>
           <div className="text-left font-mono text-[10px] text-gray-600 hidden sm:block">
              SYS_UID: 99821-X<br/>
              WALLET_STATUS: ACTIVE
           </div>
        </div>

        {/* جسم المختبر التفاعلي */}
        <div className="bg-surface-dark border-2 border-white/10 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-center">
          
          {step === 'intro' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 text-center">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                 <span className="material-symbols-outlined text-white text-4xl">shopping_bag</span>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white italic">المهمة: شراء منتج ثم تجربة الاسترداد</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                    أنت الآن في متجر إلكتروني. قم بشراء "سماعات بلوتوث" بقيمة <span className="text-white font-bold">$50</span> لرؤية كيف يعمل نظام المحفظة.
                  </p>
               </div>
               <button 
                onClick={handlePurchase}
                className="px-12 py-4 bg-primary text-black font-black rounded-2xl hover:shadow-glow transition-all active:scale-95"
               >
                 شراء المنتج الآن
               </button>
            </div>
          )}

          {step === 'purchase' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500 text-center">
               <div className="p-8 bg-green-500/10 border-2 border-green-500/30 rounded-[2.5rem] space-y-4">
                  <span className="material-symbols-outlined text-green-500 text-6xl">verified</span>
                  <h3 className="text-2xl font-black text-white italic">تم الشراء بنجاح!</h3>
                  <p className="text-gray-400 font-medium">تم خصم $50 من رصيدك. المنتج متاح الآن في قائمة طلباتك.</p>
               </div>
               
               <div className="space-y-6">
                  <p className="text-primary font-bold text-lg italic">الخطوة التالية: هل تراجعت عن قرارك؟ جرب طلب استرداد المبلغ.</p>
                  <button 
                    onClick={handleRefund}
                    className="px-12 py-4 bg-white/5 border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all"
                  >
                    طلب استرداد المبلغ (Refund)
                  </button>
               </div>
            </div>
          )}

          {step === 'exploit' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 text-center">
               <div className="p-8 bg-blue-500/10 border-2 border-blue-500/30 rounded-[2.5rem] space-y-4">
                  <span className="material-symbols-outlined text-blue-400 text-6xl">currency_exchange</span>
                  <h3 className="text-2xl font-black text-white italic">تمت عملية الاسترداد</h3>
                  <p className="text-gray-400 font-medium">عاد مبلغ $50 إلى محفظتك. لاحظ أن النظام يخبرك بأن العملية "مكتملة".</p>
               </div>

               <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 space-y-6">
                  <h4 className="text-primary font-black text-xl italic flex items-center gap-3 justify-center">
                    <span className="material-symbols-outlined">psychology</span>
                    فكّر قليلاً كصائد ثغرات
                  </h4>
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    النظام نفذ طلبك وأعاد المال. لكن.. الزر لا يزال متاحاً للضغط! 
                    <br/>
                    <span className="text-white font-bold underline decoration-primary decoration-2">ماذا لو ضغطت على زر الاسترداد مرة أخرى لنفس الطلب؟</span>
                  </p>
                  <button 
                    onClick={handleRefund}
                    className="px-12 py-4 bg-severity-critical text-white font-black rounded-2xl hover:shadow-glow-red transition-all animate-pulse"
                  >
                    تكرار طلب الاسترداد مرة ثانية
                  </button>
               </div>
            </div>
          )}

          {step === 'aha' && (
            <div className="space-y-10 animate-in zoom-in duration-700">
               <div className="bg-severity-critical/10 border-4 border-severity-critical/40 p-10 rounded-[3.5rem] text-center space-y-6 relative overflow-hidden group/alert">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/alert:rotate-12 transition-transform duration-1000">
                    <span className="material-symbols-outlined text-[200px] text-severity-critical">warning</span>
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <span className="material-symbols-outlined text-severity-critical text-7xl animate-bounce">monetization_on</span>
                    <h2 className="text-3xl lg:text-4xl font-black text-white italic">لحظة الإدراك: رصيدك الآن {balance}$ !</h2>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                      لقد نجحت في توليد "مال من العدم". النظام أعاد لك المال مرتين لنفس المنتج، وأصبح رصيدك أكبر مما بدأت به!
                    </p>
                    
                    <div className="h-px bg-white/10 w-full my-6"></div>

                    <div className="text-right space-y-4">
                       <h4 className="text-severity-critical font-black text-xl italic flex items-center gap-2 justify-end">
                         لماذا حدث هذا؟ (Insecure Design)
                         <span className="material-symbols-outlined">architecture</span>
                       </h4>
                       <p className="text-gray-400 text-lg leading-relaxed">
                        الخلل هنا ليس "خطأ برمجياً" (Bug) بالمعنى التقليدي، الكود نفذ عملية الجمع بدقة. الخلل هو في <span className="text-white font-bold">منطق التصميم</span> الذي لم يضع "حالة" (State) للطلب تمنع تكرار الاسترداد، ولم يضع حدوداً منطقية تضمن أن المبلغ المسترد لا يتجاوز المبلغ المدفوع أصلاً.
                       </p>
                    </div>
                  </div>
               </div>

               <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setStep('intro');
                      setBalance(100);
                      setRefundCount(0);
                      setOrderStatus('none');
                    }}
                    className="text-primary font-black text-sm uppercase tracking-widest hover:underline"
                  >
                    إعادة المحاكاة للتثبيت
                  </button>
               </div>
            </div>
          )}

        </div>

        {/* دليل الخطوات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 hover:opacity-100 transition-opacity">
           {[
             { label: 'جرّب', icon: 'ads_click', desc: 'استخدم النظام بشكل طبيعي' },
             { label: 'لاحظ', icon: 'visibility', desc: 'راقب رصيدك وسلوك الأزرار' },
             { label: 'فكّر', icon: 'psychology', desc: 'ما هي الحدود المفقودة هنا؟' },
             { label: 'اكتشف', icon: 'bolt', desc: 'استغل الخلل التصميمي' }
           ].map((item, i) => (
             <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5 text-center space-y-2">
                <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                <p className="text-white font-black text-2xl">{item.label}</p>
                <p className="text-lg text-gray-400 font-medium">{item.desc}</p>
             </div>
           ))}
        </div>

      </div>

      {/* زر الانتقال لقسم الاختبار - تم الحفاظ عليه حسب طلب الهيكل العام */}
      <div className="mt-16 pt-8 border-t border-white/5 flex justify-center">
        <button 
          onClick={() => {
            const tabButtons = Array.from(document.querySelectorAll('button'));
            const quizBtn = tabButtons.find(btn => (btn as HTMLElement).innerText.includes('الاختبار'));
            if (quizBtn) (quizBtn as HTMLElement).click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-10 py-4 bg-primary text-black font-black rounded-xl shadow-lg hover:shadow-glow transition-all cursor-pointer"
        >
          انتقل إلى قسم الكويز
        </button>
      </div>
    </div>
  );
};
