import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./auth/google.js";

const app = express();
dotenv.config();

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", ( req, res ) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/profile", ( req, res ) => {
  if(req.isAuthenticated()) {
    console.log(req.user);
    res.send(`Hello ${req.user.displayName} <br> <a href='/logout'>Logout</a>`);
  } else {
    res.redirect("/");
  }
});

app.get("/logout", ( req, res ) => {
  req.logout((err) => {
    if(err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.get('/auth/google',
  passport.authenticate(
    'google', 
    { scope: ['profile' , 'email'] }
  )
);
 
app.get('/auth/google/callback', 
  passport.authenticate(
    'google', 
    { 
      failureRedirect: '/' , 
      successRedirect: '/profile'
    }
  ),
);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});