import express, { Application, urlencoded, Express, json } from 'express';
import { Sequelize } from 'sequelize';
import { Server } from 'http';
import cors, { CorsOptions } from 'cors';
import routes from './routes';
import db from './db/index';
import { createClient } from 'redis';
import morgan from 'morgan';
import serverConfigs from './configs/server.configs';
import { systemMiddleware } from './middleware';

class App {
  public app: Application;
  protected port: number;
  protected db: Sequelize;
  protected server: Server;
  protected redisClient: ReturnType<typeof createClient> = createClient();
  private readonly corsOptions: CorsOptions;
  constructor() {
    this.app = express();
    this.port = serverConfigs.PORT;
    this.corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    };
    this.initializeDb();
    this.initializeMiddlewaresAndRoutes();

    const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];

    signals.forEach((signal) => {
      process.on(signal, async (err) => {
        serverConfigs.DEBUG(` \nReceived signal (${signal}) to terminate the application ${err}`);
        await this.shutdown();
      });
    });
  }

  private async initializeDb(): Promise<void> {
    this.db = await db.connectDB();
    // ///////////////// Initialize Redis Client
    // this.redisClient.on('error', (err) => console.error('Redis Client Error', err));
    // (async () => {
    //   await this.redisClient.connect();
    // })();
    //////////////////
  }

  private initializeMiddlewaresAndRoutes() {
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
    this.app.use(cors(this.corsOptions));
    this.app.use(morgan('dev'));
    this.app.use(routes);
    this.app.use(systemMiddleware.errorHandler());
  }

  public start() {
    this.server = this.app.listen(this.port, () => {
      serverConfigs.DEBUG(
        `Server running on http://localhost:${this.port} in ${serverConfigs.NODE_ENV} mode.\npress CTRL-C to stop`
      );
    });
  }

  private async shutdown() {
    try {
      // close server

      if (this.server) {
        await new Promise<void>((resolve) => {
          this.server?.close(() => {
            serverConfigs.DEBUG('Http server closed');
            resolve();
          });
        });
      }

      //Close database connection
      await db.closeDB();
      console.log('shut down gracefully');
    } catch (error) {
      serverConfigs.DEBUG(`Error during shutdown: ${error}`);
    } finally {
      process.exit(0);
    }
  }
}

export const app = new App();
app.start();
