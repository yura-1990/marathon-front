<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/modal.vue'
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div class="page" :class="{'sticky-column': isActive('/') || isActive('/carts')}">
    <Header />

    <RouterView />

    <Footer />

    <Modal />
  </div>
</template>

<style scoped></style>