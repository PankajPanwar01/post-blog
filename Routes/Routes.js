const express = require('express')
const router = express.Router();
const Controllers = require('../Controller/Controllers')
const uploader = require('../Middlewares/Uploader')
const AuthMiddleWare = require('../Middlewares/CheckAuth')




// View API only


router.get('/LoginPage', AuthMiddleWare.CheckReverseAuth, Controllers.LoginForm)
router.get('/RegisterPage', AuthMiddleWare.CheckReverseAuth, Controllers.RegisterForm)
router.get('/HomePage', AuthMiddleWare.CheckAuth, Controllers.HomePage)
router.get('/PostBlogPage', AuthMiddleWare.CheckAuth, Controllers.PostBlogForm)


// Handle API's

router.post('/register-user', Controllers.RegisterUserData)
router.post('/login-user', Controllers.LoginUser)
router.post('/logout-user', Controllers.LogoutUser)
router.post('/save-post',uploader.single('file'), Controllers.savePost)

router.get('/showAlert', Controllers.Showalert)
router.get('/view-blog/:id', Controllers.Viewblog)
router.get('/show-my-blogs', Controllers.MyBlogsList)

module.exports = router