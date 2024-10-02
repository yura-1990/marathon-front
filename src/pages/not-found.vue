<script setup lang="ts">

</script>

<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <a href="/">Go Back Home</a>
    </div>
  </div>
</template>

<style scoped>
.not-found{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  color: white;
}

.container {
  text-align: center;
}
h1 {
  font-size: 10rem;
  animation: pulse 1s infinite;
}
h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: #61dafb;
  font-size: 1.5rem;
  animation: blink 1.5s infinite;
}
a:hover {
  color: #21a1f1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    color: #ff5252;
  }
  50% {
    transform: scale(1.1);
    color: #ff1744;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>