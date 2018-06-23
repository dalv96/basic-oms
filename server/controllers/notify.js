const helper = require('./helper'),
    Notify = require('../models/Notify'),
    Account = require('../models/Account'),
    Department = require('../models/Department'),
    Order = require('../models/Order'),

    Render = require('../render'),
    render = Render.render,

    common = require('./helper'),
    events = require('../common-data').notifies;

module.exports = {
    get: async (req, res) => {
        var user = await Account.findOne({_id: res.locals.__user._id})
                                .populate('notifies');

        res.locals.notifies = user.notifies.map( i => {
            i.text = events[i.text];

            if(i.read.indexOf(user._id) < 0) {
                i.isNew = true;
            }

            i.strDate = helper.dateToChatStr(i.date);

            return i;
        });

        render(req, res, {
            viewName: 'notifies'
        });

        for (var i = 0; i < user.notifies.length; i++) {
            var ntf = await Notify.findOne({_id: user.notifies[i]._id});
            if(ntf.read.indexOf(user._id) < 0) {
                ntf.read.push(user._id);
                ntf.save();
            }
        }
    },

    create: async (user, order, type, recipients) => {

        var ntf = new Notify({
            order: order.id,
            initiator: user.login,
            text: type,
            date: new Date()
        });

        ntf = await ntf.save();

        var b2o = await Department.findOne({ type: 'b2o' }),
            sks = await Department.findOne({ type: 'sks' }),
            net = await Department.findOne({ type: 'net' });

        var worker = [];

        switch (type) {

            case "start-gzp-pre":
            case "start-gzp-build":
            case "start-install-devices":
                var gus = await Department.findOne({ cities: order.info.city });

                worker = await Account.find({ department: gus });
                break;

            case "start-stop-pre":
            case "start-stop-build":
                worker = await Account.find({ department: b2o });
                break;

            case "end-stop-build":
            case "end-gzp-build":
            case "end-install-devices":
                worker = await Account.find({department: net});
                break;

            case "network":
                worker = await Account.find({ _id: order.info.initiator });
                break;

            case "new-message":
                recipients = recipients.map( item => {
                    return { login: item };
                });
                worker = await Account.find({ $or: recipients });
                break;
        }

        for (var i = 0; i < worker.length; i++) {
            worker[i].notifies.unshift(ntf);
            worker[i].save();
        }

        return;

    },

    read: async (req, res) => {

    }
}
