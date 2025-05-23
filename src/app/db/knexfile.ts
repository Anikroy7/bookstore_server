
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 */
/* import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {


  development: {
    client: 'postgresql',
    connection: {
      database: 'bookstore_db',
      user: 'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};

export default config; */


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import type { Knex } from 'knex';
import config  from '../config';

const knexFile: { [key: string]: Knex.Config } = {

  development: {
    client: 'postgresql',
    connection: config.database_url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};

export default knexFile;

