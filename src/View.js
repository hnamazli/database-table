import * as constants from './constants';
import Controller from './Controller';

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
        
        /////////////////////////////////////////////////////////////////////////
        const topController = document.createElement('div');
        topController.classList.add('top__controller');
        topController.classList.add('col-4');
        /////////////////////////////////////////////////////////////////////////
        const controllerInput = document.createElement('div'); ////див для вводов
        controllerInput.classList.add('controller__input');

        const controllerButtons = document.createElement('div'); //для кнопок 
        controllerButtons.classList.add('controller__buttons');

        const buttonAdding = document.createElement('div');
        buttonAdding.classList.add('buttons__adding');

        const buttonRemoves = document.createElement('div');
        buttonRemoves.classList.add('buttons__removing');
        ///////////////////////////////////////////////////////////////////INPUTS
        
        const inputId = document.createElement("INPUT");
        inputId.setAttribute("type", "text");
        inputId.id = 'inputId';
        inputId.placeholder="Id"

        const inputFirstName = document.createElement("INPUT");
        inputFirstName.setAttribute("type", "text");
        inputFirstName.id = 'inputFirstName';
        inputFirstName.placeholder="First Name"

        const inputLastName = document.createElement("INPUT");
        inputLastName.setAttribute("type", "text");
        inputLastName.id = 'inputLastName';
        inputLastName.placeholder="Last Name"

        const inputAge = document.createElement("INPUT");
        inputAge.setAttribute("type", "text");
        inputAge.id = 'inputAge';
        inputAge.placeholder="Age"

        //this.createInput('inputId');

        ///////////////////////////////////////////////////////////////////BUTTONS
        const buttonAddFirst = document.createElement("BUTTON");
        buttonAddFirst.id = 'buttonAddFirst';
        buttonAddFirst.textContent = '+ First'

        const buttonRemoveFirst = document.createElement("BUTTON");
        buttonRemoveFirst.id = 'buttonRemoveFirst';
        buttonRemoveFirst.textContent = '- First'

        const buttonAddEnd = document.createElement("BUTTON");
        buttonAddEnd.id = 'buttonAddEnd';
        buttonAddEnd.textContent = '+ End';

        const buttonRemoveEnd = document.createElement("BUTTON");
        buttonRemoveEnd.id = 'buttonRemoveEnd';
        buttonRemoveEnd.textContent = '- End';

        const buttonAddById = document.createElement("BUTTON");
        buttonAddById.id = 'buttonAddById';
        buttonAddById.textContent = '+ Id';

        const buttonRemoveById = document.createElement("BUTTON");
        buttonRemoveById.id = 'buttonRemoveById';
        buttonRemoveById.textContent = '- Id';

        ////////////////////////////////////////////////////////////////////////////
        const wrapperBottom = document.createElement('div');
        wrapperBottom.classList.add('wrapper__bottom');

        wrapper.append(wrapperTop);
        wrapper.append(wrapperBottom);

        wrapperTop.append(topTable);
        wrapperTop.append(topController);

        table.append(tableThead);
        topTable.append(table);
        tableThead.append(theadTr);
       
        topController.append(controllerInput);
        topController.append(controllerButtons);

        controllerInput.append(inputFirstName);
        controllerInput.append(inputLastName);
        controllerInput.append(inputAge);
        controllerInput.append(inputId);
        
        controllerButtons.append(buttonRemoves);
        controllerButtons.append(buttonAdding);

        buttonAdding.append(buttonAddFirst);
        buttonRemoves.append(buttonRemoveFirst);
        buttonAdding.append(buttonAddEnd);
        buttonRemoves.append(buttonRemoveEnd);
        buttonAdding.append(buttonAddById);
        buttonRemoves.append(buttonRemoveById);
      
        this._root.append(wrapper);

    }
    //createElementInput //тут будет разбиение на функции createElement(название)

    // createInput = id => {
    //     let input = document.createElement("INPUT");
    //     input.setAttribute("type", "text");
    //     input.id = id;
    //     return input;
    // }

    drawPersons = persons => {
        const tbodyTr =  document.createElement('tbody');
        const tableThead = document.querySelector('.table-wrapper__table');
        tbodyTr.id = 'tbody';

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
    
    //this.clearAllPersons(); //чистит перед отрисовкой 
    clearAllPersons = () => {
        let personsWrapper = document.getElementById('tbody');
        personsWrapper.remove();
    }
    
    checkInputs = () => {
        let id = getElementById('inputId');
        let FirstName = getElementById('inputFirstName');
        let LastName = getElementById('inputLastName');
        let Age = getElementById('inputAge');
    }
    
}

export default View;