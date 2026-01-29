
import React, { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      const mobile = window.innerWidth <= 768;
      setIsPortrait(portrait);
      setIsMobileWidth(mobile);
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

      {/* Main Content Container */}
      <div className={`${(isPortrait && isMobileWidth) ? "opacity-10 pointer-events-none blur-md scale-95" : "opacity-100"} transition-all duration-700`}>
        {children}
      </div>

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

        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(0, 212, 170, 0.5));
        }

        @media (max-width: 640px) {
          .p-10, .p-12, .p-16, .p-20 { padding: 1.5rem !important; }
          .rounded-[2.5rem], .rounded-[3rem], .rounded-[4rem], .rounded-[3.5rem] { border-radius: 1.5rem !important; }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ResponsiveLayout;
