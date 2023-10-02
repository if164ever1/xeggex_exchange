import XeggexSocketClient from "./apiClass.js";
import dotenv from "dotenv";
import { findByAsset } from "./helper.js";
import { Balance } from "./Balance.js";
import { Currency } from "./Currency.js";


dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const XEGGEX_API = new XeggexSocketClient(API_KEY, API_SECRET);
let avaliableBalance  = new Balance();

XEGGEX_API.on( "notification", ( message ) => {
	console.log("Type: " + message.method)
	console.log(JSON.stringify(message, null, 4));
});

let isconnected = await XEGGEX_API.waitConnect();
let balanceinfo = await XEGGEX_API.getbalances();
const availableBalance = avaliableBalance.getAvaliableBalance(balanceinfo);
console.log(availableBalance);

const DOGE = "DOGE";
const USDT = "USDT";


let dogeMarket = [];
let usdtMarket = [];
let count = 0;
let symbol = null;
let bestPrice = 0;
let dogeSum = 0;
let usdtSum = 0;
let dogeOrders = 0;
let usdtOrders = 0;

for(const crypto of availableBalance){
    try{
        const doge_market = await XEGGEX_API.getmarket(`${crypto.asset}/${DOGE}`);
        symbol = doge_market.result.symbol;
        bestPrice = doge_market.result.bestAsk;
        crypto.symbol = symbol;
        crypto.bestPrice = bestPrice;
        dogeSum += parseInt(bestPrice, 10);
        dogeMarket.push(crypto);
        count++;
    }catch(error){
        try{
            if(error.error.code === 2002){
                const usdt_market = await XEGGEX_API.getmarket(`${crypto.asset}/${USDT}`);
                symbol = usdt_market.result.symbol;
                bestPrice = usdt_market.result.bestAsk;
                crypto.symbol = symbol;
                crypto.bestPrice = bestPrice;
                usdtSum += parseInt(bestPrice, 10);
                usdtMarket.push(crypto);
                count++;
            }
        } catch(error){
            console.log('Error: -> ', error);
            count++;
        }
        console.log(count);
    }
}

let queue = [];
const API_REQUEST_DELAY = 20000;
let countOrder = 0;
async function processQueue(){
    if(queue.length === 0) {
        console.log("***********************THE END*****************************");
        return;
    }

    const item = queue.shift();

    try{
        console.log(`${item.symbol} - ${item.bestPrice} - ${item.available}`);
        const order = await XEGGEX_API.createorder(item.symbol, 'sell', item.bestPrice, item.available);
        console.log(order);
    }catch(error){
        console.log("Error:", error);
    }

    // Process the next request after a delay
    setTimeout(() => processQueue(), API_REQUEST_DELAY);
}

function doge(){
    // Example: Add items to the queue
    dogeMarket.forEach(item => {
        queue.push(item);
    });
    // Start processing the queue
    processQueue();
}

function usdt(){
    // Example: Add items to the queue
    usdtMarket.forEach(item => {
        queue.push(item);
    });
    // Start processing the queue
    processQueue();
}

// doge();
usdt();

console.log(`DOGE: ${dogeSum} === USDT: ${usdtSum}`);