import React from 'react';
import UserTable from '../UserTable/UserTable';
import { useForm } from "react-hook-form";
import './Home.css'
import TotalUser from '../TotalUser/TotalUser';
const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userData = {
            name: data.name,
            userName: data.userName,
            email: data.email,
            phone: data.phone,
            website: data.website
        }
        const url = `https://agile-sands-57980.herokuapp.com/addUser`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => {
                alert("User Added Successfully.")
            })
    };
    return (
        <div className='bg'> 
            <h1 className='text-center pt-3'>There is New User Information Area</h1>
            
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input className='form-control w-50' placeholder="Name" {...register("name", { required: true })} />
                            {errors.name && <span className='text-danger'>This field is required</span>}
                            <br />
                            <input type='email' className='form-control w-50' placeholder="abc@gmail.com" {...register("email", { required: true })} />
                            {errors.email && <span className='text-danger'>This field is required</span>}
                            <br />
                            <input className='form-control w-50' placeholder="abc.com" {...register("website", { required: true })} />
                            {errors.website && <span className='text-danger'>This field is required</span>}
                            <br />

                            <input type="submit" />
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h3 className='text-center text-secondary'>Total User Table</h3>
                        <TotalUser></TotalUser>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;