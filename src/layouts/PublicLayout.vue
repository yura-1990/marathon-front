<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/modal.vue'
import { useSettingStore } from '@/stores/setting'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Timer from '@/components/timer.vue'
const route = useRoute();
const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)

onMounted(()=>{
  settingStore.getCarts()
})

const isActive = (path: string) => {
  return route.path === path;
};

watch(()=>carts.value.length, ()=>{
  settingStore.getCarts()
})
</script>

<template>
  <div class="page" :class="{'sticky-column': isActive('/') || isActive('/carts') || isActive('/payment')}">

    <Header />

    <RouterView />

    <Footer />

    <Modal />
  </div>
</template>

<style scoped></style>