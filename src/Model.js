class Model {

    constructor() {
        this._persons = [

        ];
    }
    
    getPersons = () => {
        return [...this._persons];
    }
    
    unshiftPerson = person => {
        this._persons.unshift(person);
    }

    shiftPerson = () => {
        this._persons.shift();
    }

    pushPerson = person => {
        this._persons.push(person);
    }
    
    popPerson = () => {
        this._persons.pop();
    }

    spliceAddPerson = (id, person) => {
        this._persons.splice(id - 1, 0, person);
    }

    spliceRemovePerson = (id) => {
        this._persons.splice(id - 1, 1);
    }

}


export default Model;