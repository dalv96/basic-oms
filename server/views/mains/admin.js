module.exports = function(opt, data){
    var orders = data.orders;

    var opt = opt || {},
        pagerId;

    if (opt.pagers && opt.pagers.length)
        pagerId = opt.pagers[0];

    return {
        view: 'page-index',
        title: 'Главная страница',
        meta: {
            description: 'СУЗ 2.0',
            og: {
                url: 'https://suz.miranda-media.ru',
                siteName: 'СУЗ 2.0'
            }
        },
        page: [
            {
                block: 'title',
                elem: 'main-page',
                content: 'Главная страница'
            },
            {
                block: 'button-panel',
                type: 'admin'
            },
            {
                block: 'wrap',
                elem: 'main',
                content: [
                    {
                        block: 'title',
                        elem: 'part',
                        content: 'Заявки с неизвестным городом:'
                    },
                    {
                        block: 'ultra-table',
                        mods: {
                            'static' : true,
                            theme: 'order'
                        },
                        fields: [
                            {
                                name: 'ID',
                                getContent: (order) => `${order.id}`
                            },
                            {
                                name: 'Клиент',
                                getContent: (order) => {
                                    var name = order.info.client.name;
                                    if(name.length >= 60) name = name.substring(0, 57) + '...';

                                    return `[${order.info.client.type.shortName}] ${name}`
                                }
                            },
                            {
                                name: 'Статус',
                                getContent: (order) => `${order.status}`
                            },
                            {
                                name: 'Услуга',
                                getContent: (order) => `${order.info.service.name}`
                            },
                            {
                                name: 'КС',
                                getContent: (order) => {
                                    if(order.pause.deadline) return order.pause.deadline;
                                    if(order.deadline != null) {
                                        var now = new Date();
                                        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
                                        var val = Math.round((order.deadline - now) / 1000 / 60 / 60 / 24);
                                        return val;
                                    }
                                    else return '';
                                }
                            },
                            {
                                name: 'Адресс',
                                getContent: (order) => `${order.info.city.type} ${order.info.city.name}, ${order.info.street}, ${order.info.adds}`
                            }
                    ],
                    url: '/order/',
                    template: 'id',
                    data: orders
                },
                {
                    block: 'pager',
                    attrs: {
                        id: pagerId
                    }
                }]
            },

        ]
    };
};