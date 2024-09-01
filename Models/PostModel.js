const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    user_id :{
        type : String,
        required : true
    },
    blog_title :{
        type : String,
        required : true
    },
    blog_desc :{
        type : String,
        required : true
    },
    image_link :{
        type : String,

    },
    createdAt :{
        type : String,
        required : true,    
        default : new Date(Date.now())  
    },

})

const PostModel = mongoose.model('posts', PostSchema)


module.exports = PostModel