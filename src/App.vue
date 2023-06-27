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
        <RouterLink to="/">Search &#x1F50E;&#xFE0E;</RouterLink> <!-- Hätte eigentlich eine dropdown Suchleiste sein sollen,
                                                                      implemetierung ist aber nicht gelungen, daher ist Suche
                                                                      als Button zum Home geblieben -->
      </nav>
    </div>
  </header>

  <body>
    <RouterView />
  </body>
</template>