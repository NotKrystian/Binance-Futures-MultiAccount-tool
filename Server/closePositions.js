const Binance = require('node-binance-api');
let config = require('./config.json');

_ticker = process.argv[2];
//_percent = process.argv[3];
_percent = 1;
//_limitprice = process.argv[4];

for(let ii=0; ii<config.credentials.length; ii++) {
    setTimeout(async function() {
    const binance = new Binance().options({
        APIKEY: config.credentials[ii].API_KEY,
        APISECRET: config.credentials[ii].API_SECRET,
    });

    await binance.useServerTime();
    _tickers = await binance.futuresPositionRisk();
    for (i = 0; i < _tickers.length; i++) {
        let _posAmt = _tickers[i].positionAmt;
        //console.log(_tickers[i].symbol, _tickers[i].positionAmt);
        if(_posAmt != 0) {
            console.log('Closing postion for ' + _tickers[i].symbol, 'on', config.credentials[ii].LABEL);
            //console.log(_tickers[i]);
            if(_posAmt<0){
                let _exchangeInfo = await binance.futuresExchangeInfo();
                let _tickerStepSize = _exchangeInfo.symbols.find(x => x.symbol === _tickers[i].symbol).filters.find(x => x.filterType === 'LOT_SIZE').stepSize;
                let _order = await binance.roundStep((Math.abs(_posAmt)*_percent), _tickerStepSize)


                console.log(await binance.futuresMarketBuy( _tickers[i].symbol, _order));
            } else {
                console.log(await binance.futuresMarketSell( _tickers[i].symbol, _posAmt ));
            }
        }
    };

    console.log('\n------------------------------------\n');
    }, ii*1000);
}