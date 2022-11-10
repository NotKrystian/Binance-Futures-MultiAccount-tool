<template>
<div>
    <div class="flex flex-col lg:flex-row">
        <label class="block text-sm font-medium text-gray-700">Position (<span style="font-semibold">{{this.position}}%</span>)</label>
    </div>
    <div class="flex flex-col lg:flex-row">
        <input type="range" class="mt-1 block w-full pl-3 pr-10 py-2 appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none form-range" id="customRange1" min="0" max="100" v-model="position"/>
    </div>
        <div class="mt-6 col-span-12 sm:col-span-6">
            <input type="button" v-on:click="close" class="mt-1 block w-full text-white font-semibold bg-gray-800 hover:bg-gray-900 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" value="Close all">
        </div>

        </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'CloseUi',
  data() {
    return {
        position: 100,

    }
  },
  methods: {
    close: function (_type) {
      axios.get('http://localhost:8081/close', { params: { percent: (this.position/100) } })
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
