<template>
    <div>
      <h1>Vehicles</h1>
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
      <button @click="loadPreviousPage">Previous Page</button>
      <button @click="loadNextPage">Next Page</button>
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
      this.fetchVehicles();
    },
    methods: {
      fetchVehicles() {
        axios.get('https://swapi.dev/api/vehicles/')
          .then(response => {
            this.characters = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
      },
      loadNextPage(){
        if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.people = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
          })
          .catch(error => {
            console.error(error);
          });
        }
      },
      loadPreviousPage(){
        if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.people = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
          })
          .catch(error => {
            console.error(error);
          });
        }
      }
    }
  };
  </script>
  