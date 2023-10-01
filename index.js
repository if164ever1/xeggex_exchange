import XeggexSocketClient from "./apiClass.js";
require('dotenv').config();

const yourApiKey = process.env.API_KEY;
const yourApiSecret = process.env.API_SECRET;

const xeggexApi = new XeggexSocketClient(yourApiKey, yourApiSecret);

xeggexApi.on( "notification", ( message ) => {
	console.log("Type: " + message.method)
	console.log(JSON.stringify(message, null, 4));
});

let isconnected = await xeggexApi.waitConnect();
