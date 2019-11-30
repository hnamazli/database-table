class Model {
    constructor() {
        this._persons = [
            { fName: String,
              lName: String,
              age: number,
            }
          ];
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

    dosSlice = (arg) => {
        this._persons.slice(arg);
    }

}

exports default Model;