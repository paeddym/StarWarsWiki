<template>
  <div class="listOfEntries">
    <h1>Spaceships</h1>
    <ul>
      <li v-for="starship in starships" :key="starship.name">
        {{ starship.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousStarships">Previous Page</button>
      <p id="pageCount" >{{ currentPage }}</p>
      <button @click="loadMoreStarships">Next Page</button>
    </div>
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
      currentPage: 1
    };
  },
  mounted() {
    this.fetchStarships();
  },
  methods: {
    fetchStarships() {
      axios.get('https://swapi.dev/api/starships/')
        .then(response => {
          this.starships = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadMoreStarships() {
      if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.starships = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
            this.currentPage ++;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    loadPreviousStarships() {
      if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.starships = response.data.results;
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