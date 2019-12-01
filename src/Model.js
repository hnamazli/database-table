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

    setPersons = (array) => {
        
    }
    
}

export default Model;