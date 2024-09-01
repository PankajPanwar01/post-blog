const PORT = 8543;
const UserModel =  require('../Models/UsersSchema')
const bcrypt = require('bcrypt');
const FileSchema = require('../Models/SaveUserWithImage')
const path = require('path')
const Utils = require('../Utils/Utils')
const PostModel = require('../Models/PostModel');
const { ok } = require('assert');


function MessageScriptMaker (obj){

    return `<script> alert() </script>`

}



exports.LoginUser = (req,res) =>{

    const {email, password} = req.body;

    console.log(req.body)

    UserModel.find ({email : email}).then((result)=>{

        console.log(result)
        if(result.length >0)
        {
            bcrypt.compare(password,result[0].password, function(err, status){

                if(err)
                {
                    res.status(500).send({status :500,  message : "something Went Wrong"})
                }
                else
                {
                    if(status)
                    {   
                        
                        console.log(result[0])
                        // set cookie
                        res.cookie("user_data", result[0])
                        res.cookie("auth", true)
                        //res.send('')
                        res.status(200).send({status :200, message : "Login Successfully", data : result[0]})
                    }
                    else
                    {
                    res.status(403).send({status:403, message : "Incorrect Password"})
                    }
                }
            })
        }
        else
        {
            res.status(400).send({status : 400 , message : "you are not a Register User || Please Register First"})
        }
    }).catch((err)=>{

        res.status(500).send({status :500 , message : "something Went Wrong"})

    })
 
}









exports.LoginForm = (req, res) =>{

    res.send(
        `
        <html>
        <head>
        <title>Login Page</title>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel='stylesheet' href='http://localhost:8543/LoginPage.css'/>
        <link rel='stylesheet' href='http://localhost:8543/LoginPage.css'/>
    
        <script src='http://localhost:8543/Handlers.js'></script>
        </head>
        <body>
        <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" action="" method="post">
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Username / Email:</label><br>
                                <input type="email" required name="email" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input type="text" required name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="remember-me" class="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox"></span></label><br>
                                <button type="submit" name="submit" onclick='Login()' class="btn btn-info btn-md" value="submit">Submit</botton> 
                            </div>
                            <div id="register-link" class="text-right">
                                <a href="/project/RegisterPage" class="text-info">Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </body>
        </html>
        `
    )
}



//   <form id="login-form" class="form" action="/project/register-user" method="post">


exports.RegisterForm = (req, res) =>{

    res.send(
        `
        <html>
        <head>
        <title>Register Page</title>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel='stylesheet' href='http://localhost:8543/RegisterPage.css'/>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js" ></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" >
        <script src='http://localhost:8543/Handlers.js'></script>
        </head>
        <body>
        <div id="login">
        <h3 class="text-center text-white pt-5">Register form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form">
                            <h3 class="text-center text-info">Register</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Name:</label><br>
                                <input required type="text" name="name" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="username" class="text-info">Email:</label><br>
                                <input required type="text" name="email" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="username" class="text-info">Mobile:</label><br>
                                <input required type="text" name="mobile" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="username" class="text-info">Address:</label><br>
                                <input required type="text" name="address" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input required type="text" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="remember-me" class="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox"></span></label><br>
                                <input type="submit" name="submit" onclick='Register()' class="btn btn-info btn-md" value="submit">
                            </div>
                            <div id="register-link" class="text-right">
                                <a href="/project/LoginPage" class="text-info">Login here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </body>
        </html>
        `
    )
}



exports.HomePage = (req,res)=>{

    let temp_str = ''

    PostModel.find({}).then((result)=>{

        for(let i = 0; i < result.length; i++)
        {
            // temp_str = temp_str + `
            // <div class="col-md-4">
            //     <h2>${result[i].blog_title}</h2>
            //     <img class='blog_img' src='${result[i].image_link}'/>
            //     <p> ${result[i].blog_desc} </p>
            // </div>
            // `
            
            temp_str = temp_str + `

            <div class="card" style="width: 18rem; margin-left:10px">
            <img class="card-img-top" src='${result[i].image_link}' alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${result[i].blog_title}</h5>
                <p class="card-text">${result[i].blog_desc}</p>
                <a href='${`http://localhost:8543/project/view-blog/${result[i]._id}`}' class="btn btn-primary">View Blog</a>
            </div>
            </div>
            `


        }

        res.send(`
            <html>
            ${Utils.HeadSection}
            <body>
        
            ${Utils.NavBar}
        
            <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">Welcome to Your Website</h1>
                    <p class="lead text-muted">This is a simple hero section where you can introduce your company or highlight a key message.</p>
                    <p>
                        <a href="#" class="btn btn-primary my-2">Learn More</a>
                        <a href="#" class="btn btn-secondary my-2">Contact Us</a>
                    </p>
                </div>
            </section>
        
        
            <div class="container">
                <div class="row">
                    ${temp_str}
                </div>
            </div>
        
            ${Utils.Footer}
            
            ${Utils.HomeScripts}
        
            
        </body>
        </html>
        
                `)


    }).catch((err)=>{

        res.status(500).send({status : 500, message : "Something Went Wrong."})

    })
    
    
}

exports.RegisterUserData = (req,res)=>{

    const { name , email , mobile , password , address } = req.body

    console.log(req.body)

    if(!password)
    {
        return res.status(400).send({status : 400, message : "password is required"})
    }

    bcrypt.genSalt(10, function (err, salt){

        if(err)
        {
            // res.status(500).send({status :500 , message : "something Went Wrong"})
            res.status(500).send({status :500 , message : "something Went Wrong-1"})
            


        }
        else
        {
            bcrypt.hash(password ,salt , function(err, hash){

                if(err)
                {
                    res.status(500).send({status :500 , message : "something Went Wrong-2"})
                }
                else
                {
                    UserModel.insertMany
    
    
    ({ name : name , email : email , mobile : mobile , password : hash , address : address}).then((result)=>{

        if(result.length > 0)

        {
            res.status(200).send({status : 200 , message : "User Registered successfully"})
        }
        else
        {
            res.status(400).send({status : 400 , message : "User Registered Failed"})
        }
    }).catch((err)=>{

        console.log(err)
        // console.log(err.code)
        // console.log(err.name)
        // console.log(err.message)
        // console.log(err.errors)

        if(err.code == 11000 && err.name == "MongoBulkWriteError")
        {
            let key = err.message.split("{")[1].replace("}","").split(":")[0].trim().toUpperCase();
            let value = err.message.split("{")[1].replace("}","").split(":")[1].replaceAll('"',"");

            res.status(403).send({status :403 , message : `you have already an account with this ${key} : ${value}`})
        }
        else if(err.name == "ValidationError")
        {
            res.status(403).send({status : 403 , message :`${Object.keys(err.errors)[0].toUpperCase()} is require for Registration`})
        }
        else
        {

            res.status(500).send({status : 500 , message : "something Went Wrong-3"})

        
        }

        
    })
                }
            })
        }
    })
}


exports.Showalert = (req,res) =>{

    console.log(path.join(__dirname, '../Templates/Dummy.html'))
    // res.send('<script> alert("Hello pankaj") </script>')
    res.sendFile(path.join(__dirname, '../Templates/Dummy.html' ))
}





exports.PostBlogForm = (req,res) =>{

    res.status(200).send(
        `<html>
        <head>
        ${Utils.HeadSection}
        ${Utils.BootsTrapCDN}
        </head>
        ${Utils.NavBar}
        <body>
        <h1 style='text-align : center'>Start Writing Your Blog</h1>
    <div class='container'>

        <form>
        <div class="input-group mb-3">
        <input type="text" class="form-control" name='title' placeholder="Your Bloc Title" aria-label="Username" aria-describedby="basic-addon1">
        </div>

        <br>
        
        <div class="input-group">
        <textarea class="form-control" name='desc' placeholder="Your Bloc Content" aria-label="Bloc Content" lines='10'></textarea>
        </div>

        
        <br>
        <div class="mb-3">
        <input oninput='ImageHandle()' name='image' class="form-control" type="file" id="formFile">
        </div>
        
        <img id='post-img' src='' class='blog_img' />
        <br>
        <button type="submit" onclick='SavePost()' class="btn btn-success">Save Post</button>


        </form>

    </div>
    </div>
        ${Utils.Footer}
        ${Utils.HomeScripts}
        </html>`
    )
}








exports.LogoutUser = (req,res) =>{

    res.clearCookie('user_data')
    res.clearCookie('auth')

    // res.redirect('/project/LoginPage')
    res.status(200).send({status : 200, message : "Logout successfully"})

}




exports.savePost =(req,res)=>{

    const{ title, desc, image} = req.body;

    let imgPath = 'http://localhost:8543/'+ req.body.filePath

    let email = req.cookies.user_data.email
    console.log("Email", email)

    UserModel.find({email :email}).then((result1)=>{

        if(result1.length >0)
        {
            PostModel.insertMany({user_id : result1[0]._id, blog_title : title, blog_desc : desc, image_link : imgPath }).then((result2)=>{

                if(result2.length>0)
                {
                    res.status(200).send({status : 200, message : "Post saved successfully"})
                }
                else
                {
                    res.status(400).send({status : 400, message : "Failed to save Post"})
                }

            }).catch((err)=>{

                if(err.name == "ValidationError")
                    {
                        res.status(403).send({status : 403 , message :`${Object.keys(err.errors)[0].toUpperCase()} is require for Registration`})
                    }
                    else
                    {
                        res.status(500).send({status : 500, message : "Something Went Wrong."})

                    }


        
            })
        }
        else
        {
         res.status(400).send({status : 400, message : "Invalid Request"})
        }
    }).catch((err)=>{

        res.status(500).send({status : 500, message : "Something Went Wrong."})

    })
}


exports.getAllPost = (req,res)=>{

    PostModel.find({}).then((result)=>{

        


    }).catch((err)=>{

        res.status(500).send({status : 500, message : "Something Went Wrong."})

    })
}


exports.Viewblog = (req,res)=>{

    console.log(req.query)
    console.log(req.params)

    const {id} = req.params

    PostModel.findOne({_id : id}).then((result)=>{

        res.status(200).send(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Page</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px;
        }
        .image-container {
            position: relative;
            width: 100%;
            max-width: 800px;
        }
        .image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        .time {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
        }
        .title {
            font-size: 24px;
            margin: 20px 0 10px;
        }
        .description {
            font-size: 1em;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="image-container">
        <img src="${result.image_link}" alt="Image">
        <div class="time">${result.createdAt}</div>
    </div>
    <div class="content">
    <div class="title">${result.blog_title}</div>
    <div class="description">${result.blog_desc}</div>
    </div>
</div>

</body>
</html>


            `)

    }).catch((err)=>{
        res.status(500).send({status : 500, message : "Something Went Wrong"})
    })
}




exports.MyBlogsList = (req,res)=>{

    let _id = req.cookies.user_data._id

    console.log("MyID" , _id)

    PostModel.find({user_id : _id}).then((result)=>{

        let temp_str = ""

        for(let i=0; i < result.length; i++)
        {
            temp_str += `
                            <tr>
                            <td >${i+1}</td>
                            <td ><img src="${result[i].image_link}" alt="Blog Image"></td>
                            <td >${result[i].blog_title}</td>
                            <td >${result[i].blog_desc}</td>
                            </tr>
            `
        }

        res.send(`
            
            
<html>
<head>
    
    <title>Responsive Table</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
        }

        .table-container {
            width: 100%;
            overflow-x: auto;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
        }

        thead {
            background-color: #f4f4f4;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            font-weight: bold;
        }

        td img {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }

        @media screen and (max-width: 600px) {
            table, thead, tbody, th, td, tr {
                display: block;
                width: 100%;
            }

            th {
                display: none;
            }

            td {
                display: flex;
                justify-content: space-between;
                padding: 15px;
                border-bottom: 1px solid #ddd;
                position: relative;
                padding-left: 50%;
            }

            td::before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                font-weight: bold;
            }
        }
    </style>
</head>
<body>

<h2>Responsive Blog Table</h2>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>SR</th>
                <th>Image</th>
                <th>Blog Title</th>
                <th>Blog Description</th>
            </tr>
        </thead>
        <tbody>
            ${temp_str}
            
        </tbody>
    </table>
</div>

</body>
</html>

            `)

    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status : 500, message : "Something Went Wrong"})
    })
}