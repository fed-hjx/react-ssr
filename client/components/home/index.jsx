import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Link} from 'react-router-dom';
import actions from '../../actions';
import Tt from '../common'

class Home extends React.Component{
    constructor() {
        super()
    }
    
    componentDidMount() {
        this.props.actions.fetchUserInfo();
        
        // let Test = await import ('./test.js');
        // console.log(aa)
        // ReactDOM.render(<Test></Test>,document.getElementById('test'))
        // console.log(222)
    }
    
    render(){
        return <div>home <Tt/><Link to="/about">go to about</Link><div id="test"></div></div>
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