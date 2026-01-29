import React, { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
        setMenuOpen(false); // إغلاق القائمة عند Landscape تلقائي
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
      
      {/* Overlay يظهر إذا الهاتف عمودي */}
      {isPortrait && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[200] flex flex-col items-center justify-center text-white p-4 text-center">
          <p className="text-lg sm:text-xl mb-6 font-semibold">
            اجعل الهاتف بالعرض لتعيش تجربة أفضل
          </p>
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
            <div className="w-4 h-12 bg-white rotate-45 origin-bottom-left"></div>
          </div>
        </div>
      )}

      {/* زر الثلاث نقاط يظهر عند الجوال Landscape */}
      {!isPortrait && (
        <div className="fixed top-4 right-4 z-50">
          <button
            className="text-2xl p-2 bg-gray-800 text-white rounded-full shadow-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>

          {/* قائمة الأزرار */}
          {menuOpen && (
            <div className="mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col divide-y divide-gray-300 dark:divide-gray-700 overflow-hidden border border-white/5">
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">تغيير لون الموقع</button>
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">معلومات التواصل</button>
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">صفحة التقارير</button>
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">الصفحة الرئيسية</button>
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">النظري + العملي + الكويز</button>
              <button className="p-3 text-right hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">الإعدادات</button>
            </div>
          )}
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className={isPortrait ? "opacity-50 pointer-events-none blur-sm" : ""}>
        {children}
      </div>

      {/* CSS العالمي */}
      <style>{`
        * {
          box-sizing: border-box;
          max-width: 100%;
          overflow-wrap: break-word;
        }

        body, .App {
          width: 100% !important;
          overflow-x: hidden !important;
        }

        [lang="ar"], [dir="rtl"] {
          line-height: 1.8 !important;
        }

        .text-responsive {
          font-size: clamp(0.875rem, 2vw, 1.125rem) !important;
          line-height: clamp(1.6, 3vw, 2) !important;
        }

        img {
          max-width: 100% !important;
          height: auto !important;
          display: block;
        }

        .arabic-optimized {
          background: #0a0a0a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

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
