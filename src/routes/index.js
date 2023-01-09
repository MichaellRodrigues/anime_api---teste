/* Importar o Router para o express*/
const { Router } = require('express')

/*reunir todas rotas da aplicação*/
const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')


/* Constante para rodar o Router*/
const routes = Router()

/* toda vez que for usado /users irá direcionar para o usersRouter*/
routes.use('/users', usersRouter)
routes.use('/anime_notes', notesRouter)
routes.use('/anime_tags', notesRouter)

module.exports = routes