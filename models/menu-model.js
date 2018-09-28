const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let menuModel = new Schema({
    Place: { type: String },
    OpeningHours: { type: String },
    Dish: { type: String },
    Price: { type: String }
});

module.exports = mongoose.model('Menu', menuModel);
