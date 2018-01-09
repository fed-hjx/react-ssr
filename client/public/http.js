require('isomorphic-fetch');
import _isPlainObject from 'lodash.isplainobject';

const Http = {};
const baseUrl = 'http://192.168.74.173:8160/lotto/pc/v1.0';
const baseData = {
    platform: 1,
    channelId: 2
};
Http.validateData = (url, data, setting) => {
    if (!url) {
        console.warn('请求地址不能为空');
        return false;
    }
    if (!_isPlainObject(data)) {
        console.warn('第二个参数必须是对象');
        return false;
    }
    if (setting && !_isPlainObject(data)) {
        console.warn('第三个参数必须是对象');
        return false;
    }
    return true;
}
Http.errorHandler = ({ errorCode, message }) => {
    // if (/^4.*$/.test(errorCode)) {
    //     Message.error(message);
    // }
}

Http.get = async (url, data={}, setting) => {
    Http.validateData(url, data, setting);

    let targetUrl = `${baseUrl}${url}?`; //node 端使用用户传入的全路径
    const option = {
        method: 'GET'
    }
    Object.assign(data, baseData);
    for (let key in data) {//用javascript的for/in循环遍历对象的属性
        targetUrl += key + "=" + data[key] + "&";
    }
    try {
        let rs = await fetch(targetUrl, option);
        let rsJson = await rs.json();

        if (rsJson.success) {
            return rsJson;
        } else {
            Http.errorHandler({ errorCode: rsJson.errorCode, message: rsJson.message })
            return Promise.reject({ errorCode: rsJson.errorCode, message: rsJson.message });
        }
    } catch (error) {
        throw Error(error);
    }
}
Http.post = async (url, data={}, setting) => {
    Http.validateData(url, data, setting);
    let targetUrl = `${baseUrl}${url}`; //node 端使用用户传入的全路径

    const baseSetting = setting || {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    Object.assign(data, baseData);
    const option = {
        ...baseSetting,
        method: 'POST',
        body: JSON.stringify(data),
    }
    try {
        let rs = await fetch(targetUrl, option);
        let rsJson = await rs.json();

        if (rsJson.success) {
            return rsJson;
        } else {
            Http.errorHandler({ errorCode: rsJson.errorCode, message: rsJson.message })
            // throw Error(JSON.stringify({errorCode: rsJson.errorCode, message:rsJson.message}))
            return Promise.reject({ errorCode: rsJson.errorCode, message: rsJson.message });
        }
    } catch (error) {
        throw Error(error);
    }
}

export default Http;