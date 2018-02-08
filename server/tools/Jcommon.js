/**
 * 对于一些必传关键字的校验
 * key_names:Array类型存放所有的需要校验的字段eg:["product_id","company_id"]
 */
exports.check_key_words = function (key_names, ctx, request_method) {
    for (let i = 0; i < key_names.length; i++) {
        let key = key_names[i];
        let key_name;
        if (request_method == 'GET') {
            key_name = ctx.request.query[key]; // 获取参数名称
        } else {
            key_name = ctx.request.body[key];
        }

        if (typeof key_name == 'undefined' || key_name == '' || !key_name) {
            ctx.body = {
                status: ctx.response.status,
                data: {},
                error: {
                    code: "30001",
                    info: key_names[i] + "字段没有提供",
                }
            };
            return false;
        }
    }
    return true;
}