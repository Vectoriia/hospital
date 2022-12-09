import React from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientDataTable from './components/PatientDataTable';
import AddDisease from './components/AddDisease';
import EditDisease from './components/EditDisease';
import DiseaseDataTable from './components/DiseaseDataTable';

function App() { 

  return (
    <div className="  App">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">Hospital KPZ</h4>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/read-patient" />} />
        <Route exact path="/create-patient" element={<AddPatient />} />
        <Route exact path="/read-patient" element={<PatientDataTable />} />
        <Route path="/edit-patient/:id" element={<EditPatient />} />
        <Route exact path="/create-disease/:id" element={<AddDisease />} />
        <Route exact path="/read-disease/:id" element={<DiseaseDataTable />} />
        <Route path="/edit-disease/:patientId/:diseaseId" element={<EditDisease />} />
      </Routes>
    </div>
  );
}

export default App;
