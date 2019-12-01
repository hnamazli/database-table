//import {sendGet, sendPut} from './REST';
import * as rest from './REST'; //for tests

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.onButtonAdding(this.personAdding.bind(this));
        this._view.onButtonRemoving(this.personRemoving.bind(this));

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

    personRemoving = (action, firstName, lastName, age, id) => {

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
}

window.rest = rest; //for tests

export default Controller;