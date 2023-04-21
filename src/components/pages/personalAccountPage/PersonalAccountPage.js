import React, {useEffect, useRef, useState} from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {useParams} from "react-router-dom";
import {useUser} from "../../utils/userProvider/UserProvider";
import ajax from "../../utils/FetchService";
import formatDate from "../../utils/formatDate";
import {Button, Transition, Checkbox} from "semantic-ui-react";
import Avatar from "./components/Avatar";
import CardTitle from "./components/CardTitle";
import CardEmail from "./components/CardEmail";
import CardPhoneNumber from "./components/CardPhoneNumber";
import roleParser from "../../utils/RoleParser";


const PersonalAccountPage = () => {

    const user = useUser();
    const {userId} = useParams();
    const [userProfile, setUserProfile] = useState({
        id: "",
        dayStart: "",
        email: "",
        name: "",
        phoneNumber: "",
        count: null,
        rate: null,
        authorities: []
    });

    const [showEdit, setShowEdit] = useState(false);
    const previousProfileDataValue = useRef(userProfile)

    function updateUserProfile(prop, label) {
        const newUserProfile = {...userProfile};
        newUserProfile[prop] = label;
        setUserProfile(newUserProfile);
    }

    function updateUserData() {
        if (previousProfileDataValue.current.name !== userProfile.name) {
            updateUserProfile('name', userProfile.name)
        }
        if (previousProfileDataValue.current.email !== userProfile.email) {
            updateUserProfile('email', userProfile.email)
        }
        if (previousProfileDataValue.current.phoneNumber !== userProfile.phoneNumber) {
            updateUserProfile('phoneNumber', userProfile.phoneNumber)
        }
        persist();
        setShowEdit(!showEdit);
    }

    function persist() {
        const reqBody = {
            name: userProfile.name,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
        }
        ajax(`/api/auth/user/${userId}/edit`, 'PATCH', user.jwt, reqBody)
    }

    useEffect(() => {
        ajax(`/api/auth/user/${userId}`, "GET").then(usersData => {
            if (usersData) {
                setUserProfile(usersData);
            } else return null;
            showEditForm()
        })
    }, [user.jwt, setUserProfile])

    function showEditForm() {
        setShowEdit(!showEdit)
    }

    return (
        <div className='background-image d-flex justify-content-center d-flex align-items-center d-flex flex-column'
             style={{paddingTop: '255px', paddingBottom: '255px'}}
        >

            <MDBCard style={{width: '1000px', maxHeight:'3000px'}}>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <Avatar userProfile = {userProfile} showEditForm = {showEditForm} showEdit={showEdit}/>
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>

                            <CardTitle
                                userProfile={userProfile}
                                showEditForm={showEditForm}
                                showEdit={showEdit}
                                updateUserProfile={updateUserProfile}/>

                            <CardEmail
                                userProfile={userProfile}
                                showEdit={showEdit}
                                updateUserProfile={updateUserProfile}/>

                            <CardPhoneNumber
                                userProfile={userProfile}
                                showEdit={showEdit}
                                updateUserProfile={updateUserProfile}/>

                             <MDBCardText  className='mt-3 mb-0'>
                                    роли: {userProfile.authorities.map(auth => (roleParser(auth)))}
                             </MDBCardText>
                            <Transition.Group animation='zoom' duration={300}>
                                {!showEdit && (
                                    <Checkbox toggle />
                                )}
                            </Transition.Group>

                            <Transition.Group animation='zoom' duration={300}>
                                {!showEdit && (
                                    <Button primary fluid className='mt-3'
                                            onClick={() => {updateUserData()}}>Сохранить</Button>
                                )}
                            </Transition.Group>

                            <MDBCardText  className='mt-3'>
                                <small className='text-muted'>User from {formatDate(userProfile.dayStart)}</small>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </div>
    );
};

export default PersonalAccountPage;