export const validator = () => {
    let value =  localStorage.getItem('user')
    if (value !=('user')) {
        return true
    } else {
        return false
    }
}