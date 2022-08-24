const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError')


class ProductController{
    async create(req, res, next){
        try {
            //
            // ,shortDescription,price,fullDescription,img:fileName,likes,video,belki,ziri,uglivodi
            const {name,shortDescription, price,fullDescription,likes,video,belki,ziri,uglivodi,type} = req.body   
            const {img} = req.files
            let fileName = uuid.v4()+'.jpg'
            img.mv(path.resolve(__dirname,'..','static',fileName))

            const product = await Product.create({name,shortDescription,img:fileName, price,fullDescription,likes,video,belki,ziri,uglivodi,type})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
       
    }
        

    async getAll(req,res){
        let {type,limit,page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page*limit-limit
        let products;
        if(!type){
            products = await Product.findAndCountAll({limit, offset})
        }else{
            products = await Product.findAndCountAll({where:{type},limit,offset})
        }

        return res.json(products)
    }

    async getOne(req, res){
        const {id} = req.params               
         const product = await Product.findOne({where:{id}})
         return res.json(product)
    }
}

module.exports = new ProductController()