// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

const fetch = require("node-fetch");

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
		// URL of meribot backend REST API that handle user messages.
		const url = 'https://sleepy-tundra-75466.herokuapp.com/mock/message';

		try {
			const config = {
			method: 'POST',
			headers: {
			    'Accept': 'text/plain',
			    'Content-Type': 'application/json',
			},
			body: JSON.stringify(turnContext.activity.text)
			}
			//Call backend API to get response for user message.
			const response = await fetch(url, config)
			//Wait for promise to get text response.
			let data = await response.text();
			//Send response to user.
			await turnContext.sendActivity(JSON.stringify(data));
		    /*} else {
			turnContext.sendActivity(`[${ response } => error detected]`);
		    }*/
		} catch (error) {
			//Send error in case of error.
			await turnContext.sendActivity(`[${ error } => error detected]`);
		}
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
