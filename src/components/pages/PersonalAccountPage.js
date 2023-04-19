import React, {useEffect, useRef, useState} from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBFile, MDBRow} from "mdb-react-ui-kit";
import Icon from "@mdi/react";
import {mdiClose, mdiPencilOutline} from "@mdi/js";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../utils/userProvider/UserProvider";
import ajax from "../utils/FetchService";
import formatDate from "../utils/formatDate";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import {Button, Form, Transition, Placeholder} from "semantic-ui-react";


const PersonalAccountPage = () => {

    const navigate = useNavigate();
    const user = useUser();
    const {userId} = useParams();
    const [userProfile, setUserProfile] = useState({
        id: "",
        dayStart: "",
        email: "",
        name: "",
        phoneNumber: "",
        count: null,
        rate: null
    });

    const [selectedFile, setSelectedFile] = useState(null);
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
        ajax(`/api/auth/user/${userId}/edit`, 'PATCH', user.jwt, reqBody).then(response => {
            console.log(response)
        })
    }

    function updateAvatar() {

        let formData = new FormData();
        formData.append('file', selectedFile);

        setShowEdit(!showEdit)
        fetch(`/api/auth/images/new/${userId}`,
            {
                method:'POST',
                body:formData
            }).then(response => {
            console.log(response.body)
        })
    }

    useEffect(() => {
        ajax(`/api/auth/user/${userId}`, "GET").then(usersData => {
            if (usersData) {
                setUserProfile(usersData);
            } else return null;
            showEditForm()
        })
    }, [user.jwt])

    function showEditForm() {
        setShowEdit(!showEdit)
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className='background-image d-flex justify-content-center d-flex align-items-center d-flex flex-column'
             style={{paddingTop: '265px', paddingBottom: '269px'}}>

            <MDBCard style={{maxWidth: '840px'}}>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <div className='bg-image hover-zoom'>
                            {
                                userProfile.avatar === null ? (

                            <Placeholder style={{ height: 400, width: 300 }}>
                                <Placeholder.Image />
                            </Placeholder>

                                ) : (
                                    <MDBCardImage
                                        src={userProfile.avatar}
                                        alt='...'
                                        fluid/>
                                )
                            }
                        </div>
                        <div>
                            <Transition.Group animation='zoom' duration={300}>
                                {!showEdit && (
                                    <>
                                    <MDBFile size='sm' id='formFileSm'
                                             className='mb-3 mt-3'
                                             style={{borderColor:'lightgray', color:'lightgray'}}
                                             placeholder='изменить аватар'
                                             onChange={changeHandler}
                                    />
                                    <Button primary fluid className='mt-3'
                                    onClick={() => {updateAvatar()}}>Обновить аватар</Button>
                                    </>
                                )}
                            </Transition.Group>
                        </div>
                    </MDBCol>
                    <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle className='d-flex justify-content-between'>
                                {userProfile.name}
                                <div>

                                    <span className='pointer me-3' onClick={() => {
                                        showEditForm()
                                    }}>
                                    <Icon path={mdiPencilOutline} size={1}/>
                                </span>

                                    <span className='pointer' onClick={() => navigate(-1)}>
                                    <Icon path={mdiClose} size={1}/>
                                </span>
                                </div>
                            </MDBCardTitle>
                            <Transition.Group animation='zoom' duration={500}>
                                {!showEdit && (
                                    <Form.Input
                                        fluid
                                        placeholder={userProfile.name}
                                        onChange={(e) => updateUserProfile('name', e.target.value)}
                                    />
                                )}
                            </Transition.Group>
                            <MDBCardText className='mt-3 mb-0'>
                                email: {userProfile.email}
                            </MDBCardText>
                            <Transition.Group animation='zoom' duration={500}>
                                {!showEdit && (
                                    <Form.Input
                                        fluid
                                        placeholder={userProfile.email}
                                        onChange={(e) => updateUserProfile('email', e.target.value)}
                                    />
                                )}
                            </Transition.Group>
                            <MDBCardText  className='mt-3 mb-0'>
                                phone number: {formatPhoneNumber(userProfile.phoneNumber)}
                            </MDBCardText>
                            <Transition.Group animation='zoom' duration={500}>
                                {!showEdit && (
                                    <Form.Input
                                        fluid
                                        placeholder={formatPhoneNumber(userProfile.phoneNumber)}
                                        onChange={(e) => updateUserProfile('phoneNumber', e.target.value)}
                                    />

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