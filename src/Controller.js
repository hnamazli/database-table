class Controller {

    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._view.drawPersons(this._model.getPersons());
    }


}

export default Controller;