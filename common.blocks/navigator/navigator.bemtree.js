block('navigator').content()(function() {
    var nav = [
        {
            block: 'link',
            content: 'Главная',
            mods: {
                theme: 'islands'
            },
            mix: 'navigator__link',
            url: '/'
        },
        {
            block: 'link',
            content: 'Поиск заявок',
            mods: {
                theme: 'islands'
            },
            mix: 'navigator__link',
            url: '/search'
        },
        {
            block: 'link',
            content: 'Статус',
            mods: {
                theme: 'islands'
            },
            mix: 'navigator__link',
            url: '/status'
        },
        {
            block: 'link',
            content: 'Разработка',
            mods: {
                theme: 'islands'
            },
            mix: 'navigator__link',
            url: '/dev'
        }
    ];

    var end = [
        {
            block: 'link',
            content: 'Выйти',
            mods: {
                theme: 'islands'
            },
            mix: ['navigator__link', 'navigator__right'],
            url: '/logout'
        },
        {
            block: 'link',
            content: '[' + this.data.locals.__user.login + ']',
            mods: {
                theme: 'islands'
            },
            mix: ['navigator__link', 'navigator__right'],
            url: '/profile'
        }
    ]

    if(this.data.locals.__user.department.type == 'admin') {
        nav.push({
            block: 'dropdown',
            mods: {
                switcher: 'link',
                theme: 'islands',
                size: 'm'
            },
            mix: 'navigator__link',
            switcher: 'Администрирование',
            popup: [
                {
                    block: 'link',
                    content: 'Учетные записи',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/users'
                },
                {
                    block: 'link',
                    content: 'Отделы',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/departments'
                },
                {
                    block: 'link',
                    content: 'Адреса',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/cities'
                },
                {
                    block: 'link',
                    content: 'Клиенты',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/clients'
                },
                {
                    block: 'link',
                    content: 'Типы клиентов',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/client-types'
                },
                {
                    block: 'link',
                    content: 'Провайдеры',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/providers'
                },
                {
                    block: 'link',
                    content: 'Услуги',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/services'
                },
                {
                    block: 'link',
                    content: 'Выходные',
                    mods: {
                        theme: 'islands'
                    },
                    mix: {
                        block: 'navigator',
                        elem: 'dropdown'
                    },
                    url: '/admin/holiday'
                }
            ]
        })
    }

    nav.push(end);
    return nav;

})
