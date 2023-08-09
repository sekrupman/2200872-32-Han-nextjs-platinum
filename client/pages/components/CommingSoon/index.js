import React , {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';

//import styles
import styles from '../../../styles/commingsoon.module.css'

// use dummy data in case the server is error
const gameList = [
    {
      gameid: -1,
      game_description: "Experience the thrill of using your head to score and become the champion!",
      game_image_url: "https://drive.google.com/uc?export=view&id=1YN51_A3HAM1Y2Z-uPNjAqBSlzSEiIJvz"
    },
    {
      gameid: -2,
      game_description: "The World's #1 multiplayer pool game!",
      game_image_url: "https://drive.google.com/uc?export=view&id=1n9qo6aC1mUTaVHEzjD4qNsaVM1Z8eWx5"
    },
    {
      gameid: -3,
      game_description: "Beat your opponents in this innovative 6-player real time golf game.",
      game_image_url: "https://drive.google.com/uc?export=view&id=1z7zFgGLlFNRFEgF4Rp9sTBDPxrNbCbky"
    }
]

function CommingSoon(){
    // get data of game
  const [ comingsoonData, setCommingsoonData ] = useState({ data: gameList });
  useEffect(() => {
    try{
      ComingSoonGamesApi().then((result) => {
          if (!result) {
              setCommingsoonData({data: gameList})
          } else {
              const length = result.data.length
              if (length < 3) {
                  setCommingsoonData({data: [...result.data, gameList.slice(0,3-length)]})
              } else {
                  setCommingsoonData({data: result.data})
              }            
          }    
        })
      } catch (error) {
        console.log(error)
      }
    }, []);
    return(
        <div>
        <Card className={styles["comingsoon-card"]} style={{ width: '28rem' }}>
        <Card.Title className={styles["card-title"]}>Coming Soon</Card.Title>
          {Array.isArray(comingsoonData.data) ? (
            comingsoonData.data.map((game) => (
              <div key={game.gameid}>
                <Card.Img variant="top" src={game.game_image_url} alt="" style={{ width: "25rem", height: "10.5rem" }} />
                <Card.Text className={styles['card-text']}>
                  {game.game_description}
                </Card.Text>
              </div>
            ))
          ) : (
            <div>No coming soon games found.</div>
          )}
        </Card>
      </div>
    )
}

export default CommingSoon