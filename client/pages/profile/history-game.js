import React, { useEffect, useState } from "react";
import Link from "next/link";

// import reactstrap
import { Navbar } from "reactstrap";

// import css
import style from "../../styles/profile/History.module.css"

// import components
import Footer from "../../components/profilePage/Footer";

// api
import { historyGameApi } from "../../api/profilePageApi";

import { IoMdArrowRoundBack } from "react-icons/io";

const userDummy = [
    { 
        id: 0,
        gameName: "",
        playtime: "",
        totalRonde: 0,
        userSkor: 0
    }
]

function HistoryGame() {
    // state
    const [historyGame, setHistoryGame] = useState({ data: userDummy });

    useEffect(() => {
        try{
            const id = localStorage.getItem('tokenId')
            historyGameApi(id).then((result) => {
                if (result !== undefined) {
                    setHistoryGame({data: result.data})
                }
            })
        } catch(error) {
            console.error(error);
        }
    }, [])

    return (
        <div style={{backgroundColor: "black"}}>
            <Navbar 
                style={{backgroundColor: "#4E67EB"}}
                className="mx-4"
            >
                <div className="ms-3">
                    <Link href="/profile">
                        <IoMdArrowRoundBack size={30} color="white"/>
                    </Link>
                </div>
            </Navbar>
            <div style={{marginTop: "60px"}} className="d-flex mx-5">
            <div className={style.tableContainer} style={{ backgroundColor: '#4E67EB', width: '800px' }}>
                <div className={style.tableTitle}>
                    <h1>HISTORY GAME</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Game Name</th>
                            <th>Play Time</th>
                            <th>Total Round</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {historyGame.data.map((data) => {
                        return (
                            <tr
                                key={data.id}
                            >
                                <td>{data.gameName}</td>
                                <td>{data.playtime}</td>
                                <td>{data.totalRonde}</td>
                                <td>{data.userSkor}</td>
                            </tr>
                       )
                    })}
                    </tbody>
                </table>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default HistoryGame;