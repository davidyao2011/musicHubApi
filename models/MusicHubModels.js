import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// AlbumSchema schema
export const AlbumSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the album name',
    },
    label: {
        type: String,
        required: 'Enter the lable name'
    },
    popularity: {
        type: Number,
        required: 'Enter the popularity number'
    },
    totalTracks: {
        type: Number,
        required: "Enter the total track number"
    }
});

// ArtistSchemame schema
export const ArtistSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the artist name'
    },
    type: {
        type: String,
        required: 'Enter the artist type'
    },
    popularity: {
        type: Number,
        required: 'Enter the populsarity number'
    },
    nationality: {
        type: String,
        required: 'Enter the nationality'
    },
    genres: {
        type: [String],
        required: 'Enter the generes'
    }
});

// TrackSchema schema
export const TrackSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the track name'
    },
    released_date: {
        type: String,
        required: 'Enter the released date'
    },
    type: {
        type: String,
        required: 'Enter the track type'
    },
    description: {
        type: String
    },
    artists: {
        type: String,
        required: 'Enter the artist'
    }
});