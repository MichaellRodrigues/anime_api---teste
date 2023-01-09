exports.up = knex => knex.schema.createTable("anime_tags", table => {
    table.increments("id")
    table.text("name").notNullable()
    
    table.integer("user_id").references("id").inTable("users")
    table.integer("anime_notes_id").references("id").inTable("anime_notes").onDelete("CASCADE")
  
  });
  
  exports.down = knex => knex.schema.dropTable("anime_tags");
  