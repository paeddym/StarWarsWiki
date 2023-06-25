<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/People">People</RouterLink>
        <RouterLink to="/Planets">Planets</RouterLink>
        <RouterLink to="/Vehicles">Vehicles</RouterLink>
        <RouterLink to="/Starships">Starships</RouterLink>
        <RouterLink to="/Species">Species</RouterLink>
        <RouterLink to="/">Search</RouterLink>
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
