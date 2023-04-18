import React, {useState} from 'react';
import LoginModal from "../modal/LoginModal";
import "../static/index.css"
import LoggedInComponentsRow from "./componentsRow/LoggedInComponentsRow";
import LoggedOutComponentsRow from "./componentsRow/LoggedOutComponentsRow";
import {useUser} from "../utils/userProvider/UserProvider";

const NavbarLoggedIn = (props) => {

    const user = useUser();


    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{background: '', width: '100%', height:'100%', zIndex: '999',position:'fixed'}}>
            {user.jwt !== null && user.jwt !== "" ?
                (
                    <LoggedInComponentsRow user ={user}/>
                ) : (
                    <LoggedOutComponentsRow props={props}/>
                )
            }
            <div>
                <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
            </div>
        </div>
    );
};

export default NavbarLoggedIn;
