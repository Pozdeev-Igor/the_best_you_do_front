import React from 'react';
import {MDBCardText} from "mdb-react-ui-kit";
import {Form, Transition} from "semantic-ui-react";

const CardEmail = ({showEdit, updateUserProfile, userProfile}) => {
    return (
        <div>
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
        </div>
    );
};

export default CardEmail;