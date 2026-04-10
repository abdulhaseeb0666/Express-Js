const express = require('express')
const app = express()

app.set('view engine' , 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/' , (req,res) => {
    res.send("Hello World")
})

// ----------------Request Properties----------------

// req.body
app.get('/body' , (req , res) => {
    res.send(req.body)
})

// req.params
app.get('/params' , (req , res) => {
    res.send(req.params)
})

// req.query
app.get('/query' , (req , res) => {
    res.send(req.query)
})

// req.hostname
app.get('/hostname' , (req , res) => {
    res.send(req.hostname)
})

// req.ip
app.get('/ip' , (req , res) => {
    res.send(req.ip)
})

// req.ips
app.get('/ips' , (req , res) => {
    res.send(req.ips)
})

// req.method
app.get('/method' , (req , res) => {
    res.send(req.method)
})

// req.originalurl
app.get('/originalurl' , (req , res) => {
    res.send(req.originalUrl)
})

// req.path
app.get('/path' , (req , res) => {
    res.send(req.path)
})

// req.protocol
app.get('/protocol' , (req , res) => {
    res.send(req.protocol)
})

// req.secure
app.get('/secure' , (req , res) => {
    res.send(req.secure)
})

// req.route
app.get('/route' , (req , res) => {
    res.send(req.route)
})


// ----------------Request Methods----------------

// req.accept
app.get('/accept' , (req , res) => {
    res.send(req.accepts())
})

// req.headers
app.get('/headers' , (req , res) => {
    res.send(req.headers)
})

// req.is
app.post('/is' , (req , res) => {
    res.send(req.is())
})






app.listen(3000)