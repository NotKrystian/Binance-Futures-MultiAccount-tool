const Binance = require('node-binance-api');
let config = require('./config.json');

let _totals = 0;

config.credentials.some(function(item, i) {
    const binance = new Binance().options({
        APIKEY: item.API_KEY,
        APISECRET: item.API_SECRET,
    });

    (async () => {
        await binance.useServerTime();
        let _balance = await binance.futuresBalance();
        //console.log(await binance.futuresLeverageBracket( "LINKUSDT" ));
        _balance.some(function(_item) {
            if(_item.balance != 0){
                console.log(item.LABEL, _item.asset, _item.balance);
                _totals = parseFloat(_totals) + parseFloat(_item.balance);
            }
            
        });
        console.log('\n------------------------------------\n');
    })();
    
});

setTimeout(function() {
    console.log('Total: $', parseFloat(_totals).toFixed(2));
}, 2500);