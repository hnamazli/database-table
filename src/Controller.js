//import {sendGet, sendPut} from './REST';
import * as rest from './REST'; //for tests
import Model from "./Model";

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.drawPersons(this._model.getPersons());
    }
}

window.rest = rest; //for tests

export default Controller;