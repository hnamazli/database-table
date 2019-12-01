import './style.scss';
import View from './View';
import Model from './Model';
import Controller from './Controller';

const init = () => {
    const view = new View();
    const model = new Model();
    const controller = new Controller(model, view);
    window.model = model;
}

init();