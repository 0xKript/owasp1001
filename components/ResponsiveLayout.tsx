import React, { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      const mobile = window.innerWidth <= 640;
      setIsPortrait(portrait);
      setIsMobileWidth(mobile);
      
      if (!portrait) {
        setMenuOpen(false);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="App arabic-optimized min-h-screen w-full overflow-x-hidden font-sans text-slate-900 dark:text-white relative">

      {/* Overlay يظهر عند الوضع العمودي للهواتف */}
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-md">
          <p className="text-xl sm:text-2xl mb-8 font-black italic leading-relaxed">
            يرجى تدوير الهاتف بالعرض (Landscape)
            <br/>
            للحصول على أفضل تجربة تعليمية
          </p>
          <div className="w-20 h-20 border-4 border-primary rounded-full flex items-center justify-center animate-spin-slow">
            <span className="material-symbols-outlined text-primary text-4xl">screen_rotation</span>
          </div>
        </div>
      )}

      {/* شريط القوائم للجوال في وضع Landscape */}
      {!isPortrait && isMobileWidth && (
        <div className="fixed top-4 left-4 z-[150]">
          <button
            className="w-12 h-12 flex items-center justify-center bg-slate-900 text-primary rounded-full shadow-glow border border-primary/20 active:scale-90 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>

          {menuOpen && (
            <div className="mt-4 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col divide-y divide-white/5">
                <button className="p-4 text-right hover:bg-primary/10 text-white text-sm font-bold transition-colors">الصفحة الرئيسية</button>
                <button className="p-4 text-right hover:bg-primary/10 text-white text-sm font-bold transition-colors">المختبرات العملية</button>
                <button className="p-4 text-right hover:bg-primary/10 text-white text-sm font-bold transition-colors">الإعدادات</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* منطقة المحتوى الرئيسي */}
      <div className={isPortrait ? "opacity-20 pointer-events-none blur-sm" : "opacity-100"}>
        {children}
      </div>

      {/* التنسيقات العالمية */}
      <style>{`
        * {
          box-sizing: border-box;
          max-width: 100%;
          overflow-wrap: break-word;
        }

        body, .App {
          width: 100% !important;
          overflow-x: hidden !important;
          margin: 0;
          padding: 0;
        }

        [lang="ar"], [dir="rtl"] {
          line-height: 1.8 !important;
        }

        .arabic-optimized {
          background: #05050a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .shadow-glow {
          box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
        }

        /* Responsive Grid Utilities */
        .responsive-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .p-10, .p-12, .p-16 { padding: 1.5rem !important; }
          .rounded-[2.5rem], .rounded-[3rem], .rounded-[4rem] { border-radius: 1.5rem !important; }
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveLayout;
