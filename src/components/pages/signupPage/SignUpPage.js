import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {PatternFormat} from 'react-number-format';
import LoginModal from "../../modal/LoginModal";

const SignUpPage = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(() => false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValue, setFormValue] = useState({
        username: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        authorities: []
    });

    const [authorities, setAuthorities] = useState([]);

    const onChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value});
    };


    const handleSelected = (e, data) => {
        if(data.checked) {
            setAuthorities([...authorities, data.value])
        }
        else {
            setAuthorities(authorities.filter(auth => auth !== data.value))
        }
    }

    useEffect(() => {
        setFormValue({...formValue, authorities: authorities})
    }, [authorities])

    function sendSignupRequest(e) {
        if (formValue.confirmPassword === '' ||
            formValue.password === '' ||
            formValue.email === '' ||
            formValue.phoneNumber === '' ||
            formValue.name === '' ||
            formValue.role === '' ||
            formValue.username === '') {
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
                        Регистрация
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                name='username'
                                placeholder='Username'
                                value={formValue.username}
                                onChange={onChange}
                            />

                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                name='name'
                                placeholder='Full name'
                                value={formValue.name}
                                onChange={onChange}
                            />

                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                name='email'
                                placeholder='E-mail address'
                                value={formValue.email}
                                onChange={onChange}
                            />

                            <PatternFormat
                                format="+7 (###) ### ## ##"
                                name='phoneNumber'
                                allowEmptyFormatting mask="*"
                                value={formValue.phoneNumber}
                                required
                                onChange={onChange}
                                className='mb-3'/>

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='password'
                                placeholder='Password'
                                type='password'
                                value={formValue.password}
                                onChange={onChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='confirmPassword'
                                placeholder='Confirm password'
                                type='password'
                                value={formValue.confirmPassword}
                                onChange={onChange}
                            />

                            <Grid textAlign='center'>
                                <Grid.Row>
                                    <Header as='h4' color='blue' textAlign='center' className='mb-0 mt-3'>
                                        В качестве кого вы хотите зарегистрироваться?
                                    </Header>
                                    <small className='text-muted text-center'>можно выбрать оба варианта</small>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Checkbox
                                            label='Заказчик'
                                            onClick={(event, data) => {handleSelected(event, data)}}
                                            name='authorities'
                                            value='ROLE_CONSUMER'/>

                                        <Checkbox
                                            label='Исполнитель'
                                            className='ms-5'
                                            onClick={(event, data) => {handleSelected(event, data)}}
                                            name='authorities'
                                            value='ROLE_PRODUCER'/>
                                    </div>
                                </Grid.Row>
                            </Grid>
                            <Button color='blue' fluid size='large'
                                    onClick={() => sendSignupRequest()}
                            className='mt-3'>
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <span className='pointer' style={{color:'#0E6EB8'}} onClick={() => {handleShow()}}>Log In</span>
                    </Message>
                </Grid.Column>
            </Grid>
            <div>
                <LoginModal show={show} handleClose={handleClose} handleShow={handleShow}/>
            </div>
        </div>
    );
};

export default SignUpPage;