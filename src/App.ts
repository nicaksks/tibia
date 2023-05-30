import express, { Application } from 'express';
import fallback from './router/fallback';
import router from './router/router';
import cors from 'cors';

class App {
  _app: Application
  constructor() {
    this._app = express();
    this.middlewares().router();
  };

  middlewares() {
    this._app.use(express.json());
    this._app.use(cors());
    return this;
  };

  router() {
    this._app.use('/v1', router);
    this._app.use(fallback);
    return this;
  };
}

export default new App()._app;