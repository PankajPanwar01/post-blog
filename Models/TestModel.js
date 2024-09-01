const mongoose  = require('mongoose');



const TestSchema = new mongoose.Schema({

    name :{
        type : String,
    },
    mobile :{
        type : String
    }

})

const TestModel = mongoose.model('testing', TestSchema)

module.exports = TestModel