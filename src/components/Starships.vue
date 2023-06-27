<template>
  <div class="listOfEntries">
    <h1>Starships</h1>
    <ul>
      <li v-for="starship in starships" :key="starship.name">
        {{ starship.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousStarships" :disabled="isLoading">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMoreStarships" :disabled="isLoading">&#11166;</button>
    </div>
    <div class="status" v-if="isLoading">Fetching API data...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      starships: [],
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchStarships();
  },
  methods: {
    fetchStarships() {
      this.isLoading = true;
      axios.get('https://swapi.dev/api/starships/')
        .then(response => {
          this.starships = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    loadMoreStarships() {
      if (this.nextPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.nextPage)
          .then(response => {
            this.starships = response.data.results;
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
    loadPreviousStarships() {
      if (this.previousPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.previousPage)
          .then(response => {
            this.starships = response.data.results;
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