import {Route, Routes} from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import LoginModal from "./components/modal/LoginModal";
import React, {useState} from "react";
import Homepage from "./components/pages/Homepage";
import {useUser} from "./components/utils/userProvider/UserProvider";
import PersonalAccountPage from "./components/pages/PersonalAccountPage";
import NewProductPage from "./components/pages/newProductPage/NewProductPage";
import PrivateRoute from "./components/customRoutes/PrivateRoute";

// TODO: доделать PrivateRoute, добавить в него loader.

function App() {

    const user = useUser();
    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/registration' element={<SignUpPage/>}/>
                <Route path='/users/:userId' element={<PrivateRoute><PersonalAccountPage/></PrivateRoute>}/>
                <Route path='/create-new' element={<PrivateRoute><NewProductPage/></PrivateRoute>}/>

            </Routes>
        </>
    );
}

export default App;
