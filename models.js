const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    Username: {type: String, required: true},
    Password: { type: String, required: true},
    Email : { type: String, required: true},
    BirthDay: Date,
    FavMovies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
// uses the bcrypt moduel to hash the password

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
// uses the bcrypt moduel to compare the hashed password 


let Movie = mongoose.model('movies', movieSchema);
let User = mongoose.model('user', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;

