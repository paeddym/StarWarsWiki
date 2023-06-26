<template>
  <div id="search">
    <h1>The Star Wars WIKI</h1>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Search">
      <div class="status" v-if="isLoading">
        Fetching API data...
      </div>
      <div v-else-if="showResults">
        <div>
          <ul>
            <li v-for="result in filteredResults" :key="result.name">
              <h3 @click="toggleDetails(result)">{{ result.name }}</h3>
              <div v-if="result.showDetails">
                <p>Type: {{ result.type }}</p>

                <template v-if="result.type === 'People'">
                  <p>Birth Year: {{ result.birth_year }}</p>
                  <p>Height: {{ result.height }}</p>
                  <p>Mass: {{ result.mass }}</p>
                  <p>Eye Color: {{ result.eye_color }}</p>
                  <p>Hair Color: {{ result.hair_color }}</p>
                  <p>Homeworld: {{ result.homeworldName }}</p>
                  <p>Skin Color: {{ result.skin_color }}</p>
                  <p>Species: {{ result.speciesName }}</p>
                  <p>Gender: {{ result.gender }}</p>
                </template>

                <template v-if="result.type === 'Starships'">
                  <p>mlgt: {{ result.mlgt }}</p>
                  <p>cargo_capacity: {{ result.cargo_capacity }}</p>
                  <p>cost_in_credits: {{ result.cost_in_credits }}</p>
                  <p>crew: {{ result.crew }}</p>
                  <p>passengers: {{ result.passengers }}</p>
                  <p>hyperdrive_rating: {{ result.hyperdrive_rating }}</p>
                  <p>length: {{ result.length }}</p>
                  <p>manufacturer: {{ result.manufacturer }}</p>
                  <p>max_atmosphering_speed: {{ result.max_atmosphering_speed }}</p>
                  <p>model: {{ result.model }}</p>
                  <p>starship_class: {{ result.starship_class }}</p>
                  <p>consumables: {{ result.consumables }}</p>
                </template>

                <template v-if="result.type === 'Vehicles'">
                  <p>cargo_capacity: {{ result.cargo_capacity }}</p>
                  <p>consumables: {{ result.consumables }}</p>
                  <p>cost_in_credits: {{ result.cost_in_credits }}</p>
                  <p>crew: {{ result.crew }}</p>
                  <p>passengers: {{ result.passengers }}</p>
                  <p>length: {{ result.length }}</p>
                  <p>manufacturer: {{ result.manufacturer }}</p>
                  <p>max_atmosphering_speed: {{ result.max_atmosphering_speed }}</p>
                  <p>model: {{ result.model }}</p>
                  <p>vehicle_class: {{ result.vehicle_class }}</p>
                </template>

                <template v-if="result.type === 'Planets'">
                  <p>climate: {{ result.climate }}</p>
                  <p>gravity: {{ result.gravity }}</p>
                  <p>diameter: {{ result.diameter }}</p>
                  <p>orbital_period: {{ result.orbital_period }}</p>
                  <p>population: {{ result.population }}</p>
                  <p>rotation_period: {{ result.rotation_period }}</p>
                  <p>surface_water: {{ result.surface_water }}</p>
                  <p>terrain: {{ result.terrain }}</p>
                  <p>residents: {{ result.residents }}</p>    <!--wie species laden-->
                </template>

                <template v-if="result.type === 'Species'">
                  <p>Homeworld: {{ result.homeworldName }}</p>
                  <p>average_height: {{ result.average_height }}</p>
                  <p>average_lifespan: {{ result.average_lifespan }}</p>
                  <p>classification: {{ result.classification }}</p>
                  <p>designation: {{ result.designation }}</p>
                  <p>eye_colors: {{ result.eye_colors }}</p>
                  <p>hair_colors: {{ result.hair_colors }}</p>
                  <p>language: {{ result.language }}</p>
                  <p>skin_colors: {{ result.skin_colors }}</p>
                  <p>people: {{ result.peopleName }}</p>          <!--wie species laden-->
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p class="status" v-else>Ready to search!</p>
    </div>
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
                type: type,
                showDetails: false,
                //People
                height: (type === 'People') ? result.height : null,
                mass: (type === 'People') ? result.mass : null,
                birth_year: (type === 'People') ? result.birth_year : null,
                eye_color: (type === 'People') ? result.eye_color : null,
                gender: (type === 'People') ? result.gender : null,
                hair_color: (type === 'People') ? result.hair_color : null,
                homeworld: (type === 'People' || type === 'Species') ? result.homeworld : null,
                skin_color: (type === 'People') ? result.skin_color : null,
                species: (type === 'People') ? result.species : null,
                homeworldName: null,
                speciesName: [],

                //Starships
                mglt: (type === 'Starships') ? result.mglt : null,
                hyperdrive_rating: (type === 'Starships') ? result.hyperdrive_rating : null,
                starship_class: (type === 'Starships') ? result.starship_class : null,
                
                //Vehicles
                vehicle_class: (type === 'Vehicles') ? result.vehicle_class : null,
 
                //Starships & Vehicles
                cargo_capacity: (type === 'Starships' || type === 'Vehicles') ? result.cargo_capacity : null,
                consumables: (type === 'Starships' || type === 'Vehicles') ? result.consumables : null,
                crew: (type === 'Starships' || type === 'Vehicles') ? result.crew : null,
                length: (type === 'Starships' || type === 'Vehicles') ? result.length : null,
                manufacturer: (type === 'Starships' || type === 'Vehicles') ? result.manufacturer : null,
                max_atmosphering_speed: (type === 'Starships' || type === 'Vehicles') ? result.max_atmosphering_speed : null,
                model: (type === 'Starships' || type === 'Vehicles') ? result.model : null,
                passengers: (type === 'Starships' || type === 'Vehicles') ? result.passengers : null,                 //laden
                cost_in_credits: (type === 'Starships' || type === 'Vehicles') ? result.cost_in_credits : null,
                

                //Planets
                climate: (type === 'Planets') ? result.climate : null,
                diameter: (type === 'Planets') ? result.diameter : null,
                gravity: (type === 'Planets') ? result.gravity : null,
                orbital_period: (type === 'Planets') ? result.orbital_period : null,
                population: (type === 'Planets') ? result.population : null,
                residents: (type === 'Planets') ? result.residents : null,              //wie species laden
                rotation_period: (type === 'Planets') ? result.rotation_period : null,
                surface_water: (type === 'Planets') ? result.surface_water : null,
                terrain: (type === 'Planets') ? result.terrain : null,

                //Species
                average_height: (type === 'Species') ? result.average_height : null,
                average_lifespan: (type === 'Species') ? result.average_lifespan : null,
                classification: (type === 'Species') ? result.classification : null,
                designation: (type === 'Species') ? result.designation : null,
                eye_colors: (type === 'Species') ? result.eye_colors : null,
                hair_colors: (type === 'Species') ? result.hair_colors : null,
                language: (type === 'Species') ? result.language : null,
                skin_colors: (type === 'Species') ? result.skin_colors : null,
                people: (type === 'Species' ) ? result.people : null,                     //wie species laden
                PeopleName: null,
              };
            });

          this.results = this.results.concat(results);

          if (response.data.next) {
            return this.searchResource(response.data.next, type);
          }
        })
        .then(() => {
          this.loadSpeciesNames();
          this.loadHomeworldNames();
          this.loadPeopleNames();
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadSpeciesNames() {
      const speciesUrls = this.results
        .filter(result => result.type === 'People' && result.species)
        .flatMap(result => result.species);

      const promises = speciesUrls.map(url => this.getResourceName(url));

      Promise.all(promises)
        .then(speciesNames => {
          this.results.forEach(result => {
            if (result.species) {
              result.speciesName = result.species.map(url => {
                const speciesIndex = speciesUrls.indexOf(url);
                return speciesNames[speciesIndex];
              });
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadHomeworldNames() {
      const homeworldUrls = this.results
        .filter(result => (result.type === 'People' || result.type === 'Species') && result.homeworld)
        .map(result => result.homeworld);

      const promises = homeworldUrls.map(url => this.getResourceName(url));

      Promise.all(promises)
        .then(homeworldNames => {
          this.results.forEach(result => {
            if (result.homeworld) {
              const homeworldIndex = homeworldUrls.indexOf(result.homeworld);
              result.homeworldName = homeworldNames[homeworldIndex];
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    },

    loadPeopleNames() {
    const peopleUrls = this.results
      .filter(result => result.type === 'Species' && result.people)
      .flatMap(result => result.people);

    const promises = peopleUrls.map(url => this.getResourceName(url));

    Promise.all(promises)
      .then(peopleNames => {
        this.results.forEach(result => {
          if (result.people) {
            result.peopleName = result.people.map(url => {
              const peopleIndex = peopleUrls.indexOf(url);
              return peopleNames[peopleIndex];
            });
          }
        });
    })
    .catch(error => {
      console.error(error);
    });
},


    getResourceName(url) {
      return axios.get(url)
        .then(response => response.data.name)
        .catch(error => {
          console.error(error);
          return '';
        });
    },
    uniqueResults() {
      const uniqueMap = new Map();
      this.results.forEach(result => {
        uniqueMap.set(result.name, result);
      });
      return Array.from(uniqueMap.values());
    },
    toggleDetails(result) {
      // Close details for all other results
      this.results.forEach(res => {
        if (res !== result) {
          res.showDetails = false;
        }
      });

      result.showDetails = !result.showDetails;
    },
  }
};
</script>


<style scoped>

h1 {
  font-size: 5.8em;
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
.status {                   /* Text innendrinnen nicht Selektierbar? */
  position: relative;
  text-align: center;
  font-size: 1em;
}

::placeholder {
  font-size: 1em;
  color: white;
}

input {
  position: relative;
  left: 50%;
  top: 35%;
  width: 60%;
  height: 10%;
  transform: translate(-50%, -50%);
  padding: 1em;
  margin-top: 5em;
  color: white;
  background-color: #4f4f4f;
  border-color: #3f3f3f;
  border-width: 2px;
}

input:focus {
  outline-style: solid;
  outline-color: yellow;
  outline-width: 2px;
}

</style>