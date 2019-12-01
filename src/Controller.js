//import {sendGet, sendPut} from './REST';
import * as rest from './REST'; //for tests

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.OnbuttonAdding(this.personAdding.bind(this));

        this._view.drawPersons(this._model.getPersons());
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

    personAddById= (firstName, lastName, age, id) => {
        let person = this.personConfig(firstName, lastName, age);

        this._model.splicePerson(person, +id, 0);

        this._view.clearAllPersons();
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
}

window.rest = rest; //for tests

export default Controller;