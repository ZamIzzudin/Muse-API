// Setup express Router
const express = require('express');
const router = express.Router();

// Controllers

const anime = require('../controllers/animeController');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Unofficial Muse ID Rest API',
        createdBy: "KakUdinnn"
    })
})


// All Anime
router.route('/anime/:page')
.get(anime.get)

// Anime Details
router.route('/anime/w/:q_kode')
.get(anime.selectOne)

// Anime Selected Episode Youtube link
router.route('/anime/w/:q_kode/:episode')
.get(anime.selectOneEpisode)

// Search Anime 
router.route('/search/:title')
.get(anime.search)

// Find Anime by genres
router.route('/genre')
.get(anime.showGenres)

router.route('/genre/:genre/:page')
.get(anime.animeByGenre)

// Find anime by season
router.route('/season')
.get(anime.showSeasons)

router.route('/season/:season/:page')
.get(anime.animeBySeason)

module.exports = router