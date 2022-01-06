const morgan = require('morgan');
const express = require('express')
const app = express();

 app.use(morgan('common'));

let topMovies = [
  {
    title: 'The Lion King',
    year:'2019'
  },
  {
    title: 'Sing',
    year:'2019'
  },
  {
    title: 'Sing 2 ',
    year: '2021'
  },
    {
    title: 'Encanto',
    year: '2021'
  },
    {
    title: 'Spider man no way home',
    year: '2021'
  },
    {
    title: 'Avengers End Game',
    year: '2019'
  },
    {
    title: 'naruto last movie',
    year: '2014'
  },
    {
    title: 'Demon Slayer: Mugen Train',
    year: '2020'
  },
    {
    title: 'Mr peabody and sherman',
    year: '2014'
  },
    {
    title: 'coco',
    year: '2017'
  }
];

// GET requests
app.get('/', (req, res) => {
    res.send('My Movie app');

});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(express.static('public'));
app.use(function(req, res, err){
  console.log(err)
  res.status(500).send('Something Broke!')
});


// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});