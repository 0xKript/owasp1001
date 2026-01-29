import React, { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    // دالة لتحديث اتجاه الشاشة
    const checkOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    };

    // تحقق عند تحميل الصفحة
    checkOrientation();

    // استمع لتغيرات اتجاه الشاشة
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="App arabic-optimized min-h-screen w-full overflow-x-hidden font-sans text-slate-900 dark:text-white relative">
      
      {/* Overlay يظهر إذا الهاتف عمودي */}
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center text-white p-4 text-center">
          <p className="text-lg sm:text-xl mb-6 font-semibold">
            اجعل الهاتف بالعرض لتعيش تجربة أفضل
          </p>
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
            <div className="w-4 h-12 bg-white rotate-45 origin-bottom-left"></div>
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className={isPortrait ? "opacity-50 pointer-events-none" : ""}>
        {children}
      </div>

      {/* CSS العالمي */}
      <style>{`
        /* Reset basic behaviors */
        * {
          box-sizing: border-box;
          max-width: 100%;
          overflow-wrap: break-word;
        }

        body, .App {
          width: 100% !important;
          overflow-x: hidden !important;
        }

        /* Arabic Text Adjustments */
        [lang="ar"], [dir="rtl"] {
          line-height: 1.8 !important;
        }

        /* Responsive Text */
        .text-responsive {
          font-size: clamp(0.875rem, 2vw, 1.125rem) !important;
          line-height: clamp(1.6, 3vw, 2) !important;
        }

        /* Images */
        img {
          max-width: 100% !important;
          height: auto !important;
          display: block;
        }

        /* Arabic Mobile Theme */
        .arabic-optimized {
          background: linear-gradient(135deg, rgba(5,5,10,0.98) 0%, rgba(10,15,25,0.98) 100%);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
        }

        /* Responsive Grid / Flex for content (Theory, Practice, Quiz) */
        .responsive-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        .responsive-grid > * {
          flex: 1 1 280px;
          max-width: 350px;
        }

        @media (max-width: 640px) {
          .responsive-grid {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .responsive-grid > * {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveLayout;