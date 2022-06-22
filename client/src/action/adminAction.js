import { LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUIEST, LOGIN_ADMIN_SUCCESS} from "../consents/adminConsents";

import axios from "axios";

const url = 'http://localhost:8080'

export const adminLogin = (user) => async(dispatch)=>{
        try{
            dispatch({type: LOGIN_ADMIN_REQUIEST});

            const config = { headers : { "Content-Type" : "application/json"}};

            const { data } = await axios.post(`${url}/api/v1/admin/login`, user, config)

            dispatch({ type: LOGIN_ADMIN_SUCCESS, payload: data});

        }catch(error){
            dispatch({type: LOGIN_ADMIN_FAIL, payload: error.response })
        }
} 