const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
    Title: { type: String, required:true},
    Description:{ type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director:{
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});
let userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    Password: { type: String, required: true},
    Email : { type: String, required: true},
    BirthDay: Date,
    FavMovies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})
let Movie = mongoose.model('movies', movieSchema);
let User = mongoose.model('user', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

