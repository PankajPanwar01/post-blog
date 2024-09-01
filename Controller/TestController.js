
const PORT = 8543;
const arr =[] 
const UserModel =  require('../Models/UsersSchema')
const bcrypt = require('bcrypt');
const FileSchema = require('../Models/SaveUserWithImage')






exports.ListAllUsers = (req,res) =>{

    UserModel.find({}).then((result)=>{

        UserModel.find({}).then((result)=>{

            let str =""

            for(let i=0; i<result.length; i++)
            {
                str = str +`<tr>
                    <td>${i+1}</td>
                    <td>${result[i].name}</td>
                    <td>${result[i].email}</td>
                    <td>${result[i].mobile}</td>
                    <td>${result[i].address}</td>
                </tr>`
            }

            let template =`
            
                <table>
                <tr>
                <th>Sr#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Adress</th>
                </tr>
                ${str}
                </table>
            `

            res.status(200).send(template)

        })
    }).catch((err) =>{
        res.status(500).send({status : 500, message : "something Went Wrong"})
    })
}



exports.LoginUser = (req,res) =>{

    const {email, password} = req.body;

    console.log(req.body)

    UserModel.find ({email : email}).then((result)=>{

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
                        let options ={
                            maxAge : 1000*60*15, // would expire after 15 minutes
                            httpOnly : true, // the cookie only accessible by the web server
                            // signmed :true // Indicates if the cookie should be signed
                        }

                        // set cookie
                        res.cookie('cookieName','cookieValue', options) // options is optional
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





exports.RegisterUser = (req,res) =>{

    const { name , email , mobile , password , address } = req.body

    bcrypt.genSalt(10, function (err, salt){

        if(err)
        {
            res.status(500).send({status :500 , message : "something Went Wrong"})
        }
        else
        {
            bcrypt.hash(password ,salt , function(err, hash){

                if(err)
                {
                    res.status(500).send({status :500 , message : "something Went Wrong"})
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

            res.status(500).send({status : 500 , message : "something Went Wrong"})

        
        }

        
    })
                }
            })
        }
    })

    
}






exports.GetAllUsers = (req,res) =>{

    UserModel.find({}).then((result)=>{
        
        if(result.length >0 )
        {
            res.status(200).send({status :200 , data : result})
        }
        else
        {
            res.status(200).send({status : 200 , message : "No Users Found"})
        }

    }).catch((err)=>{

        res.status(500).send({status : 500 , message : "something Went Wrong"})
    })
}




exports.Line1 = (req,res ,next)=>{
    let num = req.body.num;

    if(!num)
    {
        return res.status(400).send("please provide Number")
    }
    else{
        next()
    }
}

exports.Line2 = (req,res) =>{

    if (req.body.num %5 == 0)
    {
        res.status(200).send("Number is Divisible by 5")
    }
    else{
        res.status(200).send("Number is Not Divisible by 5")
    }
}








exports.CheckArmstrong =(req,res)=>{
        res.send(`
            <form method='POST' action='/arm-res'>
            <input name='num' placeholder='Enter Any number'/>
            <button>check</button>
            </form>
            `)

}

exports.ArmstrongRes = (req,res)=>{
    let num = req.body.num
    let size = num.toString().length
    let bkp = num
    let sum = 0

    while(num>0){
        let rm = num % 10
        sum = sum +rm**size
        num = parseInt(num/10)
    }

    if(bkp==sum){
        res.send(`<h1 style='color:green'>${req.body.num} is a Armstrong Number</h1>`)
    }
    else{
        res.send(`<h1 style='color:red'>${req.body.num} is not a Armstrong Number</h1>`)
    }
}


exports.AddUser = (req,res)=>{

    res.send(`
            <form method='POST' action='/user-list'>
            <input name='name' placeholder='Enter your name' />
            <input name='email' placeholder='Enter your email' />
            <input name='mobile' placeholder='Enter your mobile' />
            <button>Submit</button>
            </form>
        `)
}


exports.ShowUserList =(req,res)=>{
    arr.push({
        name : req.body.name , email : req.body.email , mobile : req.body.mobile
    })
    
    let dtemp = ""
    
    for(let i=0; i<arr.length; i++){
        dtemp +=`
             <tr>
                <td>${i+1}</td>
                <td>${arr[i].name}</td>
                <td>${arr[i].email}</td>
                <td>${arr[i].mobile}</td>
             </tr>
             `
    }
    
    let template = `
    
        <html>
        <body>
        <head>
        <link rel='stylesheet' href='table.css'/>
        </head>
        <table>
        <tr>
        <th>SR#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        </tr>
        ${dtemp}
        </table>
        </body>
        </html>
    `
    console.log(req.query)
    res.send(template)
    
    }


    exports.ShowMessage =  (req,res) =>{
        // res.send(`Hello this is my server running on PORT : ${PORT}`)
        res.redirect('/project/HomePage')

    } 


    exports.CheckOddEven = (req,res) =>{
    
        if(!req.query.num)
        {
            return res.status(400).send(`
            <h1 style='color:red'> please provide a number </h1>`)
        }
    
        if(req.query.num % 2 == 0)
        {
        res.status(200).send(`
            <h1 style='color:red'>${req.query.num} is an Even Number</h1>
        `)}
        else{
            res.status(200).send(`
                <h1 style='color:green'>${req.query.num} is an Odd Number</h1>
            `)}
    }
    

    exports.Register = (req,res) =>{
        res.send(`
            <html>
            <head>
            <tittle>register form</tittle>
            </head>
            <body>
            <form method='GET' action='/form-data'>
                <input name='name' placeholder='enter your name' /><br>
                <input name='email' placeholder='enter your email' /><br>
                <input name='mobile' placeholder='enter your mobile' /><br>
                <input name='password' type='password' placeholder='enter your password' /><br>
                <button>submit</button>
            </form>
            </body>
            </html>
            `)
    }
    
    exports.FormData = (req,res) =>{
        console.log(req.query)
        res.send(`
            <h1>Hi ${req.query.name}</h1>
            <h1>your Email is ${req.query.email}</h1>
            <h1>your mobile is ${req.query.mobile}</h1>
            <h1>password is ${req.query.password}</h1>
            `)
    }
    

    
    exports.FormByPost = (req,res) =>{
        res.send(`
        <html>
            <head>
            <tittle>register form</tittle>
            </head>
            <body>
            <form method='POST' action='/data-post'>
                <input name='name' placeholder='enter your name' /><br>
                <input name='password' type='password' placeholder='enter your password' /><br>
                <button>submit</button>
            </form>
            </body>
            </html>
            `)
    }


    exports.PostData = (req,res)=>{
        console.log(req.body)
        res.send("ok")
    }
    

    exports.CheckMobile = (req,res)=>{
    
        if(!req.body.mobile)
        {
            return res.status(400).send({status:400, massage:"please provide mobile number"})
        }
        else if(req.body.mobile.trim().length !==10){
            return res.status(400).send({status :400, massage:"mobile number length should be 10 digit"})
        }
        else if( req.body.mobile.includes(".")||isNaN(Number(req.body.mobile.trim())))
        {
            return res.status(400).send({status :400, massage:"Invalid mobile number || mobile number should contain only digit"})
        }
        else if(! (req.body.mobile.trim()[0] > 5 && ! req.body.mobile.trim()[0] < 10))
        {
            return res.status(400).send({ status : 400, message :"Invalid mobile number ||  mobile number start with 6,7,8 or 9"})
        }
        else{
            return res.status(200).send({status :200, massage:`${req.body.mobile} is a valid mobile number`})
    
        }
    }
    
    exports.ReverseString = (req,res)=>{

        let str = req.body.str;

        let r_str = str.split("").reverse().join("")

        res.send(`Hi, your Reverse string is : ${r_str}`)
    }


// middleware example

exports.Api1 =(req,res,next)=>{

    const {num} = req.body

    if(!num)
    {
        res.status(400).send("Please Send Number")
    }
    else
    {
        req.body.num = parseInt(num) * 2
        next()
    }

}


exports.Api2 =(req,res,next)=>{

    console.log(req.body)

    const {num} = req.body

    req.body.num = parseInt(num) * 2
        next()
    
}


exports.Api3 =(req,res,next)=>{

    console.log(req.body)

    res.status(200).send({status : 200, message : req.body.num})
    
}


exports.uploadFile = (req,res) =>{

    // res.status(200).send("File Uploaded")
    
        console.log(req.body)

    FileSchema.insertMany({ name : req.body.name, email : req.body.email, file : req.file.filename }).then((result)=>{

        if(result.length > 0)
        {
            res.status(200).send({ status :200 , message :`Hi ${req.body.name} , your File uploaded successfully , you can click here to view your file 'http://localhost:8543/${req.file.filename}'`})
        }
        else
        {
            res.status(400).send({ status :400 , message :"Data not Updated"})
        }

    }).catch((err)=>{

        res.status(500).send({ status :500 , message :"Something Went"})

   })

}


exports.getCookieApi1 = (req,res) =>{

    let ck_data = {
        name : "pankaj",
        email : "pankaj@gmail.com"
    }

    res.cookie("user_data", ck_data)
    res.redirect('/')
    // res.status(200).send({status :201 , message :"User Details Saved in Cookie"})

}


exports.getCookieApi2 =(req,res) => {

    console.log(req.cookies)
    res.send({message :"hi"})
}

exports.clearCookies = (req,res) =>{

    res.clearCookie('user_data')

    res.send({message : "cookies clear"})
}