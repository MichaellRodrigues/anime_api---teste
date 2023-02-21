/* Importando o Async eroor no express*/
require('express-async-errors')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

/* Rodar o banco de dados*/
const migrationsRun = require('./database/sqlite/migrations')
migrationsRun()

/*importando o cors*/
const cors = require('cors')

/* Importando o express*/
const express = require('express')

/* Importando o routes*/
const routes = require('./routes')

/* Inicializando o express*/
const app = express()
app.use(cors())
app.use(express.json()) 

/* Inicializando o routes*/
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

/* Capturar o erro*/
app.use(( error, request, response, next) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    return response.status(500).json({
        status: 'error',
        message: "internal server error"
    })
}) 

/* Informando a porta do express*/
const PORT = 3333
app.listen(PORT,() => console.log(`Server is running on Port ${PORT}`))

/* Receber insformações do insomnia*/

