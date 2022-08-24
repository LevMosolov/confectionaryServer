//this config is for we can read file .env (process.env.PORT ex.)
require('dotenv').config() 
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const cors = require('cors')//can to send request from browser
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


//function where our project is start
const app=express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(express.static(path.resolve(__dirname,'static')))

//error processing, Middleware must be last
app.use(errorHandler)

//function for connect to database
const start = async()=>{
    try{
        await sequelize.authenticate()// connect to db
        await sequelize.sync()//will check the state of database against a schema we'll describe
        app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)})

    }catch(e){
        console.log(e)
    }
}

start()