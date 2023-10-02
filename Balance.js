export class Balance{

    getAvaliableBalance(array){
        return array.result.filter((item => item.available > 0 && this.checkCryptoName(item.asset)));
    }

    checkCryptoName(cryptoName){
        if(cryptoName === "USDT"){
            return false;
        } else if(cryptoName === "DOGE"){
            return false;
        }else if(cryptoName === "GPRX"){
            return false;
        }else if(cryptoName === "CLORE"){
            return false;
        }
        return true;
    }
}