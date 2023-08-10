import React from "react";
import Link from "next/link";

// import reactstrap
import { Navbar,Container } from "reactstrap";

// import css
import style from "../../../styles/profile/Profile.module.css"

// import component
import LogoutModal from "../../components/profilePage/logoutModal";

function navbarProfile() {
    return (
        <div style={{ marginBottom: "50px" }}>
            <Navbar className={style.navbarProfile}>
                <Container>
                    <div style={{marginLeft: "20px"}}>
                        <Link href="/">
                            <img
                                alt="logo"
                                src="/images/logo.jpeg"
                                style={{ height: '40px', width: 'auto' }} 
                            />
                        </Link>
                    </div>
                    <div style={{color: "white"}}>
                        <h3>P R O F I L E</h3>
                    </div>
                    <div>
                        <LogoutModal />
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default navbarProfile;