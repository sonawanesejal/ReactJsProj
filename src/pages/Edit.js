import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'

function Edit() {

    const {id} = useParams();
    const [values, setValues] = useState({
        id: id,
        name: '',
        sex: '',
        dob: '',
        salary: '',
        department: ''
    })

    useEffect(() => {
        axios.get('http://localhost:3000/users/'+id)
        .then(res => {
            setValues({...values, name: res.data.name, sex: res.data.sex, dob: res.data.dob, salary: res.data.salary, department: res.data.department})
        })
        .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/users/'+id, values)
        .then(res => {
            navigate('/dashboard');
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    const goBack= (e) => {
        e.preventDefault();
        window.history.back();
    }

    const logout= (e) => {
        e.preventDefault();
        navigate('/')
        window.location.reload();
      }

    return (
        <div className='dash-content'>
            <div className='container' >
                <div className='btn-group btn-group-lg d-flex gap-2' role="group" aria-label="....">
                    <button className='btn btn-dark' onClick={goBack}>Back</button>
                    <button type="button" className="btn btn-light w-100" onClick={() => navigate('/dashboard')}>Employees</button>
                    <button type="button" className="btn btn-dark w-100 active">Edit</button>
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
                                <h6>Are you sure you want to logout?</h6>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" onClick={logout}>Yes!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br />
                <div className='d-flex' style={{backgroundColor: "rgb(135,206,250)", border: "1px solid black"}}>
                <form onSubmit={handleSubmit}>
                    <h1>Edit Employee Data</h1>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Name' required
                        value={values.name} onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="sex">Sex</label>
                        <select type="text" name='sex' className='form-control' placeholder='Enter M or F' required
                        value={values.sex} onChange={e => setValues({...values, sex: e.target.value})}>
                        <option value={''}>None</option>
                        <option value={'M'}>M</option>
                        <option value={'F'}>F</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dob">DOB</label>
                        <input type="date" name='dob' className='form-control' placeholder='Enter dob' required
                        value={values.dob} onChange={e => setValues({...values, dob: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="salary">Salary</label>
                        <input type="number" name='salary' className='form-control' required
                        value={values.salary} onChange={e => setValues({...values, salary: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="department">Department</label>
                        <select type="text" name='department' className='form-control' required
                        value={values.department} onChange={e => setValues({...values, department: e.target.value})}>
                            <option value={''}>Select One</option>
                            <option value={'HR'}>HR</option>
                            <option value={'Sales'}>Sales</option>
                            <option value={'Accounts'}>Accounts</option>
                        </select>
                    </div><br />
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit;
