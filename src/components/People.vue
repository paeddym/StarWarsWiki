<template>
    <div>
      <h1>People</h1>
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
      this.fetchPeople();
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
