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

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }

    personAddtoEnd = (firstName, lastName, age) => {
        let person = this.personConfig(firstName, lastName, age);
        
        this._model.pushPerson(person);

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }

    personAddById = (firstName, lastName, age, id) => {
        let person = this.personConfig(firstName, lastName, age);

        this._model.spliceAddPerson(+id, person);

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }
    
    personRemoveFirst = () => {
        this._model.shiftPerson();

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }

    personRemoveEnd = () => {
        this._model.popPerson();

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }

    personRemoveById = id => {
        this._model.spliceRemovePerson(id);

        let data = this._model.getPersons();

        this._view.clearAllPersons();
        this._view.drawPersons(data);
        this.setLocalStorage(data);
    }

    formatSave = (format) => {
        if (format === 'xml') {
            this.convertToXML(this._model.getPersons());
        }
        if (format === 'csv') {
            this.convertToCSV(this._model.getPersons());
        }
        if (format === 'yaml') {
            this.convertToYAML(this._model.getPersons());
        }
        if (format === 'json') {
            this.convertToJSON(this._model.getPersons());
        }
    }

    formatDownload = (format) => {
        switch (format) {
            case 'xml':
                let convertXML = this.convertToXML(this._model.getPersons());

                this.downloadFile(convertXML, 'xml');
                break;
            case 'csv':
                let convertCSV = this.convertToCSV(this._model.getPersons());

                this.downloadFile(convertCSV, 'csv');
                break;
            case 'yaml':
                let convertYAML = this.convertToYAML(this._model.getPersons());

                this.downloadFile(convertYAML, 'yaml');
                break;
            case 'json':
                let convertJSON = this.convertToJSON(this._model.getPersons());

                this.downloadFile(convertJSON, 'json');
                break;
            default:
                break;
        }
    }

    convertToXML = (data) => {
        let xmlContent = "<?xml version='1.0' encoding='UTF-8'?>\r\n<persons>";

        data.forEach(function (value, index) {
            xmlContent += "\r\t" + "<person>" + "\r\t\t" + "<id>" + (++index) + "</id>" + "\r\n";
            for (let key in value) {
                xmlContent += "\t\t" + "<" + key + ">" + value[key] + "</" + key + ">" + "\r\n";
            }

            xmlContent += "\t" + "</person>"  + "\r\n";
        });

        xmlContent += "</persons>";

        return xmlContent;       
    }

    convertToCSV = (data) => {
        let csvContent = "ID, First Name, Last Name, Age,\r\n";

        data.forEach(function (value, index) {
            csvContent += (++index) + ",";

            for (const key in value) {
                csvContent += value[key] + ",";    
            }
            
            csvContent += "\r\n";
        });

        return csvContent;
    }

    convertToYAML = (data) => {
        let yamlContent = "persons: \n";

        data.forEach(function (value, index) {
            yamlContent += " - " + "id: " + (++index) + "\n";
            for (var key in value) {
                yamlContent += "   ";
                yamlContent += key+": ";

                if (key === "firstName" || key === "lastName") {
                    yamlContent += `\"${value[key]}\"\n`;
                } else {
                    yamlContent += value[key] + "\n";
                }

            }
        });

        return yamlContent;
    }

    convertToJSON = (data) => {
        let jsonContent = "{\n\t\"persons\": [\n";

        data.forEach(function (value, index) {
            jsonContent += "\t\t{\n\t\t\t" + "\"id\": " + "\"" + (++index) + "\"," + "\n";

            for (var key in value) {
                jsonContent += "\t\t\t" + "\"" + key + "\"" + ": " + "\"" + value[key] + "\"";
                if(key === "age") {
                    jsonContent += "\n";
                } else {
                    jsonContent += ",\n";
                }
            }

            if (index === data.length) {
                jsonContent  += "\t\t}\n"
            } else {
                jsonContent += "\t\t},\n";
            }
        });

        jsonContent += "\t]\n}" ;

        return jsonContent;
    }

    setLocalStorage = (data) => {
        let jsonData = this.convertToJSON(data);

        localStorage.setItem('Persons', jsonData);
    }

    downloadFile = (data, format) => {

        let filename = "persons." + format;
        let link = document.createElement('a');
        let bb = new Blob([data], {type: 'text/'+ format});

        link.setAttribute('href', window.URL.createObjectURL(bb));
        link.setAttribute('download', filename);

        link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
        
        link.click();
    }
}

export default Controller;