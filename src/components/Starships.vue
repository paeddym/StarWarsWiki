<template>
  <div>
    <h1>Spaceships</h1>
    <ul>
      <li v-for="starship in starships" :key="starship.name">
        {{ starship.name }}
      </li>
    </ul>
    <button @click="loadPreviousStarships">Previous Page</button>
    <button @click="loadMoreStarships">Next Page</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      starships: [],
      nextPage: null,
      previousPage: null
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
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>