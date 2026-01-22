export async function httpRequest(url, method, body) {
    const response = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const result = await response.json();
    return result;
};

export default httpRequest;