# Brain Farm - Client
Sistema web construído em Next.js, Shadcn/UI e React-Query para controle de propriedades agrícolas.

## Sumário
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rodando o projeto](#rodando-o-projeto)
- [Pontos de melhoria](#pontos-de-melhoria)
---

## Tecnologias
- [NextJS](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

## Estrutura do Projeto

- `src/components`: Componentes de interface;
- `src/hooks`: Hooks personalizados para chamadas API;
- `src/lib`: Arquivos de configuração de bibliotecas externas;
- `src/app/components`: Componentes internos do roteamento do dashboard;
- `src/app/farms`: Roteamento das propriedades agrícolas;
  - `src/app/farms/components`: Componentes internos do roteamento;
  - `src/app/farms/[id]`: Página de detalhes da propriedade;
    - `src/app/farms/[id]/components`:Componentes internos do roteamento de detalhes;
- `src/app/producers`: Roteamento de visualização dos produtores;
  - `src/app/producers/components`: Componentes internos do roteamento;
  - `src/app/producers/[producerId]`: Página de detalhes do produtor;
    - `src/app/producers/[producerId]/components`:Componentes internos do roteamento de detalhes;


## Rodando o projeto

```bash
pnpm dev
```
O sistema irá iniciar a aplicação (http://localhost:3000/)<br/>
Certifique que o backend está rodando na porta 3000 (http://localhost:3001/v1)

## Pontos de melhoria
- Implementar `Authentication` e `Authorization` ( [Keycloak](http://keycloak.org/) | [Auth0](https://auth0.com/) | [Auth.js (NextAuth.js)](https://authjs.dev/) );
- Implementar controlo de estado global ( [Zustand](https://zustand-demo.pmnd.rs/) | [Redux](https://redux.js.org/) | [Immer](https://immerjs.github.io/immer/) ) 
- Criar testes em componentes ( [React Testing LIbrary](https://testing-library.com/) | [Playwright](https://playwright.dev/) );
- Criar componentes genéricos para uso geral do sistema ( Header, DataTable, Pagination, Modal, Alerts )
- Padronização de toda a interface e componentes ( Cores, Tamanhos e Ícones )
---
