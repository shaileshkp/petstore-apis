const express = require('express');
const router = express.Router();

// Redirection on pet api's
router.use('/category', require('./category'))
router.use('/pet', require('./pet'))
router.use('/tag', require('./tag'))

module.exports = router;