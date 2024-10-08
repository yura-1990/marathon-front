<script setup lang="ts">
import { onMounted, ref, watch, watchPostEffect, watchSyncEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingStore } from '@/stores/setting'
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useGenderStore } from '@/stores/gender'
import { useRegionStore } from '@/stores/regions'
import { useOrganizationStore } from '@/stores/organiztions'
import { useParticipantCategoryStore } from '@/stores/participantCategories'
import * as process from 'node:process'
import { useNumberStore } from '@/stores/numberTypes'

const singleMarathon = useMarathonStore()
const { marathon } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const genderStore = useGenderStore()
const regionStore = useRegionStore()
const organizationStore = useOrganizationStore()
const participantCategory = useParticipantCategoryStore()
const numberStore = useNumberStore()
const { user } = storeToRefs(settingStore)
const { genders } = storeToRefs(genderStore)
const { regions } = storeToRefs(regionStore)
const { organizations } = storeToRefs(organizationStore)
const { participantCategories } = storeToRefs(participantCategory)
const { numberTypes } = storeToRefs(numberStore)
const route = useRoute()
const { locale } = useI18n()
const selfProcess = ref<Array<any>>([
  { id: 1, title: 'Personal info', name: 'self', status: true, finish: false, process: '0' },
  { id: 2, title: 'Choose Number', name: 'number', status: false, finish: false, process: '0' },
  {
    id: 3,
    title: 'Choose size of dress',
    name: 'dress',
    status: false,
    finish: false,
    process: '0'
  }
])
const hasParent = ref<boolean>(false)
const complateRegion = ref<string>('')
const missingFields = ref<Array<string>>([])
interface Form {
  name: string
  gender_id: number | null
  participant_category_id: number | null
  organization_id: number | null
  region_id: number | null
  address: string
  email: string
  phone: string
  birth: string
  parent_name: string
  user_id: number | null
  options: string
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
const requiredFields: (keyof Form)[] = [
  'name',
  'email',
  'phone',
  'gender_id',
  'region_id',
  'address',
  'birth'
]

const number = ref()

function checkRequiredFields(): boolean {
  if (hasParent.value) {
    requiredFields.push('parent_name')
  }

  requiredFields.forEach((field) => {
    if (!personInfo.value[field]) {
      missingFields.value.push(field)
    }
  })

  if (missingFields.value.length > 0) {
    console.log('Missing fields:', missingFields)
    return false
  }

  return true
}

onMounted(async () => {
  await singleMarathon.getSingleMarathon(route.params.id, locale.value)
  await settingStore.getToken()
  await genderStore.getGenders(locale.value)
  await regionStore.getRegions(locale.value)
  await organizationStore.getOrganizations(locale.value)
  await participantCategory.getOrganizations(locale.value)
  await numberStore.getNumbers(locale.value)
})

onMounted(() => {
  personInfo.value.name = user.value.name
  personInfo.value.email = user.value.email
  personInfo.value.user_id = user.value.id


  if (localStorage.getItem('process')) {
    const progress: string | null = localStorage.getItem('process');

    if (progress !== null) {
      try {
        selfProcess.value = JSON.parse(progress);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  } else {
    localStorage.setItem('process', JSON.stringify(selfProcess.value));
  }

  if (localStorage.getItem('personalFields')){
    const personalFiels: string | null = localStorage.getItem('personalFields');

    if (personalFiels !== null) {
      try {
        personInfo.value = JSON.parse(personalFiels);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }

  }else {
    localStorage.setItem('personalFields', JSON.stringify(personInfo.value));
  }
})

watch(
  () => locale.value,
  async (language) => {
    await singleMarathon.getSingleMarathon(route.params.id, language)
    await genderStore.getGenders(language)
    await regionStore.getRegions(language)
    await organizationStore.getOrganizations(language)
    await participantCategory.getOrganizations(language)
  }
)



</script>

<template>
  <div>
    <div
      class="prt-page-title-row style1 inner-pages pricing"
      :style="`
      background-image: url(http://api.roadrunning.uz/storage/${marathon?.image});
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
    `"
    >
      <div class="prt-page-title-row-inner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="prt-page-title-row-heading">
                <div class="section-title">
                  <h4
                    class="d-flex flex-wrap justify-content-center bg-theme rounded align-items-center gap-3"
                  >
                    <span>{{ marathon?.marathon_type?.name }}</span>
                    <span>{{ marathon?.price }} UZS</span>
                    <span
                      >{{ settingStore?.formatDate(marathon?.event_has_marathon?.date_event) }}
                    </span>
                    <span>{{ marathon?.datetime_from }} - {{ marathon?.datetime_to }}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-main">
      <div class="position-relative top_130">
        <section class="prt-row from-section clearfix">
          <div class="container">
            <div class="bg-base-dark py-3 px-4 border-rad_30 res-991-mt-30">
              <template v-if="!user">
                <div class="d-flex justify-content-center">
                  <a
                    class="prt-btn outline-pricing d-flex align-items-center gap-2 prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-whitecolor res-991-mb-30 text-start"
                    type="button"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fa-regular fa-user"></i>
                    Login
                  </a>
                </div>
              </template>

              <template v-else>
                <div class="contact-form-block p-5">

                  <form
                    id="self-participation"
                    class="wrap-form query_form-1 needs-validation contact_form"
                    novalidate
                  >
                    <div class="row">
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">name</span>
                          <input
                            v-model="personInfo.name"
                            class="username"
                            type="text"
                            placeholder="Habib"
                            required
                          />
                          <span
                            v-if="missingFields.includes('name')"
                            class="text-danger"
                          >
                            Please fill
                          </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">email</span>
                          <input
                            v-model="personInfo.email"
                            class="email"
                            type="text"
                            placeholder="example@gmail.com"
                          />
                        </span>
                        <span
                          v-if="missingFields.includes('email')"
                          class="text-danger"
                        >
                          Please fill
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">phone number</span>
                          <input
                            type="text"
                            v-model="personInfo.phone"
                            placeholder="+998 90 000 00 00"
                          />
                          <span
                            v-if="missingFields.includes('phone')"
                            class="text-danger"
                          >
                            Please fill
                          </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">Gender</span>
                        </span>
                        <div class="d-flex align-items-center gap-3">
                          <template v-for="(gen, genIndex) in genders" :key="genIndex">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                :value="gen.id"
                                type="radio"
                                name="gender"
                                :id="'type' + gen.id"
                                v-model="personInfo.gender_id"
                              />
                              <label
                                class="custom-radio"
                                :for="'type' + gen.id"
                              >
                                {{ gen.type }}
                              </label>
                            </div>
                          </template>
                        </div>
                        <span
                          v-if="missingFields.includes('gender_id')"
                          class="text-danger"
                        >
                          Please fill
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <label for="regionIndex">
                            <span class="heading-name">regions</span>
                          </label>
                          <input
                            v-model="personInfo.region_id"
                            class="form-control"
                            list="regionOptions"
                            id="regionIndex"
                            placeholder="Type or choose ..."
                          />
                          <datalist id="regionOptions">
                            <option
                              v-for="(value, valueIndex) in regions"
                              :value="value.name"
                              :key="valueIndex"
                            />
                          </datalist>
                          <span
                            v-if="missingFields.includes('region_id')"
                            class="text-danger"
                          >
                            Please fill
                          </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">address</span>
                          <input
                            type="text"
                            v-model="personInfo.address"
                            placeholder="City, Street, #Home number"
                          />
                          <span
                            v-if="missingFields.includes('address')"
                            class="text-danger"
                          >
                            Please fill
                          </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">Birth</span>
                          <input type="date" v-model="personInfo.birth" />

                          <span
                            v-if="missingFields.includes('birth')"
                            class="text-danger"
                          >
                            Please fill
                          </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-check m-0 p-0">
                          <div class="d-flex align-items-center gap-3">
                            <input
                              class="form-check-input m-0"
                              type="checkbox"
                              v-model="hasParent"
                              id="parent"
                            />
                            <label class="form-check-label text-theme" for="parent">
                                <span class="heading-name custom-parent">{{ hasParent ? 'Parent Name' : 'If Child' }}</span>
                            </label>
                          </div>
                          <template v-if="hasParent">
                            <span class="text-input">
                              <input
                                type="text"
                                v-model="personInfo.parent_name"
                                placeholder="Habib Mahmudov"
                              />
                              <span
                                v-if="missingFields.includes('parent_name')"
                                class="text-danger"
                              >
                                Please fill
                              </span>
                            </span>
                          </template>
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <span class="text-input">
                          <label for="organizationIndex">
                            <span class="heading-name">organization</span>
                          </label>
                          <input
                            v-model="personInfo.organization_id"
                            class="form-control"
                            list="organizationOptions"
                            id="organizationIndex"
                            placeholder="Type or choose ..."
                          />
                          <datalist id="organizationOptions">
                            <option
                              v-for="(value, valueIndex) in organizations"
                              :value="value.name"
                              :key="valueIndex"
                            />
                          </datalist>
                        </span>
                      </div>

                      <div class="col-lg-6">
                        <span class="text-input">
                          <label for="participantCategoryIndex">
                            <span class="heading-name">Category</span>
                          </label>
                          <input
                            v-model="personInfo.participant_category_id"
                            class="form-control"
                            list="participantCategoryOptions"
                            id="participantCategoryIndex"
                            placeholder="Type to search..."
                          />
                          <datalist id="participantCategoryOptions">
                            <option
                              v-for="(value, valueIndex) in participantCategories"
                              :value="value.type"
                              :key="valueIndex"
                            />
                          </datalist>
                        </span>
                      </div>
                      <div class="col-lg-12 mt-5 py-5">
                        <div v-for="(num, numIndex) in marathon.number_types" :key="numIndex" class="pricing-plan">
                          <div class="pricing-table-heading">
                            <div class="prt-p-blur-text">{{ num?.type.charAt(0) }}</div>
                            <div class="pricing-head">
                              <div class="prt-p_table-title">
                                <h3>{{ num?.type }}</h3>
                                <p>
                                  Discover affordable pricing options tailored for car racing enthusiasts.
                                  Join us and experience the thrill of the track without breaking the bank
                                </p>
                              </div>
                            </div>
                            <div class="prt-p_table-amount float-end">
                              <div class="prt-p_table-price ">{{ num?.pivot?.price ? num.pivot.price + ' UZS' : 0 }}</div>
                              <div class="prt-p-blur-text right">/p</div>
                            </div>
                            <div class="prt-p_table-button">
                              <a class="prt-button" href="#!"></a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div
                          class="d-flex align-items-center justify-content-between gap-3"
                        >
                          <button
                            class="prt-btn prt-btn-size-md prt-btn-shape-rounded prt-btn-style-fill prt-btn-color-skincolor"
                            type="submit"
                          >
                            Submit form
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </template>
            </div>
          </div>
        </section>

<!--        <section class="prt-row pricing-section clearfix">-->
<!--          <div class="container">-->
<!--            <div class="row">-->
<!--              <div class="col-lg-12">-->
<!--                <div class="pricing-plan">-->
<!--                  <div class="pricing-table-heading">-->
<!--                    <div class="prt-p-blur-text">C</div>-->
<!--                    <div class="pricing-head">-->
<!--                      <div class="prt-p_table-title">-->
<!--                        <h3>Car racing</h3>-->
<!--                        <p>-->
<!--                          Discover affordable pricing options tailored for car racing enthusiasts.-->
<!--                          Join us and experience the thrill of the track without breaking the bank-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-amount">-->
<!--                      <div class="prt-p_table-price">$199</div>-->
<!--                      <div class="prt-p-blur-text right">/p</div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-button">-->
<!--                      <a class="prt-button" href="contact-us.html"></a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="pricing-plan">-->
<!--                  <div class="pricing-table-heading">-->
<!--                    <div class="prt-p-blur-text">B</div>-->
<!--                    <div class="pricing-head">-->
<!--                      <div class="prt-p_table-title">-->
<!--                        <h3>Bike racing</h3>-->
<!--                        <p>-->
<!--                          Explore our budget-friendly pricing plans, crafted for bike racing-->
<!--                          aficionados seeking adrenaline-fueled adventures. Join now and unleash-->
<!--                          your competitive spirit-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-amount">-->
<!--                      <div class="prt-p_table-price">$189</div>-->
<!--                      <div class="prt-p-blur-text right">/p</div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-button">-->
<!--                      <a class="prt-button" href="contact-us.html"></a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="pricing-plan">-->
<!--                  <div class="pricing-table-heading">-->
<!--                    <div class="prt-p-blur-text">A</div>-->
<!--                    <div class="pricing-head">-->
<!--                      <div class="prt-p_table-title">-->
<!--                        <h3>ATV bike racing</h3>-->
<!--                        <p>-->
<!--                          Dive into the excitement of ATV bike racing with our accessible pricing-->
<!--                          options. Join our thrilling events and experience the thrill of the track-->
<!--                          firsthand-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-amount">-->
<!--                      <div class="prt-p_table-price">$159</div>-->
<!--                      <div class="prt-p-blur-text right">/p</div>-->
<!--                    </div>-->
<!--                    <div class="prt-p_table-button">-->
<!--                      <a class="prt-button" href="contact-us.html"></a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->

        <section class="prt-row bg-base-grey clearfix">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="prt_single_image-wrapper">
                  <img
                    class="img-fluid border-rad_20"
                    src="/assets/images/single-img-3-458x650.webp"
                    alt="img"
                  />
                </div>
              </div>
              <div class="col-lg-8">
                <div class="ticket-box res-991-mt-30">
                  <div class="prt_single_image-wrapper d-inline-block">
                    <img
                      class="img-fluid"
                      src="/assets/images/single-img-12-158x158.webp"
                      alt="img"
                    />
                  </div>
                  <div class="prt_single_image-wrapper style4"></div>
                  <div class="ticket-section">
                    <h3>Money back guarantee to 100% your shopping cart or checkout page.</h3>
                    <p>
                      Shop worry-free knowing that every purchase made through your shopping cart or
                      checkout page is backed by our 100% money-back guarantee. If you're not
                      satisfied, we'll refund your money hassle-free
                    </p>
                  </div>
                  <div class="prt_single_image-wrapper pt-15">
                    <img class="img-fluid" src="/assets/images/card-image.webp" alt="img" />
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

<style scoped></style>