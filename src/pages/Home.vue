<script setup lang="ts">
import { useEventStore } from '@/stores/events'
import { useMarathonStore } from '@/stores/marathons'
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const event = useEventStore()
const marathon = useMarathonStore()

onMounted(async () => {
  await event.getEvents()
  await marathon.getMarathons()
})

function groupedDatesByMonth(arr: Array<any>): Array<any>
{
  return arr.reduce((acc:any, event:any) => {
    const date = new Date(event.date_event);
    const month = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); // Format "September 2024"

    // If the month key doesn't exist, create it
    if (!acc[month]) {
      acc[month] = [];
    }

    // Add the event date to the corresponding month
    acc[month].push(event);
    return acc;
  }, {});

}


</script>

<template>
  <div>
    <swiper
      :modules="[Navigation]"
      :slides-per-view="1"
      :navigation="true"
      :space-between="50"
      :loop="true"
    >
      <template v-for="(event, index) in event  .events.data" :key="index">
        <swiper-slide v-if="event.status" >

          <div
            class="slide custom-slide"
            :style="{'background-image': `url(http://api.roadrunning.uz/storage/${event.image})`}"
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
                              <span class="text-warning fw-bold">
                                {{ month }}
                              </span>
                              <ul class="d-flex m-0 list-unstyled gap-3">
                                <li v-for="(date, dateIndex) in dates" :key="dateIndex" class="register-wrapper">
                                  {{ new Date(date.date_event).getDate() }}

                                  <div class="register">
                                    <a
                                      class="prt-btn  prt-btn-style-fill prt-btn-color-whitecolor text-nowrap text-start"
                                      href="/"
                                    >Register now</a>
                                  </div>
                                </li>

                              </ul>
                            </li>
                          </template>
                        </ul>

                      </div>

                      <div data-animation="fadeInDown" class="slider-btn">
                        <a
                          class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor mt-20 res-991-mb-30 mt-40 text-start"
                          href="services.html"
                        >More about</a>
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
                    <div class="prt-rotating-text">
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
                            Road running with us.
                          </textPath>
                        </text>
                      </svg>
                      <div class="circular">
                        <div class="prt_prettyphoto">
                          <img class="img-fluid" src="/assets/images/shape-img.webp" alt="image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-title">
                  <div class="title-header">
                    <h2 class="title">Let’s make great something together!</h2>
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
                Road running is 100% dedicated to providing the smooth and successful race experience for
                every size race. No more long delays for your race award ceremonies or waiting on
                results to be processed. Strive to make your race the most successful and exciting
                race as possible
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
                        Join our race and get to know how fast you are
                        <a
                          class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor pl-10"
                          href="about-us.html"
                          >Join our group</a
                        >
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
              <template v-for="(running, runningIndex) in marathon.marathons.data" :key="runningIndex">
                <div v-if="running.status" :id="'frame_' + (runningIndex+1)" >
                  <div class="frame-border">
                    <div class="row">
                      <div class="col-lg-5">
                        <div class="featured-imagebox featured-imagebox-service style1">
                          <div class="featured-imagebox-wrapper">
                            <div class="featured-content">
                              <div class="featured-title">
                                <h3>{{ running.name }}</h3>
                                <h5>{{ running.marathon_type.name }}</h5>
                              </div>
                              <div class="featured-desc">
                                <p>
                                  {{ running.description }}
                                </p>
                              </div>
                              <small class="text-info">
                                {{ (new Date(running.event_has_marathon.date_event)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })  }}
                              </small>
                              <small class="d-flex text-info">
                                <span>{{ running.datetime_from }}</span>
                                <span>-</span>
                                <span>{{ running.datetime_to }}</span>
                              </small>
                              <hr class="m-0">
                              <div class="featured-btn">
                                <a
                                  class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                  href="services.html"
                                >VIEW MORE EVENT</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-7">
                        <div class="featured-thumbnail">
                          <img
                            class="img-fluid border-rad-50"
                            :src="`http://api.roadrunning.uz/storage/${running.image[0]}`"
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
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
                    <div class="marquee-text">Event schedule for 2024</div>
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
                    my ultimate
                    <div class="marquee-block style1 bg-base-skin overflow-hidden">
                      <div class="marquee">
                        <div class="marquee-content style1">
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (97) 592 39 90 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (97) 592 39 90 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="tel:+998975923990"> +998 (97) 592 39 90 </a>
                          </div>
                          <div class="marquee-text style1">
                            <a href="mailto:info@example.com">info@roadrunning.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    passion
                    <div class="prt_single_image-wrapper style1">
                      <img
                        class="img-fluid rounded-circle"
                        src="/assets/images/logo_itog.png"
                        width="150px"
                        alt=""
                      />
                    </div>
                    is to win the marathon time for running
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="prt-row event-section overflow-hidden clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="featured-imagebox featured-imagebox-event style1">
                <div class="row">
                  <div class="col-md-5 col-lg-5">
                    <div class="featured-thumbnail">
                      <img
                        width="304"
                        height="304"
                        class="img-fluid"
                        src="/assets/images/Photo-5_resized.jpg"
                        alt="images"
                      />
                    </div>
                  </div>
                  <div class="col-md-7 col-lg-7">
                    <div class="featured-content">
                      <div class="featured-title">
                        <h3>VELOCITY VORTEX SHOWDOWN</h3>
                      </div>
                      <div class="featured-desc">
                        <p>Starting : 07:00am & end : 10:00am</p>
                        <p>Host by : Willium agato</p>
                      </div>
                      <div class="featured-btn">
                        <a
                          class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor"
                          href="contact-us.html"
                          >book ticket</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="featured-imagebox featured-imagebox-event style1 mt-35">
                <div class="row">
                  <div class="col-md-5 col-lg-5">
                    <div class="featured-thumbnail">
                      <img
                        width="304"
                        height="304"
                        class="img-fluid"
                        src="/assets/images/Photo-7_resized.jpg"
                        alt="images"
                      />
                    </div>
                  </div>
                  <div class="col-md-7 col-lg-7">
                    <div class="featured-content">
                      <div class="featured-title">
                        <h3>TURBOCHARGED TRIUMPH TOURNAMENT</h3>
                      </div>
                      <div class="featured-desc">
                        <p>Starting : 07:00am & end : 10:00am</p>
                        <p>Host by : Willium agato</p>
                      </div>
                      <div class="featured-btn">
                        <a
                          class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor"
                          href="contact-us.html"
                          >book ticket</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="featured-imagebox featured-imagebox-event style1 content">
                <div class="flag-right-img">
                  <img class="img-fluid" src="/assets/images/flag-right.png" alt="image" />
                </div>
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid res-767-mt-0"
                    src="/assets/images/running.jpg"
                    alt="images"
                  />
                </div>
                <div class="featured-content">
                  <div class="featured-title">
                    <h3>SPEEDSTER SPECTACULAR CIRCUIT</h3>
                  </div>
                  <div class="featured-desc">
                    <p>Starting : 07:00am & end : 10:00am</p>
                    <p>Host by : Willium agato</p>
                  </div>
                  <div class="featured-btn">
                    <a
                      class="prt-btn prt-btn-size-md btn-inline prt-btn-color-whitecolor"
                      href="contact-us.html"
                      >book ticket</a
                    >
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
                  <h2 class="title">WHAT PEOPLE SAY ABOUT US</h2>
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
                    <p>
                      Average traffic <br />
                      increasefor clients
                    </p>
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
                        <span class="text-base-white">Incredible adrenaline rush!</span> From the
                        roaring engines to the precise handling, every moment on the track was
                        electrifying. The organization and support were impeccable, making it a
                        truly unforgettable experience. Can't wait to return for more thrilling
                        races
                      </p>
                      <div class="testimonial-caption">
                        <h3>Carleton cassie</h3>
                        <label>car racer</label>
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
                        <span class="text-base-white">Transformative coaching!</span> Under their
                        guidance, I've seen a remarkable improvement in my racing skills. From
                        refining my technique to mastering strategic maneuvers, their expertise has
                        propelled me from a novice to a podium contender. Truly grateful for the
                        opportunity
                      </p>
                      <div class="testimonial-caption">
                        <h3>Michel wheit</h3>
                        <label>Mechanical</label>
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
                        <span class="text-base-white"> Unforgettable competition! </span>The
                        atmosphere was charged with excitement, and the level of competition was
                        intense. Winning amazing prizes was just the icing on the cake. This event
                        exceeded all expectations, and I can't wait to participate again. Highly
                        recommend for any racing enthusiast.
                      </p>
                      <div class="testimonial-caption">
                        <h3>Henry richard</h3>
                        <label>CEO</label>
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

      <section class="prt-row overflow-hidden pricing-section-1 bg-layer-equal-height clearfix">
        <div class="container-fluid">
          <div class="row g-0">
            <div class="col-xl-6">
              <div
                class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes col-bg-img-two prt-left-span spacing-2"
              >
                <div class=" prt-bg-layer" style="
                  background-image: url('/assets/images/Photo-2_resized.jpg');
                  background-position: center;
                  background-size: cover;
                  background-repeat: no-repeat;"
                >
                  <div class="prt-col-wrapper-bg-layer-inner"></div>
                </div>
                <div class="layer-content">
                  <div class="section-title style3">
                    <div class="title-header">
                      <h2 class="title">Get ready</h2>
                      <h2 class="title text-md-end">to race</h2>
                      <div class="secondary-text">
                        <div class=""><span class="normal-text">21</span></div>
                        <div class="">
                          <span class="Kaushan-text">April 2024 </span>
                          <span class="normal-text-1"> Sunday </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    class="img-fluid pl-110 pt-20 res-1400-pl-0"
                    src="/assets/images/single-img-8-479x171.webp"
                    alt="image"
                  />
                  <div class="bg-title-image">
                    <a href="tel:1234567890">01+ 123 456 7890</a>
                    <h3><a href="contact-us.html"> Get online ticket </a></h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div
                class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes col-bg-img-three prt-right-span spacing-3"
              >
                <div class="prt-col-wrapper-bg-layer prt-bg-layer">
                  <div class="prt-col-wrapper-bg-layer-inner"></div>
                </div>
                <div class="layer-content">
                  <div class="prt-tabs prt-tab-style-01">
                    <ul class="tabs">
                      <li class="tab">introductory lesson</li>
                      <li class="tab active">Group riding</li>
                      <li class="tab">car / bike leasing</li>
                      <li class="tab">Trail ride adventure</li>
                      <li class="tab">private riding</li>
                    </ul>
                    <div class="content-tab">
                      <!-- content-inner -->
                      <div class="content-inner active">
                        <div class="prt-pricing-plan">
                          <div class="prt-p_table-body">
                            <div class="prt-p_table-amount pricing-price">
                              <h3>$456</h3>
                              <span class="pac_frequency"> / mon</span>
                            </div>
                            <ul class="prt-p_table-features">
                              <li><i class="ti ti-check"></i>10 Property Listing</li>
                              <li><i class="ti ti-check"></i>30 Days Availability</li>
                              <li><i class="ti ti-check"></i>Feature Properties</li>
                              <li><i class="ti ti-check"></i>24/7 support</li>
                            </ul>
                            <div class="prt-p_table-footer">
                              <a
                                class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                href="pricing.html"
                                >Get Started now</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- content-inner end-->
                      <!-- content-inner -->
                      <div class="content-inner">
                        <div class="prt-pricing-plan">
                          <div class="prt-p_table-body">
                            <div class="prt-p_table-amount pricing-price">
                              <h3>$456</h3>
                              <span class="pac_frequency"> / mon</span>
                            </div>
                            <ul class="prt-p_table-features">
                              <li><i class="ti ti-check"></i>10 Property Listing</li>
                              <li><i class="ti ti-check"></i>30 Days Availability</li>
                              <li><i class="ti ti-check"></i>Feature Properties</li>
                              <li><i class="ti ti-check"></i>24/7 support</li>
                            </ul>
                            <div class="prt-p_table-footer">
                              <a
                                class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                href="contact.html"
                                >Get Started now</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- content-inner end-->
                      <!-- content-inner -->
                      <div class="content-inner">
                        <div class="prt-pricing-plan">
                          <div class="prt-p_table-body">
                            <div class="prt-p_table-amount pricing-price">
                              <h3>$256</h3>
                              <span class="pac_frequency"> / mon</span>
                            </div>
                            <ul class="prt-p_table-features">
                              <li><i class="ti ti-check"></i>10 Property Listing</li>
                              <li><i class="ti ti-check"></i>30 Days Availability</li>
                              <li><i class="ti ti-check"></i>Feature Properties</li>
                              <li><i class="ti ti-check"></i>24/7 support</li>
                            </ul>
                            <div class="prt-p_table-footer">
                              <a
                                class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                href="contact.html"
                                >Get Started now</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- content-inner end-->
                      <!-- content-inner -->
                      <div class="content-inner">
                        <div class="prt-pricing-plan">
                          <div class="prt-p_table-body">
                            <div class="prt-p_table-amount pricing-price">
                              <h3>$356</h3>
                              <span class="pac_frequency"> / mon</span>
                            </div>
                            <ul class="prt-p_table-features">
                              <li><i class="ti ti-check"></i>10 Property Listing</li>
                              <li><i class="ti ti-check"></i>30 Days Availability</li>
                              <li><i class="ti ti-check"></i>Feature Properties</li>
                              <li><i class="ti ti-check"></i>24/7 support</li>
                            </ul>
                            <div class="prt-p_table-footer">
                              <a
                                class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                href="contact.html"
                                >Get Started now</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- content-inner end-->
                      <!-- content-inner -->
                      <div class="content-inner">
                        <div class="prt-pricing-plan">
                          <div class="prt-p_table-body">
                            <div class="prt-p_table-amount pricing-price">
                              <h3>$556</h3>
                              <span class="pac_frequency"> / mon</span>
                            </div>
                            <ul class="prt-p_table-features">
                              <li><i class="ti ti-check"></i>10 Property Listing</li>
                              <li><i class="ti ti-check"></i>30 Days Availability</li>
                              <li><i class="ti ti-check"></i>Feature Properties</li>
                              <li><i class="ti ti-check"></i>24/7 support</li>
                            </ul>
                            <div class="prt-p_table-footer">
                              <a
                                class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                                href="contact.html"
                                >Get Started now</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- content-inner end-->
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
                  <h2 class="title">be part of a big event</h2>
                </div>
                <div class="title-desc">
                  <p>
                    Step into the heart of adrenaline-pumping action! Join us for a colossal event
                    where every revving engine, every screeching turn, creates an unforgettable
                    experience.
                  </p>
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
                  <h3><a href="blog-single.html">special competitions</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-06-25, 03:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>comment</span>
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
                  <h3><a href="blog-single.html">HIGHER Driving School</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-08-20, 05:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>comment</span>
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
                  <h3><a href="blog-single.html">EXPLORE HILL RIDING</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-15-10, 05:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>comment</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="featured-imagebox featured-imagebox-blog style1">
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid"
                    src="/assets/images/Photo-10_resized.jpg"
                    loading="lazy"
                    alt="image"
                  />
                </div>
                <div class="featured-title">
                  <h3><a href="blog-single.html">MOUNTAIN BIKE RACES</a></h3>
                </div>
                <div class="featured-content">
                  <div class="post-category">
                    <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                    <span>2022-08-14, 01:pm</span>
                  </div>
                  <div class="post-date">
                    <i class="ti ti-comment" aria-hidden="true"></i>
                    <span>comment</span>
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