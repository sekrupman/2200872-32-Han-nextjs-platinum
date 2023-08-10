import React , {useState, useEffect} from "react";
import {Card, CardBody, CardTitle} from 'reactstrap';

//import api
import { PopularGamesApi } from '../../api/landingGamesApi';

// import styles
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

// use dummy data in case the server is error
const gameList = [
    {
        gameid:-1,
        game_name: "Mini Football",
        game_url: "minifootball",
        game_image_url: "https://drive.google.com/uc?export=view&id=15aVwrLkByle80O40XH4tA7o3JsvAv8hR"
    },
    {
        gameid:-2,
        game_name: "Basketball Stars",
        game_url: "basketballstars",
        game_image_url: "https://drive.google.com/uc?export=view&id=1SBt4IwrJRbeQb3vBcVc5ZpuDBVbEKc43"
    },
    {
        gameid:-3,
        game_name: "Mini Militia",
        game_url: "minimilitia",
        game_image_url: "https://drive.google.com/uc?export=view&id=1djK1wysUvSKxB0s76UJVzEY4JG6NrVrg"
    },
    {
        gameid:-4,
        game_name: "Sniper Strike",
        game_url: "sniperstrike",
        game_image_url: "https://drive.google.com/uc?export=view&id=1cVqjFSkWmj82YZrhfOMv87ysLmt0Fh4c"
    },
    {
        gameid:-5,
        game_name: "Ultimate Golf",
        game_url: "ultimategolf",
        game_image_url: "https://drive.google.com/uc?export=view&id=10KBDwd32YbgMuPzxaS8kZJJBTGwd8LOd"
    }
  ];

function PopularGames(){
    // get data of game
    const [ popularData, setPopularData ] = useState({ data: gameList });
    useEffect(() => {
        try {
            PopularGamesApi().then((result) => {   
                if (!result) {
                    setPopularData({data: gameList})
                } else {
                    const length = result.data.length
                    if (length < 5) {
                        setPopularData({data: [...result.data, gameList.slice(0,5-length)]})
                    } else {
                        setPopularData({data: result.data})
                    }            
                }    
            })
        } catch (error) {
            console.log(error)
        }
    }, []);


    function handleButtonClick(game_url) {
        try {  
            // check if token exist
            if(localStorage.getItem('tokenUsername')) {
                window.location.href = game_url;
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
          console.error('Error occurred while verifying token:', error);
        }
    }; 

    return(
        <div className={styles["popular-game"]}>
        <div className="mt-3 text-light d-flex justify-content-between">
            <h2>POPULAR GAMES</h2>
            <a href="/gamelist" className="text-light fst-italic text-decoration-underline"><h5>{"See all >>>"}</h5></a>
        </div>

        <div className="d-flex justify-content-between" style={{gap: "1rem"}}>
        {Array.isArray(popularData.data) &&
            popularData.data.map((game) => (
                <div key={game.gameid}> 
                    <Card
                        outline
                        style={{
                            width: '11rem',
                            height: '16rem',
                            textAlign: "center",
                            backgroundColor: "#4E67EB",
                            borderRadius:"25px",
                        }}
                        >
                        <img
                            className="p-1"
                            style={{
                                borderTopRightRadius:"25px",
                                borderTopLeftRadius:"25px",
                                textAlign: "center",
                                width: '11rem',
                                height: '9rem'
                            }}
                            alt=""
                            src={game.game_image_url}
                        />
                        <CardBody>
                            <CardTitle
                                className="h6 text-light"> 
                                {game.game_name}
                            </CardTitle>
                            <button 
                                className={`${styles["carousel-button"]} ${styles["mt-3"]} style`} 
                                style={{ backgroundColor:'#291D89' }}
                                onClick={() => handleButtonClick(game.game_url)}
                                >
                                PLAY!
                            </button>
                        </CardBody>
                    </Card>
                </div>
            ))};
        </div>
    </div>
    )
}

export default PopularGames