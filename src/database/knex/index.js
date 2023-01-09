/* Importando o knexfile*/
const config = require('../../../knexfile')
const knex = require('knex')

/**
 * criar configuração knex
 */
const connection = knex(config.development)

module.exports = connection