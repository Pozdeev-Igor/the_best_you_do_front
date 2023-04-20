import React, {useState} from 'react';
import {Button, Dropdown, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {PatternFormat} from 'react-number-format';

const SignUpPage = () => {

    const navigate = useNavigate();

    const [options, setOptions] = useState([
        {
            key: 'ROLE_CONSUMER',
            value: 'ROLE_CONSUMER',
            text: 'Заказчик'
        },

        {
            key: 'ROLE_PRODUCER',
            value: 'ROLE_PRODUCER',
            text: 'Исполнитель'
        }
    ]);


    const [formValue, setFormValue] = useState({
        username: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const [role, setRole] = useState("");

    const onChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value});
        console.log(formValue)
    };

    const handleSelected = (e, data) => {
        setRole(data.value)
        setFormValue({...formValue, role: data.value})
    }

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

                            <Dropdown
                                placeholder='В качестве кого вы хотите зарегистрироваться?'
                                fluid
                                search
                                selection
                                options={options}
                                // value={formValue.role}
                                onChange={handleSelected}
                            />

                            <Button color='blue' fluid size='large'
                                    onClick={() => sendSignupRequest()}
                            className='mt-3'>
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <a href='src/components/pages/signupPage/SignUpPage#'>Log In</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default SignUpPage;