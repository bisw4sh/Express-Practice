const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

//middleware
app.use( (req, res, next) => {
    console.log("Middleware")
    console.log("Follow this link => http://localhost:3000/")
    next()
})

app.get('/', (req, res) => {
    const name = "Biswash"
    res.render('index', {name})
})

app.get('/users/:user', (req, res) => {
    res.render('index', {name : req.params.user})
})

app.get('/error', (req, res, next) => {
    throw Error("Something went wrong");
})

app.use(errorHandler)

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }

app.listen(3000)