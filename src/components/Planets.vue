<template>
    <div>
      <h1>Planets</h1>
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
      <button @click="fetchPlanets">Load Planets</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        characters: []
      };
    },
    methods: {
      fetchPlanets() {
        axios.get('https://swapi.dev/api/planets/')
          .then(response => {
            this.characters = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  