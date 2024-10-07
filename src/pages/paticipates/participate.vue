<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useI18n } from 'vue-i18n'
import {useSettingStore} from "@/stores/setting";
import {useMarathonStore} from "@/stores/marathons";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";

const singleMarathon = useMarathonStore()
const { marathon } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const { user } = storeToRefs(settingStore)
const route = useRoute()
const {locale} = useI18n()

  interface Form {
    name: string;
    gender_id: number | null;
    participant_category_id: number | null;
    organization_id: number | null;
    region_id: number | null;
    address: string;
    email: string;
    phone: string;
    birth: string;
    parent_name: string;
    user_id: number | null;
    options: string;
  }


  const personInfo = ref<Form>({
    name: '',
    email: '',
    phone: '',
    gender_id: null,
    region_id: null,
    address: '',
    birth: '',
    participant_category_id: null,
    organization_id: null,
    parent_name: '',
    user_id: null,
    options: ''
  })

  onMounted(async ()=>{
    await singleMarathon.getSingleMarathon(route.params.id, locale.value)
    await settingStore.getToken()
  })

  watch(()=>locale.value, async (language)=>{
    await singleMarathon.getSingleMarathon(route.params.id, language)

  })

</script>

<template>
<div>
  <div class="prt-page-title-row style1 inner-pages pricing" :style="`
      background-image: url(http://api.roadrunning.uz/storage/${marathon?.image});
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
    `">
    <div class="prt-page-title-row-inner">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="prt-page-title-row-heading">
              <div class="section-title ">
                <h4 class="d-flex flex-wrap justify-content-center bg-theme rounded align-items-center gap-3">
                  <span>{{ marathon?.marathon_type?.name }}</span>
                  <span>{{ marathon?.price }} UZS</span>
                  <span>{{ settingStore?.formatDate(marathon?.event_has_marathon?.date_event) }} </span>
                  <span>{{ marathon?.datetime_from }} - {{ marathon?.datetime_to }}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="site-main ">
    <div class="position-relative top_130">
      <section class="prt-row from-section clearfix ">
        <div class="container ">


          <div class="bg-body pricing py-3 px-4 border-rad_30  res-991-mt-30">
            <template v-if="!user">
              <div class="d-flex justify-content-center">
                <a class="prt-btn outline-pricing d-flex align-items-center gap-2 prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor res-991-mb-30 text-start" type="button" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class="fa-regular fa-user"></i>
                  Login
                </a>
              </div>
            </template>
            <template v-else>
              <ul class="nav nav-pills align-items-center justify-content-between mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-info" aria-selected="true">
                    1
                  </button>
                </li>
                <li class="liner-between">
                  <div class="line-process" style="width: 20%;"></div>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                    2
                  </button>
                </li>
                <li class="liner-between">
                  <div class="line-process" style="width: 0;"></div>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-number-tab" data-bs-toggle="pill" data-bs-target="#pills-number" type="button" role="tab" aria-controls="pills-number" aria-selected="false">
                    3
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade active show" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                  <div class="section-title style5">
                    <div class="title-header">
                      <h2 class="title text-center text-dark">Personal info</h2>
                    </div>
                  </div>

                  <div class="contact-form-block mt-40">
                    <form id="contactform" class="wrap-form query_form-1 contact_form">
                      <div class="row"><div class="col-lg-12"><div class="response"></div></div>
                        <div class="col-lg-12">
                  <span class="text-input">
                      <span class="heading-name">name</span>
                      <input class="username" type="text" name="name" value="" placeholder="Your name" >
                  </span>
                        </div>
                        <div class="col-lg-12">
                  <span class="text-input">
                      <span class="heading-name">email</span>
                      <input class="email" type="text" name="email" value="" placeholder="Email address">
                  </span>
                        </div>
                        <div class="col-lg-12">
                  <span class="text-input">
                      <span class="heading-name">number</span>
                      <input type="text" name="phone" value="" placeholder="phone number" >
                  </span>
                        </div>
                        <div class="col-lg-12">
                          <button class="prt-btn prt-btn-size-md prt-btn-shape-rounded
                                            prt-btn-style-fill prt-btn-color-skincolor" type="button" id="submit" name="submit-form">submit form</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-number" role="tabpanel" aria-labelledby="pills-number-tab">...</div>
              </div>
            </template>
          </div>







        </div>
      </section>

      <section class="prt-row pricing-section clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="pricing-plan">
                <div class="pricing-table-heading">
                  <div class="prt-p-blur-text">C</div>
                  <div class="pricing-head">
                    <div class="prt-p_table-title">
                      <h3>Car racing</h3>
                      <p>Discover affordable pricing options tailored for car racing enthusiasts.
                        Join us and experience the thrill of the track without breaking the bank</p>
                    </div>
                  </div>
                  <div class="prt-p_table-amount">
                    <div class="prt-p_table-price">$199</div>
                    <div class="prt-p-blur-text right">/p</div>
                  </div>
                  <div class="prt-p_table-button">
                    <a class="prt-button" href="contact-us.html"></a>
                  </div>
                </div>
              </div>
              <div class="pricing-plan">
                <div class="pricing-table-heading">
                  <div class="prt-p-blur-text">B</div>
                  <div class="pricing-head">
                    <div class="prt-p_table-title">
                      <h3>Bike racing</h3>
                      <p>Explore our budget-friendly pricing plans, crafted for bike racing
                        aficionados seeking adrenaline-fueled adventures. Join now and unleash your
                        competitive spirit</p>
                    </div>
                  </div>
                  <div class="prt-p_table-amount">
                    <div class="prt-p_table-price">$189</div>
                    <div class="prt-p-blur-text right">/p</div>
                  </div>
                  <div class="prt-p_table-button">
                    <a class="prt-button" href="contact-us.html"></a>
                  </div>
                </div>
              </div>
              <div class="pricing-plan">
                <div class="pricing-table-heading">
                  <div class="prt-p-blur-text">A</div>
                  <div class="pricing-head">
                    <div class="prt-p_table-title">
                      <h3>ATV bike racing</h3>
                      <p>Dive into the excitement of ATV bike racing with our accessible pricing
                        options. Join our thrilling events and experience the thrill of the track
                        firsthand</p>
                    </div>
                  </div>
                  <div class="prt-p_table-amount">
                    <div class="prt-p_table-price">$159</div>
                    <div class="prt-p-blur-text right">/p</div>
                  </div>
                  <div class="prt-p_table-button">
                    <a class="prt-button" href="contact-us.html"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="prt-row bg-base-grey clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="prt_single_image-wrapper">
                <img class="img-fluid border-rad_20" src="/assets/images/single-img-3-458x650.webp" alt="img">
              </div>
            </div>
            <div class="col-lg-8">
              <div class="ticket-box res-991-mt-30">
                <div class="prt_single_image-wrapper d-inline-block">
                  <img class="img-fluid" src="/assets/images/single-img-12-158x158.webp" alt="img">
                </div>
                <div class="prt_single_image-wrapper style4">

                </div>
                <div class="ticket-section">
                  <h3>Money back guarantee to 100% your shopping cart or checkout page.</h3>
                  <p>Shop worry-free knowing that every purchase made through your shopping cart or
                    checkout page is backed by our 100% money-back guarantee. If you're not satisfied,
                    we'll refund your money hassle-free</p>
                </div>
                <div class="prt_single_image-wrapper pt-15">
                  <img class="img-fluid" src="/assets/images/card-image.webp" alt="img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</div>
</template>

<style scoped>

</style>