import 'babel-polyfill';
import React from 'react';
import { connect } from 'react-redux'
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import routes from './routes';
const App = () => (
    <Switch>
        {routes.map((route,index) => (
            <Route key={index} {...route} exact/>
        ))}
    </Switch>
)
const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = {

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
