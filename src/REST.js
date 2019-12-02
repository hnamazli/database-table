export const sendGet = (cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:2019/persons');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.response;
            cb && (cb(data));
        }
    };
    xhr.send();
}

export const sendPut = function(data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:2019/persons');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.response;
            cb && (cb(data));

        };
    }
    xhr.send(JSON.stringify(data));
}

export const sendPost = function(data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:2019/persons');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.response;
            cb && (cb(data));
        };
    }
    xhr.send(JSON.stringify(data));
}