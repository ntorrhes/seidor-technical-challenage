import { useEffect, useState } from 'react';
import { EmployeeProvider } from './EmployeeContext';
import { AppShell, type Page } from './components/AppShell';
import { LoginPage, type User } from './components/LoginPage';
import { type Payroll } from './components/PayrollModal';
import { SupportModal } from './components/SupportModal';
import { EmployeesPage } from './pages/EmployeesPage';
import { OverviewPage } from './pages/OverviewPage';
import { PayrollPage } from './pages/PayrollPage';
import { useEmployees } from './EmployeeContext';

const USER_KEY = 'folha-clara-session-v1';
const PAYROLL_KEY = 'folha-clara-payrolls-v1';
const WORKSPACES = ['Núcleo Criativo', 'Estúdio Aurora'];

function WorkspaceApp() {
  const { employees } = useEmployees();
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null') as User | null; }
    catch { return null; }
  });
  const [page, setPage] = useState<Page>('overview');
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);
  const [showSupport, setShowSupport] = useState(false);
  const [payrolls, setPayrolls] = useState<Payroll[]>(() => {
    try { return JSON.parse(localStorage.getItem(PAYROLL_KEY) || '[]') as Payroll[]; }
    catch { return []; }
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => localStorage.setItem(PAYROLL_KEY, JSON.stringify(payrolls)), [payrolls]);

  function createPayroll(data: Omit<Payroll, 'id' | 'createdAt'>) {
    setPayrolls((current) => [{ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...current]);
  }

  if (!user) return <LoginPage onLogin={setUser} />;

  return <AppShell user={user} page={page} employeeCount={employees.length} workspaces={WORKSPACES} activeWorkspace={activeWorkspace} onPageChange={setPage} onWorkspaceChange={setActiveWorkspace} onSupport={() => setShowSupport(true)} onLogout={() => setUser(null)}>
    {page === 'overview' && <OverviewPage payrolls={payrolls} onPageChange={setPage} />}
    {page === 'employees' && <EmployeesPage />}
    {page === 'payroll' && <PayrollPage payrolls={payrolls} onCreate={createPayroll} onDelete={(id) => setPayrolls((current) => current.filter((payroll) => payroll.id !== id))} />}
    <footer className="page-foot"><span>© 2026 Folha Clara</span><span><button onClick={() => setShowSupport(true)}>Ajuda e suporte</button></span></footer>
    {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
  </AppShell>;
}

export default function App() {
  return <EmployeeProvider><WorkspaceApp /></EmployeeProvider>;
}
