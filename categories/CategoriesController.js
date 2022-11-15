const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    res.send('rota de categorias');
});

router.get('admin/categories/new', (req, res) => {
    res.send('criar nova categoria');
});

module.exports = router;