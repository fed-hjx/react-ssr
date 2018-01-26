var cmd = process.platform == 'win32' ? 'netstat -ano' : 'ps aux';
var exec = require('child_process').exec;
var qqname = 'qq';
var port = +JSON.parse(process.env.npm_config_argv).remain[0];

exec(cmd, function (err, stdout, stderr) {
    if (err) { return console.log(err); }

    stdout.split('\n').filter(function (line) {
        var p = line.trim().split(/\s+/);
        var address = p[1];

        if (address != undefined) {
            if (address.split(':')[1] == port) {
                exec('taskkill /F /pid ' + p[4], function (err, stdout, stderr) {
                    if (err) {
                        return console.log(`释放指定 ${port} 端口失败！！`);
                    }
                    console.log(`占用指定 ${port} 端口的程序被成功杀掉！`);
                });
            }
        }
    });
});