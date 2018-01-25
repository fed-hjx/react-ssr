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

const routes = [
    {
        path: '/',
        component: Home,
        // loadData: () => getSomeData(),
    },
    {
        path: '/about',
        component: About,
        // loadData: () => getSomeData(),
    },
];
export default routes;
