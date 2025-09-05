import { Sequelize } from 'sequelize';
import { init as initModels } from './models';
import { serverConfigs } from '../configs';

class DB {
  public sequelize: Sequelize;

  constructor() {
    // Use the DATABASE_URL from environment variables
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Initialize Sequelize with MySQL connection string
    this.sequelize = new Sequelize(dbUrl, {
      dialect: 'mysql',
      logging: serverConfigs.NODE_ENV === 'development' ? console.log : false
    });
  }

  public async connectDB() {
    try {
      initModels(this.sequelize);

      console.log('Connecting to the database...');

      await this.sequelize.authenticate();

      if (serverConfigs.NODE_ENV === 'development') {
        // Uncomment what you need
        // await this.sequelize.sync({});
        // await this.sequelize.sync({ alter: true });
        // await this.sequelize.sync({ force: true });
      }

      console.log('Connected to the database');
      return this.sequelize;
    } catch (error) {
      console.error(`Error connecting to the database: ${error}`);
      throw error;
    }
  }

  public async closeDB() {
    try {
      await this.sequelize.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error(`Error closing the database: ${error}`);
    }
  }
}

const db = new DB();
export default db;
