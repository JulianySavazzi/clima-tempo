<script setup>
const runtime = useRuntimeConfig()
const state = reactive({
  hasError: false,
  hasResponse: false,
  errorMessage: "",
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
      min: response.main.temp_min,
      max: response.main.temp_max,
      feels: response.main.feels_like,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      wind: response.wind.speed,
      image: ""
    }
    switch(response.weather[0].main){
      case "Clouds": state.response.image = "/images/cloud.png"
      break
      case "Rain": state.response.image = "/images/rain.png"
      break
      case "Mist": state.response.image = "/images/mist.png"
      break
      case "Clear": state.response.image = "/images/clear.png"
      break
      case "Snow": state.response.image = "/images/snow.png"
      break
    }
  })
  .catch(error => {
    if(error.status != 200){
      state.hasError = true
      if(error.status){
        if(error.status === 404){
          state.errorMessage = 'City Not Found'
          throw new Error(state.errorMessage)
        }
        if(error.status === 401){
          state.errorMessage = 'Unauthorized'
          throw new Error(state.errorMessage)
        }
        if(error.status === 400){
          state.errorMessage = 'Bad request'
          throw new Error(state.errorMessage)
        }
      } else {
        state.errorMessage = 'Erro na requisição'
        throw new Error(state.errorMessage)
      }
    }
  })
}
</script>

<template>
  <main class="grid-cols-1">
    <div class="container w-96 lg:w-1/3 y-2/5">
      <!--pesquisar cidade-->
      <div class="search-box">
        <font-awesome-icon icon="fa-solid fa-location-dot" class="icon"/>
        <input type="text" v-model="state.local" placeholder="insert the local" class="text-left"/>
        <div id="search-local"
          @click="searchLocal"
          class="button-container">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="button"/>
        </div>
      </div>
      <!--cidade nao encontrada-->
      <div
        v-if="state.hasError && !state.hasResponse"
        class="not-found flex grid grid-cols-1 y-2/5 items-center justify-center content-center place-items-center place-content-center">
        <img class="py-5" src="/images/404.png" alt="imagem de local não encontrado">
        <p class="text-base">Ooops! This local {{state.local}} not found....</p>
        <p class="text-xs">{{ state.errorMessage }}</p>
      </div>
      <!--previsao do tempo -->
      <div v-if="state.hasResponse "
        class="flex grid grid-cols-2 y-1/4 items-center justify-center content-center place-items-center place-content-center">
        <!--weather-box-->
        <div class="weather-box space-y-2 place-content-center align-middle">
          <img :src="state.response.image" alt="previsão do tempo" class="h-auto w-full items-center"/>
          <p class="temperature text-4xl items-center px-auto ">{{ state.response.temperature }} Cº</p>
          <p class="description text-xl">{{ state.response.description }}</p>
        </div>
        <!--weather-details-->
        <div class="weather-details space-y-8 place-content-center text-lg align-middle h-auto w-full">
          <div class="flex items-center justify-items-center content-center">
            <font-awesome-icon icon="fa-solid fa-water" class="icon w-auto"/>
            <div class="text">
              <span>{{ state.response.humidity }} %</span>
              <p class="">Humidity</p>
            </div>
          </div>
          <div class="flex items-center justify-items-center content-center">
            <font-awesome-icon icon="fa-solid fa-wind" class="icon w-auto"/>
            <div class="text">
              <span class="">{{ state.response.wind }} km/h</span>
              <p class="">Wind Speed</p>
            </div>
          </div>
          <div class="flex items-center justify-items-center content-center">
            <font-awesome-icon icon="fa-solid fa-temperature-half" class="icon w-auto"/>
            <div class="text">
              <span>Feels {{ state.response.feels }} Cº</span>
              <p class="">Min {{ state.response.min }} Cº</p>
              <p class="">Max {{ state.response.max }} Cº</p>
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
  margin-left: 8px;
  font-size: 28px;
  text-align: center;
  align-items: center;
}

.weather-box .temperature{
/*  position: relative;*/
  color: #06283D;
  font-weight: 800;
  text-align: center;
}

.weather-box .description{
  color: #06283D;
  font-weight: 500;
  text-transform: capitalize;
  text-align: center;
}

.text{
/*  padding-left: 38px;*/
  margin-left: 50px;
  color: #06283D;
}
</style>
