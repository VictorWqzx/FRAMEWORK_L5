class Middleware {
    constructor() {
      this.stack = [];
    }
  
    use(fn) {
      this.stack.push(fn);
    }
  
    async run(req, res) {
      for (const fn of this.stack) {
        await fn(req, res);
      }
    }
  }
  
  module.exports = Middleware;
  