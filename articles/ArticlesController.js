const express = require('express');

const router = express.Router();


router.get('/articles', (req, res) => {
    res.send('pagina de articles');
});

router.get('/admin/articles/new', (req, res) => {
    res.send('pagina de criacao de novo artigo');
});

module.exports = router;