import mongoose from 'mongoose'; // mongoose module
import {
    AlbumSchema,
    ArtistSchema,
    TrackSchema
} from '../models/MusicHubModels';
import {
    userSchema //it has _id, email and password
} from '../models/UserModel';

// make models from schema
const Album = mongoose.model('Album', AlbumSchema);
const Artist = mongoose.model('Artist', ArtistSchema);
const Track = mongoose.model('Track', TrackSchema);
const User = mongoose.model('User', userSchema);
const bcrypt = require('bcrypt'); // use bcrypt library
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken --save


// export the function to add new album
export const addNewAlbum = (req, res) => {
    let newAlbum = new Album(req.body);

    newAlbum.save((err, album) => {
        if (err) {
            res.send(err);
        }
        res.json(album)
    });
};

// export the function to retrive and view all the albums
export const getAlbums = (req, res) => {
    Album.find({}, (err, album) => {
        if (err) {
            res.send(err);
        }
        res.json(album)
    });
};

// export the function to retrive the specific album by Id
export const getAlbumByID = (req, res) => {
    Album.findById(req.params.albumId, (err, album) => {
        if (err) {
            res.send(err);
        }
        res.json(album)
    });
};

// export the function to update the album
export const updateAlbum = (req, res) => {
    Album.findOneAndUpdate({
        _id: req.params.albumId
    }, req.body, {
        new: true
    }, (err, album) => {
        if (err) {
            res.send(err);
        }
        res.json(album)
    });
};

// export the function to delete the album
export const deleteAlbum = (req, res) => {
    Album.remove({
        _id: req.params.albumId
    }, (err, album) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Successfully deleted album'
        });
    });
};

// export the function to add new artist
export const addNewArtist = (req, res) => {
    let newArtist = new Artist(req.body);

    newArtist.save((err, artist) => {
        if (err) {
            res.send(err);
        }
        res.json(artist)
    });
};

// export the function to retive the artist
export const getArtists = (req, res) => {
    Artist.find({}, (err, artist) => {
        if (err) {
            res.send(err);
        }
        res.json(artist)
    });
};

export const getArtistByID = (req, res) => {
    Artist.findById(req.params.artistId, (err, artist) => {
        if (err) {
            res.send(err);
        }
        res.json(artist)
    });
};

export const updateArtist = (req, res) => {
    Artist.findOneAndUpdate({
        _id: req.params.artistId
    }, req.body, {
        new: true
    }, (err, artist) => {
        if (err) {
            res.send(err);
        }
        res.json(artist)
    });
};

// export the function to add new track
export const addNewTrack = (req, res) => {
    let newTrack = new Track(req.body);

    newTrack.save((err, track) => {
        if (err) {
            res.send(err);
        }
        res.json(track)
    });
};

export const getTracks = (req, res) => {
    Track.find({}, (err, track) => {
        if (err) {
            res.send(err);
        }
        res.json(track)
    });
};

export const getTrackById = (req, res) => {
    Track.findById(req.params.trackId, (err, track) => {
        if (err) {
            res.send(err);
        }
        res.json(track)
    });
};

export const deleteTrack = (req, res) => {
    Track.remove({
        _id: req.params.trackId
    }, (err, track) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Track successfully deleted'
        });
    });
};

// create new user and export the function
export const createNewUser = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email exists'
                });
            } else {
                // npm install bycrpt and use hash library
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        let newUser = new User({ // make newUser model
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash // can not use req.body.password
                        });
                        newUser
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                });
            }
        })
};

// user log in and export the function
export const createLogin = (req, res, next) => {
    User.find({
            username: req.body.username
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed '
                });
            }
            // use bcrypt to compare password with hash password created for user
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if (err) {
                    return res.status(401).json({
                        message: "Authentication failed 1"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY, { //from nodemon.json file
                            expiresIn: "1h" // can be used for 1 hour
                        }
                    );
                    return res.status(200).json({
                        message: "Authentication successful",
                        token: token
                    });

                }
                res.status(401).json({
                    message: "Authentication failed 2"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};