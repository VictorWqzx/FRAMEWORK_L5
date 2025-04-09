class Router {
    constructor() {
      this.routes = {
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {}
      };
    }
  
    register(method, path, handler) {
      this.routes[method][path] = handler;
    }
  
    async handle(req, res) {
      const method = req.method;
      const path = req.url.split('?')[0];
      const route = this.routes[method][path];
  
      if (route) {
        await route(req, res);
      } else {
        res.status(404).send('Not Found');
      }
    }
  }
  
  module.exports = Router;
  