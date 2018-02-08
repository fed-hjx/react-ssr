const UserModel = require('../models/userModel');
// const redis = require('../config/db_redis');
const md5 = require('../tools/Jcrypto').md5;
const Jverify = require('../tools/Jverify');
const Jcommon = require('../tools/Jcommon');
// const Jtoken = require('../tools/Jtoken').tokenValidation;
// const nodemailer = require('nodemailer');

async function getUserInfo(ctx) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var rs;
    await new Promise((resolve,reject)=>{
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("react");
            dbo.collection("user").find({}).toArray(function (err, result) { // 返回集合中所有数据
                if (err) throw err;
                rs = result;
                db.close();
                resolve();
            });
        });
    })
    ctx.body = {
        data: {
            name: 'Chikara Chan',
            gender: 'male',
            age: 20,
            db: rs
        },
        code: 10001,
        message: "正确",
        serviceTime: + new Date,
        success:1
    }
}
async function register(ctx) {
    console.log("controllers/user.js/user_regist start --> " + JSON.stringify(ctx.request.body));
    const respondData = {
        status: 200,
        data: {},
        error: '',
        msg: ''
    };
    // 检查必传字段是否传过来
    const is_available = Jcommon.check_key_words(["user_name", "user_password"], ctx, 'POST');
    if (is_available == false) return; // 如果字段不合格，直接返回
    const user_name = ctx.request.body.user_name;
    const user_password = ctx.request.body.user_password;

    // 验证密码是否正确
    const is_password_str = Jverify.verify_password(user_password);
    const is_enable_length = (user_password.length > 6 && user_password.length < 20) ? true : false;
    if (!(is_password_str && is_enable_length)) {
        respondData.status = 10001;
        respondData.error = "密码不符合规范";

        ctx.body = respondData;
        return;
    }
    try {
        const user = await findUserAsyc({ 'username': user_name });//验证用户是否已注册
        if (user) {
            respondData.status = 10002;
            respondData.error = "该用户已注册";
            ctx.body = respondData;
            return;
        }
        //用户参数
        const userpassword = md5(user_password);
        const userInfo = {
            username: user_name,
            userpwd: userpassword,
            status: 0,
            create_time: Date.now('YYYY-MM-DD')
        };
        //新建用户
        console.log("newGuess.save userInfo-->" + JSON.stringify(userInfo));
        const newUser = new UserModel(userInfo);
        await new Promise((resolve,reject)=>{
            newUser.save(function (err, data) {
                if (err) {
                    console.log("newGuess.save err-->" + JSON.stringify(err));
                    respondData.status = "00001";
                    respondData.error = "mongodb system error";
                    ctx.body = respondData;
                    return;
                }
                console.log("newGuess.save data -->" + JSON.stringify(data));
                respondData.msg = "新用户注册成功";
                resolve();
            });
        })
        ctx.body = respondData;
    } catch (error) {
        //错误处理
        console.log("controllers/user.js/user_regist error -->" + JSON.stringify(error));
        respondData.error = error;
        ctx.body = respondData;
    }
}

/**
 * params:  {cnd}:user find condition
 * return:  user
 * describe: findUserAsyc
 **/
const findUserAsyc = async function (cnd) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne(cnd, function (error, data) {
            if (error) {
                return reject(error);
            }
            return resolve(data);
        });
    })
}
export default {getUserInfo,register}
