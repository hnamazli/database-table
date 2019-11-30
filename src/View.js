import * as constants from './constants';

class View {
    constructor() {
        this._root = document.getElementById('root');

        this.init();
    }

    init = () => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const wrapperTop = document.createElement('div');
        wrapperTop.classList.add('wrapper__top');
        wrapperTop.classList.add('row');

        const topTable = document.createElement('div');
        topTable.classList.add('top__table-wrapper');
        topTable.classList.add('col-8');

        const table = document.createElement('table');
        table.classList.add('table-wrapper__table');
        table.classList.add('table');

        const tableThead = document.createElement('thead');
        tableThead.classList.add('table-thead');
        tableThead.classList.add('thead-light');

        const theadTr = document.createElement('tr');

        constants.HEADERS.forEach(element => {
            const th = document.createElement('th');
            th.innerText = element;

            theadTr.append(th);
        });

        const topController = document.createElement('div');
        topController.classList.add('top__controller');
        topController.classList.add('col-4');

        const wrapperInput = document.createElement('div');
        wrapperInput.classList.add('controller__input');

        const inputID = document.createElement('input');
        inputID.setAttribute('type', 'number');
        inputID.setAttribute('placeholder', 'ID');
        inputID.setAttribute('id', 'id');
        inputID.classList.add('form-control');

        const inputFname = document.createElement('input');
        inputFname.setAttribute('type', 'text');
        inputFname.setAttribute('placeholder', 'First name');
        inputFname.setAttribute('id', 'fname');
        inputFname.classList.add('form-control');

        const inputLname = document.createElement('input');
        inputLname.setAttribute('type', 'text');
        inputLname.setAttribute('placeholder', 'Last name');
        inputLname.setAttribute('id', 'lname');
        inputLname.classList.add('form-control');

        const inputAge = document.createElement('input');
        inputAge.setAttribute('type', 'text');
        inputAge.setAttribute('placeholder', 'Age');
        inputAge.setAttribute('id', 'age');
        inputAge.classList.add('form-control');

        const wrapperButtons = document.createElement('div');
        wrapperButtons.classList.add('controller__buttons');

        const wrapperBottom = document.createElement('div');
        wrapperBottom.classList.add('wrapper__bottom');

        wrapper.append(wrapperTop);
        wrapperTop.append(topTable);
        topTable.append(table);
        table.append(tableThead);
        tableThead.append(theadTr);
        topController.append(wrapperInput);
        wrapperInput.append(inputID);
        wrapperInput.append(inputFname);
        wrapperInput.append(inputLname);
        wrapperInput.append(inputAge);
        topController.append(wrapperButtons);
        wrapperTop.append(topController);
        wrapper.append(wrapperBottom);

        this._root.append(wrapper);
    }

    drawPersons = persons => {
        const tbodyTr =  document.createElement('tbody');
        const tableThead = document.querySelector('.table-wrapper__table');

        persons.forEach((element, index) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerText = index + 1;

            tbodyTr.append(tr);
            tr.append(th);
            
            for (var key in element) {
                const th = document.createElement('th');
                th.innerText = element[key];

                tr.append(th);
            }
        });

        tableThead.append(tbodyTr);
    }

}

export default View;