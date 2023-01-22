/*Importar a criptografia de senha */
const {hash, compare} = require('bcryptjs');
/* Importanto o verificaro de erros e sqlite */
const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

/* criar várias funções*/
class usersController{
    /**
     * index - get para listar vários registros
     * show - Get para exibir um registro específico
     *create - Post para criar um registro
     *update - Put para atualizar um registro
     *delete - Delete para deletar um registro
     */

     /* Criar usuario, mesmos parametros do insomnia */
    async create(request,response){
        const {name, email, password} =request.body;

        /* conectar ao banco de dados */
        const database = await sqliteConnection()

        /* regra para verificar se o usuário existe */
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(checkUserExists){
            throw new AppError('Este e-mail já está em uso.')
        }
        /*Importar a criptografia de senha */
        const hashedPassword = await hash(password, 8)
        /*criar novo usuário no banco */
        await database.run('INSERT INTO users(name, email, password) VALUES(?,?,?)',[name,email,hashedPassword])

        return response.status(201).json()
    }

    async update(request, response) {
        const {name, email, password, old_password} = request.body
        const user_id= request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id=(?)", [user_id])

        /* Etapa de verificação */
        if(!user){
            throw new AppError('Usuário não encontrado.')
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email=(?)", [email])
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !==user.id){
            throw new AppError('Este e-mail já está em uso.')
            
        }
        /*Validando nome e e-mail*/
        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password) {
            throw new AppError('Você precisa informar sua senha antiga')
        }

        if(password && old_password){
            const checkOldPassword = await compare( old_password , user.password)
            if(!checkOldPassword){
                throw new AppError('Senha antiga não confere')
            }

            user.password = await hash(password, 8)

        }

        await database.run("UPDATE users SET name =?, email =?, password = ? , updated_at = DATETIME('now') WHERE id =?",[user.name, user.email,user.password, user_id])

        return response.json()
        
    }
}


module.exports = usersController;