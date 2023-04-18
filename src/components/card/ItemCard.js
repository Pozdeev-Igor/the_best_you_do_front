import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {useUser} from "../utils/userProvider/UserProvider";
import {useNavigate} from "react-router-dom";

const ItemCard = (props) => {

    const user = useUser();
    const navigate = useNavigate();

    return (
        <div style={{maxWidth: '700px', opacity: '0.9'}}
        >
        <MDBCard>
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                    <MDBCardImage
                        src='https://res.cloudinary.com/ddkxweaw0/image/upload/v1681277991/samples/imagecon-group.jpg'
                        alt='...' fluid/>
                </MDBCol>
                <MDBCol md='8'>
                    <MDBCardBody>
                        <MDBCardTitle>{props.content.title}</MDBCardTitle>
                        <MDBCardText>
                            {props.content.description}
                        </MDBCardText>
                        <MDBCardText>
                            <small className='text-muted'>secutus quaestionem posse fuissent</small>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCol>
            </MDBRow>
        </MDBCard>
        </div>
    );
};

export default ItemCard;