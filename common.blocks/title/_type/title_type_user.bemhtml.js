block('title').mod('type', 'user')(
    tag()('h3'),
    content()(function () {
        var text = {
            create: 'Создание пользователя',
            edit: 'Редактирование пользователя',
            profile: 'Редактирование профиля'
        };
        return text[this.ctx.type];
    })
)