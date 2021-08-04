const initialState = {
    currentUser: {},
    isAuth: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER": {
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        }
        case "LOGOUT_USER": {
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        }
        default:
            return state;
    }
}


export const setUser = (user) => ({type: "SET_USER", payload: user});
export const logout = () => ({type: "LOGOUT_USER"});

export default userReducer;