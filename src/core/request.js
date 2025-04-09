const { URL } = require('url');
const querystring = require('querystring');

class Request {
  constructor(req, body, query) {
    this.method = req.method;
    this.url = req.url;
    this.headers = req.headers;
    this.body = body;
    this.query = query;
    this.params = {}; // Для будущей реализации динамических роутов
  }

  static async create(req) {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = body;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const query = Object.fromEntries(url.searchParams.entries());

    return new Request(req, parsedBody, query);
  }
}

module.exports = Request;
