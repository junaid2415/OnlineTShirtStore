import React,{useState, useEffect} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import {updateCategory, getCategory} from './helper/adminapicall';
import { API } from '../backend';
// updateCategory

// category calls
const UpdateCategory = ({match}) => {


  const[name, setName] = useState("")   
  const [newcate, setCate]=useState("") 
  const[error, setError] = useState(false)    
  const[success, setSuccess] = useState(false)    

  const {user , token} =isAuthenticated();

  const goBack = () =>{
      return(
          <div className="mt-5">
              <Link className="btn btn-small btn-info mb-3" to="/admin/dashboard"> Admin Home</Link>
          </div>
      );
  }



  const successMessage = () => {
      if(success){
          return <h4 className="text-success">Category Updated successfully </h4>
      }
  }


  const warningMessage =()=> {
      if(error){
          return <h4 className="text-success">Failed to update Category</h4>
      }
  }


  const handleChange = (event) => {
      setError("");
      setName(event.target.value);

  }

  const preload= (cateId) => {

    getCategory(cateId)
    .then(data => {
      if(data.error){
        setError(false)
      }
      else{
        setCate(data)
        console.log(newcate)
        
        setName(data.name)
      }
    })
    .catch( err => console.log(err))

  }


  useEffect(
    ()=>{
 preload(match.params.categoryId)     
    },[]
  )



  const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess(false);
      
      newcate.name =name;
      console.log(newcate); 
      // backend request fired
      updateCategory( user._id,match.params.categoryId ,token, newcate ).then(data => {
              if(data.error)
              {
              setError(true);
              }
              else{
                  setError("")
                  setSuccess(true)
                  // setName("");
              }
      })
  }


  const myCategoryForm = () => (
      <form>
          <div className="form-group">
              <p className="lead"> Enter the Category</p> 
              <input
              type="text"
              className="form-control my-3"
              autoFocus
              onChange= {handleChange}
              value= {name}
              required
              placeholder={name}/>
              <button 
              onClick={onSubmit}
              className="btn btn-outline-info">Update Category</button>
          </div>
      </form>
  )

  return (
    <Base
    title="Update Category Here"
    description=""
    className="container bg-info p-4">
       <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
              {warningMessage()}
               {myCategoryForm()}
               {goBack()}
        </div>
    </div>
    </Base>
  )
}
export default UpdateCategory;
