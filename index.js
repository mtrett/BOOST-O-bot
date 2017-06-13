var Discordie = require('discordie');
var Overcraft = require('./overcraft.js');
var connectionConfig = require('./_connectionConfig.json');
var Responder = require("./components/responder.js");

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
