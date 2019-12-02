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

        if (format === 'xml') {
            this.convertToXML(this._model.getPersons(), 'download');
        }
        if (format === 'csv') {
            this.convertToCSV(this._model.getPersons(), 'download');
        }
        if (format === 'yaml') {
            this.convertToYAML(this._model.getPersons(), 'download');
        }
        if (format === 'json') {
            this.convertToJSON(this._model.getPersons(), 'download');
        }
    }

    convertToXML = (rows, action) => {
        let xmlContent = "<?xml version='1.0' encoding='UTF-8'?>\r\n";
        xmlContent += "<persons>";

        rows.forEach(function (value, index) {
            xmlContent += "\r\t" + "<person>" + "\r\t\t" + "<id>" + (index + 1) + "</id>" + "\r\n";
            for (let key in value) {
                xmlContent += "\t\t" + "<" + key + ">" + value[key] + "</" + key + ">" + "\r\n";
            }

            xmlContent += "\t" + "</person>"  + "\r\n";
        });

        xmlContent += "</persons>";

        if (action === 'download') {
            this.downloadFile(xmlContent, 'xml');
        } else {
            //save
        }
       
    }

    convertToCSV = (rows, action) => {
        let csvContent = "";

        rows.forEach(function (value, index) {
            csvContent += index + 1 + ",";

            for (const key in value) {
                csvContent += value[key] + ",";    
            }
            
            csvContent += "\r\n";
        });

        if (action === 'download') {
            this.downloadFile(csvContent, 'csv');
        } else {
            //save
        }
    }

    convertToYAML = (rows, action) => {
        let yamlContent = "persons: \n"
        let row = "";
        rows.forEach(function (value, index) {
            row += " - " + "id: " + index + 1 + "\n";
            for (var key in value) {
                row += "   ";
                row += key+": ";

                if (key === "firstName" || key === "lastName") {
                    row += `\"${value[key]}\"\n`;
                } else {
                    row += value[key] + "\n";
                }

            }
        });
        
        yamlContent += row;

        if (action === 'download') {
            this.downloadFile(yamlContent, 'yaml');
        } else {
            //save
        }
    }

    convertToJSON = (rows, action) => {
        let jsonContent = "{\n\t\"persons\": [\n";

        rows.forEach(function (value, index) {
            jsonContent += "\t\t{\n\t\t\t" + "\"id\": " + "\"" + ++index + "\"," + "\n";

            for (var key in value) {
                jsonContent += "\t\t\t" + "\"" + key + "\"" + ": " + "\"" + value[key] + "\"";
                if(key === "age") {
                    jsonContent += "\n";
                } else {
                    jsonContent += ",\n";
                }
            }

            if (index === rows.length) {
                jsonContent  += "\t\t}\n"
            } else {
                jsonContent += "\t\t},\n";
            }
        });

        jsonContent += "\t]\n}" ;

        if (action === 'download') {
            this.downloadFile(jsonContent, 'json');
        }
    }

    downloadFile = (text, format) => {

        let filename = "persons." + format;
        let pom = document.createElement('a');
        let bb = new Blob([text], {type: 'text/'+ format});

        pom.setAttribute('href', window.URL.createObjectURL(bb));
        pom.setAttribute('download', filename);

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
        
        pom.click();
    }

    saveFile = () => {

    }
    
}

window.rest = rest; //for tests

export default Controller;