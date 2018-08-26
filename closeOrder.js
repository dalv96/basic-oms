const Order = require('./server/models/Order'),
  {orders} = require('./data');

for (var i = 0; i < orders.length; i++) {
  var id = orders[i];

  var order = Order.findOne({id: id}).then(o => {
    if (o) {
      o.status = 'succes';
      o.deadline = null;
      o.date['client-notify'] = new Date();
      o.history.push({
        author: 'Робот СУЗ',
        date: new Date(),
        name: 'Уведомление клиента (заказ включен)'
      });
      o.save();
    } else console.log('заказ не найден', id);
  })
}