import { useState, type FormEvent } from 'react';
import { CircleHelp, X } from 'lucide-react';
import { parseCurrency, formatCurrencyInput } from '../lib/money';
import type { Employee, EmployeeForm } from '../types';

const cpfMask = (value: string) => value.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export function EmployeeModal({ employee, onClose, onSave }: { employee?: Employee; onClose: () => void; onSave: (data: EmployeeForm) => void }) {
  const [name, setName] = useState(employee?.name ?? '');
  const [cpf, setCpf] = useState(employee?.cpf ?? '');
  const [grossSalary, setGrossSalary] = useState(employee ? formatCurrencyInput(employee.grossSalary) : '');
  const [socialSecurity, setSocialSecurity] = useState(employee ? formatCurrencyInput(employee.socialSecurity) : '');
  const [dependents, setDependents] = useState(employee?.dependents.toString() ?? '0');
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    const salary = parseCurrency(grossSalary);
    const social = parseCurrency(socialSecurity);
    const count = Number(dependents);
    if (!name.trim()) return setError('Informe o nome completo.');
    if (cpf.replace(/\D/g, '').length !== 11) return setError('Informe um CPF com 11 dígitos.');
    if (!Number.isFinite(salary) || salary <= 0 || !Number.isFinite(social) || social < 0 || social > salary) return setError('Confira o salário e o desconto da previdência.');
    if (!Number.isInteger(count) || count < 0 || count > 50) return setError('Informe de 0 a 50 dependentes.');
    onSave({ name: name.trim(), cpf: cpfMask(cpf), grossSalary: salary, socialSecurity: social, dependents: count });
    onClose();
  }

  function handleCurrencyBlur(value: string, setValue: (next: string) => void) {
    if (value.trim() && Number.isFinite(parseCurrency(value))) setValue(formatCurrencyInput(parseCurrency(value)));
  }

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="employee-title">
    <div className="modal-head"><div><span className="eyebrow">DADOS DO COLABORADOR</span><h2 id="employee-title">{employee ? 'Editar funcionário' : 'Novo funcionário'}</h2><p>Preencha os dados para calcular o IRRF.</p></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={19} /></button></div>
    <form onSubmit={submit} className="employee-form">
      <label className="field full"><span>Nome completo</span><input autoFocus placeholder="Ex.: Maria da Silva" value={name} onChange={(event) => setName(event.target.value)} /></label>
      <label className="field"><span>CPF</span><input placeholder="000.000.000-00" inputMode="numeric" value={cpf} onChange={(event) => setCpf(cpfMask(event.target.value))} /></label>
      <label className="field"><span>Número de dependentes</span><input type="number" min="0" max="50" value={dependents} onChange={(event) => setDependents(event.target.value)} /></label>
      <label className="field"><span>Salário bruto</span><div className="input-prefix"><b>R$</b><input inputMode="decimal" placeholder="0,00" value={grossSalary} onChange={(event) => setGrossSalary(event.target.value)} onBlur={(event) => handleCurrencyBlur(event.target.value, setGrossSalary)} /></div></label>
      <label className="field"><span>Desconto da previdência</span><div className="input-prefix"><b>R$</b><input inputMode="decimal" placeholder="0,00" value={socialSecurity} onChange={(event) => setSocialSecurity(event.target.value)} onBlur={(event) => handleCurrencyBlur(event.target.value, setSocialSecurity)} /></div></label>
      <div className="form-note"><CircleHelp size={15} /> Dedução de R$ 189,59 por dependente aplicada automaticamente.</div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancelar</button><button type="submit" className="button button-primary">{employee ? 'Salvar alterações' : 'Cadastrar funcionário'}</button></div>
    </form>
  </section></div>;
}
