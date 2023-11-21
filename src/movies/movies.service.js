const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listShowing(){
    return knex("movies")
    .distinct()
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .select(
       "movies.movie_id",
       "movies.title",
       "movies.runtime_in_minutes",
       "movies.rating",
       "movies.description",
       "movies.image_url"
    )
    .where({is_showing: true})
}

function read(movieId) {
    return knex("movies").select("*").where({movie_id: movieId}).first();
}

function listTheaters(movieId){
    return knex("movies")
    .join("movies_theaters as mt", "mt.movie_id", "movies.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select(
        "t.*",
        "mt.movie_id",
        "mt.is_showing"

    )
    .where({"mt.movie_id": movieId})

}

function listReviews(movieId){
    return knex("critics")
    .join("reviews as r", "r.critic_id", "critics.critic_id")
    .select("r.*")
    .where({"r.movie_id": movieId})
}

function listCritic(criticId){
    return knex("critics")
    .select("critics.*")
    .where({"critics.critic_id": criticId})
}

module.exports = {
  list,
  read,
  listShowing,
  listTheaters,
  listReviews,
  listCritic,
};