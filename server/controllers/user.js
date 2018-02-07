async function getUserInfo(ctx) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var rs;
    await new Promise((resolve,reject)=>{
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("runoob");
            dbo.collection("site").find({}).toArray(function (err, result) { // 返回集合中所有数据
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
export default {getUserInfo}
