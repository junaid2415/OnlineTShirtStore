import { API } from "../../backend";
// category calls
    export const createCategory = (userId, token, category)=> {
        return fetch(`${API}/category/create/${userId}`,
        {
            method : "POST",
            headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(category)
        })
        .then(response =>{
            return response.json();
        })
        .catch( err =>  console.log(err));
    }
// getCategory  

export const getCategory= (categoryId)=>{
        // const url=`${API}/category/${categoryId}`

        return fetch(`${API}/category/${categoryId}`)
        .then(response =>{
            return response.json();
        })
        .catch( err =>  console.log(`${err}   hwlloo`));
    }


// getAll Category
    export const getAllCategory = () => {
        return fetch(`${API}/categories`,{
            method : "GET"
        })
        .then(response =>{
            return response.json();
        })
        .catch( err =>  console.log(err));
    }

    // update category

export const updateCategory = (userId ,CategoryId ,token, category ) => {
    return fetch(`${API}/category/${CategoryId}/${userId}`,{
        method : "PUT",
        headers : {
        Accept : "application/json",
        Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}



    // delete category
    export const deleteCategory =(userId, categoryId, token) =>{
        return fetch(`${API}/category/${categoryId}/${userId}`,{
            method:"DELETE",
            headers : {
                Accept : "application/json",
                Authorization : `Bearer ${token}`
                }
            })
            .then(response =>{
                return response.json();
            })
            .catch( err =>  console.log(err));
            
    }

// product calls
// create a product
export const createProduct = (userId , token , product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method : "POST",
        headers : {
        Accept : "application/json",
        Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}

// get all products
export const getAllProduct = () => {
    return fetch(`${API}/products`,{
        method : "GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}

// delete a product

export const deleteProduct = (userId , token , productId) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
        Accept : "application/json",
        Authorization : `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}


// get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,
    {
    method : "GET", 
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}


// update a product

export const updateProduct = (userId ,productId ,token, product ) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "PUT",
        headers : {
        Accept : "application/json",
        Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response =>{
        return response.json();
    })
    .catch( err =>  console.log(err));
}
