<script setup lang="ts">
import {useEventStore} from "@/stores/events";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useSettingStore} from "@/stores/setting";
import { RouterLink } from 'vue-router'

const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)
const settingStore = useSettingStore()

onMounted(async ()=>{
  await eventStore.getEvents()
})

</script>

<template>
<div>

  <div class="site-main">

    <section class="prt-row clearfix">
      <div class="container">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link text-theme" id="nav-archive-tab" data-bs-toggle="tab" data-bs-target="#nav-archive" type="button" role="tab" aria-controls="nav-archive" aria-selected="false">Archive</button>
            <button class="nav-link text-theme active" id="nav-live-tab" data-bs-toggle="tab" data-bs-target="#nav-live" type="button" role="tab" aria-controls="nav-live" aria-selected="true">Live</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-live" role="tabpanel" aria-labelledby="nav-live-tab">
            <div class="row">
              <template v-for="event in events.data" :key="event.id">
                <div v-if="event.status" class="col-lg-4 col-md-6">
                  <div class="featured-imagebox featured-imagebox-blog style1">
                    <div class="featured-thumbnail">
                      <img class="img-fluid" :src="`https://api.roadrunning.uz/storage/${event.image}`" loading="lazy" alt="image">
                    </div>
                    <div class="featured-title">
                      <h3><router-link :to="`/event/${event.id}`">{{ event.name }}</router-link></h3>
                    </div>
                    <div class="featured-content">
                      <div class="post-category">
                        <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                        <span>{{ settingStore.formatEventDateRange(event.event_has_marathons) }}</span>
                      </div>
                    </div>
                    <div class="post-date">
                      <RouterLink :to="`/event/${event.id}`" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor res-991-mb-30 float-end mt-40 text-start">Подробнее</RouterLink>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="tab-pane fade show" id="nav-archive" role="tabpanel" aria-labelledby="nav-archive-tab">
            <div class="row">
              <template v-for="(event, eventIndex) in events.data" :key="eventIndex">
                <div v-if="!event?.status" class="col-lg-4 col-md-6">
                  <div class="featured-imagebox featured-imagebox-blog style1">
                    <div class="featured-thumbnail">
                      <img class="img-fluid" :src="`https://api.roadrunning.uz/storage/${event.image}`" loading="lazy" alt="image">
                    </div>
                    <div class="featured-title">
                      <h3><a href="blog-single.html">{{ event.name }}</a></h3>
                    </div>
                    <div class="featured-content">
                      <div class="post-category">
                        <i class="fa-light fa-reply-clock"></i>
                        <span>{{ settingStore.formatEventDateRange(event.event_has_marathons) }}</span>
                      </div>
                    </div>
                    <div class="post-date mt-5">
                      <span class="text-danger">
                        <i class="fa-regular fa-circle-exclamation"></i>
                        Time is over
                      </span>
                      <RouterLink :to="`/event/${event.id}`" class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor res-991-mb-30 float-end mt-40 text-start">Подробнее</RouterLink>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>



      </div>
    </section>

  </div>
</div>
</template>

<style scoped>

</style>