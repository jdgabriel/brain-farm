import knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

export const testDbClient = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  acquireConnectionTimeout: 30000,
  ...knexSnakeCaseMappers(),
});
