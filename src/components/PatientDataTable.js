import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.png";
import diseaseIcon from './../assets/disease.jpg';
import "../App.css";


const PatientDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "https://localhost:7156";
  const [patients, setPatients] = useState([]);

  const setPatientsData = () => {
    fetch(baseURL + "/patients")
    .then(response => response.json())
    .then((response) => {
      setPatients(response);
    }).catch(error => {
      alert("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setPatientsData();
  }, []);


  const removePatient = (id) => {
    fetch(baseURL + "/patients/" + id, {
      method: 'DELETE',
    }).then((response) => {
      alert("Patient record " + id + " deleted!");
      setPatientsData();
      navigate('/read-patient')

    }).catch(error => {
      alert("Error Ocurred in removePatient:" + error);
    });
  }


  return (
    <div className="card-body">
      <br></br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate('/create-patient')}
        >
          Create New Patient
        </button>
      </nav>

      <br></br>
      <div className="col-md-6">
        <h4>Patients List</h4>

        <div className="container col-md-3">
          <table className="table table-bordered table-striped table-dark">
            <thead>
              <tr key={1}>
                <th>№</th>
                <th>Full Name</th>
                <th>Birth Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients.map((patient, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="fit">{patient.fullName}</td>
                    <td>{patient.birthDate}</td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() =>
                            navigate('/edit-patient/' + patient.id)
                          }
                          className="button btn-info rounded"
                        >
                          <img
                            src={editIcon}
                            alt="Edit"
                            width="25"
                            height="25"
                            title="Edit"
                          />
                        </button>

                        <button
                          onClick={() => removePatient(patient.id)}
                          className="button btn-danger rounded"
                        >
                          <img
                            src={deleteIcon}
                            alt="Remove"
                            title="Remove"
                            width="25"
                            height="25"
                          />
                        </button>
                        <button
                          onClick={() =>
                            navigate('/read-disease/' + patient.id)
                          }
                          className="button btn-info rounded"
                        >
                          <img
                            src={diseaseIcon}
                            alt="Diseases"
                            width="25"
                            height="25"
                            title="Diseases"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PatientDataTable;