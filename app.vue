<script setup>

</script>

<template>
  <main
    class="flex items-center justify-center bg-blue-900">

  <div class="container relative bg-white py-28 px-32 overflow-hidden rounded-xl  ">
    <h1>
  Clima tempo
    </h1>

    <font-awesome-icon icon="fa-solid fa-location-dot"/>
    <!--<font-awesome-icon :icon="['fas', 'location-dot']" />-->
    
    <div class="search-box bg-blue">
      
    </div>
  </div>
  </main>
</template>

<style lang="postcss" scoped>
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
}
</style>