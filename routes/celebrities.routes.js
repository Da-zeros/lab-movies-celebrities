// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")

router.get('/create', function (req, res) {
    res.render('celebrities/new-celebrity')
})

router.post('/create', async function (req, res) {
    
    const {name, occupation, catchPhrase} = req.body
    
    try {
        const newCel = await CelebrityModel.create({
            name,
            occupation, 
            catchPhrase
        })
        res.redirect('/celebrities')
    } catch (error) {
        res.redirect('celebrities/new-celebrity')  
    }
})

router.get('/', async function (req, res) {
    
    try {
        const celebrityList =  await CelebrityModel.find()
        res.render('celebrities/celebrities',{celebrityList})
    } catch (error) {
        console.log(error)  
    }
})

module.exports = router;