import * as constants from './constants';

class View {
    constructor() {
        this._root = document.getElementById('root');

        this.init();
    }

    init = () => {
        const wrapper = this.createDiv(['wrapper', 'container-fluid']);
        const wrapperTop = this.createDiv(['wrapper__top', 'row']);
        const topTable = this.createDiv(['top__table-wrapper', 'col-8']);
        const topController = this.createDiv(['top__controller', 'col-4']);
        const controllerInput = this.createDiv(['controller__input']);
        const inputDiv = this.createDiv(['form-group', 'input__div']);
        const controllerButtons = this.createDiv(['controller__buttons']);
        const buttonAdding = this.createDiv(['buttons__adding']);
        const buttonRemoves = this.createDiv(['buttons__removing']);
        const wrapperBottom = this.createDiv(['wrapper__bottom']);
        const bottomDownload = this.createDiv(['bottom__download']);
        const bottomSave = this.createDiv(['bottom__save']);

        const table = this.createTable();
        
        const inputID = this.createInput('inputID', ['form-control'], 'ID', 'number');
        const inputFirstName = this.createInput('firstName', ['form-control'], 'First Name');
        const inputLastName = this.createInput('lastName', ['form-control'], 'Last Name');
        const inputAge = this.createInput('age', ['form-control'], 'Age', 'number');

        const buttonAddFirst = this.createButton('addToFirst', 'Add to first');
        const buttonRemoveFirst = this.createButton('removeToFirst', 'Remove to first');
        const buttonAddEnd = this.createButton('addToEnd', 'Add to end');
        const buttonRemoveEnd = this.createButton('removeToEnd', 'Remove to end');
        const buttonAddById = this.createButton('addByID', 'Add by ID');
        const buttonRemoveById = this.createButton('removeByID', 'Remove by ID');

        const buttonDownloadXML = this.createButton('downXML', 'Download XML');
        const buttonDownloadCSV = this.createButton('downCSV', 'Download CSV');
        const buttonDownloadYAML = this.createButton('downYAML', 'Download YAML');
        const buttonDownloadJSON = this.createButton('downJSON', 'Download JSON');

        const buttonSaveXML = this.createButton('saveXML', 'Save XML');
        const buttonSaveCSV = this.createButton('saveCSV', 'Save CSV');
        const buttonSaveYAML = this.createButton('saveYAML', 'Save YAML');
        const buttonSaveJSON = this.createButton('saveJSON', 'Save JSON');

        wrapper.append(wrapperTop);
        wrapper.append(wrapperBottom);
        wrapperTop.append(topTable);
        wrapperTop.append(topController);
        topTable.append(table);
        topController.append(controllerInput);
        topController.append(controllerButtons);
        controllerInput.append(inputDiv);
        inputDiv.append(inputFirstName);
        inputDiv.append(inputLastName);
        inputDiv.append(inputAge);
        inputDiv.append(inputID);
        controllerButtons.append(buttonAdding);
        controllerButtons.append(buttonRemoves);
        buttonAdding.append(buttonAddFirst);
        buttonRemoves.append(buttonRemoveFirst);
        buttonAdding.append(buttonAddEnd);
        buttonRemoves.append(buttonRemoveEnd);
        buttonAdding.append(buttonAddById);
        buttonRemoves.append(buttonRemoveById);
        wrapperBottom.append(bottomDownload);
        wrapperBottom.append(bottomSave);
        bottomDownload.append(buttonDownloadXML);
        bottomDownload.append(buttonDownloadCSV);
        bottomDownload.append(buttonDownloadYAML);
        bottomDownload.append(buttonDownloadJSON);
        bottomSave.append(buttonSaveXML);
        bottomSave.append(buttonSaveCSV);
        bottomSave.append(buttonSaveYAML);
        bottomSave.append(buttonSaveJSON);
      
        this._root.append(wrapper);
    }

    createDiv = classes => {
        const div = document.createElement('div');

        if (classes) {
            div.classList.add(...classes);
        }

        return div;
    }

    createInput = (id, classes, placeholder, type = 'text') => {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.placeholder = placeholder;
        
        if (id) {
            input.id = id;
        }

        if (classes) {
            input.classList.add(...classes);
        }

        return input;
    }

    createButton = (id, name) => {
        const button = document.createElement("button");
        button.id = id;
        button.textContent = name;
        
        return button;
    }

    createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table-wrapper__table', 'table');

        const tableThead = document.createElement('thead');
        tableThead.classList.add('table-thead', 'thead-light');

        const theadTr = document.createElement('tr');

        constants.HEADERS.forEach(element => {
            const th = document.createElement('th');
            th.innerText = element;

            theadTr.append(th);
        });

        tableThead.append(theadTr);
        table.append(tableThead);

        return table;
    }

    drawPersons = persons => {
        const tbody =  document.createElement('tbody');
        tbody.id = 'tbody';

        const table = document.querySelector('.table-wrapper__table');

        persons.forEach((element, index) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerText = ++index;

            tbody.append(tr);
            tr.append(th);
            
            for (var key in element) {
                const th = document.createElement('th');
                th.innerText = element[key];

                tr.append(th);
            }
        });

        table.append(tbody);
    }
    
    clearAllPersons = () => {
        let personsTable = document.getElementById('tbody');
        personsTable.remove();
    }

    onButtonAdding = cb => { // собирает данные для добавление в таблицу
       
        addToFirst.onclick = () => {
            if (firstName.value == '' || lastName.value == '' || age.value == '') {
                alert('Please fill in the correct form all cells.');
            } else {
                let action = 'tofirst'; //куда добавить элемент
                cb(action, firstName.value, lastName.value, age.value);
                  
                firstName.value = '';
                lastName.value = '';
                age.value = '';
                inputID.value = '';
            }     
        };

        addToEnd.onclick = () => {
            if (firstName.value == '' || lastName.value == '' || age.value == '') {
                alert('Please fill in the correct form all cells.');
            } else {
                let action = 'toend'; //куда добавить элемент
              
                cb(action, firstName.value, lastName.value, age.value);
                  
                firstName.value = '';
                lastName.value = '';
                age.value = '';
                inputID.value = '';
            }     
        };

        addByID.onclick = () => {
            if (firstName.value == '' || lastName.value == '' || age.value == '') {
                alert('Please fill in the correct form all cells.');
            } else {
                let action = 'byId'; //куда добавить элемент
              
                cb(action, firstName.value, lastName.value, age.value, inputID.value);
                  
                firstName.value = '';
                lastName.value = '';
                age.value = '';
                inputID.value = '';
            }     
        };

    }

    onButtonRemoving = cb => { //для удаления 
    
        removeToFirst.onclick = () => {
            let action = 'tofirst'; //откуда удалить элемент
            cb(action);
              
        };

        removeToEnd.onclick = () => {
            let action = 'toend';
            cb(action, firstName.value, lastName.value, age.value);
              
        };

        removeByID.onclick = () => {
            if (inputID.value == ''){
                alert('Please fill in the correct form all cells.');
            } else {
                let action = 'byid';
                cb(action, inputID.value);
            }
              
        };

    }
    
    onButtonSave = cb => {

        saveXML.onclick = () => {
            let format = 'xml';

            cb(format);
        }

        saveCSV.onclick = () => {
            let format = 'csv';
            
            cb(format);
        }

        saveYAML.onclick = () => {
            let format = 'yaml';
            
            cb(format);
        }

        saveJSON.onclick = () => {
            let format = 'json';
            
            cb(format);
        }
    }

    onButtonDownload = cb => {
        downXML.onclick = () => {
            let format = 'xml';

            cb(format);
        }

        downCSV.onclick = () => {
            let format = 'csv';

            cb(format);
        }

        downYAML.onclick = () => {
            let format = 'yaml';

            cb(format);
        }

        downJSON.onclick = () => {
            let format = 'json';

            cb(format);
        }
    }
}

export default View;