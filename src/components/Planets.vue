<template>
  <div class="listOfEntries">
    <h1>Planets</h1>
    <ul>
      <li v-for="planet in planets" :key="planet.name">
        {{ planet.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousPlanets">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMorePlanets">&#11166;</button>
    </div>
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
      currentPage: 1
    };
  },
  mounted() {
    this.fetchPlanets();
  },
  methods: {
    fetchPlanets() {
      axios.get('https://swapi.dev/api/planets/')
        .then(response => {
          this.planets = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadMorePlanets() {
      if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.planets = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage ++;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    loadPreviousPlanets() {
      if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.planets = response.data.results;
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
  