const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Categorie', categorieSchema);