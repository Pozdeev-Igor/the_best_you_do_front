import React, {useState} from 'react';
import {MDBCol} from "mdb-react-ui-kit";
import LoginModal from "../../../modal/LoginModal";
import {useUser} from "../../../utils/userProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const CreateNewButton = () => {

    const user = useUser();
    const navigate = useNavigate();
    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <MDBCol className='mt-5' lg='1' md='1' sm='6'>
            <h4 className="navbar-font-style d-flex justify-content-center">
                {
                    user.jwt !== null && user.jwt !== "" ?
                        (
                            <span className="pointer" onClick={() => {navigate("/create-new")}}>
                    create new
                </span>
                        ) : (
                            <span className="pointer" onClick={() => {handleShow()}}>
                                create new
                            </span>
                        )
                }
            </h4>
            <div>
                <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
            </div>
        </MDBCol>
    );
};

export default CreateNewButton;