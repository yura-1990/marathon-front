<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingStore } from '@/stores/setting'
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import {useCartStore} from "@/stores/carts";
const singleMarathon = useMarathonStore()

const { marathon } = storeToRefs(singleMarathon)
const settingStore = useSettingStore()
const cartStore = useCartStore()
const $toast = useToast()

const route = useRoute()
const { locale } = useI18n()

const hasParent = ref<boolean>(false)
const carts = ref<Array<any>>([])
const isEmailValid = ref<boolean>(true)
const isPhoneValid = ref(true)

interface Form {
  name: string
  gender_id: number | null
  participant_category_id: number | null
  organization_id: number | null
  region_id: string | null
  address: string
  email: string
  phone: string
  birth: string
  parent_name: string
  options: string
  number: { number: string, numberType: any }
  uniform: any
  marathon: any,
  time: any
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
  options: '',
  number: { number: '', numberType: {} },
  uniform: {},
  marathon: '',
  time: ""
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  gender_id: '',
  region_id: '',
  address: '',
  birth: '',
  uniform: '',
  parent_name: hasParent.value ? '' : null
})

onMounted(async () => {
  await singleMarathon.getSingleMarathon(route.params.id, locale.value)
})

onMounted(() => {
  personInfo.value.marathon = marathon.value.marathon
  personInfo.value.time = new Date()

  if (localStorage.getItem('personalFields')) {
    const personalFiels: string | null = localStorage.getItem('personalFields')

    if (personalFiels !== null) {
      try {
        personInfo.value = JSON.parse(personalFiels)
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error)
      }
    }
  } else {
    localStorage.setItem('personalFields', JSON.stringify(personInfo.value))
  }

  if (localStorage.getItem('carts')) {
    const cartsPlus: string | null = localStorage.getItem('carts')

    if (cartsPlus !== null) {
      try {
        carts.value = JSON.parse(cartsPlus)
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error)
      }
    }
  }
  else {
    localStorage.setItem('carts', JSON.stringify(carts.value))
  }
})

watch(
  () => locale.value,
  async (language) => {
    await singleMarathon.getSingleMarathon(route.params.id, language)
  }
)

function applyPhoneMask() {
  personInfo.value.phone = settingStore.maskPhone(personInfo.value.phone)
  isPhoneValid.value = settingStore.validatePhone(personInfo.value.phone)
}

function validateEmailInput() {
  isEmailValid.value = settingStore.validateEmail(personInfo.value.email)
}

function setNumber(numberType: { number: string; numberType: any }): void {
  personInfo.value.number = numberType
}

function validateField(field: string): void {
  switch (field) {
    case 'name':
      errors.value.name = personInfo.value.name ? '' : 'Name is required.'
      break
    case 'gender_id':
      errors.value.gender_id = personInfo.value.gender_id ? '' : 'Please select a gender.'
      break
    case 'email':
      errors.value.email = settingStore.validateEmail(personInfo.value.email)
        ? ''
        : 'Please select a email.'
      break
    case 'phone':
      errors.value.phone = settingStore.validatePhone(personInfo.value.phone) ? '' : 'Fill phone.'
      break
    case 'region_id':
      errors.value.region_id = personInfo.value.region_id ? '' : 'Please select a region.'
      break
    case 'address':
      errors.value.address = personInfo.value.address ? '' : 'Address is required.'
      break
    case 'birth':
      errors.value.birth = personInfo.value.birth ? '' : 'birth is required.'
      break
    case 'uniform_id':
      errors.value.uniform = personInfo.value.uniform ? '' : 'uniform is required.'
      break
    case 'parent_name':
      hasParent.value
        ? (errors.value.parent_name = personInfo.value.parent_name
            ? ''
            : 'parent_name is required.')
        : ''
      break
  }
}

async function addCard(): Promise<void> {
  personInfo.value.marathon = marathon.value.marathon
  personInfo.value.time = new Date()

  Object.keys(personInfo.value).forEach((key) => {
    validateField(key)
  })

  if (Object.values(errors.value).every((err) => !err)) {
    if (isEmailValid.value && isPhoneValid.value) {
      localStorage.setItem('personalFields', JSON.stringify(personInfo.value))
      carts.value.push(personInfo.value)
      const data = {
        number: Number(personInfo.value.number?.number),
        number_type_id: Number(personInfo.value.number.numberType.id),
        marathon_id: Number(route.params.id),
      }
      await cartStore.createNumberStatus(data)
      await singleMarathon.getSingleMarathon(route.params.id, locale.value)
      localStorage.setItem('carts', JSON.stringify(carts.value))
      clearPersonalInfo()
      $toast.success('Add to card')
      settingStore.getCarts()

    }
  } else {
    console.log('Validation errors:', errors.value)
    $toast.error('Fill form correctly.')
  }
}

function clearPersonalInfo() {
  personInfo.value = {
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
    options: '',
    number: { number: '', numberType: {} },
    uniform: null,
    marathon: '',
    time: ''
  }

  localStorage.setItem('personalFields', JSON.stringify(personInfo.value))
}
</script>

<template>
  <div>
    <div
      class="prt-page-title-row style1 inner-pages pricing"
      :style="`
      background-image: url(https://api.roadrunning.uz/storage/${marathon?.marathon?.image});
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
                    <span>{{ marathon?.marathon?.marathon_type?.name }}</span>
                    <span>{{ marathon?.marathon?.price }} UZS</span>
                    <span
                      >{{
                        settingStore?.formatDate(marathon?.marathon?.event_has_marathon?.date_event)
                      }}
                    </span>
                    <span
                      >{{ marathon?.marathon?.datetime_from }} -
                      {{ marathon?.marathon?.datetime_to }}</span
                    >
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
              <div class="contact-form-block p-5">
                <form
                  @submit.prevent="addCard"
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
                          @blur="validateField('name')"
                        />
                        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
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
                          @blur="validateField('email')"
                        />
                        <span v-if="errors.email && !isEmailValid" class="text-danger">{{ errors.email }}</span>
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
                          @blur="validateField('phone')"
                        />
                        <span v-if="errors.phone && !isPhoneValid" class="text-danger">{{ errors.phone }}</span>
                      </span>
                    </div>
                    <div class="col-lg-6">
                      <span class="text-input">
                        <span class="heading-name">Gender</span>
                      </span>
                      <div class="d-flex align-items-center gap-3">
                        <template v-for="(gen, genIndex) in marathon?.genders" :key="genIndex">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              :value="gen.id"
                              type="radio"
                              name="gender"
                              :id="'type' + gen.id"
                              v-model="personInfo.gender_id"
                              @blur="validateField('gender_id')"
                            />
                            <label class="custom-radio" :for="'type' + gen.id">
                              {{ gen.type }}
                            </label>
                          </div>
                        </template>
                      </div>
                      <span v-if="errors.gender_id" class="text-danger">{{
                        errors.gender_id
                      }}</span>
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
                          @blur="validateField('region_id')"
                        />
                        <datalist id="regionOptions">
                          <option
                            v-for="(value, valueIndex) in marathon?.regions"
                            :value="value.name"
                            :key="valueIndex"
                          />
                        </datalist>
                        <span v-if="errors.region_id" class="text-danger">{{
                          errors.region_id
                        }}</span>
                      </span>
                    </div>
                    <div class="col-lg-6">
                      <span class="text-input">
                        <span class="heading-name">address</span>
                        <input
                          type="text"
                          v-model="personInfo.address"
                          placeholder="City, Street, #Home number"
                          @blur="validateField('address')"
                        />
                        <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
                      </span>
                    </div>
                    <div class="col-lg-6">
                      <span class="text-input">
                        <span class="heading-name">Birth</span>
                        <input
                          type="date"
                          v-model="personInfo.birth"
                          @blur="validateField('birth')"
                        />

                        <span v-if="errors.birth" class="text-danger">{{ errors.birth }}</span>
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
                            <span class="heading-name custom-parent">{{
                              hasParent ? 'Parent Name' : 'If Child'
                            }}</span>
                          </label>
                        </div>
                        <template v-if="hasParent">
                          <span class="text-input">
                            <input
                              type="text"
                              v-model="personInfo.parent_name"
                              placeholder="Habib Mahmudov"
                              @blur="validateField('parent_name')"
                            />
                            <span v-if="hasParent && errors.parent_name" class="text-danger">{{
                              errors.parent_name
                            }}</span>
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
                            v-for="(value, valueIndex) in marathon?.organizations"
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
                            v-for="(value, valueIndex) in marathon?.participantCategories"
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

                      <div class="">
                        <div
                          class="form-check"
                          v-for="(value, valueIndex) in marathon?.uniforms"
                          :key="valueIndex"
                        >
                          <input
                            class="form-check-input"
                            v-model="personInfo.uniform"
                            type="radio"
                            name="uniform"
                            :value="value"
                            :id="'size-' + value.id"
                            @blur="validateField('uniform_id')"
                          />
                          <label class="form-check-label" :for="'size-' + value.id">
                            {{ value?.size }} - {{ value?.type }}
                          </label>
                          <span v-if="errors.uniform" class="text-danger">{{
                            errors.uniform
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12 mt-5 py-5">
                      <div class="section-title title-style-center_text">
                        <div class="title-header">
                          <h2 class="title">Choose Number</h2>
                        </div>
                      </div>
                      <div
                        v-for="(num, numIndex) in marathon?.marathon?.number_types"
                        :key="numIndex"
                        class="pricing-plan"
                      >
                        <div class="pricing-table-heading">
                          <div class="prt-p-blur-text">{{ num?.type.charAt(0) }}</div>
                          <div class="pricing-head">
                            <div class="prt-p_table-title">
                              <h3>{{ num?.type }}</h3>
                            </div>
                          </div>
                          <div class="prt-p_table-amount float-end">
                            <div class="prt-p_table-price">
                              {{ num?.pivot?.price ? num.pivot.price + ' UZS' : 0 }}
                            </div>
                            <div class="prt-p-blur-text right">/p</div>
                          </div>
                          <div class="prt-p_table-button"></div>

                          <ul class="numbers d-flex flex-wrap gap-3 list-unstyled">
                            <template v-for="(n, ni) in num.options.filter((el:any) => marathon?.marathon.number_status ? !marathon?.marathon.number_status.find((it:any) => it.number == el) : true)" :key="n">
                              <li
                                v-if="
                                  marathon?.marathon?.marathon_type.number_order_from <= n &&
                                  marathon?.marathon?.marathon_type.number_order_to >= n
                                "
                                class="numbers-item"
                                :class="{ 'active': personInfo?.number?.number == n }"
                                @click="
                                  setNumber({
                                    number: n,
                                    numberType: num
                                  })
                                "
                              >
                                {{ n }}
                              </li>
                              <li
                                v-else-if="n < 1"
                                class="numbers-item"
                                :class="{ 'active': personInfo.number.number == '0' }"
                                @click="
                                  setNumber({
                                    number: n,
                                    numberType: num
                                  })
                                "
                              >
                                0
                              </li>
                            </template>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <div class="d-flex align-items-center justify-content-between gap-3">
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