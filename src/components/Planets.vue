<template>
  <div class="listOfEntries">
    <h1>Planets</h1>
    <ul>
      <li v-for="planet in planets" :key="planet.name">
        {{ planet.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousPlanets" :disabled="isLoading">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMorePlanets" :disabled="isLoading">&#11166;</button>
    </div>
    <div class="status" v-if="isLoading">Fetching API data...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      planets: [],
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchPlanets();
  },
  methods: {
    fetchPlanets() {
      this.isLoading = true;
      axios.get('https://swapi.dev/api/planets/')
        .then(response => {
          this.planets = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    loadMorePlanets() {
      if (this.nextPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.nextPage)
          .then(response => {
            this.planets = response.data.results;
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
    loadPreviousPlanets() {
      if (this.previousPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.previousPage)
          .then(response => {
            this.planets = response.data.results;
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