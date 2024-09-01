const express = require('express')
const router = express.Router();
const TestControllers = require('../Controller/TestController')
const uploader = require('../Middlewares/Uploader')


router.get('/' , TestControllers.ShowMessage)
router.get('/check-armstrong' , TestControllers.CheckArmstrong)
router.post('/arm-res' , TestControllers.ArmstrongRes)
router.get('/add-user' , TestControllers.AddUser)
router.post('/user-list' , TestControllers.ShowUserList)
router.get('/checkOddEven' , TestControllers.CheckOddEven)
router.get('/register' , TestControllers.Register)
router.get('/form-data' , TestControllers.FormData)
router.get('/form-by-post' , TestControllers.FormByPost)
router.post('/data-post' , TestControllers.PostData)
router.post('/check-mobile' , TestControllers.CheckMobile)
router.post ('/checkByFive' , TestControllers.Line1, TestControllers.Line2)
router.post('/reverse-string', TestControllers.ReverseString)
router.post('/user-register', TestControllers.RegisterUser)
router.get('/get-users-list', TestControllers.GetAllUsers)
router.post('/login', TestControllers.LoginUser)
router.get('/get-users', TestControllers.ListAllUsers)
router.post('/get-mid', TestControllers.Api1, TestControllers.Api2, TestControllers.Api3 )
router.post('/upload-file', uploader.single('file'), TestControllers.uploadFile)
router.get('/cookie-api-1', TestControllers.getCookieApi1)
router.get('/cookie-api-2', TestControllers.getCookieApi2)
router.get('/cookie-api-3', TestControllers.clearCookies)


module.exports = router