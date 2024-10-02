<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue'

interface Breadcrumb {
  label: string;
  path: string;
}

const route = useRoute();

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter((path) => path);
  const breadcrumbs: Breadcrumb[] = [];

  paths.forEach((path, index) => {
    const breadcrumb: Breadcrumb = {
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: '/' + paths.slice(0, index + 1).join('/'),
    };
    breadcrumbs.push(breadcrumb);
  })

  return breadcrumbs;
})
</script>

<template>
  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
    <ol class="breadcrumb m-0">
      <li v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item"
          :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <router-link v-if="index !== breadcrumbs.length - 1" :to="breadcrumb.path">
          {{ breadcrumb.label }}
        </router-link>
        <span v-else>{{ breadcrumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>

</style>