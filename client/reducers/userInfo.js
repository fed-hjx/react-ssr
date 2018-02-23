const baseData = {
    username : null,
}
const userInfo = (state = { ...baseData}, action) =>{
    switch (action.type) {
        case 'GET_USER_INFO_SUCCESS':
            return action.userInfo
        default:
            return state
    }
}

export default userInfo;