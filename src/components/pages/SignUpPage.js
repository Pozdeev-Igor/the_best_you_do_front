import React from 'react';
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";

const SignUpPage = () => {
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
                            />
                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm password'
                                type='password'
                            />

                            <Button color='blue' fluid size='large'>
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