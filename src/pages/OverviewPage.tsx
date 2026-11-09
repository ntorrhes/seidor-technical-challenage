import { BadgeDollarSign, BriefcaseBusiness, Users } from 'lucide-react';
import { brl } from '../lib/money';
import { useEmployees } from '../EmployeeContext';
import { calculateWithholding } from '../types';
import type { Payroll } from '../components/PayrollModal';
import type { Page } from '../components/AppShell';

const monthLabel = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${value}-01T00:00:00Z`));

export function OverviewPage({
  payrolls,
  onPageChange
}: {
  payrolls: Payroll[];
  onPageChange: (page: Page) => void;
}) {
  const { employees } = useEmployees();
  const totalTax = employees.reduce(
    (sum, employee) => sum + calculateWithholding(employee),
    0
  );
  const taxable = employees.filter(
    (employee) => calculateWithholding(employee) > 0
  ).length;

  return (
    <div className="page-wrap">
      <section className="page-heading">
        <div>
          <div className="eyebrow">RESUMO DA EQUIPE</div>
          <h1>Resumo</h1>
          <p>Uma visão clara do que está acontecendo hoje.</p>
        </div>
      </section>
      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-top">
            <span>Pessoas na equipe</span>
            <span className="summary-icon blue">
              <Users size={17} />
            </span>
          </div>
          <div className="summary-value">
            {employees.length}
            <small> cadastradas</small>
          </div>
          <div className="summary-foot">Equipe ativa</div>
        </article>
        <article className="summary-card">
          <div className="summary-top">
            <span>Com IRRF</span>
            <span className="summary-icon violet">
              <BadgeDollarSign size={17} />
            </span>
          </div>
          <div className="summary-value">
            {taxable}
            <small> de {employees.length}</small>
          </div>
          <div className="summary-foot">Na faixa tributável</div>
        </article>
        <article className="summary-card">
          <div className="summary-top">
            <span>IRRF estimado</span>
            <span className="summary-icon green">
              <span className="currency-symbol">R$</span>
            </span>
          </div>
          <div className="summary-value money">{brl.format(totalTax)}</div>
          <div className="summary-foot">Valor mensal aproximado</div>
        </article>
      </section>
      <section className="overview-grid">
        <article className="table-card quick-card">
          <div className="table-heading">
            <div>
              <h2>Comece por aqui</h2>
              <p>O que você precisa fazer hoje.</p>
            </div>
          </div>
          <button
            className="quick-link"
            onClick={() => onPageChange('employees')}
          >
            <span className="summary-icon blue">
              <Users size={17} />
            </span>
            <span>
              <b>Gerenciar equipe</b>
              <small>Adicionar ou ajustar cadastros</small>
            </span>
            <span className="quick-arrow">→</span>
          </button>
          <button
            className="quick-link"
            onClick={() => onPageChange('payroll')}
          >
            <span className="summary-icon green">
              <BriefcaseBusiness size={17} />
            </span>
            <span>
              <b>Folha de pagamento</b>
              <small>{payrolls.length} folha(s) registrada(s)</small>
            </span>
            <span className="quick-arrow">→</span>
          </button>
        </article>
        <article className="table-card recent-card">
          <div className="table-heading">
            <div>
              <h2>Últimas folhas</h2>
              <p>Períodos mais recentes.</p>
            </div>
            <button
              className="text-link"
              onClick={() => onPageChange('payroll')}
            >
              Ver todas
            </button>
          </div>
          {payrolls.length ? (
            <div className="recent-list">
              {payrolls.slice(0, 4).map((payroll) => (
                <div className="recent-row" key={payroll.id}>
                  <span className="recent-icon">
                    <BriefcaseBusiness size={16} />
                  </span>
                  <span>
                    <b>{monthLabel(payroll.month)}</b>
                    <small>{payroll.note || 'Folha mensal'}</small>
                  </span>
                  <span className="status-badge">Registrada</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state compact">
              <b>Nenhuma folha registrada</b>
              <p>Crie uma folha para acompanhar o período.</p>
              <button
                className="button button-primary"
                onClick={() => onPageChange('payroll')}
              >
                Acessar folhas
              </button>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
