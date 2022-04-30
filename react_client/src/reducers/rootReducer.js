const initState = {
    isLogged: false
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN_CHANGE":
            return {
                ...state,
                isLogged: !state.isLogged
            }
        default:
            return state
    }
    // if (action.type === "LOGIN_TRUE") {
    //     let newIsLogged = true
    //     return {
    //         isLogged: newIsLogged
    //     }
    // }
    // return state
}

export default rootReducer