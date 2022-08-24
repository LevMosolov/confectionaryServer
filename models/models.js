const sequelize = require('../db')//for description with ORM
const {DataType, DataTypes} = require('sequelize')//class for description type of data (int, string etc.)
const { Client } = require('pg')


const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING,allowNull: false},
    firstName:{type:DataTypes.STRING},
    lastName:{type:DataTypes.STRING},
    thirdName:{type:DataTypes.STRING},
    dateOfBirthday:{type:DataTypes.DATE},
    phone:{type:DataTypes.STRING, unique:true},
    role:{type:DataTypes.STRING, defaultValue:"USER"}
})

const Order = sequelize.define('order',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        idUser:{type:DataTypes.INTEGER, allowNull:false},
        data:{type:DataTypes.DATE, allowNull:false},
    }
)
const OrderProducts = sequelize.define('orderProduct',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
    }
) 

const Product = sequelize.define('product',
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type:DataTypes.STRING, defaultValue:"NameOfCake"},
        shortDescription:{type:DataTypes.STRING, defaultValue:"DescriptionOfCake"},
        price:{type:DataTypes.DOUBLE, defaultValue:0.00},
        fullDescription:{type:DataTypes.STRING, defaultValue:"FullDescriptionOfCake"},
        img:{type:DataTypes.STRING, defaultValue:"https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_960_720.jpg"},
        likes:{type:DataTypes.INTEGER},
        video:{type:DataTypes.STRING},
        belki:{type:DataTypes.INTEGER},
        ziri:{type:DataTypes.INTEGER},
        uglivodi:{type:DataTypes.INTEGER},
        type:{type:DataTypes.STRING}
        
    }
)

const Comment = sequelize.define('comment',
{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    content:{type:DataTypes.STRING, allowNull:false},
    idUser:{type:DataTypes.STRING, allowNull:false},
    idProduct:{type:DataTypes.INTEGER,allowNull:false},
    data:{type:DataTypes.DATE},
}
)



Product.hasMany(Comment)
Comment.belongsTo(Product)

Product.belongsToMany(Order,{through:OrderProducts})
Order.belongsToMany(Product,{through:OrderProducts})

User.hasMany(Order)
Order.belongsTo(User)

module.exports={
    Product,
    Order,
    User,
    Comment,
    OrderProducts
}
