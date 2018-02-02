import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
import actions from '../../actions';

class Home extends React.Component{
    constructor() {
        super()
    }
    
    componentDidMount() {
        // !this.props.userInfo.success && this.props.actions.fetchUserInfo();
    }
    go = () =>{
        console.log(this)
    }
    
    componentWillMount() {
        !this.props.userInfo.success && this.props.actions.fetchUserInfo();
    }
    render(){
        return <div>home 
            <Link to="/about">go to about</Link>
            <div id="test" onClick={this.go}>132132</div>
            <div>{this.props.userInfo.message}</div>
            </div>
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