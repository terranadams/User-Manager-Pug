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

app.get('/create', (req, res) => {
    res.render('form')
})

app.post('/create', (req, res) => {
    console.log(req.body)
    let newUser = {}
    newUser.name = req.body.name
    newUser.userId = req.body.userId
    newUser.email = req.body.email
    newUser.age = req.body.age

    fs.readFile('users.json', (err, data) => {
        var json = JSON.parse(data)
        json.users.push(newUser)
        fs.writeFile('users.json', JSON.stringify(json), (err) => {
            if (err) throw err
        })
    })

    res.redirect('/')

    
})

app.listen(3000, () => {
    console.log("Listening on port 3000.")
})