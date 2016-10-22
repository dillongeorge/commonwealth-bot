var Botkit = require('botkit');
var path = require('path');
var fs = require('fs');

if(!process.env.token) {
	console.log("Give me a token, fam!");
	process.exit(1);
}

var controller = Botkit.slackbot({
	debug: false, 
	retry: 10,
	studio_token: process.env.studio_token
});

var bot = controller.spawn({
	token: process.env.token
}).startRTM();


controller.hears(['common', 'cw'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'beer',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction 	:(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Soon there will be beer.');
        }
    });
});
