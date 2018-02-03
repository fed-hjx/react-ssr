import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
import actions from '../../actions';

class Home extends React.Component{
    constructor() {
        super()
        this.state = {
            userInfo:{
                name: 'test'
            }
        }
    }
    componentDidMount() {
        !this.props.userInfo.success && this.props.actions.fetchUserInfo();
    }
    getUserInfo = () =>{
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState===4 && xhr.status===200){
                that.setState({
                    userInfo: JSON.parse(xhr.responseText).data
                })
            }
        }
        xhr.open('get','/api/user/getUserInfo')
        xhr.send()
    }
    static fetch (store){
        return store.dispatch(actions.fetchUserInfo())
    }
    render(){
        let {userInfo} = this.state;

        return (<div>home 
            <Link to="/about">go to about</Link>
            <div id="test" onClick={this.getUserInfo}>获取用户信息</div>
            <div>{userInfo.name}</div>
            <div>{this.props.userInfo.message}</div>
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