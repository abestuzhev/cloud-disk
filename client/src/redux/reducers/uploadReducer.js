const SHOW_UPLOAD_FILES = "SHOW_UPLOAD_FILES";
const HIDE_UPLOAD_FILES = "HIDE_UPLOAD_FILES";
const ADD_UPLOAD_FILES = "ADD_UPLOAD_FILES";
const REMOVE_UPLOAD_FILES = "REMOVE_UPLOAD_FILES";
const CHANGE_UPLOAD_FILES = "CHANGE_UPLOAD_FILES";


const initialState = {
    isVisible: false,
    files: []
}

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_UPLOAD_FILES: return { ...state, isVisible: true }
        case HIDE_UPLOAD_FILES: return { ...state, isVisible: false }
        case ADD_UPLOAD_FILES: return { ...state, files: [...state.files, action.payload] }
        case REMOVE_UPLOAD_FILES: return { ...state, files: [...state.files.filter(file => file.id !== action.payload.id)] }
        case CHANGE_UPLOAD_FILES: return {
            ...state,
            files: [...state.files.map(file => file.id === action.payload.id
            ? {...file, progress: action.payload.progress}
            : {...file})]
        }
        default: return state;
    }
}

export const showUploadFiles = () =>  ({type: SHOW_UPLOAD_FILES});
export const hideUploadFiles = () =>  ({type: HIDE_UPLOAD_FILES});
export const addUploadFiles = (file) =>  ({type: ADD_UPLOAD_FILES, payload: file});
export const removeUploadFiles = (file) =>  ({type: REMOVE_UPLOAD_FILES, payload: file});
export const changeUploadFiles = (file) =>  ({type: CHANGE_UPLOAD_FILES, payload: file});

export default uploadReducer;