var Discordie = require('discordie');

const Events = Discordie.Events;
module.exports = Responder;

function Responder(client, channelName) {
    this.listeners = [];
    this.channelName = channelName;

    client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
        if (client.User.id === e.message.author.id) {
            return;
        }

        console.log("Message from: " + e.message.channel.name);
        if (this.channelName && e.message.channel.name !== this.channelName) {
            return;
        }

        const messageContent = e.message.content.toLowerCase();
        this.listeners.forEach(listener => {
            if (messageContent.indexOf(listener.message) >= 0) {
                listener.callback(e);
            }
        });
    });
};

Responder.prototype.addListener = function(message, callback) {
    this.listeners.push({
        message: message.toLowerCase(),
        callback: callback
    });
};
