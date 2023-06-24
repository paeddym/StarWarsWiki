<template>
    <div class="star-wars-theme">
      <h1 class="title">Willkommen zur Star Wars Homepage</h1>
      <div class="content">
        <p class="intro">Möge die Macht mit dir sein!</p>
        <img class="logo" src="./assets/star-wars-logo.png" alt="Star Wars Logo">
        <router-link class="button" to="/People">Discover People</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Komponentenoptionen
  };
  </script>
  
  <style scoped>
  .star-wars-theme {
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  .title {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .intro {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .logo {
    width: 200px;
    height: auto;
    margin-bottom: 2rem;
  }
  
  .button {
    padding: 1rem 2rem;
    background-color: #ffe81f;
    color: black;
    font-size: 1.2rem;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #ffd700;
  }
  </style>