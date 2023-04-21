import React, {useState} from 'react';
import {Checkbox} from "semantic-ui-react";
import roleParser from "../../../utils/RoleParser";
import {MDBCardText} from "mdb-react-ui-kit";

const Roles = ({userProfile}) => {

    const [roles, setRoles] = useState(['ROLE_CONSUMER','ROLE_PRODUCER']);
    const [checked, setChecked] = useState(true);

    return (
        <>
            <MDBCardText  className='mt-3 mb-0'>
                роли:
            </MDBCardText>
            {
             userProfile.authorities.length > 1 ? (

            <div>
                {userProfile.authorities.map(auth => (
                    <Checkbox key={auth} checked={checked} label={roleParser(auth)}  className='ms-5'/>
                ))}
            </div>
                 ) : (
                     <div>
                             <Checkbox key={userProfile.authorities[0]} checked={checked} label={roleParser(userProfile.authorities[0])}  className='ms-5'/>
                             <Checkbox key={1}  checked={!checked} label={roleParser(roles.filter(role => role !== userProfile.authorities[0])[0])}  className='ms-5'/>
                     </div>
                )
            }
        </>
    );
};

export default Roles;