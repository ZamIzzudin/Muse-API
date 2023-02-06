const mongoose = require('mongoose');

const Spesific = require('../model/spesificModel')
const Anime = require('../model/animeModel');
const Group = require('../model/groupModel');

exports.editAnime = async function (req, res) {
    Anime.findOne({q_kode : req.params.q_kode}, async function(err, data){
            let status = JSON.stringify(data.genres) === JSON.stringify(req.body.genres)
            let status2 = data.season === req.body.season

        if(status && status2){
            let dataStore = {
                title: req.body.title,
                rate: req.body.rate,
                day_update: req.body.day_update,
                season: req.body.season,
                thumbnail: req.body.thumbnail,
                genres: req.body.genres,
                q_kode: req.body.q_kode,
                total_episode: req.body.episodes.length,
                status: req.body.status,
                studio: req.body.studio,
                release_date: req.body.release_date,
                episodes: req.body.episodes
            }

                data.title = dataStore.title
                data.season = dataStore.season
                data.studio = dataStore.studio
                data.thumbnail = dataStore.thumbnail
                data.rate = dataStore.rate
                data.release_date = dataStore.release_date
                data.day_update = dataStore.day_update
                data.status = dataStore.status
                data.genres = dataStore.genres
                data.episodes = dataStore.episodes
                data.q_kode = dataStore.q_kode

            let paths = await getPath(req.body.q_kode)

            paths.forEach(async path => {
                const Collection = mongoose.model(path, Spesific)
                await Collection.findOneAndUpdate({ q_kode: req.body.q_kode }, dataStore)
            })

            data.save().then(data => {
                res.json({
                    status: 'success',
                    message: 'success updated data',
                    data : data
                })
            }).catch(err => {
                res.json({
                    status : "error",
                    message : err.message
                })
            })
        }else{
            res.json({
                message : "you better delete this data and make again this one"
            })
        } 
    })
}

exports.deleteAnime = async function(req, res){
    let paths = await getPath(req.params.q_kode)

    paths.forEach(async path => {
        const Collection = mongoose.model(path, Spesific)
        await Collection.findOneAndDelete({q_kode : req.params.q_kode}) 
    })

    Anime.deleteOne({ q_kode: req.params.q_kode }, function(err, data){
        if(err){
            res.json({
                status : 'error',
                message : err.message
            })
        }else{
            res.json({
                status : 'success',
                message : "data has been deleted"
            })
        }
    })
}


exports.addEpisode = async function (req, res){
    let path = await Anime.findOne({q_kode : req.body.q_kode})

    let pathSeason = path.season.toLowerCase().replace(/\s/g, "")
    let pathGenre = []

    path.genres.forEach(genre => {
        pathGenre.push(genre.toLowerCase().replace(/\s/g, ""))
    })

    let currentEpisode = path.episodes
    currentEpisode.push(req.body.new_episode)
    currentEpisode = currentEpisode

    pathGenre.push(pathSeason)
    const AllPath = pathGenre

    try{
        AllPath.forEach( async path => {
            const Collection = mongoose.model(path, Spesific)
            await Collection.findOneAndUpdate({q_kode : req.body.q_kode}, {episodes : currentEpisode})
        })
        await Anime.findOneAndUpdate({q_kode : req.body.q_kode}, {episodes : currentEpisode})

        res.json({
            status : "success",
            message : "episode was updated successfully"
        })
    }catch(err){
        res.json({
            status : "error",
            message : err.message
        })
    }
}

exports.add = function (req, res) {
    let dataStore = {
        title: req.body.title,
        rate: req.body.rate,
        day_update: req.body.day_update,
        season: req.body.season,
        thumbnail: req.body.thumbnail,
        genres: req.body.genres,
        q_kode: req.body.q_kode,
        total_episode: req.body.episodes.length,
        status: req.body.status,
        studio: req.body.studio,
        release_date: req.body.release_date,
        episodes: req.body.episodes
    }

    let anime = new Anime();

    anime.title = dataStore.title
    anime.season = dataStore.season
    anime.studio = dataStore.studio
    anime.thumbnail = dataStore.thumbnail
    anime.rate = dataStore.rate
    anime.release_date = dataStore.release_date
    anime.day_update = dataStore.day_update
    anime.status = dataStore.status
    anime.genres = dataStore.genres
    anime.episodes = dataStore.episodes
    anime.q_kode = dataStore.q_kode

    // Add into genre collection
    saveGenre(Spesific, dataStore)
    // Add into season collection 
    saveSeason(Spesific, dataStore);

    anime.save().then(data => {
        res.json({
            status: "success",
            message: "Data Added Successfully",
            data: data
        })
    }).catch(err => {
        res.status(500).json({
            status: "error",
            message: err.message || "Internal Server Error"
        })
    })
}

// template push
async function saveGenre(Schema, dataStore) {
    const genres = dataStore.genres
    let allGenre = []

    let existGroup = await Group.findOne({ group: "Spesific" })
    let group = existGroup.genres
    
    await genres.forEach((genre) => {
        allGenre.push(genre)
        newGroup = [...new Set([...group, ...allGenre])]

        genre = genre.toLowerCase().replace(/\s/g, "")
        const Collection = mongoose.model(genre, Schema)
        Collection.create(dataStore)
        
    })
    await Group.findOneAndUpdate({ group: "Spesific" }, { genres: newGroup })
}

async function saveSeason(Schema, dataStore) {
    const address = dataStore.season.toLowerCase().replace(/\s/g, "");
    const dataCollection = mongoose.model(address, Schema);

    let existGroup = await Group.findOne({ group: "Spesific" })
    group = existGroup.season
    newGroup = [...new Set([...group, dataStore.season])]

    await Group.findOneAndUpdate({ group: "Spesific" }, { season: newGroup })

    dataCollection.create(dataStore);
}

async function getPath(q_kode){
    let path = await Anime.findOne({ q_kode: q_kode })

    let pathSeason = path.season.toLowerCase().replace(/\s/g, "")
    let pathGenre = []

    path.genres.forEach(genre => {
        pathGenre.push(genre.toLowerCase().replace(/\s/g, ""))
    })

    pathGenre.push(pathSeason)
    let Allpath = pathGenre
    return Allpath
}