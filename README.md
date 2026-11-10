# SEIDOR — Teste Técnico de Gestão de Funcionários e IRRF

Este projeto foi desenvolvido como solução para o desafio proposto: criar uma aplicação web em React para gerenciar funcionários e calcular o Imposto de Renda Retido na Fonte (IRRF) de cada um deles.

## Enunciado do desafio

Precisamos desenvolver um sistema web que permita-nos gerenciar nossos funcionários e o cálculo de Imposto de Renda Retido na Fonte (IRRF) de cada um deles. Para isso construiremos uma aplicação com as seguintes funcionalidades:

• Cadastrar um novo Funcionário a partir dos campos manuais:
  - Nome
  - CPF
  - Salário Bruto
  - Desconto da previdência
  - Número de dependentes

• Atualizar um Funcionário cadastrado
• Excluir um Funcionário cadastrado
• Listar os Funcionários cadastrados com os campos:
  - Nome
  - CPF
  - Salário
  - Desconto
  - Dependentes
  - Desconto IRPF
• Filtrar a lista de Funcionários cadastrados por Nome e CPF

A cada novo funcionário cadastrado, com base nas informações inseridas, o sistema deve calcular o valor de salário base para cálculo do IR, o desconto IRRF e apresentar essas informações na listagem dos funcionários cadastrados.

Salário Base IR = Salário bruto - Desconto da Previdência - Dedução por Dependente x Quantidade de Dependentes

Desconto IRRF = Salário Base IR x Alíquota - Parcela a Deduzir

A tabela progressiva do IRRF que deve ser utilizada:

| Base de cálculo | Alíquota | Parcela a deduzir do IRPF |
| --- | ---: | ---: |
| Até 2.259,20 | Isento | R$ 0,00 |
| De R$ 2.259,21 até R$ 2.826,65 | 7,5% | R$ 169,44 |
| De R$ 2.826,66 até R$ 3.751,05 | 15% | R$ 381,44 |
| De R$ 3.751,06 até R$ 4.664,68 | 22,5% | R$ 662,77 |
| Acima de R$ 4.664,68 | 27,5% | R$ 896,00 |

Dedução por dependente: R$ 189,59

Para testes, também foi disponibilizado um arquivo JSON com alguns exemplos de funcionários.

## Objetivo do projeto

A aplicação permite:

- cadastrar funcionários com suas informações salariais;
- atualizar os dados já existentes;
- excluir registros;
- consultar a lista de colaboradores em uma visão clara;
- filtrar por nome e CPF;
- calcular automaticamente a base de IR e o valor do IRRF;
- manter os dados persistidos no navegador com Context API e localStorage.

## Requisitos técnicos

- React.js
- TypeScript
- Context API para persistência dos dados
- Vite como ferramenta de build
- Estilização em CSS

## Estrutura do projeto

```text
src/
  App.tsx
  EmployeeContext.tsx
  types.ts
  styles.css
  components/
    AppShell.tsx
    EmployeeModal.tsx
    LoginPage.tsx
    PayrollModal.tsx
    SupportModal.tsx
  pages/
    EmployeesPage.tsx
    OverviewPage.tsx
    PayrollPage.tsx
  lib/
    money.ts
```

## Como executar localmente

Pré-requisitos:

- Node.js 18+
- npm

No terminal, dentro da pasta do projeto, rode:

```bash
npm install
npm run dev
```

Depois, abra o endereço indicado pelo Vite no terminal, normalmente:

```text
http://localhost:5173
```

Para gerar a build de produção:

```bash
npm run build
```

Para testar a versão de produção localmente:

```bash
npm run preview
```

## Como testar a aplicação

1. Acesse a aplicação no navegador.
2. Faça login com qualquer e-mail válido e senha com 6 ou mais caracteres. O login da interface é apenas demonstrativo.
3. Na tela de funcionários, cadastre um novo colaborador preenchendo:
   - nome
   - CPF
   - salário bruto
   - desconto da previdência
   - quantidade de dependentes
4. Verifique se o sistema calcula corretamente:
   - Base IR
   - IRRF
5. Teste a funcionalidade de atualização e exclusão.
6. Use o campo de busca para filtrar por nome ou CPF.
7. Confirme que a listagem exibe corretamente os campos solicitados.
8. Verifique também a persistência dos dados após recarregar a página.

## Exemplo de cálculo

A fórmula utilizada no sistema é:

```text
Base IR = Salário bruto - Desconto da Previdência - (R$ 189,59 × número de dependentes)
IRRF = Base IR × alíquota - parcela a deduzir
```

Exemplo:

- Salário bruto: R$ 5.000,00
- Desconto previdência: R$ 500,00
- Dependentes: 0
- Base IR: R$ 4.500,00
- Alíquota: 22,5%
- Parcela a deduzir: R$ 662,77

Resultado aproximado:

```text
IRRF = 4.500,00 × 22,5% - 662,77 = 349,73
```

## Dados de exemplo

O projeto também inclui dados iniciais em JSON para facilitar a validação visual e funcional da aplicação.

Arquivo disponível:

- `sample-data.json`

## Observações importantes

- A aplicação foi desenvolvida utilizando React + TypeScript.
- A persistência dos dados foi feita com Context API e localStorage, conforme exigência do desafio.
- O projeto foi estruturado de forma organizada para facilitar leitura e manutenção do código.
- O login e a parte de suporte são de demonstração e não substituem autenticação real.

## Repositório e entrega

O projeto deve ser entregue em um repositório Git público (GitHub, GitLab, Bitbucket, etc.), com o código fonte completo e instruções de execução.


## Critérios avaliados

O que será observado na avaliação:

- funcionalidade completa conforme o enunciado;
- organização e legibilidade do código;
- uso adequado de React e TypeScript;
- persistência dos dados via Context API;
- cálculo correto do IRRF;
- boa experiência de uso da aplicação.

## Conclusão

Este projeto atende ao enunciado do teste prático, resolvendo a gestão de funcionários e o cálculo do IRRF de forma funcional, organizada e compatível com os requisitos solicitados.
# seidor-technical-challenage
