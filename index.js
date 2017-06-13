var Discordie = require('discordie');
var Overcraft = require('./overcraft.js');
var connectionConfig = require('./_connectionConfig.json');
var Responder = require("./components/responder.js");

var AngryResponses = require("./strings/angry.json");

const Events = Discordie.Events;
const client = new Discordie();

client.connect(connectionConfig);

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log("Connected as: " + client.User.username);
});

const overcraft = new Overcraft(client);

//General listeners
var generalListener = new Responder(client);

generalListener.addListener("say hi boost-o", function(e) {
    e.message.channel.sendMessage("Hi BOOST-O.");
});

generalListener.addListener("fuck you", function(e) {
    var insulted = false;
    var message = e.message.content.toLowerCase();
    if (e.message.mentions) {
        e.message.mentions.forEach(mention => {
            if(mention.id === client.User.id) {
                insulted = true;
            }
        });
    }

    if (message.indexOf('robot') >= 0 ||
        message.indexOf('boost-o') >= 0 ||
        message.indexOf('omnic') >= 0) {
        insulted = true;
    }

    if (!insulted) {
        return;
    }

    var insultsLength = AngryResponses.insults.length;
    var insultIndex = Math.floor(Math.random() * insultsLength);
    e.message.channel.sendMessage(AngryResponses.insults[insultIndex]);
    
});
