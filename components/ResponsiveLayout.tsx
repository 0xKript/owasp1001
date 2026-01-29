
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
      
      if (portrait) {
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

  const isLandscapeMobile = !isPortrait && isMobileWidth;

  return (
    <div className="App arabic-optimized min-h-screen w-full overflow-x-hidden font-sans text-slate-900 dark:text-white relative" dir="rtl">

      {/* Overlay for Mobile Portrait Mode */}
      {isPortrait && isMobileWidth && (
        <div className="fixed inset-0 bg-background-dark/95 z-[300] flex flex-col items-center justify-center text-white p-10 text-center backdrop-blur-xl">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20 animate-pulse">
            <span className="material-symbols-outlined text-primary text-6xl">screen_rotation</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black italic leading-loose tracking-tighter drop-shadow-glow">
            اجعل الهاتف بالعرض
            <br/>
            لتعيش تجربة أفضل
          </p>
          <div className="mt-10 flex gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

      {/* Three-dots Menu for Mobile Landscape Mode */}
      {isLandscapeMobile && (
        <div className="fixed top-4 right-4 z-[250] flex flex-col items-end">
          <button
            className="w-12 h-12 flex items-center justify-center bg-background-dark/80 backdrop-blur-md text-primary rounded-full shadow-glow border border-primary/30 active:scale-90 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span className="material-symbols-outlined text-3xl">{menuOpen ? 'close' : 'more_vert'}</span>
          </button>

          {menuOpen && (
            <div className="mt-3 w-64 bg-background-dark/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col divide-y divide-white/5 py-2">
                {[
                  { label: "تغيير لون الموقع", icon: "palette" },
                  { label: "معلومات التواصل", icon: "contact_mail" },
                  { label: "صفحة التقارير", icon: "description" },
                  { label: "الصفحة الرئيسية", icon: "home" },
                  { label: "النظري + العملي + الكويز", icon: "auto_stories" },
                  { label: "الإعدادات", icon: "settings" }
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    className="p-5 text-right hover:bg-primary/10 text-white text-base font-black transition-all flex items-center justify-between group"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">{item.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Container */}
      <div className={`${(isPortrait && isMobileWidth) ? "opacity-10 pointer-events-none blur-md scale-95" : "opacity-100"} transition-all duration-700`}>
        {children}
      </div>

      {/* Custom Global Styles */}
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

        /* Prevent standard navigation bar from appearing in Mobile Landscape */
        @media (max-width: 640px) and (orientation: landscape) {
          nav.fixed.top-0 {
            display: none !important;
          }
          /* Adjust content spacing since fixed nav is gone */
          .pt-16, .pt-24 {
            padding-top: 1rem !important;
          }
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

        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(0, 212, 170, 0.5));
        }

        /* Mobile specific padding overrides */
        @media (max-width: 640px) {
          .p-10, .p-12, .p-16, .p-20 { padding: 1.5rem !important; }
          .rounded-[2.5rem], .rounded-[3rem], .rounded-[4rem], .rounded-[3.5rem] { border-radius: 1.5rem !important; }
          h1 { font-size: 2.5rem !important; }
          h2 { font-size: 1.8rem !important; }
        }

        /* Smooth scroll for the whole app */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ResponsiveLayout;
