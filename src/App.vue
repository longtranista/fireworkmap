<template>
  <div id="app">
    <!-- <img class="logo" src="./assets/logo.png"> -->
    <mapview></mapview>
  </div>
</template>

<script>
import Mapview from './components/Map'

export default {
  components: {
    Mapview
  }
}
</script>

<style>
html {
  height: 100%;
}


html,body, #app{
  position: relative;
  height: 100%;
  padding: 0;
  margin: 0;
}

</style>
