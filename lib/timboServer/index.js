const express = require('express');
const next = require('next');
const Dynamo = require('../dynamo');
// Endpoints:
const metrics = require('./api/metrics');

class TimboServer {
  constructor(accessKey, secretKey, region, tableName) {
    this.next = next({ dev: process.env.NODE_ENV !== 'production', dir: './lib/timboServer' });
    this.dynamo = new Dynamo(accessKey, secretKey, region, tableName);
  }

  prepare(callback) {
    return this.next.prepare().then(callback);
  }

  express() {
    const nextHandler = this.next.getRequestHandler();
    const server = express();
    server.use(express.json());
    // eslint-disable-next-line no-shadow
    server.use((req, res, next) => {
      req.ddb = this.dynamo;
      next();
    });
    server.use('/metrics', metrics);
    server.get('*', (req, res) => nextHandler(req, res));
    return server;
  }
}

module.exports = TimboServer;
