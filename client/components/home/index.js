import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
import actions from '../../actions';
import Axios from 'axios';
class Home extends React.Component{
    constructor() {
        super()
        this.state = {
            userInfo:{},
        }
    }
    componentDidMount() {
        !this.props.userInfo.username && this.props.actions.fetchUserInfo();
    }
    getUserInfo = () =>{
        Axios.get('/api/user/info').then(rs=>{
            this.setState({
                userInfo: rs.data.data
            })
        })
    }
    setCookie(){
        let cookie = {};
        let cookieArr = document.cookie.split(';');
        cookieArr.forEach(v=>{
            let arr = v.split('=');
            cookie[arr[0].replace(/\s/g,'')] = arr[1];
        })
        return cookie;
    }
    logout = () =>{
        Axios.get('/api/user/logout').then(rs => {
            if(rs.data.status === 200){
                this.props.actions.fetchUserInfo();
            }else{
                alert(rs.data.error)
            }
        })
    }
    // static fetch (store){
    //     return store.dispatch(actions.fetchUserInfo())
    // }
    render(){
        let {userInfo} = this.props;

        return (<div>
            <span style={{ marginLeft: "30px" }}>您好，{userInfo.username}</span>
                <Link style={{ marginLeft: "30px" }} to="/login">登录</Link>
                <Link to="/register">注册</Link>
                {userInfo.username && <span style={{ marginLeft: "30px" ,color:"red"}} onClick={this.logout}>退出登录</span>}
        </div>)
    }
}
function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)