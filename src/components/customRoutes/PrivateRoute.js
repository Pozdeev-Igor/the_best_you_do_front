import React, {useState} from 'react';
import {useUser} from "../utils/userProvider/UserProvider";
import ajax from "../utils/FetchService";
import LoginModal from "../modal/LoginModal";

const PrivateRoute = (props) => {

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const {children} = props;

    if (user) {
        ajax(`/api/auth/validate?token=${user.jwt}`, "get", user.jwt).then(
            (isValid) => {
                setIsValid(isValid);
                setIsLoading(false);
            }
        );
    } else {
        return <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    }

    return isLoading ? (

        <></>

    ) : isValid === true ? (
        children
    ) : (
        <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
    );
};

export default PrivateRoute;