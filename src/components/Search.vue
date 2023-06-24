<template>
    <div>
      <h1>Suche</h1>
      <input type="text" v-model="searchQuery" placeholder="Search">
      <ul>
        <li v-for="result in filteredResults" :key="result.name">
          <h3>{{ result.name }}</h3>
          <p>{{ result.type }}</p>
        </li>
      </ul>
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
    mounted() {
      this.search();
    },
    methods: {
      search() {
        axios.get('https://swapi.dev/api/')
          .then(response => {
            const resources = Object.keys(response.data)
              .filter(key => key !== 'films') // Filtern der nicht unterstützten Ressourcentypen
              .map(key => {
                return {
                  type: key.charAt(0).toUpperCase() + key.slice(1), // Den Anfangsbuchstaben groß schreiben
                  endpoint: response.data[key]
                };
              });
  
            this.results = []; // Ergebnisarray zurücksetzen
  
            resources.forEach(resource => {
              this.searchResource(resource.endpoint, resource.type);
            });
          })
          .catch(error => {
            console.error(error);
          });
      },
      searchResource(endpoint, type) {
        axios.get(endpoint)
          .then(response => {
            const results = response.data.results
              .filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase())) // Ergebnisse filtern
              .map(result => {
                return {
                  name: result.name,
                  type: type
                };
              });
            this.results = this.results.concat(results);
  
            // Falls weitere Ergebnisse vorhanden sind, rekursiv weitere Seiten abrufen
            if (response.data.next) {
              this.searchResource(response.data.next, type);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    computed: {
      filteredResults() {
        return this.results.filter(result => {
          return result.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    }
  };
  </script>