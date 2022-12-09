import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.png";
import "../App.css";


const DiseaseDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "https://localhost:7156";
  let { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [diseases, setDisease] = useState([]);

  const setPatientData = () => {
    console.log("id " + id);
    fetch(baseURL + '/patients/' + id)
      .then((response) => response.json())
      .then((response) => {
        setPatient(response);
        console.log('response ' + response);
        setDisease(response.medicalHistory);
      })
      .catch((error) => {
        alert('Error Ocurred getting patient detail:' + error);
      });
  }

  useEffect(() => {
    console.log("here")
    setPatientData();
  }, []);


  const removeDisease = (diseaseId) => {
    fetch(baseURL + "/diseases/" + diseaseId, {
      method: 'DELETE',
    }).then((response) => {
      alert('Disease record ' + diseaseId + ' deleted!');
      setPatientData();
      navigate('/read-disease/' + id)

    }).catch(error => {
      alert("Error Ocurred in removeDisease:" + error);
    });
  }


  return (
    <div className="card-body">
      <br></br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate('/create-disease/'+id)}
        >
          Create New Disease
        </button>
      </nav>

      <br></br>
      <div className="col-md-6">
        <h4>{`${patient&&patient.fullName}`}Diseases List</h4>

        <div className="container col-md-3">
          <table className="table table-bordered table-striped table-dark">
            <thead>
              <tr key={1}>
                <th>№</th>
                <th>Details</th>
                <th>Begin Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {diseases &&
                diseases.map((disease, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="fit">{disease.content}</td>
                    <td>{disease.beginnigTime}</td>

                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() =>
                            navigate('/edit-disease/' + id + '/' + disease.id)
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
                          onClick={() => removeDisease(disease.id)}
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
export default DiseaseDataTable;