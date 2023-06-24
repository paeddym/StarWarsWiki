<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">

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

  <RouterView />
</template>

<style scoped>
* {
  background-color: yellow;
  color: black;
}
</style>
