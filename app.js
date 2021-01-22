const express = require('express')
const fs = require('fs')

let app = express()

app.set('views', './views') // These two lines allow the fake html to be compiled to real html
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        let parsedData = JSON.parse(data)
        res.render('index', {users: parsedData.users}) // This second object arg can be a set of variables passed into the html
    })
})
app.listen(3000, () => {
    console.log("Listening on port 3000.")
})