import Router from 'koa-router'
import user from '../controllers/user'

const router = new Router({prefix: '/user'})

router.get('/info', user.info)
router.post('/register', user.register)
router.post('/login', user.login)
router.get('/logout', user.logout)

export default router
