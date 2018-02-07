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
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    await new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("react");
            dbo.collection("user").insertOne(ctx.request.body, function (err, res) {
                if (err) throw err;
                console.log("数据插入成功");
                db.close();
                resolve()
            });
        });
    })
    ctx.body = {
        code: 10001,
        message: "正确",
        serviceTime: + new Date,
        success: 1
    }
}
export default {getUserInfo,register}
