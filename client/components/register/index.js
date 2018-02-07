import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../../actions";
import { Button } from 'antd';
// import '../../public/css/antd.min.css';
class Register extends React.Component{
    constructor() {
        super()
    }
    render(){
        return <div><Button>注册</Button></div>
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
)(Register)