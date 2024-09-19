<script setup lang="ts">
import {RouterView} from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div class="page sticky-column">
    <Header />

    <RouterView />

    <Footer />
  </div>
</template>

<style scoped>

</style>