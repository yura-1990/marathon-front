<script setup lang="ts">

import {onMounted} from "vue";
import {useSettingStore} from "@/stores/setting";
import {storeToRefs} from "pinia";

const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)

onMounted(()=>{
  settingStore.getCarts()
})

</script>

<template>
<div>
  <a href="/carts" type="button" class=" cart rounded-pill">
    <i class="fa-regular fa-cart-shopping cart-text"></i>
    <span class="badge p-0 cart-text">{{ carts.length }}</span>
  </a>
</div>

</template>

<style scoped>


</style>