const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { dashboard, adminOnly } = require('../controllers/protectedController');

router.get('/protected', auth, dashboard);
router.get('/admin', auth, role('admin'), adminOnly);

module.exports = router;
