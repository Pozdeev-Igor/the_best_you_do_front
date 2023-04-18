import React from 'react';
import {MDBCol} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

const HomeButton = () => {

    const navigate = useNavigate();

    return (
        <MDBCol className='mt-5' lg='1' md='1' sm='6'>
            <h4 className="navbar-font-style d-flex justify-content-center">
                <span className="pointer" onClick={() => navigate("/")}>
                    home
                </span>
            </h4>
        </MDBCol>
    );
};

export default HomeButton;