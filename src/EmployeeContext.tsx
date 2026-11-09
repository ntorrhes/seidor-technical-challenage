import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { demoEmployees, type Employee, type EmployeeForm } from './types';

type EmployeeContextValue = {
  employees: Employee[];
  addEmployee: (employee: EmployeeForm) => void;
  updateEmployee: (id: string, employee: EmployeeForm) => void;
  deleteEmployee: (id: string) => void;
};

const EmployeeContext = createContext<EmployeeContextValue | null>(null);
const STORAGE_KEY = 'folha-clara-employees-v1';

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as Employee[] : demoEmployees;
    } catch { return demoEmployees; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(employees)); }, [employees]);

  const value = useMemo<EmployeeContextValue>(() => ({
    employees,
    addEmployee: (employee) => setEmployees((current) => [{ ...employee, id: crypto.randomUUID() }, ...current]),
    updateEmployee: (id, employee) => setEmployees((current) => current.map((item) => item.id === id ? { ...employee, id } : item)),
    deleteEmployee: (id) => setEmployees((current) => current.filter((item) => item.id !== id)),
  }), [employees]);

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployees precisa estar dentro de EmployeeProvider');
  return context;
}
