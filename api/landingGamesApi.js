/// API Connection to get list of Trending Games
function TrendingGamesApi() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    return fetch(`${process.env.REACT_APP_BE_URL}/gamelist/trending`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error))
  };


/// API Connection to get list of Popular Games
function PopularGamesApi() {
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

return fetch(`${process.env.REACT_APP_BE_URL}/gamelist/popular`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))
};


/// API Connection to get list of Coming Soon Games
function ComingSoonGamesApi() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    return fetch(`${process.env.REACT_APP_BE_URL}/gamelist/comingsoon`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error))
  };


export {TrendingGamesApi, PopularGamesApi, ComingSoonGamesApi}