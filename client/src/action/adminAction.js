import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUIEST, LOGIN_ADMIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS} from "../consents/adminConsents";

import axios from "axios";

const url = 'http://localhost:8080'

export const adminLogin = (user) => async(dispatch)=>{
        try{
            dispatch({type: LOGIN_ADMIN_REQUIEST});

            const config = { headers : { "Content-Type" : "application/json"}};

            const { data } = await axios.post(`${url}/api/v1/admin/login`, user, config)

            dispatch({ type: LOGIN_ADMIN_SUCCESS, payload: data.result});

        }catch(error){
            dispatch({type: LOGIN_ADMIN_FAIL, payload: error.response })
        }
} 

export const loadeUser = ()=> async(dispatch)=>{
    try{
        dispatch({ type: LOAD_USER_REQUEST});
        console.log('work');
        const { data } = await axios.get(`${url}/api/v1/admin/me`);
        console.log(data);
        dispatch({ type: LOAD_USER_SUCCESS, payload:data.result});
    }catch(err){
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.message})
    }
};



export const logout = () => async(dispatch)=>{
    try{
        await axios.get(`${url}/api/v1/users/logout`);

        dispatch({type: LOGOUT_SUCCESS});
    }catch(err){
        dispatch({ type: LOGOUT_FAIL, payload: err.response.message})
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };