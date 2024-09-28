<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/admin/Sidebar.vue'
import Header from '@/components/admin/Header.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'


</script>

<template>
  <div class="vh-100 overflow-hidden ">
    <div class="position-relative">
      <Header />
    </div>

    <div class="h-100 d-flex ">
      <div class="position-relative">
        <Sidebar />
      </div>

      <div class="custom-content overflow-auto">
        <Breadcrumb />

        <div class="mt-2 w-100">
          <RouterView />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-content{
  background: rgba(0, 0, 0, 0.25);
  padding: 10px;
  flex-grow: 1;
}
</style>