

const Router = require('express')
const router = new Router()
const commentController =  require('../controllers/commentController')

router.post('/', commentController.create) //create comment
router.get('',commentController.getAll)// get comment from server


module.exports = router