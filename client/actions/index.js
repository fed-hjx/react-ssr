import Http from '../public/http';
const fetchSuccess = (data) => ({
    type: 'GET_USER_INFO_SUCCESS',
    userInfo: data
})
function fetchUserInfo() {
    return async (dispatch) => {
        await Http.get('/pl3/info').then(rs=>{
            dispatch(fetchSuccess(rs))
        })
    }
}

export default {
    fetchUserInfo,
}
