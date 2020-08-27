import React, {useState, useEffect }from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllCategory, deleteProduct, deleteCategory } from './helper/adminapicall';
// delete
// deleteThisProduct
// deleteCategory

// isAuthenticated
const ManageCategory = () => {

    const [categories, setCate] = useState([])
    const {user , token } =isAuthenticated()

    const preload = () => {
        getAllCategory()
        .then(data =>{
            if(data.error){ 
                console.log(data.error);
            }
            else{
                // console.log(data);
                setCate(data);
            }
        }); 
    }
    
    useEffect( ()=> {
        preload();
    })


 const deleteThisCategory = (cateId) => {

    deleteCategory(user._id,cateId,token)
    .then(data =>{
        if(data.error){
                    console.log(data.error);
                }
                else{
                    // console.log(data);
                    preload();
                }
            }); 


 }




    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>

          {categories.map( (cate,index)=> (
                                    <div key={index} className="row text-center mb-2 ">
                                     <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                                    <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                                    <div className="col-4">

                  <button onClick={() => {
                      deleteThisCategory(cate._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
            </div>
                                ))}
        </div>
      </div>
    </Base>
    )
}

export default ManageCategory;