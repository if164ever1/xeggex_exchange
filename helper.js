export function findByAsset(balance, assetName){
    console.log(balance.result[0]);
    return balance
        .result
        .find(asset => asset.asset === assetName);
}