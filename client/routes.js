// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}
import asyncComponent from './async-component'; // 异步加载组件公共方法
const isNode = () => {
    return (global && typeof global == 'object' && global.global === global);
};

// const Home = asyncComponent(() => import('./components/home'));
// const About = asyncComponent(() => import('./components/about'));

import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Register from './components/register';

const routes = [
    {
        path: '/',
        component: Home,
        title: '首页'
    },
    {
        path: '/about',
        component: About,
        title: '关于'
    },
    {
        path: '/login',
        component: Login,
        title: '登陆'
    },
    {
        path: '/register',
        component: Register,
        title: '注册'
    },
];
export default routes;
