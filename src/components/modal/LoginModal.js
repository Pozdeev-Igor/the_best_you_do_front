import React, {useEffect, useState} from 'react';
import {useUser} from "../utils/userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import {Grid, Button, Header, Form, Message, Segment} from "semantic-ui-react";

const LoginModal = (props) => {

    const user = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {show, handleClose, handleShow} = props

    function handleSignUp() {
        navigate("/registration");
        handleClose();
    }

    function sendLoginRequest(e) {
        const requestBody = {
            username: username,
            password: password
        };

        fetch("/api/auth/authenticate", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.body]);
                } else return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                user.setJwt(body.token);
            })
            .catch((message) => {
                alert(message);
            });
        handleClose();
    }

    useEffect(() => {
        if (window.location.href === 'http://localhost:3000/registration' && localStorage.getItem('jwt') !== "\"\"") {
            navigate('/');
        }
    }, [sendLoginRequest])

    return (
        <Modal show={show} onHide={handleClose} style={{backdropFilter: "blur(5px)"}}>
            <Modal.Header closeButton/>

            <div>
                <Grid textAlign='center' style={{height: '60vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='blue' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)}/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Button
                                    color='blue'
                                    fluid size='large'
                                    onClick={() => sendLoginRequest()}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <span
                            style={{color: '#0E6EB8', cursor: 'pointer'}}
                            onClick={() => navigate("/registration")}
                        >Sign Up</span>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        </Modal>
    );
};

export default LoginModal;