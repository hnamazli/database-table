class Model {
    constructor() {

    }
}

let persons = [];
console.log(Array.isArray(persons));
let newPersons

function addFirst() {
    newPersons = document.getElementsByTagName("input")[0].value;
    persons.unshift( newPersons );
    document.getElementById("persons").innerHTML = persons;
}
function addLast() {
    newPersons = document.getElementsByTagName("input")[0].value;
    persons.push( newPersons );
    document.getElementById("persons").innerHTML = persons;
