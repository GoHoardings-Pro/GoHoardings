import { LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUIEST, LOGIN_ADMIN_SUCCESS,CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_SUCCESS, LOAD_USER_FAIL, LOGOUT_FAIL } from "../consents/adminConsents";

export const adminReducer = (state = { admin: { } }, action)=>{
    switch (action.type) {
        case LOGIN_ADMIN_REQUIEST:
            case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticate: false,
            }
        case LOGIN_ADMIN_SUCCESS:
        case LOAD_USER_SUCCESS:    
            return{
                ...state,
                loading: false,
                isAuthenticate: true,
                admin: action.payload.user
            }
          
         case LOGOUT_SUCCESS:
            return {
                loading:false,
                admin:null,
                isAuthenticate:false
            }    
        case LOGIN_ADMIN_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticate: false,
                error: action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
               isAuthenticate:false,
               user:null,
              error: action.payload.message    
        }

        case LOGOUT_FAIL:
            return{
                loading:false,
                isAuthenticate: false,
                user:null,
                error: action.payload
            };
            
        case CLEAR_ERROR:
            return{
                ...state,
                error: null
            }        
        default:
            return state
    }
}