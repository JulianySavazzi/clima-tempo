<script setup>

const runtime = useRuntimeConfig()
const local = ref()

async function searchLocal(){
  await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local.value}&units=metric&appid=${runtime.public.API_KEY}`)
  .then(response => {
    console.log("RESPONSE ", response)
    console.log("City ", response.name)
    console.log("cod ", response.cod)
  })
  .catch(error => {
    if(!error.status){
      throw new Error('Erro na requisição')
    } else{
      if(error.status === 404){
        throw new Error('City Not Found')
      }
    }
  })

}
</script>

<template>
  <main class="">
    <div class="container">
      <!--pesquisar cidade-->
      <div class="search-box">
        <font-awesome-icon icon="fa-solid fa-location-dot" class="icon"/>
        <input type="text" v-model="local" placeholder="insira o local" class=""/>
        <div id="search-local"
          @click="searchLocal"
          class="button-container">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="button"/>
        </div>
      </div>
      <!--cidade nao encontrada-->
      <div class="not-found">
        <img src="/images/404.png" alt="imagem de local não encontrado">
        <p>Ooops! O local não foi encontrado....</p>
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
*{
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
}
main{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #06283d;
}
.container{
  position: relative;
  width: 400px;
  height: 105px;
  background: #fff;
  padding: 28px 32px;
  overflow: hidden;
  border-radius: 18px;
  font-family: 'Roboto', sans-serif;
  transition: 0.6s ease-out;
}
.search-box{
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-box input{
  color: #06283D;
  width: 80%;
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 32px;
}
.search-box input::placeholder{
  font-size: 20px;
  font-weight: 500;
  color: #06283D;
  text-transform: capitalize;
}
.button-container{
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: #dff6ff;
  border-radius: 50%;
  transition: 0.4s ease;
}
.button-container:hover{
  background: #06283D;
}
.button{
  color: #06283D;
  font-size: 22px;
  padding: 25%;
}
.button:hover{
  color: #fff;
}
.icon{
  position: absolute;
  color: #06283D;
  font-size: 28px;
}
.not-found{

}
</style>
