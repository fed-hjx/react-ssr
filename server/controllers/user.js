async function getUserInfo(ctx) {
    ctx.body = {
        data: {
            name: 'Chikara Chan',
            gender: 'male',
            age: 20
        },
        code: 10001,
        message: "正确",
        serviceTime: + new Date,
        success:1
    }
}
export default {getUserInfo}
