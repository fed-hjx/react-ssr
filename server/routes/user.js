import Router from 'koa-router'
import user from '../controllers/user'

const router = new Router({prefix: '/user'})

router.get('/getUserInfo', user.getUserInfo)
router.post('/register', user.register)

export default router
