<script setup lang="ts">
import {useSettingStore} from "@/stores/setting";
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import LanguageSwitcher from '@/components/language-switcher.vue'
import Cart from '@/components/cart.vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { usePaymentStore } from '@/stores/payment'
import { useI18n } from 'vue-i18n'
const paymentStore = usePaymentStore()
const {invoices} = storeToRefs(paymentStore)

const settings = useSettingStore()
const { user } = storeToRefs(settings)
const userStore = useAuthStore()
const { locale, availableLocales } = useI18n();
const route = useRoute();

function isActive(path: string): boolean
{
  const isPathActive = route.path.startsWith(path);
  if (path === '/' && isPathActive && route.path !== '/') {
    return false;
  }
  return isPathActive;
}

onMounted(()=>{
  settings.getToken()
  paymentStore.getInvoice(locale.value)
})


const languages = computed(()=>availableLocales.filter(lang=>lang !== locale.value))

function switcherLanguage(lang: string): void
{
  localStorage.setItem('language', lang)
  locale.value = lang
}

</script>

<template>
  <div id="masthead" class="header prt-header-style-01">
    <div id="site-header-menu" class="site-header-menu">
      <div class="site-header-menu-inner prt-stickable-header">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="site-navigation d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center justify-content-start">
                  <div class="site-branding me-auto">
                    <h1>
                      <a class="home-link" href="/" title="Raccer" rel="home">
                        <img id="logo-img" class="img-fluid auto_size" src="/assets/images/logo_itog2.png" alt="logo-img">
                      </a>
                    </h1>
                  </div>
                  <div class="btn-show-menu-mobile menubar menubar--squeeze">
                    <span class="menubar-box">
                      <span class="menubar-inner"></span>
                    </span>
                  </div>

                  <nav class="main-menu menu-mobile" id="menu">
                    <ul class="menu slide-menu">
                      <li class="mega-menu-item megamenu-fw" :class="{ 'active': isActive('/') }">
                        <RouterLink
                          class="mega-menu-link"
                          to="/"
                        >
                          {{ $t('home') }}
                        </RouterLink>
                      </li>
                      <li class="mega-menu-item megamenu-fw" :class="{ 'active': isActive('/events') || isActive('/event/')}">
                        <RouterLink class="mega-menu-link" to="/events">{{ $t('events') }}</RouterLink>
                      </li>
                      <li class="mega-menu-item">
                        <RouterLink to="/about-us" class="mega-menu-link">{{ $t('about_us') }}</RouterLink>
                      </li>

                      <li class="mega-menu-item mobile-responsive">
                        <a href="#" class="mega-menu-link">{{ locale }}</a>
                        <ul class="mega-submenu">
                          <li v-for="(lang, index) in languages"
                              :key="index"
                              @click="switcherLanguage(lang)"
                          >
                            <a href="#">{{ lang }}</a>

                          </li>
                        </ul>
                      </li>

                      <li class="mega-menu-item ps-1 pb-1 mobile-responsive">
                        <template v-if="!user">
                          <div>
                            <a class="login" type="button" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="fa-regular fa-user"></i>
                            </a>
                          </div>
                        </template>
                        <template v-else>
                          <a href="#" class="user-login d-flex align-items-center justify-content-center mega-menu-link">
                            <span class="login">{{ settings.getInitials(user?.name ?? 'No Name') }}</span>
                          </a>
                          <ul class="mega-submenu w-100">
                            <li> {{ user?.email }} <hr class="mb-1"> </li>
                            <li v-if="invoices?.invoices?.length > 0">
                              <a href="/invoices" class="mega-menu-link">{{ $t('invoices') }}</a>
                            </li>
                            <li>
                              <a href="#" @click="userStore.logout()">{{ $t('logout') }}</a>
                            </li>
                          </ul>
                        </template>
                      </li>
                    </ul>
                  </nav><!-- menu end -->
                </div>
                <div class="cart-fixed ">
                  <Cart />
                </div>
                <div class="d-flex align-items-center justify-content-end">
                  <!-- header_extra -->
                  <div class="header_extra d-flex flex-row align-items-center justify-content-end">
                    <Cart />
                    <LanguageSwitcher />
                    <template v-if="!user">
                      <a class="login" type="button" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-regular fa-user"></i>
                      </a>
                    </template>
                    <template v-else>
                      <nav class="main-menu menu-mobile p-0">
                        <ul class="menu slide-menu m-0">
                          <li class="mega-menu-item">
                            <a href="#" class="user-login d-flex align-items-center justify-content-center mega-menu-link">
                              <span class="login">{{ settings.getInitials(user?.name ?? 'No Name') }}</span>
                            </a>

                            <ul class="mega-submenu">
                              <li>
                                {{ user?.email }}
                                <hr class="mb-1">
                              </li>
                              <li v-if="invoices?.invoices?.length > 0">
                                <a href="/invoices" class="mega-menu-link">{{ $t('invoices') }}</a>
                              </li>
                              <li>
                                <a href="#" @click="userStore.logout()">{{ $t('logout') }}</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- site-header-menu end-->


  </div>
</template>

<style scoped>

</style>