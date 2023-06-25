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

nav {
  background-color: yellow;
  text-align: center;
}
nav * {
  margin: 5em;
  color: black;
}

</style>
