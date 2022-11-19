const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./User');
const adminAuth = require('../middlewares/adminAuth');
const session = require('express-session');


// Rotes
router.get('/admin/users', (req, res) => {
    res.send('admin');
});

router.get('/admin/users/index', (req, res) => {
    User.findAndCountAll().then((users) => {
        res.render('admin/users/index', {users: users});
    });
});

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then((user) => {
        if (user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                res.redirect('/admin/users/create');
            });

        }else{
            res.redirect('/admin/users/create');
        }
    });
});

router.get('/login', (req, res) => {
    res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {
        email: email
    }}).then(user => {
        if (user != undefined){
            var correct = bcrypt.compareSync(password, user.password);

            if (correct){
                req.session.user = {
                    email: user.email,
                    id: user.id
                }
                res.redirect('/admin/articles');
            }
            else{
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }
    });
});


router.get('/logout', adminAuth, (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});


module.exports = router;