block('header').content()(function() {
    var ret = {
        block: 'navigator',
        user: this.data.locals.__user
    };

    if(this.data.locals.__user) return ret;
    else return {
        block: 'login-head',
        content: 'Система управления заказами v2.0'
    }
});
