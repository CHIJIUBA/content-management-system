import { config } from 'dotenv';
import debug from 'debug';

config();

class ServerConfig {
  public PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
  public NODE_ENV = process.env.NODE_ENV || 'development';
  public BASE_URL = process.env.BASE_URL;
  public DB_URL = process.env.DATABASE_URL;
  public ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
  public FRONTEND_URL = process.env.FRONTEND_URL;
  public RUN_DEFAULT_DATA_MIGRATION =
    process.env.RUN_DEFAULT_DATA_MIGRATION === 'true' ? true : false;
  public DEBUG = this.NODE_ENV === 'development' ? debug('dev') : console.log;
}

const serverConfigs = new ServerConfig();
export default serverConfigs;
