import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { EmployeeModal } from '../components/EmployeeModal';
import { LoginPage } from '../components/LoginPage';
import { EmployeeProvider } from '../EmployeeContext';
import { EmployeesPage } from '../pages/EmployeesPage';
import { calculateTaxBase, calculateWithholding } from '../types';

describe('IRRF rules', () => {
  it('returns zero IRRF for exempt salary', () => {
    const employee = {
      name: 'Maria',
      cpf: '123.456.789-09',
      grossSalary: 2259.2,
      socialSecurity: 0,
      dependents: 0
    };

    expect(calculateTaxBase(employee)).toBeCloseTo(2259.2);
    expect(calculateWithholding(employee)).toBe(0);
  });

  it('calculates the IRRF for a taxable salary', () => {
    const employee = {
      name: 'João',
      cpf: '987.654.321-00',
      grossSalary: 5000,
      socialSecurity: 500,
      dependents: 0
    };

    expect(calculateTaxBase(employee)).toBe(4500);
    expect(calculateWithholding(employee)).toBeCloseTo(349.73, 2);
  });
});

describe('LoginPage', () => {
  it('shows validation message for invalid login', async () => {
    const user = userEvent.setup();

    render(<LoginPage onLogin={() => undefined} />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await user.clear(emailInput);
    await user.type(emailInput, 'teste@email.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, '123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(screen.getByText(/confira seu e-mail e senha/i)).toBeInTheDocument();
  });
});

describe('EmployeeModal', () => {
  it('submits employee data with masked CPF and numeric values', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(<EmployeeModal onClose={() => undefined} onSave={handleSave} />);

    await user.type(
      screen.getByPlaceholderText(/ex\.: maria da silva/i),
      'Maria da Silva'
    );
    await user.type(
      screen.getByPlaceholderText(/000\.000\.000-00/i),
      '12345678909'
    );
    const dependentsInput = screen.getByDisplayValue('0');
    await user.clear(dependentsInput);
    await user.type(dependentsInput, '2');

    const [salaryInput, socialInput] = screen.getAllByPlaceholderText('0,00');
    await user.clear(salaryInput);
    await user.type(salaryInput, '5000');
    await user.clear(socialInput);
    await user.type(socialInput, '500');
    await user.click(
      screen.getByRole('button', { name: /cadastrar funcionário/i })
    );

    expect(handleSave).toHaveBeenCalledWith({
      name: 'Maria da Silva',
      cpf: '123.456.789-09',
      grossSalary: 5000,
      socialSecurity: 500,
      dependents: 2
    });
  });
});

describe('App', () => {
  it('logs in and shows the main workspace view', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.clear(screen.getByLabelText(/e-mail/i));
    await user.type(
      screen.getByLabelText(/e-mail/i),
      'mariana@folhaclara.com.br'
    );
    await user.clear(screen.getByLabelText(/senha/i));
    await user.type(screen.getByLabelText(/senha/i), 'folhaclara');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(screen.getByText(/olá, mariana/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resumo/i })).toBeInTheDocument();
  });
});

describe('Employee listing', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem(
      'folha-clara-employees-v1',
      JSON.stringify([
        {
          id: '1',
          name: 'Maria Souza',
          cpf: '123.456.789-00',
          grossSalary: 5000,
          socialSecurity: 500,
          dependents: 0
        },
        {
          id: '2',
          name: 'João Silva',
          cpf: '987.654.321-11',
          grossSalary: 3000,
          socialSecurity: 300,
          dependents: 1
        }
      ])
    );
  });

  it('filters employees by name and cpf', async () => {
    const user = userEvent.setup();

    render(
      <EmployeeProvider>
        <EmployeesPage />
      </EmployeeProvider>
    );

    const input = screen.getByPlaceholderText(/buscar por nome ou cpf/i);
    await user.type(input, '123');

    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
  });
});
