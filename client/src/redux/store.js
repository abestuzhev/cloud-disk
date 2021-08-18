
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import fileReducer from "./reducers/fileReducer";
import userReducer from "./reducers/userReducer";

const RootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
});


const store = createStore(RootReducer, applyMiddleware(thunk));
window.s = store.getState();
export default store;