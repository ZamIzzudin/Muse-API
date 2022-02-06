const mongoose = require('mongoose');

const Group = require('../model/groupModel')
const Spesific = require('../model/spesificModel')
const Anime = require('../model/animeModel');

exports.get = function(req, res){
    let perPage = 10
    let page = req.params.page - 1

    Anime.find({},function(err, data){
        if(err){
            res.status(500).json({
                status : "error",
                message : err.message || "Internal Server Error"
            })
        }else{
            res.json({
                status : "success",
                message : "Data Retrieved Successfully",
                data : data
            })
        }
    }).skip(page * perPage).limit(perPage).sort({title : 1})
}


exports.selectOne = function(req, res){
    Anime.findOne({q_kode : req.params.q_kode}, function(err, data){
        if(err){
            res.status(500).json({
                status : "error",
                message : err.message || "Internal Server Error"
            })
        }else{
            res.json({
                status : "success",
                data : data
            })
        }
    })
}

exports.selectOneEpisode = function (req, res) {
    Anime.findOne({ q_kode: req.params.q_kode }, function (err, data) {
        let selected = req.params.episode - 1
        selected = data.episodes[selected]
        if (err || selected === undefined) {
            res.json({
                status: "error",
                message: "Internal Server Error"
            })
        } else {
            res.json({
                status: "success",
                episode: selected
            })
        }
    })
}

// Bakal di coba lagi nanti

exports.search = function(req, res){
    title = req.params.title
    Anime.find({ $text: {$search : title} }, function (err, data) {
        if (err) {
            res.status(500).json({
                status: "error",
                message: err.message || "Internal Server Error"
            })
        } else {
            res.json({
                status: "success",
                data: data
            })
        }
    })
}

exports.animeByGenre = async function (req, res) {
    let perPage = 10
    let page = req.params.page - 1

    const Collection = mongoose.model(req.params.genre, Spesific);

    Collection.find({},function (err, data) {
        if (err) {
            res.status(500).json({
                status: "error",
                message: err.message || "Internal Server Error"
            })
        } else {
            res.json({
                status: "success",
                message: "Data Retrieved Successfully",
                data: data
            })
        }
    }).skip(page * perPage).limit(perPage).sort({ title: 1 })
}

exports.animeBySeason = function (req, res) {
    let perPage = 10
    let page = req.params.page - 1
    const Collection = mongoose.model(req.params.season, Spesific);

    Collection.find({}, function (err, data) {
        if (err) {
            res.status(500).json({
                status: "error",
                message: err.message || "Internal Server Error"
            })
        } else {
            res.json({
                status: "success",
                message: "Data Retrieved Successfully",
                data: data
            })
        }
    }).skip(page * perPage).limit(perPage).sort({ title: 1 })
}

exports.showGenres = function (req, res) {
    Group.findOne({ group: "Spesific" }, function(err, data){
        if(err){
            res.json({
                status : "error",
                message : err.message
            })
        }else{
            res.json({
                status : "success",
                data : data.genres
            })
        }
    })
}

exports.showSeasons = function (req, res) {
    Group.findOne({ group: "Spesific" }, function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err.message
            })
        } else {
            res.json({
                status: "success",
                data: data.season
            })
        }
    })
}