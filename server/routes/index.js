const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/itr', require('./input'));

module.exports = router;