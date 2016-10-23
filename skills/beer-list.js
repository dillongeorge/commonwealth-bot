"use strict";

module.exports = (controller) => {

	let request = require('request');
	let fs = require('fs');
	let path = require('path');

	controller.hears(['beers'], 'direct_message,direct_mention,mention', (bot, message) => {

	    bot.api.reactions.add({
	        timestamp: message.ts,
	        channel: message.channel,
	        name: 'beer',
	    }, (err, res) => {
	        if (err) {
	            bot.botkit.log('Failed to add emoji reaction :(', err);
	        }
	    });

	    request.post({
	    	url: 'https://slack.com/api/files.upload', 
	    	formData: {
	    		token: bot.config.token,
	    		file: fs.createReadStream((`${__dirname}/../beers.pdf`)),
		    	filename: 'beers.pdf', 
		    	title: ':beers: Beer List :beers:',
		    	channels: [message.channel]
	    	}
	    }, (err, res) => {
	    	if(err) bot.botkit.log("Error During Request: ", err);
	    });

	});
};