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

/// API Connection to get leaderboard of game
function leaderboardGameApi(gameId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_BE_URL}/gamelist/leaderboard/${gameId}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export { gameListApi, leaderboardGameApi};

