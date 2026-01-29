import React from 'react';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, danger, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-right
        ${active ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-gray-400 hover:bg-[#252525] hover:text-white'}
        ${danger ? 'text-danger hover:bg-danger/10 border-none' : ''}
      `}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};

interface SettingsSidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  user: { name: string; email: string; avatar: string };
  onLogout: () => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ currentTab, setTab, user, onLogout }) => {
  const tabs = [
    { id: 'account', label: 'إعدادات الحساب', icon: 'manage_accounts' },
    { id: 'appearance', label: 'المظهر', icon: 'palette' },
    { id: 'notifications', label: 'الإشعارات', icon: 'notifications' },
    { id: 'privacy', label: 'الخصوصية', icon: 'lock' },
    { id: 'language', label: 'اللغة', icon: 'language' },
    { id: 'about', label: 'حول الموقع', icon: 'info' },
  ];

  return (
    <aside className="w-[280px] bg-surface-dark border-r border-border-dark flex flex-col shrink-0 h-full z-20 overflow-hidden">
      <div className="p-6 border-b border-border-dark flex flex-col items-center text-center">
        <div className="relative group cursor-pointer mb-4">
          <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center bg-black/20 overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-4xl">person</span>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white">edit</span>
          </div>
        </div>
        <h2 className="text-white font-bold text-lg min-h-[1.75rem]">{user.name || 'مستخدم'}</h2>
        {user.email && <p className="text-gray-400 text-sm mt-1">{user.email}</p>}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {tabs.map((tab) => (
          <SidebarItem 
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            active={currentTab === tab.id}
            onClick={() => setTab(tab.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <SidebarItem 
          icon="logout" 
          label="تسجيل الخروج" 
          danger 
          onClick={onLogout}
        />
      </div>
    </aside>
  );
};