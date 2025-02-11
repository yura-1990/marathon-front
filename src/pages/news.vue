<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useNewsStore} from "@/stores/news.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {RouterLink, useRoute} from "vue-router";
import {Swiper, SwiperSlide} from "swiper/vue";
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import {useSettingStore} from "@/stores/setting";

const { locale } = useI18n();
const route = useRoute()

const newsStore = useNewsStore()
const { oneNews } = storeToRefs(newsStore)
const settingStore = useSettingStore()

const swiperOptions = ref({
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

onMounted(async ()=>{
  await newsStore.getOneNews(locale.value, +route.params.id)
})

watch(()=>locale.value, async (language)=>{
  await newsStore.getOneNews(language, +route.params.id)
})

</script>

<template>
  <div class="site-main ">
    <div class="pt-5">
    </div>
    <div class="prt-row blog-details-section clearfix">
    <div class="container">
      <!-- row -->
      <div class="row">
        <div class="col-lg-8">
          <swiper v-bind="swiperOptions" :modules="[Autoplay]" >
            <swiper-slide v-for="(image, imageIndex) in oneNews?.images" :key="imageIndex">
              <div class="featured-thumbnail rounded overflow-hidden shadow-sm">
                <img class="img-fluid" :src="`https://api.roadrunning.uz/storage/${image}`" loading="lazy" alt="image">
              </div>
            </swiper-slide>
          </swiper>
          <div class="prt-blog-single-content">
            <div class="post-category">
              <i class="ti ti-alarm-clock" aria-hidden="true"></i>  
              <span>{{ settingStore.formatDate(oneNews?.created_at) }}</span>
            </div>
            <div class="entry-content">
              <div class="blog-single-title">
                <h2>{{ oneNews.title }}</h2>
              </div>
              <div class="row pt-30">
                <div class="text-white" v-html="oneNews.description"></div>
              </div>


            </div>
          </div>
        </div>
        <div class="col-lg-4 prt-sticky-column">
          <div class="p-0">
            <div class="featured-icon-box icon-align-top-content style6">
              <div class="featured-icon">
                <div class="prt-icon prt-icon_element-color-skincolor prt-icon_element-size-md">
                  <i class="flaticon-champion"></i>
                </div>
              </div>
              <div class="featured-content">
                <div class="featured-title">
                  <h3>{{ oneNews?.marathon?.name }}</h3>
                </div>
                <div class="featured-desc">
                  <p>{{ oneNews?.marathon?.description }}</p>
                </div>
              </div>
              <RouterLink :to="`/participate/${oneNews?.marathon.id}`" v-if="oneNews?.marathon?.status"
                 class="prt-btn prt-btn-size-lg prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20"
              >
                {{ $t('participate') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div><!-- row end -->
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>