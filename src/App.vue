<script setup lang="ts">
import { RouterView } from 'vue-router'
import Timer from '@/components/timer.vue'
import { onMounted, watch } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)

onMounted(()=>{
  settingStore.getCarts()
})

watch(()=>carts.value.length, ()=>{
  settingStore.getCarts()
})

</script>

<template>
  <template v-if="carts.length > 0">
    <div class="prt-blog-single-content custom">
      <div class="entry-content">
        <blockquote class="position-relative overflow-hidden shadow m-0" >
          <Timer :cart="carts[0]" />
        </blockquote>
      </div>
    </div>
  </template>
  <RouterView />
</template>

<style scoped>
.custom{
  position: fixed;
  top: 25px;
  right: 25px;
  width: 220px;
  height: 10px;
  z-index: 99999;
}

.custom blockquote{
  min-height: 100% !important;
  padding: 10px 0 10px 0!important;
}

</style>
