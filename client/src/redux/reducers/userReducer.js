const initialState = {
    currentUser: {},
    isActive: false
}

const userReducer = (state = initialState, action) => {
    switch(action){
        case "SET_USER": {
            return {
                currentUser: action.payload,
                isActive: true
            }
        }
        default:
            return state;
    }
}


export const setUser = (user) => ({type: "SET_USER", payload: user});

export default userReducer;