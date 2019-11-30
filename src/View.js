class View {
    constructor() {
        this._root = document.getElementById('root');
        this._test = document.createElement('table');
        this._test.classList.add('table');
        this._test.innerHTML = '<thead class="thead-light"><tr><th>First</th></tr></thead>';

        this._root.append(this._test);
    }

    
}

export default View;