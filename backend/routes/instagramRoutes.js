const express = require('express');
const { addAccount, addRule, runBot } = require('../controllers/instagramController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect); // toutes les routes nécessitent une authentification

router.post('/add-account', addAccount);
router.post('/add-rule', addRule);
router.post('/run-bot', runBot);

module.exports = router;
