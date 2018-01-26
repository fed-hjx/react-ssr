import React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import routes from './routes';
import DevTools from './public/tool/DevTools'
const App = () => (
    <div>
        <Switch>
            {routes.map((route,index) => (
                <Route key={index} {...route} exact/>
            ))}
        </Switch>
    </div>
)
export default App;
