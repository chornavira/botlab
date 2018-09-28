//var builder = require('botbuilder');

//var connector = new builder.ConsoleConnector().listen();
///var bot = new builder.UniversalBot(connector, function (session) {
  //  session.send("You said: %s", session.message.text);
///});

/* 2 example 

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});*/

/* 3 exapml
var restify = require('restify');
var builder = require('botbuilder');

const inMemoryStorage = new builder.MemoryBotStorage();

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
}).set('storage', inMemoryStorage);*/

/* 4
var restify = require('restify');
var builder = require('botbuilder');
var i18n = require('i18n');
var parser = require('./parse-inquire');

const inMemoryStorage = new builder.MemoryBotStorage();

// i18n configuration
i18n.configure({
    defaultLocale: process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE : 'en',
    directory: __dirname + '/locales'
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.userData.profile = parser.ParseInquire(session.message.text);// для того что би хранить дані необхідно десь хранити дані.  session.userData. - це в пакеті мікрософт
    if (session.userData.profile.greeting) { // аналізуємо те что повернулось 
        session.send(i18n.__("greeting"));//  відповідаємо фразою з файла локалізації для рос. мови  ру.json і він візьму з відти. Можна на льоту підстраюватись 
    }
    else {
        session.send("You said: %s", session.message.text);
    }
}).set('storage', inMemoryStorage); /// мето хранения даних сесії
*/
/*5-7
var restify = require('restify');
var builder = require('botbuilder');
var i18n = require('i18n');
var parser = require('./parse-inquire');

const inMemoryStorage = new builder.MemoryBotStorage();

// i18n configuration
i18n.configure({
    defaultLocale: process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE : 'en',
    directory: __dirname + '/locales'
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.userData.profile = parser.ParseInquire(session.message.text);
        if (session.userData.profile.greeting) {
            session.send(i18n.__("greeting"));
        }
        session.beginDialog('requestProfile', session.userData.profile); //vuzuvaemo dilog oputevan
    },
    function (session, results) {
        session.userData.profile = results.response;
        if (session.userData.profile.location) { // provirka chu vznalu location
            session.send("Menu for: " + session.userData.profile.location); // vuvodum menu
        }
        else {
            session.send("Unknown location");
        }
        session.userData.profile = {}; // answer given, forget request details 
        session.endDialog();//verne use profile i perezpushemo y userData
    }
]).set('storage', inMemoryStorage);

bot.dialog('requestProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {}; // set the profile or create the object
        let retryText = i18n.__('promptLocationRetry');
        if (!session.dialogData.profile.location) { // dialogData - poku guve dialog do end dialog
            builder.Prompts.choice(session, //
                i18n.__('promptLocation'),
                "restaurant|bar",
                {listStyle: 4, retryPrompt: retryText}); //4 - avtomatuchno pibklucha// list style: auto
        }
        else {
            next(); // skip if we already have this info
        }
    },
    function (session, results) {
        if (results.response) {
            // save location if we asked for it.
            session.dialogData.profile.location = results.response.entity; //povertae profile user after oproca
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
])
.endConversationAction( /// for close dialog 
    "endRequest", i18n.__("stopped"),
    {
        matches: /^cancel$|^goodbye$|^stop$/i
        //confirmPrompt: i18n.__('confirmCancel')
    }
);*/
var restify = require('restify');
var builder = require('botbuilder');
var i18n = require('i18n');
var parser = require('./parse-inquire');
const mongoose = require('mongoose');
const Menu = require('./models/menu-model.js');
const queries = require('./queries/menu-queries');

const inMemoryStorage = new builder.MemoryBotStorage();

// i18n configuration
i18n.configure({
    defaultLocale: process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE : 'en',
    directory: __dirname + '/locales'
});

// mongodb connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/menu');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Menu DB connected.");
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Simple conversation flow organized with waterfall
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.userData.profile = parser.ParseInquire(session.message.text);
        if (session.userData.profile.greeting) {
            session.send(i18n.__("greeting"));
        }
        session.beginDialog('requestProfile', session.userData.profile);
    },
    function (session, results) {
        session.userData.profile = results.response;
        if (session.userData.profile.location) {
            //session.send("Menu for: " + session.userData.profile.location);
            queries.findMenu(Menu, session.userData.profile.location)
            .then( (result) => {
                session.send(queries.formatMenuItems(result));
            })
            .catch( (err) => {
                session.send(err)
            });
        }
        else {
            session.send("Unknown location");
        }
        session.userData.profile = {}; // answer given, forget request details 
        session.endDialog();
    }
]).set('storage', inMemoryStorage);

bot.dialog('requestProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {}; // set the profile or create the object
        let retryText = i18n.__('promptLocationRetry');
        if (!session.dialogData.profile.location) {
            builder.Prompts.choice(session,
                i18n.__('promptLocation'),
                "restaurant|bar",
                {listStyle: 4, retryPrompt: retryText}); // list style: auto
        }
        else {
            next(); // skip if we already have this info
        }
    },
    function (session, results) {
        if (results.response) {
            // save location if we asked for it.
            session.dialogData.profile.location = results.response.entity;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
])
.endConversationAction(
    "endRequest", i18n.__("stopped"),
    {
        matches: /^cancel$|^goodbye$|^stop$/i
        //confirmPrompt: i18n.__('confirmCancel')
    }
);