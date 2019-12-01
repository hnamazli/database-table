//import {sendGet, sendPut} from './REST';
import * as rest from './REST'; //for tests

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.onButtonAdding(this.personAdding);
        this._view.onButtonRemoving(this.personRemoving);
        this._view.onButtonSave(this.formatSave);
        this._view.onButtonDownload(this.formatDownload);

        this._view.drawPersons(this._model.getPersons());
    }

    personConfig = (firstName, lastName, age) => {
        let person =  {
              firstName: firstName,
              lastName: lastName,
              age: age
          }
          return person;
    }

    personAdding = (action, firstName, lastName, age, id) => {

        if (action === 'tofirst') {
            this.personAddtoFirst(firstName, lastName, age);
        }

        if (action === 'toend') {
            this.personAddtoEnd(firstName, lastName, age);
        }

        if (action === 'byid') {
            this.personAddById(firstName, lastName, age, id);
        }

    }

    personRemoving = (action, id) => {

        if (action === 'tofirst') {
            this.personRemoveFirst();
        }

        if (action === 'toend') {
            this.personRemoveEnd();
        }

        if (action === 'byid') {
            this.personRemoveById(id);
        }

    }

    personAddtoFirst = (firstName, lastName, age) => {
        let person = this.personConfig(firstName, lastName, age);

        this._model.unshiftPerson(person);


        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }

    personAddtoEnd = (firstName, lastName, age) => {
        let person = this.personConfig(firstName, lastName, age);

        this._model.pushPerson(person);


        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }

    personAddById = (firstName, lastName, age, id) => {
        let person = this.personConfig(firstName, lastName, age);

        this._model.spliceAddPerson(+id, person);

        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }
    
    personRemoveFirst = () => {
        this._model.shiftPerson();

        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }

    personRemoveEnd = () => {
        this._model.popPerson();

        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }

    personRemoveById = id => {
        this._model.spliceRemovePerson(id);

        this._view.clearAllPersons();
        this._view.drawPersons(this._model.getPersons());
    }

    formatSave = (format) => {
        
    }

    formatDownload = (format) => {
        if (format === 'xml') {
            this.convertToXml(this._model.getPersons());
        }
        if (format === 'csv') {
            
        }
        if (format === 'yaml') {
            
        }
        if (format === 'json') {
            
        }
    }
    
    convertToXml = (rows) => {
        let a = "<persons>";
        let row = "";

        rows.forEach(function (value, index) {
            row += "\r\t" + "<person>" + "\r\n";
            for (let key in value) {
                row += "\t\t" + "<" + key + ">" + value[key] + "</" + key + ">" + "\r\n";
            }

            row += "\t" + "</person>"  + "\r\n";
        });

        a += row + "</persons>";

        let xmltext = a;

        let filename = "file.xml";
        let pom = document.createElement('a');
        let bb = new Blob([xmltext], {type: 'text/plain'});

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');

        pom.classList.add('xml__file');
    }
    
}

window.rest = rest; //for tests

export default Controller;