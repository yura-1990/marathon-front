<script setup lang="ts">
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'

const settings = useSettingStore()
const { openSidebar, user } = storeToRefs(settings)
const userStore = useAuthStore()

onMounted(() => {
  settings.getToken()

})
</script>

<template>
  <div
    class="position-sticky d-flex px-2 z-3 justify-content-between align-items-center shadow top-0 bg-dark-custom"
  >
    <div class="d-flex align-items-center gap-3 w-100" >
      <RouterLink
        to="/dashboard"
        class="d-flex gap-4 align-items-center text-white text-decoration-none"
      >
        <img src="/assets/images/logo_itog.png" width="60" alt="logo" />
        <span class="logo-title" v-if="openSidebar">Roadrunning</span>
      </RouterLink>

      <div class="open-close-sidebar "
           :class="{'ms-3': openSidebar}"
           @click="settings.getEvents()"
      >
        <template v-if="openSidebar">
          <i class="fa-regular fa-bars"></i>
        </template>
        <template v-else>
          <i class="fa-regular fa-xmark"></i>
        </template>
      </div>
    </div>

    <div class="d-flex align-items-center gap-4">
      <div class="dropdown custom-dropdown">
        <div class="d-flex align-items-center text-white text-decoration-none dropdown-toggle position-relative"
             id="dropdownUser2"
             data-bs-toggle="dropdown"
             aria-expanded="false"
        >
          <i class="fa-regular fa-bell h5"></i>
          <span class="position-absolute top-0 start-100 translate-middle p-2 bg-info border border-light rounded-circle">
            <span class="visually-hidden">New alerts</span>
          </span>
        </div>

        <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser2"
            style=""
        >
          <li class="">
            <div class="d-flex align-items-center px-3">
              <strong>New events</strong>
            </div>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Upcoming event</a></li>

        </ul>

      </div>

      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >

          <img
            :src="`http://api.roadrunning.uz/storage/${user?.payload?.user?.avatar}`"
            alt=""
            width="32"
            height="32"
            class="rounded-circle ms-2"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
          style=""
        >
          <li class="">
            <div class="d-flex align-items-center px-3">
              <strong>{{ user?.payload?.user?.email }}</strong>
            </div>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><RouterLink class="dropdown-item" to="/profile">Profile</RouterLink></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" @click="userStore.logout()" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.open-close-sidebar {
  font-size: 22px;
  color: white;
}
.custom-dropdown .dropdown-toggle::after{
  display: none;
}

.logo-title{
  position: unset;
  opacity: 1;
  transition: 0.2s ease;
}

.logo-title.active{
  position: absolute;
  opacity: 0;
}

.bg-dark-custom{
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(-2px);
}

</style>