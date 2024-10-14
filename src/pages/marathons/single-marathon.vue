<script setup lang="ts">
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {useSettingStore} from "@/stores/setting";
import { RouterLink } from 'vue-router'

const singleMarathon = useMarathonStore()
const { marathon } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const route = useRoute()
const {locale} = useI18n()


onMounted(async ()=>{
  await singleMarathon.getSingleMarathon(route.params.id, locale.value)
})


watch(()=>locale.value, async (language)=>{
  await singleMarathon.getSingleMarathon(route.params.id, language)
})
</script>

<template>
<div>
  <div class="prt-page-title-row blog-single style2" :style="`
<<<<<<< HEAD
      background-image: url(https://api.roadrunning.uz/storage/${marathon?.image});
=======
      background-image: url(https://api.roadrunning.uz/storage/${marathon?.marathon?.image});
>>>>>>> 99061ac833f4c4534dac7254294f9111679c74d6
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
    `">
    <div class="prt-page-title-row-inner ">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="prt-page-title-row-heading">
              <div class="prt-page-title-link d-flex align-items-center">
                <RouterLink :to="`/participate/${marathon?.marathon.id}`" v-if="marathon?.marathon?.event_has_marathon?.status" class="prt-btn border-0 prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor me-3">
                  {{ $t('participate') }}
                </RouterLink>

                <div class="post-category d-flex flex-wrap align-items-center">
                  <span>
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                  </span>
                  <div>
                    <span>
                      {{ settingStore.formatDate(marathon?.marathon?.event_has_marathon?.date_event) }}
                    </span>
                    <span>{{ marathon?.marathon?.datetime_from }} - {{ marathon?.marathon?.datetime_to }}</span>
                  </div>
                </div>
                <div class="post-date">
                  <i class="fa-light fa-user"></i>
                  <span> {{ marathon?.marathon?.participants ? marathon?.marathon.participants.length : 0 }} {{ $t('participants') }}</span>
                </div>
              </div>
              <div class="prt-page-title-details">

              </div>
              <div class="page-title-heading">
                <h2 class="title">{{ marathon?.marathon?.name }}</h2>
                <p class="text-white ">{{ marathon?.marathon?.description }}</p>
                <h4 class="text-white ">{{ marathon?.marathon?.price }} UZS</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="site-main">

    <!-- prt-blog-single -->
<!--    <div class="prt-row blog-details-section clearfix">-->
<!--      <div class="container">-->
<!--        <div class="row align-items-center">-->
<!--          <div class="col-lg-12">-->
<!--            <div class="prt-page-title-row-heading">-->
<!--              <div class="prt-page-title-link d-flex align-items-center">-->
<!--                <RouterLink :to="`/participate/${marathon?.marathon.id}`" v-if="marathon?.marathon?.event_has_marathon?.status" class="prt-btn border-0 prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor me-3">-->
<!--                  {{ $t('participate') }}-->
<!--                </RouterLink>-->

<!--                <div class="post-category d-flex flex-wrap align-items-center">-->
<!--                  <span>-->
<!--                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>-->
<!--                  </span>-->
<!--                  <div>-->
<!--                    <span>-->
<!--                      {{ settingStore.formatDate(marathon?.marathon?.event_has_marathon?.date_event) }}-->
<!--                    </span>-->
<!--                    <span>{{ marathon?.marathon?.datetime_from }} - {{ marathon?.marathon?.datetime_to }}</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="post-date">-->
<!--                  <i class="fa-light fa-user"></i>-->
<!--                  <span> {{ marathon?.marathon?.participants ? marathon?.marathon.participants.length : 0 }} {{ $t('participants') }}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="prt-page-title-details">-->

<!--              </div>-->
<!--              <div class="page-title-heading">-->
<!--                <h2 class="title">{{ marathon?.marathon?.name }}</h2>-->
<!--                <p class="text-white ">{{ marathon?.marathon?.description }}</p>-->
<!--                <h4 class="text-white ">{{ marathon?.marathon?.price }} UZS</h4>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- prt-blog-single end-->

  </div>
</div>
</template>

<style scoped>

</style>