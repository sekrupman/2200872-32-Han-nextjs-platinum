/// API Connection to get list of game
function gameListApi() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_BE_URL}/gamelist/get`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export { gameListApi };

