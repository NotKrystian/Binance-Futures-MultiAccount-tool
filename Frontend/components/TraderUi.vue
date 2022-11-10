<!-- Please remove this file from your project -->
<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
<div>
    <div class="flex flex-col lg:flex-row">
        <div class="flex-grow space-y-6">

        
                <label for="location" class="block text-sm font-medium text-gray-700">Symbol ({{this.symbol}})</label>
                <select v-model="symbol" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option v-for="item in this.symbols" :key="item.symbol" >{{item}}</option>
                </select>

        </div>


    </div>
    <div class="mt-3 flex flex-col lg:flex-row">
        <label class="block text-sm font-medium text-gray-700">Margin (<span style="font-semibold">{{this.margin}}%</span>)</label>
    </div>
    <div class="mt-3 flex flex-col lg:flex-row">
        <input type="range" class="mt-1 block w-full pl-3 pr-10 py-2 appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none form-range" id="customRange1" min="0" max="100" v-model="margin"/>
    </div>
     <div class="mt-3 grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-6">
            <label for="first-name" class="block text-sm font-medium text-gray-700">Leverage</label>
            <input type="number" v-model="leverage" autocomplete="given-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
        </div>

        <div class="col-span-12 sm:col-span-6">
            <label for="last-name" class="block text-sm font-medium text-gray-700">Stablecoin</label>
            <input type="text" v-model="stablecoin" autocomplete="family-name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" value="USDT">
        </div>

        </div>
        <div class="mt-3 grid grid-cols-12 gap-2">
        <div class="col-span-12 sm:col-span-6">
            <input type="button" v-on:click="say('LONG')" class="mt-1 block w-full text-white font-semibold bg-red-500 hover:bg-red-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" value="Buy/Long">
        </div>

        <div class="col-span-12 sm:col-span-6">
            <input type="button" v-on:click="say('SHORT')" class="mt-1 block w-full text-white font-semibold bg-green-500 hover:bg-green-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" value="Short/Sell">
        </div>

        </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'TraderUi',
  data() {
    return {
        symbol: 'BTCUSDT',
        symbols: [],
        margin: 0,
        stablecoin: 'USDT',
        leverage: 10,

    }
  },
  methods: {
    say: function (_type) {
      axios.get('http://localhost:8081/buy', { params: { symbol: this.symbol, leverage: this.leverage, stable: this.stablecoin, type: _type, amount: (this.margin/100) } })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo')
      .then(response => {
        response.data.symbols.forEach(symbol => {
          this.symbols.push(symbol.symbol);
        });
      })
      .catch(error => {
        console.log(error)
      })

  },
}
</script>
