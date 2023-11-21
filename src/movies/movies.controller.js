const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const {is_showing} = req.query;
    if(is_showing){
        res.status(200).json({data: await service.listShowing()})
    }
    else{
        res.status(200).json({data: await service.list()})
    }
    
}

async function read(req, res, next) {
    const { movie } = res.locals;
    res.json({ data: movie });
  }

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
   
    if (movie) {
      res.locals.movie = movie;
    return next();
    }
      next({
      status: 404,
      message: `Movie cannot be found.`,
    });
  }


async function listReviews(req,res,next){
    const {movieId} = req.params;
    const reviews = await service.listReviews(movieId);
    const reviewArray = [];
    for(let i=0; i<reviews.length; i++){
        const review = reviews[i];
        const critic = await service.listCritic(review.critic_id);
        review.critic = critic[0];
        reviewArray.push(review);
        
    }

    res.status(200).json({data: reviewArray});

}

async function listTheaters(req,res,next){
    const {movieId} = req.params;
    const theaters = await service.listTheaters(movieId);
    res.status(200).json({data: theaters});
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
    getTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
};