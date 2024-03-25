<script setup>

</script>

<template>
  <main
    class="flex items-center justify-center bg-blue-900">

  <div class="container relative bg-white py-28 px-32 overflow-hidden rounded-xl  ">
    <!--<font-awesome-icon :icon="['fas', 'location-dot']" />-->
    <div class="search-box">
      <font-awesome-icon icon="fa-solid fa-location-dot" class="absolute text-gray-900 text-3xl"/>
      <input type="text" placeholder="insira o local" class="text-gray-900 w-4/5 text-1xl font-medium pl-8"/>
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="cursor-pointer w-12 text-gray-900 text-3xl bg-blue-100 rounded-full"/>
    </div>

  </div>
  </main>
</template>

<style lang="postcss" scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: 0;
}

main{
  height: 100vh;
}

.container{
  width: 400px;
  height: 105px;
  transition: 0.6s ease-out;
}

.search-box{
  width: 100%;
  margin: 5%;
}

.search-box::placeholder{
  font-size: 20px;
  text-transform: capitalize;
}

</style>