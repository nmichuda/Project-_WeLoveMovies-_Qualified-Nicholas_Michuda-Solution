const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")



async function list(req,res,next){
    const theaters = await service.list();
    

    
    for(let theater of theaters){
        
        const movies = await service.listMovies(theater.theater_id)
        theater.movies = movies;
        
    }

    res.status(200).json({data: theaters});

}

module.exports = {
  list: [asyncErrorBoundary(list)]
};