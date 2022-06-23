import { LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUIEST, LOGIN_ADMIN_SUCCESS,CLEAR_ERROR } from "../consents/adminConsents";

export const adminReducer = (state = { admin: { } }, action)=>{
    switch (action.type) {
        case LOGIN_ADMIN_REQUIEST:
            return{
                loading: true,
                isAuthenticate: false,
            }
        case LOGIN_ADMIN_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticate: true,
                admin: action.payload.user
            }
        case LOGIN_ADMIN_FAIL:
            return{

                ...state,
                loading:false,
                isAuthenticate: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }        
        default:
            return state
    }
}