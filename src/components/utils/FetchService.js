function ajax(url, requestMethod, jwt, requestBody) {

    const fetchData = {
        headers: {
            "content-type": "application/json"
        },
        method: requestMethod,
    };
    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;  //может не сработать
    }
    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }
    return fetch(url, fetchData).then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 401) {
            localStorage.clear()
            window.location.href='/';
        }
    });
}


export default ajax;