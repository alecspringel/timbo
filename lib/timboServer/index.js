const express = require('express');
const next = require('next');
// Endpoints:
const metrics = require('./api/metrics');

class TimboServer {
  constructor() {
    this.next = next({ dev: process.env.NODE_ENV !== 'production', dir: './lib/timboServer' });
  }

  prepare(callback) {
    return this.next.prepare().then(callback);
  }

  express() {
    const nextHandler = this.next.getRequestHandler();
    const server = express();
    server.use('/api', metrics);
    server.get('*', (req, res) => nextHandler(req, res));
    return server;
  }
}

module.exports = TimboServer;
