import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap'
import { useRouter } from "next/router";

// import redux
import { useDispatch, useSelector } from "react-redux";
import { updateRound, updateScore } from "../../../redux/action";

// import api
import { InsertScoreApi } from '../../../api/gameScoreApi';


export default function gameUrl() {
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState(null);

    // get original state of redux
    const reduxState = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    const router = useRouter();
    const gameUrl = router.query.gameUrl
    const pathname = "/game/" + gameUrl

    // ensure user has auth to play the game
    useEffect(() => {
        if (!localStorage.getItem('tokenId')) {
            window.location.replace('/login');
        } else {
            getData()
        }
    }, [])


    // get data for user 
    function getData () {
        // update userId 
        setUserId(Number(localStorage.getItem('tokenId')));

        // update username
        setUsername(localStorage.getItem('tokenUsername'));

        // create random total score between 1 to 30
        const randomIndex = Math.floor(Math.random() * 30 + 1)
        dispatch(updateScore(randomIndex))

        // create total round by multiplying score with 1.5
        const round = Math.floor(randomIndex * 1.5)
        dispatch(updateRound(round))
    }

    // function upon exit 
    function handleExit(event) {
        try {
            event.preventDefault()
            InsertScoreApi(userId, pathname, reduxState.round, reduxState.score).then(async result => {
                if (!result) {
                    await alert("Internal Server Error!")
                } else {
                    if (result.status === "success") {
                        await window.location.replace('/')
                    } else {
                        await alert("Internal Server Error!")
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: "black",
                color: "white",
                width: "100wh",
                height: "100vh"
            }}
            >
            <div style={{textAlign: "center"}}>
                <h3>Hi, {username} !</h3>
                <br></br>
                <h3>You're entering dummy page of game {gameUrl}</h3>
                <br></br>
                <h3>You had played {reduxState.round} round(s) with total score of {reduxState.score}</h3> 
            </div>
            <div className="pt-4">
                <Button
                    onClick={handleExit}
                >Save and Back to Home</Button>
            </div>
        </div>
    )
}

