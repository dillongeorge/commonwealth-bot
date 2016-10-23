"use strict";

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

fs.readdirSync(path.normalize("./skills")).forEach((file) => {
	require(`./skills/${file}`)(controller);
});