
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import fileReducer from "./reducers/fileReducer";
import userReducer from "./reducers/userReducer";
import uploadReducer from "./reducers/uploadReducer";

const RootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer
});


const store = createStore(RootReducer, applyMiddleware(thunk));
window.s = store.getState();
export default store;