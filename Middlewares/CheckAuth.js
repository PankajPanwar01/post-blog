


exports.CheckAuth = (req,res, next)=>{

    console.log(req.path)

    if(!req.cookies.auth)
    {
        res.redirect('/project/LoginPage')
    }
    else
    {
        next()
    }
}



exports.CheckReverseAuth = (req,res,next)=>{

    console.log(req.cookies.auth)

    if(req.cookies.auth)
    {
        res.redirect('/project/HomePage')
    }
    else
    {
        next()

    }
}