import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../App.css";

const PatientForm = () => {
  const baseURL = "https://localhost:7156/patients";
  const navigate = useNavigate();
  const [enterdFullName, setFullName] = useState('');
  const [enteredBirthDate, setBirthDate] = useState('');

  const fullNameChangeHandler = (event) => {
    setFullName(event.target.value);
  };

  const birthDateChangeHandler = (event) => {
    setBirthDate(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    fetch(baseURL , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: enterdFullName,
        birthDate: enteredBirthDate,
      })
    })
      .then((response) => {
        alert("Patient "+ enterdFullName +" added!");
        navigate("/read-patient");
      }).catch(error => { 
        alert("error==="+error);
      });
    
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setFullName('');
    setBirthDate(null);
    navigate("/read-patient");

  }
    return(  
      <Alert variant='none' className='alert container col-md-3'>
      <Container >
      <Form onSubmit={submitActionHandler}>
        <Form.Group controlId="form.Name">
            <Form.Label className='align-left'>Full Name</Form.Label>
            <Form.Control type="text" value={enterdFullName} onChange={fullNameChangeHandler} placeholder="Enter Full Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type="text" value={enteredBirthDate} onChange={birthDateChangeHandler} placeholder="Enter Birth Date" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Add Patient</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
      
    </Container>     
    </Alert>      
    
    );
}
export default PatientForm;