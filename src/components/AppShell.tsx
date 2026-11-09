import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Users
} from 'lucide-react';
import type { User } from './LoginPage';

export type Page = 'overview' | 'employees' | 'payroll';

export function AppShell({
  user,
  page,
  employeeCount,
  workspaces,
  activeWorkspace,
  onPageChange,
  onWorkspaceChange,
  onSupport,
  onLogout,
  children
}: {
  user: User;
  page: Page;
  employeeCount: number;
  workspaces: string[];
  activeWorkspace: string;
  onPageChange: (page: Page) => void;
  onWorkspaceChange: (name: string) => void;
  onSupport: () => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const nav = [
    { id: 'overview' as const, label: 'Resumo', icon: LayoutDashboard },
    { id: 'employees' as const, label: 'Equipe', icon: Users },
    { id: 'payroll' as const, label: 'Folha', icon: BriefcaseBusiness }
  ];
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const currentLabel = nav.find((item) => item.id === page)?.label ?? 'Resumo';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-name">
            folha<span>clara</span>
          </span>
        </a>

        <div className="workspace-pill">
          <span className="workspace-icon">{activeWorkspace[0]}</span>
          <div>
            <strong>{activeWorkspace}</strong>
            <small>Equipe ativa</small>
          </div>
        </div>

        <nav className="side-nav">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${page === id ? 'active' : ''}`}
              onClick={() => onPageChange(id)}
            >
              <Icon size={18} />
              {label}
              {id === 'employees' && <span>{employeeCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">
              <CircleHelp size={17} />
            </span>
            <b>Precisa de ajuda?</b>
            <p>Fale com o time de suporte quando quiser.</p>
            <button className="support-link" onClick={onSupport}>
              Falar com suporte <span>↗</span>
            </button>
          </div>

          <div className="profile-wrap">
            <div className="profile">
              <div className="avatar">{initials}</div>
              <span>
                <b>{user.name}</b>
                <small>Administrador</small>
              </span>
              <button
                className="profile-menu"
                aria-label="Opções do perfil"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                ···
              </button>
            </div>
            {profileOpen && (
              <div className="profile-menu-pop">
                <div>
                  <b>{user.name}</b>
                  <small>{user.email}</small>
                </div>
                <button onClick={onLogout}>
                  <LogOut size={15} /> Sair da conta
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Olá, {user.name.split(' ')[0]}</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{currentLabel}</strong>
          </div>
          <div className="top-actions">
            <span className="today">Hoje</span>
            <button
              className="avatar tiny"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Abrir perfis da conta"
            >
              {initials}
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
