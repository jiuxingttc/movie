const mongoose = require("./db")

const schema = {
    moviename:String,
    username:String,
    score:String,
    comment:String
}
const UM = mongoose.model('um', schema);
module.exports = UM;