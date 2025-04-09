class Response {
    constructor(res) {
      this.res = res;
      this.statusCode = 200;
    }
  
    status(code) {
      this.statusCode = code;
      return this;
    }
  
    send(data) {
      this.res.statusCode = this.statusCode;
      this.res.setHeader('Content-Type', 'text/plain');
      this.res.end(data);
    }
  
    json(data) {
      this.res.statusCode = this.statusCode;
      this.res.setHeader('Content-Type', 'application/json');
      this.res.end(JSON.stringify(data));
    }
  }
  
  module.exports = Response;
  