const express = require('express');
const router = express.Router();

// Redirection on category api's
router.use('/category', require('./category'))
// Redirection on pet api's
router.use('/pet', require('./pet'))
// Redirection on tag api's
router.use('/tag', require('./tag'))

module.exports = router;