import React, { useState } from 'react';

import {isAuthenticated} from "../auth/helper"

import {cartEmpty,loadCart} from "./helper/cartHelper"
import { Link } from 'react-router-dom';



import StripeCheckout from 'react-stripe-checkout'
import { API } from '../backend';
import { createOrder } from './helper/orderhelper';

const StripeCheckoutfun = ({
    products,
    setReload = f => f,
    reload = undefined
    })=>{

        const [data, setData]=useState({
            loading: false,
            succes : false,
            error : "",
            address: ''
        });

        const token = isAuthenticated() && isAuthenticated().token
        const userId = isAuthenticated() && isAuthenticated().user._id

        // const getFinalPrice = () => {
        //     return products.reduce((currentValue, nextValue)=>{
        //         return currentValue+ nextValue.count * (nextValue)
        //     },0);

        // }
        const getFinalPrice = () => {
            let amount=0
            products?.map( p=> {
                amount = amount+p.price
            });
            return amount
        };


const makepayment = (token) => {
    // 
    const body = {
        token,
        products
    }
    const headers = {
        "Content-Type" : "application/json"
    }
return fetch(`${API}/stripepayment`, {
    method: "post",
    headers,
    body: JSON.stringify(body)
}).then( response => {
console.log(response, " ohh yeahhhh");
// call further method
// createOrder
}).catch( ee => console.log("this is where  it is ",ee)
)
}

const showStripeButton= () => {
    return isAuthenticated() ? (
        <StripeCheckout
        stripeKey="pk_test_51Gzda5FKhwz6ZAhOtnssza1w5Yc5L209y6jBJBZfV4eTvAkuYVJiACUMNlLXX2h6JpF19Qbx1cCMfyMMNhzKDFWX00h5EPtmIX"
        token = {makepayment}
        amount={getFinalPrice()*100}
        name="Buy T-Shirts"
        description="INdian T shirt"
        shippingAddress
        billingAddress
        >
        <button className="btn btn-success" > Pay with Stripe</button>
        </StripeCheckout>
    ) : (
        <Link to="/signin">
        <button className="btn btn-warning"> SignIn</button>
        </Link>
    )
}
// const error/Message = e

    return (
        <div>
        <h3 className="text-white">Stripe Checkout {getFinalPrice()} 
    </h3>{showStripeButton()}
        </div>
    )

}

export default StripeCheckoutfun