const TimboServer = require('../lib/timboServer');

const timbo = new TimboServer();

timbo.prepare(() => {
  const server = timbo.express();
  server.listen(3000, () => {
    console.log('Timbo is listening to http://localhost:3000');
  });
});
