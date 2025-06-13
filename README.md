# Brain Farm

Projeto de gerenciamento agrícola.

## Sumário
- [Requisitos](#requisitos)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)

- [Rodando o Projeto](#rodando-o-projeto)

- [Utilizando Docker](#utilizando-docker)

---

## Requisitos

- Node.js >= 20.x
- [pnpm](https://pnpm.io/) >= 9.x
- Docker (opcional, recomendado para banco de dados)

## Tecnologias

- [NestJS](https://nestjs.com/) 
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [NextJS](https://nextjs.org/)

## Estrutura do Projeto

- `apps/server`: Brain Farm - Backend (📃 [Documentação](./apps/server/README.md))
- `apps/client`: Brain Farm - Frontend (📃 [Documentação](./apps/client/README.md))

## Configuração do Ambiente

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias. 

2. Instalando todas as dependências do projeto (PNPM Workspace):

```sh
pnpm install
```

## Rodando o Projeto

### Desenvolvimento
Lembre-se de estar com o banco de dados rodando. Veja em: [Utilizando Docker](#utilizando-docker)

#### [ BACKEND ] Executando individualmente

```sh
pnpm server:dev
```

Todas `migrations` necessárias serão adicionadas ao banco de dados, e a aplicação estará disponível na porta definida em `PORT` (padrão: 3000).

## Scripts de Banco de Dados

O projeto utiliza TypeORM para gerenciamento de migrations.

### Executa e aplica todas as migration pendentes

```sh
pnpm server:database
```

## Utilizando Docker

O projeto inclui um arquivo `docker-compose.yaml` para facilitar o uso do banco PostgreSQL.

### Subir o banco de dados

```sh
docker-compose up -d
```

Certifique-se de que a variável `DATABASE_URL` no `.env` está apontando para o banco do Docker.

## Testes

### Testes end-to-end no backend

```sh
pnpm server:test:e2e
```
---

## Contato
**Gabriel Duarte - Backend Software Engineer** <br/>
jds.gabrielduarte@gmail.com - [LinkedIn](https://www.linkedin.com/in/jdsgabriel/) 