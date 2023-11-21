const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
    
}

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    const review = await service.read(reviewId)

    if(review){
        res.locals.review = review;
        return next();
    }
    else{
        return next({status: 404, message: "Review cannot be found"})
    }
  }

async function destroy(req,res,next){
    const review = res.locals.review;
    await service.delete(review.review_id)
    res.sendStatus(204);
}

async function update(req,res,next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    await service.update(updatedReview);

    const newReview = await service.read(updatedReview.review_id)
    const critic = await service.listCritic(newReview.critic_id);
    
    res.status(200).json({data:{ ...newReview, critic: critic[0]}});
}

module.exports = {
  list,
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  
};