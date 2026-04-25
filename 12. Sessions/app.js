const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Set to true if using HTTPS
}));

app.get('/', (req, res) => {
    if(req.session.name){
        res.send('Session is active');
    }else{
        res.send('Session is not active');
    }
});

app.get('/set-session', (req, res) => {
    req.session.name = 'This is a session cookie';
    res.send('Session has been set');
});

app.get('/about' , (req, res) => {
    if(req.session.name){
        res.send('Session is active');
    }else{
        res.send('Session is not active');
    }
});

app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Session has been destroyed');
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});