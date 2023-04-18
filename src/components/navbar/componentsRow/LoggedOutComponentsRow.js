import React, {useState} from 'react';
import HomeButton from "./buttons/HomeButton";
import CreateNewButton from "./buttons/CreateNewButton";
import OurTeamButton from "./buttons/OurTeamButton";
import SearchForm from "./forms/SearchForm";
import UsernameButton from "./buttons/UsernameButton";
import {MDBRow} from "mdb-react-ui-kit";
import LoginButton from "./buttons/LoginButton";
import LoginModal from "../../modal/LoginModal";

const LoggedOutComponentsRow = () => {

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<div>
        <MDBRow className='d-flex justify-content-evenly'>
            <HomeButton/>
            <CreateNewButton/>
            <OurTeamButton/>
            <SearchForm/>
            <UsernameButton/>
            <LoginButton/>
        </MDBRow>
    <div>
        <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    </div>
        </div>
    );
};

export default LoggedOutComponentsRow;