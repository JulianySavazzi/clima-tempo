<script setup>
const runtime = useRuntimeConfig()
const state = reactive({
  hasError: false,
  hasResponse: false,
  local: "",
  response: {}
})

async function searchLocal(){
  state.hasError = false
  state.hasResponse = false
  await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state.local}&units=metric&appid=${runtime.public.API_KEY}`).then(response => {
    state.hasResponse = true
    state.response = {
      name: response.name,
      temperature: response.main.temp,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      wind: response.wind.speed
    }
  })
  .catch(error => {
    if(error.status != 200){
      state.hasError = true
      if(error.status){
        if(error.status === 404){
          throw new Error('City Not Found')
        }
        if(error.status === 401){
          throw new Error('Unauthorized')
        }
        if(error.status === 400){
          throw new Error('Bad request')
        }
      } else {
          throw new Error('Erro na requisição')
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
        <input type="text" v-model="state.local" placeholder="insira o local" class=""/>
        <div id="search-local"
          @click="searchLocal"
          class="button-container">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="button"/>
        </div>
      </div>
      <!--cidade nao encontrada-->
      <div
        v-if="state.hasError && !state.hasResponse"
        class="not-found">
        <img class="py-5" src="/images/404.png" alt="imagem de local não encontrado">
        <p class="pt-10">Ooops! O local não foi encontrado....</p>
      </div>
      <!--previsao do tempo -->
      <div v-if="state.hasResponse ">
        <div class="weather-box">
          <img src="" alt="previsão do tempo"/>
          <p class="temperature">{{ state.response.temperature }}</p>
          <p class="description">{{ state.response.description }}</p>
        </div>
        <div class="weather-details">
          <div class="humidity">
            <font-awesome-icon icon="fa-solid fa-water" class="icon"/>
          </div>
          <div class="text">
            <span>{{ state.response.humidity }}</span>
            <p class="">Humidity</p>
          </div>

          <div class="wind">
            <font-awesome-icon icon="fa-solid fa-wind" class="icon"/>
            <div class="text">
              <span>{{ state.response.wind }}</span>
              <p class="">Wind Speed</p>
            </div>
          </div>
        </div>
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
/*  height: 105px;*/
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
/*.not-found{*/
/*}*/
.weather-box{
  text-align: center;
}

.weather-box img{
  width: 60%;
  margin-top: 30px;
}

.weather-box .temperature{
  position: relative;
  color: #06283D;
  font-size: 4rem;
  font-weight: 800;
  margin-top: 30px;
  margin-left: -16px;
}

.weather-box .temperature span{
  position: absolute;
  margin-left: 4px;
  font-size: 1.5rem;
}

.weather-box .description{
  color: #06283D;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
}

.text{
  padding-left: 34px;
  color: #06283D;
  font-size: 18px;
}
</style>
