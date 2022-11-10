const Binance = require('node-binance-api');
let config = require('./config.json');

const binance = new Binance().options({
    APIKEY: 'JHHGrp57802fdfko8Xzaeb0AafcAgv49deMxuHbng4sCafZejWzAum96iqLSTqmE',
    APISECRET: 'Xlx21v8balnDV9Mz41S0XSECe3XZntIstoT1bHR5FIEomymXgbs8lS2DxEhgOMwf',
});

 /*
binance.balance((error, balances) => {
    if ( error ) return console.error(error);
    console.log(Object.keys(balances).length)
    for (const [key, value] of Object.entries(balances)) {
        if(value.available > 0)
        console.log(`${key}: ${value.available}`);
      }
  });*/

binance.trades('BNBUSDT', (error, trades, symbol) => {
    console.info(symbol+" trade history", trades);
    console.error(error);
});