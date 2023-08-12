import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Container } from "reactstrap";
import { gameListApi } from '../../api/gameListApi';

//import css
import styles from '../../styles/Gamelist.module.css';

// use dummy data in case the server is error
const gameList = [
    {
        gameid: -1,
        game_name: "Rock Paper Scissors",
        game_description: "Traditional Games to play with your best friends",
        game_url: "rps",
        game_image_url: "https://drive.google.com/uc?export=view&id=1JKSkvsWkXTELJCjhsfbR1lciNBd5oAxK"
    },
    {
        gameid: -2,
        game_name: "Caroom Pool",
        game_description: "Carrom Pool is an easy-to-play multiplayer board game. Are you up for the challenge?",
        game_url: "caroompool",
        game_image_url: "https://drive.google.com/uc?export=view&id=1tMFG2eoQU1hFssOmwmSTLSF9DnVSHfL-"
    },
    {
        gameid: -3,
        game_name: "Soccer Stars",
        game_description: "Easy to pick up and fun to play. Will you take the cup home?",
        game_url: "soccerstars",
        game_image_url: "https://drive.google.com/uc?export=view&id=1Wy3XWpfDQDK1XSAebBpSXY_GSYvj-oxu"
    },
    {
        gameid:-4,
        game_name: "Mini Football",
        game_description: "Wild football fun at your fingertips!",
        game_url: "minifootball",
        game_image_url: "https://drive.google.com/uc?export=view&id=15aVwrLkByle80O40XH4tA7o3JsvAv8hR"
    },
    {
        gameid:-5,
        game_name: "Basketball Stars",
        game_description: "Dribble, shoot, score, WIN, in the world's best multiplayer basketball mobile game!",
        game_url: "basketballstars",
        game_image_url: "https://drive.google.com/uc?export=view&id=1SBt4IwrJRbeQb3vBcVc5ZpuDBVbEKc43"
    },
    {
        gameid:-6,
        game_name: "Mini Militia",
        game_description: "Battle with up to 6 players online in this fun cartoon themed 2D game.",
        game_url: "minimilitia",
        game_image_url: "https://drive.google.com/uc?export=view&id=1djK1wysUvSKxB0s76UJVzEY4JG6NrVrg"
    }
  ];


function GameListPage() {
    // state
    const [gameslist, setGamelist] = useState({ data: gameList });

    function handleButtonClick(game_url) {
        try {  
          // check if token exist
        if(localStorage.getItem('tokenUsername')) {
            window.location.href = `/game/${game_url}`;
        } else {
            window.location.href = '/login';
        }
        } catch (error) {
          console.error('Error occurred while verifying token:', error);
        }
    }; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await gameListApi();
                if (result !== undefined) {
                    console.log(result);
                    setGamelist({ data: result.data });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function inside useEffect
    }, []);

    return (
        <div className={styles.gamelistBody}>
            <Container className={styles.gamelistContainer}>
                {gameslist.data.map(function (data) {
                    return (
                        <Card className={styles.gamelistCardClass}>
                            <img
                                alt="Sample"
                                src={data.game_image_url}
                            />    
                            <CardBody className={`${styles.gamelistCard} text-dark`}>
                                <CardTitle className={`${styles.gamelistJudul} text-bold`}>
                                    {data.game_name}
                                </CardTitle>
                                <CardText className={`${styles.gamelistText} text-dark`}>
                                    {data.game_description}
                                </CardText>
                                <Button onClick={() => handleButtonClick(data.game_url)}>
                                    Play Now
                                </Button>
                            </CardBody>
                        </Card>
                    )
                })}
            </Container>
        </div>
    );
}

export default GameListPage;

