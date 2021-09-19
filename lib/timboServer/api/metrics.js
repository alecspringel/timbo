const express = require('express');

const router = express.Router();

router.get('/metrics', (req, res) => res.send('hello world'));

module.exports = router;
