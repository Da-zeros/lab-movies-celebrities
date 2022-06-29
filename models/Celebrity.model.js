const mongoose = require('mongoose') 
const { Schema } = mongoose;//  Add your code here

const celebritySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    catchPhrase:{
        type:String,
        required:true
    }
})

 const CelebrityModel = mongoose.model("celebrity",celebritySchema);
 module.exports = CelebrityModel