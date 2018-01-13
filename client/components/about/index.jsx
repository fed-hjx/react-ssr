import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../../actions";
import Tt from '../common'

class About extends React.Component{
    constructor() {
        super()
    }
    render(){
        return <div>about----=== <Tt /></div>
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
)(About)