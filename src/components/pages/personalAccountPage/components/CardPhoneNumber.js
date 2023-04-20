import React from 'react';
import {MDBCardText} from "mdb-react-ui-kit";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import {Form, Transition} from "semantic-ui-react";

const CardPhoneNumber = ({showEdit, updateUserProfile, userProfile}) => {
    return (
        <div>
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
        </div>
    );
};

export default CardPhoneNumber;