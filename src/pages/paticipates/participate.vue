<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingStore } from '@/stores/setting'
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useGenderStore } from '@/stores/gender'
import { useRegionStore } from '@/stores/regions'
import { useOrganizationStore } from '@/stores/organiztions'
import { useParticipantCategoryStore } from '@/stores/participantCategories'
import { useUniformStore } from '@/stores/uniforms'

const singleMarathon = useMarathonStore()
const { marathon } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const genderStore = useGenderStore()
const regionStore = useRegionStore()
const organizationStore = useOrganizationStore()
const participantCategory = useParticipantCategoryStore()
const uniformStore = useUniformStore()
const { user } = storeToRefs(settingStore)
const { genders } = storeToRefs(genderStore)
const { regions } = storeToRefs(regionStore)
const { organizations } = storeToRefs(organizationStore)
const { participantCategories } = storeToRefs(participantCategory)
const { uniforms } = storeToRefs(uniformStore)

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
  number: string | null,
  uniform_id: string | null
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
  options: '',
  number: '0',
  uniform_id: null
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
const size = ref<string | null>(null)
const isEmailValid = ref<boolean>(true)
const isPhoneValid = ref(true);

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
})

onMounted(async () => {
  await uniformStore.getUniforms(locale.value)
})

onMounted(() => {
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
    await uniformStore.getUniforms(language)
  }
)

function applyPhoneMask () {
  personInfo.value.phone = settingStore.maskPhone(personInfo.value.phone);
  isPhoneValid.value = settingStore.validatePhone(personInfo.value.phone);
}

function validateEmailInput() {
  isEmailValid.value = settingStore.validateEmail(personInfo.value.email);
}

function setNumber(id: number): void
{
  personInfo.value.number = id.toString();
}

function setUniform(): void
{
  const s = size.value?.split('-')[1].trim()
  const getS = uniforms.value.filter((el)=>el.size === s)[0]
  personInfo.value.uniform_id = getS.id
}

async function submit(){
  console.log(personInfo.value)
}

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
              <div class="section-title title-style-center_text">
                <div class="title-header">
                  <h2 class="title">Personal Info</h2>
                </div>
              </div>
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

                  <form @submit.prevent="submit"
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
                            @input="validateEmailInput"
                          />
                        <span
                          v-if="!isEmailValid"
                          class="text-danger ms-3"
                        >
                          Email is not valid
                        </span>
                        </span>
                      </div>
                      <div class="col-lg-6">
                        <span class="text-input">
                          <span class="heading-name">phone number</span>
                          <input
                            type="tel"
                            v-model="personInfo.phone"
                            placeholder="+000 00 000 00 00"
                            @input="applyPhoneMask"
                          />
                          <span
                            v-if="!isPhoneValid"
                            class="text-danger ms-3"
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
                        <div class="section-title title-style-center_text">
                          <div class="title-header">
                            <h2 class="title">Choose Uniform size</h2>
                          </div>
                        </div>

                        <span class="text-input">
                          <label for="uniformIndex">
                            <span class="heading-name">Uniform</span>
                          </label>
                          <input
                            v-model="size"
                            class="form-control"
                            list="uniformOptions"
                            id="organizationIndex"
                            placeholder="Type or choose ..."
                            @input="setUniform"
                          />
                          <datalist id="uniformOptions">
                            <option
                              v-for="(value, valueIndex) in uniforms"
                              :value="value.type + ' - ' + value.size"
                              :key="valueIndex"
                            >{{ value.size }}</option>
                          </datalist>
                        </span>
                      </div>

                      <div class="col-lg-12 mt-5 py-5">
                        <div class="section-title title-style-center_text">
                          <div class="title-header">
                            <h2 class="title">Choose Number</h2>
                          </div>
                        </div>
                        <div v-for="(num, numIndex) in marathon?.number_types" :key="numIndex" class="pricing-plan">
                          <div class="pricing-table-heading">
                            <div class="prt-p-blur-text">{{ num?.type.charAt(0) }}</div>
                            <div class="pricing-head">
                              <div class="prt-p_table-title">
                                <h3>{{ num?.type }}</h3>
                              </div>
                            </div>
                            <div class="prt-p_table-amount float-end">
                              <div class="prt-p_table-price ">{{ num?.pivot?.price ? num.pivot.price + ' UZS' : 0 }}</div>
                              <div class="prt-p-blur-text right">/p</div>
                            </div>
                            <div  class="prt-p_table-button"></div>

                            <ul class="numbers d-flex flex-wrap gap-3 list-unstyled">
                              <template v-for="(n, ni) in num.options" :key="ni" >
                                <li v-if="marathon.marathon_type.number_order_from <= n && marathon.marathon_type.number_order_to >= n"
                                    class="numbers-item"
                                    :class="{'active': personInfo.number == n}" @click="setNumber(n)"
                                >
                                  {{ n }}
                                </li>
                              </template>
                            </ul>
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
                            + Add to card
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