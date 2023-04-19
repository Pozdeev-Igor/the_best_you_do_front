import React, {useState} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e: any) => {
        setFormValue({...formValue, [e.target.placeholder]: e.target.value});
    };

    function sendSignupRequest(e) {
        if (formValue.confirmPassword === '' ||
            formValue.password === '' ||
            formValue.name === '' || formValue.email === '' || formValue.username === '') {
            return null;
        } else {

            fetch("api/auth/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(formValue),
            })
                .then(response => response.json());
            navigate("/");
        }
    }

    return (
        <div className='background-image'>
            <Grid textAlign='center' style={{ height: '105vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                        Create a new account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                value={formValue.username}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={formValue.email}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={formValue.password}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm password'
                                type='password'
                                value={formValue.confirmPassword}
                                onChange={onChange}
                            />

                            <Button color='blue' fluid size='large'
                                    onClick={() => sendSignupRequest()}>
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <a href='#'>Log In</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default SignUpPage;