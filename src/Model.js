class Model {

    constructor() {
        this._persons = [
            {
                firstName: 'Musa',
                lastName: 'Xudiyev',
                age: 25
            },
            {
                firstName: 'Azad',
                lastName: 'Kicikbekov',
                age: 15
            }
        ];
    }

    getPersons = () => {
        return [...this._persons];
    }
    
    unshiftPerson = person => {
        this._persons.unshift(person);
    }

    pushPerson = person => {
        this._persons.push(person);
    }
    
    splicePerson = (person, id, action) => {
        this._persons.splice(id-1, action, person);
    }

}


export default Model;