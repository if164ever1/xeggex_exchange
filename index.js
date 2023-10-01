import XeggexSocketClient from "./apiClass.js";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;



const xeggexApi = new XeggexSocketClient(API_KEY, API_SECRET);

xeggexApi.on( "notification", ( message ) => {
	console.log("Type: " + message.method)
	console.log(JSON.stringify(message, null, 4));
});

let isconnected = await xeggexApi.waitConnect();

let balanceinfo = await xeggexApi.getbalances();
console.log(balanceinfo);