require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}

// 1. We are making JSON we tokens (JWT)
// 2. Exporting isAuthenticated to be able to use
// 3. If no header token found console.log ERROR and send 401 status
// 4. if token equals Json Web Token.verify
// 5. if not a token throw out a new error saying not authenticated