import React , {useState, useEffect} from "react";
import {Card, CardBody, CardSubtitle, CardTitle} from 'reactstrap';
import {GiGoldBar} from 'react-icons/gi';

// import api
import { LeaderboardAPI } from '../../api/communityApi';

// import styles
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

// use dummy data in case the server is error
const leaderList = [
    {
        id: -1,
        username: "Hansen",
        score: 270,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/100"
    },
    {
        id: -2,
        username: "Ignatius",
        score: 245,
        rank: "gold",
        avatar: "https://source.unsplash.com/featured/101"
    },
    {
        id: -3,
        username: "Difa",
        score: 150,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/102"

    },
    {
        id: -4,
        username: "Agnes",
        score: 145,
        rank: "silver",
        avatar: "https://source.unsplash.com/featured/103"
    },
    {
        id: -5,
        username: "Nour",
        score: 90,
        rank: "bronze",
        avatar: "https://source.unsplash.com/featured/104"
    }
  ];

function LeaderBoard(){
    // get data of leaderboard
    const [ leaderboardData, setLeaderboardData ] = useState({ data: leaderList });
    useEffect(() => {
      LeaderboardAPI().then((result) => {   
        if (!result) {
            setLeaderboardData({data: leaderList})
        } else {
            const length = result.data.length
            if (length < 5) {
                setLeaderboardData({data: [...result.data, leaderList.slice(0,5-length)]})
            } else {
                setLeaderboardData({data: result.data})
            }            
        }    
      })
    }, []);
    return(
        <div className={styles["leaderboard"]}>
            <div>
                <div className="mt-3 text-light d-flex justify-content-between">
                    <h2>LEADERBOARD</h2>
                    <a href="/community" className="text-light fst-italic text-decoration-underline"><h5>{"See all >>>"}</h5></a>
                </div>

                <div className="d-flex justify-content-between" style={{gap: "1rem"}}>
                    {leaderboardData.data.map((leader) => (
                        <div key={leader.id}>
                            <Card
                                outline
                                style={{
                                    width: '11rem',
                                    height: '16rem', 
                                    textAlign: "center",
                                    backgroundColor: "#4E67EB",
                                    borderRadius:"25px"
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
                                    src={leader.avatar}
                                />
                                <CardBody>
                                    <CardTitle className="h5 mb-3 text-light">
                                        {leader.username}
                                    </CardTitle>

                                    <CardSubtitle className="h6 text-light">
                                        <div className="d-flex justify-content-around">
                                            <GiGoldBar
                                                size={30}
                                                color=
                                                    {(() => {
                                                        switch (true) {
                                                            case leader.rank === 'gold':   
                                                                return "#FFD700";
                                                            case leader.rank === 'silver': 
                                                                return "#C0C0C0";
                                                            default:      
                                                                return "#B08D57";
                                                        }
                                                    })} >
                                            </GiGoldBar>
                                            <div>{leader.score}</div>
                                        </div>
                                    </CardSubtitle>
                                </CardBody>
                            </Card>
                        </div>
                    ))};
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard