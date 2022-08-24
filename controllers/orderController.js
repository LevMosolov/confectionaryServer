const {Order} = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderController{
    async create(req, res){
        const {idUser,data} =  req.body
        const order = await Order.create({idUser,data})
        return res.json(order)
    }

    async getAll(req,res){
        const orders = await Order.findAll() 
        return res.json(orders)
    }
}
module.exports = new OrderController()