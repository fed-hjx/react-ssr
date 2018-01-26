import 'babel-polyfill';
import React from 'react';
import { connect } from 'react-redux'
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import routes from './routes';
import DevTools from './public/tool/DevTools'
// const App = () => (
//     <Switch>
//         {routes.map((route,index) => (
//             <Route key={index} {...route} exact/>
//         ))}
//     </Switch>
// )
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
       
    }
    render(){
        return <div>
                <Switch>
                {
                    routes.map((route, index) => (
                        <Route key={index} {...route} exact />
                    ))
                }
                </Switch>
        </div>
    }
}
const mapStateToProps = (state, ownProps) => ({
    ...state
})

const mapDispatchToProps = {

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
