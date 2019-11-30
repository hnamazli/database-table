class Model {
    constructor() {
        this._persons = [];
    }

    addPush = (arg) => {
        this._persons.push(arg);
    }

    addUnshift = (arg) => {
        this._persons.unshift(arg);
    }

    addSplice = (arg) => {
        this._persons.splice(arg);
    }

    doPop = (arg) => {
        this._persons.pop(arg);
    }

    doShift = (arg) => {
        this._persons.shift(arg);
    }

    doSplice = (arg) => {
        this._persons.splice(arg);
    }

}

exports default Model;