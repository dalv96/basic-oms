block('order').elem('service-info').elemMod('type', 'iptv').content()(function () {
    var ctx = this.ctx,
        order = ctx.order;

    if(!order)
        order = {
            info: {}
        }

    return [
        {
            elem: 'body-row',
            content: [
                {
                    elem: 'body-row-name',
                    content: 'Связанная заявка'
                },
                {
                    elem: 'body-row-data',
                    content: [
                        {
                            block: 'input',
                            mods: {
                                theme: 'islands',
                                width: 'available',
                                size: 'l'
                            },
                            val: order.info.relation || '',
                            name: 'relation',
                            placeholder: 'ID заказа (1234)'
                        }
                    ]
                }
            ]
        }
    ]
})

block('order').elem('service-info').elemMod('type', 'iptv').elemMod('access', true).content()(function () {
    var ctx = this.ctx,
        order = ctx.order;

    if(!order)
        order = {
            info: {}
        }

    return [
        {
            elem: 'body-row',
            content: [
                {
                    elem: 'body-row-name',
                    content: 'Связанная заявка'
                },
                {
                    elem: 'body-row-data',
                    content: [
                        {
                            block: 'input',
                            mods: {
                                theme: 'islands',
                                width: 'available',
                                size: 'l'
                            },
                            val: order.info.relation || '',
                            name: 'relation',
                            placeholder: 'ID заказа (1234)'
                        }
                    ]
                }
            ]
        }
    ]
})