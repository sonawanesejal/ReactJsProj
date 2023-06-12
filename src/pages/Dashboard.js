import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import ConfirmBox from "../components/ConfirmBox";


function Dashboard() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/users`)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${deleteData?.id}`)
    .then(res => {
      window.location.reload();
    })
    .catch(err => console.log(err));
  }

  function openDelete(user) {
    setOpen(true);
    setDeleteData(user);
  }

  const logout= (e) => {
    e.preventDefault();
    navigate('/')
    window.location.reload();
  }

  return (
    <div className="dash-content" style={{height: "850px"}}>
      <div className="container">
        <div className='btn-group btn-group-lg d-flex gap-2' role="group" aria-label="...">
          <button type="button" className="btn btn-light w-100 active">Employees</button>
          <button type="button" className="btn btn-light w-100">Edit</button>
          <button type="button" className="btn btn-light w-100" onClick={() => navigate('/add')}>Add</button>
          <button type="button" className="btn btn-light w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Log Out
          </button>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-7" id="staticBackdropLabel">Log Out</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <h6>Are you sure you want to logout?If yes, then click on yes.</h6>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary" onClick={logout}>Yes!</button>
                </div>
              </div>
            </div>
          </div>
        </div><br/>
        <div className="form-div">
          <table className="table table-bordered table-striped table-hover table-responsive">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sex</th>
                <th>DOB</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-success">
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.sex}</td>
                  <td>{user.dob}</td>
                  <td>{user.salary}</td>
                  <td>{user.department}</td>
                  <td>
                    <Link className="text-decoration-none btn btn-sm btn btn-secondary" to={`/edit/${user.id}`}>Edit</Link>
                    <button className="text-decoration-none btn btn-sm btn btn-warning mx-1" 
                    onClick={() => openDelete(user)}>Delete</button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
        <ConfirmBox
          open={open}
          closeDialog={() => setOpen(false)}
          title={deleteData?.name}
          deleteFunction={deleteUser}
        />
      </div>
    </div>
  );
};

export default Dashboard;
