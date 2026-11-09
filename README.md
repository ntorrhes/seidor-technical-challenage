# Folha Clara — gestão de funcionários e IRRF

Aplicação web em React + TypeScript para cadastrar funcionários, manter a equipe no navegador e estimar o IRRF mensal conforme a tabela progressiva fornecida no enunciado. Inclui visão geral, registros de folhas mensais, troca de espaço de trabalho, login demonstrativo e modal de suporte.

## Requisitos

- Node.js 18 ou superior
- npm

## Executar localmente

No terminal, dentro desta pasta:

```bash
npm install
npm run dev
```

Abra o endereço local mostrado pelo Vite (normalmente `http://localhost:5173`). Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Como testar manualmente

1. Entre com qualquer e-mail válido e uma senha de pelo menos seis caracteres. O login é apenas demonstrativo e não autentica em um servidor.
2. Ao abrir pela primeira vez, confira os seis funcionários de demonstração.
3. Cadastre um funcionário com valores como `5.000,00` e `500,00`; os campos aceitam vírgula decimal e exibem os valores no padrão brasileiro. A linha mostra a base IR e o IRRF calculados.
4. Para testar a faixa isenta, use salário de R$ 2.000,00, previdência de R$ 0,00 e nenhum dependente. Para uma faixa tributável, use R$ 5.000,00, R$ 500,00 e nenhum dependente: base R$ 4.500,00 e IRRF R$ 349,73.
5. Edite e exclua funcionários, busque por nome ou CPF e use **Exportar** para baixar a lista filtrada como CSV.
6. Na **Visão geral**, consulte os totais e acesse as outras áreas. Em **Folha de pagamento**, crie ou exclua registros mensais.
7. O menu do usuário permite sair; ao entrar de novo os dados locais continuam salvos. A área de trabalho tem duas opções de demonstração.
8. O modal de suporte mostra canais fictícios de exemplo; substitua e confirme esses contatos antes de publicar.

O arquivo [`sample-data.json`](./sample-data.json) contém os mesmos dados de demonstração. Os dados são guardados somente no `localStorage` deste navegador; não existe servidor ou sincronização entre usuários.

## Regras do cálculo

```text
Base IR = máximo(0, salário bruto − desconto previdenciário − (R$ 189,59 × dependentes))
IRRF = máximo(0, base IR × alíquota − parcela a deduzir)
```

Faixas implementadas conforme os valores do enunciado:

| Base IR | Alíquota | Parcela a deduzir |
| --- | ---: | ---: |
| Até R$ 2.259,20 | Isento | R$ 0,00 |
| R$ 2.259,21 a R$ 2.826,65 | 7,5% | R$ 169,44 |
| R$ 2.826,66 a R$ 3.751,05 | 15% | R$ 381,44 |
| R$ 3.751,06 a R$ 4.664,68 | 22,5% | R$ 662,77 |
| Acima de R$ 4.664,68 | 27,5% | R$ 896,00 |

## Estrutura

- `src/components`: login, navegação, modais e estrutura compartilhada.
- `src/pages`: visão geral, funcionários e folhas de pagamento.
- `src/lib/money.ts`: leitura e apresentação de valores em reais.
- `src/EmployeeContext.tsx`: estado da equipe e persistência no navegador.
- `src/types.ts`: modelo do funcionário e cálculo do IRRF.
- `src/App.tsx`: sessão e navegação entre áreas.
- `src/styles.css`: estilos responsivos.

## Publicar em um repositório

O diretório entregue está pronto para versionamento. Para publicar, crie um repositório Git público no provedor escolhido e execute, nesta pasta:

```bash
git init
git add .
git commit -m "feat: gestão de funcionários e cálculo de IRRF"
git branch -M main
git remote add origin <URL-DO-REPOSITORIO>
git push -u origin main
```

## Organização do código

O código está separado por responsabilidade em `src/components`, `src/pages`, `src/lib` e `src/types.ts`. Essa divisão mantém cada área pequena e facilita extrair um módulo para um serviço independente no futuro. Module Federation foi deixado de fora porque esta aplicação não tem remotes ou deploys separados; incluir essa infraestrutura agora aumentaria a configuração sem trazer uma necessidade funcional.

## Limites da demonstração

- O login é local e aceita qualquer e-mail válido com senha de seis caracteres ou mais. Não use esse fluxo como autenticação de produção.
- Funcionários, sessão e folhas ficam no `localStorage` do navegador. A troca de espaço de trabalho é visual e ainda não separa os dados por empresa.
- O registro de folha guarda o mês e uma observação. Os totais exibidos são estimativas calculadas a partir da equipe atual, não um fechamento contábil imutável.
