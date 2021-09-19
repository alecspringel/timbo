const express = require('express');
const next = require('next');
// Endpoints:
const metrics = require('./api/metrics');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './lib/timboServer' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use('/api', metrics);
  server.get('*', (req, res) => handle(req, res));
  server.listen(3000, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Server is listening to http://localhost:3000');
  });
});
