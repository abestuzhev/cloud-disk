import { setUser } from "../reducers/userReducer";
import axios from "axios";


export const registration = async ({email, password}) => {
    const response = await axios.post("http://localhost:5000/api/auth/registration", {
        email, 
        password
    }).catch(function (error) {
            if (error.response) {
                return error.response.data;
            }
        })
    return response.data;
}

export const login = ({email, password}) => async dispatch => {
    const responce = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
    })
    dispatch(setUser(responce.data.user))
    localStorage.setItem('token', responce.data.token)
    console.log(responce.data);
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            console.log(response.data.user)
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}