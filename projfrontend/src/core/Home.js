import React,{useState, useEffect} from 'react';

import "../styles.css"
import {API}  from '../backend'
import Base from './Base';
import Card from './card';
import { getProducts } from '../user/helper/coreapicalls';



export default function(){
    
    const [products, setP] =useState([])
    const [error, setError] = useState(false)


    const loadAllProducts = () => {
        getProducts()
        .then(data => {
            if(data.error){
                setError(true);
            }
            else{
                setP(data);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect( ()=>{
        loadAllProducts()
    },[])

    return (
        
            <Base title="Home Page" description="Welcome to E-Store">  
            <div className="row text-center">
              <h1 className="text-white">All of T shirts</h1>
              <div className="row">
                {products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}></Card>
                            </div>
                    )
                })}
              </div>
            </div>
        </Base>
    );
}