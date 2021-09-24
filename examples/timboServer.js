const TimboServer = require('../lib/timboServer');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('./secrets');

const timbo = new TimboServer(AWS_ACCESS_KEY, AWS_SECRET_KEY, 'us-west-2', 'timbo-test-2');

timbo.prepare(() => {
  const server = timbo.express();
  server.listen(3000, () => {
    console.log('Timbo is listening to http://localhost:3000');
  });
});
