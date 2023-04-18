import React, {useState} from 'react';
import {MDBCol} from "mdb-react-ui-kit";
import LoginModal from "../../../modal/LoginModal";

const LoginButton = () => {

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <MDBCol className='mt-5' lg='2' md='1' sm='6'>
                        <span className="pointer"
                              onClick={() => {handleShow()}}>
                            <h4 className="navbar-font-style d-flex justify-content-end">
                                log in
                            </h4>
                        </span>
    <div>
        <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    </div>
        </MDBCol>
    );
};

export default LoginButton;