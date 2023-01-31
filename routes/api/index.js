const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
//do we need a reactionRoutes??
//const reactionRoutes = require('./reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
//router.use('/reactions', reactionRoutes);

module.exports = router;