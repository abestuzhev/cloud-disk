const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY";
const PUSH_DIR = "PUSH_DIR";
const DELETE_FILE = "DELETE_FILE";
const CHANGE_VIEW_FILES = "CHANGE_VIEW_FILES";

const initialState = {
    files: [],
    currentDir: null,
    showPopup: "none",
    stackDir: [],
    view: "list"
}

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES: return { ...state, files: action.payload }
        case SET_CURRENT_DIR: return { ...state, currentDir: action.payload }
        case ADD_FILE: return { ...state, files: [...state.files, action.payload]}
        case PUSH_DIR: return { ...state, stackDir: [...state.stackDir, action.payload] }
        case SET_POPUP_DISPLAY: return { ...state, showPopup: action.payload }
        case DELETE_FILE: return { ...state, files: [...state.files.filter(file => file._id !== action.payload) ] }
        case CHANGE_VIEW_FILES: return { ...state, view: action.payload }
        default: return state;
    }
}

export const setFiles = (files) =>  ({type: SET_FILES, payload: files});
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir});
export const addFile = (file) => ({type: ADD_FILE, payload: file});
export const setPopupDisplay = (display) => ({type: SET_POPUP_DISPLAY, payload: display});
export const pushDir = (dirId) => ({type: PUSH_DIR, payload: dirId});
export const deleteFile = (dirId) => ({type: DELETE_FILE, payload: dirId});
export const changeViewFiles = (view) => ({type: CHANGE_VIEW_FILES, payload: view});



export default fileReducer;