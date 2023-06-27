<template>
  <div class="listOfEntries">
    <h1>Species</h1>
    <ul>
      <li v-for="species in speciesList" :key="species.name">
        {{ species.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousSpecies" :disabled="isLoading">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMoreSpecies" :disabled="isLoading">&#11166;</button>
    </div>
    <div class="categoryStatus" v-if="isLoading">Fetching API data...</div>
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
      currentPage: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchSpecies();
  },
  methods: {
    fetchSpecies() {
      this.isLoading = true;
      axios.get('https://swapi.dev/api/species/')
        .then(response => {
          this.speciesList = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    loadMoreSpecies() {
      if (this.nextPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.nextPage)
          .then(response => {
            this.speciesList = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage++;
            this.isLoading = false;
          })
          .catch(error => {
            console.error(error);
            this.isLoading = false;
          });
      }
    },
    loadPreviousSpecies() {
      if (this.previousPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.previousPage)
          .then(response => {
            this.speciesList = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage--;
            this.isLoading = false;
          })
          .catch(error => {
            console.error(error);
            this.isLoading = false;
          });
      }
    }
  }
};
</script>