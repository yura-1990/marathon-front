<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/admin/Sidebar.vue'
import Header from '@/components/admin/Header.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'


</script>

<template>
  <div class="vh-100 overflow-hidden admin">
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

.admin{
  background-image: url("/assets/images/sport-bg.jpg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
}

.custom-content{
  padding: 10px;
  flex-grow: 1;
  position: relative;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(-2px);
}

</style>