<script setup lang="ts">
import {useSettingStore} from "@/stores/setting";
import { storeToRefs } from 'pinia'
import {onMounted} from "vue";
import LanguageSwitcher from '@/components/language-switcher.vue'

const settings = useSettingStore()
const { token } = storeToRefs(settings)

onMounted(()=>{
  settings.getToken()
})

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
                      <li class="mega-menu-item megamenu-fw active">
                        <a class="mega-menu-link" href="/">{{ $t('home') }}</a>
                      </li>
                      <li class="mega-menu-item">
                        <a href="#" class="mega-menu-link">{{ $t('pages') }}</a>
                        <ul class="mega-submenu">
                          <li><a href="/about-us">{{ $t('about_us') }}</a></li>
                          <li><a href="/services">{{ $t('service') }}</a></li>
                          <li><a href="/pricing">{{ $t('pricing') }}</a></li>
                          <li><a href="/contact-us">{{ $t('contact_us') }}</a></li>
                          <li><a href="/team-details">{{ $t('team_details') }}</a></li>
                        </ul>
                      </li>
                      <li class="mega-menu-item">
                        <a href="/services" class="mega-menu-link">{{ $t('services') }}</a>
                        <ul class="mega-submenu">
                          <li><a href="/services">{{ $t('service') }}</a></li>
                          <li><a href="/service-details">{{ $t('service_details') }}</a></li>
                        </ul>
                      </li>
                      <li class="mega-menu-item">
                        <a href="/blog" class="mega-menu-link">{{ $t('blog') }}</a>
                        <ul class="mega-submenu">
                          <li><a href="/blog">{{ $t('blog') }}</a></li>
                          <li><a href="/blog-single">{{ $t('blog_single') }}</a></li>
                        </ul>
                      </li>
                      <li class="mega-menu-item">
                        <a href="/contact-us" class="mega-menu-link">{{ $t('contact_us') }}</a>
                      </li>
                    </ul>
                  </nav><!-- menu end -->
                </div>
                <div class="d-flex align-items-center justify-content-end">
                  <!-- header_extra -->
                  <div class="header_extra d-flex flex-row align-items-center justify-content-end">
                    <LanguageSwitcher />
                    <a v-if="!!token" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-darkcolor" href="/dashboard">{{ $t('dashboard') }}</a>
                    <a v-else class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-darkcolor" href="/login">{{ $t('login') }}</a>

                  </div><!-- header_extra end -->
                </div>
              </div><!-- site-navigation end-->
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