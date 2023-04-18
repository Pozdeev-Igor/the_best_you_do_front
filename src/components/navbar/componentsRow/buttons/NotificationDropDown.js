import React from 'react';
import {MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle} from "mdb-react-ui-kit";
import Icon from "@mdi/react";
import {mdiBell} from "@mdi/js";
import {useNavigate} from "react-router-dom";

const NotificationDropDown = () => {

    const navigate = useNavigate();

    function toLogOut() {
        localStorage.removeItem("jwt");
        navigate("/");
        window.location.reload();
    }

    return (
        <MDBCol className='mt-5 d-flex justify-content-end' lg='1' md='1' sm='6'>

            <MDBDropdown group className='shadow-0 mb-6 d-flex justify-content-center'
                         style={{marginTop: '-8px'}}>
                <MDBDropdownToggle color='white' className='d-flex align-items-start'>
                    <Icon path={mdiBell} size={1} color='white' style={{opacity: '0.7'}}/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={() => {toLogOut()}}>Log out</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>

        </MDBCol>
    );
};

export default NotificationDropDown;