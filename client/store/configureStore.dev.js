import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
// import DevTools from '../public/tool/DevTools'
import { createLogger } from 'redux-logger';
const logger = createLogger({ collapsed: true });

export default function configureStore(preloadedState,isClient) {

    let store = createStore(
            rootReducer,
            preloadedState,
            compose(
                applyMiddleware(thunk, logger),
                isClient ? window.devToolsExtension() : f => f,// window.devToolsExtension ? window.devToolsExtension() : f => f
                // DevTools.instrument()
            )
        )
    

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')

            store.replaceReducer(nextRootReducer)
        })
    }
    // let isDone = false; //拦截请求 服务端请求接口
    // while (!isDone) {
    //     isDone = store.getState().userInfo.success || false;
    // }
    return store
}
