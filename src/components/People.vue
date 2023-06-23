<template>
    <div>
      <h1>Star Wars Charaktere</h1>
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
      <button @click="fetchCharacters">Charaktere aktualisieren</button>
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
      fetchCharacters() {
        axios.get('https://swapi.dev/api/people/')
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