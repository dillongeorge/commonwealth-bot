"use strict";

var Botkit = require('botkit');
var path = require('path');
var fs = require('fs');
var path = require('path');

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


controller.hears(['beers'], 'direct_message,direct_mention,mention', function(bot, message) {

	let request = require('request');

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'beer',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction 	:(', err);
        }
    });

    request.post({
    	url: 'https://slack.com/api/files.upload', 
    	formData: {
    		token: bot.config.token,
    		file: fs.createReadStream(path.normalize('./skills/beers.pdf')),
	    	filename: 'beers.pdf', 
	    	title: ':beers: Beer List :beers:',
	    	channels: [message.channel]
    	}
    }, (err, res) => {
    	if(err) console.log("Error During Request: ", err);
    	else //do-nothing
    });

});
