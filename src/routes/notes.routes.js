/* Importar o Router para o express*/
const { Router } = require('express')
/* Importar o controller*/
const NotesController = require('../controllers/NotesController')

/* Constante para rodar o Router*/
const notesRoutes = Router()

/* Nova instancia */
const notesController = new NotesController()

notesRoutes.get('/',notesController.index)
notesRoutes.post('/:user_id',notesController.create)
notesRoutes.get('/:id',notesController.show)
notesRoutes.delete('/:id',notesController.delete)

/* exportar*/
module.exports = notesRoutes