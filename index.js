const morgan = require('morgan');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Models = require('./models');
const Movie = Models.Movie;
const User = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
// middleware that allows me to post json data
app.use(express.urlencoded({ extended: false}));
// middleware that alows me to post keyvalue pairs of data
app.use(morgan('common'));
// logger that console logs date, time and method used
app.use(bodyParser.urlencoded({ extended: true }));
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.use(express.static('public'));
// This uses the use function from express to send file from whatever folder is defined in this case public. 
// GET requests
app.get('/', (passport.authenticate('jwt', { session: false})),(req, res) => {
    res.send('MyFlix App');
});
app.get('/movies', passport.authenticate('jwt',{ session: false}),(req, res) => {
    Movie.find()
    .then((movies) =>{
        res.status(201).json(movies);
    })
    .catch((err) =>{
        console.error(err);
        res.status(500).send('Error:'+ err);
    })
});
app.get('/movies/:title', passport.authenticate('jwt',{ session: false}), (req, res) => {
    Movie.findOne({'Title': req.params.title})
    .then((movies)=>{
        res.json(movies);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send('Error' + err);
    });
});
app.get('/catogries/:genre', passport.authenticate('jwt',{ session: false}), (req, res)=> {
  Movie.findOne({'Genre.Name': req.params.genre})
    .then((movies)=>{
        res.json(movies)
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send('Error' + err);
    });
});
app.get('/directorName/:name',  passport.authenticate('jwt',{ session: false}),(req, res)=> {
  Movie.findOne({'Director.Name': req.params.name})
  .then((director) =>{
    res.status(500).json(director)
  })
  .catch((err) =>{
    console.error(err);
  })
});
app.post('/users', passport.authenticate('jwt',{ session: false}), (req, res) => {
  User.findOne({ userName: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + ' Already exists');
      } else {
        User.create({
            userName: req.body.userName,
            Password: req.body.Password,
            Email: req.body.Email,
            BirthDay: req.body.BirthDay
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
app.put('/users/:name',  passport.authenticate('jwt',{ session: false}),(req, res)=> {
  User.findOneAndUpdate({userName: req.params.name}, {$set:{
    userName: req.body.userName,
    Password: req.body.Password,
    Email: req.body.Email,
    BirthDay: req.body.BirthDay
  }}, {new: true}/* The makes srue that the updated document is returned */ , (err, updatedUser) =>{
    if (err){
      res.status(500).send(err + 'Error')
    }else{
      res.status(200).json(updatedUser)
    }
  })
});
app.delete('/users/:name',  passport.authenticate('jwt',{ session: false}),(req, res)=> {
 User.findOneAndRemove({userName: req.params.name})
 .then((user)=>{
   if (!user){
     res.status(400).send(req.params.name + 'was not found');
   }else{
     res.status(200).send(req.params.name + " was deleted");
   }
 }).catch((err) =>{
   res.status(500).send('Error'+ err);
 })
});
app.post('/users/:name/:title',  passport.authenticate('jwt',{ session: false}),(req, res)=> {
User.findOneAndUpdate({userName: req.params.name}, {$push:{FavMovies: req.params.title}}, {new: true},
  (err, updateFavMovies)=>{
    if (err){
      res.status(500).send(err + ' Error');
      console.error(err);
    }else{
      res.status(200).json(updateFavMovies);
    }
  })
});
app.delete('/users/:name/:title', passport.authenticate('jwt',{ session: false}), (req, res)=> {
 User.findOneAndUpdate({userName: req.params.name},{$pull: {FavMovies: req.params.title}},{new: true}, (err, updateFavMovies) =>{
   if (err){
     res.send(err)
   }else{
   res.status(200).json(updateFavMovies)
   }
 })

});
app.get('/users/:name',  passport.authenticate('jwt',{ session: false}),(req, res) =>{
     User.findOne({'userName': req.params.name})
    .then((user) => {
        res.json(user.FavMovies);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send('Error' + error);
    });

})
// listen for requests
app.listen(8080,()=>{
  console.log('Listening to port 8080')
});