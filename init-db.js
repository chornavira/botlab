const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/menu');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Menu DB connected.");
});

let Menu = require('./models/menu-model.js');

const testMenu = [
    {
        "Place":  "Restaurant",
        "OpeningHours":  "Open from 14:00 till 23:00",
        "Dish":  "Pasta bolognese",
        "Price":  "39,-"
    },
    {
        "Place":  "Restaurant",
        "OpeningHours":  "Open from 14:00 till 23:00",
        "Dish":  "Pasta vegetar",
        "Price":  "39,-"
    },
    {
        "Place":  "Bar",
        "OpeningHours":  "Open from 17:00 till 1:00",
        "Dish":  "Coca-cola",
        "Price":  "20,-"
    },
    {
        "Place":  "Bar",
        "OpeningHours":  "Open from 17:00 till 1:00",
        "Dish":  "Juice",
        "Price":  "20,-"
    }
];

testMenu.forEach( function(element) {
    let menuItem = new Menu(element);
    menuItem.save( function(err, item) {
        if (err)
            return console.error(err);
        console.log(item.Dish, 'saved.');
    });
});