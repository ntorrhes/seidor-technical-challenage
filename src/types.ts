export type Employee = {
  id: string;
  name: string;
  cpf: string;
  grossSalary: number;
  socialSecurity: number;
  dependents: number;
};

export type EmployeeForm = Omit<Employee, 'id'>;

export const DEPENDENT_DEDUCTION = 189.59;

export function calculateTaxBase(employee: EmployeeForm): number {
  return Math.max(0, employee.grossSalary - employee.socialSecurity - DEPENDENT_DEDUCTION * employee.dependents);
}

export function calculateWithholding(employee: EmployeeForm): number {
  const base = calculateTaxBase(employee);
  const bracket = base <= 2259.2 ? [0, 0] : base <= 2826.65 ? [0.075, 169.44] : base <= 3751.05 ? [0.15, 381.44] : base <= 4664.68 ? [0.225, 662.77] : [0.275, 896];
  return Math.max(0, base * bracket[0] - bracket[1]);
}

export const demoEmployees: Employee[] = [
  { id: '1', name: 'Ana Clara Mendes', cpf: '321.654.987-00', grossSalary: 6850, socialSecurity: 751.99, dependents: 1 },
  { id: '2', name: 'Bruno Oliveira Costa', cpf: '087.321.654-90', grossSalary: 4200, socialSecurity: 462, dependents: 0 },
  { id: '3', name: 'Camila Ferreira Santos', cpf: '456.789.123-00', grossSalary: 3180, socialSecurity: 349.8, dependents: 2 },
  { id: '4', name: 'Diego Martins Rocha', cpf: '159.753.486-22', grossSalary: 2450, socialSecurity: 269.5, dependents: 0 },
  { id: '5', name: 'Elisa Rodrigues Lima', cpf: '963.852.741-11', grossSalary: 5800, socialSecurity: 638, dependents: 1 },
  { id: '6', name: 'Felipe Almeida Souza', cpf: '741.258.963-55', grossSalary: 2750, socialSecurity: 302.5, dependents: 1 },
];
