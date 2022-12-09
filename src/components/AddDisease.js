import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../App.css";

const DiseaseForm = () => {
  const baseURL = "https://localhost:7156/diseases/";
  const navigate = useNavigate();
  let { id } = useParams();
  const [enterdContent, setContent] = useState('');
  const [enteredBeginnigTime, setBeginningTime] = useState('');

  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const beginnigDateChangeHandler = (event) => {
    setBeginningTime(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    fetch(baseURL + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: enterdContent,
        beginnigTime: enteredBeginnigTime,
      }),
    })
      .then((response) => {
        alert('Disease ' + enterdContent + ' added!');
        navigate('/read-disease/' + id);
      })
      .catch((error) => {
        alert('error===' + error);
      });
    
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setContent('');
    setBeginningTime(null);
    navigate('/read-disease/' + id);

  }
    return(  
      <Alert variant='none' className='alert container col-md-3'>
      <Container >
      <Form onSubmit={submitActionHandler}>
        <Form.Group controlId="form.Text">
            <Form.Label className='align-left'>Details</Form.Label>
            <Form.Control type="text" value={enterdContent} onChange={contentChangeHandler} placeholder="Enter Details" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Beginning Time</Form.Label>
            <Form.Control type="text" value={enteredBeginnigTime} onChange={beginnigDateChangeHandler} placeholder="Enter Beginning Time" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Add Disease</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
      
    </Container>     
    </Alert>      
    
    );
}
export default DiseaseForm;