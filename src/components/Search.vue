<template>
  <div class="listOfEntries">
    <h1>Suche</h1>
    <input type="text" v-model="searchQuery" placeholder="Search">
    <ul v-if="showResults">
      <li v-for="result in filteredResults" :key="result.name">
        <h3>{{ result.name }}</h3>
        <p>{{ result.type }}</p>
      </li>
    </ul>
    <p v-else>Noch keine Ergebnisse vorhanden.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      results: []
    };
  },
  computed: {
    filteredResults() {
      return this.uniqueResults()
        .filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .slice(0, 5);
    },
    showResults() {
      return this.searchQuery.length > 0 && this.filteredResults.length > 0;
    }
  },
  watch: {
    searchQuery() {
      this.search();
    }
  },
  methods: {
    search() {
      if (this.searchQuery.length === 1) {
        axios.get('https://swapi.dev/api/')
          .then(response => {
            const resources = Object.keys(response.data)
              .filter(key => key !== 'films')
              .map(key => {
                return {
                  type: key.charAt(0).toUpperCase() + key.slice(1),
                  endpoint: response.data[key]
                };
              });

            this.results = [];

            resources.forEach(resource => {
              this.searchResource(resource.endpoint, resource.type);
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    searchResource(endpoint, type) {
      axios.get(endpoint)
        .then(response => {
          const results = response.data.results
            .filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            .map(result => {
              return {
                name: result.name,
                type: type
              };
            });

          this.results = this.results.concat(results);

          if (response.data.next) {
            this.searchResource(response.data.next, type);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    uniqueResults() {
      const uniqueMap = new Map();
      this.results.forEach(result => {
        uniqueMap.set(result.name, result);
      });
      return Array.from(uniqueMap.values());
    }
  }
};
</script>