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

        if (action === 'byId') {
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
        let data = '';

        switch (format) {
            case 'xml':
                data = this.convertToXml(this._model.getPersons());
                this.getDown(data, format);

                break;
            case 'csv':
                data = this.convertToCsv(this._model.getPersons());
                this.getDown(data, format);

                break;
            case 'yaml':
                console.log('Hello YAML');
                break;
            case 'json':
                console.log('Hello JSON');
                break;
            default:
                break;
        }
    }
    
    convertToXml = (rows) => {
        let xml = "<?xml version='1.0' encoding='UTF-8'?>\r\n";
        xml += "<persons>";

        rows.forEach(function (value, index) {
            xml += "\r\t" + "<person>" + "\r\t\t" + "<id>" + (index + 1) + "</id>" + "\r\n";
            for (let key in value) {
                xml += "\t\t" + "<" + key + ">" + value[key] + "</" + key + ">" + "\r\n";
            }

            xml += "\t" + "</person>"  + "\r\n";
        });

        xml += "</persons>";

        return xml;
    }

    convertToCsv = (rows) => {
        let csvContent = "";

        rows.forEach(function (value, index) {
            csvContent += index + 1 + ",";

            for (const key in value) {
                csvContent += value[key] + ",";    
            }
            
            csvContent += "\r\n";
        });

        return csvContent;
    }
    
    getDown = (data, ext) => {
        let fileName = "persons." + ext;
        let link = document.createElement('a');
        let bb = new Blob([data], {type: 'text/' + ext});

        link.setAttribute('href', window.URL.createObjectURL(bb));
        link.setAttribute('download', fileName);

        link.dataset.downloadUrl = ['text/plain', link.download, link.href].join(':');

        link.click();
    }
}

window.rest = rest; //for tests

export default Controller;