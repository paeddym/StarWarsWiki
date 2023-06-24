<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Search from './components/Search.vue';
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Back to Homepage</RouterLink>
        <RouterLink to="/People">People</RouterLink>
        <RouterLink to="/Planets">Planets</RouterLink>
        <RouterLink to="/Vehicles">Vehicles</RouterLink>
        <RouterLink to="/Starships">Starships</RouterLink>
        <RouterLink to="/Species">Species</RouterLink>
      </nav>
    </div>
  </header>
  <body>
  <RouterView />
  </body>
</template>

<style scoped>
header {
  width: 100%;
  background-color: gray;
  position: absolute;
}
body {
  width: 100%;
}
nav {
  background-color: yellow;
}
nav * {
  margin: 1em;
  color: black;
}
</style>
