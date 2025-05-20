import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Dialect, Sequelize } from 'sequelize';

const {
  DATABASE_NAME = 'np',
  DATABASE_USER = 'root',
  DATABASE_PASS = 'root',
  DATABASE_HOST = 'localhost',
  DATABASE_DIALECT = 'mysql',
  DATABASE_PORT = 3306,
  DATABASE_CCA_CERT = '',
} = { ...process.env };

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  {
    dialect: <Dialect>DATABASE_DIALECT,
    host: DATABASE_HOST,
    port: parseInt(<string>DATABASE_PORT, 10),
    dialectOptions: {
      ssl: {
        ca: readFileSync(join(__dirname, DATABASE_CCA_CERT), {
          encoding: 'utf8',
        }),
      },
    },
    //storage: join(__dirname, 'db/sqlite/np.sqlite'),
    //logging: console.log,
    define: {
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    },
  }
);

export default sequelize;
