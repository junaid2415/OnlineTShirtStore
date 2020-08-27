import React,{useState, useEffect} from 'react';

// Base

import StripeCheckoutfun from '../stripecheckout'



import { loadCart } from './cartHelper';
import Base from '../Base';
import Card from '../card';
 


 const Cart=()=>{
    
    const [products, setP] =useState([])
    const [reload, setReload] =useState(false)



    useEffect(()=> {

        setP(loadCart());
        // console.log(products)

    },[reload])

    const loadAllProducts = ()=> {
        return (
            <div>
                <h2>
                    This section is to load products </h2>
                    {products.map((product, idx) => (
                        <Card
                        key={idx}
                        product={product}
                        removeFromCart={true}
                        addtocart={false}
                        setReload={setReload}
                        reload={reload}
                        >

                        </Card>
        ))}
               
            </div>
        )
    }
    const checkOutProducts = ()=> {
        return (
            <div>
                <h2>
                    This section is to  checkout products
                </h2>
            </div>
        )
    }


    return (
        
            <Base title="Cart Page" description="Ready Check out">  
            <div className="row text-center">
              <div className="col-6">{loadAllProducts()}</div>
    <div className="col-6">
        <StripeCheckoutfun
        products={products}
        setReload={setReload}></StripeCheckoutfun>
    </div>

            </div>
        </Base>
    );
}

export default Cart;