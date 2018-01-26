import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../public/tool/DevTools'
import { createLogger } from 'redux-logger';
const logger = createLogger({ collapsed: true });

export default function configureStore(preloadedState) {

    let store = createStore(
            rootReducer,
            preloadedState,
            compose(
                applyMiddleware(thunk, logger),
                // window.devToolsExtension ? window.devToolsExtension() : f => f
                DevTools.instrument()
            )
        )
    

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
