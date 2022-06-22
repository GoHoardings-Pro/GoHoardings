import { useSelector } from "react-redux"

export const Validator = () => {
    const { isAuthenticate } = useSelector(state=> state.admin);
    // let value =  localStorage.getItem('user')
    if (isAuthenticate !== true) {
        return true
    } else {
        return false
    }
}