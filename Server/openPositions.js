const Binance = require('node-binance-api');
let config = require('./config.json');

_ticker = process.argv[2];

for(let i=0; i<config.credentials.length; i++) {
    setTimeout(async function() {
        const binance = new Binance().options({
            APIKEY: config.credentials[i].API_KEY,
            APISECRET: config.credentials[i].API_SECRET,
        });
    
        await binance.useServerTime();
        _tickers = await binance.futuresAccount();
        _tickers.positions.some(function(item) {
            if(item.symbol === _ticker) {
                console.log(item);
                return true;
            }
        });

        console.log('\n------------------------------------\n');

    }, i*1000);
}