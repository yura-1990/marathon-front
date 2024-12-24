<script setup lang="ts">
import { useEventStore } from '@/stores/events'
import { useMarathonStore } from '@/stores/marathons'
import { computed, onMounted, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'
import { RouterLink } from 'vue-router'

const eventStore = useEventStore()
const marathon = useMarathonStore()
const { events } = storeToRefs(eventStore)
const { locale } = useI18n();
const settingStore = useSettingStore()
const data = computed(()=>events.value?.data?.filter((el:any)=>el?.status))

onMounted(async () => {
  await eventStore.getEvents(locale.value)
  await marathon.getMarathons(locale.value)
})

function groupedDatesByMonth(arr: Array<any>): Array<any>
{
  return arr.reduce((acc:any, event:any) => {
    const date = new Date(event.date_event);
    const month = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(event);
    return acc;
  }, {});

}

watch(()=>locale.value, async (language)=>{
  await eventStore.getEvents(language)
  await marathon.getMarathons(language)
})

</script>

<template>
  <div>
    <template v-if="data?.length > 0">
      <swiper
        :modules="[Navigation]"
        :slides-per-view="1"
        :navigation="true"
        :space-between="50"
        :loop="true"
      >
        <template v-for="(event, index) in events.data" :key="index">
          <swiper-slide v-if="event.status" >
            <div
              class="slide custom-slide"
              :style="`background-image: url(https://api.roadrunning.uz/storage/${event.image}); `"
            >

              <div class="slide__content container text-base-white main-display mx-auto slide_style1">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="slide__content--headings d-block">
                      <div data-animation="fadeInLeft" class="fade-main"></div>
                      <div data-animation="fadeInLeft" class="fade-in-main bg-base-white"></div>
                      <div
                        class="w-100 pt-140 pb-40 res-1199-pb-80 res-1199-pt-80 res-991-pt-100 "
                      >
                        <div class="position-relative">
                          <img
                            class="img-fluid"
                            src="/assets/images/slider/slide-img-1-409x89.webp"
                            alt="image"
                          />
                          <div data-animation="fadeInDown" class="first-letter ">
                            {{ event.name }}
                          </div>
                        </div>
                        <div class="">
                          <div data-animation="fadeInDown" class="second-letter">
                            {{ event.address }}
                          </div>
                          <ul class="list-unstyled d-flex flex-wrap gap-3">
                            <template v-for="(dates, month, index) in groupedDatesByMonth(event.event_has_marathons)" :key="index">
                              <li>
                              <span class="prt-btn-color-whitecolor fw-bold">
                                {{ month }}
                              </span>
                                <ul class="d-flex m-0 list-unstyled gap-3">
                                  <li v-for="(date, dateIndex) in dates" :key="dateIndex" class="register-wrapper  bg-theme">
                                    {{ new Date(date.date_event).getDate() }}
                                    <!--                                  <div class="register">-->
                                    <!--                                    <a-->
                                    <!--                                      class="prt-btn  prt-btn-style-fill prt-btn-color-whitecolor text-nowrap text-start"-->
                                    <!--                                      :href="`/marathon/${date.id}`"-->
                                    <!--                                    >{{ $t('register_now') }}</a>-->
                                    <!--                                  </div>-->
                                  </li>

                                </ul>
                              </li>
                            </template>
                          </ul>

                        </div>

                        <div data-animation="fadeInDown" class="slider-btn">
                          <RouterLink
                            class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor mt-20 res-991-mb-30 mt-40 text-start"
                            :to="`/event/${event.id}`"
                          >
                            {{ $t('more_about') }}
                          </RouterLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </template>
    <template v-else>
      <div
        class="slide custom-slide"
        :style="`background-image: url(/assets/images/pre.jpg); background-repeat: no-repeat; background-position: top center; background-size: cover;`"
      >

        <div class="slide__content container text-base-white main-display mx-auto slide_style1">
          <div class="row">
            <div class="col-lg-12">
              <div class="slide__content--headings d-block">
                <div data-animation="fadeInLeft" class="fade-main"></div>
                <div data-animation="fadeInLeft" class="fade-in-main bg-base-white"></div>
                <div
                  class="w-100 pt-140 pb-40 res-1199-pb-80 res-1199-pt-80 res-991-pt-100 "
                >
                  <div class="position-relative">
                    <img
                      class="img-fluid"
                      src="/assets/images/slider/slide-img-1-409x89.webp"
                      alt="image"
                    />
                    <div data-animation="fadeInDown" class="first-letter ">
                      ROAD RUNNING
                    </div>
                  </div>
                  <div class="">
                    <div data-animation="fadeInDown" class="second-letter">
                      {{ $t('no_active_event') }}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>


    <div class="site-main">
      <section class="prt-row first-section overflow-hidden clearfix">
        <div class="winner-flag">
          <img width="525" height="377" src="/assets/images/flag-image.webp" alt="" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="d-md-flex">
                <div class="circular-fid-and-text-box">
                  <div class="circular-main">
                    <div class="prt-rotating-text position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 200 200"
                      >
                        <defs>
                          <path
                            d="M0, 100a100, 100 0 1, 0 200, 0a100, 100 0 1, 0 -200, 0"
                            id="txt-path"
                          ></path>
                        </defs>
                        <text>
                          <textPath startOffset="0" xlink:href="#txt-path">
                            {{ $t('road_running_with_us') }}
                          </textPath>
                        </text>
                      </svg>
                      <div class="circular">
                        <div class="prt_prettyphoto">
                            <img id="logo-img" width="90px" class="logo-label" src="/assets/images/logo_itog.png" alt="logo-img">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-title">
                  <div class="title-header">
                    <h2 class="title">{{ $t('lets_make_great') }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-20">
            <div class="col-lg-12">
              <div class="about-text res-991-mt-0">
                <div class="tm-scrollintetx-wrapper Frist">
                  <div class="big-title" style="transform: translateX(13.8062px)">Road Running</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="prt_single_image-wrapper res-991-mb-30">
                <img class="img-fluid" src="/assets/images/running.jpg" alt="image" />
              </div>
            </div>
            <div class="col-lg-6 pl-35 res-991-pl-15">
              <p>
                {{ $t('road_running') }}
              </p>
              <div
                class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes col-bg-img-one bg-base-skin border-rad_30 mt-45 spacing-1 h-auto res-991-mt-30"
              >
                <div class="prt-col-wrapper-bg-layer prt-bg-layer">
                  <div class="prt-col-wrapper-bg-layer-inner"></div>
                </div>
                <div class="layer-content">
                  <div class="section-title style1">
                    <div class="title-header">
                      <h2 class="title">
                        {{ $t('join_race') }}
                        <a
                          class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor pl-10"
                          href="/events"
                          >{{ $t('join_group') }}</a>
                      </h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3 col-sm-6">
                      <div class="client-box">
                        <div class="prt-client-logo-tooltip">
                          <div class="prt-client-logo-tooltip-inner">
                            <div class="client-thumbnail">
                              <img
                                class="img-fluid"
                                src="/assets/images/client/client-01.webp"
                                alt="image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                      <div class="client-box">
                        <div class="prt-client-logo-tooltip">
                          <div class="prt-client-logo-tooltip-inner">
                            <div class="client-thumbnail">
                              <img
                                class="img-fluid"
                                src="/assets/images/client/client-01.webp"
                                alt="image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                      <div class="client-box">
                        <div class="prt-client-logo-tooltip">
                          <div class="prt-client-logo-tooltip-inner">
                            <div class="client-thumbnail">
                              <img
                                class="img-fluid"
                                src="/assets/images/client/client-01.webp"
                                alt="image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                      <div class="client-box">
                        <div class="prt-client-logo-tooltip">
                          <div class="prt-client-logo-tooltip-inner">
                            <div class="client-thumbnail">
                              <img
                                class="img-fluid"
                                src="/assets/images/client/client-01.webp"
                                alt="image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="prt-row sticky-section padding_top_zero-section clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <template v-for="(event, eventIndex) in events.data" :key="eventIndex">
                <div v-if="event.status"  class="frame">
                  <div class="frame-border">
                    <div class="row">
                      <div class="col-lg-5">
                        <div class="featured-imagebox featured-imagebox-service style1">
                          <div class="featured-imagebox-wrapper">
                            <div class="featured-content">
                              <div class="featured-title">
                                <h3>{{ event.name }}</h3>
                              </div>
                              <div class="featured-desc">
                                <p>
                                  {{ event.description }}
                                </p>
                              </div>
                              <small class="d-flex text-info">
                                {{ settingStore.formatEventDateRange(event?.event_has_marathons) }}
                              </small>
                              <hr class="m-0">
                              <div class="featured-btn">
                                <a
                                  class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                  :href="`/event/${event.id}`"
                                >{{ $t('view_more_event') }}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-7">
                        <div class="featured-thumbnail">
                          <img
                            class="img-fluid border-rad-50"
                            :src="`https://api.roadrunning.uz/storage/${event.image}`"
                            alt="img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <section class="prt-row padding_zero-section bg-base-skin overflow-hidden clearfix">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="marquee-block overflow-hidden">
                <div class="marquee">
                  <div class="marquee-content">
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                    <div class="marquee-text">{{ $t('event_schedule_2024') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="prt-row bg-img1 prt-bg prt-bgimage-yes bg-base-dark cta-section overflow-hidden clearfix"
        style="background-image: url('/assets/images/Photo-2_resized.jpg'); background-attachment: fixed; background-position: top; background-repeat: no-repeat; background-size: cover "
      >
        <div class="prt-row-wrapper-bg-layer prt-bg-layer bg-base-dark"></div>
        <div id="foglayer_01" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
        <div id="foglayer_02" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
        <div id="foglayer_03" class="fog">
          <div class="image01"></div>
          <div class="image02"></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title style2">
                <div class="title-header">
                  <div class="title">
                    {{ $t('my_ultimate') }}
                    <div class="marquee-block style1 bg-base-skin overflow-hidden">
                      <div class="marquee">
                        <div class="marquee-content style1">
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (00) 000 00 00 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (00) 000 00 00 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (00) 000 00 00 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {{ $t('passion') }}
                    <div class="prt_single_image-wrapper style1">
                      <img
                        class="img-fluid rounded-circle"
                        src="/assets/images/logo_itog.png"
                        width="150px"
                        alt=""
                      />
                    </div>
                    {{ $t('win_marathon_time') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="prt-row testimonial-section overflow-hidden clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="section-title">
                <div class="title-header">
                  <h2 class="title">{{ $t('what_people_say') }}</h2>
                </div>
              </div>
              <div class="featured-icon-box icon-align-before-content style1">
                <div class="featured-icon">
                  <div
                    class="prt-icon prt-icon_element-fill prt-icon_element-size-sm prt-icon_element-color-skincolor"
                  >
                    <i class="flaticon-rocket"></i>
                  </div>
                </div>
                <div class="featured-content">
                  <div class="featured-title">
                    <h3>21%</h3>
                  </div>
                  <div class="featured-desc">
                    <p v-html="$t('average_traffic_increase')"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <div
                class="row slick_slider"
                data-slick='{"slidesToShow": 1, "slidesToScroll": 1,
                            "arrows":false, "dots":false, "autoplay":true, "infinite":true,
                            "responsive": [{"breakpoint":1200,"settings":{"slidesToShow": 1}} ,
                            {"breakpoint":992,"settings":{"slidesToShow": 1}}, {"breakpoint":768,"settings":
                            {"slidesToShow": 1}}]}'
              >
                <div class="div-block-6">
                  <div class="testimonials style1">
                    <div class="testimonial-avatar">
                      <div class="testimonial-img">
                        <img
                          class="img-fluid"
                          src="/assets/images/testimonial/test-1-197x197.webp"
                          alt="images"
                        />
                      </div>
                    </div>
                    <div class="testimonial-content">
                      <p class="testimonial-content-p">
                        <span class="text-base-white">{{ $t('adrenaline_rush') }}</span>
                        {{ $t('testimonial2') }}
                      </p>
                      <div class="testimonial-caption">
                        <h3>Mariya</h3>
                        <label>Guzanova</label>
                      </div>
                      <div class="star-ratings">
                        <ul class="rating">
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star-o"></i></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="div-block-6">
                  <div class="testimonials style1">
                    <div class="testimonial-avatar">
                      <div class="testimonial-img">
                        <img
                          class="img-fluid"
                          src="/assets/images/testimonial/test-1-197x197.webp"
                          alt="images"
                        />
                      </div>
                    </div>
                    <div class="testimonial-content">
                      <p class="testimonial-content-p">
                        <span class="text-base-white">
                          {{ $t('transformative_coaching') }}
                        </span>
                        {{ $t('testimonial1') }}
                      </p>
                      <div class="testimonial-caption">
                        <h3>Murad</h3>
                        <label>Nazarov</label>
                      </div>
                      <div class="star-ratings">
                        <ul class="rating">
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star-o"></i></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="div-block-6">
                  <div class="testimonials style1">
                    <div class="testimonial-avatar">
                      <div class="testimonial-img">
                        <img
                          class="img-fluid"
                          src="/assets/images/testimonial/test-1-197x197.webp"
                          alt="images"
                        />
                      </div>
                    </div>
                    <div class="testimonial-content">
                      <p class="testimonial-content-p">
                        <span class="text-base-white"> {{ $t('unforgettable_competition') }} </span>
                        {{ $t('testimonial2') }}
                      </p>
                      <div class="testimonial-caption">
                        <h3>Salima</h3>
                        <label>Egamberdieva</label>
                      </div>
                      <div class="star-ratings">
                        <ul class="rating">
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star-o"></i></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="prt-row blog-section overflow-hidden clearfix">
        <div class="winner-flag-1 z-index-0">
          <img src="/assets/images/flag-2.webp" alt="" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 m-auto">
              <div class="section-title title-style-center_text">
                <div class="title-header">
                  <h2 class="title">{{ $t('be_part_of_big_event') }}</h2>
                </div>
                <div class="title-desc">
                  <p>{{ $t('step_into_adrenaline_action') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row fadeup-amin res-1600-ml-0 res-1600-mr-0 res-1400-mr-0 res-1400-ml-0 slick_slider slick-arrow-style1 mt-10"
            data-slick='{"slidesToShow": 3,"slidesToScroll": 1, "arrows":false, "dots":false,"autoplay":false,
                    "infinite":true, "responsive": [{"breakpoint":1199,"settings":{"slidesToShow": 2,"arrows":false,"autoplay":true}},
                    {"breakpoint":776,"settings":{"slidesToShow": 1,"arrows":false}}, {"breakpoint":550,"settings":{"slidesToShow": 1}}]}'
          >
            <div class="col-lg-4">
              <div class="featured-imagebox featured-imagebox-blog style1">
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid"
                    src="/assets/images/Photo-21_resized.jpg"
                    loading="lazy"
                    alt="image"
                  />
                </div>
                <div class="featured-title">
                  <h3><a href="/events">{{ $t('special_competitions') }}</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-06-25, 03:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>{{ $t('comment') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="featured-imagebox featured-imagebox-blog style1">
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid"
                    src="/assets/images/Photo-16_resized.jpg"
                    loading="lazy"
                    alt="image"
                  />
                </div>
                <div class="featured-title">
                  <h3><a href="/events">{{ $t('higher_running_school') }}</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-08-20, 05:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>{{ $t('comment') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="featured-imagebox featured-imagebox-blog style1">
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid"
                    src="/assets/images/Photo-19_resized.jpg"
                    loading="lazy"
                    alt="image"
                  />
                </div>
                <div class="featured-title">
                  <h3><a href="/events">{{ $t('explore_hill_running') }}</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-15-10, 05:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>{{ $t('comment') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

.custom-slide{
  position: relative;
}

.custom-slide::before{
  content: "";
  position: absolute;
  background-color: rgba(0, 0, 0, 0.43);
  width: 100%;
  height: 100%;
}

</style>