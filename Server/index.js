const Binance = require('node-binance-api');
require('dotenv').config();
let config = require('./config.json');

console.log('\n');

let _stable = process.argv[2];
let _ticker = process.argv[3];
let _leverage = process.argv[4];
let _percent = process.argv[5];

if(_stable === undefined){
    console.log('Please provide a stable coin.', '\nex: node index.js USDT BTCUSDT 10\n');
}

if(_ticker === undefined) {
    console.log('Please provide a ticker symbol.', '\nex: node index.js USDT BTCUSDT 10\n');	
    return;
}

if(_leverage === undefined) {
    console.log('Please provide a leverage.', '\nex: node index.js USDT BTCUSDT 10\n');
    return;
}
config.credentials.some(function(item, i) {
    const binance = new Binance().options({
        APIKEY: item.API_KEY,
        APISECRET: item.API_SECRET,
    });

    (async () => {
        await binance.useServerTime();
        let tickers = await binance.futuresPrices();

        if(tickers[_ticker] === undefined) {
            console.log('Ticker not found');
            return;
        }

        //console.log('The price of your', _ticker, 'is', tickers[_ticker]);
        let _balance = await binance.futuresBalance();
        let _leveragedBalance;
        _balance.some(function(item) {
            if(item.asset === _stable) {
                console.log(item);
                _leveragedBalance = item.balance * _leverage;
                return true;
            }
        });

        let _price = await binance.futuresQuote( _ticker );
        console.log(_price);

        console.log('Leveraged Balance: ', _leveragedBalance, '\n' + _ticker + ' price: ', _price.bidPrice);
        //let _amount = 
        //console.log('100% of your leveraged balance will be invested in', _ticker, 'at a price of', _price);
        //console.info( await binance.futuresAccount() );
        //binance.futuresMiniTickerStream( 'BTCUSDT', console.log );
        await binance.futuresLeverage( _ticker, _leverage );
        await binance.futuresMarginType( _ticker, 'CROSSED' )
        let _order = (_leveragedBalance * _percent / _price.bidPrice).toFixed(0);
        console.log('Trying to buy:', _order, 'of', _ticker);
        await binance.futuresMarketSell( _ticker, _order );
    })();
});
