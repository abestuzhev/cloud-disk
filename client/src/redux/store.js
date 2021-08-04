
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import userReducer from "./reducers/userReducer";

const RootReducer = combineReducers({
    user: userReducer,
});


const store = createStore(RootReducer, applyMiddleware(thunk));
window.s = store.getState();
export default store;