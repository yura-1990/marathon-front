<script setup lang="ts">
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {useSettingStore} from "@/stores/setting";
import { RouterLink } from 'vue-router'

const singleMarathon = useMarathonStore()
const { singleMarathons } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const route = useRoute()
const {locale} = useI18n()


onMounted(async ()=>{
  await singleMarathon.getMarathon(route.params.id, locale.value)
})


watch(()=>locale.value, async (language)=>{
  await singleMarathon.getMarathon(route.params.id, language)
})
</script>

<template>
<div>
  <div class="prt-page-title-row blog-single style2" :style="`
      background-image: url(https://api.roadrunning.uz/storage/${singleMarathons?.image});
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
                <RouterLink :to="`/participate/${singleMarathons.id}`"
                            v-if="singleMarathons?.event_has_marathon?.status"
                            class="prt-btn border-0 prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor me-3"
                >
                  {{ $t('participate') }}
                </RouterLink>

                <div class="post-category d-flex flex-wrap align-items-center">
                  <span>
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                  </span>
                  <div>
                    <span>
                      {{ settingStore.formatDate(singleMarathons?.event_has_marathon?.date_event) }}
                    </span>
                    <span>
                      {{ singleMarathons?.datetime_from }}
                      <template v-if="singleMarathons?.datetime_to">
                        - {{ singleMarathons?.datetime_to }}
                      </template>
                    </span>
                  </div>
                </div>
                <div class="post-date">
                  <i class="fa-light fa-user"></i>
                  <span> {{ singleMarathons.participants_count }} {{ $t('participants') }}</span>
                </div>
              </div>
              <div class="prt-page-title-details">
              </div>
              <div class="page-title-heading">
                <h2 class="title">{{ singleMarathons?.name }}</h2>
                <p class="text-white " v-html="singleMarathons.description"></p>
                <h4 class="text-white ">{{ singleMarathons?.price }} UZS</h4>
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