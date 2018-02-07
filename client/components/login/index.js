import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../../actions";

class Login extends React.Component{
    constructor() {
        super()
    }
    render(){
        return <div>Login----=== </div>
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
)(Login)