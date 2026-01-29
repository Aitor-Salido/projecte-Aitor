export async function httpRequest(url, method, body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    return response.json();
};

export default httpRequest;