<template>
  <div id="search">
    <h1 id="mainHeader">The Star Wars WIKI</h1>
    <input type="text" v-model="searchQuery" placeholder="Search the WIKI">
    <div id="centerLoadingBar" v-if="isLoading">
      Fetching API data...
    </div>
    <ul v-else-if="showResults">
      <li v-for="result in filteredResults" :key="result.name">
        <h3>{{ result.name }}</h3>
        <p>{{ result.type }}</p>
      </li>
    </ul>
    <p v-else></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      results: [],
      isLoading: false
    };
  },
  computed: {
    filteredResults() {
      return this.uniqueResults()
        .filter(result => result.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .slice(0, 5);
    },
    showResults() {
      return this.searchQuery.length > 0 && this.results.length > 0;
    }
  },
  created() {
    this.loadResources();
  },
  watch: {
    searchQuery() {
      this.search();
    }
  },
  methods: {
    loadResources() {
      this.isLoading = true;
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

          const promises = resources.map(resource => this.searchResource(resource.endpoint, resource.type));

          Promise.all(promises)
            .then(() => {
              this.isLoading = false;
            })
            .catch(error => {
              console.error(error);
              this.isLoading = false;
            });
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
    search() {
      // Perform any additional search functionality if needed
    },
    searchResource(endpoint, type) {
      return axios.get(endpoint)
        .then(response => {
          const results = response.data.results
            .map(result => {
              return {
                name: result.name,
                type: type
              };
            });

          this.results = this.results.concat(results);

          if (response.data.next) {
            return this.searchResource(response.data.next, type);
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

<style scoped>

h1 {
  font-size: 13vh;
  padding-top: 0.5em;
}

#search {
  width: 50%;
  margin: auto;
}

ul {
  padding-top: 3em;
}

li {
  position: relative;                     
  text-align: left;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.3em;
}

#centerLoadingBar {                   /* Text innendrinnen nicht Selektierbar? */
  position: relative;
  text-align: center;
  font-size: 1em;
}

::placeholder {
  font-size: 1em;
}

input {
  position: relative;
  left: 50%;
  top: 35%;
  width: 60%;
  height: 10%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  margin-top: 5em;
}

</style>