const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));

router.post('/', (req, res) => {
  const { appName, metric, dimensions } = req.body;
  req.ddb.recordMetric(appName, metric, dimensions);
  return res.sendStatus(200);
});

module.exports = router;
