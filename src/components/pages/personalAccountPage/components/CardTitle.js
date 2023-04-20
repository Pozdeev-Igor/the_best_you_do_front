import React from 'react';
import {MDBCardTitle} from "mdb-react-ui-kit";
import Icon from "@mdi/react";
import {mdiClose, mdiPencilOutline} from "@mdi/js";
import {Form, Transition} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const CardTitle = ({userProfile, showEdit, showEditForm, updateUserProfile}) => {

    const navigate = useNavigate();

    return (
        <div>
            <MDBCardTitle className='d-flex justify-content-between'>
                {userProfile.name}

                <div>
                    <span className='pointer me-3' onClick={() => {showEditForm()}}>
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
        </div>
    );
};

export default CardTitle;