import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const TotalUser = () => {
    const [user, setUser] = useState([])
    const [singleUser, setSingleUser] = useState({})
    const [updateUserValue, setUpdateUserValue] = useState({})
    const [updateClick, setUpdateClick] = useState(false)

    useEffect(() => {
        fetch("https://agile-sands-57980.herokuapp.com/getTotalUser")
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })

    }, [])

    
    const handleLoadUser = (id) => {
        
        fetch(`https://agile-sands-57980.herokuapp.com/getSingleUser/${id}`)
            .then(res => res.json())
            .then(data => {
                setSingleUser(data)
            })
        setUpdateClick(true)
    }

    const handleBlur = (e) => {
        const newUserValue = { ...updateUserValue };
        newUserValue[e.target.name] = e.target.value; 
        setUpdateUserValue(newUserValue)
    }

    const handleUpdateSubmit = (e) => {
        fetch(`https://agile-sands-57980.herokuapp.com/updateUserInfo/${singleUser._id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateUserValue)
        }).then(res => res.json())
        .then(data => alert('User Updated Successfully.'))
        e.preventDefault()
        setUpdateClick(false)
    }
    
    const handleDeleteUser = (id) => {
        fetch(`https://agile-sands-57980.herokuapp.com/deleteUser/${id}`, {
             method: "DELETE"   
        }).then(res => res.json())
        .then(result => {
            if(result){
                alert("Deleted Successfully")
            }
        })
    }
    return (
        <div>
            <div>
                <table className='table table-borderless'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            user.length ?
                                user.map((data, index) =>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            
                                                <button className='btn btn-success mx-2' onClick={() => handleLoadUser(data._id)}>Update</button>
                                                <button className='btn btn-danger' onClick={() => handleDeleteUser(data._id)}>Delete</button>
                                            
                                        </td>
                                    </tr>
                                )
                            : <h3 className='text-center pt-5'>Loading</h3>
                        }
                    </tbody>
                </table> 
            </div>
            <div className='pt-3'>
                {
                    updateClick === true &&
                        <div>
                            <h5>Employee Id: {singleUser._id}</h5>
                            <form onSubmit={handleUpdateSubmit}>
                                <input className='form-control mb-2' type='text' defaultValue={singleUser.name} name='name' onBlur={handleBlur} />
                                <input className='form-control ' type='text' defaultValue={singleUser.email} name='email' onBlur={handleBlur} />
                                <button type="submit" className='btn btn-success mt-2'>Submit</button>
                            </form>
                        </div>
                }
            </div>
        </div>
    );
};

export default TotalUser;