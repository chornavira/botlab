/*4-5
const greetingRegExp = RegExp('hei|hallo|hello|hi', "i");

function ParseInquire(inquire) {
    let profile = {};//складиваю что получила от пользователя
    let greeting = greetingRegExp.exec(inquire); //сравниваю 
    if (greeting) {
        profile.greeting = true;
    }
    return profile;
}

module.exports.ParseInquire = ParseInquire;*/

//6
const LOCATION_RESTAURANT = 'restaurant'; 
const LOCATION_BAR = 'bar'; 

const restaurantRegExp = RegExp('restaurant|kanteen|bistro|tavern', "i");
const barRegExp = RegExp('bar|saloon|cafe|taproom', "i");
const greetingRegExp = RegExp('hei|hallo|hello|hi', "i");

function ParseInquire(inquire) {
    let profile = {};
    // find location
    if (restaurantRegExp.exec(inquire)) {
        profile.location = LOCATION_RESTAURANT;
    }
    else if (barRegExp.exec(inquire)) {
        profile.location = LOCATION_BAR;
    }
    let greeting = greetingRegExp.exec(inquire);
    if (greeting) {
        profile.greeting = true;
    }
    return profile;
}

module.exports.ParseInquire = ParseInquire;