
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Page, UserProfile, Vulnerability, VulnerabilitySubSection, AppLanguage } from './types';
import { TOP_10_2023 } from './constants';
import { VulnerabilityCard } from './components/VulnerabilityCard';
import { VulnerabilityTheory } from './components/VulnerabilityTheory';
import { VulnerabilityLab } from './components/VulnerabilityLab';
import { VulnerabilityQuiz } from './components/VulnerabilityQuiz';
import { CyberBugsBackground } from './components/CyberBugsBackground';
import { SettingsPage } from './components/SettingsPage';
import ResponsiveLayout from './components/ResponsiveLayout';

const DigitalBug: React.FC<{ className: string }> = ({ className }) => (
  <div className={`absolute w-10 h-10 pointer-events-auto transition-all duration-300 hover:scale-150 hover:rotate-12 group/dbug ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/40 group-hover/dbug:stroke-primary transition-colors">
      <path d="M50 5 L95 50 L50 95 L5 50 Z" strokeWidth="2" />
      <circle cx="50" cy="50" r="15" strokeWidth="1" className="opacity-30 group-hover/dbug:opacity-100" />
      <path d="M30 30 L70 70 M70 30 L30 70" strokeWidth="1" className="opacity-20 group-hover/dbug:opacity-60" />
      <rect x="47" y="47" width="6" height="6" fill="currentColor" className="text-primary/50 group-hover/dbug:text-primary animate-pulse" />
    </svg>
  </div>
);

const OWASP_OFFICIAL_REGISTRY = [
  {
    id: 'A01',
    name: 'BROKEN ACCESS CONTROL',
    title: 'CVE-2023-23752',
    description: 'تسمح هذه الثغرة في Joomla بالوصول غير المصرح به إلى نقاط نهاية REST API، مما يكشف عن معلومات تقنية حساسة وبيانات الاعتماد.',
    severity: 'CRITICAL',
    color: 'red',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-23752'
  },
  {
    id: 'A02',
    name: 'CRYPTOGRAPHIC FAILURES',
    title: 'CVE-2014-0160',
    description: 'ثغرة Heartbleed الشهيرة التي سمحت بقراءة ذاكرة النظام وسرقة مفاتيح التشفير وبيانات المستخدمين من المواقع المؤمنة بـ OpenSSL.',
    severity: 'CRITICAL',
    color: 'red',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2014-0160'
  },
  {
    id: 'A03',
    name: 'INJECTION',
    title: 'CVE-2023-1389',
    description: 'ثغرة حقن أوامر (Command Injection) في أجهزة TP-Link Archer، تسمح للمهاجمين بتنفيذ أوامر عشوائية على نظام التشغيل عن بُعد.',
    severity: 'CRITICAL',
    color: 'red',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2023-1389'
  },
  {
    id: 'A04',
    name: 'INSECURE DESIGN',
    title: 'CVE-2022-22965',
    description: 'ثغرة Spring4Shell التي نتجت عن ضعف في التصميم سمح بتجاوز القيود الأمنية وتنفيذ كود برمي خبيث (RCE) على خوادم Java.',
    severity: 'DANGEROUS',
    color: 'orange',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2022-22965'
  },
  {
    id: 'A05',
    name: 'SECURITY MISCONFIGURATION',
    title: 'CVE-2021-41773',
    description: 'خلل في إعدادات Apache سمح للمهاجمين بتجاوز ضوابط الوصول وقراءة ملفات حساسة خارج نطاق الويب عبر هجمات Path Traversal.',
    severity: 'WARNING',
    color: 'yellow',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-41773'
  },
  {
    id: 'A06',
    name: 'VULNERABLE AND OUTDATED COMPONENTS',
    title: 'CVE-2021-44228',
    description: 'ثغرة Log4Shell الكارثية في مكتبة Log4j، حيث استغل المهاجمون معالجة السجلات لتنفيذ كود خبيث بالكامل على الخوادم المصابة.',
    severity: 'DANGEROUS',
    color: 'orange',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-44228'
  },
  {
    id: 'A07',
    name: 'IDENTIFICATION AND AUTHENTICATION FAILURES',
    title: 'CVE-2021-40539',
    description: 'فشل في المصادقة في Zoho ManageEngine سمح للمهاجمين بتجاوز فلاتر الأمان وتنفيذ عمليات إدارية دون الحاجة لتسجيل دخول صحيح.',
    severity: 'DANGEROUS',
    color: 'orange',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-40539'
  },
  {
    id: 'A08',
    name: 'SOFTWARE AND DATA INTEGRITY FAILURES',
    title: 'CVE-2020-0601',
    description: 'ثغرة في التحقق من الشهادات الرقمية في Windows، مكنت المهاجمين من تزوير تواقيع البرمجيات واختراق نزاهة البيانات والاتصالات.',
    severity: 'CRITICAL',
    color: 'red',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2020-0601'
  },
  {
    id: 'A09',
    name: 'SECURITY LOGGING AND MONITORING FAILURES',
    title: 'CVE-2017-5638',
    description: 'ثغرة في Apache Struts نتجت عن ضعف معالجة الاستثناءات، مما سمح للمهاجمين بالسيطرة على الخوادم دون أن ترصدهم أنظمة المراقبة بفعالية.',
    severity: 'INFORMATIONAL',
    color: 'green',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2017-5638'
  },
  {
    id: 'A10',
    name: 'SERVER-SIDE REQUEST FORGERY (SSRF)',
    title: 'CVE-2019-7238',
    description: 'ثغرة SSRF في برنامج Nexus Repository، سمحت للمهاجمين بإجبار الخادم على إرسال طلبات داخلية لسرقة البيانات أو استكشاف الشبكة.',
    severity: 'DANGEROUS',
    color: 'orange',
    status: 'VALID / CORE RISK',
    url: 'https://nvd.nist.gov/vuln/detail/CVE-2019-7238'
  }
];

const App: React.FC = () => {
  const [lang, setLang] = useState<AppLanguage>(() => {
    return (localStorage.getItem('app_lang') as AppLanguage) || 'ar';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    return saved ? saved === 'dark' : true; 
  });

  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    return (localStorage.getItem('app_font_size') as 'small' | 'medium' | 'large') || 'medium';
  });

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return (localStorage.getItem('app_current_page') as Page) || 'home';
  });
  
  const [activeSubSection, setActiveSubSection] = useState<VulnerabilitySubSection>(() => {
    return (localStorage.getItem('app_current_page') === 'vulnerability-detail' ? (localStorage.getItem('app_vuln_tab') as VulnerabilitySubSection) : 'theory') || 'theory';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('app_user_profile');
    return saved ? JSON.parse(saved) : { name: '', email: '', avatar: '' };
  });

  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(() => {
    const saved = localStorage.getItem('app_selected_vuln');
    return saved ? JSON.parse(saved) : null;
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('app_primary_color') || '#00d4aa';
  });

  const [privacySettings, setPrivacySettings] = useState(() => {
    const saved = localStorage.getItem('app_privacy_settings');
    return saved ? JSON.parse(saved) : { showActivity: true, acceptCookies: true };
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const t = {
    ar: {
      home: 'الرئيسية',
      theoryNav: 'النظري',
      practicalNav: 'العملي',
      quizNav: 'الكويز',
      settings: 'الإعدادات',
      backToHome: 'إنهاء الجلسة',
      theoryTab: 'التحليل',
      labTab: 'المحاكاة',
      quizTab: 'الاختبار',
      heroSub: `منصة عربية تعليمية متكاملة لتعلّم ثغرات OWASP Top 10
بشرح نظري واضح، وتطبيقات عملية، واختبارات تقييم (Quiz)،
مع الاطلاع على تقارير الثغرات الحقيقية (CVE) وربطها بالواقع الأمني.`,
      heroBtn: 'أبدأ التعلم الأن',
      top10Title:'الثغرات الأمنية الحرجة (OWASP Top 10)',
      top10Sub: 'أخطر أنماط الخلل الأمني التي تستغلها الهجمات الحديثة، مع توضيح آلية حدوثها وتأثيرها على أمن الأنظمة والتطبيقات.',
      newsTitle: 'تقارير الثغرات العالمية (CVE)',
      newsSub: 'استعراض وتحليل تقارير الثغرات الأمنية العالمية (CVE) المرتبطة بمخاطر OWASP Top 10 وفق بيانات قاعدة NVD.',
      contactTitle: 'معلومات التواصل ',
      contactSub: 'يمكنك التواصل معي عبر حساباتي الرسمية.',
      footerDesc: 'بيئة تعليمية مخصصة لشرح مخاطر أمن تطبيقات الويب وفق معايير معايير OWASP العالمي.',
      footerRights: 'جميع الحقوق محفوظة  2026 OWASP TOP 10',
      theoryListTitle: 'قائمة التحليل النظري',
      practicalListTitle: 'مختبرات المحاكاة العملية',
      quizListTitle: 'اختبارات مستوى الأمان',
      labClosedNote: 'المختبر الحالي تحت إشراف الأمن الوقائي. يرجى اختيار أحد الأهداف من القائمة الرئيسية لبدء العملية البرمجية.',
      closeBtn: 'إغلاق وتراجع',
      readAnalysis: 'قراءة التحليل',
      launchContainer: 'ابدأ المعمل',
      masteryChallenge: 'تحدي الإتقان',
      startQuiz: 'ابدأ الاختبار',
      entry: 'مدخل',
      settingsTitle: 'إعدادات النظام',
      logout: 'تسجيل الخروج',
      mobileMenu: {
        theme: 'تحويل لون الموقع',
        home: 'الصفحة الرئيسية',
        theory: 'النظري',
        practical: 'العملي',
        quiz: 'الكويز',
        reports: 'قسم التقارير',
        contact: 'معلومات التواصل',
        settings: 'الإعدادات'
      }
    },
    en: {
      home: 'Home',
      theoryNav: 'Theory',
      practicalNav: 'Labs',
      quizNav: 'Quiz',
      settings: 'Settings',
      backToHome: 'End Session',
      theoryTab: 'Analysis',
      labTab: 'Simulation',
      quizTab: 'Quiz',
      heroSub: `Comprehensive educational platform for learning OWASP Top 10 vulnerabilities
with clear theoretical explanations, practical applications, and assessment quizzes,
along with access to real-world vulnerability reports (CVE) linked to security reality.`,
      heroBtn: 'Run System',
      top10Title: 'Active Vulnerability Registry',
      top10Sub: 'Updated 2023 record of active vulnerabilities.',
      newsTitle: 'Global Vulnerability Reports (CVE)',
      newsSub: 'Review and analyze global vulnerability reports (CVE) associated with OWASP Top 10 risks according to NVD data.',
      contactTitle: 'Contact',
      contactSub: 'Contact Me',
      footerDesc: 'An educational environment dedicated to explaining web application security risks according to OWASP standards.',
      footerRights: 'All rights reserved 2026 OWASP TOP 10',
      theoryListTitle: 'Theory Analysis List',
      practicalListTitle: 'Practical Simulation Labs',
      quizListTitle: 'Security Level Quizzes',
      labClosedNote: 'The current lab is under preventive security supervision. Please select a target from the main menu to start.',
      closeBtn: 'Close and Return',
      readAnalysis: 'Read Analysis',
      launchContainer: 'Start Lab',
      masteryChallenge: 'Mastery Challenge',
      startQuiz: 'Start Quiz',
      entry: 'Entry',
      settingsTitle: 'System Settings',
      logout: 'Logout',
      mobileMenu: {
        theme: 'Toggle Theme',
        home: 'Home Page',
        theory: 'Theory',
        practical: 'Practical',
        quiz: 'Quiz',
        reports: 'Reports Section',
        contact: 'Contact Info',
        settings: 'Settings'
      }
    }
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage, selectedVuln]);

  useEffect(() => {
    localStorage.setItem('app_current_page', currentPage);
    localStorage.setItem('app_user_profile', JSON.stringify(user));
    localStorage.setItem('app_theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('app_primary_color', primaryColor);
    localStorage.setItem('app_privacy_settings', JSON.stringify(privacySettings));
    localStorage.setItem('app_font_size', fontSize);
    localStorage.setItem('app_lang', lang);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const sizes = { small: '14px', medium: '16px', large: '20px' };
    document.documentElement.style.fontSize = sizes[fontSize];

    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--primary-hover', primaryColor + 'cc');
    
    const hexColor = primaryColor.replace('#', '');
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (selectedVuln) {
      localStorage.setItem('app_selected_vuln', JSON.stringify(selectedVuln));
    }
    if (activeSubSection) {
      localStorage.setItem('app_vuln_tab', activeSubSection);
    }
  }, [currentPage, user, selectedVuln, isDarkMode, primaryColor, privacySettings, activeSubSection, fontSize, lang]);

  const handleVulnClick = (vuln: Vulnerability, tab: VulnerabilitySubSection = 'theory') => {
    setSelectedVuln(vuln);
    setActiveSubSection(tab);
    setCurrentPage('vulnerability-detail');
  };

  const scrollToTop10 = (tab: VulnerabilitySubSection = 'theory') => {
    setActiveSubSection(tab);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('top-10-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('top-10-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRegistry = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('global-registry-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('global-registry-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Navbar = () => {
    const curT = t[lang];
    return (
      <>
        {/* Desktop Navbar - Hidden on Mobile */}
        <nav className="hidden sm:block fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[1200px] bg-slate-200/40 dark:bg-background-dark/30 backdrop-blur-xl border border-white/10 h-16 rounded-full transition-all duration-300">
          <div className="px-8 h-full flex items-center justify-between">
            
            {/* Settings (Left in RTL, visually right side of container) */}
            <div 
              className="flex items-center gap-3 cursor-pointer group py-2 px-4 bg-white/5 border border-white/5 rounded-full hover:border-primary/50 transition-all" 
              onClick={() => setCurrentPage('settings')}
            >
              <div className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center bg-primary/5">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              </div>
              <span className="font-bold text-sm text-primary font-display">{curT.settings}</span>
            </div>

            {/* Links (Hidden on small desktops, only for larger screens) */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => setCurrentPage('home')} className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentPage === 'home' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>{curT.home}</button>
              <button onClick={() => setCurrentPage('theory-list')} className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentPage === 'theory-list' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>{curT.theoryNav}</button>
              <button onClick={() => setCurrentPage('practical-list')} className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentPage === 'practical-list' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>{curT.practicalNav}</button>
              <button onClick={() => setCurrentPage('quiz-list')} className={`text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentPage === 'quiz-list' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>{curT.quizNav}</button>
            </div>

            {/* Icons (Right in RTL, visually left side of container) */}
            <div className="flex items-center gap-4">
              <button 
                onClick={scrollToRegistry}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:border-primary/50 transition-all text-gray-400 hover:text-primary bg-white/5"
              >
                <span className="material-symbols-outlined text-xl">view_list</span>
              </button>

              <button 
                onClick={scrollToContact}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:border-primary/50 transition-all text-gray-400 hover:text-primary bg-white/5"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </button>

              <div className="h-6 w-px bg-white/10"></div>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 hover:border-primary/50 transition-all text-gray-400 hover:text-primary bg-white/5 group"
              >
                <span className="material-symbols-outlined group-active:scale-90 transition-transform">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Three-Dots Menu Button */}
        <div className="sm:hidden fixed top-6 right-6 z-[200]">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-primary shadow-glow transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'more_vert'}
            </span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-[190] bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <div 
              className="absolute top-20 right-6 w-64 bg-background-dark/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col divide-y divide-white/5 py-2">
                {[
                  { id: 'theme', label: curT.mobileMenu.theme, icon: "palette", action: () => setIsDarkMode(!isDarkMode) },
                  { id: 'home', label: curT.mobileMenu.home, icon: "home", action: () => { setCurrentPage('home'); setMobileMenuOpen(false); } },
                  { id: 'theory', label: curT.mobileMenu.theory, icon: "auto_stories", action: () => { setCurrentPage('theory-list'); setMobileMenuOpen(false); } },
                  { id: 'practical', label: curT.mobileMenu.practical, icon: "terminal", action: () => { setCurrentPage('practical-list'); setMobileMenuOpen(false); } },
                  { id: 'quiz', label: curT.mobileMenu.quiz, icon: "quiz", action: () => { setCurrentPage('quiz-list'); setMobileMenuOpen(false); } },
                  { id: 'reports', label: curT.mobileMenu.reports, icon: "description", action: () => { scrollToRegistry(); setMobileMenuOpen(false); } },
                  { id: 'contact', label: curT.mobileMenu.contact, icon: "contact_mail", action: () => { scrollToContact(); setMobileMenuOpen(false); } },
                  { id: 'settings', label: curT.mobileMenu.settings, icon: "settings", action: () => { setCurrentPage('settings'); setMobileMenuOpen(false); } }
                ].map((item) => (
                  <button 
                    key={item.id}
                    className="p-5 text-right hover:bg-primary/10 text-white text-base font-black transition-all flex items-center justify-between group"
                    onClick={item.action}
                  >
                    <span className="group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">{item.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const curT = t[lang as AppLanguage];

  return (
    <ResponsiveLayout>
      <div className={`App min-h-screen bg-slate-300 dark:bg-background-dark text-slate-900 dark:text-white font-sans selection:bg-primary selection:text-black ${lang === 'ar' ? 'text-right' : 'text-left'} overflow-x-hidden transition-colors duration-500`}>
        
        <CyberBugsBackground isDarkMode={isDarkMode} />
        <Navbar />

        {currentPage === 'home' && (
          <div className="flex flex-col min-h-screen relative">
            
            <header 
              onMouseMove={handleMouseMove} 
              className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-[#020202] transition-colors duration-500"
            >
              <div className="absolute inset-0 pointer-events-none z-10 p-10 opacity-30">
                 <div className={`absolute top-20 ${lang === 'ar' ? 'right-10' : 'left-10'} font-mono text-[10px] text-slate-500 dark:text-primary space-y-1`}>
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-sm"></span> SCANNING_LIVE_NODES...</div>
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-sm"></span> UPTIME: 99.998%</div>
                 </div>
                 <div className={`absolute bottom-10 ${lang === 'ar' ? 'left-10' : 'right-10'} font-mono text-[10px] text-slate-400 dark:text-gray-500 space-y-1`}>
                    <div>HEX_DUMP: 0x42 0x55 0x47 0x53</div>
                    <div className="text-primary/60">SESSION_ENCRYPTED_AES256</div>
                 </div>
              </div>

              <div className="relative z-20 max-w-[1400px] mx-auto px-4 w-full flex flex-col items-center">
                
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 dark:opacity-100"
                  style={{ transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), calc(-50% + ${mousePos.y * 0.5}px))` }}
                >
                   <div className="relative w-[600px] h-[600px] lg:w-[900px] lg:h-[900px]">
                      <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-[15%] border border-primary/10 rounded-full animate-spin-slow"></div>
                      <div className="absolute inset-[30%] border border-primary/5 rounded-full animate-reverse-spin"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                   </div>
                </div>

                <div className="relative flex flex-col items-center text-center space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-slate-400 dark:border-primary/30 bg-slate-100/50 dark:bg-primary/5 backdrop-blur-sm shadow-md">
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 dark:text-primary">Sys_Auth: Active</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-[0.2em] uppercase font-pixel text-slate-900 dark:text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      TOP 10
                    </h1>
                  </div>

                  <p className="text-slate-700 dark:text-gray-400 text-lg lg:text-2xl leading-relaxed max-w-2xl font-bold whitespace-pre-wrap">
                    {curT.heroSub}
                  </p>
                  
                  <div className="flex justify-center pt-8">
                    <button 
                      onClick={() => scrollToTop10('theory')} 
                      className="relative group overflow-hidden px-14 py-7 bg-slate-900 dark:bg-primary text-white dark:text-black font-black uppercase tracking-[0.2em] text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    >
                      <span className="relative z-10">{curT.heroBtn}</span>
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"></div>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <section id="top-10-section" className="py-40 bg-slate-300 dark:bg-black/40 relative border-t border-slate-400 dark:border-white/5 z-10 backdrop-blur-sm transition-colors duration-500">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
                  <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'} w-full flex flex-col items-center`}>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic flex items-center gap-6">
                      <span className="w-20 h-1 bg-slate-900 dark:bg-primary/40"></span>
                      {curT.top10Title}
                      <span className="w-20 h-1 bg-slate-900 dark:bg-primary/40"></span>
                    </h2>
                    <p className="text-slate-700 dark:text-gray-500 text-lg font-bold">{curT.top10Sub}</p>
                  </div>
                </div>
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 ${lang === 'ar' ? 'dir-ltr' : ''}`} dir="ltr">
                  {TOP_10_2023.map(vuln => (<VulnerabilityCard key={vuln.id} vulnerability={vuln} onClick={(v) => handleVulnClick(v, 'theory')}/>))}
                </div>
              </div>
            </section>

            <section id="global-registry-section" className="py-40 bg-[#050505] relative border-t border-white/5 z-10 transition-colors duration-500 overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-20">
                <div className={`mb-24 flex flex-col items-center text-center space-y-6 animate-in fade-in duration-1000`}>
                  <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic drop-shadow-glow flex flex-col items-center">
                    <span>{curT.newsTitle}</span>
                  </h2>
                  <p className="text-gray-400 text-xl lg:text-2xl font-bold max-w-3xl">
                    {curT.newsSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="ltr">
                  {OWASP_OFFICIAL_REGISTRY.map((item, idx) => (
                    <div 
                      key={item.id}
                      onClick={() => window.open(item.url, '_blank')}
                      className="group relative bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-10 cursor-pointer transition-all duration-500 hover:border-primary/50 flex flex-col min-h-[480px] text-left"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="px-4 py-1.5 rounded border border-red-500/40 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                          {item.severity}
                        </div>
                        <span className="text-7xl font-black font-mono text-white/5 group-hover:text-white/10 transition-colors leading-none">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>

                      <div className="space-y-6 flex-1">
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.3em]">REG_{item.id} |</span>
                           <div className="flex items-center gap-2 mt-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(255,0,0,0.8)]"></div>
                             <h3 className="text-xs font-mono text-gray-400 uppercase font-black tracking-widest">{item.name}</h3>
                           </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-2xl font-mono text-white tracking-tighter font-bold">
                            {item.title}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed border-r-2 border-primary/30 pr-4 text-right" dir="rtl">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 flex justify-between items-center mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">STATUS</span>
                          <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">{item.status}</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-all">
                          open_in_new
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact-section" className="py-40 bg-slate-200 dark:bg-black/60 relative border-t border-slate-400 dark:border-white/5 z-10 transition-colors duration-500 overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03),transparent_70%)] pointer-events-none"></div>
               
               <div className="max-w-[900px] mx-auto px-6 relative z-20">
                  <div className="text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                     <h2 className="text-6xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter drop-shadow-glow">{curT.contactTitle}</h2>
                  </div>

                  <div className="bg-slate-300/50 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl border-2 border-slate-400 dark:border-white/10 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group/contact-container">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                     
                     <div className="flex justify-center mb-16">
                        <div className="relative inline-block">
                           <h3 className="text-2xl font-black text-slate-900 dark:text-white italic text-center">{curT.contactSub}</h3>
                           <DigitalBug className="-top-10 -left-12 animate-bug-roam-1" />
                           <DigitalBug className="-bottom-8 -right-14 animate-bug-roam-2" />
                           <DigitalBug className="top-2 -right-24 animate-bug-roam-3" />
                        </div>
                     </div>

                     <div className="space-y-6">
                        <a 
                          href="https://www.linkedin.com/in/khalid-hamdi-3974a1368" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/link block bg-slate-200 dark:bg-white/[0.03] border border-slate-400 dark:border-white/5 rounded-3xl p-8 transition-all hover:bg-slate-100 dark:hover:bg-primary/10 hover:border-primary/40 hover:-translate-y-1 shadow-sm hover:shadow-glow"
                        >
                           <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <div className={`flex items-center gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                                 <div className="w-14 h-14 bg-slate-400/20 dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-transparent group-hover/link:border-blue-400/30 transition-all">
                                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                  </div>
                                 <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">LinkedIn</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">Khalid Hamdi</p>
                                 </div>
                              </div>
                              <span className={`material-symbols-outlined text-gray-500 group-hover/link:text-primary transition-all ${lang === 'ar' ? 'group-hover:translate-x-[-10px]' : 'group-hover:translate-x-[10px]'}`}>
                                {lang === 'ar' ? 'arrow_back' : 'arrow_forward'}
                              </span>
                           </div>
                        </a>

                        <a 
                          href="https://x.com/Kr1ptKhalid" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/link block bg-slate-200 dark:bg-white/[0.03] border border-slate-400 dark:border-white/5 rounded-3xl p-8 transition-all hover:bg-slate-100 dark:hover:bg-primary/10 hover:border-primary/40 hover:-translate-y-1 shadow-sm hover:shadow-glow"
                        >
                           <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <div className={`flex items-center gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                                 <div className="w-14 h-14 bg-slate-400/20 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white border border-transparent group-hover/link:border-primary/30 transition-all">
                                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                                    </svg>
                                 </div>
                                 <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">X Platform</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">Kr1ptKhalid@</p>
                                 </div>
                              </div>
                              <span className={`material-symbols-outlined text-gray-500 group-hover/link:text-primary transition-all ${lang === 'ar' ? 'group-hover:translate-x-[-10px]' : 'group-hover:translate-x-[10px]'}`}>
                                {lang === 'ar' ? 'arrow_back' : 'arrow_forward'}
                              </span>
                           </div>
                        </a>
                     </div>
                  </div>
               </div>
            </section>

            <footer className="bg-[#050a10] border-t border-white/5 py-20 px-6 relative z-30">
              <div className={`max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 ${lang === 'ar' ? 'text-right' : 'text-left'} items-center`}>
                <div>
                   <p className={`text-gray-400 text-base leading-relaxed max-w-sm font-medium ${lang === 'ar' ? 'ml-auto' : 'mr-auto'}`}>
                     {curT.footerDesc}
                   </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                   <h3 className="text-white font-black text-xl italic uppercase tracking-widest">{lang === 'ar' ? 'تواصل معنا' : 'Connect'}</h3>
                   <div className="flex flex-col gap-4 items-center">
                     <a 
                      href="https://www.linkedin.com/in/khalid-hamdi-3974a1368" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group/soc"
                     >
                       <span className="text-base font-bold">Khalid Hamdi</span>
                       <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                     </a>
                     <a 
                      href="https://x.com/Kr1ptKhalid" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group/soc"
                     >
                       <span className="text-base font-bold">Khalid Hamdi</span>
                       <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
                     </a>
                   </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/5 text-center">
                <p className="text-gray-600 text-sm font-black uppercase tracking-[0.4em]">{curT.footerRights}</p>
              </div>
            </footer>
          </div>
        )}

        {currentPage === 'theory-list' && (
          <div className="pt-24 min-h-screen bg-slate-300 dark:bg-background-dark">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-20">
              <h2 className="text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-16 text-center">{curT.theoryListTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10" dir="ltr">
                {TOP_10_2023.map((vuln, i) => (
                  <div key={vuln.id} onClick={() => handleVulnClick(vuln, 'theory')} className="group relative bg-white/10 dark:bg-white/[0.03] backdrop-blur-md border border-slate-400 dark:border-white/10 rounded-[2rem] p-10 cursor-pointer transition-all hover:border-primary hover:-translate-y-2 hover:shadow-glow overflow-hidden h-[420px] flex flex-col justify-between">
                    <div className={`absolute top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} flex flex-col items-start opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`}>
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest leading-none mb-1">{curT.entry}</span>
                      <span className="text-4xl font-black font-mono text-white leading-none">{(i + 1).toString().padStart(2, '0')}</span>
                    </div>
                    <div className={`relative z-10 flex flex-col h-full justify-between items-end ${lang === 'ar' ? 'text-right' : 'text-left items-start'}`}>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <span className="material-symbols-outlined text-3xl">{vuln.icon}</span>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase leading-tight font-chakra">{lang === 'ar' ? vuln.name : vuln.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400 font-bold">{lang === 'ar' ? vuln.arabicName : vuln.name}</p>
                      </div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest mt-4">{curT.readAnalysis} →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'practical-list' && (
          <div className="pt-24 min-h-screen bg-slate-300 dark:bg-background-dark">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-20">
              <h2 className="text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-16 text-center">{curT.practicalListTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10" dir="ltr">
                {TOP_10_2023.map((vuln, i) => (
                  <div key={vuln.id} onClick={() => handleVulnClick(vuln, 'lab')} className="group relative bg-slate-900 dark:bg-black border-2 border-white/5 rounded-[1.5rem] p-14 cursor-pointer transition-all hover:scale-105 hover:border-emerald-500/50 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between items-center text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all text-gray-500">
                        <span className="material-symbols-outlined text-4xl">terminal</span>
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="text-[10px] font-mono text-emerald-500 font-black uppercase tracking-[0.4em]">Lab_0{i + 1}</div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter font-chakra leading-tight">{vuln.name}</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase">{lang === 'ar' ? vuln.arabicName : vuln.name}</p>
                      </div>
                      <div className="w-full mt-8 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-black transition-all">{curT.launchContainer} →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'quiz-list' && (
          <div className="pt-24 min-h-screen bg-slate-300 dark:bg-background-dark">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 py-20">
              <h2 className="text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-16 text-center">{curT.quizListTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10" dir="ltr">
                {TOP_10_2023.map((vuln, i) => (
                  <div key={vuln.id} onClick={() => handleVulnClick(vuln, 'quiz')} className="group relative bg-white dark:bg-white/[0.03] border-4 border-slate-400 dark:border-white/5 rounded-[3rem] p-14 cursor-pointer transition-all hover:border-yellow-500/60 shadow-xl min-h-[480px] flex flex-col justify-between overflow-hidden">
                    <div className={`absolute top-4 ${lang === 'ar' ? 'right-6' : 'left-6'} text-6xl font-black text-slate-200 dark:text-white/5 font-mono italic select-none`}>#{i + 1}</div>
                    <div className={`relative z-10 flex flex-col h-full justify-between items-start ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">deployed_code</span>
                      </div>
                      <div className="mt-6 space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-none font-chakra">{vuln.name}</h3>
                        <p className="text-lg text-yellow-500 font-black uppercase tracking-widest">{lang === 'ar' ? vuln.arabicName : vuln.name}</p>
                      </div>
                      <div className="w-full mt-6 flex justify-between items-center pt-6 border-t border-slate-300 dark:border-white/5">
                         <div className="flex gap-1">
                            {[1,2,3].map(star => <span key={star} className="material-symbols-outlined text-yellow-500 text-xs fill-1">star</span>)}
                         </div>
                         <span className="text-[14px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">{curT.startQuiz} →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'vulnerability-detail' && selectedVuln && (
          <div className="flex flex-col min-h-screen bg-slate-400/40 dark:bg-black relative z-10 pt-16 backdrop-blur-md transition-colors duration-500">
            <div className="max-w-[1400px] mx-auto w-full px-4 py-24">
              <button onClick={() => setCurrentPage('home')} className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-gray-400 hover:text-primary transition-colors mb-10 group ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`material-symbols-outlined text-sm transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {lang === 'ar' ? 'arrow_forward' : 'arrow_back'}
                </span>
                <span>{curT.backToHome}</span>
              </button>
              <div className="bg-slate-200 dark:bg-[#0a0a0a] rounded-[2.5rem] border border-slate-400/50 dark:border-white/5 overflow-hidden shadow-2xl">
                
                <div className={`p-10 border-b border-slate-400/30 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-300 dark:bg-[#0a0a0a] transition-colors duration-500 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-8 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-900/5 dark:bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm dark:shadow-glow overflow-hidden flex-shrink-0">
                      <span className="material-symbols-outlined text-5xl">{selectedVuln.icon}</span>
                    </div>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-tight">{selectedVuln.name}</h2>
                      <p className="text-xl font-bold text-slate-600 dark:text-gray-400 mt-1">{lang === 'ar' ? selectedVuln.arabicName : selectedVuln.name}</p>
                      <p className="text-slate-600/60 dark:text-primary/70 font-mono text-[11px] uppercase tracking-[0.2em] mt-3 font-black">ID_STATUS: RECON_LEVEL_4</p>
                    </div>
                  </div>

                  <div className="flex p-1.5 bg-slate-900 dark:bg-black rounded-[1.5rem] border border-slate-950 dark:border-white/10 shadow-lg">
                    {(['theory', 'lab', 'quiz'] as VulnerabilitySubSection[]).map((tab) => (
                      <button key={tab} onClick={() => setActiveSubSection(tab)} className={`px-10 py-4 rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeSubSection === tab ? 'bg-primary text-black' : 'text-slate-400 dark:text-gray-500 hover:text-white'}`}>
                        {tab === 'theory' && curT.theoryTab}
                        {tab === 'lab' && curT.labTab}
                        {tab === 'quiz' && curT.quizTab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-10 lg:p-16 text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0a0a0a] transition-colors duration-500 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {activeSubSection === 'theory' && <VulnerabilityTheory vulnerability={selectedVuln} lang={lang} />}
                  {activeSubSection === 'lab' && <VulnerabilityLab vulnerability={selectedVuln} lang={lang} />}
                  {activeSubSection === 'quiz' && <VulnerabilityQuiz vulnerability={selectedVuln} lang={lang} />}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'settings' && (
          <SettingsPage 
            user={user}
            setUser={setUser}
            primaryColor={primaryColor}
            setPrimaryColor={setPrimaryColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            privacySettings={privacySettings}
            setPrivacySettings={setPrivacySettings}
            setCurrentPage={setCurrentPage}
            logoutText={curT.logout}
            lang={lang}
            setLang={setLang}
          />
        )}

        {(currentPage === 'labs' || currentPage === 'quiz') && (
          <div className="flex flex-col min-h-screen bg-slate-400/20 dark:bg-black/60 pt-16 relative z-10 backdrop-blur-md transition-colors duration-500">
            <div className="max-w-[1400px] mx-auto w-full px-4 py-40 text-center space-y-12">
               <div className="w-40 h-40 bg-slate-900 dark:bg-primary/10 rounded-[4rem] border-4 border-primary/40 flex items-center justify-center mx-auto shadow-2xl dark:shadow-glow">
                  <span className="material-symbols-outlined text-primary text-7xl">{currentPage === 'labs' ? 'terminal' : 'quiz'}</span>
               </div>
               <div className="space-y-6">
                  <h2 className="text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">{currentPage === 'labs' ? curT.practicalNav : curT.quizNav}</h2>
                  <p className="text-slate-700 dark:text-gray-500 text-xl max-w-xl mx-auto leading-relaxed font-bold">{curT.labClosedNote}</p>
               </div>
               <button onClick={() => setCurrentPage('home')} className="px-14 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-3xl hover:bg-primary hover:text-black transition-all shadow-2xl dark:shadow-glow">{curT.closeBtn}</button>
            </div>
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
};

export default App;
