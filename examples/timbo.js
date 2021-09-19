const Timbo = require('../lib/timbo');

const timbo = new Timbo('AWS_ACCESS_KEY', 'AWS_SECRET_KEY', 'us-west-2', 'timbo-test-2');

const dimensions = {
  user: '1234',
  errorCode: 403,
  name: null,
  space: undefined,
};

timbo.recordMetric('farmplot', 'login', dimensions);
