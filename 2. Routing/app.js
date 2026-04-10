const express = require('express')
const app = express()


// Main Landing Page
app.get('/', (req, res) => {
    res.send('Landing Page')
})

// About Page
app.get('/about', (req, res) => {
    res.send('About Page')
})

// Nested Route
app.get('/about/user', (req, res) => {
    res.send('User Page in About Page')
})

// Dynamic Nested Route
app.get('/about/user/:id', (req, res) => {
    res.send(`User ${req.params.id} Page in About Page`)
})

app.get('/about/user/:userid/book/:bookid', (req, res) => {
    res.send(`Book ${req.params.bookid} for User ${req.params.id} Page in About Page`)
})

// Other Method is using hyphen(-) between words
app.get('/user/:userid-:bookid', (req, res) => {
    res.send(`Book ${req.params.bookid} for User ${req.params.userid} Page in About Page`)
})

// Query Routes
app.get('/search', (req, res) => {
    res.send(`${req.query.name} is ${req.query.age} years old`)
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})