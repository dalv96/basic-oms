modules.define('chat__loader', ['i-bem-dom', 'jquery', 'chat__body', 'BEMHTML'], function(provide, bemDom, $, Chat, BEMHTML) {

provide(bemDom.declElem('chat', 'loader',
    {
        onSetMod: {
            js: {
                inited: function () {
                    $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: `/chat/${this.params.anchor}`,
                        timeout: 5000,
                        context: this,
                        error: function(err) {
                            console.error('Error');
                            bemDom.replace(
                                this.domElem,
                                BEMHTML.apply({
                                    block: 'chat',
                                    elem: 'nt',
                                    content: 'Ошибка загрузки!'
                                })
                            )
                        },
                        success: function(res) {

                            var chat = this.findParentElem(Chat);
                            if(res.length > 0) {
                                var ret = [];

                                res.forEach( item => {
                                    ret.push({
                                        block: 'chat',
                                        elem: 'message',
                                        elemMods:{
                                            mine: item.mine
                                        },
                                        author: item.author,
                                        text: item.text,
                                        time: item.time
                                    })
                                });

                                bemDom.replace(
                                    this.domElem,
                                    BEMHTML.apply(ret)
                                )
                                chat.domElem[0].scrollTop = 9999;
                            } else {
                                bemDom.replace(
                                    this.domElem,
                                    BEMHTML.apply({
                                        block: 'chat',
                                        elem: 'nt',
                                        content: 'Сообщений пока нет'
                                    })
                                )
                            }
                        }
                    })
                }
            }
        }
    },
    {

    })
);

});
