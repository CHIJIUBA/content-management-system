import { Options, Sequelize } from 'sequelize';
import { init as initModels } from './models';
import { serverConfigs } from '../configs';

class DB {
  public seqelize: Sequelize;
  public options: Options;

  constructor() {
    this.options = {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      logging: serverConfigs.NODE_ENV === 'development' ? console.log : false
    };
  }

  public async connectDB() {
    try {
      this.seqelize = new Sequelize('postgres', 'postgres', 'saveek123', this.options);
      initModels(this.seqelize);

      console.log('Connecting to the database...');

      if (serverConfigs.NODE_ENV === 'development') {
        // await this.seqelize.sync({});
        // this.seqelize.sync({ alter: true });
        // this.seqelize.sync({ force: true });
      }

      console.log('Connected to the database');
      return this.seqelize;
    } catch (error) {
      console.log(`Error connecting to the database:${error}`);
    }
  }

  public closeDB() {
    try {
      this.seqelize.close();
    } catch (error) {
      console.log(`Error closing the database:${error}`);
    }
  }
}

const db = new DB();
export default db;
