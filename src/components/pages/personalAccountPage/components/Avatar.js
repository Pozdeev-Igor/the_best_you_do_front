import React, {useState} from 'react';
import {Button, Placeholder, Transition} from "semantic-ui-react";
import {MDBCardImage, MDBFile} from "mdb-react-ui-kit";

const Avatar = ({userProfile, showEditForm, showEdit}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const userId = userProfile.id;

    function updateAvatar() {

        let formData = new FormData();
        formData.append('file', selectedFile);
        showEditForm()
        fetch(`/api/auth/images/new/${userId}`,
            {
                method:'POST',
                body:formData
            })
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>

            <div className='bg-image hover-zoom'>
                {
                    userProfile.avatar === null || userProfile.avatar === "" ? (

                        <Placeholder style={{ height: 200, width: 400 }}>
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

                        <MDBFile size='sm' id='formFileSm'
                                     className='mb-3 mt-3'
                                     style={{borderColor:'lightgray', color:'lightgray'}}
                                     placeholder='изменить аватар'
                                     onChange={changeHandler}
                        />
                    )}
                </Transition.Group>

                <Transition.Group animation='zoom' duration={300}>
                    {!showEdit && (

                        <Button primary fluid className='mt-3 mb-3'
                                    onClick={() => {updateAvatar()}}>Обновить аватар</Button>
                        )}
                </Transition.Group>
            </div>

        </div>
    );
};

export default Avatar;