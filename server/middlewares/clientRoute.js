import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from '../../client/routes'
import configureStore from '../../client/store/configureStore'
import App from '../../client/app'

const store = configureStore()
const isMath = (arr,str) =>{
    return arr.some(v=>v.path===str);
}
async function clientRoute(ctx, next) {
    const context = {};

    if (isMath(routes,ctx.url)){//匹配组件路由

        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        )
        await ctx.render('index', {
            root: html,
            state: store.getState()
        })
    }else{
       await next()
    }
}

export default clientRoute
