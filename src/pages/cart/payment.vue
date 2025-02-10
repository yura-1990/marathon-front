<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '@/stores/payment'
import { useTimeStore } from '@/stores/counter'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useI18n } from 'vue-i18n'

const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)
const paymentStore = usePaymentStore()
const { payment, error, invoiceStatus, errorCode } = storeToRefs(paymentStore)
const { t } = useI18n();

const cardInput = ref<string>('');
const expirationDate = ref<string>('')
const dateError = ref<string>('')
const isValid = ref<boolean>(false)
const paymentStatus = ref<boolean>(false)
const codes = ref<string[]>(['', '', '', '', '', '']);
const inputs = ref<HTMLInputElement[]>([]);
const phoneNumber = ref<string>('')
const phoneErrors = ref<string>('')
const isPhoneValid = ref(true)
let timer: any;
const timeStore = useTimeStore()

function onCardInput()
{
  const digitsCount = cardInput.value.replace(/\s/g, '').length;
  if(digitsCount >= 15){
    isValid.value = !(digitsCount >= 15 && digitsCount <= 16)
  }
  cardInput.value = settingStore.maskCreditCard(cardInput.value)
}

function applyPhoneMask() {
  phoneNumber.value = settingStore.maskPhone(phoneNumber.value)
  isPhoneValid.value = settingStore.validatePhone(phoneNumber.value)
}

onMounted(()=>{
  settingStore.getCarts()

  if (localStorage.getItem('invoice_number')){
    paymentStatus.value = true
    timeStore.startCountdown()
  }
})

onUnmounted(() => {
  clearInterval(timer);
});

function formatExpirationDate(input: string)
{
  let sanitizedInput = input.replace(/\D/g, ''); // Remove non-numeric characters

  if (sanitizedInput.length > 6) {
    sanitizedInput = sanitizedInput.slice(0, 6);
  }

  if (sanitizedInput.length >= 2) {
    return sanitizedInput.slice(0, 2) + ' / ' + sanitizedInput.slice(2);
  } else {
    return sanitizedInput;
  }
}

function expirationDateInput()
{
  expirationDate.value = formatExpirationDate(expirationDate.value);

  if (expirationDate.value.length < 5 && expirationDate.value.length >= 7) {
    dateError.value = t('expiration_date_format');
  } else {
    dateError.value = '';
  }
}

const totalPrice = computed(() => {
  return carts.value.reduce((total, participant) => {
    const priceFromNumberType = Number(participant.description) || 0;

    return total + priceFromNumberType;
  }, 0);
})

function checkPhoneMask(){
  phoneErrors.value = settingStore.validatePhone(phoneNumber.value) ? '' : t('phone_is_required')
}

async function submit(){

  const data = {
    cart_number: cardInput.value.toString(),
    expired_date: expirationDate.value.toString(),
    total_sum: totalPrice.value.toString(),
    phone_number: phoneNumber.value.toString(),
    type: "Marathone uz"
  }

  await paymentStore.createTransaction(data)
}

watch(()=>payment.value, ()=>{
  paymentStatus.value = true
  inputs.value[0]?.focus();
  localStorage.setItem('invoice_number', JSON.stringify(payment.value))
  timeStore.resetCountdown()
})

watch(()=>invoiceStatus.value, async ()=>{
  paymentStatus.value = false
  if (invoiceStatus.value.is_paid){

    timeStore.clearCountdown()
    localStorage.removeItem('invoice_number')
    localStorage.setItem('carts', JSON.stringify([]))
    localStorage.removeItem('cart_time')
    settingStore.getCarts()

    await Swal.fire({
      title: t('success'),
      text: t('operation_successful'),
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#304310',
    });
  }
})

function onInputChange (index: number)
{
  if (codes.value[index].length === 1 && index < codes.value.length - 1) {
    inputs.value[index + 1]?.focus();
  }
}

function verifyCode ()
{
  const enteredCode = codes.value.join('')
  const storedValue = localStorage.getItem('invoice_number')
  const invoiceNumber = storedValue ? JSON.parse(storedValue) : null

  const data = {
    invoice_id: invoiceNumber.id,
    code: enteredCode,
    invoices: carts.value.map(el=>({invoice_item_id: el.id}))
  }

  paymentStore.checkInvoice(data)

}

async function resendCode()
{
  codes.value = ['', '', '', '', '', ''];
  timeStore.resetCountdown();
  const storedValue = localStorage.getItem('invoice_number');
  const invoiceId = storedValue ? JSON.parse(storedValue) : null;
  await paymentStore.resetInvoice(invoiceId.id)
}

async function canselPayment()
{
  paymentStatus.value = false
  const storedValue = localStorage.getItem('invoice_number');
  const invoiceId = storedValue ? JSON.parse(storedValue) : null;
  await paymentStore.deleteInvoice(invoiceId.id)
  localStorage.removeItem('invoice_number')
}

</script>

<template>
<div class="site-main ">
    <div class="prt-row table-section clearfix">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title title-style-center_text">
              <div class="title-header">
                <h2 class="title">{{ $t('invoices') }}</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> {{ $t('invoices') }} </div>
              </div>
            </div>
            <div class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes
                            col-bg-img-four border-rad_30 h-auto">
              <div class="prt-col-wrapper-bg-layer prt-bg-layer">
                <div class="prt-col-wrapper-bg-layer-inner"></div>
              </div>
              <div class="layer-content">
                <div class="section-content position-relative">

                  <div class="time-zone-table1 table-responsive text-center mt_40 res-991-mt-0">
                    <table class="table">
                      <thead>
                      <tr >
                        <th>
                          <div class="classes-days">{{ $t('invoice_info') }}</div>
                        </th>
                        <th>
                          <div class="classes-days">{{ $t('cost') }}</div>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <!--row one-->
                      <tr v-for="(item, index) in carts" :key="index">
                        <td>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('name') }}: <span class="fw-500 text-theme float-end">{{ item.participant.name }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('phone_number') }}: <span class="fw-500 text-theme float-end">{{ item.participant.phone }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('email') }}: <span class="fw-500 text-theme float-end">{{ item.participant.email }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('address') }}: <span class="fw-500 text-theme float-end">{{ item.participant.address }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('number') }}: <span class="fw-500 text-theme float-end">{{ item.number }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">{{ $t('uniform') }}: <span class="fw-500 text-theme float-end">{{ item.participant.uniform.size }}</span></p>
                        </td>
                        <td rowspan="1">
                            <p class="margin_bottom0 text-white">{{ settingStore.formatNumber(item.description)  }} sum</p>
                        </td>
                      </tr>
                      <tr>
                        <td><h4>{{ $t('total') }} </h4></td>
                        <td><h4>{{ settingStore.formatNumber(totalPrice) }}</h4></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-responsive prt-sticky-column">
            <div class="section-title title-style-center_text">
              <div class="title-header">
                <h2 class="title">{{ $t('card') }}</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> {{ $t('card') }} </div>
              </div>
            </div>
            <div class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes  col-bg-img-four border-rad_30 h-auto">

              <div class="bg-base-body-color-dark rounded-5 shadow-lg prt-bg-layer">
                <div class="prt-col-wrapper-bg-layer-inner"></div>
              </div>
              <div class="layer-content">
                <div class="section-content position-relative">

                  <div class="time-zone-table1 table-responsive text-center mt_40 res-991-mt-0">
                    <div class="layer-content contact-form-block p-5 shadow-lg rounded-5">
                      <template v-if="carts.length === 0">
                        <h3>{{ $t('no_active_invoices') }}</h3>
                      </template>
                      <template v-else-if="paymentStatus">
                        <div class="code">
                          <form @submit.prevent="verifyCode">
                            <div class="d-flex justify-content-center">
                              <input
                                v-for="(code, index) in codes"
                                :key="index"
                                v-model="codes[index]"
                                ref="inputs"
                                type="text"
                                maxlength="1"
                                class="otp-input form-control"
                                @input="onInputChange(index)"
                              />
                            </div>
                            <span class="text-danger">{{ errorCode?.title }}</span>
                            <p class="text-danger mt-2" v-if="timeStore.timeLeft > 0">
                              {{ $t('time_remaining') }} {{ timeStore.formattedTime }} {{ $t('seconds') }}
                            </p>
                            <div v-if="timeStore.timeLeft === 0" class="mt-3">
                              <small class="">{{ $t('didnt_receive_code') }} </small>
                              <a href="#" class="text-decoration-none text-theme" @click.prevent="resendCode" >{{ $t('resend') }}</a>
                            </div>
                            <div v-if="timeStore.timeLeft > 0" class="d-flex justify-content-center">
                              <button type="submit" class="prt-btn prt-btn-size-md mt-10 w-100 text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor">
                                {{ $t('verify') }}
                              </button>
                              <button @click="canselPayment" type="button" class="prt-btn prt-btn-size-md mt-10 w-100 text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor">
                                {{ $t('cancel') }}
                              </button>
                            </div>
                          </form>
                        </div>
                      </template>
                      <template v-else>
                        <form
                            id="self-participation"
                            @submit.prevent="submit"
                            class="wrap-form query_form-1 needs-validation contact_form"
                            novalidate
                          >
                          <span class="text-danger ">{{ error.title }}</span>
                          <span class="text-input">
                            <span class="heading-name">{{ $t('card_number') }}</span>
                            <input
                              class="username"
                              type="text"
                              placeholder="____ ____ _____ ____"
                              v-model="cardInput"
                              maxlength="19"
                              @input="onCardInput"
                            />
                            <span v-if="isValid" class="error">{{ $t('invalid_credit_card_number') }}</span>
                          </span>

                          <span class="text-input">
                            <span class="heading-name">{{ $t('expire_date') }}</span>
                            <input
                              class="email"
                              type="text"
                              placeholder="MM / YY"
                              v-model="expirationDate"
                              @input="expirationDateInput"
                              maxlength="7"
                            />
                            <span v-if="dateError" class="error">{{ dateError }}</span>
                          </span>
                          <span class="text-input">
                            <span class="heading-name">{{ $t('amount') }}</span>
                            <input
                              readonly
                              class="email"
                              type="text"
                              :value="settingStore.formatNumber(totalPrice).toString()"
                              :placeholder="settingStore.formatNumber(totalPrice).toString()"
                            />

                          </span>
                          <span class="text-input">
                            <span class="heading-name">
                               {{ $t('phone_number') }}
                            </span>
                            <input
                              type="tel"
                              v-model="phoneNumber"
                              placeholder="+000 00 000 00 00"
                              @input="applyPhoneMask"
                              @blur="checkPhoneMask"
                            />
                            <span v-if="phoneErrors && !isPhoneValid" class="text-danger">{{ phoneErrors }}</span>
                          </span>
                          <span class="text-theme d-flex text-start">
                            <span>{{ $t('linked_phone_number_warning') }}</span>
                          </span>
                          <button class="prt-btn prt-btn-size-lg text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20">
                            {{ $t('pay') }}
                          </button>
                        </form>
                      </template>
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
</template>

<style scoped>
.error {
  color: red;
}

.otp-input {
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  text-align: center;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}
.otp-input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  border-color: #007bff;
}
</style>