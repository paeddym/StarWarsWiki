<template>
    <div>
      <h1>Starships</h1>
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
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
    mounted(){
      this.fetchStarships();
    },
    methods: {
      fetchStarships() {
        axios.get('https://swapi.dev/api/starships/')
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
  