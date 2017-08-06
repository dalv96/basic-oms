'use strict'

const models = require('../models');
const Account = models.Account;
const password = require('./password');
const logger = require('./logger');
const Render = require('../render'),
    render = Render.render;
const View = require('../views');

module.exports = {

    isLoggedIn: async (req, res, next) => {
        if (req.session.__user) {
            var acc = await Account.findOne({login: req.session.__user});
            res.locals.__user = {
                login: acc.login,
                name: acc.name
            };
            next();
        } else {
            if(req.path != '/login') {
                var rstr = '/login' + ( (req.originalUrl.length>1) ? '?trg='+encodeURIComponent(req.originalUrl) : '' );
                res.redirect(rstr);
            } else render(req, res, 'login');
        }
    },

    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/login')
    },

    checkAuthorisation: async (req, res) => {
        var acc = await Account.findOne({
            login: req.body.login,
            password: password.createHash(req.body.password),
            status: true
        })
        
        if (acc) {
            req.session.__user = acc.login;
            logger.info(`Success authorization by : ${acc.login}`);
            var url = req.query.trg || '/';
            res.redirect(url);
        } else {
            logger.warn(`Fail authorization.`);
            res.status(401).redirect(req.originalUrl);
        }
    }
}
