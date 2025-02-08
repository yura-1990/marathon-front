<script setup lang="ts">
import { useEventStore } from '@/stores/events'
import { useMarathonStore } from '@/stores/marathons'
import { onMounted, ref, watch } from 'vue'
import 'swiper/css';
import 'swiper/css/navigation';
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'
import { RouterLink } from 'vue-router'

const eventStore = useEventStore()
const marathon = useMarathonStore()
const { events } = storeToRefs(eventStore)
const { locale, t } = useI18n();
const settingStore = useSettingStore()
const message = ref('&larr; ' + t('choose_date'))
const indexEvent = ref(0)
const indexMarathon = ref(0)
const marathons = ref([])
const checkedNumber = ref(null)

onMounted(async () => {
  await eventStore.getEvents(locale.value)
  await marathon.getMarathons(locale.value)

  marathons.value = events?.value.data[indexEvent.value].event_has_marathons[indexMarathon.value].marathons
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

  marathons.value = events?.value.data[indexEvent.value].event_has_marathons[indexMarathon.value].marathons
})

function showEvent(date, eventId, marathonId){
  if (date.marathons.length > 0){
    marathons.value = date.marathons
  } else {
    marathons.value = []
    message.value = 'No marathon'
  }

  indexEvent.value = eventId;
  indexMarathon.value = marathonId;
}

function showNumber(num){
  checkedNumber.value = num
}

</script>

<template>
  <div>
    <div class="site-main">
      <section class="prt-row sticky-section clearfix">
        <div class="container">
          <div class="row">
            <template v-if="events.data?.length > 0">
              <div class="col-lg-12">
                <template v-for="(event, eventIndex) in events?.data" :key="eventIndex">
                  <div v-if="event.status"  class="frame">
                    <div class="frame-border p-5">
                      <div class="row">
                        <div class="col-lg-5">
                          <div class="featured-imagebox featured-imagebox-service style1">
                            <div class="featured-imagebox-wrapper">
                              <div class="featured-content">
                                <div class="">
                                  <h4>{{ event.name }}</h4>
                                </div>
                                <div class="d-flex flex-column gap-1 ">
                                  <template v-for="(date, marathonId) in event?.event_has_marathons" :key="marathonId">
                                    <div class="prt-btn prt-btn-size-md rounded-2 prt-btn-style-fill "
                                         :class="indexMarathon === marathonId ? 'prt-btn-color-skincolor' : 'border text-white'"
                                         @click="showEvent(date, eventIndex, marathonId)"
                                    >
                                      {{ settingStore.formatDate(date.date_event) }}
                                    </div>
                                  </template>
                                </div>
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
                          <template v-if="marathons.length > 0">
                            <div class="featured-thumbnail mb-2">
                              <div class="accordion" :id="`accordionPanelsStayOpenExample-${eventIndex}`">
                                <template v-for="(marathon, marathonIndex) in marathons" :key="marathonIndex">
                                  <div class="accordion-item">
                                    <h2 class="accordion-header" :id="`panelsStayOpen-headingOne-${marathon.id}`">
                                      <button class="accordion-button collapsed d-flex align-items-center gap-3"
                                              type="button" data-bs-toggle="collapse"
                                              :data-bs-target="`#panelsStayOpen-collapseOne-${marathon.id}`"
                                              aria-expanded="true" aria-controls="panelsStayOpen-collapseOne"
                                      >
                                        <span>{{ marathon?.marathon_type?.name }}</span>
                                        <span class="d-flex gap-1 text-theme">
                                        <template v-if="marathon.datetime_from">
                                          <small>{{marathon?.datetime_from  }}</small>
                                        </template>
                                        <template v-if="marathon?.datetime_to">
                                          -<small class="d-block ">{{ marathon.datetime_to  }}</small>
                                        </template>
                                      </span>

                                        <template v-if="marathon.price">
                                          <span class="position-absolute end-0 me-5">{{ settingStore.formatNumber(marathon.price) }} UZS</span>
                                        </template>
                                        <template v-else>
                                          <span>0 UZS</span>
                                        </template>
                                      </button>

                                    </h2>

                                    <div :id="`panelsStayOpen-collapseOne-${marathon.id}`"
                                         class="accordion-collapse collapse"
                                         :aria-labelledby="`panelsStayOpen-headingOne-${marathon.id}`"
                                         :data-bs-parent="`#accordionPanelsStayOpenExample-${eventIndex}`"
                                    >
                                      <div class="accordion-body">
                                        <h5 class="text-dark d-flex align-items-center justify-content-between">{{ $t('additional_options') }}: <small class="text-info"> {{ marathon?.marathon_type?.amount - marathon?.participants_count }} {{ $t('seat_left') }}</small></h5>

                                        <template v-if="marathon.number_types.length > 0">
                                          <ul class="list-group">
                                            <template v-for="(number, numberIndex) in marathon.number_types" :key="numberIndex">
                                              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                                                <div class="d-flex gap-3 ">
                                                  <input :id="`number-${number.id}`"
                                                         @click="showNumber(number)"
                                                         :checked="checkedNumber?.id===number.id"
                                                         class="form-check-input me-1" type="checkbox"
                                                  >
                                                  <label  :for="`number-${number.id}`"><h5 class="text-theme ">{{ number.type }}</h5></label>
                                                </div>

                                                <h6 class="text-theme fw-600">
                                                  {{ number?.pivot?.price ? '+ ' + settingStore.formatNumber(number.pivot.price) : settingStore.formatNumber(marathon.price) }} UZS
                                                </h6>
                                              </li>
                                            </template>
                                          </ul>
                                        </template>
                                        <RouterLink :to="`/participate/${marathon.id}`"  v-if="checkedNumber"
                                                    class="prt-btn d-flex align-items-center p-2 justify-content-center prt-btn-size-sm prt-btn-shape-rounded mt-3 prt-btn-style-fill prt-btn-color-skincolor"
                                        >
                                          {{ $t('participate') }}
                                        </RouterLink>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="featured-thumbnail d-flex h-100 justify-content-center align-items-center">
                              <h3 v-html="message"></h3>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="col-lg-12">
                  <div class="frame">
                    <div class="frame-border p-5">
                      <div class="vh-30 d-flex align-items-center justify-content-center">
                        <h3>{{ $t('no_active_event') }}</h3>
                      </div>
                    </div>
                  </div>
              </div>
            </template>

          </div>
        </div>
      </section>

<!--      <section class="bg-img6 pt-5 prt-bgimage-yes clearfix">-->
<!--        <div class="container">-->
<!--          <h3 class="mt-5 pt-5">News</h3>-->
<!--          <div class="row">-->
<!--            <div class="col-lg-12">-->
<!--              <div class="pr-0">-->
<!--                <div class="prt-tabs prt-tab-style-02">-->
<!--                  <ul class="tabs">-->
<!--                    <li class="tab">-->
<!--                      <div class="featured-imagebox featured-imagebox-blog style3">-->
<!--                        <div class="row g-0">-->
<!--                          <div class="col-sm-4">-->
<!--                            <div class="prt_single_image-wrapper">-->
<!--                              <img class="img-fluid border-rad_15" src="/assets/images/flag-image.webp" alt="image"></div>-->
<!--                          </div>-->
<!--                          <div class="col-sm-8">-->
<!--                            <div class="featured-box-content">-->
<!--                              <div class="featured-heading">-->
<!--                                July 21, 2024-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3>-->
<!--                                  Find Your Distance Below and Get Ready for the-->
<!--                                  Summer’s Big Challenge</h3>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="tab">-->
<!--                      <div class="featured-imagebox featured-imagebox-blog style3">-->
<!--                        <div class="row g-0">-->
<!--                          <div class="col-sm-4">-->
<!--                            <div class="prt_single_image-wrapper">-->
<!--                              <img class="img-fluid border-rad_15" src="/assets/images/flag-3.webp" alt="image"></div>-->
<!--                          </div>-->
<!--                          <div class="col-sm-8">-->
<!--                            <div class="featured-box-content">-->
<!--                              <div class="featured-heading">-->
<!--                                Jun 12, 2024-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3>-->
<!--                                  EXPLORING THE WORLD OF HIGH-OCTANE RACING ADVENTURES AND ENJOY</h3>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="tab active">-->
<!--                      <div class="featured-imagebox featured-imagebox-blog style3 mr-0">-->
<!--                        <div class="row g-0">-->
<!--                          <div class="col-sm-4">-->
<!--                            <div class="prt_single_image-wrapper">-->
<!--                              <img class="img-fluid border-rad_15" src="/assets/images/flag-2.webp" alt="image"></div>-->
<!--                          </div>-->
<!--                          <div class="col-sm-8">-->
<!--                            <div class="featured-box-content ml_10 res-1199-ml-0">-->
<!--                              <div class="featured-heading">-->
<!--                                May 10, 2024-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3>SPEED, THRILLS, AND VICTORY: EXPLORING THE WORLD OF-->
<!--                                  HIGH-OCTANE RACING ADVENTURES</h3>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                  <div class="content-tab">-->
<!--                    &lt;!&ndash; content-inner &ndash;&gt;-->
<!--                    <div class="content-inner" style="display: none;">-->
<!--                      <div class="row g-0">-->
<!--                        <div class="col-lg-5">-->
<!--                          <div class="featured-imagebox featured-imagebox-blog style2">-->
<!--                            <div class="featured-box-content">-->
<!--                              <div class="featured-heading">-->
<!--                                Latest articles-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3><a href="blog-single.html" tabindex="0">-->
<!--                                  Find Your Distance Below and Get Ready for the-->
<!--                                  Summer’s Big Challenge</a></h3>-->
<!--                              </div>-->
<!--                              <div class="featured-box-desc">-->
<!--                                <p>Delve into the Thrills of High-Speed Racing: Rev up-->
<!--                                  Your Engines for an Unforgettable Journey on the Track</p>-->
<!--                              </div>-->
<!--                              <div class="prt-horizontal_sep mt-25 mb-20"></div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted by</span>-->
<!--                                <span class="prt-auther-name">Michel morron</span>-->
<!--                              </div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted date</span>-->
<!--                                <span class="prt-auther-name"> July 21, 2024</span>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div class="col-lg-7">-->
<!--                          <div class="prt_single_image-wrapper text-lg-end">-->
<!--                            <img class="img-fluid" src="/assets/images/Photo-2_resized.jpg" alt="image">-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>&lt;!&ndash; content-inner end&ndash;&gt;-->
<!--                    &lt;!&ndash; content-inner &ndash;&gt;-->
<!--                    <div class="content-inner" style="display: none;">-->
<!--                      <div class="row g-0">-->
<!--                        <div class="col-md-5">-->
<!--                          <div class="featured-imagebox featured-imagebox-blog style2">-->
<!--                            <div class="featured-box-content">-->
<!--                              <div class="featured-heading">-->
<!--                                Latest articles-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3><a href="blog-single.html" tabindex="0">-->
<!--                                  EXPLORING THE WORLD OF HIGH-OCTANE RACING ADVENTURES AND ENJOY</a></h3>-->
<!--                              </div>-->
<!--                              <div class="featured-box-desc">-->
<!--                                <p>Delve into the Thrills of High-Speed Racing: Rev up-->
<!--                                  Your Engines for an Unforgettable Journey on the Track</p>-->
<!--                              </div>-->
<!--                              <div class="prt-horizontal_sep mt-25 mb-20"></div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted by</span>-->
<!--                                <span class="prt-auther-name">Spaler michel</span>-->
<!--                              </div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted date</span>-->
<!--                                <span class="prt-auther-name"> Jun 12, 2024</span>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div class="col-md-7">-->
<!--                          <div class="prt_single_image-wrapper text-lg-end">-->
<!--                            <img class="img-fluid" src="/assets/images/sport-bg.jpg" alt="image">-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>&lt;!&ndash; content-inner end&ndash;&gt;-->
<!--                    &lt;!&ndash; content-inner &ndash;&gt;-->
<!--                    <div class="content-inner active" style="">-->
<!--                      <div class="row g-0">-->
<!--                        <div class="col-md-5">-->
<!--                          <div class="featured-imagebox featured-imagebox-blog style2">-->
<!--                            <div class="featured-box-content">-->
<!--                              <div class="featured-heading">-->
<!--                                Latest articles-->
<!--                              </div>-->
<!--                              <div class="featured-title">-->
<!--                                <h3><a href="blog-single.html" tabindex="0">-->
<!--                                  SPEED, THRILLS, AND VICTORY: EXPLORING THE WORLD OF-->
<!--                                  HIGH-OCTANE RACING ADVENTURES</a></h3>-->
<!--                              </div>-->
<!--                              <div class="featured-box-desc">-->
<!--                                <p>Delve into the Thrills of High-Speed Racing: Rev up-->
<!--                                  Your Engines for an Unforgettable Journey on the Track</p>-->
<!--                              </div>-->
<!--                              <div class="prt-horizontal_sep mt-25 mb-20"></div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted by</span>-->
<!--                                <span class="prt-auther-name">henry stuf</span>-->
<!--                              </div>-->
<!--                              <div class="post-meta">-->
<!--                                <span class="prt-meta-line">Posted date</span>-->
<!--                                <span class="prt-auther-name">May 10, 2024</span>-->
<!--                              </div>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                        <div class="col-md-7">-->
<!--                          <div class="prt_single_image-wrapper text-lg-end">-->
<!--                            <img class="img-fluid" src="/assets/images/pre.jpg" alt="image">-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>&lt;!&ndash; content-inner end&ndash;&gt;-->
<!--                  </div>-->

<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
    </div>
  </div>
</template>

<style scoped>
</style>