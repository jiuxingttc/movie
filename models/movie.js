const mongoose = require("./db")

const schema = {
    name:String,
    director:String,
    actor:String,
    type:String,
    time:Date,
    point:String
}
const Movie = mongoose.model('movie', schema);
// const user = new User({ username: '001',password:'001',role:'user'});
// user.save()
module.exports = Movie;