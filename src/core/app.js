const http = require('http');
const Router = require('./router');
const Middleware = require('./middleware');
const Request = require('./request');
const Response = require('./response');
const ErrorHandler = require('./error');

class App {
  constructor() {
    this.router = new Router();
    this.middleware = new Middleware();
  }

  use(fn) {
    this.middleware.use(fn);
  }

  get(path, handler) {
    this.router.register('GET', path, handler);
  }

  post(path, handler) {
    this.router.register('POST', path, handler);
  }

  put(path, handler) {
    this.router.register('PUT', path, handler);
  }

  patch(path, handler) {
    this.router.register('PATCH', path, handler);
  }

  delete(path, handler) {
    this.router.register('DELETE', path, handler);
  }

  listen(port, callback) {
    const server = http.createServer(async (req, res) => {
      const customReq = await Request.create(req);
      const customRes = new Response(res);

      try {
        await this.middleware.run(customReq, customRes);
        await this.router.handle(customReq, customRes);
      } catch (err) {
        ErrorHandler.handle(err, customRes);
      }
    });

    server.listen(port, callback);
  }
}

module.exports = App;
