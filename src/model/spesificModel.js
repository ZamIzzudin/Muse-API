const mongoose = require('mongoose');

const spesificSchema = mongoose.Schema({
    title: {
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
        landscape: { type: String },
        potrait: { type: String },
        mini: { type: String }
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
    status: {
        type: String,
        required: true
    },
    genres: [],
    episodes: [],
    q_kode: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = spesificSchema