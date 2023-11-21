const knex = require("../db/connection");

function list() {
  return knex("categories").select("*");
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
  }


function read(review_id){
    return knex("reviews")
    .select("*")
    .where({"reviews.review_id": review_id})
    .first()
}

function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview,"*")
}

function listCritic(criticId){
    return knex("critics")
    .select("critics.*")
    .where({"critics.critic_id": criticId})
}

module.exports = {
  list,
  delete: destroy,
  read,
  update,
  listCritic,
  
};