const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { create, getAll, update, remove } = require('../controllers/noteController');

router.use(auth);

router.post('/', create);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
