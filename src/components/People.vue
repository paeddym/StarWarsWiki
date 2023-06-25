<template>
    <div class="listOfEntries">
      <h1>People</h1>
      <ul>
        <li v-for="character in people" :key="character.name">
          {{ character.name }}
        </li>
      </ul>
      <div class="pageTurner">
        <button @click="loadPreviousPeople">Previous Page</button>
        <p id="pageCount" >Page: {{ currentPage }}</p>
        <button @click="loadMorePeople">Next Page</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        people: [],
        nextPage: null,
        previousPage: null,
        currentPage: 1
      };
    },
    mounted(){
      this.fetchPeople();
    },
    methods: {
      fetchPeople() {
        axios.get('https://swapi.dev/api/people/')
          .then(response => {
            this.people = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
          })
          .catch(error => {
            console.error(error);
          });
      },
      loadMorePeople(){
        if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.people = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage ++;
          })
          .catch(error => {
            console.error(error);
          });
        }
      },
      loadPreviousPeople(){
        if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.people = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage --;
          })
          .catch(error => {
            console.error(error);
          });
        }
      }
    }
  };
  </script>

  <style scoped>

</style>
