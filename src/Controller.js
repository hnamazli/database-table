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
        console.log(action);
        console.log(firstName);
        console.log(lastName);
        console.log(age);

        
        
    }
}

window.rest = rest; //for tests

export default Controller;