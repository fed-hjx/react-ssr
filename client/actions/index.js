import Axios from 'axios';
const fetchSuccess = (data) => ({
    type: 'GET_USER_INFO_SUCCESS',
    userInfo: data
})
function fetchUserInfo() {
    return async (dispatch) => {
            // dispatch(fetchSuccess({username:'test'}))

        await Axios.get('/api/user/info').then(rs=>{
            dispatch(fetchSuccess(rs.data.data))
        })
    }
}

export default {
    fetchUserInfo,
}
