import { setUser } from "../reducers/userReducer";
import { axios } from "axios";


export const login = ({email, password}) => async dispatch => {


    const responce = await axios.post("http://localhost:500/api/auth/login", {
        email, 
        password
    })

    console.log(responce.data);

    //получаем юзера через запрос
    //сетаем его в redux
    // dispatch(setUser(responce.data));
}