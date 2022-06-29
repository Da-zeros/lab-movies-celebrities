// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")
const MovieModel = require("../models/Movie.model")

router.get('/create', async function (req, res) {
    
    try {
        const celebrities = await CelebrityModel.find()
        res.render('movies/new-movie',{celebrities})
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/create', async function (req, res) {
    
   const {title, genre, plot, cast} = req.body
    
    try {
        const newMovie = await MovieModel.create({
            title, 
            genre, 
            plot, 
            cast
        })
        res.redirect('/movies')
    } catch (error) {
       console.log(error)  
    }
})

router.get('/', async function (req, res) {
    
    try {
        const movieList =  await MovieModel.find()
        .populate('cast')
        res.render('movies/movies',{movieList})
    } catch (error) {
        console.log(error)  
    }
})

router.get('/:id', async function (req, res){
    
    const {id} = req.params 
    
    try {
        const movieDetail =  await MovieModel.findById(id)
        .populate('cast')
        console.log(movieDetail)
        res.render('movies/movie-details',{movieDetail})
    } catch (error) {
        console.log(error)  
    }

})

router.post('/:id', async function (req, res){
    const {id} = req.params 
    
    try {
        const movieDelete =  await MovieModel.deleteOne({_id:id})
        res.render('movies/movies')
    } catch (error) {
        console.log(error)  
    }
})

router.get("/:id/edit", async function (req, res) {

    try {
        const movie = await MovieModel.findById(req.params.id).populate("cast")
        const arrayId = movie.cast.map(cast=>cast._id)
        const notInCast = await CelebrityModel.find({_id:{$not:{$in:arrayId}}})
        console.log(notInCast)
        res.render("movies/edit-movie",{movie,notInCast})
    } catch (error) {
        console.log(error);
    }
})

router.post("/:id/edit", async function (req, res) {
    const movie = await MovieModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    console.log("Updated",movie)
    res.redirect(`/movies/${req.params.id}`)
})


module.exports = router;