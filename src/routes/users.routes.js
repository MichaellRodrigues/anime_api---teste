/* Importar o Router para o express*/
const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

/* Importar o controller*/
const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

/* Constante para rodar o Router*/
const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

/* Nova instancia */
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/',usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

/* exportar*/
module.exports = usersRoutes