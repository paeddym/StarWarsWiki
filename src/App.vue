<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div id="navbar">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/People">People</RouterLink>
        <RouterLink to="/Planets">Planets</RouterLink>
        <RouterLink to="/Vehicles">Vehicles</RouterLink>
        <RouterLink to="/Starships">Starships</RouterLink>
        <RouterLink to="/Species">Species</RouterLink>
        <RouterLink to="/">To Search &#x1F50E;&#xFE0E;</RouterLink>
      </nav>
    </div>
  </header>
  <body>
  <RouterView />
  </body>
</template>