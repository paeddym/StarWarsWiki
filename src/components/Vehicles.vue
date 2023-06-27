<template>
  <div class="listOfEntries">
    <h1>Vehicles</h1>
    <ul>
      <li v-for="vehicle in vehicles" :key="vehicle.name">
        {{ vehicle.name }}
      </li>
    </ul>
    <div class="pageTurner">
      <button @click="loadPreviousVehicles" :disabled="isLoading">&#11164;</button>
      <p>{{ currentPage }}</p>
      <button @click="loadMoreVehicles" :disabled="isLoading">&#11166;</button>
    </div>
    <div class="status" v-if="isLoading">Fetching API data...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      vehicles: [],
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchVehicles();
  },
  methods: {
    fetchVehicles() {
      this.isLoading = true;
      axios.get('https://swapi.dev/api/vehicles/')
        .then(response => {
          this.vehicles = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    loadMoreVehicles() {
      if (this.nextPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.nextPage)
          .then(response => {
            this.vehicles = response.data.results;
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
    loadPreviousVehicles() {
      if (this.previousPage && !this.isLoading) {
        this.isLoading = true;
        axios.get(this.previousPage)
          .then(response => {
            this.vehicles = response.data.results;
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