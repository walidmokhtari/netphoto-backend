const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    categories: [
        {type: Schema.Types.ObjectId, ref: 'Categorie'}
    ]
});

module.exports = mongoose.model('Movie', movieSchema);