<template>
    <div>
      <h1>People</h1>
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
      <button @click="fetchPeople">Load People</button>
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
      fetchPeople() {
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
