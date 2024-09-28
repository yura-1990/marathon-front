<script setup lang="ts">
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { usePasswordStore } from '@/stores/auth'
const settings = useSettingStore()
const { openSidebar } = storeToRefs(settings)
const userStore = usePasswordStore()



</script>

<template>
  <div class="position-sticky d-flex px-2 z-3 justify-content-between align-items-center top-0 bg-dark">
    <div class="d-flex align-items-center gap-5 w-100">

      <a href="/dashboard" class="d-flex gap-3 align-items-center text-white text-decoration-none">
        <img src="/assets/images/logo_itog.png" width="50" height="60" alt="logo">
        <span class="">Roadrunning</span>
      </a>
      <div class="open-close-sidebar" @click="settings.getEvents()">
        <template v-if="openSidebar">
          <i class="fa-regular fa-bars"></i>
        </template>
        <template v-else>
          <i class="fa-regular fa-xmark"></i>
        </template>
      </div>
    </div>

    <div>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1" style="">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" @click="userStore.logout()" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.open-close-sidebar{
  font-size: 22px;
  color: white;
}
</style>