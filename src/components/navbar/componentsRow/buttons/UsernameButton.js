import React, {useEffect, useState} from 'react';
import {MDBCol} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../../utils/userProvider/UserProvider";
import jwt_decode from "jwt-decode";

const UsernameButton = () => {

    const navigate = useNavigate();
    const user = useUser();
    const [userId, setUserId] = useState([]);
    const [username, setUsername] = useState(null);
    const [roles, setRoles] = useState([]);

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.authorities;
        }
        return [];
    }

    function getSubFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.sub;
        }
        return [];
    }

    function getUsersIdFromJWT() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.id;
        }
        return [];
    }


    useEffect(() => {
        setUsername(getSubFromJWT());
        setUserId(getUsersIdFromJWT);
        setRoles(getRolesFromJWT);
    }, [user.jwt])

    return (
        <MDBCol className='mt-5' lg='2' md='1' sm='6'>
            <span className="pointer"
                  onClick={() => navigate(`users/${userId}`)}>
                    <h4 className="navbar-font-style d-flex justify-content-end">
                        {username}
                    </h4>
            </span>
        </MDBCol>
    );
};

export default UsernameButton;