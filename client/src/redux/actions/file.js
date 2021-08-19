import axios from "axios"
import {useDispatch} from "react-redux"
import { setFiles } from "../reducers/fileReducer";


export const getFiles = (dirId) => async(dispatch) => {
    const dispatch = useDispatch();
    try {
        const responce = await axios.get(`http://localhost:5000/api/files${dirId ? "?parent=" + dirId  : ""}`)
        dispatch(setFiles(responce.data))
    } catch (error) {
        console.log("error getFile", error);
    }
    
}