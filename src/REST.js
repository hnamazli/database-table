//'http://localhost:2019/persons'
export const sendGet = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            cb && (cb(data));
        }
    };
    xhr.send();
}

export const sendPut = function(url, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            cb && (cb(data));
        };
    }
    xhr.send(JSON.stringify(data));
}

export const sendPost = function(url, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.response);
            cb && (cb(data));
        };
    }
    xhr.send(JSON.stringify(data));
}


