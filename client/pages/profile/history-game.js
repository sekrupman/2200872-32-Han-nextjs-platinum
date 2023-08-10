import React from "react";
import Link from "next/link";

// import reactstrap
import { Navbar } from "reactstrap";

// import css
import style from "../../styles/profile/History.module.css"

// import components
import Footer from "../components/profilePage/Footer";

import { IoMdArrowRoundBack } from "react-icons/io";

function HistoryGame() {
    return (
        <div style={{backgroundColor: "black", height: "100vh"}}>
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
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Country</th>
                            <th>Score</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default HistoryGame;