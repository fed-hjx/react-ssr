import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from '../../client/routes'
import configureStore from '../../client/store/configureStore'
import App from '../../client/app'
import { matchRoutes, renderRoutes } from 'react-router-config';
const store = configureStore()
const isMath = (arr,str) =>{
    return arr.some(v=>v.path===str);
}
const getMatchRoute = (arr, str) => {
    return arr.filter(v => v.path === str);
}
async function clientRoute(ctx, next) {
    const context = {};
    let title = '首页';
    if (isMath(routes,ctx.url)){//匹配组件路由
        const branch = getMatchRoute(routes, ctx.req.url);
        const promises = branch.map(route => {//同步组件初始化华请求
            const fetch = route.component.fetch;
            title = route.title;
            return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
        });
        await Promise.all(promises).catch((err) => {
            console.log(err);
        });
        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        )
        await ctx.render('index', {
            title: title,
            root: html,
            state: store.getState()
        })
    }else{
       await next()
    }
}

export default clientRoute
