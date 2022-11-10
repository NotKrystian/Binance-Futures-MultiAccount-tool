<template>
<div>
  <div class="relative bg-sky-600 pb-32 overflow-hidden">
    <!-- Menu open: "bg-sky-900", Menu closed: "bg-transparent" -->
    <nav class="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
          <div class="px-2 flex items-center lg:px-0">
            <div class="flex-shrink-0">
              <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg" alt="Workflow">
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Menu open: "bottom-0", Menu closed: "inset-y-0" -->
    <div aria-hidden="true" class="inset-y-0 absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0">
      <div class="absolute inset-0 flex">
        <div class="h-full w-1/2" style="background-color: #0a527b;"></div>
        <div class="h-full w-1/2" style="background-color: #065d8c;"></div>
      </div>
      <div class="relative flex justify-center">
        <svg class="flex-shrink-0" width="1750" height="308" viewBox="0 0 1750 308" xmlns="http://www.w3.org/2000/svg">
          <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
          <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
          <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
          <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
        </svg>
      </div>
    </div>
    <header class="relative py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-white">
          Trading bot
        </h1>
      </div>
    </header>
  </div>

  <main class="relative -mt-32">
    <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
      <div class="bg-white rounded-lg shadow overflow-hidden">
          <form class="lg:col-span-9" action="#" method="POST">
            <!-- Profile section -->
            <div class="py-6 px-4 sm:p-6 lg:pb-8">
              <TraderUi/>
            </div>
          </form>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
      <div class="bg-white rounded-lg shadow overflow-hidden">
          <form class="lg:col-span-9" action="#" method="POST">
            <!-- Profile section -->
            <div class="py-6 px-4 sm:p-6 lg:pb-8">
              <CloseUi/>
            </div>
          </form>
      </div>
    </div>
  </main>
</div>
      

</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
