// const mongoose = require("mongoose")
const mongoose = require("./db")

const schema = {
    username:String,
    password:String ,
    sex:String,
    hobby:String,
    role:String
}
const User = mongoose.model('user', schema);
// const user = new User({ username: '001',password:'001',role:'user'});
// user.save()
module.exports = User;