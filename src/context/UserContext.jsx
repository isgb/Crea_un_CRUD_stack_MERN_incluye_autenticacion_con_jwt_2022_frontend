import axios from 'axios';
import Swal from 'sweetalert2';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const initialState = { login: false, token:"", name: ""};

export const UserProvider=(props)=>{
    const [user,setUser] = useState(initialState)
    
    const loginUser = async (dataUser, navigate) => {
        try {

            const {data} = await axios.post('http://localhost:4000/api/login',dataUser,{
                mode   : 'cors',
            })

            // console.log("TEST",data)

            if(data.ok){
                const userLogin = {
                    login:true,
                    token:data.data.token,
                    name: data.data.nombre
                };
                localStorage.setItem("user",JSON.stringify(userLogin));
                setUser(userLogin);
                navigate('/employees')
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {  
            console.log(error)
            if(!error.ok){
                return Swal.fire({
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            // return Swal.fire({
            //             icon: 'error',
            //             title: error.message,
            //             showConfirmButton: false,
            //             timer: 1500
            //         })

            console.log('error en la funcion login', error.message)
        }
    }

    const value = {
        loginUser,
        user,
    }

    return <UserContext.Provider value={value} {...props}/>

}


export function useUser(){
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser error')
    }
    return context
}