const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    group : {
        type : String,
        required : true
    },
    genres : [],
    season : []
})

const Data = module.exports = mongoose.model("groups", groupSchema);
module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}