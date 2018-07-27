block('order').elem('head').content()(function () {
    var order = this.ctx.order;
    var pause = '',
        resp = null;

    var tClient = `[${order.info.client.type.shortName}] ${order.info.client.name}`,
        tContact = order.info.contact,
        tAdress = `${order.info.city.type} ${order.info.city.name}, ${order.info.adds}`;

        if(order.info.street)
          var tAdress = `${order.info.city.type} ${order.info.city.name}, ${order.info.street.type} ${order.info.street.name}, ${order.info.adds}`

    var textInfo = `
      ${order.id} | [${order.info.client.type.shortName}] ${order.info.client.name} | ${tContact} | ${tAdress}
    `;

    if(order.pause.status) pause = ' (на паузе)';

    if(order.resp != null) {
        resp = {
            elem: 'head-item',
            content: [
                {
                    elem: 'cell-name',
                    content: 'Ответственный за текущий этап отдел'
                },
                {
                    elem: 'cell-data',
                    content: order.resp
                }
            ]
        }
    }

    // if(order.isOld)
    //     link = {
    //         elem: 'head-item',
    //         content: [
    //             {
    //                 elem: 'cell-name',
    //                 content: 'Заявка в основном СУЗ-е'
    //             },
    //             {
    //                 elem: 'cell-data',
    //                 content: {
    //                     block: 'link',
    //                     mods: {
    //                         theme: 'islands'
    //                     },
    //                     attrs: {
    //                         target: '_blank'
    //                     },
    //                     url: `http://ops.miranda-media.ru/orders/${order.id}`,
    //                     content: 'Ссылка'
    //                 }
    //             }
    //         ]
    //     }


    return [
        {
            elem: 'flag',
            elemMods: {
                color: order.flag
            },
            js: {
                state: order.flag,
                id: order.id
            }
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                view: 'plain'
            },
            mix: {
              block: 'order',
              elem: 'clipboard',
              js: {
                str: textInfo
              }
            },
            icon: {
                block: 'icon',
                attrs: {
                  title: 'Нажмите, чтобы скопировать данные'
                },
                url: '/copy.png'
            }
        },
        {
            elem: 'head-cell',
            elemMods: {
                type: 'left'
            },
            content: {
                elem: 'id',
                id: order.id
            }
        },
        {
            elem: 'head-cell',
            elemMods: {
                type: 'center'
            },
            content: [
                {
                    elem: 'head-cell',
                    elemMods: {
                        type: 'top'
                    },
                    content: [
                        {
                            elem: 'head-item',
                            content: [
                                {
                                    elem: 'cell-name',
                                    content: 'Этап'
                                },
                                {
                                    elem: 'cell-data',
                                    content: order.stage + pause
                                }
                            ]
                        },
                        resp
                    ]
                },
                {
                    elem: 'head-cell',
                    elemMods: {
                        type: 'bottom'
                    },
                    content: {
                        elem: 'switcher',
                        order: order,
                        tab: this.ctx.tab
                    }

                }
            ]
        },
        {
            elem: 'head-cell',
            elemMods: {
                type: 'right'
            },
            content: {
                elem: 'cs',
                cs: order.cs
            }
        }
    ]
})
