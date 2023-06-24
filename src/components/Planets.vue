<template>
    <div>
      <h1>Planets</h1>
      <ul>
        <li v-for="planet in planets" :key="planet.name">
          {{ planet.name }}
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
        planets: []
      };
    },
    mounted(){
      this.fetchPlanets();
    },
    methods: {
      fetchPlanets() {
        axios.get('https://swapi.dev/api/planets/')
          .then(response => {
            this.planets = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
      },
      loadNextPage(){
        if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.planets = response.data.results;
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
            this.planets = response.data.results;
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
  