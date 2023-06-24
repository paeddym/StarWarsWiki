<template>
    <div>
      <h1>Species</h1>
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
      this.fetchSpecies();
    },
    methods: {
      fetchSpecies() {
        axios.get('https://swapi.dev/api/species/')
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
  