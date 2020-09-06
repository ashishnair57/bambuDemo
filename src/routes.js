const { ProductController, AuthController } = require('./controllers')

const { requestValidator, verifyJWTToken } = require('./middleware')

class Router {
    constructor(express) {
        this.router = express.Router()
    }

    appRoutes() {

        this.router.post('/login', requestValidator('authSchema'), AuthController.login)

        this.router.post('/refreshToken', requestValidator('refreshAuthSchema'), AuthController.refreshToken)

        this.router.get('/products', ProductController.search)

        // this.router.post('/products', ProductController.insertProduct)

        return this.router;
    }
}

module.exports = Router