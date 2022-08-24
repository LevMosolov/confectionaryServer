
const Router = require('express')
const router = new Router()

const commentRouter = require('./commentRouter')
const orderRouter = require('./orderRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')



router.use('/user', userRouter)
router.use('/comment',commentRouter)
router.use('/order',orderRouter)
router.use('/product',productRouter)



module.exports = router