import Task from "./models/task";

const checkStatus = (response) => { 
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error("Invalid status code: " + response.status);
    }
}

const Method = {
    POST: `POST`,
    DELETE: `DELETE`,
    GET: `GET`,
    PUT: `PUT`,
    DELETE: `DELETE`,
};

export const API = class {
    constructor(endPoint, autorization) {
        this._endPoint = endPoint;
        this._autorization = autorization;
    }

    getTasks() { 
        return this._load({url: `tasks`})
        .then((response) => response.json())
        .then(Task.parseTasks);
    }

    _load({url, method = Method.GET, body = null, headers = new Headers()}) { 
        headers.append(`Authorization`, this._autorization);

        return fetch(`${this._endPoint}/${url}`, {method, body, headers})
            .then(checkStatus)
            .catch((error) => {
                throw error;
            })
    }

    createTask(task) { 
        return this._load({
            url: `tasks`,
            method: Method.POST,
            body: json.stringify(task.toRaw()),
            headers: new Headers({"Content-Type": `application/json`})
        })
            .then((response) => response.json())
            .then(Task.parseTasks);
    }

    deleteTask(id) { 
        return this._load({url: `tasks/${id}`, method: Method.DELETE})
    }

    updateTask(id, data) { 
        this._load({
            url: `tasks/${id}`,
            method: Method.PUT,
            body: JSON.stringify(data.toRaw()),
            headers: new Headers({"Content-Type": "application/json"})
        })
            .then((response) => response.json())
            .then(Task.parseTask);
    }
};

