const mongoose = require('mongoose')

const Schema1 = new mongoose.Schema({

    name :{
        type : String,
    },
    email :{
        type : String,
    },
    file :{
        type : String
    }
})

const FileSchema = mongoose.model('filesaver', Schema1);

module.exports = FileSchema