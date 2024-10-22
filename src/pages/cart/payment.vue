<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '@/stores/payment'

const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)
const paymentStore = usePaymentStore()
const { payment } = storeToRefs(paymentStore)

const cardInput = ref<string>('');
const expirationDate = ref<string>('')
const dateError = ref<string>('')
const isValid = ref<boolean>(false)
const paymentStatus = ref<boolean>(false)
const codes = ref<string[]>(['', '', '', '', '', '']);
const inputs = ref<HTMLInputElement[]>([]);
const timeLeft = ref<number>(120);
let timer: any;


function onCardInput()
{
  const digitsCount = cardInput.value.replace(/\s/g, '').length;
  if(digitsCount >= 15){
    isValid.value = !(digitsCount >= 15 && digitsCount <= 16)
  }
  cardInput.value = settingStore.maskCreditCard(cardInput.value)
}

onMounted(()=>{
  settingStore.getCarts()

  if (localStorage.getItem('invoice_number')){
    paymentStatus.value = true
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
    dateError.value = 'Expiration date must be in the format MM/YY';
  } else {
    dateError.value = '';
  }
}

function startTimer()
{
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

const totalPrice = computed(() => {
  return carts.value.reduce((total, participant) => {
    const priceFromNumberType = Number(participant.description) || 0;

    return total + priceFromNumberType;
  }, 0);
})

async function submit(){
  const data = {
    cart_number: cardInput.value.toString(),
    expired_date: expirationDate.value.toString(),
    total_sum: totalPrice.value.toString(),
    type: "Humo"
  }

  await paymentStore.createTransaction(data)
}

watch(()=>payment.value, ()=>{
  paymentStatus.value = true
  inputs.value[0]?.focus();
  localStorage.setItem('invoice_number', JSON.stringify(payment.value))
  startTimer();
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

}

function resendCode ()
{
  codes.value = ['', '', '', '', '', ''];
  timeLeft.value = 120;
  startTimer();

}

async function canselPayment()
{
  paymentStatus.value = false
  const invoiceId = JSON.parse(localStorage.getItem('invoice_number'));

  await paymentStore.deleteInvoice(invoiceId.id)
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
                <h2 class="title">INVOICE</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> INVOICE </div>
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
                          <div class="classes-days">Invoice info</div>
                        </th>
                        <th>
                          <div class="classes-days">Cost</div>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <!--row one-->
                      <tr v-for="(item, index) in carts" :key="index">
                        <td>
                          <p class="text-white text-start px-3 m-0 ">Name: <span class="fw-500 text-theme float-end">{{ item.participant.name }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Phone: <span class="fw-500 text-theme float-end">{{ item.participant.phone }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Email: <span class="fw-500 text-theme float-end">{{ item.participant.email }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Address: <span class="fw-500 text-theme float-end">{{ item.participant.address }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Number: <span class="fw-500 text-theme float-end">{{ item.number }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Uniform: <span class="fw-500 text-theme float-end">{{ item.participant.uniform.size }}</span></p>
                        </td>
                        <td rowspan="1">
                            <p class="margin_bottom0 text-white">{{ settingStore.formatNumber(item.description)  }} sum</p>
                        </td>
                      </tr>
                      <tr>
                        <td><h4>Total </h4></td>
                        <td><h4>{{ settingStore.formatNumber(totalPrice) }}</h4></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 prt-sticky-column">
            <div class="section-title title-style-center_text">
              <div class="title-header">
                <h2 class="title">Cart</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> Cart </div>
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
                    <template v-if="paymentStatus">

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
                          <p class="text-danger mt-2" v-if="timeLeft > 0">
                            Time remaining: {{ timeLeft }} seconds
                          </p>
                          <div v-if="timeLeft === 0" class="mt-3">
                            <small class="">Didn't receive the code? </small>
                            <a href="#" class="text-decoration-none text-theme" @click.prevent="resendCode" >Resend</a>
                          </div>
                          <div v-if="timeLeft > 0" class="d-flex justify-content-center">
                            <button type="submit" class="prt-btn prt-btn-size-md mt-10 w-100 text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor">
                              verify
                            </button>
                            <button @click="canselPayment" type="button" class="prt-btn prt-btn-size-md mt-10 w-100 text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor">
                              cansel
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
                        <span class="text-input">
                          <span class="heading-name">{{ $t('cart_number') }}</span>
                          <input
                            class="username"
                            type="text"
                            placeholder="____ ____ _____ ____"
                            v-model="cardInput"
                            maxlength="19"
                            @input="onCardInput"
                          />
                          <span v-if="isValid" class="error">Invalid credit card number</span>
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
                          <button class="prt-btn prt-btn-size-lg text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20">
                            pay
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