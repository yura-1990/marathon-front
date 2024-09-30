<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, availableLocales } = useI18n();
const languages = computed(()=>availableLocales.filter(lang=>lang !== locale.value))

function switcherLanguage(lang: string): void
{
  localStorage.setItem('language', lang)
  locale.value = lang
}


</script>

<template>
  <nav class="main-menu menu-mobile">
    <ul class="menu slide-menu">
      <li class="mega-menu-item">
        <a href="#" class="mega-menu-link me-3">{{ locale }}</a>
        <ul class="mega-submenu">
          <li v-for="(lang, index) in languages"
              :key="index"
              @click="switcherLanguage(lang)"
          >
            <a href="#">{{ lang }}</a>

          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>