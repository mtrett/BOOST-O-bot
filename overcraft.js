var Responder = require("./components/responder.js");

module.exports = Overcraft;

function Overcraft(client) {

    var overcraftResponder = new Responder(client, "overcraft");

    overcraftResponder.addListener("hanzo", function(e) {
        e.message.channel.sendMessage("Hansel?");
    });

    overcraftResponder.addListener("hansel", function(e) {
        if (Math.random() >= 0.5) {
            e.message.channel.sendMessage("Hansel?");
        }
    });
};
