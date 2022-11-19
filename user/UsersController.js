const express = require('express');
const router = express.Router();

const User = require('./User');


// Rotes
router.get('/admin/users', (req, res) => {
    res.send('admin');
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
});


module.exports = router;