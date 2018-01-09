import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from '../../client/routes'
import configureStore from '../../client/store/configureStore'
import App from '../../client/app'

const store = configureStore()

async function clientRoute(ctx, next) {
    const context = {}
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
        ctx.writeHead(302, {
            Location: context.url
        })
    } else {
        await ctx.render('index',{
            root: html,
            state: store.getState()
        })
    }
}

export default clientRoute
