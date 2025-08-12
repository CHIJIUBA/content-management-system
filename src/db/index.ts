import { Options, Sequelize } from 'sequelize';
import { init as initModels } from './models';
import path from 'path';

class DB {
  public sequelize: Sequelize;
  public options: Options;

  constructor() {
    this.options = {
      dialect: 'sqlite',
      storage: path.join(process.cwd(), 'database.sqlite'), // Root directory
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    };
  }

  public async connectDB() {
    try {
      this.sequelize = new Sequelize(this.options);
      initModels(this.sequelize);

      console.log('Connecting to SQLite database...');

      if (process.env.NODE_ENV === 'development') {
        // await this.seqelize.sync({});
        // this.seqelize.sync({ alter: true });
        // this.seqelize.sync({ force: true });
      }

      console.log('Connected to SQLite database');
      return this.sequelize;
    } catch (error) {
      console.log(`Error connecting to the database: ${error}`);
    }
  }

  public async closeDB() {
    try {
      await this.sequelize.close();
      console.log('Database connection closed');
    } catch (error) {
      console.log(`Error closing the database: ${error}`);
    }
  }
}

const db = new DB();
export default db;
