import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../App.css";

const PatientForm = () => {

  const editURL = "https://localhost:7156/patients/";
  const navigate = useNavigate();
  let {id} = useParams();
  const [patId, setPatId] = useState('');
  const [patFullName, setFullName] = useState('');
  const [patBirthDate, setBirthDate] = useState('');

useEffect(() => {

  fetch(editURL + id)
  .then(response => response.json())
  .then((response) => {
    const patData = response;
    setPatId(patData.id);
    setFullName(patData.fullName);
    setBirthDate(patData.birthDate);
  }).catch(error => { 
    alert("Error Ocurred getting patient detail:"+ error);
  });
}, [id]);


  const fullNameChangeHandler = (event) => {
    setFullName(event.target.value);
  };

  const birthDateChangeHandler = (event) => {
    setBirthDate(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    fetch(editURL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: patFullName,
        birthDate: patBirthDate,
      }),
    })
      .then((response) => {
        alert('Patient ' + patId + ' updated!');
        navigate('/read-patient');
      })
      .catch((error) => {
        alert('Error Ocurred updating patient:' + error);
      });
      
  };

    return(  
      <Alert variant='none' className='alert container col-md-3'>
      <Container>
      <Form onSubmit={submitActionHandler} id="data">
        <Form.Group controlId="form.Name">
            <Form.Label>User Full Name</Form.Label>
            <Form.Control type="text" value={patFullName} onChange={fullNameChangeHandler} placeholder="Enter Full Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type="text" value={patBirthDate} onChange={birthDateChangeHandler} placeholder="Enter Birth Date" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update Patient</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/read-patient")}>Cancel</Button>
      </Form>
    </Container>     
    </Alert>      
    
    );
}
export default PatientForm;