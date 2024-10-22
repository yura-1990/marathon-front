<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useEventStore } from '@/stores/events'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useSettingStore } from '@/stores/setting'
import { useMarathonStore } from '@/stores/marathons'
import { useI18n } from 'vue-i18n'
const eventStore = useEventStore()
const { event } = storeToRefs(eventStore)
const marathon = useMarathonStore()
const { marathonTypes } = storeToRefs(marathon)
const route = useRoute()
const settings = useSettingStore()
const hoveredIndex = ref<number|null>(null);
const { locale } = useI18n();
import { RouterLink } from 'vue-router'

const elementStyle = ref({
  backgroundColor: '',
  color: 'black',
  transition: 'background-color 0.3s ease, color 0.3s ease',
});

onMounted(async () => {
  await eventStore.getOneEvent(route.params.id, locale.value)
  await marathon.getMarathonTypes(locale.value)
})

const onMouseOver = (color: string, index: number) => {
  elementStyle.value.backgroundColor = color;
  hoveredIndex.value = index
};

const onMouseLeave = () => {
  elementStyle.value.backgroundColor = '';
  hoveredIndex.value = null
};

watch(()=>locale.value, async (language)=>{
  await eventStore.getOneEvent(route.params.id, language)
  await marathon.getMarathonTypes(language)
})

</script>

<template>
  <div>

    <div
      class="prt-page-title-row style1"
      :style="`background: url(https://api.roadrunning.uz/storage/${event.image});
               background-size: cover;
               background-position: center center;
               background-attachment: fixed;
               background-repeat: no-repeat;`"
    >
      <div class="prt-page-title-row-inner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="prt-page-title-row-heading">
                <div class="section-title">
                  <h2 class="text-white mb-3">
                    {{ event?.name }}
                  </h2>
                  <p class="text-white float-start me-2"><i v-if="event?.address" class="fa-solid fa-location-dot"></i></p>
                  <p class="text-white">{{ event?.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-main">
      <template v-for="date in event.event_has_marathons" :key="date.id">
        <div class="py-3">
          <div class="container">
            <h3> {{ settings.formatDate(date.date_event) }} </h3>

            <template v-if="date?.marathons.length >= 1">
              <swiper
                :modules="[Navigation]"
                :slides-per-view="3"
                :navigation="true"
                :space-between="50"
                :loop="false"
              >
                <SwiperSlide v-for="(marathon, marathonIndex) in date?.marathons" :key="marathonIndex">
                  <div>
                    <div class="d-flex align-items-start justify-content-between py-2">
                      <div class="d-flex flex-column justify-content-center align-items-start ">
                        <h6>{{ marathon?.datetime_from }} - {{ marathon?.datetime_to }}</h6>
                      </div>
                      <template v-if="date?.status && marathon.participants.length <= Number(marathon.marathon_type.amount) ">
                        <RouterLink :to="`/participate/${marathon.id}`" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor">
                          {{ $t('participate') }}
                        </RouterLink>
                      </template>
                    </div>
                    <div :id="`carouselExampleControls-${marathon.id}`" class="carousel slide marathon-block" data-bs-ride="carousel">

                      <RouterLink :to="`/marathon/${marathon?.id}`" class="carousel-inner rounded overflow-hidden h-100 w-100" >
                        <div v-for="(image, imageIndex) in marathon.image "
                             class="carousel-item marathon-content "
                             :class="{'active': imageIndex === 0}"
                             :key="imageIndex"
                        >
                          <div class="featured-thumbnail">
                            <img width="480" height="330" class="img-fluid" :src="`https://api.roadrunning.uz/storage/${image}`" alt="">
                          </div>
                        </div>
                        <div class="carousel-caption d-none d-md-block">
                          <h4 class="text-white ">{{ marathon.name }}</h4>
                          <h6>{{ marathon?.gender?.type }}</h6>
                          <h6 class="text-white ">{{ marathon.price }} UZS</h6>
                        </div>
                      </RouterLink>
                      <template v-if="marathon?.image?.length > 1">
                        <div  class="marathon-controller" >
                          <button class="carousel-control-prev" type="button" :data-bs-target="`#carouselExampleControls-${marathon.id}`" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button class="carousel-control-next" type="button" :data-bs-target="`#carouselExampleControls-${marathon.id}`" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                      </template>
                    </div>
                    <div class="featured-imagebox featured-imagebox-services style2">

                    </div>

                  </div>
                </SwiperSlide>
              </swiper>
            </template>

            <template v-else>
                  <h5>{{ $t('upcoming_marathons') }}</h5>
            </template>

          </div>
        </div>
      </template>


      <section class="prt-row services-section_2 bg-base-dark clearfix py-4">
        <div class="container">
          <h3>{{ $t('marathon_types') }}</h3>
          <template v-for="(type, typeIndex) in marathonTypes.data" :key="typeIndex">
            <div class="row">
              <div class="col-lg-12 position-relative">
                <div class="services-item style1"
                     :style="{ backgroundColor: hoveredIndex === typeIndex ? type.color : '' }"
                     @mouseover="onMouseOver(type.color, typeIndex)"
                     @mouseleave="onMouseLeave"
                >
                  <div class="featured-content" >
                    <div class="featured-title">
                      <h3><a href="#">{{ type?.name }}</a></h3>
                    </div>
                    <div class="marquee-item style1">
                      <div class="marquee-block overflow-hidden">
                        <div class="marquee">
                          <div class="marquee-content">
                            <div class="marquee-text">
                              <h3><a href="#">{{ type?.name }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">Amount {{ type?.amount }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">From {{ type?.number_order_from }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">To {{ type?.number_order_to }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">{{ type?.name }}</a></h3>
                            </div>
                          </div>
                          <div class="marquee-content">
                            <div class="marquee-text">
                              <h3><a href="#">{{ type?.name }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">Amount {{ type?.amount }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">From {{ type?.number_order_from }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">To {{ type?.number_order_to }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="#">{{ type?.name }}</a></h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="featured-iconbox">
                      <img src="/assets/images/running.webp" width="50" alt="">
                    </div>
                  </div>
                  <div class="featured-thumbnail">
                    <img
                      width="480"
                      height="330"
                      class="img-fluid"
                      src="/assets/images/services/services-5-276x294.webp"
                      alt="service-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>

.marathon-content{
  position: relative;
  width: 100%;
  height: 100%;
}

.marathon-content::before{
  content: '';
  position: absolute;
  background: rgba(0, 0, 0, 0.54);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.marathon-controller{
  opacity: 0 !important;
  transition: 0.5s linear all;
}

.marathon-block:hover .marathon-controller{
  opacity: 1 !important;
}

.slide{
    height: 100%;
}

</style>