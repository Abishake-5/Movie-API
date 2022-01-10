const morgan = require('morgan');
const express = require('express')
const app = express();

 app.use(morgan('common'));

let topMovies = [
  {
    title: 'The Lion King',
    year:'2019',
    genre:'',
    directorName:''
    
  },
  {
    title: 'Sing',
    year:'2019',
    genre:'',
    directorName:''
  },
  {
    title: 'Sing 2 ',
    year: '2021',
    genre:'',
    directorName:''
  },
    {
    title: 'Encanto',
    year: '2021',
    genre:'',
    directorName:''
  },
    {
    title: 'Spider man no way home',
    year: '2021',
    genre:'',
    directorName:''
  },
    {
    title: 'Avengers End Game',
    year: '2019',
    genre:'',
    directorName:''
  },
    {
    title: 'naruto last movie',
    year: '2014',
    genre:'',
    directorName:''
  },
    {
    title: 'Demon Slayer: Mugen Train',
    year: '2020',
    genre:'',
    directorName:''
  },
    {
    title: 'Mr peabody and sherman',
    year: '2014',
    genre:'',
    directorName:''
  },
    {
    title: 'coco',
    year: '2017',
    genre:'',
    directorName:''
  }
];

// GET requests
app.get('/', (req, res) => {
    res.send('MyFlix App');

});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(express.static('public'));
app.use(function(req, res, err){
  console.log(err)
  res.status(500).send('Something Broke!')
});


app.get('/movies/:title', (req, res) => {
    res.send('Movie by title');
});

app.get('/catogries/:genre', (req, res)=> {
  res.send("Movie Genre");
});

app.get('/directorName/:name', (req, res)=> {
  res.send("Movie DirectorName");
});

app.post('/users/:newUser', (req, res)=> {
 res.send("New User");
});

app.put('/users/:username', (req, res)=> {
 res.send("Update User");
});

app.delete('/users/:username', (req, res)=> {
 res.send("Delete User");
});

app.post('/favorite/:movieName', (req, res)=> {
 res.send("Add Movies to Fav");
});

app.get('/favorite', (req, res)=> {
 res.send("get a list of fav movies");
});

app.delete('/favorite/:movieName', (req, res)=> {
   res.send("delete move from fav");

});
// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});