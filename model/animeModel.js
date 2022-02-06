// Setup Mongoose
const mongoose = require('mongoose');

// Create Schema
const animeSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    studio: {
        type: String,
        required: true
    },
    thumbnail: {
        landscape: {type: String},
        potrait: {type: String},
        mini: {type: String}
    },
    rate: {
        type: Number,
    },
    release_date: {
        type: String,
        required: true
    },
    day_update: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    genres: [],
    episodes: [],
    q_kode: {
        type: String,
        required: true,
        unique: true
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

// Export Model 
const Data = module.exports = mongoose.model("anime", animeSchema);
module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}