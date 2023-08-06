import React, { useState, useEffect } from "react";

// import api
import { insertScoreApi } from "../../api/rpsApi"

//import css
import styles from '../../styles/Rps.module.css'

function RockPaperScissorsPage() {
    // const username = localStorage.getItem("tokenUsername");
    const username = 'aaron'
    const choices = ["rock", "paper", "scissors"];
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('VS');
    const [skor, setSkor] = useState(0);
    const [ronde, setRonde] = useState(0);
    const [insertMessage, setInsertMessage] = useState("");

    const handleButtonDone = async () => {
        try {
            const user_id = localStorage.getItem("tokenId");
            await insertScoreApi(user_id, skor);
            setInsertMessage(`Skor tersimpan di user ${username} dengan skor ${skor} dengan jumlah ronde ${ronde}`);
            setRonde(0);
            setSkor(0);
            setTimeout(() => {
                setUserChoice(null);
                setComputerChoice(null);
                setResult('VS');
                setInsertMessage("");
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleButtonClick = (chosenChoice) => {
        if (result === "VS") {
            // Generate computer's choice
            const randomIndex = Math.floor(Math.random() * choices.length);
            const randomChoice = choices[randomIndex];
            // Set user and computer choices
            setRonde(ronde + 1);
            setUserChoice(chosenChoice);
            setComputerChoice(randomChoice);
        } else {
            setResult("Click Refresh !");
        }
    };

    const handleRestart = () => {
        // Reset the choices and result
        setUserChoice(null);
        setComputerChoice(null);
        setResult('VS');
    };

    useEffect(() => {
        if (userChoice && computerChoice) {
            // Evaluate the result
            if (userChoice === computerChoice) {
                setResult("It's a draw!");
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                setResult("You win!");
                setSkor(skor + 1);
            } else {
                setResult("Com wins!");
            }
        }
    }, [userChoice, computerChoice]);


    useEffect(() => {
        try {
            if (!localStorage.getItem('tokenId')) {
                window.location.replace('/login')
            }
        } catch (error) {
            console.error('Error occurred while verifying token:', error);
        }
    }, [])

    return (
        <div className={styles.rpsBody}>
            <header className={styles.rpsHeader}>
                <div className={styles.rpsLeftitem}>
                    <a href="/" type="button" className={styles.backButton} >
                        <svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.0039 37.8633L0.09375 22.4648V17.4375L35.0039 0V8.4375L10.957 19.582L35.0039 29.4609V37.8633Z" fill="#724C21" />
                        </svg>
                    </a>
                    <img src="/images/game/rps.png" alt="" className={styles.logo} />
                    <h1 className={styles.rpsJudul}>ROCK PAPER SCISSORS</h1>
                </div>
                <div className={styles.rpsRightitem}>
                    <button onClick={() => handleButtonDone()} className={styles.doneButton}>
                        <h3>Save your Progress!</h3>
                    </button>
                </div>

            </header>
            <div className={styles.rpsRondeDisplay}>
                Ronde : {ronde}
            </div>
            <div className={styles.rpsScoreDisplay}>
                Score : {skor}
            </div>
            <br />
            <div className={`grid ${styles.grid}`}>
                <div className={`row ${styles.row}`}>
                    <div className={styles.col}>
                        <h2 className={styles.rpsName} >{username}</h2>
                    </div>
                    <div className={`col ${styles.rpsResultMessage}`}>
                        {insertMessage}
                    </div>
                    <div className={styles.col}>
                        <h2 className={styles.rpsName}>COM</h2>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <button onClick={() => handleButtonClick("rock")} className={`${styles.rpsButton} ${userChoice === "rock" ? styles.chosen : ""}`}>
                            <img src="/images/game/batu.png" alt="" className={styles.batu} />
                        </button>
                    </div>
                    <div className={styles.col}></div>
                    <div className={styles.col}>
                        <div className={`${styles.computerChoice} ${computerChoice === "rock" ? styles.chosen : ""}`}>
                            <img src="/images/game/batu.png" alt="" className={styles.batuCom} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <button onClick={() => handleButtonClick("paper")} className={`${styles.rpsButton} ${userChoice === "paper" ? styles.chosen : ""}`}>
                            <img src="/images/game/kertas.png" alt="" className={styles.kertas} />
                        </button>
                    </div>
                    <div className={styles.result}>
                        <span>{result}</span>
                    </div>
                    <div className={styles.col}>
                        <div className={`${styles.computerChoice} ${computerChoice === "paper" ? styles.chosen : ""}`}>
                            <img src="/images/game/kertas.png" alt="" className={styles.kertasCom} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <button onClick={() => handleButtonClick("scissors")} className={`${styles.rpsButton} ${userChoice === "scissors" ? styles.chosen : ""}`}>
                            <img src="/images/game/gunting.png" alt="" className={styles.gunting} />
                        </button>
                    </div>
                    <div className={styles.col}></div>
                    <div className={styles.col}>
                        <div className={`${styles.computerChoice} ${computerChoice === "scissors" ? styles.chosen : ""}`}>
                            <img src="/images/game/gunting.png" alt="" className={styles.guntingCom} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.rpsRefreshButton}>
                        <button onClick={handleRestart} className={styles.refreshButton}>
                            <img src="/images/game/refresh.png" alt="" className={styles.refreshImg} />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RockPaperScissorsPage;

