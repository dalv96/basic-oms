'use strict';

const Provider = require('../models/Provider'),
    Order = require('../models/Order'),
    Render = require('../render'),
    render = Render.render;

const logger = require('./logger');

module.exports = {

    getPage: async (req, res) => {
        var pagerId = 'providers',
            pagers = [],
            pageNumber = req.query['pager' + pagerId] || 1,
            perPage = 30; // TODO брать из конфига?

        if (!!(+pageNumber) && (+pageNumber) > 0) {
            pageNumber = +pageNumber;
            pagers[0] = pagerId;
        }
        else
            res.redirect(req.path);

        var prvdrs = await Provider.paginate({}, { page: pageNumber, limit: perPage})
        if(req.query.name) {
            var val = req.query.name;
            val = val.replace(/\[/g, '');
            val = val.replace(/\]/g, '');
            val = val.replace(/\\/g, '');
            val = val.replace(/\(/g, '');
            val = val.replace(/\)/g, '');
            var rgx =  new RegExp('' + val + '', 'i');
            prvdrs = await Provider.paginate({name: {$regex: rgx}}, { page: pageNumber, limit: perPage});
        }
        if(prvdrs.total == 0) prvdrs.total = 1;
        res.locals.query = req.query;
        res.locals.prvdrs = prvdrs.docs;
        res.locals.pagers = {};
        res.locals.pagers[pagerId] = {
            pageNumber: +pageNumber,
            records: prvdrs.total,
            perPage: prvdrs.limit
        };
        render(req, res, {
            viewName: 'handbook',
            options: {
                title: 'Справочник провайдеров',
                handbookType: 'providers',
                pagers: pagers,
                reqUrl: '/admin/providers/add'
            }
        });
    },

    create: async (req, res) => {
        var obj = {
            name: req.body.name.trim(),
            type: req.body.type
        };

        var prvdr = await Provider.findOne({ name: obj.name, type: obj.type })

        var newPrvdr;

        if (prvdr != null) {
            res.status(400).send({ errText: 'Провайдер с таким названием уже есть в базе.' });
            return;
        }

        newPrvdr = new Provider({
            name: obj.name,
            type: obj.type
        });

        var done = await saver(newPrvdr);
        if(!!done) {
            logger.info(`Create Provider [${ done.type }] ${ done.name }`, res.locals.__user);
            res.send({ created: true });
        } else res.status(400).send({ errText: `Произошла ошибка при сохранении.
            Попробуйте еще раз. При повторении этой ошибки - сообщите разработчику.`});

    },
    edit: async (req, res) => {
        var reqData = req.body,
            hasClone = false;

        var prvdr = await Provider.findOne({ name: reqData.obj.name.trim(), type: reqData.obj.type})

        if (prvdr != null && prvdr._id != reqData.obj._id) {
            res.status(400).send({ errText: 'Провайдер с таким названием уже есть в базе.' });
            return;
        }

        prvdr = await Provider.findById(reqData.obj._id);

        if( prvdr == null ) {
            res.status(400).send({ errText: 'Невозможно изменить несуществующего провайдера.' });
            return;
        }

        var oldPrvdr = {
            name: prvdr.name,
            type: prvdr.type
        };
        prvdr.name = reqData.obj.name.trim();
        prvdr.type = reqData.obj.type;

        var done = await saver(prvdr);
        if(!!done) {
            logger.info(`Edit Provider [${ oldPrvdr.type }] ${ oldPrvdr.name } --> [${ done.type }] ${ done.name }`, res.locals.__user);
            res.send({ created: true });
        } else res.status(400).send({ errText: `Произошла ошибка при сохранении.
            Попробуйте еще раз. При повторении этой ошибки - сообщите разработчику.`});

    },
    delete: async (req, res) => {
        var prvdr = await Provider.findById(req.body.obj._id);

        if (prvdr == null) {
            res.status(400).send({ errText: 'Невозможно удалить несуществующего провйдера.' });
            return;
        }

        var orders = await Order.find({ 'stop.provider': prvdr }).lean(),
            used = (orders.length > 0)

        if (used) {
            res.status(400).send({ errText: 'Невозможно удалить провайдера, использующегося в системе.' });
            return;
        }

        var done;

        try {
            done = await prvdr.remove();
        } catch (err) {
            done = false;
            logger.error(err.message);
        }

        if (!!done) {
            logger.info(`Delete Provider ${ done.type } ${ done.name }`, res.locals.__user);
            res.send({ ok: 'ok' });
        } else {
            res.status(400).send({ errText: `Произошла ошибка при сохранении.
                Попробуйте еще раз. При повторении этой ошибки - сообщите разработчику.`});
        }
    }
};

function saver(obj) {
    try {
        return obj.save();
    } catch (err) {
        logger.error(err.message);
        return false;
    }
}
