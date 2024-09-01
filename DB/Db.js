const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pankaj')

const db = mongoose.connection;


db.on('error',()=>{
    console.log(`Server Failed to Connect With MongoDB`)
})


db.once('open', ()=>{
    console.log(`Server Successfully Connected With MongoDB`)
})


module.exports = db