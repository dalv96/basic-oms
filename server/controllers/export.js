'use strict';

var xl = require('excel4node');

function get(order, field) {
    var fields = {
        'id': {
            text: 'ID',
            value: () => { return order.id; }
        },
        'status': {
            text: 'Статус',
            value: () => { return order.status; }
        },
        'client': {
            text: 'Клиент',
            value: () => {
                if(order.info.client)
                    return order.info.client.name;
            }
        },
        'client-type': {
            text: 'Тип клиента',
            value: () => {
                if(order.info.client)
                    return order.info.client.type.name
            }
        },
        'city': {
            text: 'Город',
            value: () => {
                if(order.info.city)
                    return `${order.info.city.type} ${order.info.city.name}`
            }
        },
        'street': {
            text: 'Улица',
            value: () => {
                if(order.info.street)
                    return `${order.info.street.type} ${order.info.street.name}`
            }
        },
        'adds': {
            text: 'д./кв. и т.д',
            value: () => { return order.info.adds; }
        },
        'coordinate': {
            text: 'Координаты',
            value: () => { return order.info.coordinate; }
        },
        'service': {
            text: 'Услуга',
            value: () => { return order.info.service; }
        },
        'volume': {
            text: 'Ёмкость',
            value: () => { return order.info.volume; }
        },
        'relation': {
            text: 'Связанные заказы',
            value: () => { return order.info.relation; }
        },
        'ip': {
            text: 'Количество IP адресов',
            value: () => { return order.info.ip; }
        },
        'init-add-info': {
            text: 'Дополнительная информация',
            value: () => { return order.info.add_info; }
        },
        'income-once': {
            text: 'Ожидаемый единовр. доход (руб)',
            value: () => { return order.info['income-once']; }

        },
        'income-monthly': {
            text: 'Ожидаемый ежемес. доход (руб)',
            value: () => { return order.info['income-monthly']; }
        },
        'gzp-need': {
            text: 'Необходимость ГЗП',
            value: () => {
                if(order.gzp)
                    return order.gzp.need;
            }
        },
        'gzp-capability': {
            text: 'Техническая возможность ГЗП',
            value: () => {
                if(order.gzp)
                    return order.gzp.capability;
            }
        },
        'gzp-time': {
            text: 'Срок организации',
            value: () => {
                if(order.gzp)
                    return order.gzp.time;
            }
        },
        'gzp-cost-once': {
            text: 'Одноразовая стоимость организации',
            value: () => {
                if(order.gzp)
                    return order.gzp['cost-once'];
            }
        },
        'gzp-cost-monthly': {
            text: 'Операционные затраты ежемесячные',
            value: () => {
                if(order.gzp)
                    return order.gzp['cost-monthly'];
            }
        },
        'gzp-add-info': {
            text: 'Дополнительная информация',
            value: () => {
                if(order.gzp)
                    return order.gzp.add_info;
            }
        },
        'gzp-reason': {
            text: 'Причина технической невозможности',
            value: () => {
                if(order.gzp)
                    return order.gzp.reason;
            }
        },
        'stop-capability': {
            text: 'Техническая возможность СТОП',
            value: () => {
                if(order.stop)
                    return order.stop.reason;
            }
        },
        'stop-provider': {
            text: 'Провайдер',
            value: () => {
                if(order.stop)
                    if(order.stop.provider)
                        return order.stop.provider.name;
            }
        },
        'stop-contact': {
            text: 'Контакт с провайдером',
            value: () => {
                if(order.stop)
                    return order.stop.contact;
            }
        },
        'stop-devices': {
            text: 'Оборудование',
            value: () => {
                if(order.stop)
                    return order.stop.devices;
            }
        },
        'stop-add-devices': {
            text: 'Дополнительное оборудование',
            value: () => {
                if(order.stop)
                    return order.stop.add_devices;
            }
        },
        'stop-interfaces': {
            text: 'Интерфейсы',
            value: () => {
                if(order.stop)
                    return order.stop.interfaces;
            }
        },
        'stop-time': {
            text: 'Срок организации СТОП',
            value: () => {
                if(order.stop)
                    return order.stop.time;
            }
        },
        'stop-add-info': {
            text: 'Дополнительная информация',
            value: () => {
                if(order.stop)
                    return order.stop.add_info;
            }
        },
        'stop-org-info': {
            text: 'Информация об организации',
            value: () => {
                if(order.stop)
                    return order.stop.organization_info;
            }
        },
        'stop-cost-once': {
            text: 'Одноразовая стоимость организации СТОП',
            value: () => {
                if(order.stop)
                    return order.stop['cost-once'];
            }
        },
        'stop-cost-monthly': {
            text: 'Операционные затраты ежемесячные СТОП',
            value: () => {
                if(order.stop)
                    return order.stop['cost-monthly'];
            }
        }
    }
    // console.log(fields[field]);
    return fields[field];
}

var def = ['id', 'status', 'client', 'client-type', 'city', 'street', 'adds',
                'coordinate', 'service', 'volume', 'relation', 'ip',
                'init-add-info', 'income-once', 'income-monthly',
                'gzp-need', 'gzp-capability', 'gzp-time', 'gzp-cost-once',
                'gzp-cost-monthly', 'gzp-add-info', 'gzp-reason',
                'stop-capability', 'stop-provider', 'stop-contact',
                'stop-devices', 'stop-add-devices', 'stop-interfaces',
                'stop-time', 'stop-add-info', 'stop-org-info',
                'stop-cost-once', 'stop-cost-monthly']

module.exports = {

    getExcel: async (orders, res) => {

        var wb = new xl.Workbook();

        var ws = wb.addWorksheet('Таблица 1');

        var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 11,
                bold: true
            },
            alignment: {
                 wrapText: true,
                 horizontal: 'center'
            }
        });

        def.forEach( (col, j) => {
            ws.cell(1, j+1).string(get(null, col).text)
        })

        orders.forEach( (item, i) => {

            def.forEach( (col, j) => {
                var val = null;
                val = get(item, col).value();

                if(!val) val = '';
                ws.cell(i+2,j+1).string( val.toString() );
            })
        });

        wb.write('Export.xlsx', res);
    }
}