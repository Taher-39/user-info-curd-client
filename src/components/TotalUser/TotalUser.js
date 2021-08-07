import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const TotalUser = () => {
    const [user, setUser] = useState([])
    const [singleUser, setSingleUser] = useState({})
    const [updateUserValue, setUpdateUserValue] = useState({})

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
                {user.length ?
                    user.map(data => <p key={data._id}>
                        <b>Name: </b>{data.name}  <b>Email: </b>{data.email}
                        <button className='btn btn-success mx-2' onClick={() => handleLoadUser(data._id)}>Update</button>
                        <button className='btn btn-danger' onClick={(e) => handleDeleteUser(data._id)}>Delete</button>
                    </p>)
                    : <h3 className='text-center pt-5'>Loading</h3>
                }
            </div>
            <div className='pt-3'>
                <h5>Update: {singleUser._id}</h5>
                <form onSubmit={handleUpdateSubmit}>
                    <input type='text' defaultValue={singleUser.name} name='name'  onBlur={handleBlur} />
                    <input type='text' defaultValue={singleUser.email} name='email'  onBlur={handleBlur} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default TotalUser;