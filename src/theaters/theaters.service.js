const knex = require("../db/connection");

function list() {
  return knex("theaters")
  .select("*");
}

function listMovies(theater_id){
    return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .where({"mt.theater_id": theater_id})
    .select(
        "m.*",
        "mt.created_at",
        "mt.updated_at",
        "mt.is_showing",
        "mt.theater_id"
    )
    

}

module.exports = {
  list,
  listMovies,

};