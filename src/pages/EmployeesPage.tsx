import { useMemo, useState } from 'react';
import { FileDown, Plus, Search, SlidersHorizontal, Pencil, Trash2 } from 'lucide-react';
import { EmployeeModal } from '../components/EmployeeModal';
import { useEmployees } from '../EmployeeContext';
import { brl } from '../lib/money';
import { calculateTaxBase, calculateWithholding, type Employee } from '../types';

export function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [query, setQuery] = useState('');
  const [modalEmployee, setModalEmployee] = useState<Employee | null | undefined>();
  const filtered = useMemo(() => employees.filter((employee) => `${employee.name} ${employee.cpf}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))), [employees, query]);

  function save(data: Parameters<typeof addEmployee>[0]) {
    if (modalEmployee) updateEmployee(modalEmployee.id, data);
    else addEmployee(data);
  }

  function exportCsv() {
    const rows = [['Nome', 'CPF', 'Salário bruto', 'Desconto previdência', 'Dependentes', 'Base IR', 'Desconto IRRF'], ...filtered.map((employee) => [employee.name, employee.cpf, employee.grossSalary.toFixed(2), employee.socialSecurity.toFixed(2), String(employee.dependents), calculateTaxBase(employee).toFixed(2), calculateWithholding(employee).toFixed(2)])];
    const csv = '\uFEFF' + rows.map((row) => row.map((cell) => `"${cell.split('"').join('""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'funcionarios-irrf.csv'; link.click(); URL.revokeObjectURL(url);
  }

  return <div className="page-wrap"><section className="page-heading"><div><div className="eyebrow">GESTÃO DE PESSOAS</div><h1>Funcionários</h1><p>Cadastre a equipe e acompanhe os descontos de IRRF.</p></div><button className="button button-primary add-button" onClick={() => setModalEmployee(null)}><Plus size={17} /> Novo funcionário</button></section>
    <section className="table-card" id="funcionarios"><div className="table-heading"><div><h2>Equipe cadastrada <span>{employees.length}</span></h2><p>Dados salariais e descontos calculados por funcionário.</p></div><button className="button button-outline export-button" onClick={exportCsv}><FileDown size={16} /> Exportar</button></div>
      <div className="table-toolbar"><label className="search-box"><Search size={17} /><input placeholder="Buscar por nome ou CPF..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label><button className="button button-outline filter-button" onClick={() => document.querySelector<HTMLInputElement>('.search-box input')?.focus()}><SlidersHorizontal size={16} /> Buscar</button></div>
      <div className="table-scroll"><table><thead><tr><th>FUNCIONÁRIO</th><th>CPF</th><th>SALÁRIO BRUTO</th><th>DESC. PREVIDÊNCIA</th><th>DEPENDENTES</th><th>BASE DE CÁLCULO</th><th>DESCONTO IRRF</th><th /></tr></thead><tbody>{filtered.map((employee) => { const tax = calculateWithholding(employee); return <tr key={employee.id}><td><div className="person-cell"><div className={`person-avatar person-${employee.id.charCodeAt(0) % 5}`}>{employee.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</div><div><b>{employee.name}</b><small>Funcionário</small></div></div></td><td className="muted-cell">{employee.cpf}</td><td>{brl.format(employee.grossSalary)}</td><td className="muted-cell">{brl.format(employee.socialSecurity)}</td><td><span className="dependent-pill">{employee.dependents}</span></td><td><div className="base-value">{brl.format(calculateTaxBase(employee))}</div><small className="table-sub">Base IR</small></td><td><span className={`tax-value ${tax === 0 ? 'tax-free' : ''}`}>{brl.format(tax)}</span><small className="table-sub">{tax === 0 ? 'Isento' : 'Mensal'}</small></td><td><div className="row-actions"><button className="icon-button" aria-label={`Editar ${employee.name}`} onClick={() => setModalEmployee(employee)}><Pencil size={15} /></button><button className="icon-button delete-action" aria-label={`Excluir ${employee.name}`} onClick={() => { if (window.confirm(`Excluir ${employee.name} da equipe?`)) deleteEmployee(employee.id); }}><Trash2 size={15} /></button></div></td></tr>; })}</tbody></table>
        {filtered.length === 0 && <div className="empty-state"><b>Nenhum funcionário encontrado</b><p>{employees.length ? 'Tente outro nome ou CPF.' : 'Cadastre o primeiro funcionário.'}</p></div>}
      </div><div className="table-footer"><span>Exibindo <b>{filtered.length}</b> de <b>{employees.length}</b> funcionários</span><span>{query && `${filtered.length} resultado(s)`}</span></div>
    </section>{modalEmployee !== undefined && <EmployeeModal employee={modalEmployee ?? undefined} onSave={save} onClose={() => setModalEmployee(undefined)} />}</div>;
}
