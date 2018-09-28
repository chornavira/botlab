function findMenu(Menu, location, day) {
    let locationReExp = new RegExp(location, "i");
    console.log("Find " + location);
    return new Promise( (resolve, reject) => {
        Menu.find( {Place: locationReExp}, function(err, menuItems){
            if (err) {
                reject(err);
            }
            else {
                console.log('Found menu items: ');
                console.log(menuItems);
                resolve(menuItems);
            }
        });
    });
}

function formatMenuItems(menuItems) {
    if (menuItems.length === 0)
        return "found_nothing";
    let msg = menuItems[0].Place + "\n";
    msg += menuItems[0].OpeningHours + "\n";
    menuItems.forEach(meal => {
        msg += meal.Dish + ": " + meal.Price + "\n";
    });
    return msg;
}

module.exports.findMenu = findMenu;
module.exports.formatMenuItems = formatMenuItems;