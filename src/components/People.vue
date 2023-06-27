<template>
  <div class="listOfEntries">
    <h1>People</h1>
    <ul>
      <li v-for="character in people" :key="character.name">
        {{ character.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousPeople" :disabled="isLoading">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMorePeople" :disabled="isLoading">&#11166;</button>
    </div>
    <div class="status" v-if="isLoading">Fetching API data...</div>
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
      currentPage: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchPeople();
  },
  methods: {
    fetchPeople() {
      this.isLoading = true;
      axios.get('https://swapi.dev/api/people/')
        .then(response => {
          this.people = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    loadMorePeople() {
      if (this.nextPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.nextPage)
          .then(response => {
            this.people = response.data.results;
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
    loadPreviousPeople() {
      if (this.previousPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.previousPage)
          .then(response => {
            this.people = response.data.results;
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