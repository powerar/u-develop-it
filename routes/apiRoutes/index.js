const express = require('express');
const router = express.Router();

//import candidateRoutes
router.use(require('./candidateRoutes'));

//import partyRoutes
router.use(require('./partyRoutes'));

//import voterRoutes
router.use(require('./voterRoutes'));

//import voteRoutes
router.use(require('./voteRoutes'));

module.exports = router;