module.exports = function(opt, data) {

    return {
        view: 'page-index',
        title: 'Инициация заказа',
        meta: {
            description: 'Страница инициации заказа',
            og: {
                url: 'https://suz.miranda-media.ru',
                siteName: 'СУЗ 2.0'
            }
        },
        page: [
            {
                block: 'title',
                mods: {
                    lvl: 3,
                    position: 'center'
                },
                content: 'Инициация заказа'
            },
            {
                block: 'wrap',
                elem: 'order',
                content: {
                    block: 'order',
                    action: `/init`,
                    order: opt.order,
                    tab: 'init',
                    user: data.__user,
                    dataset: data.dataset
                }
            }

        ]
    }
};
