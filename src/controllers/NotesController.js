/* Importando */
const { response } = require('express');
const knex = require('../database/knex');

/** * Classe  */
class NotesController {
    async create(request, response) {
        const {title, description, rate, tags} = request.body
        const user_id = request.user_id
        
        const anime_notes_id = await knex('anime_notes').insert({title, description,rate,user_id});
        

        const tagsInsert = tags.map( name => {
            return {
                anime_notes_id,
                name,
                user_id
            }
        })

        await knex('anime_tags').insert(tagsInsert);

        return response.json()
    }

    async show(request, response) {
        const {id} = request.params

        const note = await knex('anime_notes')
          .where({id}).first()
        const tags = await knex('anime_tags').where({anime_notes_id:id}).orderBy('name')
        
        return response.json({...note, tags})
    }

    async delete(request,response){
        const {id} = request.params
        await knex('anime_notes').where({id}).delete()
        return response.json()
    }

    async index(request, response){
        const {title,tags} = request.query
        const user_id = request.user.id

        let notes
        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim())

            notes = await knex('anime_tags').select(['anime_notes.id','anime_notes.title','anime_notes.user_id']).where('anime_notes.user_id', user_id).whereLike('anime_notes.title',`%${title}%`).whereIn('name', filterTags).innerJoin('anime_notes','anime_notes.id','anime_tags.note_id').orderBy('anime_notes.title')

        }else{
        notes = await knex('anime_notes').where({user_id}).whereLike('title', `%${title}%`).orderBy('title')
        }

        const userTags =await knex('anime_tags').where({user_id})
        const notesWithTags = notes.map( note => {
            const noteTags = userTags.filter(tag => tag.note_id)
            
            return {...note, tags: noteTags}
        })

        return response.json(notesWithTags)
    }

}

module.exports = NotesController;