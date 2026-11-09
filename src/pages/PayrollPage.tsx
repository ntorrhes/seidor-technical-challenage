import { useState } from 'react';
import { BriefcaseBusiness, Plus, Trash2 } from 'lucide-react';
import { PayrollModal, type Payroll } from '../components/PayrollModal';
import { useEmployees } from '../EmployeeContext';
import { brl } from '../lib/money';
import { calculateWithholding } from '../types';

const monthLabel = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${value}-01T00:00:00Z`));

export function PayrollPage({
  payrolls,
  onCreate,
  onDelete
}: {
  payrolls: Payroll[];
  onCreate: (payroll: Omit<Payroll, 'id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
}) {
  const { employees } = useEmployees();
  const [showModal, setShowModal] = useState(false);
  const totalTax = employees.reduce(
    (sum, employee) => sum + calculateWithholding(employee),
    0
  );

  return (
    <div className="page-wrap">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FOLHA</div>
          <h1>Folha de pagamento</h1>
          <p>Organize os períodos e acompanhe o que vai para o pagamento.</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} /> Nova folha
        </button>
      </section>
      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-top">
            <span>Folhas registradas</span>
            <span className="summary-icon blue">
              <BriefcaseBusiness size={17} />
            </span>
          </div>
          <div className="summary-value">
            {payrolls.length}
            <small> períodos</small>
          </div>
        </article>
        <article className="summary-card">
          <div className="summary-top">
            <span>Pessoas na folha</span>
            <span className="summary-icon violet">#</span>
          </div>
          <div className="summary-value">
            {employees.length}
            <small> ativas</small>
          </div>
        </article>
        <article className="summary-card">
          <div className="summary-top">
            <span>IRRF estimado</span>
            <span className="summary-icon green">
              <span className="currency-symbol">R$</span>
            </span>
          </div>
          <div className="summary-value money">{brl.format(totalTax)}</div>
        </article>
      </section>
      <section className="table-card">
        <div className="table-heading">
          <div>
            <h2>
              Períodos de pagamento <span>{payrolls.length}</span>
            </h2>
            <p>O resumo usa os dados atuais da equipe.</p>
          </div>
        </div>
        {payrolls.length ? (
          <div className="payroll-list">
            {payrolls.map((payroll) => (
              <article className="payroll-row" key={payroll.id}>
                <span className="payroll-icon">
                  <BriefcaseBusiness size={18} />
                </span>
                <div className="payroll-period">
                  <b>{monthLabel(payroll.month)}</b>
                  <small>
                    {payroll.note || 'Folha mensal'} · Criada em{' '}
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(payroll.createdAt)
                    )}
                  </small>
                </div>
                <div className="payroll-metric">
                  <small>Funcionários</small>
                  <b>{employees.length}</b>
                </div>
                <div className="payroll-metric">
                  <small>IRRF estimado</small>
                  <b>{brl.format(totalTax)}</b>
                </div>
                <span className="status-badge">Registrada</span>
                <button
                  className="icon-button delete-action"
                  aria-label={`Excluir folha de ${monthLabel(payroll.month)}`}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Excluir a folha de ${monthLabel(payroll.month)}?`
                      )
                    )
                      onDelete(payroll.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state payroll-empty">
            <div className="empty-icon">
              <BriefcaseBusiness size={22} />
            </div>
            <b>Ainda não há folhas</b>
            <p>Crie uma folha para organizar os períodos de pagamento.</p>
            <button
              className="button button-primary"
              onClick={() => setShowModal(true)}
            >
              <Plus size={15} /> Criar primeira folha
            </button>
          </div>
        )}
      </section>
      {showModal && (
        <PayrollModal onClose={() => setShowModal(false)} onSave={onCreate} />
      )}
    </div>
  );
}
