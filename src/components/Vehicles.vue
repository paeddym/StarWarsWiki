<template>
  <div>
    <h1>Vehicles</h1>
    <ul>
      <li v-for="vehicle in vehicles" :key="vehicle.name">
        {{ vehicle.name }}
      </li>
    </ul>
    <button @click="loadPreviousVehicles">Previous Page</button>
    <button @click="loadMoreVehicles">Next Page</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      vehicles: [],
      nextPage: null,
      previousPage: null
    };
  },
  mounted() {
    this.fetchVehicles();
  },
  methods: {
    fetchVehicles() {
      axios.get('https://swapi.dev/api/vehicles/')
        .then(response => {
          this.vehicles = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadMoreVehicles() {
      if (this.nextPage) {
        axios.get(this.nextPage)
          .then(response => {
            this.vehicles = response.data.results;
            this.nextPage = response.data.next;
            this.previousPage = response.data.previous;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    loadPreviousVehicles() {
      if (this.previousPage) {
        axios.get(this.previousPage)
          .then(response => {
            this.vehicles = response.data.results;
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