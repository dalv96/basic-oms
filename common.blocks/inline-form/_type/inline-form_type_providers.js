modules.define(
    'inline-form',
    ['select', 'input'],
    function(provide, Select, Input, BEMDOM) {

provide(BEMDOM.declMod({ modName : 'type', modVal : 'providers' }, {

    _validate: function() {
        var select = this.findChildElem('provider-type'),
            inputName = this.findChildElem('provider-name'),
            inputVal,
            err = false;

        this._errorText = '';

        if (!(select && inputName)) {
            this._errorText = 'Что-то пошло не так...';
            return;
        }

        select = select.findMixedBlock(Select);
        inputName = inputName.findMixedBlock(Input);

        if (!(select && inputName)) {
            this._errorText = 'Что-то пошло не так...';
            return;
        }

        if (['СТОП', 'VSAT'].indexOf(select.getVal()) == -1)
        {
            select.setMod('errored');
            this._errorText += 'Ошибка выбора типа провайдера\n';
            err = true
        }

        inputVal = inputName.getVal();

        if (inputVal.length <= 0 || inputVal.length >= 100)
        {
            inputName.setMod('errored');
            this._errorText += 'Название провайдера не может быть пустым или длиннее 100 символов\n';
            err = true
        }

        if (!err)
            return {
                type: select.getVal(),
                name: inputName.getVal()
            }
    }
},
{}));

});
