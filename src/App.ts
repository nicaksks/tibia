import express, { Application } from 'express';
import router from './router/router';
import cors from 'cors';

class App {
  _app: Application
  constructor() {
    this._app = express();
    this.middlewares().group().router();
  };

  middlewares() {
    this._app.use(express.json());
    this._app.use(cors());
    return this;
  }

  group() {
    this._app.use('/v1/tibia', router);
    return this
  };

  router() {
    this._app.get('*', (req, res) => {
      res.json({
        code: res.statusCode,
        message: "Hello, World"
      })
    })
  };
}

export default new App()._app;