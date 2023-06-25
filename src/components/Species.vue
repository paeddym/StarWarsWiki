<template>
  <div class="listOfEntries">
    <h1>Species</h1>
    <ul>
      <li v-for="species in speciesList" :key="species.name">
        {{ species.name }}
      </li>
    </ul>
    <button @click="loadPreviousSpecies">Previous Page</button>
    <p id="pageCount" >Page: {{ currentPage }}</p>
    <button @click="loadMoreSpecies">Next Page</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      speciesList: [],
      nextPage: null,
      previousPage: null,
      currentPage: 1
    };
  },
  mounted() {
    this.fetchSpecies();
  },
  methods: {
    fetchSpecies() {
      axios.get('https://swapi.dev/api/species/')
        .then(response => {
          this.speciesList = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadMoreSpecies() {
      if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.speciesList = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage ++;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    loadPreviousSpecies() {
      if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.speciesList = response.data.results;
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