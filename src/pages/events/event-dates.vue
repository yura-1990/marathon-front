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
      :style="`background: url(http://api.roadrunning.uz/storage/${event.image});
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
                  <h2 class="">
                    {{ event.name }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-main">
      <template v-for="(date, dateIndex) in event.event_has_marathons" :key="dateIndex">
        <div class="py-3">
          <div class="container">
            <h3> {{ settings.formatDate(date.date_event) }} </h3>

            <template v-if="date?.marathons.length >= 1">
              <swiper
                :modules="[Navigation]"
                :slides-per-view="3"
                :navigation="true"
                :space-between="50"
                :loop="true"
              >
                <SwiperSlide v-for="(marathon, marathonIndex) in date?.marathons" :key="marathonIndex">
                  <div>
                    <div class="d-flex align-items-center justify-content-between py-2">
                      <div class="d-flex gap-3 align-items-center">
                        <h6>{{ marathon?.datetime_from }} - {{ marathon?.datetime_to }}</h6>
                        <h6>{{ marathon?.gender?.type }}</h6>
                      </div>
                      <RouterLink :to="`/participate/${marathon.id}`" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor">
                        {{ $t('participate') }}
                      </RouterLink>
                    </div>
                    <div :id="`carouselExampleControls-${marathon.id}`" class="carousel slide marathon-block" data-bs-ride="carousel">

                      <RouterLink :to="`/marathon/${marathon?.id}`" class="carousel-inner rounded overflow-hidden " >
                        <div v-for="(image, imageIndex) in marathon.image "
                             class="carousel-item marathon-content"
                             :class="{'active': imageIndex === 0}"
                             :key="imageIndex"
                        >
                          <img
                            class="img-fluid "
                            :src="`http://api.roadrunning.uz/storage/${image}`"
                            alt="image"
                          />

                        </div>
                        <div class="carousel-caption d-none d-md-block">
                          <h4 class="text-white ">{{ marathon.name }}</h4>
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

                    <!-- featured-imagebox end-->
                  </div>
                </SwiperSlide>
              </swiper>
            </template>

            <template v-else>
                  <h5>upcoming marathons</h5>
            </template>

          </div>
        </div>
      </template>


      <section class="prt-row services-section_2 bg-base-dark clearfix py-4">
        <div class="container">
          <h3>Marathon types</h3>
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
                      <h3><a href="service-details.html">{{ type?.name }}</a></h3>
                    </div>
                    <div class="marquee-item style1">
                      <div class="marquee-block overflow-hidden">
                        <div class="marquee">
                          <div class="marquee-content">
                            <div class="marquee-text">
                              <h3><a href="service-details.html">{{ type?.name }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">Amount {{ type?.amount }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">From {{ type?.number_order_from }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">To {{ type?.number_order_to }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">{{ type?.name }}</a></h3>
                            </div>
                          </div>
                          <div class="marquee-content">
                            <div class="marquee-text">
                              <h3><a href="service-details.html">{{ type?.name }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">Amount {{ type?.amount }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">From {{ type?.number_order_from }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">To {{ type?.number_order_to }}</a></h3>
                            </div>
                            <div class="marquee-text">
                              <h3><a href="service-details.html">{{ type?.name }}</a></h3>
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

      <section class="prt-row routes-section clearfix">
        <div class="winner-flag-2">
          <img src="/assets/images/flag-3.webp" alt="" />
        </div>
        <div class="container position-relative">
          <div class="row">
            <div class="col-lg-6">
              <div class="prt_single_image-wrapper">
                <img
                  class="img-fluid"
                  src="/assets/images/single-img-10-826x600.webp"
                  alt="image"
                />
              </div>
            </div>
            <div class="col-lg-6 align-self-center pl-40 res-991-pl-15">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(42.9621px)">RACCER</div>
              </div>
              <div class="route-location-wrapper mt_70">
                <div class="section-title">
                  <div class="title-header">
                    <h3>TM racing</h3>
                    <h2 class="title text-base-white">#Routes</h2>
                  </div>
                  <div class="title-desc">
                    <p>
                      Optimize Your Race by Racing Performance Services for Enhanced Speed and
                      Precision on the Track
                    </p>
                  </div>
                </div>
              </div>
              <ul class="prt-list prt-list-style-icon style1 prt-list-icon-color-skincolor">
                <li>
                  <i class="fa fa-check-circle"></i>
                  <span class="prt-list-li-content">Maximizing Power for Peak Performance</span>
                </li>
                <li>
                  <i class="fa fa-check-circle"></i>
                  <span class="prt-list-li-content">Streamlining for the Faster Lap Times</span>
                </li>
                <li>
                  <i class="fa fa-check-circle"></i>
                  <span class="prt-list-li-content"
                    >Ensuring Grip Stability through Every Turn
                  </span>
                </li>
                <li>
                  <i class="fa fa-check-circle"></i>
                  <span class="prt-list-li-content"
                    >Enhancing Skills for Victory on the Track
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="row pt-110 res-991-pt-60">
            <div class="col-lg-6">
              <div class="section-title">
                <div class="title-header text-lg-end pl-155 res-991-pl-0">
                  <h2 class="title">press and media</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-6 pt-15">
              <div class="title-desc">
                <p class="pr-215 res-1199-pr-0">
                  Stay informed with Press and Media updates, and become part of our vibrant Racing
                  Community Group. Join us now
                </p>
                <a
                  class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor res-991-mt-20 z-index-2"
                  href="service-details.html"
                  >Join our group</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="prt-row gallery-section clearfix">
        <div class="container-fluid pl-65 pr-65 res-991-pr-15 res-991-pl-15">
          <div class="row">
            <div class="prt_single_image-wrapper">
              <img
                class="img-fluid border-rad_0"
                src="/assets/images/single-img-11-1778x62.webp"
                alt=""
              />
            </div>
          </div>
          <div class="grid-wrapper">
            <div class="grid-item grid-item-1">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-1-399x535.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-1-399x535.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-2">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-2-662x328.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-2-662x328.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-3">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-1-399x535.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-1-399x535.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-4">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-1-399x535.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-1-399x535.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-5">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-1-399x535.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-1-399x535.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-6">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-2-662x328.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-2-662x328.webp"
                  alt="image"
              /></a>
            </div>
            <div class="grid-item grid-item-7">
              <a
                class="prt_prettyphoto"
                href="/assets/images/gallery/gallery-1-399x535.webp"
                rel="prettyPhoto[coregallery]"
                data-rel="prettyPhoto"
              >
                <img
                  class="img-fluid"
                  src="/assets/images/gallery/gallery-1-399x535.webp"
                  alt="image"
              /></a>
            </div>
          </div>
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