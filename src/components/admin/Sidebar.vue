<script setup lang="ts">
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
const settings = useSettingStore()
const { openSidebar } = storeToRefs(settings)
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

</script>

<template>
  <div class="h-100 bg-suctom shadow p-0 m-0 custom-sidebar position-sticky top-0" :class="{'active': !openSidebar}">
    <div class="w-100 h-100 text-white p-0 m-0">
      <div class="w-100 position-relative p-0 m-0 h-100 overflow-auto">
        <ul class="nav nav-pills flex-column gap-1 p-0 m-0 mb-auto">
          <li class="nav-item custom-nav-item " :class="{ 'active': isActive('/dashboard') }">
            <RouterLink to="/dashboard"
                        class="nav-link d-flex p-0 text-white"
            >
              <div class="custom-sidebar-icon">
                <i class="fa-regular fa-house"></i>
              </div>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li class="nav-item custom-nav-item " :class="{ 'active': isActive('/profile') }">
            <RouterLink to="/profile"
                        class="nav-link d-flex p-0 text-white"
            >
              <div class="custom-sidebar-icon">
                <i class="fa-regular fa-user"></i>
              </div>
              <span>Profile</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-sidebar{
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: .2s linear;
}

.bg-suctom{
  background: rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(-2px);
}

.custom-sidebar.active{
  width: 70px;
  overflow: hidden;
  transition: .2s linear;
  justify-content: start;
  padding: 0 0;
}

.custom-sidebar-icon{
  width: 40px;
  transition: .2s linear;
}

.custom-sidebar.active .custom-sidebar-icon{
  width: 70px;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-nav-item{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
}


.custom-nav-item.active{
  background: rgba(7, 0, 0, 0.89);

}

.custom-sidebar.active .custom-nav-item{
  padding-left: 0;
}

.custom-nav-link{
  display: flex;
  align-items: center;
  justify-content: start;
}

</style>