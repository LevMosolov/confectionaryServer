const {Comment} = require('../models/models')
const ApiError=require('../error/ApiError')

class CommentController {
    async create(req, res){
        const {content,idUser,idProduct,data} = req.body  
        const comment = await Comment.create({content,idUser,idProduct,data})
        return res.json(comment)
        
    }
    async getAll(req,res){
        const comments = await Comment.findAll()
        return res.json(comments)
    }
}

module.exports = new CommentController()