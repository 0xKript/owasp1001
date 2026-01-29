
import React, { useState } from 'react';
import { UserProfile, Page, AppLanguage } from '../types';

const PRESET_COLORS = [
  { hex: '#2bcbba', label: 'سيان', labelEn: 'Cyan' },
  { hex: '#eb3b5a', label: 'قرمزي', labelEn: 'Crimson' },
  { hex: '#4b6584', label: 'رمادي صخري', labelEn: 'Slate' },
  { hex: '#ffffff', label: 'أبيض', labelEn: 'White' },
  { hex: '#00d4aa', label: 'أخضر أساسي', labelEn: 'Primary Green' },
  { hex: '#8b4513', label: 'بني', labelEn: 'Brown' },
  { hex: '#a855f7', label: 'بنفسجي', labelEn: 'Purple' },
  { hex: '#3b82f6', label: 'أزرق', labelEn: 'Blue' },
  { hex: '#d4af37', label: 'ذهبي', labelEn: 'Gold' },
];

interface SettingsPageProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  privacySettings: { showActivity: boolean; acceptCookies: boolean };
  setPrivacySettings: (settings: any) => void;
  setCurrentPage: (page: Page) => void;
  logoutText: string;
  lang: AppLanguage;
  setLang: (l: AppLanguage) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  setUser,
  primaryColor,
  setPrimaryColor,
  fontSize,
  setFontSize,
  isDarkMode,
  setIsDarkMode,
  setCurrentPage,
  lang,
  setLang,
}) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const navItems = [
    { id: 'appearance', label: lang === 'ar' ? 'المظهر' : 'Appearance', icon: 'palette' },
    { id: 'privacy', label: lang === 'ar' ? 'الخصوصية' : 'Privacy', icon: 'lock' },
    { id: 'about', label: lang === 'ar' ? 'حول الموقع' : 'About', icon: 'info' },
  ];

  const t = {
    ar: {
      settings: 'الإعدادات',
      settingsSub: 'إدارة تفضيلات الموقع وتخصيص تجربة التعلم الخاصة بك.',
      back: 'العودة للرئيسية',
      appearance: 'المظهر',
      themeMode: 'وضع العرض',
      themeSub: 'اختر بين الوضع الفاتح والداكن',
      light: 'فاتح',
      dark: 'داكن',
      themeColor: 'لون السمة',
      fontSize: 'حجم الخط',
      small: 'صغير',
      medium: 'وسط',
      large: 'كبير',
      privacy: 'الخصوصية',
      privacyNote: 'الموقع آمن ومحمي بالكامل',
      about: 'حول الموقع',
      aboutDate: 'تاريخ الإنشاء: يناير 2026',
      aboutDesc: 'انطلقت فكرة الموقع لتوفير بيئة تعليمية مخصصة تركز على تبسيط مفاهيم أمن المعلومات وحماية تطبيقات الويب. يقدم الموقع محاكاة تفاعلية لأشهر الثغرات الأمنية وكيفية اكتشافها والوقاية منها بأسلوب يجمع بين التحليل النظري والتطبيق العملي، مما يساهم في رفع الوعي التقني للمبرمجين والمهتمين بالمجال.'
    },
    en: {
      settings: 'Settings',
      settingsSub: 'Manage site preferences and customize your learning experience.',
      back: 'Back to Home',
      appearance: 'Appearance',
      themeMode: 'Display Mode',
      themeSub: 'Choose between light and dark modes',
      light: 'Light',
      dark: 'Dark',
      themeColor: 'Theme Color',
      fontSize: 'Font Size',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      privacy: 'Privacy',
      privacyNote: 'The site is completely secure and protected',
      about: 'About',
      aboutDate: 'Created: January 2026',
      aboutDesc: 'The site was launched to provide a specialized educational environment focused on simplifying information security concepts and web application protection. It offers interactive simulations of the most famous security vulnerabilities and how to detect and prevent them in a way that combines theoretical analysis and practical application.'
    }
  };

  const cur = t[lang] || t.en;

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`fixed inset-0 z-[150] dark:bg-background-dark bg-slate-50 dark:text-white text-slate-900 font-sans flex ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'} overflow-hidden transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`w-[280px] dark:bg-surface-dark bg-white ${lang === 'ar' ? 'border-l' : 'border-r'} dark:border-border-dark border-slate-200 flex flex-col shrink-0 h-full z-20 transition-colors duration-300`}>
        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}
                ${activeTab === item.id ? `bg-primary/10 text-primary ${lang === 'ar' ? 'border-r-2' : 'border-l-2'} border-primary` : 'dark:text-gray-400 text-slate-500 dark:hover:bg-[#252525] hover:bg-slate-100 dark:hover:text-white hover:text-slate-900'}
              `}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer / Back to Home */}
        <div className="p-4 border-t dark:border-border-dark border-slate-200">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-primary dark:hover:bg-primary/10 hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined">{lang === 'ar' ? 'home' : 'home'}</span>
            <span className="font-medium text-sm">{cur.back}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto dark:bg-background-dark bg-slate-50 p-8 md:p-12 scroll-smooth transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
          {/* Page Header */}
          <header className={`flex flex-col gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">{cur.settings}</h1>
            <p className="dark:text-gray-400 text-slate-500">{cur.settingsSub}</p>
          </header>

          {/* Appearance */}
          <section className="space-y-6" id="appearance">
            <div className={`flex items-center justify-between border-b dark:border-border-dark border-slate-200 pb-4 ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
              <h2 className="text-xl font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">palette</span>
                {cur.appearance}
              </h2>
            </div>
            <div className="dark:bg-surface-dark bg-white rounded-xl p-6 border dark:border-border-dark border-slate-200 space-y-8 transition-colors duration-300 shadow-sm">
              {/* Theme Mode */}
              <div className={`flex items-center justify-between ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <p className="font-medium dark:text-white text-slate-900">{cur.themeMode}</p>
                  <p className="text-sm dark:text-gray-400 text-slate-500">{cur.themeSub}</p>
                </div>
                <div className="dark:bg-background-dark bg-slate-100 p-1 rounded-lg border dark:border-border-dark border-slate-200 flex gap-1">
                  <button 
                    onClick={() => setIsDarkMode(false)}
                    className={`px-6 py-1.5 rounded transition-all text-sm font-medium ${!isDarkMode ? 'dark:bg-surface-dark bg-white text-primary shadow-sm' : 'dark:text-gray-400 text-slate-500 dark:hover:text-white hover:text-slate-700'}`}
                  >
                    {cur.light}
                  </button>
                  <button 
                    onClick={() => setIsDarkMode(true)}
                    className={`px-6 py-1.5 rounded transition-all text-sm font-medium ${isDarkMode ? 'dark:bg-surface-dark bg-white text-primary shadow-sm' : 'dark:text-gray-400 text-slate-500 dark:hover:text-white hover:text-slate-700'}`}
                  >
                    {cur.dark}
                  </button>
                </div>
              </div>
              {/* Theme Color */}
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <p className="font-medium dark:text-white text-slate-900 mb-3">{cur.themeColor}</p>
                <div className={`flex flex-wrap gap-4 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setPrimaryColor(color.hex)}
                      title={lang === 'ar' ? color.label : color.labelEn}
                      className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 focus:border-white ${primaryColor.toLowerCase() === color.hex.toLowerCase() ? 'border-white shadow-[0_0_10px_currentColor]' : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex, color: color.hex }}
                    ></button>
                  ))}
                </div>
              </div>
              {/* Font Size */}
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <p className="font-medium dark:text-white text-slate-900 mb-3">{cur.fontSize}</p>
                <div className="grid grid-cols-3 gap-3">
                  <label className={`cursor-pointer border rounded-lg p-3 dark:bg-background-dark bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 ${fontSize === 'small' ? 'border-2 border-primary' : 'dark:border-border-dark border-slate-200 dark:hover:border-gray-500 hover:border-slate-300'}`}>
                    <input className="sr-only" name="font-size" type="radio" checked={fontSize === 'small'} onChange={() => setFontSize('small')} />
                    <span className="text-xs dark:text-gray-400 text-slate-500">Aa</span>
                    <span className={`text-sm ${fontSize === 'small' ? 'text-primary font-medium' : 'dark:text-gray-400 text-slate-500'}`}>{cur.small}</span>
                  </label>
                  <label className={`cursor-pointer border rounded-lg p-3 dark:bg-background-dark bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 ${fontSize === 'medium' ? 'border-2 border-primary' : 'dark:border-border-dark border-slate-200 dark:hover:border-gray-500 hover:border-slate-300'}`}>
                    <input className="sr-only" name="font-size" type="radio" checked={fontSize === 'medium'} onChange={() => setFontSize('medium')} />
                    <span className="text-base dark:text-white text-slate-900">Aa</span>
                    <span className={`text-sm ${fontSize === 'medium' ? 'text-primary font-medium' : 'dark:text-gray-400 text-slate-500'}`}>{cur.medium}</span>
                  </label>
                  <label className={`cursor-pointer border rounded-lg p-3 dark:bg-background-dark bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 ${fontSize === 'large' ? 'border-2 border-primary' : 'dark:border-border-dark border-slate-200 dark:hover:border-gray-500 hover:border-slate-300'}`}>
                    <input className="sr-only" name="font-size" type="radio" checked={fontSize === 'large'} onChange={() => setFontSize('large')} />
                    <span className="text-lg dark:text-gray-400 text-slate-500">Aa</span>
                    <span className={`text-sm ${fontSize === 'large' ? 'text-primary font-medium' : 'dark:text-gray-400 text-slate-500'}`}>{cur.large}</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="space-y-6" id="privacy">
            <div className={`flex items-center justify-between border-b dark:border-border-dark border-slate-200 pb-4 ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
              <h2 className="text-xl font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                {cur.privacy}
              </h2>
            </div>
            <div className="dark:bg-surface-dark bg-white rounded-xl border dark:border-border-dark border-slate-200 p-10 space-y-6 text-center shadow-sm transition-colors duration-300">
               <p className="text-xl font-black dark:text-white text-slate-900 italic">{cur.privacyNote}</p>
            </div>
          </section>

          {/* About */}
          <section className="space-y-6" id="about">
            <div className={`flex items-center justify-between border-b dark:border-border-dark border-slate-200 pb-4 ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
              <h2 className="text-xl font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                {cur.about}
              </h2>
            </div>
            <div className="dark:bg-surface-dark bg-white rounded-xl p-8 border dark:border-border-dark border-slate-200 space-y-6 transition-colors duration-300 shadow-sm">
              <div className={`flex flex-col gap-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className="text-lg font-bold dark:text-white text-slate-900">{cur.aboutDate}</p>
                <p className="dark:text-gray-300 text-slate-700 text-lg leading-relaxed">
                  {cur.aboutDesc}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
