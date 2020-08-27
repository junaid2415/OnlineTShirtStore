import React, { useState } from 'react';
import Base from "../core/Base";
import {signup, isAuthenticated} from "../auth/helper"
import { Link } from 'react-router-dom';

const Signup = () => {
const [values, setValues] =useState({
    name : "",
    email : "",
    password : "",
    error : "",
    success : false
});

const { name, email, password, error, success} = values
const {user} = isAuthenticated();

const handleChange  = name => event => {
        setValues({...values, error : false, [name] : event.target.value })
}
    
const onSubmit = event => {
    event.preventDefault()
    setValues({...values, error: false})
    signup({name, email, password})
    .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success : false})
                console.log(" IN THEN IF")
            }
            else{
                console.log(" IN THEN ELSE")

                setValues({...values, name : "" , email: "", password:"", error:"", success: true})
            }
        }
    )
    .catch(err => console.log("Error in sign up"))
}


const SignUpForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                            className="form-control"
                            type="text"
                            onChange = {handleChange("name")} 
                            value={name}        
                             ></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                             className="form-control" 
                            onChange = {handleChange("email")} 
                            value={email}        
                            type="email"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                            className="form-control" 
                            onChange = {handleChange("password")} 
                            value={password}
                            type="password"></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>

                </div>
            </div>
        )
    }

const successMessage = () => {
    return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-success"
        style={ {display: success ? "" : "none"}}>
            New account was created Successfully. Please{" "}
<Link to="/signin">Login Here</Link>
    </div>
    </div>
    </div>
    )
}

const errorMessage = () => {
   return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
       
    <div className="alert alert-danger"
        style={ {display: error ? "" : "none"}}>
            {error}
    </div>
    </div>
    </div>
    
    ) 
}


    
return(

<Base title="SignUP page"  description="A page to user to sign up">
{successMessage()}
{errorMessage()}
{SignUpForm()}
<p className="text-white text-center">{JSON.stringify(values)}</p>

    </Base>
);
}

export default Signup;