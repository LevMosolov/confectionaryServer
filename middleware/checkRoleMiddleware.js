const jwt = require('jsonwebtoken')

module.exports = function(role){
   return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            console.log(req)
            const token = req.headers.authorization.split(' ')[1]  //Bearer dkjfdkstoken            
            console.log(token)
            if (!token) {
                return res.status(401).json({ message: "Пользователь не авторизован1сервер" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role!==role){
                return res.status(403).json({ message: "Нет доступа" })
            }
            req.user = decoded
            next()
        } catch (e){
            
            res.status(401).json({ message: 'Пользователь не авторизован2сервер', some: e.message})
        }
    }
}


