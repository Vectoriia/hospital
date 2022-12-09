import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../App.css";

const DiseaseForm = () => {

  const editURL = "https://localhost:7156/diseases/";
  const navigate = useNavigate();
  let { patientId, diseaseId } = useParams();
  const [disId, setDisId] = useState('');
  const [disContent, setContent] = useState('');
  const [disBeginningTime, setBeginningTime] = useState('');

useEffect(() => {

  fetch(editURL + diseaseId)
  .then(response => response.json())
  .then((response) => {
    const disData = response;
    setDisId(disData.id);
    setContent(disData.content);
    setBeginningTime(disData.beginnigTime);
  }).catch(error => { 
    alert("Error Ocurred getting disease detail:"+ error);
  });
}, [diseaseId]);


  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const begginingTimeChangeHandler = (event) => {
    setBeginningTime(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    fetch(editURL + diseaseId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: disContent,
        beginnigTime: disBeginningTime,
      }),
    })
      .then((response) => {
        alert('Disease ' + disId + ' updated!');
        navigate('/read-disease/' + patientId);
      })
      .catch((error) => {
        alert('Error Ocurred updating disease:' + error);
      });
      
  };

    return(  
      <Alert variant='none' className='alert container col-md-3'>
      <Container>
      <Form onSubmit={submitActionHandler} id="data">
        <Form.Group controlId="form.Name">
            <Form.Label>Disease Details</Form.Label>
            <Form.Control type="text" value={disContent} onChange={contentChangeHandler} placeholder="Enter Details" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Beginning Time</Form.Label>
            <Form.Control type="text" value={disBeginningTime} onChange={begginingTimeChangeHandler} placeholder="Enter Beginning Time" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update Disease</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/read-disease/" + patientId)}>Cancel</Button>
      </Form>
    </Container>     
    </Alert>      
    
    );
}
export default DiseaseForm;