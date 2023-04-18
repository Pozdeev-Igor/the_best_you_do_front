import React, {useState} from 'react';
import {Button, Container, Form, Grid, Header, Segment} from "semantic-ui-react";
import CategoriesDropDown from "./components/dropdown/CategoriesDropDown";
import {MDBCol, MDBFile, MDBRow} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

const NewProductPage = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const navigate = useNavigate();


    const changeHandler = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmission = () => {
        console.log(selectedFiles)
    };

    return (
        <div>
            <div className='background-image'>
                <Grid textAlign='center' style={{height: '105vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: '550px'}}>
                        <Header as='h2' color='blue' textAlign='center'>
                            Создайте новое объявление
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <div className='mb-3'>
                                    <CategoriesDropDown/>
                                </div>
                                <Form.Input
                                    fluid
                                    placeholder='Заголовок'
                                />
                                <Form.TextArea
                                    placeholder='Описание'
                                    type='text'
                                />
                                <Form.Input
                                    fluid
                                    placeholder='Стоимость услуги'
                                    type='number'
                                />
                                <MDBFile size='sm' id='formFileSm'
                                         multiple
                                         className='mb-3'
                                         style={{borderColor:'lightgray', color:'lightgray'}}
                                         onChange={changeHandler} />

                                <Container>
                                    <MDBRow>
                                        <MDBCol>
                                            <Button color='google plus' fluid size='large' onClick={() => {navigate(-1)}}>
                                                Отмена
                                            </Button>

                                        </MDBCol>

                                        <MDBCol>
                                            <Button color='blue' fluid size='large'
                                                    onClick={handleSubmission}>
                                                Создать
                                            </Button>
                                        </MDBCol>
                                    </MDBRow>
                                </Container>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
};

export default NewProductPage;