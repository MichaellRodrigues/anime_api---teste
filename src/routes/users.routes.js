/* Importar o Router para o express*/
const { Router } = require('express')
/* Importar o controller*/
const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

/* Constante para rodar o Router*/
const usersRoutes = Router()

/* Nova instancia */
const usersController = new UsersController()

usersRoutes.post('/',usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)

/* exportar*/
module.exports = usersRoutes