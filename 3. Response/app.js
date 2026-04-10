const express = require('express')
const app = express()

app.set('view engine' , 'ejs')


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// res.send() ----> Text,HTML , object , Json , Buffer
app.get('/send/text' , (req, res) => {
    res.send('Send a Text')
})

app.get('/send/html' , (req, res) => {
    res.send('<h1 class="text-3xl">This is html</h1>')
})

app.get('/send/json' , (req, res) => {
    res.send({
        name : "haseeb",
        age : 20
    })
})


// res.json() ----> Json only
app.get('/json' , (req , res) => {
    res.json({
        name : "haseeb",
        age : 20
    })
})

// res.jsonp() ----> Json with padding
app.get('/jsonp' , (req , res) => {
    res.jsonp({
        name : "haseeb",
        age : 20
    })
})

// res.redirect() ----> Redirect to another page
app.get('/redirect' , (req , res) => {
    res.redirect('/')
})

app.get('/redirect/google' , (req , res) => {
    res.redirect(302 , "https://www.google.com/")
})

// res.render() ----> Renders HTML file using template engines
app.get('/render' , (req , res) => {
    res.render('index')
})

// res.download() ----> Downloads any file
app.get('/download' , (req , res) => {
    res.download('app.js' , 'document.js')
})


// res.sendfile() ----> Opens any file in another tab
app.get('/sendfile' , (req , res) => {
    res.sendFile(__dirname + 'index.ejs')
})


// res.end() ----> Ends the response
// res.sendstatus ----> sends the response with status code
// res.headersend ----> sends the conditoin of the response to see rather it is sent or not
// res.set ----> used to set a variable such as cookie on the browser
// res.get ----> used to get a variable such as cookie on the browser



app.listen(3000, () => {
    console.log('Server started on port 3000')
})