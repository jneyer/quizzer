var debug = true;

function addBreaks(text) {
    if (!text) {
        return text;
    }
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(?:\r\n|\r|\n)/g, '<br>');
};

function reverseBreaks(text) {
    if (!text) {
        return text;
    }
    return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br>/g, '\n');
};

function sendHttp(operation, url, body, callback, error, http) {

    if (debug) {
        console.log(operation + ":" + url + ":" + JSON.stringify(body));
    }

    http ({
        method: operation,
        url: url,
        data: body
    })
    .success (function (response) {
        if (debug) console.log(JSON.stringify(response));
        if (callback) {
            callback(response);
        }
    })
    .error (function (response) {
        if (error) {
            error(response);
        }
    });
};
