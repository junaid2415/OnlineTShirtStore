import {API} from '../../backend'
// API is env var = "http://localhost:8000/api"


export const signup = user => {
    return fetch(`${API}/signup`,{
        method : "post",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
      body : JSON.stringify(user)  
    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err))
}




export const signin = user => {
    return fetch(`${API}/signin`,{
        method : "post",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
      body : JSON.stringify(user)  
    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err))
}


export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data))
        // a token is being set once he's signed in
        next();
    }
}


export const signout =next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API/signout}`, {
            method:"GET"
        })
        .then(response => console.log("User signed out"))
        .catch(err => console.log(err))
    }
}



export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false; 
    }
}