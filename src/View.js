class View {
    constructor() {
        this._root = document.getElementById('root');
        this._first = this.createInput('first');
        this._second = this.createInput('second');
        this._result = this.createInput('result');
        this._result.readOnly = true;

        this._root.append(this._first);
        this._root.append(this._second);
        this._result.append(his._result);
    }

    
}