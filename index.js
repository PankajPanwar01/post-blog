const express = require('express');
const cors = require('cors')
const app =  express();
const PORT = 8543;
const path = require('path')
const bodyParser = require('body-parser');
const TestRoutes = require('./Routes/TestingRoutes')
const DB = require('./DB/Db')
const ProjectRoutes = require('./Routes/Routes')
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
app.use(express.static(path.join(__dirname, 'Templates'))); //  "public" off of current is root


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use('/' , TestRoutes)
app.use('/project',ProjectRoutes )


app.listen(PORT, () => {
    console.log(`my server is Running on Port : ${PORT}`)
})