const moongose = require('mongoose')
const {Schema} = moongose

const movieSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    plot:{
        type:String,
        required:true,
    },
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrity' }]
})

const MovieModel = moongose.model('movie',movieSchema)
module.exports = MovieModel