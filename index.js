// To start a new project, you can delete the node_modules folder
// and run: npm install to install all the dependencies in package.json

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {
    addNewAlbum,
    getAlbums,
    getAlbumByID,
    updateAlbum,
    deleteAlbum, // 5 functions for album
    addNewArtist,
    getArtists,
    getArtistByID,
    updateArtist, // 4 functions for artist
    addNewTrack,
    getTracks,
    getTrackById,
    deleteTrack, // 3 functions for track
    createNewUser,
    createLogin, // 2 functions for users
} from './controllers/MusicHubControllers';

const app = express();
const PORT = 3000;
const checkAuth = require('./middleware/check-auth');

// connect Mongodb database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MusicHubDB', {
    useNewUrlParser: true,
});

// use body parser
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// use json() format
app.use(bodyParser.json());

// view all albums
app.get('/', getAlbums);

// add a new album
app.post('/albums/newAlbum', checkAuth, addNewAlbum);

// view all albums
app.get('/albums', checkAuth, getAlbums);


app.route('/albums/:albumId')
    .get(checkAuth, getAlbumByID) // view an album by album id
    .put(checkAuth, updateAlbum) // update an album by album id
    .delete(checkAuth, deleteAlbum); // remove an album by album id

// add a new artist
app.post('/artists/newArtist', checkAuth, addNewArtist);

// vew all artists
app.get('/artists', checkAuth, getArtists);

app.route('/artists/:artistId')
    .get(checkAuth, getArtistByID) // view a artist by artistId
    .put(checkAuth, updateArtist); // update a artist by artistId

// add a new track
app.post('/tracks/newTrack', checkAuth, addNewTrack);

// new all tracks
app.get('/tracks', checkAuth, getTracks);

// remove a track by trackId
app.route('/tracks/:trackId')
    .get(checkAuth, getTrackById)
    .delete(checkAuth, deleteTrack);

// create a new user(username, password)
app.post('/user/signup', createNewUser);

// create a login to login an user
app.post('/user/login', createLogin);

// localhost:3000
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});

//checkAuth,