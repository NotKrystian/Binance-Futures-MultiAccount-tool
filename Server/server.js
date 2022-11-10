const Binance = require('node-binance-api');
require('dotenv').config();
let config = require('./config.json');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.get('/pairs', async function (req, res) {
    const binance = new Binance().options({
        APIKEY: config.credentials[0].API_KEY,
        APISECRET: config.credentials[0].API_SECRET,
    });

    let _pairs = [];
    let _api = await binance.futuresExchangeInfo();

    _api.symbols.some((x)=> {
        if(x.contractType == 'PERPETUAL')
            _pairs.push(x.pair);
    });

    res.send(_pairs);
});

app.get('/buy', function (req, res) {
    console.log(req.query);

    let _stable = req.query.stable;
    let _ticker = req.query.symbol;
    let _leverage = req.query.leverage;
    let _percent = req.query.amount;
    let _type = req.query.type;

    console.log(_stable, _ticker, _leverage, _percent, _type);

    for(let i=0; i<config.credentials.length; i++) {
       setTimeout(async function() {
            const binance = new Binance().options({
                APIKEY: config.credentials[i].API_KEY,
                APISECRET: config.credentials[i].API_SECRET,
            });
        
            await binance.useServerTime();
            let tickers = await binance.futuresPrices();

            if(tickers[_ticker] === undefined) {
                console.log('Ticker not found');
                return;
            }

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
            //console.log(_price);

            console.log('Leveraged Balance: ', _leveragedBalance, '\n' + _ticker + ' price: ', _price.bidPrice);

            await binance.futuresLeverage( _ticker, _leverage );
            await binance.futuresMarginType( _ticker, 'CROSSED' )
            
            
            let _exchangeInfo = await binance.futuresExchangeInfo();
            let _tickerStepSize = _exchangeInfo.symbols.find(x => x.symbol === _ticker).filters.find(x => x.filterType === 'LOT_SIZE').stepSize;
            let _order = await binance.roundStep((_leveragedBalance * _percent / _price.bidPrice), _tickerStepSize)

            console.log('Order: ', _order);
            if(_type == 'LONG') {
                console.log(await binance.futuresMarketBuy( _ticker, _order ));
            } else {
                console.log(await binance.futuresMarketSell( _ticker, _order ));
            }
    }, i*1000);
}
res.status(200).send({status: 0, message: "Executed the buy orders"});
})

app.get('/close', function (req, res) {
    let _limitprice = 0;
    let _percent = req.query.percent;

    if(req.query.limit)
        _limitprice = req.query.limit;

    config.credentials.some(function(item, i) {
        const binance = new Binance().options({
            APIKEY: item.API_KEY,
            APISECRET: item.API_SECRET,
        });
    
        (async () => {
            await binance.useServerTime();
            _tickers = await binance.futuresPositionRisk();
            for (i = 0; i < _tickers.length; i++) {
                let _posAmt = _tickers[i].positionAmt;
                //console.log(_tickers[i].symbol, _tickers[i].positionAmt);
                if(_posAmt != 0) {
                    console.log(_tickers[i]);
                    let _order = (Math.abs(_posAmt)*_percent).toFixed(0)

                    if(_posAmt<0){
                        if(_limitprice === undefined){
                            console.log(await binance.futuresMarketBuy( _tickers[i].symbol, _order));
                        } else {
                            console.info( await binance.futuresSell(_tickers[i].symbol,  _order, _limitprice ) );
                        }
                    } else {
                        await binance.futuresMarketSell( _tickers[i].symbol, _order );
                    }
                }
            };
            res.send('Closed all positions.');
        })();
        
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })